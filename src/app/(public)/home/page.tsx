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
  Rocket,
  Sparkles,
  Star,
  ArrowRight,
  MessageCircle,
  Upload,
  CheckCircle,
  TrendingUp,
  Award,
} from "lucide-react";
import { testimonialsService, TestimonialData } from "@/services/testimonials.service";
import { toast } from "sonner";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated, initializeAuth } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [testimonials, setTestimonials] = useState<TestimonialData[]>([]);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedbackForm, setFeedbackForm] = useState<TestimonialData>({
    name: "",
    designation: "",
    feedback: "",
    rating: 5,
    email: "",
  });

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await testimonialsService.getApprovedTestimonials();
        setTestimonials(data.testimonials || []);
      } catch (err) {
        console.error("Failed to fetch testimonials", err);
      }
    };
    fetchTestimonials();
  }, []);

  useEffect(() => {
    setMounted(true);
    initializeAuth();
  }, [initializeAuth]);

  useEffect(() => {
    if (!mounted) return;
    const ctx = gsap.context(() => {
      gsap.from(".hero-el", {
        y: 50,
        opacity: 0,
        duration: 0.9,
        stagger: 0.18,
        ease: "power4.out",
      });

      gsap.from(".stat-item", {
        scrollTrigger: { trigger: ".stats-section", start: "top 80%" },
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
      });
    }, containerRef);
    return () => ctx.revert();
  }, [mounted]);

  const handleStartBuilding = () => {
    if (isAuthenticated) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-white" ref={containerRef}>
      {}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        {}
        <div className="absolute inset-0 z-0">
          <Image
            src="/resume_builder_hero.png"
            alt="ResumeAchieve AI Resume Builder Background"
            fill
            className="object-cover object-center"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-white/40" />
        </div>

        {}
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none animate-pulse" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {}
            <div className="text-left">
              {}
              <div className="hero-el inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-bold mb-6 shadow-lg shadow-purple-300/50">
                <Image
                  src="/logo.png"
                  alt="ResumeAchieve"
                  width={24}
                  height={24}
                  className="rounded-full bg-white"
                />
                ResumeAchieve.com
              </div>

              {}
              <div className="hero-el inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold mb-6 border border-blue-200">
                <Sparkles className="h-4 w-4" />
                #1 AI Resume Builder for Job Seekers
              </div>

              <h1 className="hero-el text-5xl lg:text-6xl xl:text-7xl font-extrabold text-gray-900 mb-6 leading-[1.1] tracking-tight">
                Land Your{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    Dream Job
                  </span>
                  <span className="absolute inset-x-0 bottom-2 h-4 bg-blue-100 rounded-full -z-0" />
                </span>
                <br />
                <span className="text-gray-700">
                  with an ATS-Winning Resume
                </span>
              </h1>

              <p className="hero-el text-lg lg:text-xl text-gray-600 mb-8 max-w-xl font-medium leading-relaxed">
                Join{" "}
                <span className="text-blue-600 font-bold">
                  50,000+ job seekers
                </span>{" "}
                who got hired using ResumeAchieve. Our AI creates professional
                resumes that beat ATS filters and impress recruiters —
                <span className="text-purple-600 font-semibold">
                  {" "}
                  in just 5 minutes
                </span>
                .
              </p>

              {}
              <div className="hero-el flex flex-wrap items-center gap-4 mb-8">
                <div className="flex items-center gap-2 text-sm text-gray-600 bg-white/80 backdrop-blur px-4 py-2 rounded-full border border-gray-200 shadow-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>100% Free to Start</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 bg-white/80 backdrop-blur px-4 py-2 rounded-full border border-gray-200 shadow-sm">
                  <TrendingUp className="h-4 w-4 text-blue-500" />
                  <span>95% ATS Success Rate</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 bg-white/80 backdrop-blur px-4 py-2 rounded-full border border-gray-200 shadow-sm">
                  <Award className="h-4 w-4 text-purple-500" />
                  <span>4.9/5 User Rating</span>
                </div>
              </div>

              <div className="hero-el flex flex-col sm:flex-row items-start gap-4">
                <Button
                  size="lg"
                  onClick={handleStartBuilding}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-6 text-lg font-bold rounded-2xl shadow-xl shadow-purple-300/50 hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-2"
                >
                  {isAuthenticated
                    ? "Go to Dashboard"
                    : "Create My Free Resume"}
                  <ArrowRight className="h-5 w-5" />
                </Button>
                <Link href="/dashboard/upload">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-6 text-lg font-bold rounded-2xl hover:scale-105 transition-all flex items-center gap-2"
                  >
                    <Upload className="h-5 w-5" />
                    Upload Existing CV
                  </Button>
                </Link>
              </div>

              {}
              <p className="hero-el mt-6 text-sm text-gray-500">
                Trusted by professionals hired at{" "}
                <span className="font-semibold text-gray-700">
                  Google, Amazon, Microsoft, Meta & more
                </span>
              </p>
            </div>

            {}
            <div className="hidden lg:flex justify-center items-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl" />
                <Image
                  src="/logo.png"
                  alt="ResumeAchieve.com Logo"
                  width={400}
                  height={400}
                  className="relative z-10 drop-shadow-2xl animate-float"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {}
      <section className="stats-section py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-10 text-center text-white">
            {[
              { value: "50K+", label: "Resumes Created" },
              { value: "95%", label: "ATS Success Rate" },
              { value: "2M+", label: "Job Applications" },
              { value: "4.9★", label: "User Rating" },
            ].map(({ value, label }, i) => (
              <div key={i} className="stat-item">
                <div className="text-5xl font-extrabold mb-2">{value}</div>
                <div className="text-purple-100 font-medium text-lg">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              From sign in to a polished, ATS-ready resume in 3 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-[42px] left-[calc(33%-20px)] right-[calc(33%-20px)] h-0.5 bg-purple-200" />
            {[
              {
                step: "01",
                title: "Sign In with Email",
                desc: "Use your email address — we'll send a secure OTP. No passwords needed.",
              },
              {
                step: "02",
                title: "Enter Your Details",
                desc: "Fill in your experience, skills, and paste the job description for tailored optimization.",
              },
              {
                step: "03",
                title: "Download & Apply",
                desc: "AI crafts your ATS-optimized resume. Export as PDF or DOCX and start applying.",
              },
            ].map(({ step, title, desc }, i) => (
              <div key={i} className="text-center relative">
                <div className="w-20 h-20 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-extrabold mx-auto mb-6 shadow-lg shadow-purple-300 relative z-10">
                  {step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {title}
                </h3>
                <p className="text-gray-500 max-w-xs mx-auto">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-[100px] -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-16">
            <div className="text-left">
              <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4 tracking-tighter">
                What Our <span className="text-purple-600">Users Say</span>
              </h2>
              <p className="text-xl text-gray-500 font-medium max-w-xl">
                Real feedback from professionals who accelerated their career with ResumeAchieve.
              </p>
            </div>
            <Button 
              onClick={() => setShowFeedbackForm(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-purple-200 transition-all hover:scale-105"
            >
              Share Your Success Story
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {testimonials.length > 0 ? (
              testimonials.map((t, i) => (
                <div
                  key={i}
                  className="p-8 rounded-[2.5rem] bg-white border border-gray-100 shadow-sm hover:shadow-2xl transition-all group"
                >
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: t.rating || 5 }).map((_, j) => (
                      <Star
                        key={j}
                        className="h-5 w-5 text-yellow-500 fill-yellow-500"
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-8 leading-relaxed font-medium italic text-lg">
                    "{t.feedback}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center font-bold text-purple-600 border border-purple-200">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-extrabold text-gray-900">{t.name}</div>
                      <div className="text-sm text-purple-600 font-bold uppercase tracking-wider">
                        {t.designation}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (

              [
                { name: "Arjun Sharma", role: "Software Engineer", feedback: "ResumeAchieve helped me land my dream job at Google. The ATS score went from 62 to 96 after using the AI optimization!" },
                { name: "Priya Nair", role: "Product Manager", feedback: "The AI understood the job description perfectly and restructured my resume beautifully." },
                { name: "Rahul Verma", role: "Data Analyst", feedback: "Uploaded my old CV, and it was completely transformed into an ATS-friendly format." }
              ].map((t, i) => (
                <div key={i} className="p-8 rounded-[2.5rem] bg-zinc-50 border border-zinc-100 shadow-sm opacity-60">
                   <p className="text-gray-600 italic">"{t.feedback}"</p>
                   <p className="mt-4 font-bold text-gray-900">{t.name} — {t.role}</p>
                </div>
              ))
            )}
          </div>

          {showFeedbackForm && (
            <div className="bg-purple-50 rounded-[3rem] p-10 lg:p-16 border border-purple-100 relative max-w-4xl mx-auto shadow-inner animate-in slide-in-from-bottom-10">
              <button 
                onClick={() => setShowFeedbackForm(false)}
                className="absolute top-8 right-8 text-gray-400 hover:text-gray-600 transition-colors"
                title="Close"
              >
                <CheckCircle className="h-8 w-8 rotate-45" />
              </button>
              <h3 className="text-3xl font-black text-gray-900 mb-2 font-outfit">Your Feedback Matters</h3>
              <p className="text-gray-600 mb-10 font-medium">Inspire others by sharing how ResumeAchieve helped your career journey.</p>
              
              <form 
                className="grid md:grid-cols-2 gap-8"
                onSubmit={async (e) => {
                  e.preventDefault();
                  try {
                    await testimonialsService.submitTestimonial(feedbackForm);
                    toast.success("Thank you! Your feedback has been submitted for approval.");
                    setShowFeedbackForm(false);
                    setFeedbackForm({ name: "", designation: "", feedback: "", rating: 5, email: "" });
                  } catch (err) {
                    toast.error("Failed to submit feedback. Please try again.");
                  }
                }}
              >
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Your Name</label>
                    <input 
                      type="text" 
                      required
                      value={feedbackForm.name}
                      onChange={e => setFeedbackForm({...feedbackForm, name: e.target.value})}
                      className="w-full bg-white border border-gray-200 rounded-2xl p-4 font-bold focus:border-purple-600 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Designation</label>
                    <input 
                      type="text"
                      required
                      value={feedbackForm.designation}
                      onChange={e => setFeedbackForm({...feedbackForm, designation: e.target.value})}
                      placeholder="e.g. Senior Developer"
                      className="w-full bg-white border border-gray-200 rounded-2xl p-4 font-bold focus:border-purple-600 outline-none"
                    />
                  </div>
                </div>
                <div className="space-y-6">
                   <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Rating</label>
                    <div className="flex gap-2">
                       {[1,2,3,4,5].map(r => (
                         <button 
                          type="button"
                          key={r} 
                          onClick={() => setFeedbackForm({...feedbackForm, rating: r})}
                          className={`p-2 rounded-xl border ${feedbackForm.rating >= r ? "border-yellow-500 bg-yellow-50" : "border-gray-200"}`}
                         >
                           <Star className={`h-6 w-6 ${feedbackForm.rating >= r ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`} />
                         </button>
                       ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Your Story</label>
                    <textarea 
                      required
                      rows={4}
                      value={feedbackForm.feedback}
                      onChange={e => setFeedbackForm({...feedbackForm, feedback: e.target.value})}
                      className="w-full bg-white border border-gray-200 rounded-2xl p-4 font-medium focus:border-purple-600 outline-none resize-none"
                    />
                  </div>
                </div>
                <Button type="submit" className="md:col-span-2 h-16 rounded-2xl bg-primary text-white font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 transition-all">
                  Submit Feedback
                </Button>
              </form>
            </div>
          )}
        </div>
      </section>

      {}
      <section className="py-24 bg-gradient-to-br from-gray-900 to-purple-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-6">
            Ready to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              Excel
            </span>{" "}
            in Your Career?
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Join thousands of professionals who have transformed their careers
            with AI-powered resumes
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              onClick={handleStartBuilding}
              className="bg-white text-purple-700 hover:bg-gray-100 px-10 py-4 text-lg font-bold rounded-2xl shadow-xl hover:scale-105 transition-all flex items-center gap-2"
            >
              {isAuthenticated ? "Go to Dashboard" : "Get Started Free"}
              <ArrowRight className="h-5 w-5" />
            </Button>
            <a
              href="https://wa.me/917994689802"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-purple-400 text-purple-300 hover:bg-purple-900/30 px-10 py-4 text-lg font-bold rounded-2xl hover:scale-105 transition-all flex items-center gap-2"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp Us
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
