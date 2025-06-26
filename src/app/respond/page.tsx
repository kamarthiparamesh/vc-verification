"use client";

import { useState } from "react";
import JSONPretty from "react-json-pretty";
import "react-json-pretty/themes/monikai.css";
import { mockData } from "./mock-data";
import { webUrl } from "@/variables";

export default function RespondPage() {
  const [selectedKey, setSelectedKey] =
    useState<keyof typeof mockData>("passport_vp");
  const [jsonResponse, setJsonResponse] = useState<any>(mockData["passport_vp"]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const key = e.target.value as keyof typeof mockData;
    setSelectedKey(key);
    setJsonResponse(mockData[key]);
    setSent(false); // Reset status
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSent(false);
    try {
      await fetch(`${webUrl}/vp-response-callback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonResponse),
      });
      setSent(true);
    } catch (error) {
      console.error("Failed to send response:", error);
      // Optionally, show an error message to the user
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Mock Verifiable Presentation Response
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Use this page to simulate a wallet sending a response to the
            verifier.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left side: Form */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Configuration
              </h2>
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="mock-data-select"
                    className="block mb-2 font-semibold text-gray-700"
                  >
                    Select Mock Data
                  </label>
                  <select
                    id="mock-data-select"
                    value={selectedKey}
                    onChange={handleSelectChange}
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm px-3 py-2 w-full"
                  >
                    {Object.keys(mockData).map((key) => (
                      <option key={key} value={key}>
                        {key
                          .replace(/_/g, " ")
                          .replace(/\b\w/g, (l) => l.toUpperCase())}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full inline-flex justify-center items-center bg-blue-600 text-white px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" >
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" ></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" ></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    "Send Response"
                  )}
                </button>

                {sent && (
                  <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-r-lg" role="alert" >
                    <p className="font-bold">Success</p>
                    <p>The mock response has been sent successfully.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right side: JSON Preview */}
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                JSON Payload
              </h3>
              <div className="bg-gray-900 rounded-lg p-4 text-white overflow-auto max-h-[400px] text-sm">
                <JSONPretty data={jsonResponse}></JSONPretty>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
