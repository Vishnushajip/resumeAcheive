"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/Input";
import {
  Loader2,
  Mail,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  ChevronLeft,
  Sparkles,
  Lock,
} from "lucide-react";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});
const otpSchema = z.object({
  otp: z.string().length(6, "OTP must be exactly 6 digits"),
});

const TRUST = [
  "AI-powered resume builder",
  "ATS-optimised templates",
  "Free — no credit card needed",
];

export default function LoginPage() {
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) router.replace("/dashboard");
  }, [isAuthenticated, router]);

  const {
    register: regEmail,
    handleSubmit: handleEmail,
    formState: { errors: eErrors },
    reset: resetEmail,
  } = useForm({ resolver: zodResolver(loginSchema) });

  const {
    register: regOtp,
    handleSubmit: handleOtp,
    formState: { errors: oErrors },
    reset: resetOtp,
  } = useForm({ resolver: zodResolver(otpSchema) });

  async function onSendOtp(data: any) {
    setIsLoading(true);
    try {
      await authService.login(data.email);
      setEmail(data.email);
      setStep("otp");
      toast.success("One-time password sent!");
      resetEmail();
    } catch (err: any) {
      toast.error(
        err.response?.data?.message || err.message || "Failed to send OTP.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function onVerifyOtp(data: any) {
    setIsLoading(true);
    try {
      const response = await authService.verifyOtp(email, data.otp);
      if (!response.token) throw new Error("Authentication failed.");

      // Set auth in store (this also sets the cookie)
      setAuth(
        { id: response.user?.id || email.replace(/[^a-zA-Z0-9]/g, ""), email },
        response.token,
      );

      toast.success("Welcome back!");
      resetOtp();

      // Hard redirect instead of router.push — ensures auth state is
      // fully persisted before dashboard mounts
      window.location.href = "/dashboard";
    } catch (err: any) {
      toast.error(err.response?.data?.message || err.message || "Invalid OTP.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#09090f]">
      {/* ── LEFT PANEL ─────────────────────────────────────────────────── */}
      <div
        className="relative flex-shrink-0 overflow-hidden
                      h-[180px] sm:h-[200px]
                      lg:w-[52%] lg:h-auto lg:min-h-screen"
      >
        {/* bg image — reduced height via object-position */}
        <Image
          src="/resume_builder_hero_bg.png"
          alt=""
          fill
          priority
          className="object-cover object-top scale-105"
        />

        {/* layered overlays */}
        <div className="absolute inset-0 bg-[#09090f]/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090f] via-[#09090f]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#09090f]/60" />

        {/* subtle noise texture */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* dot grid */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* glow orbs */}
        <div
          aria-hidden
          className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-violet-600/15 blur-[100px] pointer-events-none"
        />
        <div
          aria-hidden
          className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full bg-blue-500/10 blur-[80px] pointer-events-none"
        />

        {/* ── inner content ── */}
        <div className="relative z-10 flex flex-col h-full px-5 pt-5 pb-5 sm:px-7 sm:pt-6 lg:px-10 lg:py-10 xl:px-14 xl:py-12">
          {/* logo */}
          <Link href="/" className="flex items-center gap-2.5 group w-fit">
            <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-xl bg-white/8 border border-white/12 flex items-center justify-center flex-shrink-0 group-hover:bg-white/12 transition-colors">
              <span className="text-white font-black text-xs sm:text-sm">
                R
              </span>
            </div>
            <span className="text-white/90 font-bold text-sm sm:text-base tracking-tight">
              ResumeAchieve
            </span>
          </Link>

          {/* mobile tagline */}
          <div className="lg:hidden mt-3">
            <p className="text-white/40 text-[11px] leading-relaxed">
              AI-powered resumes that get you hired.
            </p>
          </div>

          {/* desktop content */}
          <div className="hidden lg:flex flex-col flex-1 pt-16">
            {/* badge */}
            <div className="inline-flex items-center gap-2 w-fit rounded-full border border-white/8 bg-white/4 px-3 py-1.5 mb-7">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] text-white/50 tracking-wide">
                Trusted by 10,000+ job seekers
              </span>
            </div>

            <h2 className="text-3xl xl:text-4xl font-extrabold text-white leading-[1.15] tracking-tight mb-5 max-w-sm">
              Land your dream job with a{" "}
              <span className="relative">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-blue-300">
                  standout resume
                </span>
              </span>
            </h2>

            <p className="text-white/35 text-sm leading-relaxed max-w-xs mb-10">
              Build an ATS-optimised resume in minutes. No design skills needed,
              just your story.
            </p>

            <ul className="space-y-3 mb-auto">
              {TRUST.map((t) => (
                <li
                  key={t}
                  className="flex items-center gap-3 text-sm text-white/55"
                >
                  <div className="h-5 w-5 rounded-full bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-3 w-3 text-emerald-400" />
                  </div>
                  {t}
                </li>
              ))}
            </ul>

            {/* preview card */}
            <div className="relative mt-10 mb-2">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-violet-500/20 to-blue-500/20 blur-md" />
              <div className="relative rounded-2xl overflow-hidden border border-white/8">
                <Image
                  src="/resume_builder_hero.png"
                  alt="Resume example"
                  width={440}
                  height={220}
                  className="w-full object-cover opacity-70"
                  style={{ maxHeight: "200px" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#09090f]/60 to-transparent" />
              </div>
              <div className="absolute -top-3 -right-3 bg-emerald-500 text-white text-[11px] font-bold px-2.5 py-1.5 rounded-full shadow-lg shadow-emerald-500/30 flex items-center gap-1.5">
                <ShieldCheck className="h-3 w-3" />
                ATS Score 94%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL ────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col bg-[#0d0d14]">
        <div className="flex-1 flex items-center justify-center px-5 sm:px-8 py-10 sm:py-14">
          <div className="w-full max-w-[360px]">
            {/* back button */}
            {step === "otp" && (
              <button
                type="button"
                onClick={() => {
                  setStep("email");
                  resetOtp();
                }}
                className="flex items-center gap-1.5 text-xs text-white/30 hover:text-white/60 transition-colors mb-7"
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </button>
            )}

            {/* heading */}
            <div className="mb-8">
              {step === "email" ? (
                <>
                  <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/8 px-3 py-1 mb-4">
                    <Sparkles className="h-3 w-3 text-violet-400" />
                    <span className="text-[11px] text-violet-300/70 font-medium">
                      Passwordless login
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight mb-2">
                    Welcome back
                  </h1>
                  <p className="text-sm text-white/30 leading-relaxed">
                    Enter your email to receive a secure one-time code.
                  </p>
                </>
              ) : (
                <>
                  <div className="h-12 w-12 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-5">
                    <Mail className="h-5 w-5 text-violet-400" />
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight mb-2">
                    Check your inbox
                  </h1>
                  <p className="text-sm text-white/30 leading-relaxed">
                    We sent a 6-digit code to{" "}
                    <span className="font-semibold text-white/60 break-all">
                      {email}
                    </span>
                    . Expires in 10 minutes.
                  </p>
                </>
              )}
            </div>

            {/* ── EMAIL STEP ── */}
            {step === "email" && (
              <form onSubmit={handleEmail(onSendOtp)} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">
                    Email address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20 pointer-events-none" />
                    <input
                      className="w-full h-12 pl-10 pr-4 rounded-xl
                                 bg-white/4 border border-white/8
                                 text-white text-sm placeholder:text-white/20
                                 focus:outline-none focus:border-violet-500/50 focus:bg-white/6
                                 transition-all"
                      placeholder="you@example.com"
                      type="email"
                      autoComplete="email"
                      autoFocus
                      {...regEmail("email")}
                    />
                  </div>
                  {eErrors.email && (
                    <p className="mt-1.5 text-[11px] text-red-400 font-medium">
                      {eErrors.email.message as string}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 rounded-xl font-bold text-sm
                             bg-violet-600 hover:bg-violet-500
                             text-white flex items-center justify-center gap-2
                             transition-all active:scale-[.98]
                             disabled:opacity-50 disabled:cursor-not-allowed
                             shadow-lg shadow-violet-900/40"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      Continue
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>

                <div className="flex items-center gap-3 py-1">
                  <div className="flex-1 h-px bg-white/6" />
                  <span className="flex items-center gap-1.5 text-[11px] text-white/20">
                    <Lock className="h-3 w-3" />
                    secure &amp; passwordless
                  </span>
                  <div className="flex-1 h-px bg-white/6" />
                </div>

                <p className="text-center text-[11px] text-white/20">
                  By continuing you agree to our{" "}
                  <Link
                    href="/terms"
                    className="text-white/40 hover:text-white/70 underline underline-offset-2 transition-colors"
                  >
                    Terms
                  </Link>{" "}
                  &amp;{" "}
                  <Link
                    href="/privacy"
                    className="text-white/40 hover:text-white/70 underline underline-offset-2 transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </p>
              </form>
            )}

            {/* ── OTP STEP ── */}
            {step === "otp" && (
              <form onSubmit={handleOtp(onVerifyOtp)} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">
                    6-digit code
                  </label>
                  <input
                    className="w-full h-16 rounded-xl
                               bg-white/4 border border-white/8
                               text-white text-center text-3xl font-extrabold
                               tracking-[0.5em]
                               focus:outline-none focus:border-violet-500/50 focus:bg-white/6
                               transition-all placeholder:text-white/10"
                    placeholder="······"
                    maxLength={6}
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    autoFocus
                    {...regOtp("otp")}
                  />
                  {oErrors.otp && (
                    <p className="mt-1.5 text-[11px] text-red-400 font-medium">
                      {oErrors.otp.message as string}
                    </p>
                  )}
                </div>

                {/* email chip */}
                <div className="flex items-center gap-2.5 px-3.5 py-2.5 bg-white/3 border border-white/6 rounded-xl">
                  <Mail className="h-3.5 w-3.5 text-violet-400 shrink-0" />
                  <span className="text-xs text-white/40 font-medium truncate">
                    {email}
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 rounded-xl font-bold text-sm
                             bg-violet-600 hover:bg-violet-500
                             text-white flex items-center justify-center gap-2
                             transition-all active:scale-[.98]
                             disabled:opacity-50 disabled:cursor-not-allowed
                             shadow-lg shadow-violet-900/40"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <ShieldCheck className="h-4 w-4" />
                      Verify &amp; sign in
                    </>
                  )}
                </button>

                <p className="text-center text-[11px] text-white/25">
                  Didn't receive it?{" "}
                  <button
                    type="button"
                    disabled={isLoading}
                    onClick={() => onSendOtp({ email })}
                    className="font-semibold text-violet-400 hover:text-violet-300 transition-colors disabled:opacity-50"
                  >
                    Resend code
                  </button>
                </p>
              </form>
            )}
          </div>
        </div>

        {/* footer */}
        <div className="px-4 py-4 text-center border-t border-white/4">
          <p className="text-[11px] text-white/15">
            © {new Date().getFullYear()} ResumeAchieve.com · Secure login
            powered by OTP
          </p>
        </div>
      </div>
    </div>
  );
}
