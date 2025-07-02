"use client";
import { useEffect, useState, useRef } from "react";
import QRCode from "react-qr-code";
import JSONPretty from "react-json-pretty";
import "react-json-pretty/themes/monikai.css"; // Keep this theme for light mode base
import { webUrl, webSocketUrl } from "@/variables";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";
// import Link from "next/link"; // Link is not used, can be removed if no future plans

// Helper component for status display
const StatusBadge = ({
  label,
  color,
  icon,
  isDarkMode,
  darkColor,
}: {
  label: string;
  color: string;
  icon: React.ReactNode;
  isDarkMode: boolean;
  darkColor?: string; // Optional dark mode color
}) => (
  <div
    className={`inline-flex items-center font-semibold text-base rounded-full px-4 py-2 transition-all duration-300 ease-in-out ${
      isDarkMode && darkColor ? darkColor : color
    }`}
  >
    {icon}
    <span>{label}</span>
  </div>
);

// Helper component for feature list items with title
const FeatureListItem = ({
  title,
  iconColor,
  isDarkMode,
}: {
  title: string;
  iconColor: string;
  isDarkMode: boolean; // Pass isDarkMode prop
}) => (
  <li
    className={`flex items-start ${
      isDarkMode ? "text-gray-300" : "text-gray-700"
    }`}
  >
    <svg
      className={`h-4 w-4 ${iconColor} mr-2 mt-1 flex-shrink-0`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
    <div className="flex flex-col">
      <h4 className={`font-semibold text-sm ${isDarkMode ? "text-white" : ""}`}>
        {title}
      </h4>
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
  { label: string; color: string; icon: React.ReactNode; darkColor?: string } // Added darkColor
> = {
  waiting: {
    label: "Waiting for scan…",
    color: "text-gray-700 bg-gray-100",
    darkColor: "text-gray-300 bg-gray-700",
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
    darkColor: "text-yellow-300 bg-yellow-800",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 mr-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  validating: {
    label: "Validating…",
    color: "text-blue-800 bg-blue-100",
    darkColor: "text-blue-300 bg-blue-800",
    icon: (
      <svg
        className="animate-spin h-4 w-4 mr-2"
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
  verifying: {
    label: "Verifying…",
    color: "text-indigo-800 bg-indigo-100",
    darkColor: "text-indigo-300 bg-indigo-800",
    icon: (
      <svg
        className="animate-spin h-4 w-4 mr-2"
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
  success: {
    label: "Verified!",
    color: "text-green-800 bg-green-100",
    darkColor: "text-green-300 bg-green-800",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 mr-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  failure: {
    label: "Verification Failed",
    color: "text-red-800 bg-red-100",
    darkColor: "text-red-300 bg-red-800",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 mr-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
};

export default function Home() {
  const [status, setStatus] = useState<Status>("waiting");
  const [jsonResponse, setJsonResponse] = useState<any>(null);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [openidUrl, setOpenidUrl] = useState("");
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
          const verifiableCredentials = Array.isArray(
            vpToken.verifiableCredential
          )
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

  // The QR Code component is size=280.
  // Its parent div has p-5 (20px top/bottom padding).
  // So, the total height of the QR code's visual block is 280 (QR) + 20 (p-top) + 20 (p-bottom) = 320px.
  const contentBlockTotalHeight = 380; // 380px

  return (
    <main
      className={`h-screen flex flex-col items-center justify-between p-6 font-sans ${
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      } text-gray-800 transition-colors duration-500`}
    >
      <header className="w-full max-w-4xl mx-auto mb-4 mt-2 flex-shrink-0">
        {/* Theme Toggle Button */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`absolute top-6 right-6 p-2 rounded-full shadow-lg z-10 ${
            isDarkMode
              ? "bg-gray-800 text-yellow-300"
              : "bg-white text-gray-700"
          } transition-colors duration-300`}
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v1m0 16v1m9-9h1M4 12H3m15.325 5.56l-.707.707M6.343 6.343l-.707-.707m12.728 0l-.707-.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9 9 0 008.354-5.646z"
              />
            </svg>
          )}
        </button>

        <h1
          className={`text-3xl sm:text-4xl font-extrabold leading-tight tracking-tight mb-2 text-center ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Enabling Cross-Border Trust for Global Hiring
        </h1>
        <p
          className={`text-base max-w-2xl mx-auto mb-1 text-center ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Instant, cross-border credential verification from your own Digital ID
          wallet
        </p>
        <p
          className={`text-sm font-medium flex items-center justify-center ${
            isDarkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Powered by{" "}
          <img
            src="/Affinidi.png"
            alt="Affinidi Logo"
            className="h-4 w-auto mx-1 inline-block"
          />{" "}
          - a Temasek-backed decentralised trust network
        </p>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-6xl flex-grow">
        {/* LEFT PANEL: Share Your Credential */}
        <div
          className={`rounded-3xl shadow-xl p-6 flex flex-col items-start text-left border ${
            isDarkMode
              ? "border-gray-700 bg-gray-800"
              : "border-gray-100 bg-white"
          } transition-colors duration-500 hover:shadow-2xl overflow-auto`}
        >
          <h2
            className={`text-2xl sm:text-3xl font-semibold mb-3 ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Share your global career credentials
          </h2>
          <p
            className={`text-base mb-4 max-w-md ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Easily share your portable, trusted records
          </p>

          <ul
            className={`text-left space-y-2 mb-4 w-full max-w-sm flex-shrink-0 ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            <FeatureListItem
              title="User controlled"
              iconColor={isDarkMode ? "text-blue-400" : "text-blue-500"}
              isDarkMode={isDarkMode}
            />
            <FeatureListItem
              title="Portable and secure"
              iconColor={isDarkMode ? "text-blue-400" : "text-blue-500"}
              isDarkMode={isDarkMode}
            />
            <FeatureListItem
              title="Trusted globally"
              iconColor={isDarkMode ? "text-blue-400" : "text-blue-500"}
              isDarkMode={isDarkMode}
            />
          </ul>

          <p
            className={`text-lg font-semibold mb-4 flex-shrink-0 text-center w-full ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Scan with your Digital ID Wallet:
          </p>
          <div
            ref={qrCodeRef}
            className={`p-5 rounded-xl border shadow-lg relative overflow-hidden transform transition-transform duration-300 hover:scale-105 flex-shrink-0
            ${
              isDarkMode
                ? "bg-white border-gray-700"
                : "bg-white border-gray-200"
            }
            flex items-center justify-center mx-auto`}
            style={{
              width: `${contentBlockTotalHeight}px`,
              height: `${contentBlockTotalHeight}px`,
            }} // Fixed size including padding
          >
            <QRCode
              value={openidUrl}
              size={320} // Size of the QR code itself
              fgColor="#000000"
              bgColor="#FFFFFF"
              level="H"
            />
          </div>
        </div>

        {/* RIGHT PANEL: Verification Status */}
        <div
          className={`rounded-3xl shadow-xl p-6 flex flex-col border transition-all duration-300 hover:shadow-2xl ${
            isDarkMode
              ? "border-gray-700 bg-gray-800"
              : "border-gray-100 bg-white"
          } overflow-auto`}
        >
          <h2
            className={`text-2xl sm:text-3xl font-semibold mb-3 flex-shrink-0 ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Check your credentials verification status{" "}
          </h2>
          <p
            className={`text-base mb-4 max-w-md ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Processing your credential for authenticity and integrity
          </p>

          <ul
            className={`text-left space-y-2 mb-4 ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            <FeatureListItem
              title="Fast verification"
              iconColor={isDarkMode ? "text-green-400" : "text-blue-500"}
              isDarkMode={isDarkMode}
            />
            <FeatureListItem
              title="No login, no forms"
              iconColor={isDarkMode ? "text-green-400" : "text-blue-500"}
              isDarkMode={isDarkMode}
            />
            <FeatureListItem
              title="Cryptographically secure"
              iconColor={isDarkMode ? "text-green-400" : "text-blue-500"}
              isDarkMode={isDarkMode}
            />
          </ul>
          <div className="mb-4 flex-shrink-0">
            <StatusBadge {...statusDetails[status]} isDarkMode={isDarkMode} />
          </div>
          {/* New wrapper to control bottom alignment within the right panel */}
          <div className="flex-grow flex flex-col justify-end">
            {status === "failure" && errorMessages.length > 0 && (
              <div
                // Removed mt-auto from here. Added mb-4 for spacing to the JSON box.
                className={`bg-red-50 border-l-4 border-red-400 text-red-700 p-3 rounded-r-lg shadow-sm transition-all duration-300 animate-fade-in flex-shrink-0 mb-4 ${
                  isDarkMode
                    ? "bg-red-900 bg-opacity-30 border-red-600 text-red-300"
                    : ""
                }`}
                role="alert"
              >
                <p className="font-bold text-sm mb-1">Error Details</p>
                <ul className="list-disc list-inside text-xs space-y-0.5">
                  {errorMessages.map((err, idx) => (
                    <li key={idx}>{err}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="pt-4 border-t border-gray-100 flex-shrink-0">
              <h3
                className={`text-lg font-semibold mb-2 ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
              >
                Raw response data:
              </h3>
              <div
                className={`rounded-lg p-5 overflow-y-auto text-xs font-mono shadow-inner border flex ${
                  isDarkMode
                    ? "bg-gray-950 text-gray-300 border-gray-700"
                    : "bg-gray-900 text-white border-gray-700"
                }`}
                style={{ height: "280px" }} // Fixed height matching QR block
              >
                {jsonResponse ? (
                  <JSONPretty data={jsonResponse}></JSONPretty>
                ) : (
                  <p className="text-gray-400 text-base text-center">
                    Awaiting response...
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section - kept clean with fixed space */}
      <footer
        className={`mt-6 h-20 w-full flex-shrink-0 ${
          isDarkMode ? "bg-gray-900" : "bg-gray-50" // Ensure background matches main for clean aesthetic
        } transition-colors duration-500`}
      >
        {/* Intentionally left blank as per request to keep space without text */}
      </footer>
    </main>
  );
}
