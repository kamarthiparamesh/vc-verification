"use client";
import { useEffect, useState, useRef } from "react";
import QRCode from "react-qr-code";
import JSONPretty from "react-json-pretty";
import "react-json-pretty/themes/monikai.css";
import { webUrl, webSocketUrl } from "@/variables";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";
import Link from "next/link";

// Helper component for status display
const StatusBadge = ({ label, color, icon }: { label: string; color: string; icon: React.ReactNode }) => (
  <div className={`inline-flex items-center font-semibold text-base rounded-full px-4 py-2 transition-all duration-300 ease-in-out ${color}`}>
    {icon}
    <span>{label}</span>
  </div>
);

// Helper component for feature list items with title and description
const FeatureListItem = ({ title, description, iconColor }: { title: string; description: string; iconColor: string }) => (
  <li className="flex items-start text-gray-700">
    <svg className={`h-4 w-4 ${iconColor} mr-2 mt-1 flex-shrink-0`} fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
    <div className="flex flex-col">
      <h4 className="font-semibold text-sm">{title}</h4>
      <p className="text-xs text-gray-600">{description}</p>
    </div>
  </li>
);

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
    label: "Waiting for scan…",
    color: "text-gray-700 bg-gray-100",
    icon: (
      <svg
        className="animate-spin h-4 w-4 mr-2 text-gray-600"
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
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  validating: {
    label: "Validating…",
    color: "text-blue-800 bg-blue-100",
    icon: (
      <svg className="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" ></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" ></path>
      </svg>
    ),
  },
  verifying: {
    label: "Verifying…",
    color: "text-indigo-800 bg-indigo-100",
    icon: (
      <svg className="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" ></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" ></path>
      </svg>
    ),
  },
  success: {
    label: "Verified!",
    color: "text-green-800 bg-green-100",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  },
  failure: {
    label: "Verification Failed",
    color: "text-red-800 bg-red-100",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  },
};

