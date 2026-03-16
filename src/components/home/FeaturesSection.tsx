"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Zap,
  Shield,
  FileText,
  TrendingUp,
  Upload,
  Download,
  CheckCircle2,
  Star,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const features = [
  {
    icon: Zap,
    label: "100% Free Forever",
    desc: "No subscriptions, no hidden fees, no credit card required. Every feature, every template, every export — always free.",
    accent: "#F59E0B",
    accentBg: "rgba(245,158,11,0.08)",
    tag: "Free",
  },
  {
    icon: Shield,
    label: "ATS Pass-Through",
    desc: "Beat 97% of resume parsers. Our engine mirrors what Fortune 500 ATS systems look for — keyword density, structure, and formatting.",
    accent: "#6366F1",
    accentBg: "rgba(99,102,241,0.08)",
    tag: "Smart",
  },
  {
    icon: FileText,
    label: "Expert Templates",
    desc: "Curated by recruiters at top-tier companies. Each layout is tested against real hiring workflows to maximize callback rates.",
    accent: "#10B981",
    accentBg: "rgba(16,185,129,0.08)",
    tag: "Proven",
  },
  {
    icon: TrendingUp,
    label: "Live ATS Score",
    desc: "Real-time optimization as you type. See your ATS compatibility score update instantly with specific, actionable suggestions.",
    accent: "#EC4899",
    accentBg: "rgba(236,72,153,0.08)",
    tag: "Instant",
  },
  {
    icon: Upload,
    label: "Private OCR Import",
    desc: "Upload any existing CV and we extract it entirely in your browser. Zero server uploads. Your career data never leaves your device.",
    accent: "#3B82F6",
    accentBg: "rgba(59,130,246,0.08)",
    tag: "Private",
  },
  {
    icon: Download,
    label: "Universal Export",
    desc: "Download print-ready PDF, recruiter-friendly DOCX, or machine-readable JSON. Perfect formatting guaranteed across all formats.",
    accent: "#F97316",
    accentBg: "rgba(249,115,22,0.08)",
    tag: "Flexible",
  },
];

const stats = [
  { value: "1.4K+", label: "Resumes built" },
  { value: "97%", label: "ATS pass rate" },
  { value: "3×", label: "More callbacks" },
  { value: "0$", label: "Forever free" },
];

