import type { Handler } from "@netlify/functions";
import crypto from "crypto";

// ── helpers ──────────────────────────────────────────────────────────────────

const SECRET = process.env.CAMP_AUTH_SECRET ?? "change-me-in-netlify";
const TOKEN_EXPIRY_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

/** Parse "user1:pass1,user2:pass2" env var into a map */
function parseUsers(): Record<string, string> {
  const raw = process.env.CAMP_USERS ?? "";
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

/** Create a signed token: username|expiry|hmac */
function createToken(username: string): string {
  const expiry = Date.now() + TOKEN_EXPIRY_MS;
  const payload = `${username}|${expiry}`;
  const sig = crypto
    .createHmac("sha256", SECRET)
    .update(payload)
    .digest("hex");
  return Buffer.from(`${payload}|${sig}`).toString("base64url");
}

/** Verify a token — returns username or null */
function verifyToken(token: string): string | null {
  try {
    const decoded = Buffer.from(token, "base64url").toString("utf8");
    const parts = decoded.split("|");
    if (parts.length !== 3) return null;
    const [username, expiryStr, sig] = parts;
    if (Date.now() > parseInt(expiryStr, 10)) return null; // expired
    const expected = crypto
      .createHmac("sha256", SECRET)
      .update(`${username}|${expiryStr}`)
      .digest("hex");
    if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected)))
      return null;
    return username;
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
  // CORS preflight
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
      return {
        statusCode: 400,
        headers: HEADERS,
        body: JSON.stringify({ error: "Username and password are required" }),
      };
    }

    const users = parseUsers();
    const stored = users[username];

    if (!stored || stored !== password) {
      return {
        statusCode: 401,
        headers: HEADERS,
        body: JSON.stringify({ error: "Incorrect username or password" }),
      };
    }

    const token = createToken(username);
    return {
      statusCode: 200,
      headers: HEADERS,
      body: JSON.stringify({ success: true, token, username }),
    };
  }

  // ── VERIFY ──
  if (body.action === "verify") {
    const token = (body.token ?? "").trim();
    const username = verifyToken(token);
    if (!username) {
      return {
        statusCode: 401,
        headers: HEADERS,
        body: JSON.stringify({ valid: false }),
      };
    }
    return {
      statusCode: 200,
      headers: HEADERS,
      body: JSON.stringify({ valid: true, username }),
    };
  }

  return {
    statusCode: 400,
    headers: HEADERS,
    body: JSON.stringify({ error: "Unknown action" }),
  };
};
