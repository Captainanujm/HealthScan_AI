'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
const router=useRouter();
  const handleLogin = async (e: any) => {
    e.preventDefault();
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
    <form onSubmit={handleLogin} className="p-6">
      <input placeholder="Email" required onChange={e => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password" required onChange={e => setForm({ ...form, password: e.target.value })} />
      <button type="submit">Login</button>
        <p className="text-sm mt-4">
            Don't have an account?{' '}
            <span
            onClick={() => {
               
                router.push("/signup");
            }}
            className="text-blue-500 cursor-pointer"
            >
            Sign Up
            </span>
            </p>
    </form>
  );
}
