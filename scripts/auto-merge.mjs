#!/usr/bin/env node
// Quorum auto-merge — the will stays human, just distributed.
// A suggest-* PR merges itself ONLY when all three hold:
//   1. it touches only canon/data files (the PR guard's rule, re-checked here);
//   2. the nightly forge labelled it `ready` (and not needs-work/reject);
//   3. at least MIN_APPROVALS distinct humans approved it (and none has an
//      outstanding "changes requested").
// At the start, with only you as a reviewer, MIN_APPROVALS=1 means your single
// approval merges it. Add trusted reviewers and raise MIN_APPROVALS, and the
// loop sustains itself without you. No redeploy needed — the site reads the
// canon live. It never merges on its own judgement (Proposer-Approver).

const TOKEN = process.env.GH_TOKEN || process.env.GITHUB_TOKEN;
const REPO = process.env.GH_REPO || process.env.GITHUB_REPO;
const MIN_APPROVALS = Number(process.env.MIN_APPROVALS || 1);

if (!TOKEN || !REPO) { console.error("auto-merge: missing GITHUB_TOKEN / GITHUB_REPO"); process.exit(1); }

const ALLOW = /^([A-Za-z0-9_]+\.md|suggestions\/.+|contributors\.json|funds\.json)$/;
const headers = {
  authorization: `Bearer ${TOKEN}`,
  accept: "application/vnd.github+json",
  "user-agent": "nature-audit-automerge",
  "content-type": "application/json",
};
async function gh(method, p, body) {
  const r = await fetch(`https://api.github.com${p}`, { method, headers, body: body ? JSON.stringify(body) : undefined });
  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(data.message || `GitHub ${r.status} on ${p}`);
  return data;
}

function approvalsOK(reviews, authorLogin) {
  // Latest relevant review state per user; count APPROVED, fail on any CHANGES_REQUESTED.
  const latest = new Map();
  for (const rev of reviews) {
    const u = rev.user?.login;
    if (!u || u === authorLogin || rev.user?.type === "Bot") continue;
    if (rev.state === "APPROVED" || rev.state === "CHANGES_REQUESTED") latest.set(u, rev.state);
  }
  const states = [...latest.values()];
  if (states.includes("CHANGES_REQUESTED")) return false;
  return states.filter((s) => s === "APPROVED").length >= MIN_APPROVALS;
}

async function main() {
  const prs = await gh("GET", `/repos/${REPO}/pulls?state=open&per_page=100`);
  let merged = 0;
  for (const pr of prs) {
    if (!pr.head?.ref?.startsWith("suggest-")) continue;
    const labels = (pr.labels || []).map((l) => l.name);
    if (!labels.includes("ready") || labels.includes("needs-work") || labels.includes("reject")) continue;

    try {
      const files = await gh("GET", `/repos/${REPO}/pulls/${pr.number}/files?per_page=100`);
      if (!files.every((f) => ALLOW.test(f.filename))) {
        console.log(`PR #${pr.number}: touches non-canon files — skip`);
        continue;
      }
      const reviews = await gh("GET", `/repos/${REPO}/pulls/${pr.number}/reviews?per_page=100`);
      if (!approvalsOK(reviews, pr.user?.login)) {
        console.log(`PR #${pr.number}: not enough approvals (need ${MIN_APPROVALS}) — skip`);
        continue;
      }
      await gh("PUT", `/repos/${REPO}/pulls/${pr.number}/merge`, {
        merge_method: "squash",
        commit_title: `${pr.title} (#${pr.number})`,
      });
      await gh("POST", `/repos/${REPO}/issues/${pr.number}/comments`, {
        body: "Змерджено автоматично: пройдено гейт, лейбл `ready`, набрано потрібні людські апруви. Канон оновлено й уже живий.",
      });
      merged++;
      console.log(`PR #${pr.number}: merged`);
    } catch (e) {
      console.error(`PR #${pr.number} failed: ${e.message}`);
    }
  }
  console.log(`auto-merge: merged ${merged} PR(s).`);
}

main().catch((e) => { console.error(e); process.exit(1); });
