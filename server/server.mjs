// Minimal backend for the Nature-Preserving Audit.
// Holds the Claude key (so the frontend never sees it), opens GitHub PRs for
// canon-improvement suggestions, and serves the static frontend from ../docs.

import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Readable } from "node:stream";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DOCS_DIR = path.join(__dirname, "..", "docs");

const PORT = process.env.PORT || 8080;
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GH_REPO = process.env.GITHUB_REPO || "malkoromanievgenovich/human-first-canon";
const GH_BASE = process.env.GITHUB_BASE || "main";

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

// Reject requests whose Origin is a different host than ours (blocks cross-site
// browser abuse). Not bulletproof — a non-browser client can forge/omit Origin;
// the real cost bound is a spend cap on the Anthropic key. See DEPLOY.md.
function foreignOrigin(req) {
  const origin = req.headers.origin;
  if (!origin) return false; // same-origin fetches may omit it; don't block
  try {
    return new URL(origin).host !== req.headers.host;
  } catch {
    return true;
  }
}

// --- Audit proxy: injects the server-held key, streams the SSE response through. ---
app.post("/api/audit", async (req, res) => {
  if (foreignOrigin(req)) return res.status(403).json({ error: "Заборонене джерело запиту." });
  if (!ANTHROPIC_API_KEY) return res.status(500).json({ error: "Ключ Клода не налаштовано на сервері." });
  if (rateLimited(clientIp(req), 10)) return res.status(429).json({ error: "Забагато запитів. Спробуйте за хвилину." });

  const { system, messages, tools } = req.body || {};
  if (typeof system !== "string" || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Некоректний запит." });
  }
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

// --- GitHub helpers ---
const ghHeaders = () => ({
  authorization: `Bearer ${GITHUB_TOKEN}`,
  accept: "application/vnd.github+json",
  "user-agent": "nature-audit",
  "content-type": "application/json",
});
async function gh(method, p, body) {
  const r = await fetch(`https://api.github.com${p}`, {
    method,
    headers: ghHeaders(),
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(data.message || `GitHub ${r.status}`);
  return data;
}
const b64 = (s) => Buffer.from(s, "utf8").toString("base64");
const unb64 = (s) => Buffer.from(s, "base64").toString("utf8");
const clean = (s, n) => String(s || "").trim().slice(0, n);

// --- Suggestion → Pull Request (author reviews & merges). ---
app.post("/api/suggest", async (req, res) => {
  if (foreignOrigin(req)) return res.status(403).json({ error: "Заборонене джерело запиту." });
  if (!GITHUB_TOKEN) return res.status(500).json({ error: "GitHub не налаштовано на сервері." });
  if (rateLimited(clientIp(req), 5)) return res.status(429).json({ error: "Забагато надсилань. Спробуйте за хвилину." });

  const message = clean(req.body?.message, 8000);
  const context = clean(req.body?.context, 12000);
  if (!message) return res.status(400).json({ error: "Порожнє повідомлення." });

  let contributor = null;
  const c = req.body?.contributor;
  if (c && clean(c.name, 80)) {
    contributor = { name: clean(c.name, 80), company: clean(c.company, 80), link: clean(c.link, 200), at: new Date().toISOString() };
  }

  const id = new Date().toISOString().replace(/[:.]/g, "-") + "-" + Math.random().toString(36).slice(2, 7);
  const branch = `suggest-${id}`;

  try {
    const baseRef = await gh("GET", `/repos/${GH_REPO}/git/ref/heads/${GH_BASE}`);
    await gh("POST", `/repos/${GH_REPO}/git/refs`, { ref: `refs/heads/${branch}`, sha: baseRef.object.sha });

    const md =
      `# Покращення канону\n\n${message}\n` +
      (contributor ? `\n_Запропонував(ла): ${contributor.name}${contributor.company ? `, ${contributor.company}` : ""}_\n` : "") +
      (context ? `\n## Контекст\n\n${context}\n` : "");
    await gh("PUT", `/repos/${GH_REPO}/contents/suggestions/${id}.md`, {
      message: `Покращення канону (${id})`,
      content: b64(md),
      branch,
    });

    if (contributor) {
      let list = [];
      let sha;
      try {
        const cur = await gh("GET", `/repos/${GH_REPO}/contents/contributors.json?ref=${branch}`);
        sha = cur.sha;
        list = JSON.parse(unb64(cur.content));
        if (!Array.isArray(list)) list = [];
      } catch { /* file may not exist yet */ }
      list.push(contributor);
      await gh("PUT", `/repos/${GH_REPO}/contents/contributors.json`, {
        message: `Додати до списку тих, хто покращив канони: ${contributor.name}`,
        content: b64(JSON.stringify(list, null, 2) + "\n"),
        branch,
        ...(sha ? { sha } : {}),
      });
    }

    const pr = await gh("POST", `/repos/${GH_REPO}/pulls`, {
      title: `Покращення канону: ${message.slice(0, 60)}${message.length > 60 ? "…" : ""}`,
      head: branch,
      base: GH_BASE,
      body: md,
    });
    res.json({ ok: true, url: pr.html_url });
  } catch (e) {
    res.status(502).json({ error: "Не вдалося створити PR: " + e.message });
  }
});

// --- Contributors list (read from the repo on the base branch). ---
// Uses the authenticated API when a token is set, so it works whether the repo
// is private or public; falls back to public raw if there's no token.
app.get("/api/contributors", async (_req, res) => {
  try {
    let text;
    if (GITHUB_TOKEN) {
      const f = await gh("GET", `/repos/${GH_REPO}/contents/contributors.json?ref=${GH_BASE}`);
      text = unb64(f.content);
    } else {
      const r = await fetch(`https://raw.githubusercontent.com/${GH_REPO}/${GH_BASE}/contributors.json`, {
        headers: { "user-agent": "nature-audit" },
      });
      if (!r.ok) return res.json([]);
      text = await r.text();
    }
    const list = JSON.parse(text);
    res.json(Array.isArray(list) ? list.slice(0, 500) : []);
  } catch {
    res.json([]);
  }
});

// --- Static frontend ---
app.use(express.static(DOCS_DIR, { extensions: ["html"] }));
app.get("*", (_req, res) => res.sendFile(path.join(DOCS_DIR, "index.html")));

app.listen(PORT, () => console.log(`nature-audit listening on ${PORT}`));
