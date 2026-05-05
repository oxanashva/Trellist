# CLAUDE.md — Trellis Frontend

This file instructs Claude Code on how to assist with this codebase. Read it before making any changes.

---

## Project Identity

**Trellis** is a full-stack Trello-like project management app built with React 19, Redux, Axios, and Vite. The frontend lives in `trellis-frontend/`. The backend repo is separate (`trellis-backend`). CI/CD and E2E tests live in `trellis-infra`.

---

## Running the Project

```bash
# Against the deployed backend (Render)
npm run dev

# Against a local backend on :3030
npm run dev:local

# Production build
npm run build

# Tests (Vitest)
npm test

# Lint
npm run lint
```

Environment files:
- `.env.development` — points to the Render-hosted backend
- `.env.devlocal` — points to `http://localhost:3030`
- `.env.production` — used by the Vite build

---

## Folder Structure

```
src/
├── assets/           # Fonts, images, global CSS
├── cmps/             # Reusable components (not page-specific)
├── customHooks/      # Custom React hooks
├── mocks/            # MSW handlers and server setup
├── pages/            # Route-level page components
├── services/         # API layer, utilities, event bus, logger
│   └── board/        # Board-specific service files
├── store/
│   ├── actions/      # Async action creators (board, user)
│   └── reducers/     # Redux reducers (board, user, system)
├── test-utils/       # Custom render helpers for tests
└── types/            # (target) TypeScript interfaces
```

Path alias `@/` maps to `./src/` — prefer it over deep relative imports.

---

## Architecture Rules

### State Management
- Redux (currently `legacy_createStore`) manages `boardModule` and `userModule`.
- **Action creators** in `src/store/actions/` dispatch to the store and call the service layer. They import `store` directly (a known anti-pattern targeted for refactor — do not add new action files that follow this pattern if RTK is available).
- Do not add new top-level state slices without discussing the shape first.

### API Layer
- All HTTP calls go through `src/services/http.service.js` which wraps Axios with a base URL and auth cookies.
- Error handling is centralized in the Axios response interceptor — do not add per-component `catch` blocks that duplicate this logic.
- Board service lives in `src/services/board/`. User service is `user.service.local.js` (localStorage-backed; see tech debt note below).

### Error Handling
- HTTP errors → Axios interceptor → toast or redirect
- React render errors → `ErrorBoundary` wrapping the router tree
- App-level toasts → `event-bus.service.js` (`showSuccessMsg`, `showErrorMsg`)
- Do not `alert()` or `console.error()` in component code; use the event bus and logger.

### Logging
- Use `logger` from `src/services/logger.service.js` for all non-trivial log calls.
- `logger.debug/info/warn/error(message, data?)` — data is automatically redacted of sensitive fields.
- Remote logging (Loki) is disabled in development unless `VITE_ENABLE_REMOTE_LOGGING=true`.

### Styling
- Global styles live in `src/assets/styles/main.css`.
- Component-scoped styles are in sibling `.css` files.
- Dynamic values (colors, backgrounds) use inline styles.
- Material-UI is used for modals, popovers, date pickers, and snackbars — avoid adding MUI where plain CSS suffices.
- Do not introduce a new CSS methodology (e.g., CSS Modules, Tailwind) without explicit agreement.

### Drag and Drop
- `@dnd-kit/core` and `@dnd-kit/sortable` power board and task reordering.
- Custom sensors with a 250 ms activation delay separate click from drag intent.
- Do not swap out the DnD library without a full test of all drag interactions.

---

## Conventions

### File Naming
- React components: `PascalCase.jsx` (e.g., `TaskPreview.jsx`)
- TypeScript files: `PascalCase.tsx` for components, `camelCase.ts` for services/utilities
- Services: `kebab-case.service.js` (e.g., `event-bus.service.js`)
- CSS: same name as the component file (e.g., `TaskPreview.css`)

### Code Style
- Functional components only — no class components.
- Prefer named exports over default exports.
- Do not add comments explaining *what* code does; only comment the *why* when non-obvious.
- Keep components under ~200 lines. Files over 300 lines should be split.

### Imports
- Use `@/` alias for `src/` imports (e.g., `import { logger } from '@/services/logger.service'`).
- Group imports: external libraries → internal modules → relative files.

---

## Testing

- Framework: **Vitest** with `@testing-library/react`
- API mocking: **MSW** (`src/mocks/`) — always use MSW for HTTP, never mock modules
- Custom render: `renderWithProviders` in `src/test-utils/renderWithProviders.tsx` — use it for all component tests that need Redux or Router
- Test files live alongside their source files: `ComponentName.test.tsx`
- Run: `npm test` (watch mode) or `npm test -- --run` (CI single pass)

When writing tests:
- Test user-facing behavior, not implementation details
- Use `screen.getByRole` and `screen.getByText` over `getByTestId`
- Prefer integration tests (page-level) over unit tests for UI components

---

## Known Tech Debt (Do Not Worsen)

| Area | Issue |
|------|-------|
| TypeScript | Most files are `.jsx`/`.js` — adding `.tsx`/`.ts` is encouraged |
| Redux | Uses `legacy_createStore`; target is Redux Toolkit (`createSlice`, `createAsyncThunk`) |
| Auth | `user.service.local.js` uses localStorage instead of a real backend session |
| Selectors | No `reselect` memoized selectors — raw `store.getState()` called in actions |
| Dead code | `ReviewEdit`, `ReviewList`, `ReviewPreview` components are unused |
| Socket.io | `socket.service.js` is fully commented out; real-time sync is not implemented |
| Tests | Only 5 test files exist for a large surface area |
| Lazy loading | No `React.lazy` / `Suspense` — all routes load eagerly |

---

## What Claude Should NOT Do

- Do not modify `.env.*` files or commit secrets.
- Do not introduce new global CSS resets without discussing the impact.
- Do not remove the Axios interceptor or Error Boundary — they are load-bearing.
- Do not use `store.dispatch()` or `store.getState()` directly inside React components — use `useDispatch` / `useSelector`.
- Do not add `console.log` in committed code — use `logger.debug`.
- Do not create new placeholder or stub components (e.g., ReviewEdit) without implementing them.
- Do not push to `master` directly — use feature branches and PRs.
