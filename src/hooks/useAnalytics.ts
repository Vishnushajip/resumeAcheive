"use client";

import { useEffect } from "react";
import { analyticsService } from "@/services/analytics.service";

export function useAnalytics() {
  useEffect(() => {
    analyticsService.startTracking();

    return () => {
      analyticsService.stopTracking();
    };
  }, []);
}
