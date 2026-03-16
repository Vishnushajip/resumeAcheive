"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useAuthStore } from "@/store/auth.store";
import { Button } from "@/components/ui/Button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, ArrowRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function HeroSection() {
  const router = useRouter();
  const { isAuthenticated, initializeAuth } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    initializeAuth();
  }, [initializeAuth]);

  useEffect(() => {
    if (!mounted) return;

    gsap.set(".hero-el", { opacity: 1, y: 0, scale: 1 });

    const ctx = gsap.context(() => {
      gsap.from(".hero-el", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
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

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden py-16 sm:py-20 lg:py-24 flex items-center bg-[#050507]"
    >
      {/* Background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-[0.15]"
        style={{ backgroundImage: 'url("/resume_builder_hero_bg.png")' }}
      />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#050507] via-[#050507]/70 to-transparent pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#050507] via-transparent to-[#050507]/50 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center lg:text-left w-full">
        <div className="hero-el inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-xl text-purple-300 text-xs sm:text-sm font-semibold mb-6 border border-white/10">
          <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-400" />
          100% ATS-Optimized Technology
        </div>

        <h1 className="hero-el text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight tracking-tight max-w-3xl mx-auto lg:mx-0">
          <span className="block">
            Build Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              Dream Career
            </span>
          </span>
          <span className="block text-zinc-300 mt-1">
            with AI-Powered Resumes
          </span>
        </h1>

        <p className="hero-el text-base sm:text-lg text-zinc-400 mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
          Create ATS-optimized resumes that get you hired. 100% free with no
          hidden costs.
        </p>

        <div className="hero-el flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
          <Button
            size="lg"
            onClick={handleStartBuilding}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 text-base font-semibold rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 flex items-center gap-2 w-full sm:w-auto"
          >
            {isAuthenticated ? "Go to Dashboard" : "Build Free Resume"}
            <ArrowRight className="h-5 w-5" />
          </Button>
          <Link href="/dashboard/upload" className="w-full sm:w-auto">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto px-8 py-3 text-base font-semibold rounded-xl border border-white/20 text-white hover:bg-white/10 transition-all duration-300"
            >
              Upload CV
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
