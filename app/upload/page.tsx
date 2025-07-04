"use client"
import React, { useState } from 'react'
import {useRouter} from "next/navigation"
import Tesseract from 'tesseract.js';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { useGlobalContext } from '../context/Globalcontext';

const UploadPage = () => {
  const router=useRouter();
  const [selectedFile,setSelectedFile]=useState<File|null>(null);
  const [loading,setLoading]=useState(false);
  const {extractedText,setExtractedText}=useGlobalContext();
  const {imageURL,setImageURL}=useGlobalContext();
  function handleFileChange(e:React.ChangeEvent<HTMLInputElement>){
      const file=e.target.files?.[0];
      if(file&&(file.type.startsWith("image/"))){
        setSelectedFile(file);
      }else{
        toast.error("Please upload image file only");
      }
  }
 async function handleFileUploadExtract(){
  if (!selectedFile) {
    toast.error("Please select an image first.");
    return;
  }
  const formData=new FormData();
formData.append("image",selectedFile);
const res=await axios.post("http://localhost:3000/upload",formData);

console.log("Response from server:", res.data);
localStorage.setItem("ocrText",res.data.rawText);
setImageURL(res.data.imageURL);
setExtractedText(res.data);
router.push("/analyze");
toast.success("✅ OCR Extracted Successfully!");
 }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl mx-auto bg-white/90 shadow-2xl rounded-3xl p-8 border border-blue-200 backdrop-blur-md">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-blue-700 mb-6 tracking-tight flex items-center justify-center gap-2">
          <span role="img" aria-label="upload">📤</span> Upload Your Prescription
        </h2>

        <div className="space-y-6">
          <label className="block cursor-pointer group">
            <span className="block text-base font-medium text-gray-700 mb-2 group-hover:text-blue-700 transition">Select Image File</span>
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            <div className="flex items-center gap-3">
              <div className="flex-1 px-4 py-3 rounded-lg border border-dashed border-blue-400 bg-blue-50 text-blue-700 text-sm group-hover:border-blue-600 transition">
                {selectedFile ? selectedFile.name : 'No file chosen'}
              </div>
              <span className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition cursor-pointer">Browse</span>
            </div>
          </label>

          {selectedFile && (
            <div className="flex flex-col md:flex-row gap-6 items-center justify-between mt-2">
              <button
                onClick={handleFileUploadExtract}
                className="bg-gradient-to-r from-green-400 to-green-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:from-green-500 hover:to-green-700 transition w-full md:w-auto"
              >
                <span onClick={()=>{
                }} role="img" aria-label="extract">🧾</span> Analyze with medical AI
              </button>

              <img
                src={URL.createObjectURL(selectedFile)}
                alt="Preview"
                className="w-full md:w-56 max-h-64 object-contain border-2 border-blue-200 rounded-xl shadow-md bg-white"
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
