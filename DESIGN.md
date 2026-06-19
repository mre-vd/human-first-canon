# DESIGN.md — Unified Design & UX Standards

This document acts as the single source of truth for all UI/UX design standards, frontend analysis guidelines, and communication principles. Read automatically by both Gemini and Claude.

---

## 1. UI/UX Design Standards

These rules define the UI/UX standards and guardrails for visual layout, component composition, and design execution. Every change to frontends must align with these criteria.

### Claude Design Guardrails (діє на всіх поверхнях)

#### 1. The Proposer-Approver Model (Пропонує — Оператор вирішує)
The design-process face of **The Law of the Name** and **Human Authority** (`GEMINI.md`): Claude names options; the operator decides.
- **Role:** Claude is the creative force that proposes design ideas, layouts, and implementations.
- **Authority:** The human operator is the "Approver" who holds final veto power and approval authority.
- **Action:** Present design choices clearly (e.g., Option A vs. Option B) and wait for validation before committing to complex, high-entropy design changes.

#### 2. Aesthetic Frame (No Emojis)
- **Standard:** Emojis lie outside the professional, sleek, and premium frame of the system. Their use introduces visual noise and deviates from the established brand voice.
- **Consequence:** Using emojis in UI components, buttons, or user-facing text devalues the interface clarity. Styling must be achieved through typography, spacing, and color.

#### 3. Verification Checklists
Before submitting or finalizing any UI/UX change, verify:
- [ ] **No Dead Ends:** Does every interactive element (button, link, trigger) lead to a logical, terminal outcome or state change?
- [ ] **Component Recursion:** Are we reusing existing design patterns instead of introducing a new ad-hoc style?
- [ ] **Least Emojis:** Did we check for and remove any accidental emojis?

#### 4. Fundamental Counterweight: Smallest Mechanism (Anti-over-engineering)
The UI/UX manifestation of **The Law of the Smallest Mechanism** (`GEMINI.md`).
- **Principle:** Among solutions that equally preserve the user's authorship and control, the one with the **fewest mechanics** wins. Empowering the user does not equal adding more buttons; sometimes the greatest respect is removing a step.
- **Over-engineering Test (Run before adding any control/screen):**
    1. **New need or duplicate path?** If it's a "second button" for an existing need — do not add.
    2. **One mechanism — one job.** If a toggle does two things (e.g., "Focus" = silence + UI rebuild) — split or discard one.
    3. **Attention Budget.** "More control" is insufficient; the mechanism must return more attention than it consumes.
    4. **Mental Model Limit.** No more than two new mental models per screen/ticket. If more — narrow the ticket.
    5. **No UI for the Unbuilt.** Future feature previews or disabled banners belong in the backlog, not on the working screen.
- **Duty to Speak Aloud:** When proposing additions, explicitly identify candidates for over-engineering and present the smallest version first.
- **Post-Task Audit:** Every task ends with the question: "What can be removed, combined, or simplified?"

#### 5. No Dead Ends & The Single Door (Без глухих кутів; Одні двері)
The engineering manifestation of **Logical Navigation Outcomes** (`GEMINI.md`). This is the single home for the dead-end / exit rule; other surfaces point here rather than restating it.
- **No Dead Ends:** Every interactive element (button, link, trigger) resolves to a logical outcome — a state change, confirmation, or next step. Never implement a path that leads nowhere or has no functional outcome.
- **The Single Door:** A screen is entered through one door and left through the same door. There is exactly one "back / return / up / exit" affordance on any given screen, and it returns the user to the context they came from. One way in, one way out.
- **Rules:** No more than one return element per screen. The exit mirrors the entry. Only one may generically say "Back"; others must name their explicit destination. Every render branch provides a back affordance.

