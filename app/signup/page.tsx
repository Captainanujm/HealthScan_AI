'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import { Mail, Lock, User, UserPlus, Eye, EyeOff, Activity, Check, X } from 'lucide-react';
import Link from 'next/link';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const passwordChecks = [
    { label: 'At least 6 characters', valid: form.password.length >= 6 },
    { label: 'Contains a number', valid: /\d/.test(form.password) },
    { label: 'Contains uppercase', valid: /[A-Z]/.test(form.password) },
  ];

  const passwordStrength = passwordChecks.filter((c) => c.valid).length;

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      toast.error('Please fill in all fields');
      return;
    }
    if (form.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://healthscan-ai-2.onrender.com';
      const res = await fetch(`${API_URL}/api/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('email', data.email);
        toast.success('Account created successfully!');
        setTimeout(() => {
          window.location.href = '/upload';
        }, 800);
      } else {
        toast.error(data.error + '. Please login.');
        setTimeout(() => {
          router.push('/login');
        }, 2500);
      }
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-mesh flex items-center justify-center px-4 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-emerald-500/8 rounded-full blur-3xl animate-blob" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-indigo-500/8 rounded-full blur-3xl animate-blob delay-1000" />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/20">
            <Activity className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold gradient-text-emerald">HealthScan AI</h1>
        </div>

        {/* Card */}
        <div className="gradient-border backdrop-blur-xl p-8 animate-slide-up delay-100 opacity-0 fill-forwards">
          <h2 className="text-2xl font-bold text-slate-200 text-center mb-2">
            Create Account
          </h2>
          <p className="text-slate-500 text-center text-sm mb-8">
            Start analyzing your prescriptions with AI
          </p>

          <form onSubmit={handleSignup} className="space-y-5">
            {/* Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="John Doe"
                  required
                  value={form.name}
                  className="input-field pl-10"
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={form.email}
                  className="input-field pl-10"
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a strong password"
                  required
                  value={form.password}
                  className="input-field pl-10 pr-10"
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Password strength */}
              {form.password.length > 0 && (
                <div className="space-y-3 mt-3">
                  <div className="flex gap-1">
                    {[1, 2, 3].map((level) => (
                      <div
                        key={level}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                          passwordStrength >= level
                            ? level === 1
                              ? 'bg-red-500'
                              : level === 2
                              ? 'bg-amber-400'
                              : 'bg-emerald-400'
                            : 'bg-slate-700'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="space-y-1">
                    {passwordChecks.map((check, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs">
                        {check.valid ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <X className="w-3 h-3 text-slate-600" />
                        )}
                        <span className={check.valid ? 'text-slate-400' : 'text-slate-600'}>
                          {check.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 py-3 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ background: 'linear-gradient(135deg, #10b981, #06b6d4)' }}
            >
              <span className="flex items-center gap-2">
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    Create Account
                  </>
                )}
              </span>
            </button>
          </form>

          <p className="text-sm mt-6 text-center text-slate-500">
            Already have an account?{' '}
            <Link href="/login" className="text-emerald-400 hover:text-emerald-300 font-medium transition">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
    </div>
  );
}
