"use client";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import JSONPretty from "react-json-pretty";
import "react-json-pretty/themes/monikai.css";
import { webCallback, webSocketUrl } from "@/variables";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";

type Status =
  | "waiting"
  | "received"
  | "validating"
  | "verifying"
  | "success"
  | "failure";

const statusLabel: Record<Status, string> = {
  waiting: "Waiting for scan...",
  received: "Response received!",
  validating: "Validating...",
  verifying: "Verifying...",
  success: "✅ Verified!",
  failure: "❌ Verification Failed",
};

const statusColor: Record<Status, string> = {
  waiting: "text-gray-500",
  received: "text-yellow-500",
  validating: "text-blue-500",
  verifying: "text-indigo-500",
  success: "text-green-600",
  failure: "text-red-600",
};

export default function Home() {
  const [status, setStatus] = useState<Status>("waiting");
  const [jsonResponse, setJsonResponse] = useState<any>(null);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [openidUrl, setOpenidUrl] = useState("");

  const generateURL = () => {
    const response_uri = webCallback;
    const client_metadata = {
      name: "affinidi-verifier",
    };
    const requestId = uuidv4();
    const transactionId = uuidv4();
    const presentation_definition = {
      id: "vp token example",
      purpose:
        "Relying party is requesting your digital ID for the purpose of Self-Authentication",
      format: {
        ldp_vc: {
          proof_type: [
            "RsaSignature2018",
            "EcdsaSecp256k1Signature2019",
            "Ed25519Signature2020",
          ],
        },
      },
      input_descriptors: [
        {
          id: "id card credential",
          format: {
            ldp_vc: {
              proof_type: [
                "Ed25519Signature2020",
                "RsaSignature2018",
                "EcdsaSecp256k1Signature2019",
              ],
            },
          },
          constraints: {
            fields: [
              {
                path: ["$.credentialSubject.email"],
                filter: {
                  type: "string",
                  pattern: "@gmail.com",
                },
              },
            ],
          },
        },
      ],
    };

    const rawParams =
      `client_id=https://injiverify.dev1.mosip.net` +
      `&transactionId=${transactionId}` +
      `&presentation_definition=${JSON.stringify(presentation_definition)}` +
      `&response_type=vp_token` +
      `&response_mode=direct_post` +
      `&nonce=NUfki5MRgXXmMgXHDeX/6Q==` +
      `&state=${requestId}` +
      `&response_uri=${response_uri}` +
      `&client_metadata=${JSON.stringify(client_metadata)}`;
    const encoded = btoa(rawParams);
    const openidurl = `openid4vp://authorize?${encoded}`;
    setOpenidUrl(openidurl);

    console.log("Generated OpenID URL:", openidurl);
  };

  useEffect(() => {
    generateURL();
    const ws = new WebSocket(`${webSocketUrl}/ws`);

    ws.onmessage = async (event) => {
      console.log("WebSocket message received:", event.data);
      if (event.data === "ping") {
        //setStatus("waiting");
        return;
      }
      setErrorMessages([]);
      setStatus("received");
      const data = JSON.parse(event.data);
      setJsonResponse(data);

      await handleVerify(data);
    };

    return () => {
      console.log("Closing WebSocket connection");
      ws.close();
    };
  }, []);

  const handleVerify = async (data: any) => {
    try {
      setStatus("verifying");
      const response = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data_received: data,
        }),
      });

      const result = await response.json();

      console.log("Verification result:", result);
      setStatus(result.isValid ? "success" : "failure");

      if (!result.isValid) {
        const normalizedErrors = Array.isArray(result.errors)
          ? result.errors
          : [result.errors];
        setErrorMessages(normalizedErrors);
      }
    } catch (err: any) {
      console.error(err);
      setStatus("failure");
      setErrorMessages([err.message || "Unknown error occurred"]);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* LEFT SIDE */}
      <div className="w-1/2 bg-gray-100 p-10 flex flex-col justify-center">
        <h1 className="text-3xl font-bold mb-2">
          Affinidi: Credential Verification
        </h1>
        <h2 className="text-xl mb-4 text-gray-700">
          Share your Email Credential
        </h2>
        <p className="text-gray-600 mb-6">
          Scan the QR code to open your wallet app. You’ll review and share
          credentials with full control. Affinidi handles the verification and
          onboarding securely.
        </p>
        <QRCode value={openidUrl} size={300} />
        <div className="mt-6 text-sm text-blue-600">
          <Link
            target="_blank"
            href="/respond"
            className="underline hover:text-blue-800"
          >
            Or click here to send a mock response manually
          </Link>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-1/2 p-10">
        <h2 className="text-2xl font-semibold mb-4">Response Status</h2>
        <div className={`font-bold mb-4 ${statusColor[status]}`}>
          {statusLabel[status]}
        </div>
        {status === "failure" && errorMessages.length > 0 && (
          <div className="text-sm text-red-500 space-y-1 mb-4">
            {errorMessages.map((err, idx) => (
              <div key={idx}>• {err}</div>
            ))}
          </div>
        )}
        <div className="bg-gray-900 rounded p-4 text-white overflow-auto max-h-[500px]">
          {jsonResponse ? (
            <JSONPretty data={jsonResponse}></JSONPretty>
          ) : (
            <p className="text-gray-400">Awaiting response...</p>
          )}
        </div>
      </div>
    </div>
  );
}
