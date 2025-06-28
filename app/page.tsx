import Link from "next/link";
import 'react-toastify/dist/ReactToastify.css';

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-blue-600">🩺 HealthScan AI</h1>
        <p className="text-gray-600">Upload your medical prescription or lab report and let AI do the analysis.</p>
        <Link href="/upload" className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
          Upload Now
        </Link>
      </div>
    </main>
  );
}

