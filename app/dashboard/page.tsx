'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useGlobalContext } from '../context/Globalcontext';

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
  const router = useRouter();
  const [data, setData] = useState<Prescription[]>([]);
  const [viewMode, setViewMode] = useState<'summary' | 'image'>('summary');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) router.push('/login');
    const email = localStorage.getItem('email');

    axios
      .get(`https://healthscan-ai-2.onrender.com/history/${email}`)
      .then((res) => setData(res.data))
      .catch((err) => console.error('Error fetching data', err));
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto pt-20">
      <h1 className="text-3xl font-extrabold mb-8 text-blue-900 flex items-center gap-2">
        Your Prescription History
      </h1>
      <div className="flex justify-center mb-10">
        <div className="flex bg-gray-200 rounded-full p-1 gap-1">
          <button
            className={`px-6 py-2 rounded-full font-medium transition ${
              viewMode === 'summary'
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                : 'text-gray-700'
            }`}
            onClick={() => setViewMode('summary')}
          >
          Summary View
          </button>
          <button
            className={`px-6 py-2 rounded-full font-medium transition ${
              viewMode === 'image'
                ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-md'
                : 'text-gray-700'
            }`}
            onClick={() => setViewMode('image')}
          >
            Image View
          </button>
        </div>
      </div>

     
      {data.length === 0 ? (
        <p className="text-gray-500 text-center">No prescriptions found.</p>
      ) : (
        <div className="space-y-6">
          {data.map((item, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-xl p-6 bg-white shadow hover:shadow-lg transition"
            >
              <p className="text-gray-600 mb-4">
                <span className="font-semibold text-gray-800">Uploaded:</span>{' '}
                {new Date(item.createdAt).toLocaleString()}
              </p>

              {viewMode === 'image' ? (
                <img
                  src={item.imageURL}
                  alt="Prescription"
                  className="rounded-md w-full max-w-md border mx-auto"
                />
              ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {item.summary.map((med, idx) => (
              <div key={idx} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                <h3 className="text-lg font-bold text-blue-700 mb-2">
                    {med.medicinename}
                        </h3>
              <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium text-gray-800">Dosage:</span> {med.dosage}
                </p>
               <p className="text-sm text-gray-600 mb-1 font-medium">Timing:</p>
                  <ul className="list-disc list-inside text-sm text-gray-700">
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
