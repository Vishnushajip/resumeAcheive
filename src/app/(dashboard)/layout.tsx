"use client";

import { AppBar } from "@/components/layout/AppBar";
import { Footer } from "@/components/layout/Footer";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, initializeAuth } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    initializeAuth();
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, initializeAuth, router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AppBar />
      <main className="pt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
}
