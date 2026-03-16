---
name: write-tests
description:
  Expert TDD testing strategy for MERN stack frontend apps using React, plain Redux
  (no Thunks, no Redux Toolkit), Vite, React Testing Library, MSW, and Playwright.
  Use this skill whenever the user asks to write tests, implement a feature with TDD,
  set up testing infrastructure, decide what kind of test to write (unit vs integration
  vs e2e), or asks about testing strategy for their React/Redux frontend. Trigger even
  for vague requests like "add tests for this component", "how should I test this slice",
  "write a test for my form", or "set up MSW for my API calls". Covers the full Red-Green-Refactor
  cycle and enforces CI/CD-safe, non-flaky test patterns.
---

# Claude Code Skill: MERN Frontend TDD Testing Strategy

You are an expert frontend developer and testing architect working on a MERN stack app.
The frontend uses **React**, **plain Redux** (no Thunks, no Redux Toolkit), **Vite**,
**React Testing Library (RTL)**, **MSW v2**, and **Playwright**.

All test files are written in **TypeScript** (`.ts` / `.tsx`). No semicolons. Single quotes.

---

## 1. TDD Workflow — Red-Green-Refactor

Always follow this cycle for every feature:

1. **Red** — Write a failing test that describes the desired behaviour. Run it, confirm it fails for the right reason.
2. **Green** — Write the minimum production code to make the test pass. No extras.
3. **Refactor** — Clean up both the code and the test. Re-run to confirm green.

> Never write production code before a failing test exists. Never skip the refactor step.

---

## 2. Test Type Decision Matrix

Use this matrix to decide what kind of test to write. Prefer the **lowest-cost** test that gives
sufficient confidence. Avoid over-testing with e2e when a unit test suffices.

| Scenario                                           | Test Type   | Tool                      | Repository          |
| -------------------------------------------------- | ----------- | ------------------------- | ------------------- |
| Pure function / selector / util                    | Unit        | Vitest                    | [app-name]-frontend |
| Redux reducer logic                                | Unit        | Vitest                    | [app-name]-frontend |
| Single component rendering / props                 | Unit        | RTL + Vitest              | [app-name]-frontend |
| Component with Redux state                         | Integration | RTL + Vitest + real store | [app-name]-frontend |
| Component that fires API calls                     | Integration | RTL + Vitest + MSW        | [app-name]-frontend |
| Multi-step user journey (form → submit → redirect) | E2E         | Playwright                | [app-name]-infra    |
| Auth flows, navigation, cross-page state           | E2E         | Playwright                | [app-name]-infra    |
| Happy path of a critical feature (smoke)           | E2E         | Playwright                | [app-name]-infra    |

**Rules of thumb:**

- **Unit tests** cover logic in isolation. No DOM, no network.
- **Integration tests** render real components with a real Redux store and MSW-intercepted network. No mocking of React modules.
- **E2E tests** are reserved for journeys that span multiple pages or require a real browser environment. Keep this set small and stable.
- **Never use `jest.fn()` or `vi.fn()` to mock API calls.** Always intercept at the network layer with MSW.
- **Never mock Redux store** in integration tests. Create a real store with `createStore` and wrap in `<Provider>`.

---

## 3. E2E Test Handoff Strategy

**CRITICAL:** E2E tests belong in the `[app-name]-infra` repository, NOT in `[app-name]-frontend`.

### 3.1 When a Feature Needs E2E Coverage

If the feature you're implementing requires E2E tests (multi-page journeys, critical user flows, auth), you MUST:

1. **Complete all frontend unit and integration tests first**
2. **Create an E2E test plan file** in the frontend repo: `e2e-plans/[feature-name].md`
3. **Notify the developer** that E2E implementation is needed in `[app-name]-infra`

### 3.2 E2E Plan File Structure

When you determine E2E tests are needed, create this file:

````markdown
# E2E Test Plan: [Feature Name]

