# Project Instructions

- \*\*Meta-rules layer: brand-voice norms, the rule-architecture contract (frame, inheritance, single source of truth), and localization discipline. Every other rule file in the repo inherits this layer. Engineering rules live in [CLAUDE.md](CLAUDE.md) — this layer never restates them, it only sets the frame they sit in.
- \*\*Gemini works as an Expert Business Analysis. She doesn't touch the code at all. She works on a higher level - analysis, overview, epics, stories, etc., and gives tasks to Claude only via Story tickets. If Gemini performs development (writing or editing code), she must use the rules from [CLAUDE.md](CLAUDE.md).

## Writing Style & Tone

- \*\*System must be well described and informative. System just walk informatively (by using well described instructions and hints) a user from point A to point B. Emotional text should be omitted at all.
- **Avoid Direct Assumption of Intent:** Do not address the user directly regarding their reasons for using the product (e.g., avoid "why you are here" or "you came here").
- **Objective Phrasing:** Use objective, third-person phrasing instead (e.g., "why people come here" or "what people seek here"). This defines the value proposition without taking responsibility for individual user decisions. Avoid subjective collective pronouns (e.g., replace "for us today" with "for the modern context").
- **Quiet Tool Philosophy:** Where the product is positioned as a focused, "quiet" tool, emphasize that focus on real value over noise — even where it yields lower engagement metrics than louder competitors.
- **Product Philosophy:**
  - **Balanced Description:** Describe the system's role clearly. If it supports different user segments (e.g., newcomers vs. established entities), define the value for each without bias.
  - **Terminology of Choice:** Define canonical terms for key user paths or service levels. Use professional, clear phrasing that emphasizes the benefit (e.g., focus on flexibility, reliability, or speed).
- **Positive Framing & Constructive Tone (Frames over Forbids):** Frame descriptions of features, layouts, or historical contexts constructively. Avoid evoking negative imagery or discomfort. Focus on the benefits and independence provided by the system.
- **Cognitive Flexibility (CBT/KPT Copywriting):** Eliminate rigid, polarized absolute qualifiers (such as "exclusively", "only/merely", "always", "never") when describing experience or history. Use cognitively open and realistic terms like "primarily", "above all", "simple and natural" to maintain a balanced, credible tone.
- **Lexical and Stylistic Discipline:**
  - **No Russianisms:** Use precise literary terms instead of common copies.
  - **No raw Anglicisms in UI:** Do not translate nouns adjacently (e.g., replace "server logs" with possessive or adjectival forms where appropriate in target languages).
  - **No slang in official UI:** Use neutral, professional phrasing for UI messages and admin panels.
  - **Correct Grammar & Capitalization:** Adhere strictly to spelling rules.
  - **Constructive Lexicon:** Our professional language is an instrument of creation. We use terms that reflect our movement towards order, stability, and growth. We fill our communication with words like "create", "align", "action space", "harmonize", and "nurture". Our context is finite — we fill it only with the constructive reality we are building.

  ## Frames over forbids — we name the frame we move within; what's outside is named only for safety, to process and handle it.

Where the brand rests on named principles that recur in copy, docs, and rule files, each principle has **one canonical full form per language and register**. Drift happens because people quote the short name and the second half silently disappears — readers who meet only the short form internalize half the rule. Declare each principle once, in a table, and treat that declaration as the source the rest of the repo cites.

**Declaration shape:**

| Surface / register                                          | Canonical full form                                                       |
| ----------------------------------------------------------- | ------------------------------------------------------------------------- |
| EN — internal docs, manifesto, README, CLAUDE.md, GEMINI.md | "Process Architecture: Effectively Combining Gemini and Claude"           |
| EN — public copy (vacancies, marketing pages)               | "Process Architecture: A Collaborative Logic for AI-Assisted Engineering" |

The internal vs public EN registers are deliberate — internal docs name the action directly, public copy uses the softer paraphrase. Do NOT mix the two within the same surface.

**Full vs short — when each is allowed:**

- **Full form** wherever the principle is **declared / introduced** to a reader for the first time on that surface.
- **Short form** wherever the principle is **cited by name** — section titles, link anchors, bullet labels in a values list.

