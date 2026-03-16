import api from "@/lib/axios";

export const aiService = {
  generateResume: async (data: {
    rawText?: string;
    userData?: object;
    jobDescription?: string;
  }) => {
    const response = await api.post("ai/generate", data);
    return response.data;
  },

  refineSection: async (section: string, content: string) => {
    const response = await api.post("ai/refine", { section, content });
    return response.data;
  },

  getSuccessPack: async () => {
    const response = await api.post("ai/success-pack");
    return response.data;
  },
};