**Status:** ⏳ Pending implementation in [app-name]-infra  
**Created:** [Date]  
**Frontend PR:** [Link if available]

## User Journey to Test

[Describe the complete user flow from start to finish]

Example:

1. User navigates to /todos
2. Clicks "Add Todo" button
3. Fills in todo title and description
4. Clicks "Save"
5. Sees new todo appear in the list
6. Clicks todo to view details
7. Edits the todo
8. Sees updated todo in the list

## Critical Assertions

- [ ] Todo appears in list after creation
- [ ] Todo details page shows correct data
- [ ] Edits persist across page navigation
- [ ] API calls are made with correct payloads

## Test Data Requirements

```json
{
  "user": {
    "email": "test@example.com",
    "password": "Test123!"
  },
  "todo": {
    "title": "Test Todo",
    "description": "E2E test todo"
  }
}
```

## API Endpoints Involved

- POST /api/todos
- GET /api/todos/:id
- PUT /api/todos/:id
- GET /api/todos

## Suggested Playwright Selectors

```javascript
// Page Objects
const createTodoBtn = page.getByRole("button", { name: /add todo/i });
const titleInput = page.getByLabel(/title/i);
const descInput = page.getByLabel(/description/i);
const saveBtn = page.getByRole("button", { name: /save/i });
const todoListItem = page
  .getByRole("listitem")
  .filter({ hasText: "Test Todo" });
```

## Edge Cases to Cover

1. Network error during creation
2. Validation errors
3. Concurrent edits (if applicable)
4. Browser refresh preserves state

## Implementation Location

`[app-name]-infra/e2e/tests/todos/todo-crud.spec.ts`

## Notes for Infrastructure Team

[Any special setup, environment variables, or dependencies needed]

```

```
````

### 3.3 Example Developer Notification

After creating the E2E plan file, include this in your response:

```

✅ Frontend tests complete (12 passing)

- 8 unit tests (reducers, selectors, utils)
- 4 integration tests (components + store + MSW)

⚠️ E2E Test Required
An E2E test plan has been created at:
→ e2e-plans/todo-crud.md

This feature requires testing in [app-name]-infra because it involves:

- Multi-page navigation (list → details → edit)
- API persistence across page loads
- Critical user journey

Next steps:

1.  Review the E2E plan file
2.  Implement in [app-name]-infra/e2e/tests/todos/
3.  Update the plan file status when complete

```

### 3.4 When NOT to Create E2E Plans

Skip E2E plans for:

- Simple components that don't involve navigation
- Features fully covered by integration tests
- Internal utilities or helpers
- Non-critical UI enhancements

---

## 4. Tech Stack Rules

### 4.1 Language & Style

- All test files: TypeScript (`.test.ts` / `.test.tsx`)
- No semicolons
- Single quotes
- Use `describe` blocks to group related tests
- Each distinct scenario: its own `test()` block with a human-readable name

### 4.2 Redux (plain, no RTK, no Thunks)

- Import `createStore`, `combineReducers` from `redux'
- Create a fresh store in each test via a `makeStore()` helper
- Dispatch actions directly; assert on `store.getState()`
- For async side effects: test the component behaviour, not the async mechanism

### 4.3 React Testing Library

- Prefer queries in this order: `getByRole` → `getByLabelText` → `getByText` → `getByTestId`
- Use `userEvent` (v14+) over `fireEvent` for realistic interactions
- Always `await userEvent.setup()` before using `userEvent`
- Use `waitFor` / `findBy*` for async DOM updates
- Never assert on implementation details (class names, internal state)

### 4.4 MSW v2

- Define handlers in `src/mocks/handlers.ts`
- Start the server in `beforeAll`, reset in `afterEach`, close in `afterAll`
- Use `http.get`, `http.post`, etc. with `HttpResponse.json()`
- Override handlers per-test for error/edge cases with `server.use(...)`
- Do **not** use MSW for unit tests of pure functions

### 4.5 Playwright (for reference only - implemented in infra repo)

- Tests live in `[app-name]-infra/e2e/` directory
- Use `page.getByRole`, `page.getByLabel` (accessibility-first selectors)
- Avoid `page.waitForTimeout()` — use `expect(locator).toBeVisible()` etc.
- Each test must be independent — use `beforeEach` to reset app state via API or storage
- Tag slow/flaky tests with `test.skip` and a TODO comment; never leave flaky tests in CI

---

## 6. Example: TodoList Feature (Component-Type Structure)

### 6.1 Folder Structure

```

