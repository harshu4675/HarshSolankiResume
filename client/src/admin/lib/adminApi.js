import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// ━━━ Axios instance ━━━
const adminApi = axios.create({
  baseURL: API_BASE,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ━━━ Request interceptor — attach JWT ━━━
adminApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("admin_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ━━━ Response interceptor — handle auth errors ━━━
adminApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("admin_token");
      localStorage.removeItem("admin_user");

      // Don't redirect if already on login page
      if (!window.location.pathname.includes("/admin/login")) {
        window.location.href = "/admin/login";
      }
    }
    return Promise.reject(error);
  },
);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// AUTH ENDPOINTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const authApi = {
  setup: (data) => adminApi.post("/admin/setup", data),
  login: (credentials) => adminApi.post("/admin/login", credentials),
  getProfile: () => adminApi.get("/admin/me"),
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DASHBOARD ENDPOINTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const dashboardApi = {
  getStats: () => adminApi.get("/admin/dashboard"),
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CONTACT MESSAGES ENDPOINTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const messagesApi = {
  // Get all messages with filters
  getAll: (params = {}) => {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append("page", params.page);
    if (params.limit) queryParams.append("limit", params.limit);
    if (params.status) queryParams.append("status", params.status);
    if (params.starred) queryParams.append("starred", params.starred);
    if (params.search) queryParams.append("search", params.search);
    if (params.sort) queryParams.append("sort", params.sort);

    const queryString = queryParams.toString();
    return adminApi.get(
      `/admin/contacts${queryString ? `?${queryString}` : ""}`,
    );
  },

  // Get single message
  getOne: (id) => adminApi.get(`/admin/contacts/${id}`),

  // Update message (status, star, notes)
  update: (id, data) => adminApi.patch(`/admin/contacts/${id}`, data),

  // Delete message
  delete: (id) => adminApi.delete(`/admin/contacts/${id}`),
};

export default adminApi;
