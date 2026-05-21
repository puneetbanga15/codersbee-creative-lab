import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

// ── types ────────────────────────────────────────────────────────────────────

interface AuthState {
  isAuthenticated: boolean;
  username: string | null;
  isLoading: boolean;
}

interface CampAuthContextValue extends AuthState {
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

// ── helpers ──────────────────────────────────────────────────────────────────

const STORAGE_KEY = "camp_session";
const AUTH_URL = "/.netlify/functions/camp-auth";

function saveSession(token: string, username: string) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ token, username }));
}

function clearSession() {
  localStorage.removeItem(STORAGE_KEY);
}

function loadSession(): { token: string; username: string } | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function verifyToken(token: string): Promise<string | null> {
  try {
    const res = await fetch(AUTH_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "verify", token }),
    });
    const data = await res.json();
    return data.valid ? data.username : null;
  } catch {
    // Network error — trust the local session rather than locking user out
    return loadSession()?.username ?? null;
  }
}

// ── context ──────────────────────────────────────────────────────────────────

const CampAuthContext = createContext<CampAuthContextValue | null>(null);

export function CampAuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    username: null,
    isLoading: true,
  });

  // On mount — check if a stored session is still valid
  useEffect(() => {
    const session = loadSession();
    if (!session) {
      setState({ isAuthenticated: false, username: null, isLoading: false });
      return;
    }

    // Verify token with the server
    verifyToken(session.token).then((username) => {
      if (username) {
        setState({ isAuthenticated: true, username, isLoading: false });
      } else {
        clearSession();
        setState({ isAuthenticated: false, username: null, isLoading: false });
      }
    });
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    try {
      const res = await fetch(AUTH_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "login", username, password }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        saveSession(data.token, data.username);
        setState({ isAuthenticated: true, username: data.username, isLoading: false });
        return { success: true };
      }

      return { success: false, error: data.error ?? "Login failed" };
    } catch {
      return { success: false, error: "Network error — please check your connection" };
    }
  }, []);

  const logout = useCallback(() => {
    clearSession();
    setState({ isAuthenticated: false, username: null, isLoading: false });
  }, []);

  return (
    <CampAuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </CampAuthContext.Provider>
  );
}

export function useCampAuth() {
  const ctx = useContext(CampAuthContext);
  if (!ctx) throw new Error("useCampAuth must be used inside CampAuthProvider");
  return ctx;
}
