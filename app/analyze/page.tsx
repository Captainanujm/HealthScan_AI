'use client';
import Link from 'next/link';
import { useState } from 'react';
import { extractMedicinesFromText } from '../../lib/geminiProcessor';
import { generateReadableSummary,parseGeminiResult } from './generateReadable';
import EmailForm from '../summaryEmail/page';

export default function Analyze() {
  const [jsonOutput, setJsonOutput] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    const ocrText=localStorage.getItem("ocrText");
    
     if (!ocrText) {
    setJsonOutput("No OCR text found in localStorage!");
    return;
  }
    setLoading(true);
    try {
        
      const result = await extractMedicinesFromText(ocrText);
      console.log("✅ Gemini Result:", result);
      const parsedData = parseGeminiResult(result);

const summary = generateReadableSummary(parsedData);

      setJsonOutput(summary);
    } catch (err) {
      console.error(err);
      setJsonOutput('Something went wrong!');
    }
    setLoading(false);
  };
  

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">HealthScan AI-Gemini Analysis</h2>

        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Analyzing...' : 'Analyze with Gemini'}
        </button>

        {jsonOutput && (
          <pre className="mt-6 bg-gray-100 p-4 rounded overflow-x-auto text-sm">
            {jsonOutput}
          </pre>
        )}
        <EmailForm summary={jsonOutput} />
        
      </div>
    </main>
  );
}
