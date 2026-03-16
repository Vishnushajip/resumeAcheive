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
  HelpCircle,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await contactService.submitContact(formData);
      toast.success("Message sent! We'll get back to you within 48 hours.");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Have questions? We&apos;re here to help. Reach out to our team and
              we&apos;ll get back to you as soon as possible.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-10">
            {}
            <div className="lg:col-span-1 space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Contact Information
                </h3>
                <div className="space-y-5">
                  {[
                    {
                      icon: Mail,
                      color: "bg-purple-100 text-purple-600",
                      label: "Email",
                      value: "support@resumeachieve.com",
                    },
                    {
                      icon: Phone,
                      color: "bg-blue-100 text-blue-600",
                      label: "Phone",
                      value: "+91 79946 89802",
                    },
                    {
                      icon: MapPin,
                      color: "bg-green-100 text-green-600",
                      label: "Office",
                      value: "Bengaluru, India",
                    },
                  ].map(({ icon: Icon, color, label, value }, i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <div className={`${color} p-3 rounded-xl`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{label}</p>
                        <p className="text-gray-600">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Business Hours
                </h4>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-gray-600">Mon–Fri: 9AM – 6PM IST</p>
                    <p className="text-gray-600">Weekend: 10AM – 4PM IST</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Quick Links
                </h4>
                <div className="space-y-2">
                  <Link
                    href="/privacy"
                    className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 font-medium"
                  >
                    <HelpCircle className="h-4 w-4" />
                    <span>Privacy Policy</span>
                  </Link>
                  <Link
                    href="/terms"
                    className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 font-medium"
                  >
                    <HelpCircle className="h-4 w-4" />
                    <span>Terms &amp; Conditions</span>
                  </Link>
                </div>
              </div>

              <a
                href="https://wa.me/917994689802"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-4 rounded-2xl transition-all hover:scale-105 shadow-lg shadow-green-200"
              >
                <MessageCircle className="h-5 w-5" />
                Chat on WhatsApp
              </a>
            </div>

            {}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Send us a Message
                </h3>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        First Name *
                      </label>
                      <Input
                        placeholder="Arjun"
                        required
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            firstName: e.target.value,
                          })
                        }
                        className="bg-white text-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <Input
                        placeholder="Sharma"
                        required
                        value={formData.lastName}
                        onChange={(e) =>
                          setFormData({ ...formData, lastName: e.target.value })
                        }
                        className="bg-white text-gray-900"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email *
                      </label>
                      <Input
                        type="email"
                        placeholder="arjun@example.com"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="bg-white text-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Mobile Number *
                      </label>
                      <Input
                        placeholder="+91 98765 43210"
                        required
                        value={formData.mobile}
                        onChange={(e) =>
                          setFormData({ ...formData, mobile: e.target.value })
                        }
                        className="bg-white text-gray-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Subject *
                    </label>
                    <Input
                      placeholder="How can we help?"
                      required
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      className="bg-white text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      rows={6}
                      required
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full px-5 py-3 border-2 border-gray-200 rounded-2xl bg-white text-gray-900 placeholder:text-gray-400 focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/20 transition-all resize-none"
                      placeholder="Tell us more about your question or feedback..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-2xl py-3 flex items-center justify-center gap-2"
                  >
                    <Send className="h-4 w-4" />
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
