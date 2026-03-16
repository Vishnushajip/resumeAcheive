"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Loader2, Mail, ArrowRight, ShieldCheck } from "lucide-react";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

const otpSchema = z.object({
  otp: z.string().length(6, "OTP must be exactly 6 digits"),
});

export default function LoginPage() {
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, router]);

  const {
    register: regEmail,
    handleSubmit: handleEmail,
    formState: { errors: eErrors },
    reset: resetEmail,
  } = useForm({ resolver: zodResolver(loginSchema) });

  const {
    register: regOtp,
    handleSubmit: handleOtp,
    formState: { errors: oErrors },
    reset: resetOtp,
  } = useForm({ resolver: zodResolver(otpSchema) });

  async function onSendOtp(data: any) {
    setIsLoading(true);
    try {
      await authService.login(data.email);
      setEmail(data.email);
      setStep("otp");
      toast.success("One-time password sent to your email!");
      resetEmail();
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to send OTP. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function onVerifyOtp(data: any) {
    setIsLoading(true);
    try {
      const response = await authService.verifyOtp(email, data.otp);

      if (!response.token) {
        throw new Error("Authentication failed. Please try again.");
      }

      const user = {
        id: response.user?.id || email.replace(/[^a-zA-Z0-9]/g, ""),
        email,
      };

      setAuth(user, response.token);
      toast.success("Login successful! Welcome back.");
      resetOtp();
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Invalid OTP. Please check and try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-50 to-zinc-100 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 relative overflow-hidden">
          {/* Decorative gradient blob */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-3xl" />

          <div className="flex flex-col items-center space-y-4 text-center relative z-10">
            <div className="relative">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
                <span className="text-white text-2xl font-bold">R</span>
              </div>
            </div>
            <div className="space-y-1">
              <h1 className="text-2xl font-bold text-gray-900">
                {step === "email" ? "Welcome back" : "Verify it's you"}
              </h1>
              <p className="text-sm text-gray-500">
                {step === "email"
                  ? "Enter your email to receive a secure login code."
                  : `Enter the 6-digit code sent to ${email}`}
              </p>
            </div>
          </div>

          <div className="mt-8 relative z-10">
            {step === "email" ? (
              <form onSubmit={handleEmail(onSendOtp)} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      className="h-11 pl-10 rounded-lg border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                      placeholder="you@example.com"
                      type="email"
                      autoComplete="email"
                      {...regEmail("email")}
                    />
                  </div>
                  {eErrors.email && (
                    <p className="text-sm text-red-500 font-medium">
                      {eErrors.email.message as string}
                    </p>
                  )}
                </div>
                <Button
                  className="w-full h-11 rounded-lg text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleOtp(onVerifyOtp)} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Verification code
                  </label>
                  <div className="relative">
                    <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      className="h-11 pl-10 rounded-lg border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-center text-lg font-semibold tracking-[0.3em]"
                      placeholder="000000"
                      maxLength={6}
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      {...regOtp("otp")}
                    />
                  </div>
                  {oErrors.otp && (
                    <p className="text-sm text-red-500 font-medium">
                      {oErrors.otp.message as string}
                    </p>
                  )}
                </div>
                <Button
                  className="w-full h-11 rounded-lg text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    "Verify"
                  )}
                </Button>
                <div className="text-center pt-2">
                  <button
                    type="button"
                    className="text-sm text-blue-600 font-medium hover:text-blue-700 transition-colors"
                    onClick={() => {
                      setStep("email");
                      resetOtp();
                    }}
                    disabled={isLoading}
                  >
                    Use a different email
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-gray-400">
          Secure login with one-time password
        </p>
      </div>
    </div>
  );
}
