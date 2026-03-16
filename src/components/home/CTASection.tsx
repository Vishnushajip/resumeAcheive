"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { Button } from "@/components/ui/Button";
import { ArrowRight, MessageCircle } from "lucide-react";

export function CTASection() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  const handleStartBuilding = () => {
    if (isAuthenticated) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  };

  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 to-purple-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-6">
          Ready to{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            Excel
          </span>{" "}
          in Your Career?
        </h2>
        <p className="text-xl text-gray-300 mb-10">
          Join thousands of professionals who have transformed their careers
          with AI-powered resumes
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            onClick={handleStartBuilding}
            className="bg-white text-purple-700 hover:bg-gray-100 px-10 py-4 text-lg font-bold rounded-2xl shadow-xl hover:scale-105 transition-all flex items-center gap-2"
          >
            {isAuthenticated ? "Go to Dashboard" : "Get Started Free"}
            <ArrowRight className="h-5 w-5" />
          </Button>
          <a
            href="https://wa.me/917994689802"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-purple-400 text-purple-300 hover:bg-purple-900/30 px-10 py-4 text-lg font-bold rounded-2xl hover:scale-105 transition-all flex items-center gap-2"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp Us
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
