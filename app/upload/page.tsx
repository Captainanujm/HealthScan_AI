"use client"
import React, { useState } from 'react'
import {useRouter} from "next/navigation"
import Tesseract from 'tesseract.js';
import { ToastContainer, toast } from 'react-toastify';
const UploadPage = () => {
  const router=useRouter();
  const [selectedFile,setSelectedFile]=useState<File|null>(null);
  const [loading,setLoading]=useState(false);
  const [extractedText,setExtractedText]=useState("");
  function handleFileChange(e:React.ChangeEvent<HTMLInputElement>){
      const file=e.target.files?.[0];
      if(file&&(file.type.startsWith("image/"))||file?.type.startsWith("")){
        setSelectedFile(file);
      }else{
        toast.error("Please upload image file only");
      }
  }
  function handleOCR() {
  if (selectedFile) {
    setLoading(true);
    Tesseract.recognize(selectedFile, "eng+hin", {
      logger: m => console.log(m),
    }).then((result) => {
      const extracted = result.data.text;
      setExtractedText(extracted);
      localStorage.setItem('ocrText', extracted);

      const response = localStorage.getItem('ocrText');
      console.log("✅ OCR Extracted:", response);

      setLoading(false);
      router.push('/analyze'); // push after everything
    }).catch((err) => {
      setLoading(false);
      toast.error("OCR failed: " + err.message);
    });
  } else {
    toast.error("Please upload an image first");
  }
}

  return (
     <main className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">📤 Upload Your Prescription</h2>

        <div className="space-y-4">
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            className="file:px-4 file:py-2 file:rounded file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 text-sm"
          />

          {selectedFile && (
            <>
              <button
                onClick={handleOCR}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                Extract Text
              </button>

              <img
                src={URL.createObjectURL(selectedFile)}
                alt="Preview"
                className="mt-4 w-full max-h-64 object-contain border rounded"
              />
            </>
          )}

          {loading && <p className="text-blue-600">⏳ Processing image...</p>}

          {extractedText && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">📝 Extracted Text:</h3>
              <textarea
                readOnly
                value={extractedText}
                className="w-full h-40 p-2 border rounded bg-gray-100 text-sm"
              />
            </div>
          )}
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </main>
  )
}

export default UploadPage;
