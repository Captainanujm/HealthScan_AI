'use client';

import { useState, useEffect } from 'react';
import { sendEmail } from '@/lib/sendEmail';
import { toast } from 'react-toastify';
import { useGlobalContext } from '../context/Globalcontext';

export default function EmailForm() {
  const [name, setName] = useState('');
  const {email, setEmail} = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState('');

  useEffect(() => {
    const savedSummary = localStorage.getItem('summaryForEmail') || '';
    setSummary(savedSummary);
  }, []);

  const handleSend = async () => {
    if (!name || !email) {
      toast.error('Please fill all fields');
      return;
    }
    setLoading(true);
    try {
      await sendEmail(name, email, summary);
      toast.success('📧 Email sent successfully!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to send email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-blue-100 to-purple-100 p-4">
      <div className="w-full max-w-lg mx-auto bg-white/90 shadow-2xl rounded-3xl p-10 border border-pink-200 backdrop-blur-md flex flex-col items-center gap-8">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-700 via-blue-700 to-purple-700 mb-4 tracking-tight flex items-center justify-center gap-2">
          <span role="img" aria-label="email">✉️</span> Send Summary to Email
        </h2>
        <div className="w-full flex flex-col gap-4">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl bg-pink-50 text-lg focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl bg-blue-50 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 shadow-inner mt-2">
            <h3 className="text-lg font-bold text-blue-700 mb-2 flex items-center gap-2"><span role="img" aria-label="summary">📄</span> Summary Preview:</h3>
            <pre className="w-full min-h-[80px] bg-blue-100 border-2 border-blue-200 rounded-lg p-3 text-gray-800 text-base font-mono overflow-x-auto whitespace-pre-wrap">
              {summary}
            </pre>
          </div>
          <button
            onClick={handleSend}
            disabled={loading}
            className="mt-4 bg-gradient-to-r from-pink-500 via-blue-500 to-purple-500 text-white py-3 px-6 rounded-xl font-bold text-lg shadow-lg hover:scale-105 hover:from-pink-600 hover:to-purple-600 transition-transform duration-200 w-full"
          >
            {loading ? (
              <span className="flex items-center gap-2 justify-center"><span className="animate-spin">⏳</span> Sending...</span>
            ) : (
              <span className="flex items-center gap-2 justify-center"><span role="img" aria-label="send">📧</span> Send Email</span>
            )}
          </button>
        </div>
      </div>
    </main>
  );
}
