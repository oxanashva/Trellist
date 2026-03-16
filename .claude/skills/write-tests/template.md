# Test Template: [Feature Name]

> Copy the relevant sections below when implementing a new feature with TDD.
> Delete sections that don't apply. Fill in all `[PLACEHOLDERS]`.
> This template is designed for **plain Redux** (no RTK, no Thunks) with component-type folder structure.

---

## Section A — Unit Test: Reducer

**Location:** `src/store/reducers/[feature].reducer.test.js`

**When to use:** Testing pure reducer logic in isolation (state transformations, action handling)

```typescript
import { describe, test, expect } from 'vitest'
import { [featureReducer] } from './[feature].reducer'
import { 
  [ACTION_TYPE_1],
  [ACTION_TYPE_2] 
} from '../actions/[feature].actions'

describe('[featureReducer]', () => {
  const initialState = {
    // [define your initial state shape here]
    // Example: items: [], loading: false, error: null
  }

  test('returns initial state when called with undefined', () => {
    // Arrange + Act
    const state = [featureReducer](undefined, { type: '@@INIT' })

    // Assert
    expect(state).toEqual(initialState)
  })

  test('[describes what the action does to state]', () => {
    // Arrange
    const action = { 
      type: [ACTION_TYPE_1], 
      payload: [payload] 
    }

    // Act
    const state = [featureReducer](initialState, action)

    // Assert
    expect(state.[field]).toBe([expectedValue])
  })

  test('does not mutate original state', () => {
    // Arrange
    const action = { type: [ACTION_TYPE_1], payload: [payload] }
    
    // Act
    const newState = [featureReducer](initialState, action)
    
    // Assert
    expect(newState).not.toBe(initialState)
    expect(initialState).toEqual({ /* unchanged initial state */ })
  })

  // Use test.each for data-driven reducer cases
  test.each([
    { input: [value1], expected: [result1] },
    { input: [value2], expected: [result2] },
  ])('handles $input correctly', ({ input, expected }) => {
    const action = { type: [ACTION_TYPE], payload: input }
    const state = [featureReducer](initialState, action)
    expect(state.[field]).toBe(expected)
  })
})
```

**Example (Todos):**

```typescript
// src/store/reducers/todo.reducer.test.js
import { describe, test, expect } from 'vitest'
import { todoReducer } from './todo.reducer'
import { ADD_TODO, REMOVE_TODO, TOGGLE_TODO, SET_TODOS } from '../actions/todo.actions'

describe('todoReducer', () => {
  const initialState = {
    todos: [],
    loading: false,
    error: null
  }

  test('returns initial state when called with undefined', () => {
    const state = todoReducer(undefined, { type: '@@INIT' })
    expect(state).toEqual(initialState)
  })

  test('adds a todo to empty state', () => {
    // Arrange
    const action = { 
      type: ADD_TODO, 
      payload: { id: '1', text: 'Buy milk', completed: false } 
    }

    // Act
    const state = todoReducer(initialState, action)

    // Assert
    expect(state.todos).toHaveLength(1)
    expect(state.todos[0]).toEqual({ id: '1', text: 'Buy milk', completed: false })
  })

  test('removes a todo by id', () => {
    // Arrange
    const stateWithTodos = {
      ...initialState,
      todos: [
        { id: '1', text: 'Buy milk', completed: false },
        { id: '2', text: 'Walk dog', completed: false }
      ]
    }
    const action = { type: REMOVE_TODO, payload: '1' }

    // Act
    const state = todoReducer(stateWithTodos, action)

    // Assert
    expect(state.todos).toHaveLength(1)
    expect(state.todos[0].id).toBe('2')
  })

  test('toggles todo completion status', () => {
    // Arrange
    const stateWithTodo = {
      ...initialState,
      todos: [{ id: '1', text: 'Buy milk', completed: false }]
    }
    const action = { type: TOGGLE_TODO, payload: '1' }

    // Act
    const state = todoReducer(stateWithTodo, action)

    // Assert
    expect(state.todos[0].completed).toBe(true)
  })

  test('does not mutate original state', () => {
    // Arrange
    const action = { type: ADD_TODO, payload: { id: '1', text: 'Test', completed: false } }
    
    // Act
    const newState = todoReducer(initialState, action)
    
    // Assert
    expect(newState).not.toBe(initialState)
    expect(initialState.todos).toHaveLength(0)
  })
})
```