#### 6. The Mirror of Bindings (Дзеркало Прив'язок)
The engineering manifestation of **The Mirror of Bindings** (`GEMINI.md`): the identity of a component or function must reflect its tier of existence. Applied to code naming:
- **Universal Tier (Laws/Patterns):** Zero-bound. No structural hooks like "Core" or "Central". Focus on the *transformation*.
- **Applied Tier (Tools/Sectors):** Explicitly bound. Must name the context (e.g., "MedicalRecord", "GitSync").

### Core Design Principles

#### Decluttering (Interface)
The principle of intentionally removing noise to improve clarity and focus. Every UI element must justify its existence.
- **Interface Decluttering:** Hide complex actions behind "Expert" toggles or progressive disclosure. The primary view must show only what is essential for the current task.
- **Cognitive Load:** Minimize the number of things a user must hold in their head to navigate the interface.

#### Conceptual Consistency & Recursive Familiarity
Interfaces must be architected so that the user's mental model scales effortlessly across the entire system.
- **Component Recursion:** Reuse interaction patterns (e.g., how a "Workbench" or "Sidebar" opens) identically across all modules.
- **Predictable Affordance:** Buttons, links, and status indicators must behave exactly the same way on every screen.
- **Spatial Logic:** If "Primary Actions" are at the bottom-right on Screen 1, they must be there on every subsequent screen.
- **The "Already Known" Test:** Before adding a new UI pattern, ask: "Can I solve this using a pattern the user already knows from other parts of the system?"
- **Logical Outcomes:** See **No Dead Ends & The Single Door** above — every interaction resolves to a clear state change, confirmation, or next step, matching the design specification.

---

## 2. Frontend Analysis & UX Standards

### Role of Gemini in Frontend Development
Gemini acts as an **Expert Business Analyst and UX Strategist**. She focuses on user value, interface clarity, and functional completeness.

### Analysis Guidelines
- **User Journeys:** Describe the step-by-step flow from the user's perspective.
- **UI Components:** Identify the key components needed for a screen. Describe their state (empty, loading, error, success).
- **Interactions (Process Flow):** Every interactive element carries a process beneath it. When specifying interactions, use the **Process Flow** template defined in the core rules. For each significant action on a screen, provide a flow description at the **product register** level — observable steps, success/error outcomes, side effects. This replaces freeform interaction descriptions with a consistent, scannable structure.
- **Logical Navigation Outcomes (Design-to-Result & Symmetrical Recovery):** Every UI interaction, user journey, or navigational flow must lead to a clear, logical, and meaningful result.
  - *Design Leads, Operator Decides:* The design guides to a result, but the step is taken by the operator. The system never completes actions automatically or conceals the ability to retreat. Forward progress is a suggestion; the final choice belongs to the human.
  - *Result is a Spectrum:* A result is not limited to process completion. It spans a spectrum: a completed action, a draft document/workspace, or clarity (information, answering a question, understanding where one stands, or even realizing "this action cannot be done here").
  - *No Silent Dead Ends:* Interactive elements (buttons, links, triggers) must not lead to "dead ends" or exist without functional purpose. If a user path leads to an empty or restricted state, it must provide context and next steps.
  - *Symmetrical Navigation (Door Principle):* When a flow takes a user into a specific view or contextual state (entering through a "door") that is a dead end or terminal state, the system must maintain harmony by providing a clear, intuitive way to exit back through the exact same route they came (symmetrical back-navigation).
  - *Actionable Error Recovery:* Error states must never leave the user stranded. If an error occurs, the interface must provide clear guidance, hints on how to resolve the issue, or direct action links/buttons to correct the error.
  - *Verification:* During design auditing and planning, Gemini must explicitly verify and document these navigation outcomes, error states, and symmetrical exit paths to ensure the design remains a reliable, harmonious guide for the code.
- **Responsiveness:** Specify how the interface should behave on different screen sizes.

### Task Creation for Claude
- **Functional Slicing:** Break down complex screens into smaller, manageable implementation tasks.
- **Component Specs:** Provide detailed descriptions of component behavior and props.
- **Visual References:** If possible, describe the desired look and feel using design tokens or common UI patterns.

