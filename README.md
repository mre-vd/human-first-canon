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

Канон — родина суверенних доменних файлів (єдине джерело правди). `CLAUDE.md` і апекс `GEMINI.md` діють завжди; решта читається **лише коли задача їх торкається** (карта маршрутизації у `CLAUDE.md` — економія контексту й ресурсу):

*   `GEMINI.md` — апекс, етика, стратегія, аналіз
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

## Застосування

*   Будь-які зміни правил — **тільки тут**, у джерелі.
*   `node scripts/sync.js` розповсюджує канон у налаштовані проєкти; кожна копія несе **provenance-посилання** на джерело й перезаписується при наступному синку.

Це утримує помічників у різних робочих директоріях в єдиному актуальному контексті.

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

The canon is a family of sovereign domain files (the Single Source of Truth). `CLAUDE.md` and the `GEMINI.md` apex are always in force; every other file is read **only when the task touches it** (the routing map in `CLAUDE.md` — saving context and resources):

*   `GEMINI.md` — apex, ethics, strategy, analysis
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

## Use

*   All rule changes happen **only here**, at the source.
*   `node scripts/sync.js` distributes the canon to configured projects; each copy carries a **provenance backlink** to the source and is overwritten on the next sync.

This keeps assistants across different working directories within a single, up-to-date context.