---

## Section B — Unit Test: Action Creators

**Location:** `src/store/actions/[feature].actions.test.js`

**When to use:** Testing action creator functions that return action objects

```typescript
import { describe, test, expect } from 'vitest'
import { 
  [actionCreator1],
  [actionCreator2],
  [ACTION_TYPE_1],
  [ACTION_TYPE_2]
} from './[feature].actions'

describe('[feature] action creators', () => {
  test('[actionCreator1] creates correct action', () => {
    // Arrange
    const payload = [someValue]

    // Act
    const action = [actionCreator1](payload)

    // Assert
    expect(action).toEqual({
      type: [ACTION_TYPE_1],
      payload: [someValue]
    })
  })

  test('[actionCreator2] creates action without payload', () => {
    // Act
    const action = [actionCreator2]()

    // Assert
    expect(action).toEqual({
      type: [ACTION_TYPE_2]
    })
  })
})
```

**Example (Todos):**

```typescript
// src/store/actions/todo.actions.test.js
import { describe, test, expect } from 'vitest'
import { 
  addTodo,
  removeTodo,
  toggleTodo,
  setTodos,
  ADD_TODO,
  REMOVE_TODO,
  TOGGLE_TODO,
  SET_TODOS
} from './todo.actions'

describe('todo action creators', () => {
  test('addTodo creates ADD_TODO action', () => {
    // Arrange
    const todo = { id: '1', text: 'Buy milk', completed: false }

    // Act
    const action = addTodo(todo)

    // Assert
    expect(action).toEqual({
      type: ADD_TODO,
      payload: todo
    })
  })

  test('removeTodo creates REMOVE_TODO action with id', () => {
    // Act
    const action = removeTodo('123')

    // Assert
    expect(action).toEqual({
      type: REMOVE_TODO,
      payload: '123'
    })
  })

  test('setTodos creates SET_TODOS action with array', () => {
    // Arrange
    const todos = [
      { id: '1', text: 'Task 1', completed: false },
      { id: '2', text: 'Task 2', completed: true }
    ]

    // Act
    const action = setTodos(todos)

    // Assert
    expect(action).toEqual({
      type: SET_TODOS,
      payload: todos
    })
  })
})
```

---

## Section C — Unit Test: Service Layer (with MSW)

**Location:** `src/services/[feature].service.test.js`

**When to use:** Testing API call logic, request/response transformations

```typescript
import { describe, test, expect, beforeAll, afterEach, afterAll } from 'vitest'
import { http, HttpResponse } from 'msw'
import { server } from '../mocks/server'
import { [serviceMethod] } from './[feature].service'

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('[feature] service', () => {
  test('[serviceMethod] fetches data from API', async () => {
    // Arrange
    const mockData = [expectedResponseData]
    server.use(
      http.get('/api/[endpoint]', () => HttpResponse.json(mockData))
    )

    // Act
    const result = await [serviceMethod]()

    // Assert
    expect(result).toEqual(mockData)
  })

  test('[serviceMethod] throws error on 500 response', async () => {
    // Arrange
    server.use(
      http.get('/api/[endpoint]', () => 
        HttpResponse.json({ message: 'Server error' }, { status: 500 })
      )
    )

    // Act + Assert
    await expect([serviceMethod]()).rejects.toThrow()
  })

  test('[serviceMethod] sends correct request body', async () => {
    // Arrange
    let capturedBody = null
    server.use(
      http.post('/api/[endpoint]', async ({ request }) => {
        capturedBody = await request.json()
        return HttpResponse.json({ id: '123' }, { status: 201 })
      })
    )
    const payload = { [field]: [value] }

    // Act
    await [serviceMethod](payload)

    // Assert
    expect(capturedBody).toEqual(payload)
  })
})
```

**Example (Todos):**

