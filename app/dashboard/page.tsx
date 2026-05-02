'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Pill,
  Calendar,
  Activity,
  Clock,
  Image as ImageIcon,
  FileText,
  Upload,
  ChevronDown,
  ChevronUp,
  X,
} from 'lucide-react';

const API_URL = 'https://healthscan-ai-2.onrender.com';

interface Medicine {
  medicinename: string;
  dosage: string;
  timing: string[];
}

interface Prescription {
  imageURL: string;
  createdAt: string;
  summary: Medicine[];
}

const Dashboard = () => {
  const router = useRouter();
  const [data, setData] = useState<Prescription[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'summary' | 'image'>('summary');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    const email = localStorage.getItem('email');

    axios
      .get(`${API_URL}/history/${email}`)
      .then((res) => setData(res.data))
      .catch(() => setData([]))
      .finally(() => setLoading(false));
  }, [router]);

  const totalMedicines = data.reduce((acc, p) => acc + (p.summary?.length || 0), 0);
  const lastScanDate = data.length > 0 ? new Date(data[0].createdAt) : null;

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatTime = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <main className="min-h-screen bg-mesh px-4 pt-24 pb-12 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl animate-blob" />
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl animate-blob delay-1000" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10 animate-fade-in">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-500 flex items-center justify-center">
                <LayoutDashboard className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-slate-200">Dashboard</h1>
            </div>
            <p className="text-slate-400 text-sm ml-13">
              Your prescription history and medicine tracking
            </p>
          </div>

          <button
            onClick={() => router.push('/upload')}
            className="btn-primary flex items-center gap-2 self-start"
          >
            <span className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              New Scan
            </span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 animate-slide-up delay-100 opacity-0 fill-forwards">
          <div className="stat-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-200">{loading ? '—' : data.length}</p>
                <p className="text-xs text-slate-500">Total Scans</p>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <Pill className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-200">
                  {loading ? '—' : totalMedicines}
                </p>
                <p className="text-xs text-slate-500">Medicines Tracked</p>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-200">
                  {loading || !lastScanDate ? '—' : formatDate(lastScanDate.toISOString())}
                </p>
                <p className="text-xs text-slate-500">Last Scan</p>
              </div>
            </div>
          </div>
        </div>

        {/* View Mode Toggle */}
        {data.length > 0 && (
          <div className="flex justify-center mb-8 animate-slide-up delay-200 opacity-0 fill-forwards">
            <div className="flex bg-slate-800/50 rounded-lg p-1 border border-white/5">
              <button
                className={`flex items-center gap-2 px-5 py-2 rounded-md text-sm font-medium transition-all ${
                  viewMode === 'summary'
                    ? 'bg-cyan-500/15 text-cyan-400'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
                onClick={() => setViewMode('summary')}
              >
                <FileText className="w-4 h-4" />
                Summary
              </button>
              <button
                className={`flex items-center gap-2 px-5 py-2 rounded-md text-sm font-medium transition-all ${
                  viewMode === 'image'
                    ? 'bg-emerald-500/15 text-emerald-400'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
                onClick={() => setViewMode('image')}
              >
                <ImageIcon className="w-4 h-4" />
                Images
              </button>
            </div>
          </div>
        )}

        {/* Content */}
        {loading ? (
          /* Skeleton loading */
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-card p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="skeleton w-10 h-10 rounded-xl" />
                  <div className="space-y-2 flex-1">
                    <div className="skeleton h-4 w-32" />
                    <div className="skeleton h-3 w-20" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="skeleton h-20 rounded-lg" />
                  <div className="skeleton h-20 rounded-lg" />
                  <div className="skeleton h-20 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        ) : data.length === 0 ? (
          /* Empty state */
          <div className="text-center py-20 animate-fade-in">
            <div className="w-20 h-20 rounded-2xl bg-slate-800/50 flex items-center justify-center mx-auto mb-6 border border-white/5">
              <Activity className="w-10 h-10 text-slate-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-300 mb-2">No prescriptions yet</h3>
            <p className="text-slate-500 mb-8 max-w-md mx-auto">
              Upload your first prescription image and AI will analyze it for you.
            </p>
            <button
              onClick={() => router.push('/upload')}
              className="btn-primary inline-flex items-center gap-2"
            >
              <span className="flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Upload Your First Prescription
              </span>
            </button>
          </div>
        ) : (
          /* Prescription list */
          <div className="space-y-4 animate-slide-up delay-300 opacity-0 fill-forwards">
            {data.map((item, index) => (
              <div key={index} className="glass-card overflow-hidden transition-all duration-300">
                {/* Prescription header */}
                <div
                  className="flex items-center justify-between p-5 cursor-pointer hover:bg-white/[0.02] transition"
                  onClick={() =>
                    setExpandedIndex(expandedIndex === index ? null : index)
                  }
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/10 to-indigo-500/10 flex items-center justify-center border border-white/5">
                      <FileText className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-slate-200 font-medium">
                        Prescription #{data.length - index}
                      </p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="flex items-center gap-1 text-xs text-slate-500">
                          <Calendar className="w-3 h-3" />
                          {formatDate(item.createdAt)}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-slate-500">
                          <Clock className="w-3 h-3" />
                          {formatTime(item.createdAt)}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-slate-500">
                          <Pill className="w-3 h-3" />
                          {item.summary?.length || 0} medicines
                        </span>
                      </div>
                    </div>
                  </div>
                  {expandedIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-slate-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-500" />
                  )}
                </div>

                {/* Expanded content */}
                {expandedIndex === index && (
                  <div className="px-5 pb-5 border-t border-white/5">
                    {viewMode === 'image' ? (
                      <div className="pt-4">
                        <img
                          src={item.imageURL}
                          alt="Prescription"
                          className="rounded-xl max-w-md mx-auto border border-white/5 cursor-pointer hover:opacity-90 transition"
                          onClick={() => setLightboxUrl(item.imageURL)}
                        />
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-4">
                        {item.summary?.map((med, idx) => (
                          <div
                            key={idx}
                            className="p-4 rounded-xl bg-slate-800/30 border border-white/5 hover:border-cyan-500/10 transition"
                          >
                            <div className="flex items-center gap-2 mb-3">
                              <Pill className="w-4 h-4 text-cyan-400" />
                              <h4 className="font-semibold text-slate-200 text-sm">
                                {med.medicinename}
                              </h4>
                            </div>
                            <p className="text-xs text-slate-500 mb-2">
                              <span className="text-slate-400">Dosage:</span> {med.dosage}
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {med.timing?.map((t, i) => (
                                <span
                                  key={i}
                                  className="badge-default px-2 py-0.5 rounded-full text-xs"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxUrl && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightboxUrl(null)}
        >
          <div className="relative max-w-3xl max-h-[90vh]">
            <button
              onClick={() => setLightboxUrl(null)}
              className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition z-10"
            >
              <X className="w-4 h-4" />
            </button>
            <img
              src={lightboxUrl}
              alt="Prescription"
              className="rounded-xl max-h-[85vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </main>
  );
};

export default Dashboard;
