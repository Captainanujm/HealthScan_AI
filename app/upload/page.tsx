'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useGlobalContext } from '../context/Globalcontext';
import {
  Upload,
  FileImage,
  X,
  Brain,
  CheckCircle2,
  Loader2,
  ImagePlus,
  FileText,
  ArrowRight,
} from 'lucide-react';

const API_URL = 'https://healthscan-ai-2.onrender.com';

type UploadStep = 'idle' | 'uploading' | 'processing' | 'done';

const UploadPage = () => {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [step, setStep] = useState<UploadStep>('idle');
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { setImageURL } = useGlobalContext();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  // Cleanup preview URL
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file (JPG, PNG, etc.)');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File too large. Max 10MB.');
      return;
    }
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
    setStep('idle');
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const clearFile = () => {
    setSelectedFile(null);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    setStep('idle');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      toast.error('Please select an image first.');
      return;
    }

    setStep('uploading');
    try {
      const formData = new FormData();
      formData.append('image', selectedFile);

      setStep('processing');
      const res = await axios.post(`${API_URL}/upload`, formData);

      localStorage.setItem('ocrText', res.data.rawText);
      setImageURL(res.data.imageURL);
      setStep('done');

      toast.success('OCR extraction complete!');
      setTimeout(() => {
        router.push('/analyze');
      }, 800);
    } catch {
      toast.error('Upload failed. Please try again.');
      setStep('idle');
    }
  };

  const steps = [
    { key: 'uploading', label: 'Uploading', icon: Upload },
    { key: 'processing', label: 'Extracting Text (OCR)', icon: Brain },
    { key: 'done', label: 'Complete', icon: CheckCircle2 },
  ];

  return (
    <main className="min-h-screen bg-mesh flex items-center justify-center px-4 pt-20 pb-10 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-32 left-10 w-72 h-72 bg-cyan-500/6 rounded-full blur-3xl animate-blob" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-indigo-500/6 rounded-full blur-3xl animate-blob delay-1000" />

      <div className="relative z-10 w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-indigo-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-cyan-500/20">
            <FileText className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-200 mb-2">Upload Prescription</h1>
          <p className="text-slate-400 text-sm">
            Upload a prescription image and let AI analyze it for you.
          </p>
        </div>

        <div className="gradient-border backdrop-blur-xl p-8 animate-slide-up delay-100 opacity-0 fill-forwards">
          {/* Drop Zone */}
          {!selectedFile ? (
            <div
              className={`drop-zone p-12 text-center transition-all ${
                dragOver ? 'drag-over' : ''
              }`}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center mx-auto mb-4">
                <ImagePlus className="w-8 h-8 text-cyan-400" />
              </div>
              <p className="text-slate-300 font-medium mb-2">
                Drag & drop your prescription image here
              </p>
              <p className="text-slate-500 text-sm mb-4">
                or click to browse files
              </p>
              <div className="flex items-center justify-center gap-4 text-xs text-slate-600">
                <span className="flex items-center gap-1">
                  <FileImage className="w-3 h-3" /> JPG, PNG, WEBP
                </span>
                <span>•</span>
                <span>Max 10MB</span>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Preview */}
              <div className="relative group">
                <div className="rounded-xl overflow-hidden border border-white/5 bg-black/20">
                  <img
                    src={preview!}
                    alt="Preview"
                    className="w-full max-h-80 object-contain"
                  />
                </div>
                <button
                  onClick={clearFile}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-slate-400 hover:text-white hover:bg-red-500/80 transition-all opacity-0 group-hover:opacity-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* File info */}
              <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50 border border-white/5">
                <FileImage className="w-5 h-5 text-cyan-400 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-300 truncate">{selectedFile.name}</p>
                  <p className="text-xs text-slate-500">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <button
                  onClick={clearFile}
                  className="text-slate-500 hover:text-red-400 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Step progress */}
              {step !== 'idle' && (
                <div className="space-y-3 p-4 rounded-xl bg-slate-800/30 border border-white/5">
                  {steps.map((s, i) => {
                    const Icon = s.icon;
                    const isActive = step === s.key;
                    const isDone =
                      steps.findIndex((x) => x.key === step) > i ||
                      step === 'done';

                    return (
                      <div key={s.key} className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                            isDone
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : isActive
                              ? 'bg-cyan-500/20 text-cyan-400'
                              : 'bg-slate-700/50 text-slate-600'
                          }`}
                        >
                          {isDone && !isActive ? (
                            <CheckCircle2 className="w-4 h-4" />
                          ) : isActive ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Icon className="w-4 h-4" />
                          )}
                        </div>
                        <span
                          className={`text-sm ${
                            isDone
                              ? 'text-emerald-400'
                              : isActive
                              ? 'text-cyan-400 font-medium'
                              : 'text-slate-600'
                          }`}
                        >
                          {s.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Analyze button */}
              {step === 'idle' && (
                <button
                  onClick={handleAnalyze}
                  className="btn-primary w-full flex items-center justify-center gap-3 py-4 text-lg"
                >
                  <span className="flex items-center gap-3">
                    <Brain className="w-5 h-5" />
                    Analyze with AI
                    <ArrowRight className="w-5 h-5" />
                  </span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
    </main>
  );
};

export default UploadPage;
