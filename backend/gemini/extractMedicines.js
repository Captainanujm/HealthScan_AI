// --- Utility functions for parsing Gemini output ---
function extractFirstJsonArray(text) {
  const match = text.match(/\[\s*{[\s\S]*?}\s*\]/);
  return match ? match[0] : '[]';
}

function parseGeminiResult(rawJson) {
  let arr = [];
  if (typeof rawJson === 'string') {
    try {
      const jsonStr = extractFirstJsonArray(rawJson);
      arr = JSON.parse(jsonStr);
    } catch {
      return [];
    }
  } else if (Array.isArray(rawJson)) {
    arr = rawJson;
  } else {
    return [];
  }

  return arr.map((item) => ({
    medicine: item.medicine?.trim() || "Unknown",
    dosage: item.dosage?.trim() || "N/A",
    timing: Array.isArray(item.timing) ? item.timing : [item.timing || "N/A"]
  }));
}

function generateReadableSummary(prescriptionData) {
  let summary = "📄 Your Prescription Summary:\n\n";

  prescriptionData.forEach((item, index) => {
    summary += `${index + 1}- ${item.medicine}\n`;
    summary += `   • Dosage: ${item.dosage}\n`;
    summary += `   • Timing: ${item.timing.join(", ")}\n\n`;
  });

  summary += `⏳ Duration: 7 Days\nPlease take medicines as per timing. Get well soon!`;

  return summary;
}

// --- Gemini API call ---
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
if (!API_KEY) {
  throw new Error('Gemini API key missing in .env');
}

const genAI = new GoogleGenerativeAI(API_KEY);

async function extractMedicinesFromText(inputText) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
You are a medical assistant. Extract medicine name, dosage and time from the following text and return in proper JSON format.

Example output:
[
  {
    "medicine": "Paracetamol",
    "dosage": "500mg",
    "timing": ["morning", "evening"]
  }
]

Text:
${inputText}
    `;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const extractedText = await response.text();
    return extractedText;

  } catch (err) {
    console.error("Error with Gemini:", err);
    throw new Error("Failed to extract medicines");
  }
}

export { extractFirstJsonArray, parseGeminiResult, generateReadableSummary, extractMedicinesFromText };
