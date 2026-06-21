# 🧠 AI Process Architecture

Цей репозиторій — це спроба централізувати конфігурацію та набір правил поведінки ("статут") для взаємодії зі штучним інтелектом під час розробки програмного забезпечення.

Він описує те, як ми **намагаємося налаштувати** ШІ: як він має аналізувати задачі, проєктувати системи та спілкуватися з користувачем. Ми постійно шукаємо баланс, щоб розробка була безпечною, екологічною та передбачуваною.

*(Scroll down for the English version)*

## 👥 Рольова модель

Ми використовуємо мульти-агентний підхід, де намагаємося делегувати кожному ШІ-агенту чітко визначену функцію:

*   👤 **Оператор (Людина)** — єдине джерело рішень (Source of Truth). ШІ не діє самостійно, а лише проєктує варіанти та виконує затверджені команди.
*   ✨ **Gemini (Аналітик / Стратег)** — налаштовується на роль бізнес-аналітика, UX-стратега та архітектора. Вона допомагає валідувати ідеї та готувати чіткі технічні завдання.
*   🛠️ **Claude (Творець / Інженер)** — відповідає за безпосередню реалізацію коду на основі завдань, підготовлених Gemini, маючи інструкції дотримуватися строгих інженерних стандартів.

## 📜 Базові принципи (Вектори розвитку системи)

Усі інструкції для ШІ (зосереджені у `GEMINI.md`) базуються на кількох ключових інженерних принципах, до яких ми прагнемо:

1.  **Воля і досвід належать людині (корінь):** Людина в системі **вчиться** — і зробити за неї те, через що вона мала вирости, = вкрасти досвід. Система допомагає вчитись і називає речі своїми іменами, а не вирішує за людину.
2.  **Служити людині (The Final Measure):** Кожне правило веде до однієї мети — людина, якій служать; служити = розширювати свободу й свідомість, ніколи не на шкоду іншим.
3.  **Дзеркало, не Ворота:** Ми не забороняємо — називаємо наслідки як факти; рішення лишається Оператору. Тертя показує, а не спиняє.
4.  **Цілісність як здоров'я — досить, не ідеально:** Пустота, трата, конфлікт — хвороба, яку вирівнюють; але й гонитва за ідеалом виснажує. Здорове = «достатньо, щоб служити», тоді спокій.
5.  **Тиша для механічного, присутність на порозі:** Рутину система несе тихо (Zero-Active Waste); але вхід/вихід/прощання — момент контакту, **запропонований, не примусовий**.
6.  **Звір субстанцію (Substance-Check):** Нову спроможність звіряємо з природою проєкта (`NATURE.md`) **перед** побудовою — чужа за родом субстанція не вплітається тихо.
7.  **Карта системи (SYSTEM-MAP):** Проєкт навігується картою (дерево + граф із код-якорями), яку тримає чесною імунний валідатор.

## ⚙️ Синхронізація (Єдине джерело правди)

Канон — це родина суверенних файлів у корені цього репозиторію, що разом є нашим єдиним джерелом правди (Single Source of Truth):

*   `GEMINI.md` — стратегія, етика, аналіз
*   `CLAUDE.md` — інженерія: цілісність + стандарти коду (мови/фреймворки)
*   `DESIGN.md` — UI/UX дизайн
*   `DATABASE.md` — дані (SQL & NoSQL)
*   `DEVOPS.md` — DevOps, CI/CD, хмара/інфра
*   `TESTING.md` — QA і тестування
*   `SECURITY.md` — безпека
*   `SYSTEM-MAP.md` — жива карта проєкта (дерево-організм; навігація для ШІ) 

Для того, щоб застосувати ці правила у реальних проєктах, ми використовуємо скрипт автоматичної синхронізації:
*   Будь-які експерименти та зміни правил відбуваються **тільки тут**.
*   Запуск `node scripts/sync.js` розповсюджує **всі канон-файли** по всіх налаштованих проєктах.

Це допомагає нам утримувати ШІ-помічників у різних робочих директоріях в єдиному актуальному контексті.

