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

export function Footer() {
  const currentYear = new Date().getFullYear();

  const features = [
    { icon: Zap, label: "AI-Powered", desc: "Smart resume generation" },
    { icon: Shield, label: "ATS-Optimized", desc: "Pass every scan" },
    { icon: FileText, label: "100% Free", desc: "No hidden costs" },
  ];

  return (
    <footer className="relative bg-[#0a0a0f] text-gray-400 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-[120px]" />
      </div>

      {/* Top CTA Section */}
      <div className="relative border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                Ready to Land Your Dream Job?
              </h3>
              <p className="text-gray-400">
                Join thousands of job seekers who got hired with our AI-powered
                resumes.
              </p>
            </div>
            <Link
              href="/dashboard"
              className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-white font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:-translate-y-0.5"
            >
              <Sparkles className="h-5 w-5" />
              Create Free Resume
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Features Bar */}
      <div className="relative border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, label, desc }) => (
              <div
                key={label}
                className="flex items-center gap-4 justify-center sm:justify-start"
              >
                <div className="h-12 w-12 rounded-xl bg-gray-800/50 border border-gray-700/50 flex items-center justify-center">
                  <Icon className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-white font-semibold">{label}</p>
                  <p className="text-sm text-gray-500">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
            {/* Brand Column */}
            <div className="lg:col-span-4 space-y-6">
              <Link href="/" className="flex items-center group">
                <div className="relative overflow-hidden transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src="/logo.png"
                    alt="ResumeAchieve"
                    width={160}
                    height={48}
                    className="object-contain h-10 w-auto"
                    priority
                  />
                </div>
              </Link>
              <p className="text-gray-400 leading-relaxed text-sm">
                AI-powered resume builder helping job seekers worldwide land
                their dream jobs. Create professional, ATS-optimized resumes in
                minutes—completely free.
              </p>
              <div className="flex gap-3">
                {[
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
                ].map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="h-10 w-10 rounded-lg bg-gray-800/50 border border-gray-700/50 flex items-center justify-center hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 hover:border-transparent hover:text-white transition-all duration-300"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-2">
              <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
                Product
              </h4>
              <ul className="space-y-3">
                {[
                  { href: "/dashboard", label: "Create Resume" },
                  { href: "/dashboard/upload", label: "Upload CV" },
                  { href: "/resumes", label: "My Resumes" },
                  { href: "/templates", label: "Templates" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-sm hover:translate-x-1 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div className="lg:col-span-2">
              <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
                Company
              </h4>
              <ul className="space-y-3">
                {[
                  { href: "/about", label: "About Us" },
                  { href: "/contact", label: "Contact" },
                  { href: "/blog", label: "Blog" },
                  { href: "/careers", label: "Careers" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-sm hover:translate-x-1 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div className="lg:col-span-2">
              <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
                Legal
              </h4>
              <ul className="space-y-3">
                {[
                  { href: "/privacy", label: "Privacy Policy" },
                  { href: "/terms", label: "Terms of Service" },
                  { href: "/cookies", label: "Cookie Policy" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-sm hover:translate-x-1 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="lg:col-span-2">
              <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
                Contact
              </h4>
              <ul className="space-y-4">
                <li>
                  <a
                    href="mailto:support@resumeachieve.com"
                    className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    <div className="h-8 w-8 rounded-lg bg-gray-800/50 flex items-center justify-center">
                      <Mail className="h-4 w-4 text-purple-400" />
                    </div>
                    support@resumeachieve.com
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+917994689802"
                    className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    <div className="h-8 w-8 rounded-lg bg-gray-800/50 flex items-center justify-center">
                      <Phone className="h-4 w-4 text-blue-400" />
                    </div>
                    +91 79946 89802
                  </a>
                </li>
                <li className="flex items-center gap-3 text-gray-400 text-sm">
                  <div className="h-8 w-8 rounded-lg bg-gray-800/50 flex items-center justify-center">
                    <MapPin className="h-4 w-4 text-green-400" />
                  </div>
                  Worldwide
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {currentYear} ResumeAchieve.com. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Made with</span>
              <span className="text-red-500 animate-pulse">❤</span>
              <span>for job seekers worldwide</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
