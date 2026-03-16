"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Zap, Shield, FileText, TrendingUp, Users, Award } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const features = [
  {
    icon: Zap,
    color: "bg-amber-100 text-amber-600",
    title: "100% Free AI Generation",
    desc: "Zero costs. No credit cards. Our AI analyzes keywords and structures your resume for free, instantly.",
  },
  {
    icon: Shield,
    color: "bg-blue-100 text-blue-600",
    title: "ATS Optimized",
    desc: "Ensure your resume passes through Applicant Tracking Systems with high accuracy scores.",
  },
  {
    icon: FileText,
    color: "bg-emerald-100 text-emerald-600",
    title: "Professional Templates",
    desc: "Choose from expertly crafted templates designed by industry hiring professionals.",
  },
  {
    icon: TrendingUp,
    color: "bg-orange-100 text-orange-600",
    title: "Real-time Analytics",
    desc: "Get instant feedback on your resume's ATS score and actionable optimization tips.",
  },
  {
    icon: Users,
    color: "bg-rose-100 text-rose-600",
    title: "Client-Side OCR",
    desc: "Upload an existing CV — extracted in-browser. Your data never leaves your device.",
  },
  {
    icon: Award,
    color: "bg-violet-100 text-violet-600",
    title: "Export Anywhere",
    desc: "Download as PDF, DOCX, or JSON. Print-ready quality right from your browser.",
  },
];

export function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".feature-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.06,
        ease: "power2.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="features-section py-16 sm:py-20 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-4">
            Features
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to Land Your Dream Job
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Powerful AI tools designed to give you the competitive edge in
            today&apos;s job market
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, color, title, desc }, i) => (
            <div
              key={i}
              className="feature-card p-6 rounded-2xl border border-gray-100 bg-white hover:shadow-lg hover:border-purple-200 hover:-translate-y-0.5 transition-all duration-300 cursor-default group"
            >
              <div
                className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300`}
              >
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
