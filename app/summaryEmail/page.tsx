'use client';
import { useState } from 'react';
import { sendEmail } from '@/lib/sendEmail';
import { toast } from 'react-toastify';

export default function EmailForm({ summary }: { summary: string }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!name || !email) {
      toast.error('Please fill all fields');
      return;
    }
    setLoading(true);
    try {
      await sendEmail(name, email, summary);
      toast.success('📧 Email sent successfully!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to send email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow max-w-md w-full">
      <h3 className="text-xl font-semibold mb-2"> Send Summary</h3>
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />
      <input
        type="email"
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />
      <button
        onClick={handleSend}
        disabled={loading}
        className="bg-blue-500 text-white py-2 px-4 rounded w-full"
      >
        {loading ? 'Sending...' : 'Send Email'}
      </button>
    </div>
  );
}
