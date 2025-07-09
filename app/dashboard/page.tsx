"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
interface Medicine {
  medicinename: string;
  dosage: string;
  timing: string[];
}

interface Prescription {
  imageURL: string;
  createdAt: string;
  summary: Medicine[];
}
const Dashboard = () => {
  const [data, setData] = useState<Prescription[]>([]);
  const [viewMode, setViewMode] = useState("summary");
  const email = "captainanuj2004@gmail.com"; // Replace with logged in user's email

  useEffect(() => {
    axios
      .get(`http://localhost:3000/history/${email}`)
      .then((res) => setData(res.data))
      .catch((err) => console.error("Error fetching data", err));
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4 flex items-center gap-2">
        📋 Prescription Dashboard
      </h1>

      <button
        onClick={() => setViewMode(viewMode === "summary" ? "image" : "summary")}
        className="px-4 py-2 bg-blue-600 text-white rounded-md mb-6 hover:bg-blue-700 transition"
      >
        Toggle: {viewMode === "summary" ? "Show Image" : "Show Summary"}
      </button>

      {data.length === 0 ? (
        <p className="text-gray-500">No prescriptions found.</p>
      ) : (
        <div className="space-y-6">
          {data.map((item, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg p-4 bg-white shadow-md"
            >
              <p className="text-gray-600 mb-2">
                <span className="font-medium text-gray-800">Uploaded On:</span>{" "}
                {new Date(item.createdAt).toLocaleString()}
              </p>

              {viewMode === "image" ? (
                <img
                  src={item.imageURL}
                  alt="Prescription"
                  className="rounded-md w-full max-w-md border"
                />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  {item.summary.map((med, idx) => (
                    <div
                      key={idx}
                      className="p-4 border border-gray-200 rounded-md bg-gray-50"
                    >
                      <p className="text-sm text-gray-500">Medicine</p>
                      <p className="font-semibold text-lg mb-1">
                        {med.medicinename}
                      </p>

                      <p className="text-sm text-gray-500">Dosage</p>
                      <p className="mb-1">{med.dosage}</p>

                      <p className="text-sm text-gray-500">Timing</p>
                      <ul className="list-disc list-inside text-gray-700 text-sm">
                        {med.timing.map((t, i) => (
                          <li key={i}>{t}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
