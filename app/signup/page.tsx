'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
      alert(data.error);
    }
  };

  return (
    <form onSubmit={handleSignup} className="p-6">
      <input placeholder="Name" required onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" required onChange={e => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password" required onChange={e => setForm({ ...form, password: e.target.value })} />
      <button type="submit">Sign Up</button>
        <p className="text-sm mt-4">
            Already have an account?{' '}
            <span
            onClick={() => {
                router.push("/login"); 
            }}
            className="text-blue-500 cursor-pointer"
            >
            Login
            </span>
            </p>
    </form>
  );
}
