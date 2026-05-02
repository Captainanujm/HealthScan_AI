import type { Metadata } from "next";
import "./globals.css";
import { GlobalProvider } from "./context/Globalcontext";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "HealthScan AI — Instant Prescription Analysis Powered by AI",
  description:
    "Upload your medical prescription or lab report and get instant AI-powered analysis. Extract medicines, dosages, and timing with Gemini AI and Tesseract OCR.",
  keywords: [
    "health scan",
    "AI prescription reader",
    "medical report analyzer",
    "OCR prescription",
    "Gemini AI health",
    "medicine extractor",
  ],
  openGraph: {
    title: "HealthScan AI — AI-Powered Prescription Analysis",
    description:
      "Instantly analyze prescriptions using OCR + Gemini AI. Get structured medicine summaries and email them to yourself.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <GlobalProvider>
          <Navbar />
          <main>{children}</main>
        </GlobalProvider>
      </body>
    </html>
  );
}
