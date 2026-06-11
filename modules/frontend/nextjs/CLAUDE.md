# CLAUDE.md — Next.js Engineering Standards

## Technology Stack
- **Framework:** Next.js 16+ (App Router)
- **React:** 19+
- **Language:** TypeScript
- **Styling:** Vanilla CSS / CSS Modules
- **Testing:** Vitest + React Testing Library

## Core Engineering Principles

### Architecture: App Router
- **Server Components (RSC):** Use by default for data fetching and static content.
- **Client Components:** Use sparingly for interactivity (hooks, event listeners). Mark with `'use client'`.
- **Directory Structure:**
  - `app/` - Routing and server-side logic.
  - `components/` - Shared UI components.
  - `service/` - API clients and shared business logic.
  - `hooks/` - Reusable client-side logic.

### Data Fetching
- **Server-side:** Fetch data directly in RSC using `async/await`.
- **Caching:** Leverage Next.js built-in `fetch` cache and `revalidate`.
- **Error Handling:** Use `error.tsx` for route-level error boundaries.

### State Management
- **Server State:** Handled by Next.js navigation and URL params.
- **Client State:** Use React `useState`/`useContext` or specialized hooks. Avoid large global state managers if possible.

### Testing
- **Vitest:** Primary test runner.
- **React Testing Library:** For component testing.
- **Mocks:** Use MSW (Mock Service Worker) for API mocking in tests.
- **Standards:** Test behavior, not implementation. Use accessible queries (e.g., `getByRole`).

## Component Standards
- **CSS Modules:** Use `[ComponentName].module.css` for scoped styling.
- **TypeScript:** Strict typing for props and API responses. No `any`.
- **Performance:** Optimize images using `next/image` and use appropriate loading states (`loading.tsx`).
