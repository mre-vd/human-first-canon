// Minimal backend for the Nature-Preserving Audit.
// Holds the Claude key (so the frontend never sees it) and emails feedback.
// Serves the static frontend from ../docs, so one Cloud Run service does both.

import express from "express";
import nodemailer from "nodemailer";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Readable } from "node:stream";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DOCS_DIR = path.join(__dirname, "..", "docs");

const PORT = process.env.PORT || 8080;
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;
const FEEDBACK_TO = process.env.FEEDBACK_TO || "roman.malko@gmail.com";

const MODEL = "claude-opus-4-8";
const MAX_TOKENS = 8000;

const app = express();
app.set("trust proxy", true);
app.use(express.json({ limit: "1mb" }));

// Best-effort per-IP rate limit (in-memory; resets per instance — see DEPLOY.md to harden).
const HITS = new Map();
function rateLimited(ip, max, windowMs = 60_000) {
  const now = Date.now();
  const rec = HITS.get(ip);
  if (!rec || now - rec.start > windowMs) {
    HITS.set(ip, { start: now, n: 1 });
    return false;
  }
  rec.n += 1;
  return rec.n > max;
}
const clientIp = (req) =>
  (req.headers["x-forwarded-for"] || "").split(",")[0].trim() || req.ip || "?";

// Audit proxy — injects the server-held key and streams the SSE response through unchanged.
app.post("/api/audit", async (req, res) => {
  if (!ANTHROPIC_API_KEY) return res.status(500).json({ error: "Ключ Клода не налаштовано на сервері." });
  if (rateLimited(clientIp(req), 20)) return res.status(429).json({ error: "Забагато запитів. Спробуйте за хвилину." });

  const { system, messages, tools } = req.body || {};
  if (typeof system !== "string" || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Некоректний запит." });
  }
  // Whitelist tools — only the web_search server tool is allowed through.
  const safeTools = Array.isArray(tools)
    ? tools.filter((t) => t && t.type === "web_search_20260209")
    : [];

  let upstream;
  try {
    upstream = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        stream: true,
        system,
        messages,
        ...(safeTools.length ? { tools: safeTools } : {}),
      }),
    });
  } catch {
    return res.status(502).json({ error: "Клод недоступний." });
  }
  if (!upstream.ok || !upstream.body) {
    const detail = await upstream.text().catch(() => "");
    return res.status(upstream.status).json({ error: detail || "Помилка Клода." });
  }
  res.setHeader("content-type", "text/event-stream");
  res.setHeader("cache-control", "no-cache");
  res.setHeader("x-accel-buffering", "no");
  Readable.fromWeb(upstream.body).pipe(res);
});

// Feedback — emails the authors via Gmail SMTP.
let transport = null;
const mailer = () =>
  (transport ||= nodemailer.createTransport({
    service: "gmail",
    auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
  }));

app.post("/api/feedback", async (req, res) => {
  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) return res.status(500).json({ error: "Пошту не налаштовано на сервері." });
  if (rateLimited(clientIp(req), 5)) return res.status(429).json({ error: "Забагато надсилань. Спробуйте за хвилину." });

  const { message, context } = req.body || {};
  if (typeof message !== "string" || !message.trim()) return res.status(400).json({ error: "Порожнє повідомлення." });

  const body =
    message.slice(0, 8000) +
    (context ? `\n\n--- контекст ---\n${String(context).slice(0, 8000)}` : "");
  try {
    await mailer().sendMail({
      from: GMAIL_USER,
      to: FEEDBACK_TO,
      subject: "Спостереження з аудиту (Nature-Preserving Audit)",
      text: body,
    });
    res.json({ ok: true });
  } catch {
    res.status(502).json({ error: "Не вдалося надіслати." });
  }
});

// Static frontend.
app.use(express.static(DOCS_DIR, { extensions: ["html"] }));
app.get("*", (_req, res) => res.sendFile(path.join(DOCS_DIR, "index.html")));

app.listen(PORT, () => console.log(`nature-audit listening on ${PORT}`));
