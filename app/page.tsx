import Link from "next/link";
import {
  Upload,
  Brain,
  Mail,
  Shield,
  Zap,
  FileSearch,
  ArrowRight,
  Sparkles,
  Clock,
  Pill,
} from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-mesh overflow-hidden">
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        {/* Animated blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-blob delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl animate-blob delay-500" />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4" />
            Powered by Gemini AI &amp; Tesseract OCR
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 animate-slide-up">
            <span className="text-slate-200">Analyze Your</span>
            <br />
            <span className="gradient-text">Prescriptions Instantly</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 animate-slide-up delay-200 opacity-0 fill-forwards leading-relaxed">
            Upload a prescription image, and our AI extracts every medicine name,
            dosage, and timing — structured, readable, and ready to share.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up delay-300 opacity-0 fill-forwards">
            <Link href="/upload" className="btn-primary text-lg px-8 py-4 flex items-center gap-3">
              <span className="flex items-center gap-3">
                <Upload className="w-5 h-5" />
                Upload Prescription
                <ArrowRight className="w-5 h-5" />
              </span>
            </Link>
            <Link href="/dashboard" className="btn-secondary text-lg px-8 py-4 flex items-center gap-3">
              View Dashboard
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex items-center justify-center gap-8 mt-14 animate-fade-in delay-700 opacity-0 fill-forwards">
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <Shield className="w-4 h-4 text-emerald-400" />
              HIPAA-Aware
            </div>
            <div className="w-px h-4 bg-slate-700" />
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <Zap className="w-4 h-4 text-amber-400" />
              Real-time Analysis
            </div>
            <div className="w-px h-4 bg-slate-700" />
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <Clock className="w-4 h-4 text-cyan-400" />
              Under 10 Seconds
            </div>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-200 mb-4">
              How It Works
            </h2>
            <p className="text-slate-400 max-w-lg mx-auto">
              Three simple steps to turn any prescription into structured, actionable data.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connector line (desktop) */}
            <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-px bg-gradient-to-r from-cyan-500/30 via-indigo-500/30 to-emerald-500/30" />

            {[
              {
                step: "01",
                icon: Upload,
                title: "Upload",
                desc: "Take a photo or upload an image of your prescription. Supports JPG, PNG formats.",
                color: "cyan",
              },
              {
                step: "02",
                icon: Brain,
                title: "AI Analysis",
                desc: "Tesseract extracts text via OCR, then Gemini AI identifies medicines, dosages, and timing.",
                color: "indigo",
              },
              {
                step: "03",
                icon: Mail,
                title: "Get Results",
                desc: "View structured results, save to your dashboard, or email the summary to yourself.",
                color: "emerald",
              },
            ].map((item, i) => (
              <div key={i} className="glass-card glass-card-hover p-8 text-center relative">
                {/* Step number */}
                <div
                  className={`w-14 h-14 rounded-2xl mx-auto mb-6 flex items-center justify-center ${
                    item.color === "cyan"
                      ? "bg-cyan-500/10 text-cyan-400"
                      : item.color === "indigo"
                      ? "bg-indigo-500/10 text-indigo-400"
                      : "bg-emerald-500/10 text-emerald-400"
                  }`}
                >
                  <item.icon className="w-7 h-7" />
                </div>
                <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">
                  Step {item.step}
                </span>
                <h3 className="text-xl font-bold text-slate-200 mt-2 mb-3">
                  {item.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="py-24 px-6 bg-mesh">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-200 mb-4">
              Built for Modern Healthcare
            </h2>
            <p className="text-slate-400 max-w-lg mx-auto">
              Enterprise-grade features packed into a simple, intuitive interface.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: FileSearch,
                title: "OCR Text Extraction",
                desc: "Tesseract.js extracts text from prescriptions in English and Hindi with high accuracy.",
                accent: "cyan",
              },
              {
                icon: Brain,
                title: "Gemini AI Analysis",
                desc: "Google's Gemini 1.5 Flash model identifies and structures medicine information.",
                accent: "indigo",
              },
              {
                icon: Pill,
                title: "Medicine Tracking",
                desc: "Every prescription is saved to your dashboard with full medicine details and history.",
                accent: "emerald",
              },
              {
                icon: Mail,
                title: "Email Summaries",
                desc: "Send structured analysis results directly to your email with one click.",
                accent: "violet",
              },
              {
                icon: Shield,
                title: "Secure by Design",
                desc: "JWT authentication, encrypted passwords, and secure data handling throughout.",
                accent: "amber",
              },
              {
                icon: Zap,
                title: "Instant Results",
                desc: "Full analysis pipeline — from upload to structured output — in under 10 seconds.",
                accent: "rose",
              },
            ].map((feat, i) => (
              <div
                key={i}
                className="glass-card glass-card-hover p-6 group"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${
                    feat.accent === "cyan"
                      ? "bg-cyan-500/10 text-cyan-400"
                      : feat.accent === "indigo"
                      ? "bg-indigo-500/10 text-indigo-400"
                      : feat.accent === "emerald"
                      ? "bg-emerald-500/10 text-emerald-400"
                      : feat.accent === "violet"
                      ? "bg-violet-500/10 text-violet-400"
                      : feat.accent === "amber"
                      ? "bg-amber-500/10 text-amber-400"
                      : "bg-rose-500/10 text-rose-400"
                  }`}
                >
                  <feat.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-slate-200 mb-2">
                  {feat.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="gradient-border p-12 backdrop-blur-xl">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-200 mb-4">
              Ready to Analyze Your Prescription?
            </h2>
            <p className="text-slate-400 mb-8 max-w-md mx-auto">
              Upload any prescription image and get AI-powered insights in seconds. Free to use.
            </p>
            <Link
              href="/upload"
              className="btn-primary text-lg px-10 py-4 inline-flex items-center gap-3"
            >
              <span className="flex items-center gap-3">
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-white/5 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-cyan-500 to-indigo-500 flex items-center justify-center">
              <Zap className="w-3 h-3 text-white" />
            </div>
            HealthScan AI
          </div>
          <p className="text-slate-600 text-sm">
            Built with Next.js, Gemini AI, Tesseract.js &amp; MongoDB
          </p>
          <p className="text-slate-600 text-sm">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
