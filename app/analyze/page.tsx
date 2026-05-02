'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useGlobalContext } from '../context/Globalcontext';
import {
  Brain,
  Pill,
  Clock,
  Mail,
  Loader2,
  Sparkles,
  Upload,
  Sun,
  Sunset,
  Moon,
  CloudSun,
  ArrowRight,
} from 'lucide-react';

const API_URL = 'https://healthscan-ai-2.onrender.com';

interface MedicineCard {
  medicine: string;
  dosage: string;
  timing: string[];
}

function getTimingBadge(timing: string) {
  const t = timing.toLowerCase();
  if (t.includes('morning') || t.includes('breakfast') || t.includes('am'))
    return { cls: 'badge-morning', icon: Sun, label: timing };
  if (t.includes('afternoon') || t.includes('lunch') || t.includes('noon'))
    return { cls: 'badge-afternoon', icon: CloudSun, label: timing };
  if (t.includes('evening') || t.includes('dinner'))
    return { cls: 'badge-evening', icon: Sunset, label: timing };
  if (t.includes('night') || t.includes('bedtime') || t.includes('pm'))
    return { cls: 'badge-night', icon: Moon, label: timing };
  return { cls: 'badge-default', icon: Clock, label: timing };
}

export default function Analyze() {
  const [medicines, setMedicines] = useState<MedicineCard[]>([]);
  const [rawSummary, setRawSummary] = useState<string>('');
  const { summary, setsummary, imageURL } = useGlobalContext();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchAnalysis = async () => {
      const ocrText = localStorage.getItem('ocrText');
      if (!ocrText) {
        toast.error('Please upload an image first');
        router.push('/upload');
        return;
      }

      try {
        const response = await axios.post(
          `${API_URL}/analyze`,
          { text: ocrText },
          { headers: { 'Content-Type': 'application/json' } }
        );

        const parsedArray = response.data.parsed || [];
        const summaryText = response.data.summary || '';

        setMedicines(parsedArray);
        setRawSummary(summaryText);
        setsummary(parsedArray);

        // Save to DB
        await axios.post(`${API_URL}/save`, {
          email: localStorage.getItem('email'),
          imageURL,
          summary: parsedArray,
        });
      } catch {
        toast.error('Failed to analyze. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <main className="min-h-screen bg-mesh px-4 pt-24 pb-12 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/6 rounded-full blur-3xl animate-blob" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-emerald-500/6 rounded-full blur-3xl animate-blob delay-1000" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-4">
            <Brain className="w-4 h-4" />
            Gemini AI Analysis
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-200 mb-2">
            Prescription Analysis
          </h1>
          <p className="text-slate-400">
            {loading
              ? 'AI is reading and analyzing your prescription...'
              : `Found ${medicines.length} medicine${medicines.length !== 1 ? 's' : ''} in your prescription`}
          </p>
        </div>

        {loading ? (
          /* Skeleton Loading */
          <div className="space-y-6">
            <div className="gradient-border backdrop-blur-xl p-8 flex items-center gap-4">
              <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
              <div>
                <p className="text-slate-200 font-medium">Analyzing your prescription...</p>
                <p className="text-slate-500 text-sm mt-1">
                  Extracting medicines, dosages, and timing with Gemini AI
                </p>
              </div>
            </div>

            {/* Skeleton cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="glass-card p-6 space-y-4">
                  <div className="skeleton h-6 w-3/4" />
                  <div className="skeleton h-4 w-1/2" />
                  <div className="flex gap-2">
                    <div className="skeleton h-6 w-20 rounded-full" />
                    <div className="skeleton h-6 w-20 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Medicine Cards Grid */}
            {medicines.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {medicines.map((med, idx) => (
                  <div
                    key={idx}
                    className="glass-card glass-card-hover p-6 animate-slide-up opacity-0 fill-forwards"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    {/* Medicine header */}
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center shrink-0">
                        <Pill className="w-5 h-5 text-cyan-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-200">
                          {med.medicine}
                        </h3>
                        <span className="text-sm text-slate-500">Medicine #{idx + 1}</span>
                      </div>
                    </div>

                    {/* Dosage */}
                    <div className="mb-4">
                      <span className="text-xs text-slate-500 uppercase tracking-wider font-medium">
                        Dosage
                      </span>
                      <p className="text-slate-300 font-medium mt-1">{med.dosage}</p>
                    </div>

                    {/* Timing badges */}
                    <div>
                      <span className="text-xs text-slate-500 uppercase tracking-wider font-medium">
                        Timing
                      </span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {med.timing.map((t, i) => {
                          const badge = getTimingBadge(t);
                          const BadgeIcon = badge.icon;
                          return (
                            <span
                              key={i}
                              className={`${badge.cls} px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5`}
                            >
                              <BadgeIcon className="w-3 h-3" />
                              {badge.label}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Raw summary */}
            {rawSummary && (
              <div className="glass-card p-6 animate-slide-up delay-300 opacity-0 fill-forwards">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <h3 className="text-lg font-semibold text-slate-200">Full Summary</h3>
                </div>
                <pre className="text-slate-400 text-sm leading-relaxed whitespace-pre-wrap font-sans">
                  {rawSummary}
                </pre>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up delay-500 opacity-0 fill-forwards">
              <button
                className="btn-primary flex-1 flex items-center justify-center gap-3 py-4"
                onClick={() => {
                  localStorage.setItem('summaryForEmail', rawSummary);
                  router.push('/summaryEmail');
                }}
              >
                <span className="flex items-center gap-3">
                  <Mail className="w-5 h-5" />
                  Send Summary via Email
                  <ArrowRight className="w-4 h-4" />
                </span>
              </button>

              <button
                className="btn-secondary flex items-center justify-center gap-3 py-4 px-8"
                onClick={() => router.push('/upload')}
              >
                <Upload className="w-5 h-5" />
                Analyze Another
              </button>
            </div>
          </div>
        )}
      </div>

      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
    </main>
  );
}