```typescript
// src/services/todo.service.test.js
import { describe, test, expect, beforeAll, afterEach, afterAll } from 'vitest'
import { http, HttpResponse } from 'msw'
import { server } from '../mocks/server'
import { todoService } from './todo.service'

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('todoService', () => {
  test('query() fetches all todos', async () => {
    // Arrange
    const mockTodos = [
      { id: '1', text: 'Buy milk', completed: false },
      { id: '2', text: 'Walk dog', completed: true }
    ]
    server.use(
      http.get('/api/todos', () => HttpResponse.json(mockTodos))
    )

    // Act
    const todos = await todoService.query()

    // Assert
    expect(todos).toEqual(mockTodos)
  })

  test('save() creates new todo with POST', async () => {
    // Arrange
    let capturedBody = null
    server.use(
      http.post('/api/todos', async ({ request }) => {
        capturedBody = await request.json()
        return HttpResponse.json({ id: '3', ...capturedBody }, { status: 201 })
      })
    )
    const newTodo = { text: 'New task', completed: false }

    // Act
    const result = await todoService.save(newTodo)

    // Assert
    expect(capturedBody).toEqual(newTodo)
    expect(result.id).toBe('3')
    expect(result.text).toBe('New task')
  })

  test('save() updates existing todo with PUT', async () => {
    // Arrange
    server.use(
      http.put('/api/todos/1', async ({ request }) => {
        const body = await request.json()
        return HttpResponse.json({ id: '1', ...body })
      })
    )
    const updatedTodo = { id: '1', text: 'Updated task', completed: true }

    // Act
    const result = await todoService.save(updatedTodo)

    // Assert
    expect(result).toEqual(updatedTodo)
  })

  test('remove() deletes todo with DELETE', async () => {
    // Arrange
    server.use(
      http.delete('/api/todos/1', () => new HttpResponse(null, { status: 204 }))
    )

    // Act + Assert
    await expect(todoService.remove('1')).resolves.not.toThrow()
  })

  test('query() throws error on 500 response', async () => {
    // Arrange
    server.use(
      http.get('/api/todos', () => 
        HttpResponse.json({ message: 'Server error' }, { status: 500 })
      )
    )

    // Act + Assert
    await expect(todoService.query()).rejects.toThrow()
  })
})
```

---

## Section D — Integration Test: Component (Unit-level)

**Location:** `src/cmps/[feature]/[Component].test.jsx`

**When to use:** Testing component rendering, props handling, user interactions (no Redux, no API)

```typescript
import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { [Component] } from './[Component]'

describe('[Component]', () => {
  test('renders with required props', () => {
    // Arrange + Act
    render(<[Component] [prop]={[value]} />)

    // Assert
    expect(screen.getByRole('[role]', { name: '[name]' })).toBeInTheDocument()
  })

  test('calls callback when [user action]', async () => {
    // Arrange
    const user = userEvent.setup()
    const handleAction = vi.fn()
    render(<[Component] onAction={handleAction} />)

    // Act
    await user.click(screen.getByRole('button', { name: '[label]' }))

    // Assert
    expect(handleAction).toHaveBeenCalledTimes(1)
    expect(handleAction).toHaveBeenCalledWith([expectedArgs])
  })

  test('displays [conditional content] when [condition]', () => {
    // Arrange + Act
    render(<[Component] [prop]={[value]} />)

    // Assert
    expect(screen.getByText('[expected text]')).toBeInTheDocument()
  })
})
```

**Example (TodoPreview):**

```typescript
// src/cmps/todo/TodoPreview.test.jsx
import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TodoPreview } from './TodoPreview'

describe('TodoPreview', () => {
  const mockTodo = {
    id: '1',
    text: 'Buy milk',
    completed: false
  }

  test('renders todo text', () => {
    // Arrange + Act
    render(<TodoPreview todo={mockTodo} />)

    // Assert
    expect(screen.getByText('Buy milk')).toBeInTheDocument()
  })

  test('shows checkbox unchecked when todo not completed', () => {
    // Arrange + Act
    render(<TodoPreview todo={mockTodo} />)

    // Assert
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).not.toBeChecked()
  })

  test('shows checkbox checked when todo completed', () => {
    // Arrange + Act
    const completedTodo = { ...mockTodo, completed: true }
    render(<TodoPreview todo={completedTodo} />)

    // Assert
    expect(screen.getByRole('checkbox')).toBeChecked()
  })

  test('calls onToggle when checkbox clicked', async () => {
    // Arrange
    const user = userEvent.setup()
    const handleToggle = vi.fn()
    render(<TodoPreview todo={mockTodo} onToggle={handleToggle} />)

    // Act
    await user.click(screen.getByRole('checkbox'))

    // Assert
    expect(handleToggle).toHaveBeenCalledTimes(1)
    expect(handleToggle).toHaveBeenCalledWith('1')
  })

  test('calls onRemove when delete button clicked', async () => {
    // Arrange
    const user = userEvent.setup()
    const handleRemove = vi.fn()
    render(<TodoPreview todo={mockTodo} onRemove={handleRemove} />)

    // Act
    await user.click(screen.getByRole('button', { name: /delete/i }))

    // Assert
    expect(handleRemove).toHaveBeenCalledWith('1')
  })
})
```