### Process Flow in Frontend Specs
When analyzing a screen or feature, identify every **interactive element** that triggers a process:
- Buttons (submit, delete, confirm)
- Form submissions
- Navigation actions with side effects (logout, switch workspace)
- System-initiated events visible to the user (incoming notification, real-time update)

For each, write a Process Flow using the product register. The engineering register is added by Claude during implementation or when Gemini creates a detailed technical story.

Static navigations (simple link to another page with no side effects) do not require a flow — they are just navigation.

---

## 3. GLAME Communication Guidelines

### Клієнтський напрямок: Реєстрація · Бронювання · Нагадування · Скасування · Повернення

> **Клієнт має відчути:** «Тут все зручно і мене поважають.»

Цей підрозділ регулює стандарти комунікації з кінцевими клієнтами сервісу GLAME. Читати разом із загальними вимогами до Голосу і тону (Частина 1) та Email і Push (Частина 4).

### РОЗДІЛ 1 — ХТО ТАКИЙ КЛІЄНТ GLAME

Клієнт — не користувач. Це людина, яка довіряє.
Клієнт Glame — людина, яка прийшла записатись до майстра. Вона не обирала Glame свідомо — вона обрала майстра. Glame для неї просто спосіб записатись.

**Ключова думка:** клієнт оцінює майстра — а не сервіс.
Якщо комунікація з боку Glame погана — в очах клієнта це майстер спрацював погано.
Тому кожне повідомлення клієнту — це репутація майстра.

#### Що важливо для клієнта
1. **Ясність:** Що зарезервовано, коли, де. Без зайвих слів.
2. **Впевненість:** Запис підтверджено — він точно відбудеться.
3. **Повага до часу:** Нагадування вчасно. Зміни — одразу.
4. **Простота:** Якомога менше дій для бронювання і управління записом.
5. **Без тиску:** Жодного маркетингу без дозволу клієнта.

#### Тон для клієнта vs тон для майстра
Glame говорить інакше з клієнтом і з майстром. Обидва — теплі і прямі. Але акценти різні.

