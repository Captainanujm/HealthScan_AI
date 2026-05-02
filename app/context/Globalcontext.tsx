"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface MedicineSummary {
  medicinename: string;
  dosage: string;
  frequency: string[];
}

export interface AnalysisResult {
  parsed: MedicineSummary[];
  summary: string;
  rawText: string;
}

interface GlobalContextType {
  email: string;
  setEmail: (email: string) => void;
  userName: string;
  setUserName: (name: string) => void;
  summary: MedicineSummary[];
  setsummary: (summary: MedicineSummary[]) => void;
  imageURL: string;
  setImageURL: (url: string) => void;
  analysisResult: AnalysisResult | null;
  setAnalysisResult: (result: AnalysisResult | null) => void;
  isAuthenticated: boolean;
  logout: () => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [email, setEmail] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [summary, setsummary] = useState<MedicineSummary[]>([]);
  const [imageURL, setImageURL] = useState<string>("");
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const storedEmail = typeof window !== "undefined" ? localStorage.getItem("email") : null;
    if (token) {
      setIsAuthenticated(true);
    }
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("ocrText");
    localStorage.removeItem("summaryForEmail");
    setIsAuthenticated(false);
    setEmail("");
    setUserName("");
    setSummary([]);
    setImageURL("");
    setAnalysisResult(null);
  };

  // wrapper to also update auth state when email is set
  const handleSetEmail = (newEmail: string) => {
    setEmail(newEmail);
  };

  const setSummary = (s: MedicineSummary[]) => {
    setsummary(s);
  };

  return (
    <GlobalContext.Provider
      value={{
        email,
        setEmail: handleSetEmail,
        userName,
        setUserName,
        summary,
        setsummary: setSummary,
        imageURL,
        setImageURL,
        analysisResult,
        setAnalysisResult,
        isAuthenticated,
        logout,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
