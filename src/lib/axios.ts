import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/`,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const authStorage = localStorage.getItem("auth-storage");
      if (authStorage) {
        try {
          const authData = JSON.parse(authStorage);
          const token = authData.state?.token;

          if (token) {
            const headerToken = token.startsWith("Bearer ")
              ? token
              : `Bearer ${token}`;
            config.headers.Authorization = headerToken;
          }
        } catch {
          // Silent fail for auth parse errors
        }
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);

export default api;
