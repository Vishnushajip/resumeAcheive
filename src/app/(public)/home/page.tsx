"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useAuthStore } from "@/store/auth.store";
import { Button } from "@/components/ui/Button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import {
  Sparkles,
  Star,
  ArrowRight,
  MessageCircle,
  Upload,
  CheckCircle,
  TrendingUp,
  Award,
  Zap,
  Download,
  LogIn,
  X,
} from "lucide-react";
import {
  testimonialsService,
  TestimonialData,
} from "@/services/testimonials.service";
import { toast } from "sonner";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ─── static data ──────────────────────────────────────────────────────────── */
const STATS = [
  { value: "10K+", label: "Resumes Created" },
  { value: "90%",  label: "ATS Success Rate" },
  { value: "1K+",  label: "Job Applications" },
  { value: "4.9★", label: "User Rating" },
];

const STEPS = [
  {
    num: "01",
    icon: LogIn,
    title: "Sign In with Email",
    desc: "Enter your email — we send a secure OTP. No passwords needed.",
  },
  {
    num: "02",
    icon: Zap,
    title: "Enter Your Details",
    desc: "Fill in your experience, skills, and paste the job description for tailored AI optimisation.",
  },
  {
    num: "03",
    icon: Download,
    title: "Download & Apply",
    desc: "AI crafts your ATS-ready resume. Export as PDF or DOCX and start applying instantly.",
  },
];

const FALLBACK_TESTIMONIALS = [
  {
    name: "Arjun Sharma",
    designation: "Software Engineer",
    feedback:
      "ResumeAchieve helped me land my dream job at Google. The ATS score went from 62 to 96 after using the AI optimisation!",
    rating: 5,
  },
  {
    name: "Priya Nair",
    designation: "Product Manager",
    feedback:
      "The AI understood the job description perfectly and restructured my resume beautifully. Hired within 3 weeks.",
    rating: 5,
  },
  {
    name: "Rahul Verma",
    designation: "Data Analyst",
    feedback:
      "Uploaded my old CV and it was completely transformed into an ATS-friendly format. Absolutely game-changing.",
    rating: 5,
  },
];

const EMPTY_FORM: TestimonialData = {
  name: "",
  designation: "",
  feedback: "",
  rating: 5,
  email: "",
};

