
import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
if (!API_KEY) {
  throw new Error('Gemini API key is missing. Please set NEXT_PUBLIC_GEMINI_API_KEY in your .env.local file.');
}
const aiClient = new GoogleGenerativeAI(API_KEY);

/**
 * Extracts medicine information (name, dosage, timing) from a given text using Gemini AI.
 * @param inputText The text to analyze for medicine details.
 * @returns JSON string with extracted medicine details.
 */
export async function extractMedicinesFromText(inputText: string): Promise<string> {
  try {
    const model = aiClient.getGenerativeModel({ model: "gemini-1.5-flash" });
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
    const extractedText = response.text();
    return extractedText;
  } catch (error) {
    console.error('Error extracting medicines:', error);
    throw new Error('Failed to extract medicines');
  }
}