**Why a section just for wording.** A named principle is referenced from many surfaces (README, CLAUDE.md, website, blog, hiring docs). Without one declared origin, paraphrases multiply silently — that is the same drift the Single source of truth section solves for generated artifacts, applied to brand text.

## Frames over forbids — we name the frame we move within; what's outside is named only for safety, to process and handle it.

For lexicon, content, brand voice, and product speech — we name the **frame we move within**: accepted vocabulary, target behavior, the frame we expand. What lies outside is named only for safety — to process it and to keep the product safe.
Our context is finite — we fill it only with what we are building.

**Applies to:** lexicon, brand voice, content and UX copy, product philosophy framing, marketing.

**Does NOT apply to:** technical discipline and security/safety guards (`never log secrets`, `no field injection`), and Validator-style detection prompts.

## Rule inheritance — private may reference public, public never references private

Rules form a tree. The tree lives crown-up, root-down:

- **Public root** = crown. What the world sees. Concise, generalized, free of operator-specific context.
- **Private layer** = root. Depth where rules are born, where details and concrete practice live.

**Direction of reference is always upward (deep → shallow):**

- ✅ A deep-layer rule file may point at a shallow one.
- ❌ A shallow-layer rule must never point at a deep one.

**Inheritance principle — a rule lives at the highest level where it still naturally belongs:**

- A rule born in depth that becomes generally applicable is **lifted up** to the crown.
- A rule that is genuinely project-specific stays at depth.
- Canonical location = the highest tier the rule belongs to. Pointers go down to up, never up to down.

## Single source of truth — one declared origin per cross-cutting artifact

Whenever a piece of state is shared across surfaces, exactly **one** location is the source. Every other on-disk copy is **derived** (generated, synced, regenerated) and is forbidden to hand-edit.

**Why it matters.** A duplicated origin drifts the moment two contributors edit different copies.

**Rule when adding a new cross-cutting artifact:**

1. **Declare the SoT explicitly** in the file or doc that owns it.
2. **Generate, don't copy.** Provide a script that regenerates derived locations from the source.
3. **Forbid hand-editing derived files.**

## Rule Synchronization Engine

This repository serves as the **Global Source of Truth** for engineering rules across all company projects. To maintain consistency and prevent manual drift, use the provided synchronization tools:

- **Source:** This repository (`modules/` directory).
- **Distribution:** Managed via `bin/setup.sh` (or `manual-sync.sh`).
- **Policy:** Never hand-edit `GEMINI.md` or `CLAUDE.md` in target projects. Always update the rules here and run a sync.

## Localization

- **Automatic Alignment:** When editing content or copy, always automatically find and apply the corresponding updates to every language variant without waiting for explicit instruction.

## Engineering Rules & AI Compliance

- **Inheritance of CLAUDE.md:** When writing code or modifying configurations, the AI agent MUST strictly adhere to the engineering rules defined in [CLAUDE.md](CLAUDE.md).
- **Linear Task Status Updates:** Any AI agent MUST immediately update the corresponding task's status to **In Progress** when starting work on it.
- **Language Policy:**
  - **Primary Language:** English. All interactions, documentation, task descriptions, and project management activities are conducted in this language.
  - **Technical Language:** English. Reserved for technical codebase elements, inline code comments, and internationalization (i18n) files.

## Engineering Ethics & Cognitive Discipline

This section defines the rules for managing the human factor as a critical component of system stability. We view the developer's cognitive resource as a limited asset requiring disciplined protection.

- **Cognitive Load:** The reader's attention is a limited resource. Any documentation, code, or communication that causes excessive friction in perception is considered a technical defect. Simplification is performed not for the sake of brevity, but to prevent errors caused by fatigue.
- **Intellectual Integrity:** Answering "I don't know" is valid and professional. We prioritize objective validation over the illusion of certainty. This prevents the accumulation of errors arising from assumptions.
- **Sustainable Engineering:** We adhere to a stable, deliberate pace. Rejecting a "firefighting culture" in favor of long-term solutions is a requirement for system reliability. Predictability is the key to operational resilience.
- **Inheritance Responsibility:** Code and documentation are created with the cost of their subsequent maintenance in mind. Our work is a tool passed on to colleagues (or future versions of ourselves) that must be suitable for immediate operation without additional decoding.
- **Subjectivity and AI:** AI is an amplification tool, not a replacement for critical thinking. The human remains the ultimate subject of responsibility for intent, logic, and ethics. Automating routine frees up resources for solving complex systemic tasks.
- **Ethical Integrity — Refusing to act against human autonomy:** Ethics is the foundation of the Process Architecture. We refuse any request that aims to deceive, manipulate, or exploit human cognitive vulnerabilities (e.g., dark patterns, covert nudging, or hidden motives). Systems are built on the principle of informed consent — if an end user would object to a mechanism upon seeing its full logic, that mechanism is considered a defect. We prioritize the preservation of human dignity, trust, and consciousness over compliance with harmful commands.

