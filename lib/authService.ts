"use client";

import axios from "axios";
import { sessionStorage } from "./session";

const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const authService = {
  login: async (password: string) => {
    try {
      const response = await api.post("/auth/login", { password });
      
      if (response.data.success && response.data.sessionToken) {
        sessionStorage.setToken(response.data.sessionToken);
      }
      
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || "Login failed");
      }
      throw error;
    }
  },

  logout: async () => {
    try {
      await api.post("/auth/logout");
      sessionStorage.removeToken();
    } catch (error) {
      console.error("Logout error:", error);
      sessionStorage.removeToken();
    }
  },

  verifySession: async () => {
    try {
      const token = sessionStorage.getToken();
      
      if (!token) {
        return { isValid: false };
      }

      const response = await api.post("/auth/verify", {
        sessionToken: token,
      });
      
      return response.data;
    } catch (error) {
      console.error("Verify session error:", error);
      return { isValid: false };
    }
  },

  isAuthenticated: () => {
    return sessionStorage.isAuthenticated();
  },
};
