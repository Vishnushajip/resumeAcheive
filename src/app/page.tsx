import type { Metadata } from "next";
import { AppBar } from "@/components/layout/AppBar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { StatsSection } from "@/components/home/StatsSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CTASection } from "@/components/home/CTASection";

// Force static generation for maximum SEO performance
export const dynamic = "force-static";
export const revalidate = 3600; // Revalidate every hour

// Page-specific metadata
export const metadata: Metadata = {
  title: "Free AI Resume Builder | ATS-Optimized | ResumeAchieve",
  description:
    "Create professional, ATS-friendly resumes for free with ResumeAchieve.com. AI-powered resume building with premium templates. Free PDF & DOCX downloads.",
  keywords: [
    "resume builder",
    "free resume maker",
    "ATS resume checker",
    "AI resume generator",
    "resumeachieve",
    "resume achieve",
    "CV maker",
    "professional resume builder",
    "ATS friendly resume",
    "totally free resume builder",
    "free ATS resume",
    "best free resume maker 2025",
    "no cost resume builder",
    "job resume creator",
    "ATS compatible CV",
  ],
  alternates: {
    canonical: "https://www.resumeachieve.com",
  },
  openGraph: {
    title: "Free AI Resume Builder | ATS-Optimized | ResumeAchieve",
    description:
      "Build ATS-optimized resumes that get you hired. AI-powered resume builder with 95% ATS success rate. 100% free.",
    type: "website",
    url: "https://www.resumeachieve.com",
    siteName: "ResumeAchieve.com",
    locale: "en_US",
    images: [
      {
        url: "https://www.resumeachieve.com/logo.png",
        width: 1200,
        height: 630,
        alt: "ResumeAchieve.com - AI Resume Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Resume Builder | ResumeAchieve",
    description:
      "Create ATS-optimized resumes with AI. Get hired faster with ResumeAchieve!",
    images: ["https://www.resumeachieve.com/logo.png"],
    creator: "@resumeachieve",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <AppBar />

      <main className="pt-16">
        {/* Hero Section - Client Component with animations */}
        <HeroSection />

        {/* Features Section */}
        <FeaturesSection />

        {/* Stats Section */}
        <StatsSection />

        {/* How It Works Section */}
        <HowItWorksSection />

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* CTA Section */}
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