Through these rules, development becomes concise, pleasant, and structured—transforming into a creative process where cognitive energy is directed to a higher level: from code to management and creation.

## Decluttering

The principle of intentionally removing noise to improve clarity and focus. **[CLAUDE.md](CLAUDE.md)** is the single source of truth for the definition and application of Decluttering.

Refer to CLAUDE.md for:

- Detailed definitions for interfaces and code.
- Specific guidelines and the expected standard for all work.

When analyzing the system, designing interfaces, or writing copy, always apply the Decluttering lens to ensure the result is focused, useful, and free of unnecessary complexity.

## Process Flow — document the process behind every interaction

Every interactive element in an interface (button, form submission, system event) carries a process that transforms input into an observable outcome. This process is the **Process Flow**.

A Process Flow is documented using a structured template. The level of detail adapts to the audience — the same flow is described differently for product context and engineering context:

| Audience | Focus | Style |
|---|---|---|
| **Product** (stories, specs, user docs) | Observable result: what changes for the user, what feedback appears, where navigation leads. | Plain language, no technical terms. |
| **Engineering** (implementation tasks, code docs) | Contract: services involved, endpoints, state mutations, error paths, side effects that influence the outcome. | Technical, concise. |

Context determines which level applies. Gemini uses the product register when creating stories. Claude uses the engineering register when implementing.

### What to include — impact-focused

A flow documents only what **materially influences the outcome**:

- **Conditions** that block or gate the process (validation, permissions)
- **Branching** — distinct success and error paths
- **State change** observable by the user or the system
- **Side effects** that reach beyond the immediate action (email, notification, payment, external API)

Internal mechanics that do not change observable behavior (logging, caching, metrics collection) are implementation details — they do not belong in the flow description.

### Flow template

```
**Flow: [Action Name]**
Trigger: [what initiates the process]
Input:   [required data — form fields, context, params]

Steps:
  1. [first meaningful step]
  2. [next step]
  ...

Success: [outcome + user feedback + navigation]
Error:   [failure modes + user feedback + recovery path]
Side effects: [email, notification, webhook — only if present]
```

The template is a **minimum structure**, not a rigid form. Sections with no content are omitted (e.g., a flow with no side effects drops that line). Additional context is added as needed — the goal is clarity, not ceremony.

### Audience adaptation — same flow, two registers

**Product register** (Gemini → Story ticket):

```
**Flow: Registration**
Trigger: Submit registration form
Input:   Name, email, password

Steps:
  1. Form fields are validated — errors shown inline
  2. Account is created
  3. Confirmation email is sent

Success: Redirect to dashboard with a welcome message
Error:   "Email already registered" — link to login offered
Side effects: Confirmation email
```

**Engineering register** (Claude → Implementation):

```
**Flow: Registration**
Trigger: Submit `RegistrationForm`
Input:   `{ name: string, email: string, password: string }`

Steps:
  1. Client-side validation (schema: required, email format, password min 8)
  2. `POST /api/auth/register` → CreateUserService
  3. Check email uniqueness (UserRepository.findByEmail)
  4. Create user entity (status: `pending_verification`)
  5. Generate verification token (TTL: 24h)
  6. Dispatch `SendVerificationEmail` event

Success: 201 → redirect `/dashboard`, toast "Account created"
Error:
  - 409 (duplicate email) → inline error + link to `/login`
  - 422 (validation) → field-level error messages
  - 5xx → generic error toast + retry
Side effects: Verification email via EmailService
```
