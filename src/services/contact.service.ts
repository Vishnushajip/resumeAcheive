import api from "@/lib/axios";

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  subject: string;
  message: string;
}

export const contactService = {
  submitContact: async (data: ContactFormData) => {
    const response = await api.post("/contact", data);
    return response.data;
  },

  getContacts: async (page = 1, limit = 10) => {
    const response = await api.get(`/contact?page=${page}&limit=${limit}`);
    return response.data;
  },
};
