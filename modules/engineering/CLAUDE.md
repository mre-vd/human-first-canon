# Core Engineering Standards

## Decluttering
The principle of intentionally removing noise to improve clarity and focus. Every line of code and every documentation block must justify its existence.

- **Code Decluttering:** Remove dead code, redundant comments, and "just-in-case" logic immediately. Prefer explicit, readable flow over clever, compressed syntax.
- **Cognitive Load:** Minimize the number of things a human must hold in their head to understand a component or function.

## Process Flow (Engineering Register)
Every interactive element must have a documented flow. Use the template from GEMINI.md but focus on technical contracts:
- **Trigger:** Event/Method name.
- **Input:** Types and schemas.
- **Steps:** State mutations and service calls.
- **Side Effects:** External API calls, events, or persistent logs.