export function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headRef.current, {
        scrollTrigger: { trigger: headRef.current, start: "top 88%" },
        y: 32,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
      });

      gsap.from(".feature-card", {
        scrollTrigger: {
          trigger: ".features-grid",
          start: "top 85%",
        },
        y: 28,
        opacity: 0,
        duration: 0.55,
        stagger: 0.07,
        ease: "power2.out",
      });

      gsap.from(".stat-item", {
        scrollTrigger: { trigger: statsRef.current, start: "top 90%" },
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,400&display=swap');

        .features-wrap {
          background: #09090F;
          padding: 96px 0 80px;
          font-family: 'DM Sans', sans-serif;
          overflow: hidden;
          position: relative;
        }

        .features-wrap::before {
          content: '';
          position: absolute;
          top: -180px;
          left: 50%;
          transform: translateX(-50%);
          width: 900px;
          height: 500px;
          background: radial-gradient(ellipse at center, rgba(99,102,241,0.07) 0%, transparent 70%);
          pointer-events: none;
        }

        .features-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .features-head {
          text-align: center;
          margin-bottom: 72px;
        }

        .features-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 14px;
          border-radius: 100px;
          background: rgba(99,102,241,0.1);
          border: 1px solid rgba(99,102,241,0.2);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #818CF8;
          margin-bottom: 24px;
        }

        .features-eyebrow svg {
          width: 12px;
          height: 12px;
          fill: #818CF8;
        }

        .features-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(32px, 5vw, 54px);
          font-weight: 800;
          line-height: 1.08;
          letter-spacing: -0.03em;
          color: #ffffff;
          margin: 0 0 20px;
        }

        .features-title em {
          font-style: normal;
          background: linear-gradient(135deg, #818CF8 0%, #C4B5FD 50%, #F0ABFC 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .features-subtitle {
          font-size: 17px;
          line-height: 1.65;
          color: rgba(255,255,255,0.42);
          max-width: 520px;
          margin: 0 auto;
          font-weight: 300;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 72px;
        }

        @media (max-width: 1024px) {
          .features-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 640px) {
          .features-grid { grid-template-columns: 1fr; gap: 12px; }
          .features-wrap { padding: 64px 0 60px; }
          .features-head { margin-bottom: 48px; }
          .stats-row { grid-template-columns: repeat(2, 1fr) !important; gap: 12px !important; }
        }

        .feature-card {
          position: relative;
          padding: 28px;
          border-radius: 16px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          transition: transform 0.3s ease, border-color 0.3s ease, background 0.3s ease;
          cursor: default;
          overflow: hidden;
        }

        .feature-card::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 16px;
          opacity: 0;
          transition: opacity 0.3s ease;
          background: radial-gradient(circle at 30% 30%, var(--card-accent-bg), transparent 70%);
        }

        .feature-card:hover {
          transform: translateY(-3px);
          border-color: rgba(255,255,255,0.13);
          background: rgba(255,255,255,0.05);
        }

        .feature-card:hover::after {
          opacity: 1;
        }

        .card-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 18px;
          position: relative;
          z-index: 1;
        }

        .card-icon-wrap {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: transform 0.25s ease;
        }

        .feature-card:hover .card-icon-wrap {
          transform: scale(1.08);
        }

        .card-icon-wrap svg {
          width: 20px;
          height: 20px;
        }

        .card-tag {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 3px 10px;
          border-radius: 100px;
          border: 1px solid;
          transition: opacity 0.2s;
        }

        .card-label {
          font-family: 'Syne', sans-serif;
          font-size: 17px;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 10px;
          position: relative;
          z-index: 1;
          letter-spacing: -0.02em;
        }

        .card-desc {
          font-size: 14px;
          line-height: 1.65;
          color: rgba(255,255,255,0.42);
          margin: 0;
          position: relative;
          z-index: 1;
          font-weight: 400;
        }

        .stats-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          padding-top: 48px;
          border-top: 1px solid rgba(255,255,255,0.07);
        }

        .stat-item {
          text-align: center;
          padding: 24px 16px;
          border-radius: 14px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05);
          transition: border-color 0.25s ease;
        }

        .stat-item:hover {
          border-color: rgba(255,255,255,0.1);
        }

        .stat-value {
          font-family: 'Syne', sans-serif;
          font-size: 36px;
          font-weight: 800;
          letter-spacing: -0.04em;
          background: linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.7) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
          margin-bottom: 6px;
        }

        .stat-label {
          font-size: 13px;
          color: rgba(255,255,255,0.35);
          font-weight: 400;
          letter-spacing: 0.01em;
        }

        .free-banner {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-bottom: 40px;
          padding: 12px 20px;
          border-radius: 12px;
          background: rgba(16,185,129,0.06);
          border: 1px solid rgba(16,185,129,0.15);
          max-width: 520px;
          margin-left: auto;
          margin-right: auto;
        }

        .free-banner-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #10B981;
          animation: pulse-dot 2s ease-in-out infinite;
          flex-shrink: 0;
        }

        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.85); }
        }

        .free-banner-text {
          font-size: 13px;
          color: rgba(255,255,255,0.55);
          font-weight: 400;
        }

        .free-banner-text strong {
          color: #34D399;
          font-weight: 600;
        }
      `}</style>

      <section ref={sectionRef} className="features-wrap">
        <div className="features-container">
          <div ref={headRef} className="features-head">
            <div className="features-eyebrow">
              <Star />
              Why ResumeAchieve
            </div>
            <h2 className="features-title">
              The resume builder that <em>actually gets you hired</em>
            </h2>
            <p className="features-subtitle">
              Built with real recruiter feedback and trained on millions of
              successful applications — all without charging you a single cent.
            </p>
          </div>

          <div className="free-banner">
            <span className="free-banner-dot" />
            <span className="free-banner-text">
              <strong>Every feature below is completely free</strong> — no
              trials, no paywalls, no catch
            </span>
            <CheckCircle2 size={15} color="#34D399" style={{ flexShrink: 0 }} />
          </div>

          <div className="features-grid">
            {features.map(
              ({ icon: Icon, label, desc, accent, accentBg, tag }, i) => (
                <div
                  key={i}
                  className="feature-card"
                  style={
                    {
                      "--card-accent-bg": accentBg,
                    } as React.CSSProperties
                  }
                >
                  <div className="card-top">
                    <div
                      className="card-icon-wrap"
                      style={{ background: accentBg }}
                    >
                      <Icon color={accent} strokeWidth={1.8} />
                    </div>
                    <span
                      className="card-tag"
                      style={{
                        color: accent,
                        borderColor: `${accent}33`,
                        background: accentBg,
                      }}
                    >
                      {tag}
                    </span>
                  </div>
                  <h3 className="card-label">{label}</h3>
                  <p className="card-desc">{desc}</p>
                </div>
              ),
            )}
          </div>

          <div ref={statsRef} className="stats-row">
            {stats.map(({ value, label }, i) => (
              <div key={i} className="stat-item">
                <div className="stat-value">{value}</div>
                <div className="stat-label">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
