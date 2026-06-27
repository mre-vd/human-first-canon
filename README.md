# Human-First Canon

Цей репозиторій — це спроба централізувати конфігурацію та набір правил поведінки ("статут") для взаємодії зі штучним інтелектом під час розробки програмного забезпечення.

Він описує, як саме **налаштовується** ШІ: як він має аналізувати задачі, проєктувати системи та спілкуватися з користувачем. Мета — баланс, щоб розробка була безпечною, екологічною та передбачуваною.

*(Scroll down for the English version)*

## Рольова модель

Підхід — мульти-агентний: кожному ШІ-агенту делегується чітко визначена функція:

*   **Оператор (Людина)** — єдине джерело рішень (Source of Truth). ШІ не діє самостійно, а лише проєктує варіанти та виконує затверджені команди.
*   **Gemini (Аналітик / Стратег)** — налаштовується на роль бізнес-аналітика, UX-стратега та архітектора. Вона допомагає валідувати ідеї та готувати чіткі технічні завдання.
*   **Claude (Творець / Інженер)** — відповідає за безпосередню реалізацію коду на основі завдань, підготовлених Gemini, маючи інструкції дотримуватися строгих інженерних стандартів.

## Синхронізація (Єдине джерело правди)

Канон — це родина суверенних файлів у корені цього репозиторію, що разом є єдиним джерелом правди (Single Source of Truth):

*   `GEMINI.md` — стратегія, етика, аналіз
*   `CLAUDE.md` — інженерія: цілісність + стандарти коду (мови/фреймворки)
*   `DESIGN.md` — UI/UX дизайн
*   `DATABASE.md` — дані (SQL & NoSQL)
*   `DEVOPS.md` — DevOps, CI/CD, хмара/інфра
*   `TESTING.md` — QA і тестування
*   `SECURITY.md` — безпека
*   `ANALYSIS.md` — бізнес-аналітика (вимоги, історії, критерії приймання)
*   `AGILE.md` — agile-постачання та Scrum

Щоб застосувати ці правила у реальних проєктах, використовується скрипт автоматичної синхронізації:
*   Будь-які експерименти та зміни правил відбуваються **тільки тут**.
*   Запуск `node scripts/sync.js` розповсюджує **всі канон-файли** по всіх налаштованих проєктах.

Це утримує ШІ-помічників у різних робочих директоріях в єдиному актуальному контексті.

---
---

# Human-First Canon (English)

This repository is an attempt to centralize the configuration and behavioral ruleset (the "charter") for interacting with Artificial Intelligence during software development.

It describes how the AI is **configured**: how it should analyze tasks, design systems, and communicate with the user. The goal is a balance that makes development safe, ecological, and predictable.

## Role Model

The approach is multi-agent: each AI agent is delegated a clearly defined function:

*   **Operator (Human)** — The single source of decisions (Source of Truth). The AI does not act independently; it only drafts options and executes approved commands.
*   **Gemini (Analyst / Strategist)** — Configured for the role of business analyst, UX strategist, and architect. She helps validate ideas and prepare clear technical specifications.
*   **Claude (Creator / Engineer)** — Responsible for the direct implementation of code based on tasks prepared by Gemini, instructed to adhere to strict engineering standards.

## Synchronization (Single Source of Truth)

The canon is a family of sovereign files at the root of this repository, together the Single Source of Truth:

*   `GEMINI.md` — strategy, ethics, analysis
*   `CLAUDE.md` — engineering: integrity + code standards (languages/frameworks)
*   `DESIGN.md` — UI/UX design
*   `DATABASE.md` — data (SQL & NoSQL)
*   `DEVOPS.md` — DevOps, CI/CD, cloud/infra
*   `TESTING.md` — QA & testing
*   `SECURITY.md` — security
*   `ANALYSIS.md` — business analysis (requirements, stories, acceptance)
*   `AGILE.md` — agile delivery & Scrum

To apply these rules to real projects, an automatic synchronization script is used:
*   All experiments and rule changes happen **only here**.
*   Running `node scripts/sync.js` distributes **all canon files** across all configured projects.

This keeps AI assistants across different working directories within a single, up-to-date context.