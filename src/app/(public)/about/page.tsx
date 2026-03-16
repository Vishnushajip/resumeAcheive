import Link from "next/link";
import {
  Users,
  Award,
  Target,
  Rocket,
  Shield,
  Globe,
  CheckCircle,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Clock,
  Star,
} from "lucide-react";

/* ─── Data ────────────────────────────────────────────────────────────────── */

const STATS = [
  { value: "10K+", label: "Resumes created", sub: "and counting" },
  { value: "90%", label: "ATS pass rate", sub: "industry avg. 43%" },
  { value: "4.5★", label: "Average rating", sub: "from real users" },
  { value: "3 min", label: "Time to first draft", sub: "seriously" },
];

const PILLARS = [
  {
    icon: Target,
    accent: "#7c3aed",
    bg: "#f5f3ff",
    title: "Precision over guesswork",
    desc: "Our AI reads the job description and rewrites your bullets to match the exact keywords recruiters — and their software — are looking for.",
  },
  {
    icon: Users,
    accent: "#0ea5e9",
    bg: "#f0f9ff",
    title: "Built for real people",
    desc: "Whether you're a fresh graduate, a mid-career switcher, or a senior executive, the builder adapts to your experience level and industry.",
  },
  {
    icon: Rocket,
    accent: "#10b981",
    bg: "#f0fdf4",
    title: "Always improving",
    desc: "We retrain our models monthly using the latest hiring data so your resume reflects what actually works in today's job market.",
  },
];

const REASONS = [
  {
    icon: Award,
    title: "AI that actually reads job descriptions",
    desc: "Paste a job listing and our AI extracts the key skills and phrases, then mirrors them in your resume — without sounding robotic.",
  },
  {
    icon: Shield,
    title: "Templates built to beat the bots",
    desc: "Every template is tested against major ATS platforms including Workday, Greenhouse, and Lever, before it goes live.",
  },
  {
    icon: Globe,
    title: "Free. No card required. No catch.",
    desc: "We believe a great resume shouldn't cost $40/month. Core features are permanently free — no trials, no watermarks.",
  },
  {
    icon: CheckCircle,
    title: "Real outcomes from real users",
    desc: "Thousands of users have shared job offer screenshots with us. We keep building because of them, not despite them.",
  },
];

const TEAM_VALUES = [
  { icon: Clock, text: "Ship fast, fix faster" },
  { icon: TrendingUp, text: "Obsess over outcomes" },
  { icon: Star, text: "Earn trust every session" },
];

