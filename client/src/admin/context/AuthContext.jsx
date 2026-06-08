import React, { createContext, useState, useEffect, useCallback } from "react";
import { authApi } from "../lib/adminApi";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // ━━━ Initialize from localStorage ━━━
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("admin_token");
      const storedUser = localStorage.getItem("admin_user");

      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        // Verify token by fetching profile
        const { data } = await authApi.getProfile();
        if (data.success) {
          setAdmin(data.data);
          setIsAuthenticated(true);
          localStorage.setItem("admin_user", JSON.stringify(data.data));
        }
      } catch (error) {
        // Try fallback to stored user
        if (storedUser) {
          try {
            setAdmin(JSON.parse(storedUser));
            setIsAuthenticated(true);
          } catch {
            localStorage.removeItem("admin_token");
            localStorage.removeItem("admin_user");
          }
        } else {
          localStorage.removeItem("admin_token");
          localStorage.removeItem("admin_user");
        }
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  // ━━━ Login ━━━
  const login = useCallback(async (credentials) => {
    try {
      const { data } = await authApi.login(credentials);
      if (data.success) {
        const { token, admin: adminData } = data.data;
        localStorage.setItem("admin_token", token);
        localStorage.setItem("admin_user", JSON.stringify(adminData));
        setAdmin(adminData);
        setIsAuthenticated(true);
        return { success: true, admin: adminData };
      }
      return { success: false, error: data.message };
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Login failed. Please try again.";
      return { success: false, error: message };
    }
  }, []);

  // ━━━ Setup (first-time) ━━━
  const setup = useCallback(async (data) => {
    try {
      const response = await authApi.setup(data);
      if (response.data.success) {
        const { token, admin: adminData } = response.data.data;
        localStorage.setItem("admin_token", token);
        localStorage.setItem("admin_user", JSON.stringify(adminData));
        setAdmin(adminData);
        setIsAuthenticated(true);
        return { success: true, admin: adminData };
      }
      return { success: false, error: response.data.message };
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Setup failed. Please try again.";
      return { success: false, error: message };
    }
  }, []);

  // ━━━ Logout ━━━
  const logout = useCallback(() => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    setAdmin(null);
    setIsAuthenticated(false);
    window.location.href = "/admin/login";
  }, []);

  const value = {
    admin,
    isLoading,
    isAuthenticated,
    login,
    setup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
