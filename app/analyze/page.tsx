'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer,toast} from 'react-toastify';
import axios from 'axios';
import { useGlobalContext } from '../context/Globalcontext';

export default function Analyze() {
  const [aisummary, setAisummary] = useState<string>("");
  const { summary, setsummary, email, extractedText, imageURL } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    const fetchAnalysis = async () => {
      const ocrText = localStorage.getItem("ocrText");
      if (!ocrText) {
        toast.error("Please upload image first");
        router.push("/upload");
        return;
      }
      try {
        const response = await axios.post("http://localhost:3000/analyze", { text: ocrText }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        // jsonData is the readable summary string for UI
        const jsonData = response.data.summary;
        setAisummary(jsonData);
        setsummary(jsonData);

        // Use the parsed array from backend
        const summaryArray = response.data.parsed || [];
        // Map Gemini keys to your schema keys
        const mappedSummary = Array.isArray(summaryArray)
          ? summaryArray.map(item => ({
              medicinename: item.medicine || item.medicinename || '',
              dosage: item.dosage || '',
              frequency: item.timing || item.frequency || []
            }))
          : [];

        const res = await axios.post("http://localhost:3000/save", {
          email,
          imageURL,
          extractedText,
          summary: mappedSummary
        });
        const data = res.data;
        console.log("✅ Saved Successfully:", data);
      } catch (error) {
        toast.error("Failed to analyze the text.");
      } finally {
        setLoading(false);
      }
    };
    fetchAnalysis();
  }, []);
  

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100 p-4">
      <div className="w-full max-w-3xl mx-auto bg-white/90 shadow-2xl rounded-3xl p-10 border border-purple-200 backdrop-blur-md flex flex-col items-center gap-8">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 mb-6 tracking-tight flex items-center justify-center gap-2">
          <span role="img" aria-label="ai">🤖</span> HealthScan AI-Gemini Analysis
        </h2>

    
          {loading ? (
            <span className="flex items-center gap-2 justify-center"><span className="animate-spin">⏳</span> Analyzing...</span>
          ) : (
            <span className="flex items-center gap-2 justify-center"><span role="img" aria-label="analyze">🧬</span> Analyze with Gemini</span>
          )}

        {aisummary && (
          <>
            <div className="w-full mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6 shadow-inner">
              <h3 className="text-lg font-bold text-blue-700 mb-2 flex items-center gap-2"><span role="img" aria-label="output">📊</span> Analysis Summary:</h3>
              <pre className="w-full min-h-[120px] bg-blue-100 border-2 border-blue-200 rounded-lg p-4 text-gray-800 text-base font-mono overflow-x-auto whitespace-pre-wrap">
                {aisummary}
              </pre>
            </div>
            <button
              className="mt-6 w-full md:w-auto bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-8 py-3 rounded-xl font-bold text-lg shadow-lg hover:scale-105 hover:from-blue-600 hover:to-pink-600 transition-transform duration-200"
              onClick={() => {
                localStorage.setItem('summaryForEmail', aisummary);
                router.push('/summaryEmail');
              }}
            >
              <span className="flex items-center gap-2 justify-center">
                <span role="img" aria-label="email">✉️</span> Send this summary to email
              </span>
            </button>
          </>
        )}
      </div>
    </main>
  );
}
