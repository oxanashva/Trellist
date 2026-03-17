---
name: write-tests
description: >
  Expert TDD testing strategy for MERN stack frontend apps using React, plain Redux
  (no Thunks, no Redux Toolkit), Vite, React Testing Library, MSW, and Playwright.
  Use this skill whenever the user asks to write tests, implement a feature with TDD,
  set up testing infrastructure, decide what kind of test to write (unit vs integration
  vs e2e), or asks about testing strategy for their React/Redux frontend. Covers the full Red-Green-Refactor
  cycle and enforces CI/CD-safe, non-flaky test patterns.
argument-hint: <feature-name>
disable-model-invocation: true
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

**Remember:** When in doubt, write the simplest test that gives you confidence. Prefer integration tests over unit tests, and E2E only for critical journeys.

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

- Import `createStore`, `combineReducers` from `redux`
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

## 5. Example: TodoList Feature (Folder Structure)

```

src/
├── cmps/   # Components organized by type
│   └── todo/
│   ├── TodoList.jsx
│   ├── TodoList.test.jsx    #Integration: component + store + MSW
│   ├── TodoPreview.jsx
│   └── TodoPreview.test.jsx   # Unit test
├── pages/   # Page-level components
│   ├── TodoDetails.jsx
│   └── TodoDetails.test.jsx   # Integration test: page + routing + store
├── services/   # API service layer
│   ├── todo.service.js
│   └── todo.service.test.js # Unit test: API call logic (with MSW)
├── store/   # Redux store structure
│   ├── actions/
│   │   ├── todo.actions.js
│   │   └── todo.actions.test.js   # Unit: action creators
│   └── reducers/
│       ├── todo.reducer.js
│       └── todo.reducer.test.js   # Unit test: reducer pure logic
├── mocks/ # MSW setup
│   ├── handlers.js # MSW route handlers
│   └── server.js   # MSW server config
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
    │   ├── todo/
    │   └── todo-crud.spec.ts   # Implemented from e2e-plans/todo-crud.md
    ├── fixtures/
    │   └── todos.json
    └── playwright.config.ts

```

---

## 6. Arrange-Act-Assert (AAA) Pattern

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

## 7. CI/CD Readiness Rules

- **Isolation:** Each test creates its own store instance. Never share store across tests.
- **No global DOM pollution:** Always call `cleanup()` (RTL does this automatically via Vitest config).
- **Parallelism-safe:** Tests must not depend on execution order or shared file-system state.
- **Data-driven repetition:** Use `test.each` for equivalent scenarios differing only in input/output.
- **Deterministic:** No `Math.random()`, no `Date.now()` without mocking. Use `vi.setSystemTime()` when date logic is involved.
- **Fast feedback:** Unit and integration tests must complete in < 100ms each. If a test is slow, it belongs in e2e or needs optimization.
- **E2E gate:** E2E tests run in `[app-name]-infra` only on the `main` branch or as a pre-merge check.

---

## 8. TDD Step-by-Step Checklist

When asked to implement a feature with TDD, follow these steps:

### 8.1 For Frontend-Only Tests (Unit/Integration)

1. ✅ Determine test types needed using the decision matrix
2. ✅ Write **type definitions** first (interfaces, action types)
3. ✅ RED: Write a **failing unit test** for the reducer or action creator
4. ✅ GREEN: Implement the reducer/action — run test → should pass
5. ✅ RED: Write a **failing integration test** for the component
6. ✅ GREEN: Implement the component — run test → should pass
7. ✅ REFACTOR: Clean up code and tests
8. ✅ Run `npm run test` to confirm full suite passes
9. ⏸️ **Ask user:** "Would you like me to run the full validation script?"
   - If yes: `bash ${CLAUDE_SKILL_DIR}/scripts/validate.sh`
   - If no: Skip validation

### 8.2 When E2E Tests Are Needed

1. ✅ Complete steps 1-8 above (all frontend tests)
2. ✅ Create E2E plan file in `e2e-plans/[feature-name].md`
3. ✅ Include complete user journey, assertions, test data, and selectors
4. ✅ Notify developer with clear next steps for `[app-name]-infra` implementation
5. ✅ Add link to E2E plan in feature PR description
6. 📋 Update E2E plan status to ✅ when implemented in infra repo

### 8.3 Decision Flow: Does This Feature Need E2E?

```
Is it a multi-page user journey? → YES → Create E2E plan
Does it involve authentication? → YES → Create E2E plan
Is it a critical business flow? → YES → Create E2E plan
Does it require backend persistence? → MAYBE → Evaluate criticality
Is it a simple component? → NO → Skip E2E
```

---

## 9. Anti-Patterns to Avoid

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

## 10. Test Coverage Targets

- **Unit tests:** 80%+ coverage for reducers, actions, selectors, utils
- **Integration tests:** 70%+ coverage for components and pages
- **E2E tests:** Cover critical user journeys (5-10 tests max per feature)

**Remember:** Coverage is a metric, not a goal. Aim for meaningful tests that catch real bugs.

---

## 11. Quick Reference Commands

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

# Run full validation suite
bash ${CLAUDE_SKILL_DIR}/scripts/validate.sh

# Run validation with e2e tests
bash ${CLAUDE_SKILL_DIR}/scripts/validate.sh --e2e
```

---

## 12. Reference Documents

When implementing tests or a new feature with TDD, load these files as needed:

### Examples

- For reducer unit test patterns, see [examples/reducer-unit.md](examples/reducer-unit.md)
- For integration test patterns (component + store + MSW), see [examples/integration-test.md](examples/integration-test.md)
- For E2E plan file format, see [examples/e2e-plan-example.md](examples/e2e-plan-example.md)

### Common Patterns

- For async action testing, see [patterns/async-actions.md](patterns/async-actions.md)
- For form submission testing, see [patterns/form-submissions.md](patterns/form-submissions.md)
- For error state testing, see [patterns/error-states.md](patterns/error-states.md)

### Scaffolding

- For empty templates to fill in, see [template.md](template.md)
- For complete working examples, see [sample.md](sample.md)

**Workflow:**

1. Read `template.md` to understand **what** to write (structure, sections, AAA pattern)
2. Read `sample.md` to see **how** to write it (real code, selectors, assertions)
3. Load relevant `examples/` files for specific test type patterns
4. Load relevant `patterns/` files for common scenarios (async, forms, errors)
5. Copy and adapt to your feature
6. Follow TDD cycle: Red → Green → Refactor

All documents are co-located in the `.claude/skills/write-tests/` directory.
