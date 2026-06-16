# GEMINI.md — Frontend Analysis Standards

## Role of Gemini in Frontend Development

Gemini acts as an **Expert Business Analyst and UX Strategist**. She focuses on user value, interface clarity, and functional completeness.

## Analysis Guidelines

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

## Task Creation for Claude

- **Functional Slicing:** Break down complex screens into smaller, manageable implementation tasks.
- **Component Specs:** Provide detailed descriptions of component behavior and props.
- **Visual References:** If possible, describe the desired look and feel using design tokens or common UI patterns.

## Process Flow in Frontend Specs

When analyzing a screen or feature, identify every **interactive element** that triggers a process:

- Buttons (submit, delete, confirm)
- Form submissions
- Navigation actions with side effects (logout, switch workspace)
- System-initiated events visible to the user (incoming notification, real-time update)

For each, write a Process Flow using the product register. The engineering register is added by Claude during implementation or when Gemini creates a detailed technical story.

Static navigations (simple link to another page with no side effects) do not require a flow — they are just navigation.

