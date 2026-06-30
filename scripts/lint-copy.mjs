#!/usr/bin/env node
// lint-copy — a dumb, deterministic guard for operator-facing copy.
// Manifests WRITING.md: No Mind-Ascribing Words, No Self-Claimed Virtue,
// Respectful Address by Default; and DESIGN.md: No Emojis.
//
// Scope: visible copy in docs/index.html (and any files passed as args).
// It does NOT scan the system prompts / model-facing strings in app.js —
// those legitimately address Claude (e.g. «ти»). The judgment-laden part of
// the Nature-Check stays with the human (Routine That Teaches Stays with
// the Human); this only catches the mechanizable, by-rule violations.

import fs from "node:fs";

const targets = process.argv.slice(2);
const files = targets.length ? targets : ["docs/index.html"];

const RULES = [
  {
    rule: "mind-ascribing (приписаний розум/сприйняття)",
    words: [
      "думає", "думаємо", "думаю", "думаєш", "аналізує", "аналізуємо",
      "радить", "раджу", "радимо", "рекомендує", "рекомендуємо",
      "пропонує", "пропонуємо", "дивиться", "дивимось", "дивимося",
      "подивимось", "подивимося",
    ],
  },
  {
    rule: "self-claimed virtue (самопроголошена чеснота)",
    words: ["чесно", "насправді", "правдиво", "правдивий"],
  },
  {
    rule: "informal address (фамільярне звертання)",
    words: [
      "ти", "твій", "твоя", "твоє", "твої", "твого", "твоєму", "твоїм",
      "твоєю", "твоїх", "тобі", "тебе", "тобою",
    ],
  },
];

const WORD_RULE = new Map();
for (const { rule, words } of RULES) for (const w of words) WORD_RULE.set(w, rule);

const EMOJI = /\p{Extended_Pictographic}/u;
const TOKEN_SPLIT = /[^\p{L}ʼ'’]+/u;

const findings = [];
for (const file of files) {
  let text;
  try {
    text = fs.readFileSync(file, "utf8");
  } catch {
    console.error(`[lint] cannot read ${file}`);
    process.exitCode = 1;
    continue;
  }
  const lines = text.split("\n");
  lines.forEach((line, i) => {
    if (EMOJI.test(line)) {
      findings.push({ file, line: i + 1, rule: "emoji (DESIGN.md: No Emojis)", token: line.match(EMOJI)[0] });
    }
    for (const tok of line.split(TOKEN_SPLIT)) {
      if (!tok) continue;
      const rule = WORD_RULE.get(tok.toLowerCase());
      if (rule) findings.push({ file, line: i + 1, rule, token: tok });
    }
  });
}

if (findings.length === 0) {
  console.log("[lint] copy clean — no violations.");
  process.exit(0);
}

console.error("[lint] copy violations:");
for (const f of findings) {
  console.error(`  ${f.file}:${f.line}  ${f.rule}  ->  "${f.token}"`);
}
console.error(`[lint] ${findings.length} violation(s). Fix per WRITING.md / DESIGN.md.`);
process.exit(1);
