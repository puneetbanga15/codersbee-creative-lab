import type { Handler } from "@netlify/functions";
import { getStore } from "@netlify/blobs";
import crypto from "crypto";

// ── token verification (copied from camp-auth) ───────────────────────────────

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

export interface ModuleProgress {
  moduleId: number;
  score: number;
  total: number;
  completedAt: string; // ISO string
}

export interface StudentProgress {
  username: string;
  modules: Record<number, ModuleProgress>;
}

// ── handler ───────────────────────────────────────────────────────────────────

const HEADERS = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export const handler: Handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: HEADERS, body: "" };
  }

  // Auth: expect "Bearer <token>" in Authorization header
  const authHeader = event.headers["authorization"] ?? "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
  const auth = verifyToken(token);

  if (!auth) {
    return { statusCode: 401, headers: HEADERS, body: JSON.stringify({ error: "Unauthorized" }) };
  }

  const store = getStore("camp-progress");

  // ── POST: student saves their quiz result ────────────────────────────────
  if (event.httpMethod === "POST") {
    if (auth.role !== "student") {
      return { statusCode: 403, headers: HEADERS, body: JSON.stringify({ error: "Students only" }) };
    }

    let body: { moduleId?: number; score?: number; total?: number };
    try {
      body = JSON.parse(event.body ?? "{}");
    } catch {
      return { statusCode: 400, headers: HEADERS, body: JSON.stringify({ error: "Invalid JSON" }) };
    }

    const { moduleId, score, total } = body;
    if (typeof moduleId !== "number" || typeof score !== "number" || typeof total !== "number") {
      return { statusCode: 400, headers: HEADERS, body: JSON.stringify({ error: "moduleId, score, total required" }) };
    }

    // Load existing progress for this student
    let progress: StudentProgress;
    try {
      const existing = await store.get(auth.username, { type: "json" });
      progress = (existing as StudentProgress) ?? { username: auth.username, modules: {} };
    } catch {
      progress = { username: auth.username, modules: {} };
    }

    // Only update if this is a better score (allows retries)
    const prev = progress.modules[moduleId];
    if (!prev || score > prev.score) {
      progress.modules[moduleId] = {
        moduleId,
        score,
        total,
        completedAt: new Date().toISOString(),
      };
      await store.setJSON(auth.username, progress);
    }

    return {
      statusCode: 200,
      headers: HEADERS,
      body: JSON.stringify({ saved: true, progress: progress.modules[moduleId] }),
    };
  }

  // ── GET: teacher fetches all students' progress ──────────────────────────
  if (event.httpMethod === "GET") {
    if (auth.role !== "teacher") {
      return { statusCode: 403, headers: HEADERS, body: JSON.stringify({ error: "Teachers only" }) };
    }

    // List all student blobs
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

    return {
      statusCode: 200,
      headers: HEADERS,
      body: JSON.stringify({ students: allProgress }),
    };
  }

  return { statusCode: 405, headers: HEADERS, body: JSON.stringify({ error: "Method not allowed" }) };
};