/* ─── Component ──────────────────────────────────────────────────────────── */

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#0f0c29] text-white">
        {/* Subtle grid texture */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Glow blobs */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 left-1/3 h-[420px] w-[420px] rounded-full bg-purple-700/20 blur-[100px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-blue-600/15 blur-[80px]"
        />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pt-28 sm:pb-32 text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs sm:text-sm text-purple-300 mb-6 sm:mb-8">
            <Sparkles className="h-3.5 w-3.5" />
            Our story
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-5 sm:mb-6">
            We help people get{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              hired faster
            </span>
          </h1>

          <p className="text-sm sm:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-10">
            ResumeAchieve started because great talent was getting filtered out
            by software before a human ever saw their resume. We're here to fix
            that — with AI that works for candidates, not against them.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/login"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 text-sm sm:text-base font-semibold text-white hover:from-purple-500 hover:to-blue-500 transition-all"
            >
              Build my resume free
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm sm:text-base text-white/70 hover:text-white hover:border-white/30 transition-all"
            >
              Talk to us
            </Link>
          </div>
        </div>
      </section>

      {/* ── STATS BAND ────────────────────────────────────────────────────── */}
      <section className="border-y border-gray-100 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {STATS.map(({ value, label, sub }) => (
              <div key={label} className="text-center">
                <div className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                  {value}
                </div>
                <div className="mt-1 text-xs sm:text-sm font-semibold text-gray-700">
                  {label}
                </div>
                <div className="mt-0.5 text-[11px] sm:text-xs text-gray-400">
                  {sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MISSION ───────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10 sm:mb-14">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-purple-600 mb-3">
              Our mission
            </p>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
              The playing field isn't level.{" "}
              <span className="text-purple-600">
                We're here to change that.
              </span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-gray-500 leading-relaxed">
              75% of resumes are never seen by a human. They're rejected
              automatically by ATS software before a recruiter even opens the
              file. We built ResumeAchieve so that skill — not formatting
              knowledge — determines who gets the interview.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-5 sm:gap-6">
            {PILLARS.map(({ icon: Icon, accent, bg, title, desc }) => (
              <div
                key={title}
                className="rounded-2xl border border-gray-100 p-5 sm:p-7 hover:shadow-md transition-shadow"
              >
                <div
                  className="mb-4 h-11 w-11 rounded-xl flex items-center justify-center"
                  style={{ background: bg }}
                >
                  <Icon className="h-5 w-5" style={{ color: accent }} />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-2">
                  {title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HUMAN STORY BLOCK ─────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 bg-[#fafafa] border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Quote side */}
            <div>
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-blue-600 mb-4">
                Why we exist
              </p>
              <blockquote className="text-xl sm:text-3xl font-bold text-gray-900 leading-snug mb-6">
                "I applied to 60 jobs and heard nothing. Changed my resume with
                ResumeAchieve and got 4 callbacks in a week."
              </blockquote>
              <p className="text-xs sm:text-sm text-gray-400 mb-8">
                — Arjun S., Software Engineer · Hired at a Series B startup
              </p>
              <div className="flex flex-wrap gap-3">
                {TEAM_VALUES.map(({ icon: Icon, text }) => (
                  <div
                    key={text}
                    className="inline-flex items-center gap-2 rounded-full bg-white border border-gray-200 px-3 py-1.5 text-xs sm:text-sm text-gray-600"
                  >
                    <Icon className="h-3.5 w-3.5 text-purple-500" />
                    {text}
                  </div>
                ))}
              </div>
            </div>

            {/* Visual card stack */}
            <div className="relative h-64 sm:h-72 hidden sm:block">
              {/* Back card */}
              <div className="absolute top-6 left-6 right-0 h-full rounded-2xl bg-purple-100/60 border border-purple-200/50" />
              {/* Mid card */}
              <div className="absolute top-3 left-3 right-3 h-full rounded-2xl bg-blue-50 border border-blue-200/50" />
              {/* Front card */}
              <div className="absolute inset-0 rounded-2xl bg-white border border-gray-200 p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="h-3 w-28 rounded bg-gray-900 mb-2" />
                  <div className="h-2 w-20 rounded bg-gray-300" />
                </div>
                <div className="space-y-2">
                  {[100, 80, 90, 65].map((w, i) => (
                    <div
                      key={i}
                      className="h-1.5 rounded-full bg-gray-100"
                      style={{ width: `${w}%` }}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  {["React", "TypeScript", "Node.js"].map((s) => (
                    <span
                      key={s}
                      className="rounded-full bg-purple-50 px-2.5 py-1 text-[10px] font-medium text-purple-700 border border-purple-100"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY US ────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10 sm:mb-14">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-purple-600 mb-3">
              Why ResumeAchieve
            </p>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
              Honest features. No fluff.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-gray-500">
              Here's exactly what you get and why it matters.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
            {REASONS.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="flex gap-4 rounded-2xl border border-gray-100 p-5 sm:p-6 hover:shadow-sm transition-shadow"
              >
                <div className="shrink-0 h-10 w-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center">
                  <Icon className="h-5 w-5 text-gray-700" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1.5">
                    {title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-[#0f0c29] text-white relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-20 right-1/4 h-[300px] w-[300px] rounded-full bg-purple-700/25 blur-[80px]"
        />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-purple-400 mb-4">
            Ready when you are
          </p>
          <h2 className="text-2xl sm:text-4xl font-extrabold leading-tight mb-4 sm:mb-5">
            Your next job starts with{" "}
            <span className="text-purple-400">a better resume</span>
          </h2>
          <p className="text-sm sm:text-base text-white/55 max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed">
            No account needed to start. No credit card. No 7-day trial that
            auto-charges. Just open the builder and go.
          </p>
          <Link
            href="/login"
            className="group inline-flex items-center gap-2 rounded-full bg-white text-gray-900 px-7 py-3.5 text-sm sm:text-base font-bold hover:bg-gray-100 transition-all"
          >
            Get started — it's free
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