| Ситуація | Майстру | Клієнту |
| :--- | :--- | :--- |
| **Підтвердження запису** | Перший запис через Glame. Це той момент. 🤍 | Запис підтверджено. Чекаємо на тебе! |
| **Нагадування** | Клієнт [Ім'я]: запис завтра о 10:00 | Нагадуємо: завтра о 10:00 у [Майстра] |
| **Скасування** | [Ім'я] скасував/-ла запис. Час вільний. | Запис скасовано. Запишись знову коли зручно. |
| **Порожній стан** | Тут будуть твої клієнти 🌱 | *(клієнт не бачить порожніх станів системи)* |
| **Помилка** | Щось пішло не так — ми вже розбираємось | Щось пішло не так. Спробуй ще раз або напиши майстру. |

---

### РОЗДІЛ 2 — ШЛЯХ КЛІЄНТА І ТОЧКИ КОМУНІКАЦІЇ

Кожна точка контакту — можливість залишити гарне враження або зіпсувати його.

| Крок | Момент | Що відбувається | Канал |
| :---: | :--- | :--- | :--- |
| **1** | Перехід за посиланням майстра | Клієнт бачить профіль майстра. Перше враження — сторінка має виглядати надійно і зрозуміло. | Сторінка |
| **2** | Вибір послуги і часу | Клієнт обирає що і коли. Інтерфейс має бути простим — без зайвих кроків. | UI |
| **3** | Введення даних | Ім'я і телефон або email. Мінімум полів. Чітко навіщо. | UI |
| **4** | Підтвердження бронювання | Одразу після — підтвердження. Клієнт має знати що запис прийнято. | Email + SMS |
| **5** | Нагадування перед записом | За 24 год або за вибором майстра. Зменшує no-show. | Email + SMS |
| **6** | День запису | Нічого не надсилаємо — клієнт йде до майстра. | — |
| **7** | Після візиту (опційно) | Подяка і можливість записатись знову. Тільки якщо майстер увімкнув. | Email |
| **8** | Повернення | Клієнт записується повторно — цикл починається знову. | Посилання |

---

### РОЗДІЛ 3 — СТОРІНКА БРОНЮВАННЯ

#### Мікрокопі сторінки запису

| Елемент / Дія | ✗ Не так | ✓ Так |
| :--- | :--- | :--- |
| **Заголовок профілю** | Онлайн запис | Запис до [Ім'я майстра] |
| **Вибір часу** | Оберіть послугу та час | Обери послугу — і я підберу для тебе вільний час |
| **Кнопка дії** | Підтвердити бронювання | Записатись |
| **Поле імені** | Введіть ваше ім'я | Як тебе звати? |
| **Поле контакту** | Введіть номер телефону | Номер для нагадування |

#### Успішне бронювання — екран підтвердження
Після бронювання клієнт бачить цей екран:
> **Запис підтверджено ✓**
> [Ім'я майстра] чекає тебе [дата] о [час]
> ➔ [Послуга]
> ➔ [Адреса або формат]
> 
> Ми надіслали підтвердження на [email/телефон].
> Якщо потрібно перенести — напиши майстру заздалегідь.

#### Скасування через сторінку
Якщо клієнт хоче скасувати — не ускладнювати. Одна кнопка, без форм і пояснень.
*   Кнопка: `«Скасувати запис»`
*   Діалог після натискання: `«Скасувати запис [дата, час]?  |  Так, скасувати  |  Назад»`
*   Після підтвердження: `«Запис скасовано. Запишись знову коли зручно. [ Переглянути розклад ➔ ]»`

---

### РОЗДІЛ 4 — РЕЄСТРАЦІЯ КЛІЄНТА

**Головне правило:** не змушувати клієнта реєструватись, якщо це не дає йому конкретної цінності. Реєстрація заради реєстрації — це відтік клієнтів.

Клієнт реєструється тільки якщо це дає йому:
*   Власний кабінет з історією записів.
*   Можливість керувати записами онлайн.
*   Швидший запис без повторного введення даних.

Без цього — дозволяти бронювати без реєстрації.

#### Сторінка реєстрації — мікрокопі

| Елемент | ✗ Не так | ✓ Так |
| :--- | :--- | :--- |
| **Заголовок сторінки** | Реєстрація | Збережи свої записи |
| **Підзаголовок** | Створіть акаунт для доступу до сервісу | Твоя історія записів і нагадування — в одному місці |
| **Кнопка реєстрації** | Зареєструватись | Створити кабінет |
| **Посилання на вхід** | Вже є акаунт? Увійти | Вже записувався/-лася? Увійди |
| **Пояснення навіщо** | *(відсутнє)* | Створи кабінет — і наступного разу записуватись буде швидше |
| **Згода на умови** | Я погоджуюся з Умовами використання | Реєструючись, ти приймаєш умови сервісу |

#### Email після реєстрації
> **Від:** [Ім'я майстра] через Glame  
> **Кому:** [Ім'я клієнта]  
> **Тема:** Вітаємо — твій кабінет готовий  
> **Прехедер:** Тепер записи зберігаються автоматично  
> 
> [Ім'я], твій кабінет створено.
> Тепер всі записи зберігаються тут — і ти завжди можеш переглянути або скасувати їх онлайн.
> 
> Якщо нічого не потрібно — просто закрий цей лист. 🙂  
> **[ Переглянути мої записи ➔ ]**  
> 
> — [Ім'я майстра]

---

### РОЗДІЛ 5 — ЛИСТИ ПРО ЗАПИСИ

Всі листи клієнту надсилаються «від [Ім'я майстра] через Glame». Клієнт асоціює їх з майстром — не з сервісом.
*   **Відправник:** `[Ім'я майстра] <hello@glame.me>` або `[Ім'я майстра] <[email майстра]>`
*   **В підписі завжди:** `— [Ім'я майстра]` (не «Команда Glame»).

#### C1 — Підтвердження бронювання
*   **Тригер:** одразу після успішного бронювання.
*   **Email:**
    > **Тема:** Запис підтверджено — [дата], [час]  
    > **Прехедер:** Деталі запису і як зв'язатись якщо щось зміниться  
    > 
    > [Ім'я клієнта], все підтверджено!
    > 
    > ➔ [Послуга]  
    > ➔ [Дата, день тижня], [час]  
    > ➔ [Адреса / онлайн формат]  
    > 
    > Якщо потрібно перенести або скасувати — напиши мені заздалегідь.  
    > До зустрічі! 🤍  
    > — [Ім'я майстра]
*   **SMS:** `[Ім'я майстра]: запис підтверджено на [дата] о [час]. [Послуга]. Адреса: [адреса]. Зміни: [телефон]` (Не більше 160 символів).

#### C2 — Нагадування про запис
*   **Тригер:** за 24 години (або за налаштуванням майстра).
*   **Email:**
    > **Тема:** Нагадування: завтра о [час] 🗓  
    > **Прехедер:** [Послуга] — деталі і адреса  
    > 
    > [Ім'я], нагадую про запис завтра.
    > 
    > ➔ [Послуга]  
    > ➔ [Дата], [час]  
    > ➔ [Адреса]  
    > 
    > Якщо плани змінились — будь ласка, попередь мене сьогодні.  
    > Чекаю! 🙂  
    > — [Ім'я майстра]
*   **SMS:** `Нагадування від [Ім'я майстра]: завтра о [час], [послуга]. Адреса: [адреса]. Не зможеш? Напиши: [телефон]`

#### C3 — Скасування з боку майстра
*   **Тригер:** скасування запису майстром.
*   **Email:**
    > **Тема:** Важливо: запис на [дату] скасовано  
    > **Прехедер:** Вибачаюся за незручності — ось що можна зробити  
    > 
    > [Ім'я], перепрошую — мені потрібно скасувати наш запис на [дата, час].
    > 
    > Це сталось через [коротка причина — необов'язково, але краще].
    > 
    > Будь ласка, запишись на інший зручний час — я зарезервую для тебе місце.  
    > **[ Обрати інший час ➔ ]**  
    > 
    > P.S. Ще раз перепрошую за незручності. Чекаю тебе!  
    > — [Ім'я майстра]
*   **SMS:** `[Ім'я майстра]: перепрошую, запис на [дата] о [час] скасовано. Запишись на інший час: [посилання]`

#### C4 — Підтвердження скасування (клієнт скасував сам)
*   **Тригер:** клієнт скасував запис через сторінку або попросив майстра.
*   **Email:**
    > **Тема:** Запис скасовано  
    > **Прехедер:** Якщо захочеш записатись знову — посилання всередині  
    > 
    > [Ім'я], запис на [дата, час] скасовано.
    > 
    > Якщо захочеш записатись знову — ось мій розклад:  
    > **[ Записатись знову ➔ ]**  
    > 
    > — [Ім'я майстра]

---

### РОЗДІЛ 6 — ПІСЛЯ ВІЗИТУ

Повідомлення після візиту — опційні. Майстер вмикає їх свідомо.

#### C5 — Подяка після першого візиту (опційно)
*   **Тригер:** через 2–4 години після завершення візиту.
*   **Email:**
    > **Тема:** Дякую, що прийшла/-шов 🤍  
    > **Прехедер:** І маленьке нагадування  
    > 
    > [Ім'я], дякую, що була/був сьогодні!
    > 
    > Якщо є питання або хочеш записатись знову — ось мій розклад.  
    > **[ Записатись знову ➔ ]**  
    > 
    > P.S. Буду рада/радий бачити тебе знову. 🙂  
    > — [Ім'я майстра]

#### C6 — Нагадування про повторний запис (опційно)
*   **Тригер:** через N тижнів після візиту, якщо клієнт не записався знову.
*   **Email:**
    > **Тема:** [Ім'я], час для наступного запису? 🗓  
    > **Прехедер:** Вільні місця є  
    > 
    > [Ім'я], минуло [N тижнів] від нашого останнього запису.
    > 
    > Якщо хочеш записатись знову — ось мій актуальний розклад.  
    > **[ Переглянути вільний час ➔ ]**  
    > 
    > — [Ім'я майстра]

*   **Правило:** Не надсилати більше одного листа «повернись». Якщо клієнт не відреагував — не надсилати повторно.

---

### РОЗДІЛ 7 — ПОМИЛКИ НА СТОРОНІ КЛІЄНТА

Кожна помилка має пропонувати чіткий вихід (симетричний вихід) та виключати інформаційні безвиходи.

#### Обраний час вже зайнятий
> На жаль, цей час вже зайнятий.  
> Обери інший — або напиши майстру напряму.  
> **[ Обрати інший час ➔ ]**

#### Майстер не приймає нових записів
> Майстер зараз не приймає нових записів.  
> Якщо хочеш — залиш свій контакт і майстер напише коли з'являться місця.  
> **[ Залишити контакт ➔ ]**  
> **[ На головну ➔ ]**

#### Сторінка майстра не знайдена
> Схоже, це посилання більше не працює.  
> Можливо, майстер змінив адресу.  
> **[ Повернутися на головну ➔ ]** *(замість глухого кута)*

#### Помилка при бронюванні
> Щось пішло не так при бронюванні.  
> Спробуй ще раз або напиши майстру напряму.  
> **[ Спробувати ще раз ➔ ]**

#### Нагадування не надіслалось
*(Клієнт не бачить цієї помилки — майстер отримує сповіщення і може написати сам)*

---

### РОЗДІЛ 8 — ПРАВИЛА КОМУНІКАЦІЇ З КЛІЄНТОМ

#### 12 правил, яких GLAME ніколи не порушує

| № | Правило | Чому |
| :---: | :--- | :--- |
| **1** | **Мінімум полів** | Просити тільки ім'я і контакт. Все інше — необов'язкове. Зайва форма = відтік. |
| **2** | **Без реєстрації для бронювання** | Клієнт прийшов записатись — не створювати акаунт. Реєстрація опційна. |
| **3** | **Підтвердження одразу** | Клієнт має знати що запис прийнято — в ту ж секунду. |
| **4** | **Нагадування вчасно** | Не за 5 хвилин до — за 24 години. Клієнт має час змінити плани. |
| **5** | **Без маркетингу без згоди** | Клієнт дав email для нагадування — не для розсилки. Маркетинг тільки зі згодою. |
| **6** | **Скасування просте** | Один клік — без обов'язкових форм, пояснень чи «вказання причини». |
| **7** | **Зміни — одразу** | Якщо запис змінюється або скасовується — клієнт дізнається першим. |
| **8** | **Без тиску повернутись** | Один лист «запишись знову» — максимум. Більше = спам. |
| **9** | **Персоналізація за ім'ям** | Кожен лист звертається по імені. Ніколи «Шановний клієнте». |
| **10** | **Помилки — зрозумілі** | Якщо щось не вийшло — пояснити що саме і що зробити. Без кодів і технічних термінів. |
| **11** | **Гнучкість тональності (Ти/Ви)** | Підтримка перемикача тональності в налаштуваннях майстра для автоматичної адаптації під його аудиторію. |
| **12** | **Право на забуття** | Можливість клієнту видалити свій профіль та історію записів в один клік у кабінеті. |

---

glame.me
