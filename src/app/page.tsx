"use client";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import JSONPretty from "react-json-pretty";
import "react-json-pretty/themes/monikai.css";
import { webUrl, webSocketUrl } from "@/variables";
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

const statusDetails: Record<
  Status,
  { label: string; color: string; icon: React.ReactNode }
> = {
  waiting: {
    label: "Waiting for scan...",
    color: "text-gray-800 bg-gray-100",
    icon: (
      <svg
        className="animate-spin h-5 w-5 mr-2"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    ),
  },
  received: {
    label: "Response received!",
    color: "text-yellow-800 bg-yellow-100",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  validating: {
    label: "Validating...",
    color: "text-blue-800 bg-blue-100",
    icon: (
      <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" ></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" ></path>
      </svg>
    ),
  },
  verifying: {
    label: "Verifying...",
    color: "text-indigo-800 bg-indigo-100",
    icon: (
      <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" ></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" ></path>
      </svg>
    ),
  },
  success: {
    label: "✅ Verified!",
    color: "text-green-800 bg-green-100",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  },
  failure: {
    label: "❌ Verification Failed",
    color: "text-red-800 bg-red-100",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  },
};

export default function Home() {
  const [status, setStatus] = useState<Status>("waiting");
  const [jsonResponse, setJsonResponse] = useState<any>(null);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [openidUrl, setOpenidUrl] = useState("");

  const generateURL = () => {
    const response_uri = `${webUrl}/vp-response-callback`;
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
      const response = await fetch(`${webUrl}/verify-credentials`, {
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
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="text-center max-w-3xl mx-auto">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-blue-600 text-white font-bold text-xl rounded-lg h-12 w-12 flex items-center justify-center shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Affinidi: Credential Verification
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Scan the QR code with your wallet app to securely share and verify
          your credentials.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl">
        {/* LEFT CARD: QR Code */}
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 flex flex-col items-center justify-center text-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            Share your Credential
          </h2>
          <p className="mt-2 text-gray-500 mb-6">
            Your data is safe and you have full control.
          </p>
          <div className="p-4 bg-white rounded-lg border border-gray-200">
            <QRCode value={openidUrl} size={256} />
          </div>
          <div className="mt-6">
            <Link
              target="_blank"
              href="/respond"
              className="inline-flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 group-hover:animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Or send a mock response manually</span>
            </Link>
          </div>
        </div>

        {/* RIGHT CARD: Status */}
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Verification Status
          </h2>
          <div className={`inline-flex items-center font-bold text-base rounded-full px-4 py-2 ${statusDetails[status].color}`} >
            {statusDetails[status].icon}
            <span>{statusDetails[status].label}</span>
          </div>

          {status === "failure" && errorMessages.length > 0 && (
            <div className="mt-4 bg-red-50 border-l-4 border-red-400 text-red-700 p-4 rounded-r-lg" role="alert" >
              <p className="font-bold">Error Details</p>
              <ul className="mt-2 list-disc list-inside text-sm space-y-1">
                {errorMessages.map((err, idx) => (
                  <li key={idx}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              Raw Response
            </h3>
            <div className="bg-gray-900 rounded-lg p-4 text-white overflow-auto max-h-[400px] text-sm">
              {jsonResponse ? (
                <JSONPretty data={jsonResponse}></JSONPretty>
              ) : (
                <p className="text-gray-400">Awaiting response...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
