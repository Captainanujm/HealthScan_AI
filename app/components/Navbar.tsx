

'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || pathname === '/login' || pathname === '/signup') return null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    router.push('/login');
  };

  return (
    <header className="bg-white/90 backdrop-blur-md shadow-md fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
      
        <Link href="/" className="text-3xl font-extrabold text-blue-700 tracking-tight">
          HealthScan <span className="text-pink-500">AI</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/dashboard"
            className="text-gray-800 hover:text-blue-600 font-semibold text-sm"
          >
            Dashboard
          </Link>
          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-4 py-1.5 rounded-lg font-semibold text-sm shadow hover:from-pink-600 hover:to-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
