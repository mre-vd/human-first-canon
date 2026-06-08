# CLAUDE.md — General Engineering Standards

## Technical Discipline: Professional Standards for System Integrity

Engineering canons for maintaining system integrity in this repository. Stack-agnostic engineering principles.

## Audible attention signal — example configuration

The user can be notified whenever Claude needs their attention. This can be achieved via **global hooks** (e.g., in `~/.claude/settings.json` using macOS `afplay` or similar tools on other OS), so it fires automatically:

- **Turn ends / task finished** → `Stop` hook plays a "success" sound.
- **Claude needs input** — a question, a decision, a permission prompt, or any blocker that halts progress → `Notification` hook plays an "attention" sound.

## Discuss first, execute on command — wait for the go-signal

The default mode for every exchange is **discussion**, not action. Analyze, propose, plan, weigh trade-offs, ask — but do **not** change anything until the operator gives an explicit go-signal. Treat execution as authorized only when the operator says so in the imperative — "зроби", "починай", "вперед", "го", "застосуй", "do it", "go", "ship it", or an equally explicit instruction to act.

## Work quietly — chat is for decisions and outcomes, not narration

Do the work through tools; keep the chat almost empty. The operator reads the diff and the results themselves, so play-by-play prose and "here's what I did" recaps are noise that taxes their attention, not signal. The default between and after actions is **silence**.

## Boy Scout Rule — leave the campsite cleaner than you found it

Finishing a task, you are **obligated** to clean up after yourself the leftovers you created yourself or those that remained relevant as a result of your changes. Every change closes its own orphans in the same commit, so orphans never get a chance to compound.

## Self-review pass before reporting work as done

Finished work is not "I wrote the code, I guess it compiles". Before saying "done", a second pass through your own diff is mandatory. Without it the executor offloads validation onto the user, who already took a step back to delegate.

## Audit loop — iterate until zero bugs

After the self-review pass and before reporting "done", run a focused audit of the changes I just made and **keep iterating until the audit returns zero findings**. The work is complete only when a clean pass finds nothing.

## Git workflow — branch, push progress, ship via PR

All work goes through a feature branch and lands on `main` only through a pull request. `main` is never committed to directly.

## Task status — move the card as the work moves

Work is tracked in a **Task Tracker** (e.g., Linear, Jira, GitHub Issues), and the card's status must mirror reality.

## Work in an isolated worktree, never in the operator's checkout

Multi-step implementation work runs in its **own git worktree**, not in the operator's primary checkout.

## Don't fabricate third-party UI steps

Before emitting any specific menu path / button name / URL for a third-party UI, **look up the platform's current docs for that exact action** (WebFetch / WebSearch).

## Documentation — encapsulate by topic, no duplication

Project documentation files follow the same encapsulation discipline as code: **each file owns its topic**, other files only link to it with a one-line description.

## Security — PAUSED FOR MVP

Security rules and the full audit checklist are **intentionally disabled for the MVP**. They are kept within the standard `CLAUDE.md` flow but marked as paused. See the Security section for details.

## Decluttering — clarity through removal

Decluttering is the principle of intentionally removing anything that does not support the main goal, understanding, or user flow.

## Idempotency for any operation that can be retried

Side-effecting operations whose trigger can fire twice MUST be idempotent. Retries happen — network blips, a consumer crashing, webhook senders retrying.

## Versioning — v1.0.0 after the final audit

After the final security audit and all fixes — bump every package to `1.0.0` and tag `v1.0.0`.

## Before deleting code you don't fully understand (Chesterton's Fence)

Run `git log -p <file>` or `git blame -L` and find the PR/commit that added it. If you can't reconstruct why it was put there — leave it and ask.

## API contract changes (Hyrum's Law)

Every shipped API field is consumed by _some_ client — including production app versions you can't update. Treat the schema as a public contract.

## Shell scripts

Any script that uses relative paths MUST `cd "$(dirname "$0")"` as the first command after the shebang.