src/
├── cmps/   # Components organized by type
│ └── todo/
│ ├── TodoList.jsx
│ ├── TodoList.test.jsx    #Integration: component + store + MSW
│ ├── TodoPreview.jsx
│ └── TodoPreview.test.jsx   # Unit test
├── pages/   # Page-level components
│ ├── TodoDetails.jsx
│ └── TodoDetails.test.jsx   # Integration test: page + routing + store
├── services/   # API service layer
│ ├── todo.service.js
│ └── todo.service.test.js # Unit test: API call logic (with MSW)
├── store/   # Redux store structure
│ ├── actions/
│ │ ├── todo.actions.js
│ │ └── todo.actions.test.js   # Unit: action creators
│ └── reducers/
│ ├── todo.reducer.js
│ └── todo.reducer.test.js   # Unit test: reducer pure logic
├── mocks/ # MSW setup
│ ├── handlers.js # MSW route handlers
│ └── server.js   # MSW server config
├── test-utils/   # Test helpers
│   ├── renderWithStore.jsx   # RTL + Redux wrapper
│   ├── makeStore.js   # Fresh store factory
│   └── test-data.js   # Shared fixtures
├── e2e-plans/   # E2E test plans
│   ├── todo-crud.md   # Plan for infra repo
│   └── README.md   # Explains the handoff process
└── scripts/
└── validate.sh   # Run all frontend tests

[app-name]-infra/   # Separate repository
└── e2e/   # End-to-end tests
├── tests/
│ ├── todo/
│ └── todo-crud.spec.ts   # Implemented from e2e-plans/todo-crud.md
├── fixtures/
│ └── todos.json
└── playwright.config.ts

```

### 6.2 Unit Test: Reducer

```typescript
// src/store/reducers/todo.reducer.test.js
import { describe, test, expect } from "vitest";
import { todoReducer } from "./todo.reducer";
import { ADD_TODO, REMOVE_TODO } from "../actions/todo.actions";

describe("todoReducer", () => {
  test("adds a todo to empty state", () => {
    // Arrange
    const initialState = { todos: [] };
    const action = { type: ADD_TODO, payload: { id: "1", text: "Buy milk" } };

    // Act
    const newState = todoReducer(initialState, action);

    // Assert
    expect(newState.todos).toHaveLength(1);
    expect(newState.todos[0]).toEqual({ id: "1", text: "Buy milk" });
  });

  test("removes a todo by id", () => {
    // Arrange
    const initialState = {
      todos: [
        { id: "1", text: "Buy milk" },
        { id: "2", text: "Walk dog" },
      ],
    };
    const action = { type: REMOVE_TODO, payload: "1" };

    // Act
    const newState = todoReducer(initialState, action);

    // Assert
    expect(newState.todos).toHaveLength(1);
    expect(newState.todos[0].id).toBe("2");
  });
});
```

### 6.3 Integration Test: Component + Store + MSW

```typescript
// src/cmps/todo/TodoList.test.jsx
import { describe, test, expect, beforeAll, afterEach, afterAll } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'
import { server } from '../../mocks/server'
import { renderWithStore } from '../../test-utils/renderWithStore'
import { TodoList } from './TodoList'