export default function Home() {
  const [status, setStatus] = useState<Status>("waiting");
  const [jsonResponse, setJsonResponse] = useState<any>(null);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [openidUrl, setOpenidUrl] = useState("");
  const [showSimulateLink, setShowSimulateLink] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false); // State for dark mode

  const qrCodeRef = useRef<HTMLDivElement>(null);

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
      `&client_metadata=${JSON.stringify(client_metadata)}`;
    const encoded = btoa(rawParams);
    const openidurl = `openid4vp://authorize?${encoded}`;
    setOpenidUrl(openidurl);
  };

  useEffect(() => {
    generateURL();
    const ws = new WebSocket(`${webSocketUrl}`);

    ws.onmessage = async (event) => {
      if (event.data === "ping") {
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
            // Handle both array of strings and single string for verifiableCredential
            const verifiableCredentials = Array.isArray(vpToken.verifiableCredential)
                ? vpToken.verifiableCredential
                : [vpToken.verifiableCredential];

            credential = [];
            for (const vcStr of verifiableCredentials) {
                const vc = JSON.parse(vcStr);
                if (vc?.verifiableCredential?.credential) {
                    credential.push(vc.verifiableCredential.credential);
                } else {
                    // Fallback for cases where 'credential' might be directly under vc
                    credential.push(vc);
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
    // Set h-screen and flex-col for the main container
    <main className={`h-screen flex flex-col items-center justify-between p-6 font-sans ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} text-gray-800 transition-colors duration-500`}>
      <header className="text-center w-full max-w-4xl mx-auto mb-4 mt-2 flex-shrink-0">
        {/* Theme Toggle Button */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`absolute top-6 right-6 p-2 rounded-full shadow-lg z-10 ${isDarkMode ? 'bg-gray-800 text-yellow-300' : 'bg-white text-gray-700'} transition-colors duration-300`}
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h1M4 12H3m15.325 5.56l-.707.707M6.343 6.343l-.707-.707m12.728 0l-.707-.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9 9 0 008.354-5.646z" />
            </svg>
          )}
        </button>

        <div className="flex items-center justify-center mb-3">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-bold text-xl rounded-full h-14 w-14 flex items-center justify-center shadow-lg transform transition-transform duration-300 hover:scale-105">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        <h1 className={`text-3xl sm:text-4xl font-extrabold leading-tight tracking-tight mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Trusted Education Record Verification — Anytime, Anywhere, Controlled by YOU
        </h1>
        <p className={`text-lg max-w-2xl mx-auto mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Instant, cross-border credential verification from your own digital ID wallet.
        </p>
        <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>(Powered by Affinidi’s decentralized trust infrastructure: Temasek-backed. Open Standards. Borderless.)</p>
      </header>

      {/* Main content section - use flex-auto to fill available vertical space */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-6xl flex-auto overflow-hidden">
        {/* LEFT PANEL: Share Your Credential */}
        {/* Make this panel itself a flex container with overflow-auto */}
        <div className={`rounded-3xl shadow-xl p-6 flex flex-col items-center text-center border ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-100 bg-white'} transition-colors duration-500 hover:shadow-2xl overflow-auto`}>
          <h2 className={`text-2xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            Share Your Credential
          </h2>
          <p className={`text-base mb-4 max-w-md ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Your secure gateway to sharing academic achievements.
          </p>

          <ul className={`text-left space-y-2 mb-4 w-full max-w-sm flex-shrink-0 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <FeatureListItem
              title="W3C VC Compatible"
              description="Your education records in W3C Verifiable Credentials format."
              iconColor="text-blue-500"
            />
            <FeatureListItem
              title="User-Controlled"
              description="No intermediaries; you stay in control."
              iconColor="text-blue-500"
            />
            <FeatureListItem
              title="Standards-Based"
              description="Leveraging Verifiable Credentials + OpenID."
              iconColor="text-blue-500"
            />
          </ul>

          <p className={`text-lg font-semibold mb-4 flex-shrink-0 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            Scan with your Digital ID Wallet:
          </p>
          <div
            ref={qrCodeRef}
            className={`p-5 rounded-xl border shadow-lg relative overflow-hidden transform transition-transform duration-300 hover:scale-105 flex-shrink-0
            ${isDarkMode ? 'bg-white border-gray-700' : 'bg-white border-gray-200'}
            min-w-[280px] min-h-[280px] flex items-center justify-center`} // Added min-w and min-h directly as Tailwind classes
          >
            <QRCode
              value={openidUrl}
              size={240} // Adjusted size to fit within the 280px container with p-5 (20px) padding
              fgColor="#000000" // Pure black
              bgColor="#FFFFFF" // Pure white
              level="H" // High error correction
            />
            <div className="absolute inset-0 bg-blue-50 opacity-0 transition-opacity duration-300 hover:opacity-10 pointer-events-none"></div>
          </div>

          {showSimulateLink && (
            <div className="mt-4 flex items-center justify-center group flex-shrink-0">
              <Link
                target="_blank"
                href="/respond"
                className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors font-medium"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 group-hover:animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Or click here to simulate a credential response</span>
              </Link>
              <button
                onClick={() => setShowSimulateLink(false)}
                className={`ml-2 p-1 rounded-full hover:bg-gray-200 transition-colors ${isDarkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-500'}`}
                aria-label="Hide simulation link"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* RIGHT PANEL: Verification Status */}
        {/* Make this panel itself a flex container with overflow-auto */}
        <div className={`rounded-3xl shadow-xl p-6 flex flex-col border transition-all duration-300 hover:shadow-2xl ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-100 bg-white'} overflow-auto`}>
          <h2 className={`text-2xl font-bold mb-3 flex-shrink-0 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            Verification Status
          </h2>
          <p className={`text-base mb-4 max-w-md flex-shrink-0 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Once you scan the QR, your credential will be verified in real-time
            using <span className="font-bold text-blue-600">cryptographic proof</span> – <span className="font-semibold text-gray-700 italic">no username, no password, no paperwork.</span>
          </p>

          <div className="mb-4 flex-shrink-0">
            <StatusBadge {...statusDetails[status]} />
          </div>

          <ul className={`text-left space-y-2 mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <FeatureListItem
              title="Secure & Private"
              description="Tamper-evident and privacy-preserving."
              iconColor="text-green-500"
            />
            <FeatureListItem
              title="Globally Compliant"
              description="Meets global interoperability standards."
              iconColor="text-green-500"
            />
            <FeatureListItem
              title="Reusable & Portable"
              description="Credentials for future opportunities."
              iconColor="text-green-500"
            />
          </ul>

          {status === "failure" && errorMessages.length > 0 && (
            <div className="mt-auto bg-red-50 border-l-4 border-red-400 text-red-700 p-3 rounded-r-lg shadow-sm transition-all duration-300 animate-fade-in flex-shrink-0" role="alert" >
              <p className="font-bold text-sm mb-1">Error Details</p>
              <ul className="list-disc list-inside text-xs space-y-0.5">
                {errorMessages.map((err, idx) => (
                  <li key={idx}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-4 pt-4 border-t border-gray-100 flex-shrink-0">
            <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Raw Response Data
            </h3>
            <div className={`rounded-lg p-3 overflow-y-auto max-h-[150px] text-xs font-mono shadow-inner border ${isDarkMode ? 'bg-gray-950 text-gray-300 border-gray-700' : 'bg-gray-900 text-white border-gray-700'}`}>
              {jsonResponse ? (
                <JSONPretty data={jsonResponse}></JSONPretty>
              ) : (
                <p className="text-gray-400">Awaiting response...</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={`mt-6 text-center text-sm max-w-3xl px-4 flex-shrink-0 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        <p className="font-medium leading-relaxed">
          A live demonstration of <span className="font-bold text-blue-700">person-centric trust</span> in action – enabling seamless,
          <span className="font-bold text-blue-700"> standards-based credential exchange</span> across borders, starting with education.
        </p>
      </footer>
    </main>
  );
}