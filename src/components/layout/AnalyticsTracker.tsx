"use client";

import { useAnalytics } from "@/hooks/useAnalytics";
import { useAuthStore } from "@/store/auth.store";

export function AnalyticsTracker() {
  const user = useAuthStore((state) => state.user);
  useAnalytics(); 

  return null;
}