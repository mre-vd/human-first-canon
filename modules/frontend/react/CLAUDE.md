# CLAUDE.md — React & Web Standards

## Code style

- React components should be clean and a pleasure to read.
- Do not leave comments in code. The code should be self-explanatory.
- Use a function declaration for components. Use arrow functions for everything else.
- Don't `export` things that aren't consumed outside the file.

## No inline objects/arrays/functions in the render method

Do not create objects, arrays, or functions inline in a React component's render method. Hoist static values to module-level constants.

## Project organization (Front end)

- A screen or reusable component lives in its own folder: `<Name>.tsx` + `index.ts` + a styles module + `components/` + `hooks/`.
- Reusable UI used in 3+ places gets promoted to a shared `components/<name>/`.
- Navigation routes are registered in one central place.
- Genuinely cross-screen global state goes in a small global store; single-screen state stays in the screen.

## Component / UI conventions

- **Host vs simple UI.** A simple UI component renders one thing. Hosts orchestrate state.
- **Props type.** `interface Props` at the top of the component.
- **Hooks know nothing about the host.** A hook does one thing named after itself.
- **SVG icons** live in module-level constants at the bottom of the component.
- **Handler naming:** `{meaning}{event}Handler` — `registrationPressHandler`.

## Async data — three states

Any component that reads async data MUST handle three states:

1. **No data yet** (`!data`) — loader / skeleton.
2. **Error** — visible error UI with a retry path.
3. **Data loaded** — normal render.

## No dead-end screens — back must always work

A user must NEVER end up stuck on a screen they can't leave. Every render branch MUST contain a back affordance.

## Auth rejections must clear the session and bounce to login

When the backend signals that the caller's session is invalid, the client MUST drop the session locally **and** redirect to login.

## Rules of Hooks

Never call a hook inside a condition, loop, or **after an early `return`**. All hook calls must happen at the top of the component.

## useEffect

- Include every used identifier in the dep array.
- Return a cleanup function if needed.
- Don't put `async` directly on the effect body.

## useMemo / useCallback

Don't memoize by default. Use only when the value goes into another hook's dep array or a `React.memo` child needs a stable prop.

## Data client (cache + fetching)

- Mutations that affect another query MUST refetch it.
- fetchPolicy: default `cache-first`.

## Component data depth (Law of Demeter)

A component should consume data **one level deep**. Derive required flags in the host component and pass them down.

## Handler side effects must match the name (Least Astonishment)

A handler should do **only** what its name implies. Extract teardown/cleanup logic into dedicated functions.

## i18n

- No user-facing strings in JSX. Always `t('key')`.
- Keys mirror the screen path: `find.proposalEmpty`.
- A key added in one locale file MUST be added to every other locale file.