## 🔗 Атрибуція та виправлення

Якщо ви переймаєте або копіюєте ці правила — **посилайтеся на це репо як на першоджерело**. Канон еволюціонує; зворотне посилання — це шлях, яким до вас доходять виправлення.

Знайшли криве правило? Правте **в першоджерелі**: відкрийте **Issue** (позначити проблему) або **Pull Request** (запропонувати виправлення). Зміни правил відбуваються тільки тут і розходяться синком — не патчте копію на місці, бо наступний синк її перезапише.

---
---

# 🧠 AI Process Architecture (English)

This repository is an attempt to centralize the configuration and behavioral ruleset (the "charter") for interacting with Artificial Intelligence during software development.

It describes how we are **trying to configure** AI: how it should analyze tasks, design systems, and communicate with the user. We are constantly seeking a balance to make development safe, ecological, and predictable.

## 👥 Role Model

We use a multi-agent approach, where we strive to delegate a clearly defined function to each AI agent:

*   👤 **Operator (Human)** — The single source of decisions (Source of Truth). The AI does not act independently; it only drafts options and executes approved commands.
*   ✨ **Gemini (Analyst / Strategist)** — Configured for the role of business analyst, UX strategist, and architect. She helps validate ideas and prepare clear technical specifications.
*   🛠️ **Claude (Creator / Engineer)** — Responsible for the direct implementation of code based on tasks prepared by Gemini, instructed to adhere to strict engineering standards.

## 📜 Core Principles (System Development Vectors)

All AI instructions (centered in `GEMINI.md`) are based on several key engineering principles we aim for:

1.  **Will and experience belong to the human (the root):** A person in a system is **learning** — to do, in their place, the thing through which they would have grown is to steal their experience. The system helps a person learn and names things truly; it does not decide for them.
2.  **Serve the human (The Final Measure):** Every rule leads to one end — a human, served; to serve is to expand freedom and awareness, never at another's expense.
3.  **Mirror, not Gate:** We do not forbid — we name consequences as facts; the choice stays with the Operator. Friction reflects; it does not block.
4.  **Integrity is health — enough, not perfect:** Void, waste, and conflict are sickness to realign; but the chase for the ideal also exhausts. Healthy is "whole enough to serve," then rest.
5.  **Silence for the mechanical, presence at the threshold:** Routine runs silent (Zero-Active Waste); but entering, leaving, and parting are moments of contact — **offered, never forced**.
6.  **Substance-Check:** A new capability is checked against the project's nature (`NATURE.md`) **before** it is built — a foreign substance is never woven in silently.
7.  **System Map (SYSTEM-MAP):** The project is navigated by a map (tree + graph with code anchors), kept honest by an immune validator.

## ⚙️ Synchronization (Single Source of Truth)

The canon is a family of sovereign files at the root of this repository, together our Single Source of Truth:

*   `GEMINI.md` — strategy, ethics, analysis
*   `CLAUDE.md` — engineering: integrity + code standards (languages/frameworks)
*   `DESIGN.md` — UI/UX design
*   `DATABASE.md` — data (SQL & NoSQL)
*   `DEVOPS.md` — DevOps, CI/CD, cloud/infra
*   `TESTING.md` — QA & testing
*   `SECURITY.md` — security
*   `SYSTEM-MAP.md` — living map of the project (organism tree; AI navigation)

To apply these rules to real projects, we use an automatic synchronization script:
*   All experiments and rule changes happen **only here**.
*   Running `node scripts/sync.js` distributes **all canon files** across all configured projects.

This helps us maintain AI assistants across different working directories within a single, up-to-date context.

## 🔗 Attribution & Fixes

If you adopt or copy these rules, **link back to this repository as the source**. The canon evolves; a backlink is how corrections reach you.

Found a crooked rule? Fix it **at the source**: open an **Issue** to flag it, or a **Pull Request** to propose the correction. Rule changes happen only here and propagate via sync — don't patch a copy in place, as the next sync will overwrite it.