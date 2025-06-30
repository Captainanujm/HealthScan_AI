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

export { extractMedicinesFromText };
