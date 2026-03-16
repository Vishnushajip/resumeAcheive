import api from "@/lib/axios";

const HEARTBEAT_INTERVAL = 30_000;

let heartbeatTimer: ReturnType<typeof setInterval> | null = null;

const getAnonId = (): string => {
  if (typeof window === "undefined") return "";

  let anonId = localStorage.getItem("anonId");

  if (!anonId) {
    anonId = "anon_" + Math.random().toString(36).slice(2);
    localStorage.setItem("anonId", anonId);
  }

  return anonId;
};

export const analyticsService = {
  sendTrack: async (): Promise<void> => {
    if (typeof window === "undefined") return;

    const anonId = getAnonId();

    await api.post(
      "/analytics/track",
      {},
      {
        headers: {
          "X-Anon-Id": anonId,
        },
      },
    );
  },

  startTracking: (): void => {
    if (heartbeatTimer) return;

    analyticsService.sendTrack();

    heartbeatTimer = setInterval(() => {
      analyticsService.sendTrack();
    }, HEARTBEAT_INTERVAL);
  },

  stopTracking: (): void => {
    if (!heartbeatTimer) return;

    clearInterval(heartbeatTimer);
    heartbeatTimer = null;
  },
};
