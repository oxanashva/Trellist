# Trellis

Frontend of a full-stack Trello-like project management app built with the MERN stack.

- Backend: https://github.com/oxanashva/trellis-backend
- CI/CD & E2E tests: https://github.com/oxanashva/trellis-infra

**Stack:** React · Redux · Axios · Node.js · Express · MongoDB · Grafana/Loki · GitHub Actions · Render

---

## Features

### Error Handling
Centralised HTTP error handling via an Axios response interceptor and React Error Boundary.

| Trigger | Behaviour |
|---------|-----------|
| 401 Unauthorized | Clears session storage, localStorage, and Redux user state, then redirects to `/auth/login` |
| 403 Forbidden | Shows an error toast; user stays on the current page |
| 404 — board not found | Clears Redux board state, shows toast, redirects to `/workspace` |
| 404 — other resource | Redirects to `/404` (Not Found page) |
| 500 Server Error | Redirects to `/error` (Error page) |
| React runtime error | Caught by `ErrorBoundary`; shows fallback UI with a "Try again" reset button |
