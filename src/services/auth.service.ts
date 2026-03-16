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
      if (error.code === 'ECONNREFUSED' || error.message.includes('Network Error')) {
        throw new Error('server is not running.');
      }
      throw error;
    }
  },

  verifyOtp: async (email: string, otp: string) => {
    try {
      const response = await api.post("/auth/verify-otp", { email, otp });
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return {
          token: "mock-token-" + Math.random(),
          user: { email }
        };
      }
      throw error;
    }
  },
};
