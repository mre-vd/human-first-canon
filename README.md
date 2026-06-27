# Human-First Canon

Канон для побудови програмних систем, де **людина лишається суверенною**: вона думає й вирішує, а система — це тупий, добре зроблений інструмент, що служить.

Це не «налаштування ШІ», а **статут**: як будувати так, щоб воля й досвід належали людині. ШІ-помічник лише пропонує варіанти й виконує схвалені команди — він **ніколи не вирішує сам**. А системи, які ми будуємо, не «думають»: вони приймають введене, структурують за правилами, зберігають і передають.

*(Scroll down for the English version)*

## Серце (апекс)

*   **Воля й досвід належать людині.** Система допомагає вчитися й називає речі своїми іменами — не проживає життя за людину.
*   **Кінцева міра — людина.** Людина не «користувач», а причина, заради якої система існує.
*   **Дзеркало, не Ворота.** Система називає наслідки як факти й лишає вибір людині — вона не забороняє і не вирішує замість неї.
*   **Система не думає.** Думає лише людина; система тупа до рішень, точна до рутини.
*   **Достатньо, щоб служити — не досконало.** Завершив — і тиша (Операційний Спокій).

## Хто діє

Людина — оператор і єдиний, хто вирішує (Source of Truth). ШІ-помічник пропонує варіанти й виконує схвалене, ніколи не діючи самостійно. Канон керує **кожним агентом**, не лише одним.

## Структура

Канон — родина суверенних доменних файлів (єдине джерело правди). `CLAUDE.md` і апекс `PRINCIPLES.md` діють завжди; решта читається **лише коли задача їх торкається** (карта маршрутизації у `CLAUDE.md` — економія контексту й ресурсу):

*   `PRINCIPLES.md` — апекс, етика, ментальні правила
*   `GEMINI.md` — заглушка-покажчик на `PRINCIPLES.md` (для тих, хто юзає Gemini)
*   `WRITING.md` — текст, тон, копірайт
*   `CLAUDE.md` — інженерія: цілісність + архітектура
*   `STACKS.md` — код-стандарти по стеках (мови/фреймворки)
*   `DESIGN.md` — UI/UX дизайн
*   `DATABASE.md` — дані (SQL & NoSQL)
*   `DEVOPS.md` — DevOps, CI/CD, хмара/інфра
*   `TESTING.md` — QA і тестування
*   `SECURITY.md` — безпека
*   `ANALYSIS.md` — бізнес-аналітика (вимоги, історії, критерії приймання)
*   `AGILE.md` — agile-постачання та Scrum

## Як користуватись

Канон написаний **для Claude** (Claude Code — основний агент): `CLAUDE.md` — його завжди-завантажені інструкції, `PRINCIPLES.md` — апекс-підлога. Хто юзає Gemini — заглушка `GEMINI.md` веде на той самий `PRINCIPLES.md`.

1.  Правиш правила **лише тут**, у джерелі.
2.  Додаєш проєкт у `sync-config.json` (`{ "name", "path" }`; шаблон — `sync-config.example.json`).
3.  `node scripts/sync.js` — розкладає всі канон-файли по налаштованих проєктах (кожна копія з provenance-посиланням; перезаписується наступним синком).
4.  `node scripts/validate.js` — перевіряє цілісність (заголовки майстрів, конфіг).

Синк запускаєш **свідомо**, коли є зміна — жодного фонового крона (це наш *Operational Rest*). У проєкті агент завжди читає `CLAUDE.md` (+ апекс), а доменні файли — лише коли задача їх торкається.

---
---

# Human-First Canon (English)

A canon for building software systems where **the human stays sovereign**: the human thinks and decides, and the system is a dumb, well-made tool that serves.

This is not "AI configuration" but a **charter**: how to build so that will and experience belong to the human. The AI assistant only proposes options and executes approved commands — it **never decides on its own**. And the systems we build do not "think": they take input, structure it by rules, store, and transmit.

## The Heart (the apex)

*   **Will and experience belong to the human.** The system helps a person learn and names things by their true names — it does not live their life for them.
*   **The final measure is the human.** The human is not a "user" but the reason the system exists.
*   **Mirror, not Gate.** The system names consequences as facts and leaves the choice with the human — it never forbids or decides in their place.
*   **The system does not think.** Only the human thinks; the system is dumb to decisions, precise to routine.
*   **Enough to serve, not perfect.** When it is done, it rests (Operational Rest).

## Who Acts

The human is the operator and the only one who decides (Source of Truth). The AI assistant proposes options and executes what is approved, never acting on its own. The canon governs **every agent**, not just one.

## Structure

The canon is a family of sovereign domain files (the Single Source of Truth). `CLAUDE.md` and the `PRINCIPLES.md` apex are always in force; every other file is read **only when the task touches it** (the routing map in `CLAUDE.md` — saving context and resources):

*   `PRINCIPLES.md` — apex, ethics, mental rules
*   `GEMINI.md` — pointer stub to `PRINCIPLES.md` (for those who run Gemini)
*   `WRITING.md` — writing, tone, content
*   `CLAUDE.md` — engineering: integrity + architecture
*   `STACKS.md` — per-stack code standards (languages/frameworks)
*   `DESIGN.md` — UI/UX design
*   `DATABASE.md` — data (SQL & NoSQL)
*   `DEVOPS.md` — DevOps, CI/CD, cloud/infra
*   `TESTING.md` — QA & testing
*   `SECURITY.md` — security
*   `ANALYSIS.md` — business analysis (requirements, stories, acceptance)
*   `AGILE.md` — agile delivery & Scrum

## How to Use

This canon is written **for Claude** (Claude Code — the primary agent): `CLAUDE.md` is its always-loaded instructions, `PRINCIPLES.md` is the apex floor. If you run Gemini, the `GEMINI.md` stub points to the same `PRINCIPLES.md`.

1.  Change rules **only here**, at the source.
2.  Add a project to `sync-config.json` (`{ "name", "path" }`; template: `sync-config.example.json`).
3.  `node scripts/sync.js` — writes all canon files into the configured projects (each copy carries a provenance backlink; overwritten on the next sync).
4.  `node scripts/validate.js` — checks integrity (master headers, config).

Run sync **deliberately**, when something changed — there is no background cron (that is our *Operational Rest*). In a project, the agent always reads `CLAUDE.md` (+ the apex), and pulls domain files only when the task touches them.