/* ─── component ─────────────────────────────────────────────────────────────── */
export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated, initializeAuth } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [testimonials, setTestimonials] = useState<TestimonialData[]>([]);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedbackForm, setFeedbackForm] = useState<TestimonialData>(EMPTY_FORM);

  /* fetch testimonials */
  useEffect(() => {
    testimonialsService
      .getApprovedTestimonials()
      .then((d) => setTestimonials(d.testimonials || []))
      .catch(() => {});
  }, []);

  /* mount + auth */
  useEffect(() => {
    setMounted(true);
    initializeAuth();
  }, [initializeAuth]);

  /* GSAP animations */
  useEffect(() => {
    if (!mounted) return;
    const ctx = gsap.context(() => {
      gsap.from(".hero-el", {
        y: 40,
        opacity: 0,
        duration: 0.85,
        stagger: 0.15,
        ease: "power4.out",
      });
      gsap.from(".stat-item", {
        scrollTrigger: { trigger: ".stats-section", start: "top 82%" },
        scale: 0.82,
        opacity: 0,
        duration: 0.55,
        stagger: 0.1,
        ease: "back.out(1.7)",
      });
      gsap.from(".step-card", {
        scrollTrigger: { trigger: ".steps-section", start: "top 80%" },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out",
      });
      gsap.from(".t-card", {
        scrollTrigger: { trigger: ".testimonials-section", start: "top 80%" },
        y: 24,
        opacity: 0,
        duration: 0.5,
        stagger: 0.12,
        ease: "power3.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, [mounted]);

  const handleStartBuilding = () =>
    router.push(isAuthenticated ? "/dashboard" : "/login");

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await testimonialsService.submitTestimonial(feedbackForm);
      toast.success("Thank you! Your feedback has been submitted for approval.");
      setShowFeedbackForm(false);
      setFeedbackForm(EMPTY_FORM);
    } catch {
      toast.error("Failed to submit feedback. Please try again.");
    }
  };

  if (!mounted) return null;

  const displayTestimonials =
    testimonials.length > 0 ? testimonials : FALLBACK_TESTIMONIALS;

  return (
    <div className="min-h-screen bg-white overflow-x-hidden" ref={containerRef}>

      {/* ══════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        {/* bg image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/resume_builder_hero.png"
            alt="Resume builder background"
            fill
            className="object-cover object-center"
            priority
            quality={90}
          />
          {/* gradient — stronger on mobile, lighter on desktop for left-col readability */}
          <div className="absolute inset-0 bg-gradient-to-r
                          from-white/98 via-white/90 to-white/50
                          sm:from-white/95 sm:via-white/82 sm:to-white/35" />
        </div>

        {/* ambient blobs */}
        <div className="absolute top-10 right-10 sm:top-20 sm:right-20
                        w-48 h-48 sm:w-72 sm:h-72
                        bg-blue-500/10 rounded-full blur-[80px] sm:blur-[100px]
                        pointer-events-none animate-pulse" />
        <div className="absolute bottom-10 left-4 sm:bottom-20 sm:left-10
                        w-64 h-64 sm:w-96 sm:h-96
                        bg-purple-500/8 rounded-full blur-[90px] sm:blur-[120px]
                        pointer-events-none" />

        <div className="relative z-10 w-full max-w-7xl mx-auto
                        px-4 sm:px-6 lg:px-8
                        pt-20 pb-16 sm:pt-24 sm:pb-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">

            {/* ── left copy ── */}
            <div className="text-left">

              {/* brand badge */}
              <div className="hero-el inline-flex items-center gap-2
                              px-3 py-1.5 sm:px-4 sm:py-2
                              rounded-full
                              bg-gradient-to-r from-blue-600 to-purple-600
                              text-white text-xs sm:text-sm font-bold
                              mb-4 sm:mb-5
                              shadow-lg shadow-purple-300/40">
                <Image
                  src="/logo.png"
                  alt="ResumeAchieve"
                  width={20}
                  height={20}
                  className="rounded-full bg-white"
                />
                ResumeAchieve.com
              </div>

              {/* category pill */}
              <div className="hero-el inline-flex items-center gap-1.5 sm:gap-2
                              px-3 py-1.5 sm:px-4 sm:py-2
                              rounded-full bg-blue-50 text-blue-700
                              text-xs sm:text-sm font-semibold
                              mb-4 sm:mb-6
                              border border-blue-200">
                <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                #1 AI Resume Builder for Job Seekers
              </div>

              {/* headline */}
              <h1 className="hero-el
                             text-[2.1rem] leading-[1.1]
                             sm:text-5xl
                             lg:text-6xl xl:text-[4.2rem]
                             font-extrabold text-gray-900
                             mb-4 sm:mb-6
                             tracking-tight">
                Land Your{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-transparent bg-clip-text
                                   bg-gradient-to-r from-blue-600 to-purple-600">
                    Dream Job
                  </span>
                  <span className="absolute inset-x-0 bottom-1 sm:bottom-2
                                   h-3 sm:h-4 bg-blue-100 rounded-full -z-0" />
                </span>
                <br />
                <span className="text-gray-700">with an ATS-Winning Resume</span>
              </h1>

              {/* sub copy */}
              <p className="hero-el
                            text-sm sm:text-lg lg:text-xl
                            text-gray-600
                            mb-6 sm:mb-8
                            max-w-xl font-medium leading-relaxed">
                Join{" "}
                <span className="text-blue-600 font-bold">50,000+ job seekers</span>{" "}
                who got hired using ResumeAchieve. Our AI creates professional
                resumes that beat ATS filters —
                <span className="text-purple-600 font-semibold"> in just 5 minutes</span>.
              </p>

              {/* trust pills */}
              <div className="hero-el flex flex-wrap items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
                {[
                  { icon: CheckCircle, color: "text-green-500",  label: "100% Free to Start" },
                  { icon: TrendingUp,  color: "text-blue-500",   label: "95% ATS Success Rate" },
                  { icon: Award,       color: "text-purple-500", label: "4.9/5 User Rating" },
                ].map(({ icon: Icon, color, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-1.5 sm:gap-2
                               text-xs sm:text-sm text-gray-600
                               bg-white/80 backdrop-blur
                               px-3 py-1.5 sm:px-4 sm:py-2
                               rounded-full border border-gray-200 shadow-sm"
                  >
                    <Icon className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${color}`} />
                    <span>{label}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="hero-el flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <button
                  onClick={handleStartBuilding}
                  className="inline-flex items-center justify-center gap-2
                             bg-gradient-to-r from-blue-600 to-purple-600
                             hover:from-blue-700 hover:to-purple-700
                             text-white
                             px-6 py-3.5 sm:px-10 sm:py-4
                             text-sm sm:text-base lg:text-lg font-bold
                             rounded-2xl
                             shadow-xl shadow-purple-300/40
                             hover:shadow-2xl hover:scale-[1.02]
                             transition-all active:scale-[.98]"
                >
                  {isAuthenticated ? "Go to Dashboard" : "Create My Free Resume"}
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
                <Link href="/dashboard/upload" className="flex-shrink-0">
                  <button
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2
                               border-2 border-gray-300 text-gray-700
                               hover:bg-gray-50
                               px-5 py-3.5 sm:px-8 sm:py-4
                               text-sm sm:text-base lg:text-lg font-bold
                               rounded-2xl
                               hover:scale-[1.02] transition-all active:scale-[.98]"
                  >
                    <Upload className="h-4 w-4 sm:h-5 sm:w-5" />
                    Upload Existing CV
                  </button>
                </Link>
              </div>

              {/* trusted by line */}
              <p className="hero-el mt-4 sm:mt-6 text-xs sm:text-sm text-gray-500">
                Trusted by professionals hired at{" "}
                <span className="font-semibold text-gray-700">
                  Cognizant, Infosys, TCS, Wipro, and more
                </span>
              </p>
            </div>

            {/* ── right — logo visual (desktop only) ── */}
            <div className="hidden lg:flex justify-center items-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r
                                from-blue-500/20 to-purple-500/20
                                rounded-full blur-3xl" />
                <Image
                  src="/logo.png"
                  alt="ResumeAchieve Logo"
                  width={400}
                  height={400}
                  className="relative z-10 drop-shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          STATS BAND
      ══════════════════════════════════════════════════ */}
      <section className="stats-section bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 lg:gap-10
                          text-center text-white">
            {STATS.map(({ value, label }, i) => (
              <div key={i} className="stat-item">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-1 sm:mb-2">
                  {value}
                </div>
                <div className="text-purple-100 font-medium text-sm sm:text-base lg:text-lg">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════════════════ */}
      <section className="steps-section bg-[#fafafa] py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* header */}
          <div className="text-center mb-10 sm:mb-14 lg:mb-16">
            <div className="inline-flex items-center gap-2 rounded-full
                            bg-purple-50 border border-purple-100
                            text-purple-600 text-xs sm:text-sm font-semibold
                            px-3 py-1.5 mb-3 sm:mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              Simple 3-step process
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold
                           text-gray-900 tracking-tight mb-3 sm:mb-4">
              How It Works
            </h2>
            <p className="text-sm sm:text-lg lg:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
              From sign-in to a polished, ATS-ready resume in 3 simple steps
            </p>
          </div>

          {/* steps grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 relative">
            {/* connector line — desktop only */}
            <div className="hidden sm:block absolute top-[44px]
                            left-[calc(33%-16px)] right-[calc(33%-16px)]
                            h-px bg-gradient-to-r from-purple-200 via-purple-300 to-purple-200" />

            {STEPS.map(({ num, icon: Icon, title, desc }, i) => (
              <div
                key={i}
                className="step-card text-center relative
                           bg-white rounded-2xl sm:rounded-3xl
                           border border-gray-100
                           p-6 sm:p-8
                           shadow-sm hover:shadow-lg transition-shadow"
              >
                {/* step number circle */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20
                                bg-gradient-to-br from-purple-600 to-indigo-600
                                text-white rounded-full
                                flex flex-col items-center justify-center
                                text-base sm:text-xl lg:text-2xl font-extrabold
                                mx-auto mb-4 sm:mb-6
                                shadow-lg shadow-purple-300/40
                                relative z-10">
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6 mb-0.5" />
                  <span className="text-[9px] sm:text-[10px] font-bold tracking-widest opacity-70">
                    {num}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg lg:text-xl font-bold
                               text-gray-900 mb-2 sm:mb-3">
                  {title}
                </h3>
                <p className="text-xs sm:text-sm lg:text-base text-gray-500
                              max-w-xs mx-auto leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════════════ */}
      <section className="testimonials-section bg-white relative overflow-hidden
                          py-16 sm:py-20 lg:py-24">
        <div
          aria-hidden
          className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96
                     bg-purple-500/4 rounded-full blur-[100px] pointer-events-none"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* section header */}
          <div className="flex flex-col sm:flex-row justify-between
                          items-start sm:items-end gap-5 sm:gap-8 mb-10 sm:mb-14 lg:mb-16">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full
                              bg-yellow-50 border border-yellow-100
                              text-yellow-700 text-xs sm:text-sm font-semibold
                              px-3 py-1.5 mb-3 sm:mb-4">
                <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
                4.9/5 from 1,000+ users
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl
                             font-extrabold text-gray-900
                             tracking-tight mb-2 sm:mb-4">
                What Our{" "}
                <span className="text-transparent bg-clip-text
                                 bg-gradient-to-r from-purple-600 to-blue-600">
                  Users Say
                </span>
              </h2>
              <p className="text-xs sm:text-base lg:text-xl text-gray-500
                            font-medium max-w-xl leading-relaxed">
                Real feedback from professionals who accelerated their careers.
              </p>
            </div>
            <button
              onClick={() => setShowFeedbackForm(true)}
              className="flex-shrink-0 inline-flex items-center gap-2
                         bg-purple-600 hover:bg-purple-700
                         text-white
                         px-5 py-2.5 sm:px-8 sm:py-3.5
                         text-xs sm:text-sm font-bold
                         rounded-xl sm:rounded-2xl
                         shadow-lg shadow-purple-200
                         transition-all hover:scale-[1.02] active:scale-[.98]"
            >
              <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              Share Your Story
            </button>
          </div>

          {/* testimonial cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
                          gap-5 sm:gap-6 lg:gap-8 mb-10 sm:mb-16">
            {displayTestimonials.map((t, i) => (
              <div
                key={i}
                className="t-card group
                           p-5 sm:p-7 lg:p-8
                           rounded-2xl sm:rounded-[2.5rem]
                           bg-white border border-gray-100
                           shadow-sm hover:shadow-xl
                           transition-all duration-300"
              >
                {/* stars */}
                <div className="flex gap-0.5 sm:gap-1 mb-4 sm:mb-5 lg:mb-6">
                  {Array.from({ length: t.rating || 5 }).map((_, j) => (
                    <Star
                      key={j}
                      className="h-3.5 w-3.5 sm:h-4 sm:w-4 lg:h-5 lg:w-5
                                 text-yellow-500 fill-yellow-500"
                    />
                  ))}
                </div>
                {/* quote */}
                <p className="text-xs sm:text-sm lg:text-base
                              text-gray-600 italic font-medium leading-relaxed
                              mb-5 sm:mb-6 lg:mb-8">
                  "{t.feedback}"
                </p>
                {/* author */}
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 sm:h-11 sm:w-11 lg:h-12 lg:w-12
                                  rounded-xl sm:rounded-2xl
                                  bg-gradient-to-br from-purple-100 to-blue-100
                                  flex items-center justify-center
                                  font-extrabold text-purple-600
                                  border border-purple-200
                                  text-sm sm:text-base flex-shrink-0">
                    {t.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <div className="font-extrabold text-gray-900
                                    text-xs sm:text-sm lg:text-base truncate">
                      {t.name}
                    </div>
                    <div className="text-[10px] sm:text-xs lg:text-sm
                                    text-purple-600 font-bold
                                    uppercase tracking-wide truncate">
                      {t.designation}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── feedback form ── */}
          {showFeedbackForm && (
            <div className="relative bg-purple-50 border border-purple-100
                            rounded-2xl sm:rounded-[2rem] lg:rounded-[3rem]
                            p-6 sm:p-10 lg:p-16
                            max-w-4xl mx-auto shadow-inner
                            animate-in slide-in-from-bottom-8 duration-300">
              <button
                onClick={() => setShowFeedbackForm(false)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6
                           p-2 rounded-xl hover:bg-purple-100
                           text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold
                             text-gray-900 mb-1 sm:mb-2 tracking-tight">
                Your Feedback Matters
              </h3>
              <p className="text-xs sm:text-sm lg:text-base text-gray-500
                            mb-6 sm:mb-8 lg:mb-10">
                Inspire others by sharing how ResumeAchieve helped your career journey.
              </p>

              <form onSubmit={handleFeedbackSubmit}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">

                <div className="space-y-4 sm:space-y-5">
                  {[
                    { key: "name",        label: "Your Name",   placeholder: "Arjun Sharma" },
                    { key: "designation", label: "Designation", placeholder: "e.g. Senior Developer" },
                    { key: "email",       label: "Email",       placeholder: "arjun@example.com", type: "email" },
                  ].map(({ key, label, placeholder, type }) => (
                    <div key={key}>
                      <label className="block text-[10px] sm:text-xs font-extrabold
                                        uppercase tracking-widest text-gray-400 mb-1.5 sm:mb-2">
                        {label}
                      </label>
                      <input
                        type={type || "text"}
                        required={key !== "email"}
                        value={(feedbackForm as any)[key]}
                        onChange={(e) =>
                          setFeedbackForm({ ...feedbackForm, [key]: e.target.value })
                        }
                        placeholder={placeholder}
                        className="w-full bg-white border border-gray-200 rounded-xl sm:rounded-2xl
                                   px-3 py-2.5 sm:p-4
                                   text-sm sm:text-base font-semibold
                                   text-gray-900 placeholder:text-gray-300
                                   focus:border-purple-500 focus:ring-2 focus:ring-purple-500/15
                                   outline-none transition-all"
                      />
                    </div>
                  ))}
                </div>

                <div className="space-y-4 sm:space-y-5">
                  {/* rating */}
                  <div>
                    <label className="block text-[10px] sm:text-xs font-extrabold
                                      uppercase tracking-widest text-gray-400 mb-1.5 sm:mb-2">
                      Rating
                    </label>
                    <div className="flex gap-1.5 sm:gap-2">
                      {[1, 2, 3, 4, 5].map((r) => (
                        <button
                          type="button"
                          key={r}
                          onClick={() => setFeedbackForm({ ...feedbackForm, rating: r })}
                          className={`p-1.5 sm:p-2 rounded-xl border transition-colors
                            ${feedbackForm.rating >= r
                              ? "border-yellow-400 bg-yellow-50"
                              : "border-gray-200 bg-white"}`}
                        >
                          <Star
                            className={`h-5 w-5 sm:h-6 sm:w-6 transition-colors
                              ${feedbackForm.rating >= r
                                ? "text-yellow-500 fill-yellow-500"
                                : "text-gray-300"}`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  {/* story */}
                  <div className="flex-1">
                    <label className="block text-[10px] sm:text-xs font-extrabold
                                      uppercase tracking-widest text-gray-400 mb-1.5 sm:mb-2">
                      Your Story
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={feedbackForm.feedback}
                      onChange={(e) =>
                        setFeedbackForm({ ...feedbackForm, feedback: e.target.value })
                      }
                      placeholder="Share how ResumeAchieve helped you…"
                      className="w-full bg-white border border-gray-200 rounded-xl sm:rounded-2xl
                                 px-3 py-2.5 sm:p-4
                                 text-sm sm:text-base font-medium
                                 text-gray-900 placeholder:text-gray-300
                                 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/15
                                 outline-none resize-none transition-all"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="sm:col-span-2
                             h-12 sm:h-14 lg:h-16
                             rounded-xl sm:rounded-2xl
                             bg-gradient-to-r from-purple-600 to-indigo-600
                             hover:from-purple-700 hover:to-indigo-700
                             text-white
                             text-sm sm:text-base font-extrabold
                             uppercase tracking-widest
                             shadow-xl shadow-purple-300/30
                             hover:scale-[1.01] active:scale-[.99]
                             transition-all"
                >
                  Submit Feedback
                </button>
              </form>
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          FINAL CTA
      ══════════════════════════════════════════════════ */}
      <section className="bg-gradient-to-br from-gray-900 to-purple-950
                          py-16 sm:py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <div className="inline-flex items-center gap-2 rounded-full
                          border border-white/10 bg-white/6
                          px-3 py-1.5 text-xs sm:text-sm
                          text-purple-300 mb-4 sm:mb-6">
            <Sparkles className="h-3.5 w-3.5" />
            Join 10,000+ successful job seekers
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold
                         text-white mb-4 sm:mb-6
                         leading-tight tracking-tight">
            Ready to{" "}
            <span className="text-transparent bg-clip-text
                             bg-gradient-to-r from-purple-400 to-blue-400">
              Excel
            </span>{" "}
            in Your Career?
          </h2>

          <p className="text-sm sm:text-lg lg:text-xl text-gray-400
                        mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed">
            Join thousands of professionals who transformed their careers
            with AI-powered, ATS-optimised resumes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={handleStartBuilding}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2
                         bg-white text-purple-700 hover:bg-gray-100
                         px-6 py-3.5 sm:px-10 sm:py-4
                         text-sm sm:text-base lg:text-lg font-bold
                         rounded-2xl shadow-xl
                         hover:scale-[1.02] active:scale-[.98] transition-all"
            >
              {isAuthenticated ? "Go to Dashboard" : "Get Started Free"}
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>

            <a
              href="https://wa.me/917994689802"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <button
                className="w-full inline-flex items-center justify-center gap-2
                           border-2 border-purple-400 text-purple-300
                           hover:bg-purple-900/30
                           px-6 py-3.5 sm:px-10 sm:py-4
                           text-sm sm:text-base lg:text-lg font-bold
                           rounded-2xl
                           hover:scale-[1.02] active:scale-[.98] transition-all"
              >
                <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                WhatsApp Us
              </button>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}