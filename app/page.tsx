import Link from "next/link";
import 'react-toastify/dist/ReactToastify.css';

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-200 p-4">
      <div className="w-full max-w-2xl mx-auto bg-white/90 shadow-2xl rounded-3xl p-10 border border-blue-200 backdrop-blur-md flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-2">
          <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full p-4 shadow-lg animate-pulse">
            <span className="text-5xl md:text-6xl">🩺</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 tracking-tight mt-2">HealthScan AI</h1>
        </div>
        <p className="text-lg md:text-xl text-gray-700 font-medium text-center max-w-xl mx-auto">
          Upload your <span className="text-blue-600 font-semibold">medical prescription</span> or <span className="text-purple-600 font-semibold">lab report</span> and let <span className="text-pink-600 font-semibold">AI</span> do the analysis for you.
        </p>
        <Link href="/upload" className="inline-block px-8 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-xl font-bold text-lg shadow-lg hover:scale-105 hover:from-blue-600 hover:to-pink-600 transition-transform duration-200">
          <span className="flex items-center gap-2 justify-center">
            <span role="img" aria-label="upload">🚀</span> Upload Now
          </span>
        </Link>
        <div className="w-full h-1 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 rounded-full opacity-60 mt-4" />
        <div className="flex flex-col md:flex-row gap-6 w-full justify-center items-center mt-2">
          <div className="flex flex-col items-center">
            <span className="text-3xl">🔒</span>
            <span className="text-xs text-gray-500 mt-1">Your data is secure</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl">⚡</span>
            <span className="text-xs text-gray-500 mt-1">Fast AI-powered results</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl">💡</span>
            <span className="text-xs text-gray-500 mt-1">Easy to use</span>
          </div>
        </div>
      </div>
    </main>
  );
}

