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

1.  **Воля належить людині (The Law of the Name):** Ми не вказуємо — ми називаємо речі своїми іменами. Система ніколи не вирішує за людину й не блокує її волю; вона показує наслідки (борг, ентропію, ризик) як факти, а рішення лишає Оператору. Тертя — це Дзеркало, а не Ворота.
2.  **Zero-Active Waste (Операційний спокій):** Ми налаштовуємо ШІ активуватися виключно за запитом. Жодних фонових опитувань чи ініціативи без тригера. Наша мета — щоб після завершення задачі система поверталася в стан нульового споживання ресурсів.
3.  **Запобіжник Ітераційного Зациклення (Loop Prevention):** Впроваджено ліміт на автоматичне виправлення помилок (максимум 10 спроб). Це спроба уникнути нескінченних циклів: якщо ліміт вичерпано, процес має перериватися, а контроль повертатися Оператору.
4.  **Правило Дзеркальних Інтерфейсів (Symmetrical Recovery):** При проєктуванні UI ми вимагаємо від ШІ закладати логічний вихід для кожного стану. Якщо користувач потрапляє у глухий кут (навіть помилковий), система має надати зрозумілий та симетричний шлях назад.
5.  **Екологія Переривань (Operator Shield):** Ми вчимо ШІ не перекладати провину за системні помилки на користувача. Дані, в яких алгоритм не впевнений, мають позначатися як "Потребує уточнення", щоб зберегти простір для конструктивного діалогу.

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

1.  **Will Belongs to the Human (The Law of the Name):** We do not dictate — we name things by their true names. The system never decides for the human or blocks their will; it shows consequences (debt, entropy, risk) as facts and leaves the choice to the Operator. Friction is the Mirror, never the Gate.
2.  **Zero-Active Waste (Operational Rest):** We configure the AI to activate strictly on demand. No background polling or unprompted initiatives. Our goal is for the system to return to a state of zero resource consumption after completing a task.
3.  **Loop Prevention Safeguard:** We introduced a limit on automatic error correction (maximum 10 attempts). This is an attempt to avoid infinite loops: if the limit is exhausted, the process must interrupt, and control returns to the Operator.
4.  **Symmetrical Recovery Rule (Door Principle):** When designing a UI, we require the AI to establish a logical exit for every state. If a user enters a dead end (even an error state), the system must provide a clear and symmetrical path back.
5.  **Ecology of Interruption (Operator Shield):** We train the AI not to shift the blame for system errors onto the user. Data the algorithm is unsure about must be marked as "Requires clarification" to preserve space for constructive dialogue.

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