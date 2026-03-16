import api from "@/lib/axios";

export interface TestimonialData {
  name: string;
  designation: string;
  feedback: string;
  rating: number;
  email?: string;
  avatarUrl?: string;
}

export const testimonialsService = {
  submitTestimonial: async (data: TestimonialData) => {
    const response = await api.post("testimonials", data);
    return response.data;
  },

  getApprovedTestimonials: async (page = 1, limit = 10) => {
    const response = await api.get(`testimonials?page=${page}&limit=${limit}`);
    return response.data;
  },

  getAllTestimonials: async (page = 1, limit = 10) => {
    const response = await api.get(
      `testimonials/all?page=${page}&limit=${limit}`,
    );
    return response.data;
  },

  getTestimonial: async (id: string) => {
    const response = await api.get(`testimonials/${id}`);
    return response.data;
  },

  updateTestimonial: async (id: string, data: Partial<TestimonialData>) => {
    const response = await api.put(`testimonials/${id}`, data);
    return response.data;
  },

  deleteTestimonial: async (id: string) => {
    const response = await api.delete(`testimonials/${id}`);
    return response.data;
  },

  approveTestimonial: async (id: string) => {
    const response = await api.patch(`testimonials/${id}/approve`);
    return response.data;
  },
};