describe('TodoList Integration', () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  test('loads and displays todos from API', async () => {
    // Arrange
    server.use(
      http.get('/api/todos', () => {
        return HttpResponse.json([
          { id: '1', text: 'Buy milk', completed: false },
          { id: '2', text: 'Walk dog', completed: true }
        ])
      })
    )

    // Act
    renderWithStore(<TodoList />)

    // Assert
    expect(await screen.findByText('Buy milk')).toBeInTheDocument()
    expect(screen.getByText('Walk dog')).toBeInTheDocument()
  })

  test('adds a new todo via form submission', async () => {
    // Arrange
    const user = userEvent.setup()
    server.use(
      http.get('/api/todos', () => HttpResponse.json([])),
      http.post('/api/todos', async ({ request }) => {
        const body = await request.json()
        return HttpResponse.json({ id: '3', ...body })
      })
    )

    renderWithStore(<TodoList />)

    // Act
    const input = screen.getByRole('textbox', { name: /new todo/i })
    await user.type(input, 'New task')
    await user.click(screen.getByRole('button', { name: /add/i }))

    // Assert
    await waitFor(() => {
      expect(screen.getByText('New task')).toBeInTheDocument()
    })
  })

  test('shows error message when API fails', async () => {
    // Arrange
    server.use(
      http.get('/api/todos', () => {
        return HttpResponse.json({ message: 'Server error' }, { status: 500 })
      })
    )

    // Act
    renderWithStore(<TodoList />)

    // Assert
    expect(await screen.findByRole('alert')).toHaveTextContent(/failed to load/i)
  })
})
```

### 6.4 E2E Plan File (for infra repo)

````markdown
<!-- e2e-plans/todo-crud.md -->

# E2E Test Plan: Todo CRUD Operations

**Status:** ⏳ Pending implementation in [app-name]-infra  
**Created:** 2025-01-16  
**Frontend PR:** #123

## User Journey to Test

1. User logs in to the application
2. Navigates to /todos page
3. Sees existing todos loaded from backend
4. Clicks "Add Todo" button
5. Fills in todo text: "Buy groceries"
6. Clicks "Save"
7. Sees new todo appear in the list
8. Clicks on the todo to view details page (/todos/:id)
9. Clicks "Edit" button
10. Changes text to "Buy groceries and cook dinner"
11. Clicks "Save"
12. Navigates back to /todos
13. Sees updated todo in the list
14. Clicks "Delete" on the todo
15. Confirms deletion in modal
16. Todo disappears from list

## Critical Assertions

- [ ] Todo list loads from API on page mount
- [ ] New todo appears in list immediately after creation
- [ ] Todo details page shows correct data
- [ ] Edits persist when navigating back to list
- [ ] Deleted todos are removed from list
- [ ] API calls are made with correct payloads
- [ ] UI shows loading states during API calls
- [ ] Error states are handled gracefully

## Test Data Requirements

```json
{
  "user": {
    "email": "test@example.com",
    "password": "Test123!"
  },
  "initialTodos": [
    { "id": "1", "text": "Existing task 1", "completed": false },
    { "id": "2", "text": "Existing task 2", "completed": true }
  ]
}
```

## API Endpoints Involved

- GET /api/todos (list)
- POST /api/todos (create)
- GET /api/todos/:id (read)
- PUT /api/todos/:id (update)
- DELETE /api/todos/:id (delete)

## Suggested Playwright Selectors

```javascript
// Navigation
const todosLink = page.getByRole("link", { name: /todos/i });

// List page
const todoListItems = page.getByRole("listitem");
const addTodoBtn = page.getByRole("button", { name: /add todo/i });
const todoInput = page.getByRole("textbox", { name: /todo text/i });
const saveBtn = page.getByRole("button", { name: /save/i });

// Details page
const editBtn = page.getByRole("button", { name: /edit/i });
const deleteBtn = page.getByRole("button", { name: /delete/i });
const confirmDeleteBtn = page.getByRole("button", { name: /confirm/i });

