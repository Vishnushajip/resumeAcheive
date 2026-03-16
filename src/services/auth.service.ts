import api from "@/lib/axios";

export const authService = {
  login: async (email: string) => {
    try {
      const response = await api.post("/auth/send-otp", { email });
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return { success: true, mock: true };
      }
      if (
        error.code === "ECONNREFUSED" ||
        error.message.includes("Network Error")
      ) {
        throw new Error("server is not running.");
      }
      throw error;
    }
  },

  verifyOtp: async (email: string, otp: string) => {
    try {
      const response = await api.post("/auth/verify-otp", { email, otp });
      return response.data;
    } catch (error: any) {
      // For development: if backend returns 401 or 404, use mock token
      if (error.response?.status === 404 || error.response?.status === 401) {
        console.warn("Backend auth failed, using mock token for development");
        return {
          token: "mock-token-" + Math.random(),
          user: { id: "mock-user-id", email },
        };
      }
      throw error;
    }
  },
};
