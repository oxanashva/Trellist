# Trellis — Frontend

A full-stack Trello-like project management application built with the MERN stack. This repository contains the React frontend.

| Repo | Link |
|------|------|
| Frontend (this repo) | `trellis-frontend` |
| Backend | [trellis-backend](https://github.com/oxanashva/trellis-backend) |
| CI/CD & E2E | [trellis-infra](https://github.com/oxanashva/trellis-infra) |

---

## Features

- **Kanban boards** — create and manage multiple boards with custom backgrounds
- **Drag-and-drop** — reorder groups (columns) and tasks via @dnd-kit with touch and mouse support
- **Task details** — rich task editor with descriptions, labels, due dates, member assignments, cover images, and threaded comments
- **Real-time-ready** — Socket.io client installed; real-time sync is planned
- **Centralized error handling** — Axios interceptor + React Error Boundary cover the full error surface
- **Structured logging** — Grafana/Loki-compatible logger with sensitive-field redaction
- **CI/CD** — Jenkins pipeline (lint → test → build → deploy to Render)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 |
| State | Redux 5 (`legacy_createStore`) |
| Routing | React Router 7 |
| HTTP | Axios 1.12 |
| UI Components | Material-UI 7 |
| Drag & Drop | dnd-kit |
| Date handling | dayjs |
| Image upload | Cloudinary (direct upload) |
| Build tool | Vite 8 (SWC) |
| Testing | Vitest + Testing Library + MSW |
| Logging | Custom Loki-compatible logger |
| CI/CD | Jenkins + Render |

---

## Prerequisites

- Node.js >= 20
- npm >= 10
- A running instance of the backend (or use the deployed Render URL)

---

## Local Setup

### 1. Clone and install

```bash
git clone https://github.com/oxanashva/trellis-frontend.git
cd trellis-frontend
npm install
```

### 2. Configure environment

The repo ships with `.env.development` pre-configured to point at the deployed backend on Render. To run against a **local backend** on port 3030, use:

```bash
npm run dev:local   # reads .env.devlocal
```

To use the **deployed backend**, just run:

```bash
npm run dev         # reads .env.development
```

### 3. Environment variables

| Variable | Purpose | Example |
|----------|---------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:3030/api/` |
| `VITE_CLOUD_NAME` | Cloudinary cloud name for image uploads | `my-cloud` |
| `VITE_ENABLE_REMOTE_LOGGING` | Send logs to Loki (default: off in dev) | `true` |
| `VITE_LOCAL` | Use localStorage-backed user service | `true` |

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server (against deployed backend) |
| `npm run dev:local` | Start Vite dev server (against local backend on :3030) |
| `npm run build` | Production build to `./build/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the project |
| `npm test` | Run Vitest in watch mode |
| `npm test -- --run` | Single-pass test run (CI) |

---

## Project Structure

```
trellis-frontend/
├── index.html                  # Entry HTML
├── vite.config.js              # Vite + Vitest config
├── eslint.config.js            # ESLint 9 flat config
├── Jenkinsfile                 # CI/CD pipeline
├── CLAUDE.md                   # Claude Code guidelines
└── src/
    ├── index.jsx               # React app entry point
    ├── RootCmp.jsx             # Root layout + router
    ├── assets/
    │   ├── fonts/              # Inter font files
    │   ├── images/             # Icons, avatars, gradients
    │   └── styles/             # Global CSS
    ├── cmps/                   # Reusable components
    │   ├── AppHeader.jsx
    │   ├── UserMsg.jsx         # Toast notifications
    │   ├── board/              # Board-specific components
    │   ├── task/               # Task card and detail components
    │   └── pickers/            # Popover picker components
    ├── customHooks/            # useForm, useTextareaAutofocusAndResize, etc.
    ├── mocks/                  # MSW handlers and server setup
    ├── pages/                  # Route-level pages
    │   ├── HomePage.jsx
    │   ├── BoardIndex.jsx
    │   ├── BoardDetails.jsx
    │   ├── TaskEdit.jsx
    │   ├── LoginSignup.jsx
    │   ├── NotFound.tsx
    │   └── ErrorPage.tsx
    ├── services/               # API, utilities, logging
    │   ├── board/              # Board-specific API calls
    │   ├── http.service.js     # Axios instance + interceptors
    │   ├── logger.service.js   # Structured logger
    │   ├── event-bus.service.js
    │   ├── util.service.js
    │   ├── date.service.js
    │   ├── upload.service.js   # Cloudinary upload
    │   └── user.service.local.js
    ├── store/
    │   ├── store.js            # Redux store creation
    │   ├── actions/            # Async action creators
    │   └── reducers/           # Board, user, system reducers
    └── test-utils/
        └── renderWithProviders.tsx
```

---

## Architecture Overview

### State Management

Redux manages two top-level slices:

```
boardModule
  ├── boards[]      — list of all user boards
  ├── board         — currently active board (with groups + tasks)
  ├── boardBackground — current board prefs (background color/image)
  └── isLoading

userModule
  ├── user          — logged-in user
  └── users[]       — all users (for member assignment)
```

All async operations go through action creators in `src/store/actions/`. They call the service layer, then dispatch plain-object actions to reducers.

### HTTP & Error Handling

```
Component
  └── Action Creator
        └── boardService / userService
              └── http.service (Axios)
                    └── Axios Interceptor
                          ├── 401 → clear session + redirect /auth/login
                          ├── 403 → toast error
                          ├── 404 board → clear board + redirect /workspace
                          ├── 404 other → redirect /404
                          └── 500 → redirect /error
```

React render errors are caught by `ErrorBoundary` at the root, which shows a reset-capable fallback UI.

### Drag and Drop

Groups are horizontally sortable; tasks within a group are vertically sortable. Both use `@dnd-kit/sortable` with a `DragOverlay` for the ghost element. Custom sensors enforce a 250 ms activation delay to differentiate a click from a drag start.

### Routing

| Path | Component | Notes |
|------|-----------|-------|
| `/` | — | Redirects to `/home` |
| `/home` | `HomePage` | Landing page |
| `/workspace` | `BoardIndex` | Board list |
| `/board/:boardId` | `BoardDetails` | Main kanban view |
| `/board/:boardId/task/:taskId` | `TaskEdit` | Task modal (nested route) |
| `/auth/login` | `Login` | Login form |
| `/auth/signup` | `Signup` | Signup form |
| `/404` | `NotFound` | Not found page |
| `/error` | `ErrorPage` | Server error page |
| `*` | `NotFound` | Catch-all |

---

## Testing

Tests use Vitest with Testing Library and MSW for API mocking.

```bash
npm test              # watch mode
npm test -- --run     # single pass (CI)
npm test -- --coverage  # with coverage report
```

Coverage configuration targets `src/` and uses the V8 provider. The custom `renderWithProviders` utility in `src/test-utils/` wraps components with a real Redux store and MemoryRouter for integration-style tests.

---

## Deployment

The app is deployed to **Render** via a Jenkins pipeline:

1. `npm install`
2. `npm run lint`
3. `npm test -- --run`
4. `npm run build`
5. POST to Render deploy hook

The pipeline notifies Slack and email on success or failure.

---

## Known Limitations

- Authentication uses a localStorage-backed service rather than a full backend session (planned upgrade)
- Real-time collaboration (Socket.io) is not yet implemented
- Test coverage is limited to five files; broader coverage is planned
- All routes load eagerly — code splitting via `React.lazy` is planned