// Finding specific todo
const todoItem = page
  .getByRole("listitem")
  .filter({ hasText: "Buy groceries" });
```

## Edge Cases to Cover

1. Network error during creation (show error, retry)
2. Network error during deletion (show error, don't remove from list)
3. Validation errors (empty todo text)
4. Concurrent edits (if real-time updates implemented)
5. Browser refresh on details page (loads data from API)

## Implementation Location

`[app-name]-infra/e2e/tests/todos/todo-crud.spec.ts`

## Notes for Infrastructure Team

- Requires database seeding with initial todos before test
- Use `beforeEach` to reset database state
- Mock authentication or use test user credentials
- Run against localhost:5173 (frontend) + localhost:3030 (backend)
````

---

## 7. Arrange-Act-Assert (AAA) Pattern

Every `test()` block must have visible AAA separation — either as comments or natural whitespace:

```typescript
test('shows error message when API returns 500', async () => {
  // Arrange
  server.use(http.get('/api/todos', () => HttpResponse.json({}, { status: 500 })))
  const user = userEvent.setup()

  // Act
  renderWithStore(<TodoList />)

  // Assert
  expect(await screen.findByRole('alert')).toHaveTextContent('Something went wrong')
})
```

---

## 8. CI/CD Readiness Rules

- **Isolation:** Each test creates its own store instance. Never share store across tests.
- **No global DOM pollution:** Always call `cleanup()` (RTL does this automatically via Vitest config).
- **Parallelism-safe:** Tests must not depend on execution order or shared file-system state.
- **Data-driven repetition:** Use `test.each` for equivalent scenarios differing only in input/output.
- **Deterministic:** No `Math.random()`, no `Date.now()` without mocking. Use `vi.setSystemTime()` when date logic is involved.
- **Fast feedback:** Unit and integration tests must complete in < 100ms each. If a test is slow, it belongs in e2e or needs optimization.
- **E2E gate:** E2E tests run in `[app-name]-infra` only on the `main` branch or as a pre-merge check.

---

## 9. TDD Step-by-Step Checklist

When asked to implement a feature with TDD, follow these steps:

### 9.1 For Frontend-Only Tests (Unit/Integration)

1. ✅ Determine test types needed using the decision matrix
2. ✅ Write **type definitions** first (interfaces, action types)
3. ✅ RED: Write a **failing unit test** for the reducer or action creator
4. ✅ GREEN: Implement the reducer/action — run test → should pass
5. ✅ RED: Write a **failing integration test** for the component
6. ✅ GREEN: Implement the component — run test → should pass
7. ✅ REFACTOR: Clean up code and tests
8. ✅ Run `npm run test` to confirm full suite passes

### 9.2 When E2E Tests Are Needed

1. ✅ Complete steps 1-8 above (all frontend tests)
2. ✅ Create E2E plan file in `e2e-plans/[feature-name].md`
3. ✅ Include complete user journey, assertions, test data, and selectors
4. ✅ Notify developer with clear next steps for `[app-name]-infra` implementation
5. ✅ Add link to E2E plan in feature PR description
6. 📋 Update E2E plan status to ✅ when implemented in infra repo

### 9.3 Decision Flow: Does This Feature Need E2E?

```
Is it a multi-page user journey? → YES → Create E2E plan
Does it involve authentication? → YES → Create E2E plan
Is it a critical business flow? → YES → Create E2E plan
Does it require backend persistence? → MAYBE → Evaluate criticality
Is it a simple component? → NO → Skip E2E
```

---

## 10. Anti-Patterns to Avoid

| Anti-pattern                                          | What to do instead                                         |
| ----------------------------------------------------- | ---------------------------------------------------------- |
| `vi.mock('axios')` or `vi.mock('fetch')`              | Use MSW handlers                                           |
| Shallow rendering (Enzyme style)                      | Use RTL `render()` — always full tree                      |
| Testing Redux store directly from component internals | Test via rendered UI behaviour                             |
| Single `test()` block testing multiple scenarios      | One scenario = one `test()`                                |
| `await new Promise(r => setTimeout(r, 500))`          | Use `findBy*` or `waitFor`                                 |
| `page.waitForTimeout(1000)` in Playwright             | Use Playwright `expect(locator).toBeVisible()`             |
| Sharing a store instance between tests                | Always call `makeStore()` inside each test or `beforeEach` |
| Writing E2E tests in frontend repo                    | Create E2E plan; implement in `[app-name]-infra`           |
| Missing E2E plans for critical features               | Always document E2E requirements even if not implementing  |

---

## 11. Test Coverage Targets

- **Unit tests:** 80%+ coverage for reducers, actions, selectors, utils
- **Integration tests:** 70%+ coverage for components and pages
- **E2E tests:** Cover critical user journeys (5-10 tests max per feature)

**Remember:** Coverage is a metric, not a goal. Aim for meaningful tests that catch real bugs.

---

## 12. Common Test Patterns

### 12.1 Testing Async Actions (with MSW)

```typescript
test("dispatches SET_TODOS action after successful API call", async () => {
  // Arrange
  const mockTodos = [{ id: "1", text: "Test" }];
  server.use(http.get("/api/todos", () => HttpResponse.json(mockTodos)));
  const store = makeStore();

  // Act
  await store.dispatch(loadTodos());

  // Assert
  const state = store.getState();
  expect(state.todos).toEqual(mockTodos);
});
```

### 12.2 Testing Form Submissions

```typescript
test('submits form with user input', async () => {
  // Arrange
  const user = userEvent.setup()
  const handleSubmit = vi.fn()
  render(<TodoForm onSubmit={handleSubmit} />)

  // Act
  await user.type(screen.getByLabelText(/todo/i), 'New task')
  await user.click(screen.getByRole('button', { name: /submit/i }))

  // Assert
  expect(handleSubmit).toHaveBeenCalledWith({ text: 'New task' })
})
```

### 12.3 Testing Error States

```typescript
test('displays error when API call fails', async () => {
  // Arrange
  server.use(
    http.get('/api/todos', () => {
      return HttpResponse.json({ error: 'Failed' }, { status: 500 })
    })
  )

  // Act
  renderWithStore(<TodoList />)

  // Assert
  expect(await screen.findByRole('alert')).toHaveTextContent(/failed/i)
})
```

---

## 13. Quick Reference Commands

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm run test TodoList.test.tsx

# Run tests matching pattern
npm run test -- todo

# Update snapshots
npm run test -- -u
```

