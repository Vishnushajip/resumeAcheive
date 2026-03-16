"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Phone,
  Instagram,
  Linkedin,
  Twitter,
  MapPin,
  Sparkles,
  ArrowRight,
  FileText,
  Zap,
  Shield,
} from "lucide-react";

const NAV_LINKS = {
  Product: [
    { href: "/dashboard", label: "Create Resume" },
    { href: "/dashboard/upload", label: "Upload CV" },
    { href: "/resumes", label: "My Resumes" },
    { href: "/templates", label: "Templates" },
  ],
  Company: [
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
    { href: "/blog", label: "Blog" },
    { href: "/careers", label: "Careers" },
  ],
  Legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/cookies", label: "Cookie Policy" },
  ],
};

const SOCIALS = [
  {
    Icon: Twitter,
    href: "https://twitter.com/resumeachieve",
    label: "Twitter",
  },
  {
    Icon: Linkedin,
    href: "https://linkedin.com/company/resumeachieve",
    label: "LinkedIn",
  },
  { Icon: Instagram, href: "#", label: "Instagram" },
];

const FEATURES = [
  { icon: Zap, label: "AI-Powered", desc: "Smart resume generation" },
  { icon: Shield, label: "ATS-Optimized", desc: "Pass every scan" },
  { icon: FileText, label: "100% Free", desc: "No hidden costs" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0a0f] text-gray-400">
      {/* ── CTA BAND ─────────────────────────────────────────────────────── */}
      <div className="border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                Ready to land your dream job?
              </h3>
              <p className="mt-2 text-gray-400 text-sm sm:text-base">
                Join thousands of job seekers who got hired with our AI-powered
                resumes.
              </p>
            </div>
            <Link
              href="/dashboard"
              className="
                group inline-flex items-center gap-2 self-start sm:self-auto
                px-7 py-3.5 rounded-full text-sm font-semibold text-white
                bg-gradient-to-r from-purple-600 to-blue-600
                hover:from-purple-500 hover:to-blue-500
                transition-all duration-200 whitespace-nowrap shrink-0
              "
            >
              <Sparkles className="h-4 w-4" />
              Create free resume
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* ── FEATURE PILLS ────────────────────────────────────────────────── */}
      <div className="border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {FEATURES.map(({ icon: Icon, label, desc }) => (
              <div
                key={label}
                className="
                  flex items-center gap-3
                  bg-white/[0.03] border border-white/[0.06] rounded-xl
                  px-4 py-3
                "
              >
                <div className="h-9 w-9 rounded-lg bg-white/[0.06] flex items-center justify-center shrink-0">
                  <Icon className="h-4 w-4 text-purple-400" />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold leading-none mb-0.5">
                    {label}
                  </p>
                  <p className="text-gray-500 text-xs">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN GRID ────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-12">
          {/* Brand — full width on mobile, 4 cols on desktop */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-4 space-y-5">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.png"
                alt="ResumeAchieve"
                width={148}
                height={44}
                className="object-contain h-9 w-auto"
                priority
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              AI-powered resume builder helping job seekers worldwide land their
              dream jobs. Professional, ATS-optimized resumes in minutes —
              completely free.
            </p>

            {/* Socials */}
            <div className="flex gap-2">
              {SOCIALS.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="
                    h-9 w-9 rounded-lg
                    bg-white/[0.05] border border-white/[0.08]
                    flex items-center justify-center
                    hover:bg-gradient-to-br hover:from-purple-600 hover:to-blue-600
                    hover:border-transparent hover:text-white
                    transition-all duration-200
                  "
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>

            {/* Contact */}
            <ul className="space-y-2.5 pt-1">
              <li>
                <a
                  href="mailto:resumeachieve@gmail.com"
                  className="flex items-center gap-2.5 text-gray-400 hover:text-white transition-colors text-sm"
                >
                  <Mail className="h-3.5 w-3.5 text-purple-400 shrink-0" />
                  resumeachieve@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+917994689802"
                  className="flex items-center gap-2.5 text-gray-400 hover:text-white transition-colors text-sm"
                >
                  <Phone className="h-3.5 w-3.5 text-blue-400 shrink-0" />
                  +91 79946 89802
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-sm">
                <MapPin className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                Worldwide
              </li>
            </ul>
          </div>

          {/* Nav columns — each 1 col on mobile (2-up), lg:col-span-2 */}
          {Object.entries(NAV_LINKS).map(([section, links]) => (
            <div key={section} className="col-span-1 lg:col-span-2">
              <h4 className="text-white text-xs font-semibold uppercase tracking-widest mb-5">
                {section}
              </h4>
              <ul className="space-y-3">
                {links.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="
                        text-gray-400 hover:text-white text-sm
                        transition-colors duration-150
                        hover:translate-x-0.5 inline-block
                      "
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-gray-500 text-xs">
              © {currentYear} ResumeAchieve.com. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs flex items-center gap-1.5">
              Made with
              <span className="text-red-400 animate-pulse">♥</span>
              for job seekers worldwide
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
