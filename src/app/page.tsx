"use client";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import JSONPretty from "react-json-pretty";
import "react-json-pretty/themes/monikai.css";
import { webCallbackUrl, webSocketUrl, webVerifyUrl } from "@/variables";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";
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
    const response_uri = webCallbackUrl;
    const client_metadata = {
      name: "affinidi-verifier",
    };
    const transactionId = uuidv4();
    const nonce = crypto.randomBytes(16).toString("base64");
    const state = crypto.randomBytes(16).toString("base64");
    const presentation_definition = {
      id: "vp token example",
      purpose:
        "Relying party is requesting your digital ID for the purpose of Self-Authentication",
      input_descriptors: [
        {
          id: "id card credential",
          constraints: {
            fields: [
              {
                path: ["$.credentialSubject.type"],
                filter: { type: "string", pattern: "degreeCertificate15" },
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
      `&nonce=${nonce}` +
      `&state=${state}` +
      `&response_uri=${response_uri}` +
      // `&response_uri=https://e1ae-2401-4900-1cbc-deb0-7c90-c84b-6052-fd40.ngrok-free.app/verifier/vp-response` +
      // `&response_uri=https://app.credissuer.com/api/verifier/vp/presentation/86/vp-response` +
      `&client_metadata=${JSON.stringify(client_metadata)}`;
    const encoded = btoa(rawParams);
    const openidurl = `openid4vp://authorize?${encoded}`;
    console.log("Raw OpenID URL:", `openid4vp://authorize?${rawParams}`);
    setOpenidUrl(openidurl);
  };

  useEffect(() => {
    generateURL();
    console.log("webSocketUrl:", webSocketUrl);
    const ws = new WebSocket(`${webSocketUrl}`);

    ws.onmessage = async (event) => {
      console.log("WebSocket message received:", event.data);
      if (event.data === "ping") {
        //setStatus("waiting");
        return;
      }
      setErrorMessages([]);
      setStatus("received");
      try {
        const data = JSON.parse(event.data);
        setJsonResponse(data);
        let credential = data;
        const { vp_token, presentation_submission, state } = data;
        if (vp_token) {
          const vpToken = JSON.parse(vp_token);
          credential = [];
          for (const vcStr of vpToken.verifiableCredential) {
            const vc = JSON.parse(vcStr);
            if (vc?.verifiableCredential?.credential) {
              credential.push(vc.verifiableCredential.credential);
            }
          }
        }

        await handleVerify(credential);
      } catch (err: any) {
        console.error("Error parsing WebSocket message:", err);
        setStatus("failure");
        setErrorMessages([err.message || "Failed to parse response"]);
        return;
      }
    };

    return () => {
      console.log("Closing WebSocket connection");
      ws.close();
    };
  }, []);

  const handleVerify = async (data: any) => {
    try {
      setStatus("verifying");
      const response = await fetch(webVerifyUrl, {
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
