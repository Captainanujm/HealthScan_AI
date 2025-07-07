'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer,toast } from 'react-toastify';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const router = useRouter();

  const handleSignup = async (e: any) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3000/signup', {
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
      
      toast.error(data.error+", "+ "Please Login!");
      setTimeout
(() => {
        router.push('/login');
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#141e30] via-[#243b55] to-[#141e30] px-4">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-2xl w-full max-w-md text-white shadow-2xl">
        <h2 className="text-3xl font-bold text-center mb-6">Create an Account</h2>

        <form onSubmit={handleSignup} className="flex flex-col gap-5">
          <input
            type="text"
            placeholder="Name"
            required
            className="px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-green-400"
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            required
            className="px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-green-400"
            onChange={e => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-green-400"
            onChange={e => setForm({ ...form, password: e.target.value })}
          />
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 transition-colors duration-300 text-white py-3 rounded-xl font-semibold"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm mt-6 text-center">
          Already have an account?{' '}
          <span
            onClick={() => router.push('/login')}
            className="text-green-300 hover:underline cursor-pointer"
          >
            Login
          </span>
        </p>
       
      </div>
 <ToastContainer position="top-right" autoClose={3000} />
    </div>
    
  );
}
