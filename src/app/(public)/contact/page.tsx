"use client";

import { useState } from "react";
import { contactService } from "@/services/contact.service";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Clock,
  MessageCircle,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

/* ─── Data ────────────────────────────────────────────────────────────────── */

const CONTACT_ITEMS = [
  {
    icon: Mail,
    label: "Email us",
    value: "resumeachieve@gmail.com",
    href: "mailto:resumeachieve@gmail.com",
    accent: "#7c3aed",
    bg: "#f5f3ff",
  },
  {
    icon: Phone,
    label: "Call us",
    value: "+91 79946 89802",
    href: "tel:+917994689802",
    accent: "#0ea5e9",
    bg: "#f0f9ff",
  },
  {
    icon: MapPin,
    label: "Based in",
    value: "Calicut, India",
    href: null,
    accent: "#10b981",
    bg: "#f0fdf4",
  },
  {
    icon: Clock,
    label: "Response time",
    value: "Within 24 - 48 hours",
    href: null,
    accent: "#f59e0b",
    bg: "#fffbeb",
  },
];

const QUICK_LINKS = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms",   label: "Terms & Conditions" },
  { href: "/about",   label: "About us" },
];

const EMPTY_FORM = {
  firstName: "",
  lastName:  "",
  email:     "",
  mobile:    "",
  subject:   "",
  message:   "",
};

/* ─── Component ──────────────────────────────────────────────────────────── */

export default function ContactPage() {
  const [formData,    setFormData]    = useState(EMPTY_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted,   setSubmitted]   = useState(false);

  const set = (key: keyof typeof EMPTY_FORM) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFormData((p) => ({ ...p, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await contactService.submitContact(formData);
      setSubmitted(true);
      setFormData(EMPTY_FORM);
      toast.success("Message sent! We'll get back to you within 48 hours.");
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#0f0c29] text-white">
        {/* grid texture */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div aria-hidden className="pointer-events-none absolute -top-24 left-1/3 h-[360px] w-[360px] rounded-full bg-purple-700/20 blur-[90px]" />
        <div aria-hidden className="pointer-events-none absolute bottom-0 right-0 h-[240px] w-[240px] rounded-full bg-blue-600/15 blur-[70px]" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 sm:pt-24 sm:pb-28 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs sm:text-sm text-purple-300 mb-5">
            <MessageCircle className="h-3.5 w-3.5" />
            We'd love to hear from you
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.1] mb-4">
            Get in{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              touch
            </span>
          </h1>
          <p className="text-sm sm:text-lg text-white/55 max-w-xl mx-auto leading-relaxed">
            Have a question, found a bug, or just want to say hi? We read every
            message and reply personally — no bots, no canned responses.
          </p>
        </div>
      </section>

      {/* ── MAIN CONTENT ──────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-start">

          {/* ── LEFT SIDEBAR ──────────────────────────────────────────────── */}
          <aside className="lg:col-span-2 space-y-8">

            {/* Contact cards */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-1 gap-3">
              {CONTACT_ITEMS.map(({ icon: Icon, label, value, href, accent, bg }) => {
                const inner = (
                  <div className="flex items-start gap-3 p-4 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all group">
                    <div
                      className="h-9 w-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: bg }}
                    >
                      <Icon className="h-4 w-4" style={{ color: accent }} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-gray-400 mb-0.5">
                        {label}
                      </p>
                      <p
                        className="text-sm sm:text-base font-semibold text-gray-900 truncate"
                        style={{ color: href ? accent : undefined }}
                      >
                        {value}
                      </p>
                    </div>
                  </div>
                );
                return href ? (
                  <a key={label} href={href} className="block">
                    {inner}
                  </a>
                ) : (
                  <div key={label}>{inner}</div>
                );
              })}
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/917994689802"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-3 bg-[#075E54] hover:bg-[#064d45] text-white px-5 py-4 rounded-2xl transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-bold leading-none mb-0.5">Chat on WhatsApp</p>
                  <p className="text-xs text-white/60">Usually replies in minutes</p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 opacity-60 group-hover:translate-x-0.5 transition-transform" />
            </a>

            {/* Quick links */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
                Helpful links
              </p>
              <div className="space-y-1">
                {QUICK_LINKS.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-purple-600 transition-colors py-1"
                  >
                    <ArrowRight className="h-3 w-3" />
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </aside>

          {/* ── FORM ──────────────────────────────────────────────────────── */}
          <div className="lg:col-span-3">
            {submitted ? (
              /* Success state */
              <div className="flex flex-col items-center justify-center text-center py-16 px-8 rounded-3xl border border-gray-100 bg-gray-50">
                <div className="h-16 w-16 rounded-full bg-green-50 flex items-center justify-center mb-5">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-2">
                  Message received!
                </h3>
                <p className="text-sm sm:text-base text-gray-500 max-w-sm leading-relaxed mb-8">
                  Thanks for reaching out. We'll reply to your email within
                  24–48 hours — usually much faster.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-purple-600 hover:text-purple-700 transition-colors"
                >
                  Send another message
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="rounded-3xl border border-gray-100 bg-white shadow-sm p-6 sm:p-8">
                <div className="mb-7">
                  <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-1">
                    Send us a message
                  </h2>
                  <p className="text-sm text-gray-400">
                    All fields marked * are required.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="First name" required>
                      <Input
                        placeholder="Arjun"
                        required
                        value={formData.firstName}
                        onChange={set("firstName")}
                      />
                    </Field>
                    <Field label="Last name" required>
                      <Input
                        placeholder="Sharma"
                        required
                        value={formData.lastName}
                        onChange={set("lastName")}
                      />
                    </Field>
                  </div>

                  {/* Email + Mobile */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Email" required>
                      <Input
                        type="email"
                        placeholder="arjun@example.com"
                        required
                        value={formData.email}
                        onChange={set("email")}
                      />
                    </Field>
                    <Field label="Mobile number" required>
                      <Input
                        placeholder="+91 98765 43210"
                        required
                        value={formData.mobile}
                        onChange={set("mobile")}
                      />
                    </Field>
                  </div>

                  {/* Subject */}
                  <Field label="Subject" required>
                    <Input
                      placeholder="How can we help?"
                      required
                      value={formData.subject}
                      onChange={set("subject")}
                    />
                  </Field>

                  {/* Message */}
                  <Field label="Message" required>
                    <textarea
                      rows={5}
                      required
                      value={formData.message}
                      onChange={set("message")}
                      placeholder="Tell us more about your question or feedback..."
                      className="
                        w-full px-4 py-3 text-sm rounded-xl
                        border border-gray-200 bg-white text-gray-900
                        placeholder:text-gray-400
                        focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500
                        transition-all resize-none
                      "
                    />
                  </Field>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold rounded-xl py-3 flex items-center justify-center gap-2 transition-all disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Send message
                      </>
                    )}
                  </Button>

                  <p className="text-center text-xs text-gray-400 pt-1">
                    By submitting you agree to our{" "}
                    <Link href="/privacy" className="underline hover:text-gray-600">
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─── Field helper ────────────────────────────────────────────────────────── */
function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs sm:text-sm font-semibold text-gray-700">
        {label}
        {required && <span className="text-purple-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}