---

## Section E — Integration Test: Component + Store + MSW

**Location:** `src/cmps/[feature]/[Component].test.jsx` or `src/pages/[Component].test.jsx`

**When to use:** Testing component with Redux state and API calls (full integration)

```typescript
import { describe, test, expect, beforeAll, afterEach, afterAll } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'
import { server } from '../../mocks/server'
import { renderWithStore } from '../../test-utils/renderWithStore'
import { [Component] } from './[Component]'

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('[Component] Integration', () => {
  test('loads and displays data from API on mount', async () => {
    // Arrange
    server.use(
      http.get('/api/[endpoint]', () =>
        HttpResponse.json([mockData])
      )
    )

    // Act
    renderWithStore(<[Component] />)

    // Assert
    expect(await screen.findByText('[expected text]')).toBeInTheDocument()
  })

  test('updates Redux state when [user action]', async () => {
    // Arrange
    const user = userEvent.setup()
    server.use(
      http.post('/api/[endpoint]', async ({ request }) => {
        const body = await request.json()
        return HttpResponse.json({ id: '123', ...body })
      })
    )
    const { store } = renderWithStore(<[Component] />)

    // Act
    await user.type(screen.getByRole('textbox'), '[input]')
    await user.click(screen.getByRole('button', { name: /submit/i }))

    // Assert
    await waitFor(() => {
      const state = store.getState()
      expect(state.[feature].[field]).toContain([expectedValue])
    })
  })

  test('shows error message when API fails', async () => {
    // Arrange
    server.use(
      http.get('/api/[endpoint]', () =>
        HttpResponse.json({ message: 'Server error' }, { status: 500 })
      )
    )

    // Act
    renderWithStore(<[Component] />)

    // Assert
    expect(await screen.findByRole('alert')).toHaveTextContent(/error/i)
  })

  test('shows loading state while fetching', async () => {
    // Arrange
    server.use(
      http.get('/api/[endpoint]', async () => {
        await new Promise(resolve => setTimeout(resolve, 100))
        return HttpResponse.json([mockData])
      })
    )

    // Act
    renderWithStore(<[Component] />)

    // Assert
    expect(screen.getByRole('status', { name: /loading/i })).toBeInTheDocument()
    expect(await screen.findByText('[loaded content]')).toBeInTheDocument()
  })
})
```

**Example (TodoList):**

