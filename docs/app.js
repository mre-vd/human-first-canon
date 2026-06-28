"use strict";

/* ----- session-only state (closes with the tab) ----- */
const KEY_STORE = "n*audit*claude*key";
let conversation = []; // step-1 message history (user/assistant)
let productText = ""; // the subject material
let confirmedNature = ""; // locked after "Так, це воно"

const $ = (id) => document.getElementById(id);
const views = ["landing", "keygate", "step1", "step2"];
function show(view) {
  views.forEach((v) => ($(v).hidden = v !== view));
  window.scrollTo(0, 0);
}
const getKey = () => sessionStorage.getItem(KEY_STORE) || "";

/* ----- the operational method (client-side prompts) ----- */
const NATURE_SYSTEM =
  "Ти дивишся на продукт людини й по-людськи описуєш, який він насправді. Простою, теплою, розмовною мовою — " +
  "без термінів, канцеляриту й списків-схем. Скажи: що це за продукт і для кого; який у нього характер і настрій " +
  "(наприклад теплий, грайливий, стриманий, серйозний) — без оцінок, просто як є; у чому його сила і чим він живе. " +
  "Спирайся лише на те, що видно в матеріалі. Не радь, що змінити, не переробляй його під «правильно», не вирішуй " +
  "за людину — просто чесно опиши, який він. Пиши мовою матеріалу. Коротко й живо.";

const AUDIT_SYSTEM =
  "Тепер по-людськи покажи, де цей продукт даремно витрачає сили — час, гроші, увагу, енергію людей, ясність. " +
  "Звертай увагу на: мертві шматки, що нічого не дають; дію, яка марно зʼїдає ресурс; місця, де одне суперечить " +
  "іншому; перекоси, де чогось забагато, а чогось бракує. Про кожне скажи простими словами: де воно, чого коштує, " +
  "і що буде, якщо це підлатати — і чого сама латка коштуватиме. Латай так, щоб продукт лишився собою: не перероблюй " +
  "його характер під чужий шаблон. У кінці окремо назви те, що чіпати не варто — бо саме це робить його собою. " +
  "Не наказуй і не вирішуй за людину — показуй, а вибір лиши їй. Пиши мовою продукту, тепло й розмовно, без термінів.";

/* ----- streaming call to Anthropic (BYO key, direct browser) ----- */
async function streamClaude({ system, messages, onText, onDone, onError }) {
  let res;
  try {
    res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": getKey(),
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-access": "true",
      },
      body: JSON.stringify({
        model: "claude-opus-4-8",
        max_tokens: 8000,
        stream: true,
        system,
        messages,
      }),
    });
  } catch (e) {
    onError("Мережа недоступна: " + e.message);
    return;
  }
  if (!res.ok) {
    let detail = res.status + "";
    try {
      const j = await res.json();
      detail = j.error?.message || detail;
    } catch {}
    onError(res.status === 401 ? "Ключ не прийнято (401). Перевір ключ Клода." : "Помилка API: " + detail);
    return;
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let full = "";
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop();
    for (const raw of lines) {
      const line = raw.trim();
      if (!line.startsWith("data:")) continue;
      const data = line.slice(5).trim();
      if (!data) continue;
      try {
        const ev = JSON.parse(data);
        if (ev.type === "content_block_delta" && ev.delta?.type === "text_delta") {
          full += ev.delta.text;
          onText(full);
        } else if (ev.type === "error") {
          onError(ev.error?.message || "Помилка стріму");
          return;
        }
      } catch {}
    }
  }
  onDone(full);
}

