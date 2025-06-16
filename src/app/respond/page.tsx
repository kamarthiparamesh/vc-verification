"use client";

import { useState } from "react";
import JSONPretty from "react-json-pretty";
import { mockData } from "./mock-data";
import { webCallback } from "@/variables";

export default function RespondPage() {
  const [selectedKey, setSelectedKey] =
    useState<keyof typeof mockData>("passport_vp");
  const [jsonResponse, setJsonResponse] = useState<any>(
    mockData["passport_vp"]
  );
  const [sent, setSent] = useState(false);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const key = e.target.value as keyof typeof mockData;
    setSelectedKey(key);
    setJsonResponse(mockData[key]);
    setSent(false); // Reset status
  };

  const handleSubmit = async () => {
    await fetch(webCallback, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonResponse),
    });
    setSent(true);
  };

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">Mock Scan Response</h1>
      <div className="mb-4">
        <label className="block mb-2 font-semibold text-gray-700">
          Select Mock Data
        </label>
        <select
          value={selectedKey}
          onChange={handleSelectChange}
          className="border rounded px-3 py-2 w-full max-w-sm"
        >
          {Object.keys(mockData).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
      </div>
      {sent && <p className="text-green-600 mt-4">✅ Response Sent!</p>}
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Send Response
      </button>
      <p className="mt-6 text-gray-600 font-semibold">Sample JSON Response:</p>
      <div className="mt-2 bg-white rounded-lg shadow p-4">
        <JSONPretty data={jsonResponse}></JSONPretty>
      </div>
    </div>
  );
}