```typescript
// src/cmps/todo/TodoList.test.jsx
import { describe, test, expect, beforeAll, afterEach, afterAll } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'
import { server } from '../../mocks/server'
import { renderWithStore } from '../../test-utils/renderWithStore'
import { TodoList } from './TodoList'

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('TodoList Integration', () => {
  test('loads and displays todos from API on mount', async () => {
    // Arrange
    server.use(
      http.get('/api/todos', () =>
        HttpResponse.json([
          { id: '1', text: 'Buy milk', completed: false },
          { id: '2', text: 'Walk dog', completed: true }
        ])
      )
    )

    // Act
    renderWithStore(<TodoList />)

    // Assert
    expect(await screen.findByText('Buy milk')).toBeInTheDocument()
    expect(screen.getByText('Walk dog')).toBeInTheDocument()
  })

  test('adds new todo via form submission', async () => {
    // Arrange
    const user = userEvent.setup()
    server.use(
      http.get('/api/todos', () => HttpResponse.json([])),
      http.post('/api/todos', async ({ request }) => {
        const body = await request.json()
        return HttpResponse.json({ id: '3', ...body }, { status: 201 })
      })
    )
    const { store } = renderWithStore(<TodoList />)

    // Act
    await user.type(screen.getByRole('textbox', { name: /new todo/i }), 'New task')
    await user.click(screen.getByRole('button', { name: /add/i }))

    // Assert
    await waitFor(() => {
      expect(screen.getByText('New task')).toBeInTheDocument()
    })
    
    const state = store.getState()
    expect(state.todo.todos).toHaveLength(1)
    expect(state.todo.todos[0].text).toBe('New task')
  })

  test('toggles todo completion when checkbox clicked', async () => {
    // Arrange
    const user = userEvent.setup()
    server.use(
      http.get('/api/todos', () =>
        HttpResponse.json([{ id: '1', text: 'Buy milk', completed: false }])
      ),
      http.put('/api/todos/1', async ({ request }) => {
        const body = await request.json()
        return HttpResponse.json({ id: '1', ...body })
      })
    )
    const { store } = renderWithStore(<TodoList />)

    await screen.findByText('Buy milk') // Wait for load

    // Act
    await user.click(screen.getByRole('checkbox'))

    // Assert
    await waitFor(() => {
      const state = store.getState()
      expect(state.todo.todos[0].completed).toBe(true)
    })
  })

  test('removes todo when delete button clicked', async () => {
    // Arrange
    const user = userEvent.setup()
    server.use(
      http.get('/api/todos', () =>
        HttpResponse.json([
          { id: '1', text: 'Buy milk', completed: false },
          { id: '2', text: 'Walk dog', completed: false }
        ])
      ),
      http.delete('/api/todos/1', () => new HttpResponse(null, { status: 204 }))
    )
    const { store } = renderWithStore(<TodoList />)

    await screen.findByText('Buy milk') // Wait for load

    // Act
    await user.click(screen.getAllByRole('button', { name: /delete/i })[0])

    // Assert
    await waitFor(() => {
      expect(screen.queryByText('Buy milk')).not.toBeInTheDocument()
    })
    
    const state = store.getState()
    expect(state.todo.todos).toHaveLength(1)
    expect(state.todo.todos[0].id).toBe('2')
  })

  test('shows error alert when API fails', async () => {
    // Arrange
    server.use(
      http.get('/api/todos', () =>
        HttpResponse.json({ message: 'Server error' }, { status: 500 })
      )
    )

    // Act
    renderWithStore(<TodoList />)

    // Assert
    expect(await screen.findByRole('alert')).toHaveTextContent(/failed to load/i)
  })

  test('shows loading spinner while fetching todos', async () => {
    // Arrange
    server.use(
      http.get('/api/todos', async () => {
        await new Promise(resolve => setTimeout(resolve, 100))
        return HttpResponse.json([{ id: '1', text: 'Buy milk', completed: false }])
      })
    )

    // Act
    renderWithStore(<TodoList />)

    // Assert
    expect(screen.getByRole('status', { name: /loading/i })).toBeInTheDocument()
    expect(await screen.findByText('Buy milk')).toBeInTheDocument()
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })
})
```

---

## Section F — Integration Test: Page Component

**Location:** `src/pages/[Page].test.jsx`

**When to use:** Testing full page components with routing, store, and API

```typescript
import { describe, test, expect, beforeAll, afterEach, afterAll } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'
import { server } from '../mocks/server'
import { renderWithStore } from '../test-utils/renderWithStore'
import { [PageComponent] } from './[PageComponent]'

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('[PageComponent] Page', () => {
  test('renders page title and main content', async () => {
    // Arrange
    server.use(
      http.get('/api/[endpoint]', () => HttpResponse.json([mockData]))
    )

    // Act
    renderWithStore(<[PageComponent] />)

    // Assert
    expect(screen.getByRole('heading', { name: /[page title]/i })).toBeInTheDocument()
    expect(await screen.findByText('[content]')).toBeInTheDocument()
  })

  test('navigates to details when item clicked', async () => {
    // Arrange
    const user = userEvent.setup()
    const mockNavigate = vi.fn()
    // Note: You'll need to mock useNavigate if using React Router
    
    renderWithStore(<[PageComponent] />)

    // Act
    await user.click(screen.getByRole('button', { name: /view details/i }))

    // Assert
    // Verify navigation or route change
  })
})
```

