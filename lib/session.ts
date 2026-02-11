"use client";

const SESSION_KEY = "admin_session_token";

export const sessionStorage = {
  setToken: (token: string) => {
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(SESSION_KEY, token);
    }
  },

  getToken: (): string | null => {
    if (typeof window !== "undefined") {
      return window.sessionStorage.getItem(SESSION_KEY);
    }
    return null;
  },

  removeToken: () => {
    if (typeof window !== "undefined") {
      window.sessionStorage.removeItem(SESSION_KEY);
    }
  },

  isAuthenticated: (): boolean => {
    return !!sessionStorage.getToken();
  },
};
