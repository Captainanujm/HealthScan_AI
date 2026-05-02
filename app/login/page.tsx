'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useGlobalContext } from '../context/Globalcontext';
import { ToastContainer, toast } from 'react-toastify';
import { Mail, Lock, LogIn, Eye, EyeOff, Activity } from 'lucide-react';
import Link from 'next/link';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setEmail } = useGlobalContext();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('https://healthscan-ai-2.onrender.com/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('email', data.email);
        setEmail(data.email);
        toast.success('Welcome back!');
        setTimeout(() => {
          window.location.href = '/upload';
        }, 800);
      } else {
        toast.error(data.error || 'Login failed');
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
      <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/8 rounded-full blur-3xl animate-blob" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/8 rounded-full blur-3xl animate-blob delay-1000" />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-indigo-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-cyan-500/20">
            <Activity className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold gradient-text">HealthScan AI</h1>
        </div>

        {/* Card */}
        <div className="gradient-border backdrop-blur-xl p-8 animate-slide-up delay-100 opacity-0 fill-forwards">
          <h2 className="text-2xl font-bold text-slate-200 text-center mb-2">
            Welcome Back
          </h2>
          <p className="text-slate-500 text-center text-sm mb-8">
            Sign in to access your health dashboard
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
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
                  placeholder="Enter your password"
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
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 py-3 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span className="flex items-center gap-2">
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </>
                )}
              </span>
            </button>
          </form>

          <p className="text-sm mt-6 text-center text-slate-500">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-cyan-400 hover:text-cyan-300 font-medium transition">
              Create one
            </Link>
          </p>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
    </div>
  );
}