/* ----- fetch the subject: GitHub repo, website URL, or raw pasted text ----- */
async function fetchSubject(input) {
  const t = input.trim();

  // GitHub repo — read metadata + README via the CORS-friendly GitHub API.
  const gh = t.match(/github\.com\/([^/\s]+)\/([^/\s#?]+)/i);
  if (gh) {
    const owner = gh[1];
    const repo = gh[2].replace(/\.git$/, "");
    try {
      const meta = await fetch(`https://api.github.com/repos/${owner}/${repo}`).then((r) =>
        r.ok ? r.json() : null
      );
      let readme = "";
      try {
        const rd = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`, {
          headers: { Accept: "application/vnd.github.raw" },
        });
        if (rd.ok) readme = await rd.text();
      } catch {}
      if (meta || readme) {
        return (
          `GitHub репозиторій: ${owner}/${repo}\n` +
          `Опис: ${(meta && meta.description) || "—"}\n` +
          `Основна мова: ${(meta && meta.language) || "—"}\n\n` +
          `README:\n${readme.slice(0, 9000)}`
        );
      }
    } catch {}
    return t;
  }

  // Any other URL — read the page as text through a public reader (CORS-friendly).
  // The browser cannot fetch arbitrary cross-origin pages directly.
  if (/^https?:\/\//i.test(t)) {
    try {
      const r = await fetch("https://r.jina.ai/" + t);
      if (r.ok) {
        const text = (await r.text()).trim();
        if (text) return `Сайт: ${t}\n\n${text.slice(0, 9000)}`;
      }
    } catch {}
    return t;
  }

  // Plain pasted text.
  return t;
}

/* ----- PDF deliverable: compose a print view, let the browser save it as PDF ----- */
function escapeHtml(s) {
  return String(s).replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
}

function downloadPdf() {
  const audit = $("audit").textContent || "";
  const today = new Date().toLocaleDateString("uk-UA");
  $("report").innerHTML =
    `<h1>Аудит, що зберігає природу продукту</h1>` +
    `<p class="rdate">${today}</p>` +
    `<h2>Який твій продукт</h2><div class="rbody">${escapeHtml(confirmedNature)}</div>` +
    `<h2>Що варто підлатати</h2><div class="rbody">${escapeHtml(audit)}</div>`;
  window.print();
}

/* ----- flow ----- */
function startFlow() {
  show(getKey() ? "step1" : "keygate");
}

function saveKey() {
  const v = $("key").value.trim();
  const err = $("keyerr");
  if (!v.startsWith("sk-")) {
    err.textContent = "Це не схоже на ключ Клода (має починатися з sk-…).";
    err.hidden = false;
    return;
  }
  sessionStorage.setItem(KEY_STORE, v);
  err.hidden = true;
  show("step1");
}

async function analyze() {
  const input = $("subject").value.trim();
  if (!input) return;
  const btn = document.querySelector('[data-go="analyze"]');
  btn.disabled = true;
  btn.textContent = "Читаю продукт…";

  productText = await fetchSubject(input);
  conversation = [
    {
      role: "user",
      content: `ОСЬ ПРОДУКТ:\n\n${productText}\n\nОпиши простими словами, який він.`,
    },
  ];

  $("portraitBox").hidden = false;
  $("refineBox").hidden = true;
  const out = $("portrait");
  out.textContent = "";
  btn.textContent = "Думаю…";

  await streamClaude({
    system: NATURE_SYSTEM,
    messages: conversation,
    onText: (full) => (out.textContent = full),
    onError: (msg) => {
      out.textContent = "⚠ " + msg;
      btn.disabled = false;
      btn.textContent = "Подивитися";
    },
    onDone: (full) => {
      conversation.push({ role: "assistant", content: full });
      $("refineBox").hidden = false;
      btn.disabled = false;
      btn.textContent = "Подивитися ще раз";
    },
  });
}

async function refine() {
  const v = $("refine").value.trim();
  if (!v) return;
  const btn = document.querySelector('[data-go="refine"]');
  btn.disabled = true;
  conversation.push({ role: "user", content: v });
  $("refine").value = "";
  const out = $("portrait");
  out.textContent = "";

  await streamClaude({
    system: NATURE_SYSTEM,
    messages: conversation,
    onText: (full) => (out.textContent = full),
    onError: (msg) => {
      out.textContent = "⚠ " + msg;
      btn.disabled = false;
    },
    onDone: (full) => {
      conversation.push({ role: "assistant", content: full });
      btn.disabled = false;
    },
  });
}

async function confirmNature() {
  confirmedNature = $("portrait").textContent;
  show("step2");
  const out = $("audit");
  out.textContent = "";
  await streamClaude({
    system: AUDIT_SYSTEM,
    messages: [
      {
        role: "user",
        content:
          `ЯКИЙ ПРОДУКТ (підтвердив автор):\n\n${confirmedNature}\n\n` +
          `ОСЬ ПРОДУКТ:\n\n${productText}\n\nПокажи простими словами, де він даремно втрачає сили.`,
      },
    ],
    onText: (full) => (out.textContent = full),
    onError: (msg) => (out.textContent = "⚠ " + msg),
    onDone: () => ($("auditDone").hidden = false),
  });
}

function restart() {
  conversation = [];
  productText = "";
  confirmedNature = "";
  $("subject").value = "";
  $("portrait").textContent = "";
  $("audit").textContent = "";
  $("portraitBox").hidden = true;
  $("auditDone").hidden = true;
  show("step1");
}

/* ----- wiring ----- */
document.addEventListener("click", (e) => {
  const go = e.target.closest("[data-go]");
  if (!go) return;
  switch (go.dataset.go) {
    case "start": startFlow(); break;
    case "savekey": saveKey(); break;
    case "back-landing": show("landing"); break;
    case "analyze": analyze(); break;
    case "refine": refine(); break;
    case "confirm": confirmNature(); break;
    case "pdf": downloadPdf(); break;
    case "restart": restart(); break;
  }
});
