'use client';

import { useState, useEffect } from 'react';
import { sendEmail } from '@/lib/sendEmail';
import { ToastContainer, toast } from 'react-toastify';
import { useGlobalContext } from '../context/Globalcontext';
import {
  Mail,
  User,
  Send,
  Loader2,
  CheckCircle2,
  FileText,
  ArrowLeft,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function EmailForm() {
  const [name, setName] = useState('');
  const { email, setEmail } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [summary, setSummary] = useState('');
  const router = useRouter();

  useEffect(() => {
    const savedSummary = localStorage.getItem('summaryForEmail') || '';
    setSummary(savedSummary);
    const savedEmail = localStorage.getItem('email') || '';
    if (savedEmail && !email) {
      setEmail(savedEmail);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSend = async () => {
    if (!name || !email) {
      toast.error('Please fill in your name and email');
      return;
    }
    if (!summary) {
      toast.error('No summary to send. Please analyze a prescription first.');
      return;
    }

    setLoading(true);
    try {
      await sendEmail(name, email, summary);
      setSent(true);
      toast.success('Email sent successfully!');
      localStorage.removeItem('summaryForEmail');
    } catch {
      toast.error('Failed to send email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-mesh flex items-center justify-center px-4 pt-20 pb-10 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-violet-500/6 rounded-full blur-3xl animate-blob" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-cyan-500/6 rounded-full blur-3xl animate-blob delay-1000" />

      <div className="relative z-10 w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-violet-500/20">
            <Mail className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-200 mb-2">Email Summary</h1>
          <p className="text-slate-400 text-sm">
            Send your prescription analysis to your inbox
          </p>
        </div>

        <div className="gradient-border backdrop-blur-xl p-8 animate-slide-up delay-100 opacity-0 fill-forwards">
          {sent ? (
            /* Success state */
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-emerald-500/15 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-200 mb-2">Email Sent!</h3>
              <p className="text-slate-400 text-sm mb-8">
                Check your inbox for the prescription summary.
              </p>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => router.push('/upload')}
                  className="btn-primary w-full flex items-center justify-center gap-2 py-3"
                >
                  <span className="flex items-center gap-2">
                    Analyze Another Prescription
                  </span>
                </button>
                <button
                  onClick={() => router.push('/dashboard')}
                  className="btn-secondary w-full flex items-center justify-center gap-2 py-3"
                >
                  Go to Dashboard
                </button>
              </div>
            </div>
          ) : (
            /* Form */
            <div className="space-y-5">
              {/* Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">Your Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-field pl-10"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field pl-10"
                  />
                </div>
              </div>

              {/* Summary preview */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-slate-500" />
                  <label className="text-sm font-medium text-slate-400">Summary Preview</label>
                </div>
                <div className="p-4 rounded-xl bg-slate-800/30 border border-white/5 max-h-48 overflow-y-auto">
                  <pre className="text-slate-400 text-sm leading-relaxed whitespace-pre-wrap font-sans">
                    {summary || 'No summary available. Please analyze a prescription first.'}
                  </pre>
                </div>
              </div>

              {/* Send button */}
              <button
                onClick={handleSend}
                disabled={loading}
                className="btn-primary w-full flex items-center justify-center gap-2 py-3 disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)' }}
              >
                <span className="flex items-center gap-2">
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Email
                    </>
                  )}
                </span>
              </button>

              {/* Back link */}
              <button
                onClick={() => router.back()}
                className="w-full flex items-center justify-center gap-2 text-sm text-slate-500 hover:text-slate-300 transition py-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to analysis
              </button>
            </div>
          )}
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
    </main>
  );
}
