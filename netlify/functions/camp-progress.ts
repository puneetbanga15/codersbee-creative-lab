import type { Config } from "@netlify/functions";
import { getStore } from "@netlify/blobs";
import crypto from "crypto";

// ── token verification ────────────────────────────────────────────────────────

const SECRET = process.env.CAMP_AUTH_SECRET ?? "change-me-in-netlify";

type Role = "student" | "teacher";

function verifyToken(token: string): { username: string; role: Role } | null {
  try {
    const decoded = Buffer.from(token, "base64url").toString("utf8");
    const parts = decoded.split("|");
    if (parts.length !== 4) return null;
    const [username, role, expiryStr, sig] = parts;
    if (Date.now() > parseInt(expiryStr, 10)) return null;
    const expected = crypto
      .createHmac("sha256", SECRET)
      .update(`${username}|${role}|${expiryStr}`)
      .digest("hex");
    if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
    return { username, role: role as Role };
  } catch {
    return null;
  }
}

// ── types ─────────────────────────────────────────────────────────────────────

interface ModuleProgress {
  moduleId: number;
  score: number;
  total: number;
  completedAt: string;
}

interface StudentProgress {
  username: string;
  modules: Record<number, ModuleProgress>;
}

// ── CORS headers ──────────────────────────────────────────────────────────────

const CORS = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: CORS });
}

// ── handler (v2 format — required for Netlify Blobs to work) ─────────────────

export default async (req: Request) => {
  // CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: CORS });
  }

  // Auth
  const authHeader = req.headers.get("authorization") ?? "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
  const auth = verifyToken(token);
  if (!auth) return json({ error: "Unauthorized" }, 401);

  const store = getStore("camp-progress");

  // ── POST: student saves quiz result ────────────────────────────────────────
  if (req.method === "POST") {
    if (auth.role !== "student") return json({ error: "Students only" }, 403);

    let body: { moduleId?: number; score?: number; total?: number };
    try { body = await req.json(); } catch { return json({ error: "Invalid JSON" }, 400); }

    const { moduleId, score, total } = body;
    if (typeof moduleId !== "number" || typeof score !== "number" || typeof total !== "number") {
      return json({ error: "moduleId, score, total required" }, 400);
    }

    // Load existing, only update if score improves
    let progress: StudentProgress;
    try {
      const existing = await store.get(auth.username, { type: "json" });
      progress = (existing as StudentProgress) ?? { username: auth.username, modules: {} };
    } catch {
      progress = { username: auth.username, modules: {} };
    }

    const prev = progress.modules[moduleId];
    if (!prev || score > prev.score) {
      progress.modules[moduleId] = { moduleId, score, total, completedAt: new Date().toISOString() };
      await store.setJSON(auth.username, progress);
    }

    return json({ saved: true, progress: progress.modules[moduleId] });
  }

  // ── GET: teacher reads all students ───────────────────────────────────────
  if (req.method === "GET") {
    if (auth.role !== "teacher") return json({ error: "Teachers only" }, 403);

    const { blobs } = await store.list();
    const allProgress: StudentProgress[] = await Promise.all(
      blobs.map(async (blob) => {
        try {
          const data = await store.get(blob.key, { type: "json" });
          return (data as StudentProgress) ?? { username: blob.key, modules: {} };
        } catch {
          return { username: blob.key, modules: {} };
        }
      })
    );

    return json({ students: allProgress });
  }

  return json({ error: "Method not allowed" }, 405);
};

export const config: Config = {};
