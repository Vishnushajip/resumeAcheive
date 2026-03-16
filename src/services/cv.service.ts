import api from "@/lib/axios";

export interface CVData {
  title: string;
  cvData: Record<string, any>;
  templateId?: string;
  isActive?: boolean;
}

export const cvService = {
  createCV: async (cvData: CVData) => {
    const response = await api.post("cv", cvData);
    return response.data;
  },

  getUserCVs: async (page = 1, limit = 10) => {
    const response = await api.get(`cv?page=${page}&limit=${limit}`);
    return response.data;
  },

  getCV: async (cvId: string) => {
    const response = await api.get(`/cv/${cvId}`);
    return response.data;
  },

  updateCV: async (cvId: string, cvData: Partial<CVData>) => {
    const response = await api.put(`/cv/${cvId}`, cvData);
    return response.data;
  },

  deleteCV: async (cvId: string) => {
    const response = await api.delete(`/cv/${cvId}`);
    return response.data;
  },

  getCVDownloadUrl: async (cvId: string) => {
    const response = await api.get(`/cv/${cvId}/download`);
    return response.data;
  },
};
