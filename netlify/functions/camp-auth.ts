import type { Handler } from "@netlify/functions";
import crypto from "crypto";

// ── helpers ──────────────────────────────────────────────────────────────────

const SECRET = process.env.CAMP_AUTH_SECRET ?? "change-me-in-netlify";
const TOKEN_EXPIRY_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

type Role = "student" | "teacher";

/** Parse "user1:pass1,user2:pass2" env var into a map */
function parseUsers(envVar: string): Record<string, string> {
  const raw = process.env[envVar] ?? "";
  const map: Record<string, string> = {};
  raw.split(",").forEach((pair) => {
    const colonIdx = pair.indexOf(":");
    if (colonIdx === -1) return;
    const username = pair.slice(0, colonIdx).trim().toLowerCase();
    const password = pair.slice(colonIdx + 1).trim();
    if (username && password) map[username] = password;
  });
  return map;
}

/** Create a signed token: username|role|expiry|hmac */
function createToken(username: string, role: Role): string {
  const expiry = Date.now() + TOKEN_EXPIRY_MS;
  const payload = `${username}|${role}|${expiry}`;
  const sig = crypto
    .createHmac("sha256", SECRET)
    .update(payload)
    .digest("hex");
  return Buffer.from(`${payload}|${sig}`).toString("base64url");
}

/** Verify a token — returns { username, role } or null */
function verifyToken(token: string): { username: string; role: Role } | null {
  try {
    const decoded = Buffer.from(token, "base64url").toString("utf8");
    const parts = decoded.split("|");
    if (parts.length !== 4) return null;
    const [username, role, expiryStr, sig] = parts;
    if (Date.now() > parseInt(expiryStr, 10)) return null; // expired
    const expected = crypto
      .createHmac("sha256", SECRET)
      .update(`${username}|${role}|${expiryStr}`)
      .digest("hex");
    if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected)))
      return null;
    return { username, role: role as Role };
  } catch {
    return null;
  }
}

// ── handler ──────────────────────────────────────────────────────────────────

const HEADERS = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
};

export const handler: Handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: HEADERS, body: "" };
  }
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers: HEADERS, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  let body: { action?: string; username?: string; password?: string; token?: string };
  try {
    body = JSON.parse(event.body ?? "{}");
  } catch {
    return { statusCode: 400, headers: HEADERS, body: JSON.stringify({ error: "Invalid JSON" }) };
  }

  // ── LOGIN ──
  if (body.action === "login") {
    const username = (body.username ?? "").trim().toLowerCase();
    const password = (body.password ?? "").trim();

    if (!username || !password) {
      return { statusCode: 400, headers: HEADERS, body: JSON.stringify({ error: "Username and password are required" }) };
    }

    // Check teachers first, then students
    const teachers = parseUsers("CAMP_TEACHERS");
    if (teachers[username] !== undefined) {
      if (teachers[username] !== password) {
        return { statusCode: 401, headers: HEADERS, body: JSON.stringify({ error: "Incorrect username or password" }) };
      }
      const token = createToken(username, "teacher");
      return { statusCode: 200, headers: HEADERS, body: JSON.stringify({ success: true, token, username, role: "teacher" }) };
    }

    const students = parseUsers("CAMP_USERS");
    if (!students[username] || students[username] !== password) {
      return { statusCode: 401, headers: HEADERS, body: JSON.stringify({ error: "Incorrect username or password" }) };
    }

    const token = createToken(username, "student");
    return { statusCode: 200, headers: HEADERS, body: JSON.stringify({ success: true, token, username, role: "student" }) };
  }

  // ── VERIFY ──
  if (body.action === "verify") {
    const token = (body.token ?? "").trim();
    const result = verifyToken(token);
    if (!result) {
      return { statusCode: 401, headers: HEADERS, body: JSON.stringify({ valid: false }) };
    }
    return { statusCode: 200, headers: HEADERS, body: JSON.stringify({ valid: true, username: result.username, role: result.role }) };
  }

  return { statusCode: 400, headers: HEADERS, body: JSON.stringify({ error: "Unknown action" }) };
};
