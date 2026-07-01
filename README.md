# ai-process-architecture

Набір інженерних стандартів (`.md`-файли) для розробки програмного забезпечення.

*(English below)*

## Файли

**Завжди активні:**
* `PRINCIPLES.md` — наскрізні технічні правила.
* `CLAUDE.md` — стандарт написання коду.

**За потреби:**
* `WRITING.md` — тексти й копірайт.
* `DESIGN.md` — дизайн і UI/UX.
* `STACKS.md` — код по мовах і фреймворках.
* `DATABASE.md` — бази даних.
* `DEVOPS.md` — деплой та інфраструктура.
* `TESTING.md` — тестування.
* `SECURITY.md` — безпека.
* `ANALYSIS.md` — вимоги й аналітика.
* `AGILE.md` — процес розробки.
* `GEMINI.md` — точка входу для Gemini, посилається на `CLAUDE.md`.

## Синхронізація

1. Редагувати правила тільки в цьому репозиторії.
2. Додати проєкт у `sync-config.json` (шаблон: `sync-config.example.json`).
3. Виконати: `node scripts/sync.js`
4. Перевірити: `node scripts/validate.js`

Синхронізація ручна, без фонових процесів.

---

# ai-process-architecture (English)

A set of engineering standards (`.md` files) for software development.

## Files

**Always active:**
* `PRINCIPLES.md` — cross-cutting technical rules.
* `CLAUDE.md` — coding standard.

**Read on demand:**
* `WRITING.md` — copy and content.
* `DESIGN.md` — design and UI/UX.
* `STACKS.md` — per-language/framework code standards.
* `DATABASE.md` — databases.
* `DEVOPS.md` — deployment and infrastructure.
* `TESTING.md` — testing.
* `SECURITY.md` — security.
* `ANALYSIS.md` — requirements and analysis.
* `AGILE.md` — delivery process.
* `GEMINI.md` — entry point for Gemini, points to `CLAUDE.md`.

## Sync

1. Edit rules only in this repository.
2. Add the target project to `sync-config.json` (template: `sync-config.example.json`).
3. Run: `node scripts/sync.js`
4. Verify: `node scripts/validate.js`

Sync is manual, no background processes.