---

## Section G — E2E Test Plan (for [app-name]-infra)

**Location:** `e2e-plans/[feature]-[workflow].md`

**When to use:** Feature requires multi-page journey, auth, or critical user flow testing

```markdown
# E2E Test Plan: [Feature Name] - [Workflow]

**Status:** ⏳ Pending implementation in [app-name]-infra  
**Created:** [YYYY-MM-DD]  
**Frontend PR:** [Link to PR]  
**Infra PR:** _Not yet implemented_

---

## User Journey to Test

[Describe the complete multi-page user flow step by step]

1. User [action 1]
2. System [response 1]
3. User navigates to [page/route]
4. User [action 2]
5. ...

---

## Critical Assertions

- [ ] [Assertion 1 - what must be true]
- [ ] [Assertion 2 - API call made with correct data]
- [ ] [Assertion 3 - state persists across navigation]
- [ ] ...

---

## Test Data Requirements

```json
{
  "user": {
    "email": "test@example.com",
    "password": "Test123!"
  },
  "initialData": [
    { "id": "1", "field": "value" }
  ]
}
```

---

## API Endpoints Involved

- GET /api/[endpoint] - [purpose]
- POST /api/[endpoint] - [purpose]
- PUT /api/[endpoint] - [purpose]
- DELETE /api/[endpoint] - [purpose]

---

## Suggested Playwright Selectors

```javascript
const [element1] = page.getByRole('[role]', { name: /[pattern]/i })
const [element2] = page.getByLabel(/[label]/i)
// ...
```

---

## Edge Cases to Cover

1. [Edge case 1] - [expected behavior]
2. [Edge case 2] - [expected behavior]
3. Network error during [action] - [show error, don't update state]
4. ...

---

## Implementation Location

`[app-name]-infra/e2e/tests/[domain]/[feature]-[workflow].spec.ts`

---

## Notes for Infrastructure Team

[Any special setup, environment variables, or considerations]
```

---

## Section H — Shared Test Utilities (create once, reuse everywhere)

### File: `src/test-utils/renderWithStore.jsx`

```typescript
import { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { Provider } from 'react-redux'
import { makeStore } from './makeStore'
import type { RootState } from '../store/store'

interface Options extends Omit<RenderOptions, 'wrapper'> {
  preloadedState?: Partial<RootState>
}

export function renderWithStore(
  ui: ReactElement,
  { preloadedState, ...renderOptions }: Options = {}
) {
  const store = makeStore(preloadedState)
  
  function Wrapper({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>
  }
  
  return { 
    store, 
    ...render(ui, { wrapper: Wrapper, ...renderOptions }) 
  }
}
```

### File: `src/test-utils/makeStore.js`

```typescript
import { createStore, combineReducers } from 'redux'
import { todoReducer } from '../store/reducers/todo.reducer'
import { boardReducer } from '../store/reducers/board.reducer'
// Import other reducers...

const rootReducer = combineReducers({
  todo: todoReducer,
  board: boardReducer,
  // Add other reducers...
})

export function makeStore(preloadedState = {}) {
  return createStore(rootReducer, preloadedState)
}

export type RootState = ReturnType<typeof rootReducer>
```

### File: `src/test-utils/test-data.js`

```typescript
// Shared test fixtures
export const mockTodo = {
  id: '1',
  text: 'Test todo',
  completed: false,
  createdAt: '2025-01-01T00:00:00Z'
}

export const mockTodos = [
  mockTodo,
  { id: '2', text: 'Another todo', completed: true, createdAt: '2025-01-02T00:00:00Z' }
]

export const mockUser = {
  id: 'user-1',
  email: 'test@example.com',
  name: 'Test User'
}

// Add more shared fixtures as needed
```

### File: `src/mocks/server.js`

```typescript
import { setupServer } from 'msw/node'
import { handlers } from './handlers'

export const server = setupServer(...handlers)
```

### File: `src/mocks/handlers.js`

