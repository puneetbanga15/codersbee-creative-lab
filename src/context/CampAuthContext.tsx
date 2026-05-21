import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

// ── types ────────────────────────────────────────────────────────────────────

export type CampRole = "student" | "teacher" | null;

interface AuthState {
  isAuthenticated: boolean;
  username: string | null;
  role: CampRole;
  token: string | null;
  isLoading: boolean;
}

interface CampAuthContextValue extends AuthState {
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

// ── helpers ──────────────────────────────────────────────────────────────────

const STORAGE_KEY = "camp_session";
const AUTH_URL = "/.netlify/functions/camp-auth";

function saveSession(token: string, username: string, role: CampRole) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ token, username, role }));
}

function clearSession() {
  localStorage.removeItem(STORAGE_KEY);
}

function loadSession(): { token: string; username: string; role: CampRole } | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function verifyToken(
  token: string
): Promise<{ username: string; role: CampRole } | null> {
  try {
    const res = await fetch(AUTH_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "verify", token }),
    });
    const data = await res.json();
    if (data.valid) return { username: data.username, role: data.role ?? "student" };
    return null;
  } catch {
    // Network error — trust the local session rather than locking user out
    const session = loadSession();
    return session ? { username: session.username, role: session.role } : null;
  }
}

// ── context ──────────────────────────────────────────────────────────────────

const CampAuthContext = createContext<CampAuthContextValue | null>(null);

export function CampAuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    username: null,
    role: null,
    token: null,
    isLoading: true,
  });

  // On mount — check if a stored session is still valid
  useEffect(() => {
    const session = loadSession();
    if (!session) {
      setState({ isAuthenticated: false, username: null, role: null, token: null, isLoading: false });
      return;
    }

    verifyToken(session.token).then((result) => {
      if (result) {
        setState({
          isAuthenticated: true,
          username: result.username,
          role: result.role,
          token: session.token,
          isLoading: false,
        });
      } else {
        clearSession();
        setState({ isAuthenticated: false, username: null, role: null, token: null, isLoading: false });
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
        const role: CampRole = data.role ?? "student";
        saveSession(data.token, data.username, role);
        setState({
          isAuthenticated: true,
          username: data.username,
          role,
          token: data.token,
          isLoading: false,
        });
        return { success: true };
      }

      return { success: false, error: data.error ?? "Login failed" };
    } catch {
      return { success: false, error: "Network error — please check your connection" };
    }
  }, []);

  const logout = useCallback(() => {
    clearSession();
    setState({ isAuthenticated: false, username: null, role: null, token: null, isLoading: false });
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
