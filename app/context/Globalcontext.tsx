"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export interface MedicineSummary {
  medicinename: string;
  dosage: string;
  frequency: string[];
}
interface GlobalContextType {
  email: string;
  setEmail: (email: string) => void;
  summary: MedicineSummary[];
  setsummary: (summary: MedicineSummary[]) => void;
  extractedText: string;
  setExtractedText: (text: string) => void;
  imageURL: string;
  setImageURL: (url:string) => void;
}

// 2. Create context 
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

//  3. Create provider
export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [email, setEmail] = useState<string>("");
  const [summary, setsummary] = useState<MedicineSummary[]>([]);
  const [extractedText,setExtractedText] = useState<string>("");
  const [imageURL, setImageURL] = useState<string>("");

  return (
    <GlobalContext.Provider
      value={{ email, setEmail, summary, setsummary, extractedText, setExtractedText, imageURL, setImageURL }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// 4. Custom hook to use context
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