```typescript
import { http, HttpResponse } from 'msw'

export const handlers = [
  // Default happy-path handlers — override per-test with server.use(...)
  
  // Todos
  http.get('/api/todos', () => {
    return HttpResponse.json([
      { id: '1', text: 'Default todo', completed: false }
    ])
  }),

  http.post('/api/todos', async ({ request }) => {
    const body = await request.json()
    return HttpResponse.json(
      { id: Date.now().toString(), ...body },
      { status: 201 }
    )
  }),

  http.put('/api/todos/:id', async ({ params, request }) => {
    const body = await request.json()
    return HttpResponse.json({ id: params.id, ...body })
  }),

  http.delete('/api/todos/:id', () => {
    return new HttpResponse(null, { status: 204 })
  }),

  // Add other default handlers...
]
```

---

## Quick Start Checklist

When implementing a new feature with TDD:

1. ✅ **Plan:** Decide which test types are needed (Section A-G decision matrix)
2. ✅ **RED:** Write failing unit test for reducer (Section A)
3. ✅ **GREEN:** Implement reducer to pass test
4. ✅ **RED:** Write failing unit test for action creators (Section B)
5. ✅ **GREEN:** Implement action creators
6. ✅ **RED:** Write failing unit test for service layer (Section C)
7. ✅ **GREEN:** Implement service methods
8. ✅ **RED:** Write failing integration test for component (Section E)
9. ✅ **GREEN:** Implement component
10. ✅ **REFACTOR:** Clean up code and tests
11. ✅ **E2E Plan:** Create plan file if multi-page journey (Section G)
12. ✅ **Verify:** Run full test suite `npm run test`

---

## Common Test Patterns

### Pattern 1: Test Async State Updates

```typescript
test('sets loading state while fetching', async () => {
  // Arrange
  server.use(
    http.get('/api/todos', async () => {
      await new Promise(resolve => setTimeout(resolve, 100))
      return HttpResponse.json([])
    })
  )
  const { store } = renderWithStore(<TodoList />)

  // Act — component fetches on mount
  
  // Assert — check loading state
  expect(store.getState().todo.loading).toBe(true)
  
  // Wait for fetch to complete
  await waitFor(() => {
    expect(store.getState().todo.loading).toBe(false)
  })
})
```

### Pattern 2: Test Form Validation

```typescript
test('shows validation error for empty input', async () => {
  // Arrange
  const user = userEvent.setup()
  render(<TodoForm onSubmit={vi.fn()} />)

  // Act
  await user.click(screen.getByRole('button', { name: /submit/i }))

  // Assert
  expect(screen.getByRole('alert')).toHaveTextContent(/required/i)
})
```

### Pattern 3: Test Optimistic Updates

```typescript
test('shows new todo immediately before API confirms', async () => {
  // Arrange
  const user = userEvent.setup()
  let resolvePost
  server.use(
    http.post('/api/todos', () => {
      return new Promise(resolve => {
        resolvePost = resolve
      })
    })
  )
  renderWithStore(<TodoList />)

  // Act
  await user.type(screen.getByRole('textbox'), 'New task')
  await user.click(screen.getByRole('button', { name: /add/i }))

  // Assert — appears immediately (optimistic)
  expect(screen.getByText('New task')).toBeInTheDocument()

  // Complete API call
  resolvePost(HttpResponse.json({ id: '123', text: 'New task', completed: false }))
})
```

---

## Anti-Patterns to Avoid

| ❌ Don't Do This                               | ✅ Do This Instead                                     |
| ---------------------------------------------- | ------------------------------------------------------ |
| `vi.mock('axios')`                             | Use MSW to intercept at network layer                  |
| Test internal component state                  | Test observable UI behavior                            |
| Share store instance between tests             | Create fresh store via `makeStore()` each time         |
| `await new Promise(r => setTimeout(r, 500))`   | Use `waitFor()` or `findBy*` queries                   |
| Mock Redux store with `vi.fn()`                | Use real store from `makeStore()`                      |
| Write E2E tests in frontend repo               | Create E2E plan, implement in [app-name]-infra         |
| Single test for multiple scenarios             | One test per scenario                                  |
| Overly specific selectors (`getByTestId`)      | Accessibility-first queries (`getByRole`, `getByLabel`) |

---

**Remember:** This template is for **plain Redux** (no RTK, no Thunks). Follow the TDD workflow: Red → Green → Refactor. Keep tests fast, isolated, and deterministic.