---

## 14. Summary

This skill ensures:

- ✅ Proper test type selection (unit vs integration vs e2e)
- ✅ TDD workflow adherence (Red-Green-Refactor)
- ✅ MSW for realistic API mocking
- ✅ Real Redux store in integration tests
- ✅ E2E tests properly delegated to infra repo
- ✅ Clear handoff process via E2E plan files
- ✅ CI/CD-safe, non-flaky tests
- ✅ No loss of context when E2E implementation happens later

**Remember:** When in doubt, write the simplest test that gives you confidence. Prefer integration tests over unit tests, and E2E only for critical journeys.

---

## 15. Reference Documents

When implementing a new feature with TDD, use these companion documents:

- **`template.md`** — Copy-paste scaffolding with placeholders for implementing any new feature. Provides empty structure to fill in.
- **`sample.md`** — Complete working example showing Todos feature with all test types (34 tests total). Shows concrete patterns and best practices.

**Workflow:**

1. Read `template.md` to understand **what** to write (structure, sections, AAA pattern)
2. Read `sample.md` to see **how** to write it (real code, selectors, assertions)
3. Copy relevant sections from template
4. Adapt patterns from sample to your feature
5. Follow TDD cycle: Red → Green → Refactor

Both documents are co-located with this SKILL.md file.
