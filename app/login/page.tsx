'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGlobalContext } from '../context/Globalcontext';
export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const router = useRouter();
const {setEmail} = useGlobalContext();
  const handleLogin = async (e: any) => {
    e.preventDefault();
    
    setEmail(form.email);
    const res = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('email', data.email);
      window.location.href = '/upload';
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e]">
      <div className="bg-white/10 backdrop-blur-md p-10 rounded-2xl shadow-lg w-full max-w-md text-white border border-white/20">
        <h2 className="text-3xl font-bold text-center mb-8">Login to Your Account</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <input
            type="email"
            placeholder="Email"
            required
            className="px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={e => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={e => setForm({ ...form, password: e.target.value })}
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 transition-colors duration-300 text-white py-3 rounded-xl font-semibold"
          >
            Login
          </button>
        </form>
        <p className="text-sm mt-6 text-center">
          Don't have an account?{' '}
          <span
            onClick={() => router.push('/signup')}
            className="text-blue-400 hover:underline cursor-pointer"
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}
