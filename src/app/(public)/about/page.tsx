import { Button } from "@/components/ui/Button";
import {
  Users,
  Award,
  Target,
  Rocket,
  Shield,
  Globe,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {}
      <section className="bg-gradient-to-br from-purple-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            About ResumeAchieve.com
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            We&apos;re on a mission to help professionals create compelling,
            ATS-optimized resumes that land their dream jobs. Powered by AI,
            built for success.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/login">
              <Button
                size="lg"
                className="bg-purple-600 hover:bg-purple-700 text-white rounded-2xl flex items-center gap-2"
              >
                Start Building Your Resume
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-purple-300 text-purple-700 hover:bg-purple-50 rounded-2xl"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Mission
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              To democratize professional resume creation by providing
              AI-powered tools that help job seekers stand out in competitive
              markets.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                color: "bg-purple-100 text-purple-600",
                title: "Precision",
                desc: "AI-driven optimization ensures your resume passes ATS systems and reaches human recruiters.",
              },
              {
                icon: Users,
                color: "bg-blue-100 text-blue-600",
                title: "Accessibility",
                desc: "Professional resume creation accessible to everyone, regardless of technical expertise.",
              },
              {
                icon: Rocket,
                color: "bg-green-100 text-green-600",
                title: "Innovation",
                desc: "Continuously evolving our AI to match the latest recruitment trends and technologies.",
              },
            ].map(({ icon: Icon, color, title, desc }, i) => (
              <div
                key={i}
                className="text-center p-8 rounded-3xl border border-gray-100 hover:shadow-lg transition-all"
              >
                <div
                  className={`w-20 h-20 ${color} rounded-2xl flex items-center justify-center mx-auto mb-6`}
                >
                  <Icon className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {title}
                </h3>
                <p className="text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Impact by Numbers</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { value: "10K+", label: "Resumes Created" },
              { value: "90%", label: "ATS Success Rate" },
              { value: "1M+", label: "Job Applications" },
              { value: "4.5★", label: "User Rating" },
            ].map(({ value, label }, i) => (
              <div key={i}>
                <div className="text-5xl font-bold mb-2">{value}</div>
                <div className="text-purple-100 font-medium">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose ResumeAchieve.com?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine cutting-edge technology with user-centric design to
              deliver the best resume building experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {[
              {
                icon: Award,
                color: "bg-purple-100 text-purple-600",
                title: "AI-Powered Optimization",
                desc: "Our advanced AI analyzes job descriptions and optimizes your resume for maximum impact.",
              },
              {
                icon: Shield,
                color: "bg-blue-100 text-blue-600",
                title: "ATS-Friendly Templates",
                desc: "All templates are designed to pass ATS systems seamlessly and reach recruiters.",
              },
              {
                icon: Globe,
                color: "bg-green-100 text-green-600",
                title: "Global Accessibility",
                desc: "Available 24/7 worldwide with support for multiple languages and regions.",
              },
              {
                icon: CheckCircle,
                color: "bg-orange-100 text-orange-600",
                title: "Proven Results",
                desc: "Join thousands of professionals who've landed their dream jobs with our help.",
              },
            ].map(({ icon: Icon, color, title, desc }, i) => (
              <div key={i} className="flex items-start space-x-4">
                <div className={`${color} p-3 rounded-xl flex-shrink-0`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {title}
                  </h3>
                  <p className="text-gray-600">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-purple-950 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of professionals who have already taken the next step
            in their career journey.
          </p>
          <Link href="/login">
            <Button
              size="lg"
              className="bg-white text-purple-700 hover:bg-gray-100 rounded-2xl font-bold flex items-center gap-2 mx-auto"
            >
              Get Started Free
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
