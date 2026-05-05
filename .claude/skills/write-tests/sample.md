# Example: Todos Feature — Full TDD Implementation

This shows the complete test suite for a **Todos** feature using **plain Redux** (no RTK, no Thunks):

**Features implemented:**
- Add a todo (POST /api/todos)
- List todos (GET /api/todos)
- Toggle todo completion (PUT /api/todos/:id)
- Delete a todo (DELETE /api/todos/:id)

**Test types used:**
- ✅ Unit — reducer logic, action creators, service layer
- ✅ Integration — TodoList component with real store + MSW
- ✅ E2E Plan — Created for infra team (actual E2E in [app-name]-infra)

---

## Folder Structure

```
src/
├── cmps/
│   └── todo/
│       ├── TodoList.jsx                    # Main component
│       ├── TodoList.test.jsx               # ← Integration test
│       ├── TodoPreview.jsx                 # Item component
│       └── TodoPreview.test.jsx            # ← Unit test
├── pages/
│   ├── TodoIndex.jsx                       # Page component
│   └── TodoIndex.test.jsx                  # ← Integration test
├── services/
│   ├── todo.service.js                     # API calls
│   └── todo.service.test.js                # ← Unit test with MSW
├── store/
│   ├── actions/
│   │   ├── todo.actions.js                 # Action creators
│   │   └── todo.actions.test.js            # ← Unit test
│   └── reducers/
│       ├── todo.reducer.js                 # Pure reducer
│       └── todo.reducer.test.js            # ← Unit test
├── mocks/
│   ├── handlers.js                         # MSW handlers
│   └── server.js                           # MSW server setup
└── test-utils/
    ├── renderWithStore.jsx                 # RTL + Redux wrapper
    ├── makeStore.js                        # Store factory
    └── test-data.js                        # Shared fixtures
```

---

## 1. Action Types & Creators

### File: `src/store/actions/todo.actions.js`

```javascript
// Action types
export const SET_TODOS = 'SET_TODOS'
export const ADD_TODO = 'ADD_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'
export const REMOVE_TODO = 'REMOVE_TODO'
export const SET_LOADING = 'SET_LOADING'
export const SET_ERROR = 'SET_ERROR'

// Action creators
export function setTodos(todos) {
  return { type: SET_TODOS, payload: todos }
}

export function addTodo(todo) {
  return { type: ADD_TODO, payload: todo }
}

export function updateTodo(todo) {
  return { type: UPDATE_TODO, payload: todo }
}

export function removeTodo(todoId) {
  return { type: REMOVE_TODO, payload: todoId }
}

export function setLoading(isLoading) {
  return { type: SET_LOADING, payload: isLoading }
}

export function setError(error) {
  return { type: SET_ERROR, payload: error }
}
```

### File: `src/store/actions/todo.actions.test.js`

```javascript
import { describe, test, expect } from 'vitest'
import {
  setTodos,
  addTodo,
  updateTodo,
  removeTodo,
  setLoading,
  setError,
  SET_TODOS,
  ADD_TODO,
  UPDATE_TODO,
  REMOVE_TODO,
  SET_LOADING,
  SET_ERROR
} from './todo.actions'

describe('todo action creators', () => {
  test('setTodos creates SET_TODOS action', () => {
    // Arrange
    const todos = [
      { id: '1', text: 'Buy milk', completed: false },
      { id: '2', text: 'Walk dog', completed: true }
    ]

    // Act
    const action = setTodos(todos)

    // Assert
    expect(action).toEqual({
      type: SET_TODOS,
      payload: todos
    })
  })

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

  test('updateTodo creates UPDATE_TODO action', () => {
    // Arrange
    const todo = { id: '1', text: 'Buy milk', completed: true }

    // Act
    const action = updateTodo(todo)

    // Assert
    expect(action).toEqual({
      type: UPDATE_TODO,
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

  test('setLoading creates SET_LOADING action', () => {
    // Act
    const action = setLoading(true)

    // Assert
    expect(action).toEqual({
      type: SET_LOADING,
      payload: true
    })
  })

  test('setError creates SET_ERROR action', () => {
    // Act
    const action = setError('Network error')

    // Assert
    expect(action).toEqual({
      type: SET_ERROR,
      payload: 'Network error'
    })
  })
})
```

---

## 2. Reducer

### File: `src/store/reducers/todo.reducer.js`

```javascript
import {
  SET_TODOS,
  ADD_TODO,
  UPDATE_TODO,
  REMOVE_TODO,
  SET_LOADING,
  SET_ERROR
} from '../actions/todo.actions'

const initialState = {
  todos: [],
  loading: false,
  error: null
}

export function todoReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TODOS:
      return {
        ...state,
        todos: action.payload,
        loading: false,
        error: null
      }

    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
        error: null
      }

    case UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id ? action.payload : todo
        ),
        error: null
      }

    case REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
        error: null
      }

    case SET_LOADING:
      return {
        ...state,
        loading: action.payload
      }

    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      }

    default:
      return state
  }
}
```

### File: `src/store/reducers/todo.reducer.test.js`

```javascript
import { describe, test, expect } from 'vitest'
import { todoReducer } from './todo.reducer'
import {
  SET_TODOS,
  ADD_TODO,
  UPDATE_TODO,
  REMOVE_TODO,
  SET_LOADING,
  SET_ERROR
} from '../actions/todo.actions'

describe('todoReducer', () => {
  const initialState = {
    todos: [],
    loading: false,
    error: null
  }

  test('returns initial state when called with undefined', () => {
    // Arrange + Act
    const state = todoReducer(undefined, { type: '@@INIT' })

    // Assert
    expect(state).toEqual(initialState)
  })

  test('SET_TODOS replaces todos array', () => {
    // Arrange
    const todos = [
      { id: '1', text: 'Buy milk', completed: false },
      { id: '2', text: 'Walk dog', completed: true }
    ]
    const action = { type: SET_TODOS, payload: todos }

    // Act
    const state = todoReducer(initialState, action)

    // Assert
    expect(state.todos).toEqual(todos)
    expect(state.loading).toBe(false)
    expect(state.error).toBeNull()
  })

  test('ADD_TODO appends todo to array', () => {
    // Arrange
    const stateWithOne = {
      ...initialState,
      todos: [{ id: '1', text: 'Buy milk', completed: false }]
    }
    const newTodo = { id: '2', text: 'Walk dog', completed: false }
    const action = { type: ADD_TODO, payload: newTodo }

    // Act
    const state = todoReducer(stateWithOne, action)

    // Assert
    expect(state.todos).toHaveLength(2)
    expect(state.todos[1]).toEqual(newTodo)
  })

  test('UPDATE_TODO replaces matching todo', () => {
    // Arrange
    const stateWithTodos = {
      ...initialState,
      todos: [
        { id: '1', text: 'Buy milk', completed: false },
        { id: '2', text: 'Walk dog', completed: false }
      ]
    }
    const updatedTodo = { id: '1', text: 'Buy milk', completed: true }
    const action = { type: UPDATE_TODO, payload: updatedTodo }

    // Act
    const state = todoReducer(stateWithTodos, action)

    // Assert
    expect(state.todos[0].completed).toBe(true)
    expect(state.todos[1]).toEqual(stateWithTodos.todos[1]) // Unchanged
  })

  test('REMOVE_TODO filters out todo by id', () => {
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

  test('SET_LOADING sets loading flag', () => {
    // Arrange
    const action = { type: SET_LOADING, payload: true }

    // Act
    const state = todoReducer(initialState, action)

    // Assert
    expect(state.loading).toBe(true)
  })

  test('SET_ERROR sets error message and clears loading', () => {
    // Arrange
    const stateLoading = { ...initialState, loading: true }
    const action = { type: SET_ERROR, payload: 'Network error' }

    // Act
    const state = todoReducer(stateLoading, action)

    // Assert
    expect(state.error).toBe('Network error')
    expect(state.loading).toBe(false)
  })

  test('does not mutate original state', () => {
    // Arrange
    const action = { type: ADD_TODO, payload: { id: '1', text: 'Test', completed: false } }
    const originalState = { ...initialState }

    // Act
    const newState = todoReducer(initialState, action)

    // Assert
    expect(newState).not.toBe(initialState)
    expect(initialState).toEqual(originalState)
  })

  // Data-driven test
  test.each([
    { initial: [], afterAdd: 1 },
    { initial: [{ id: '1', text: 'Existing', completed: false }], afterAdd: 2 }
  ])('adds todo correctly when starting with $initial.length todos', ({ initial, afterAdd }) => {
    // Arrange
    const stateWithInitial = { ...initialState, todos: initial }
    const action = { type: ADD_TODO, payload: { id: '99', text: 'New', completed: false } }

    // Act
    const state = todoReducer(stateWithInitial, action)

    // Assert
    expect(state.todos).toHaveLength(afterAdd)
  })
})
```

---

## 3. Service Layer

### File: `src/services/todo.service.js`

```javascript
import { httpService } from './http.service'

export const todoService = {
  query,
  getById,
  save,
  remove
}

async function query() {
  const todos = await httpService.get('todos')
  return todos
}

async function getById(todoId) {
  const todo = await httpService.get(`todos/${todoId}`)
  return todo
}

async function save(todo) {
  if (todo.id) {
    return await httpService.put(`todos/${todo.id}`, todo)
  } else {
    return await httpService.post('todos', todo)
  }
}

async function remove(todoId) {
  return await httpService.delete(`todos/${todoId}`)
}
```

### File: `src/services/todo.service.test.js`

```javascript
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
      http.get('*/api/todos', () => HttpResponse.json(mockTodos))
    )

    // Act
    const todos = await todoService.query()

    // Assert
    expect(todos).toEqual(mockTodos)
  })

  test('getById() fetches single todo', async () => {
    // Arrange
    const mockTodo = { id: '1', text: 'Buy milk', completed: false }
    server.use(
      http.get('*/api/todos/1', () => HttpResponse.json(mockTodo))
    )

    // Act
    const todo = await todoService.getById('1')

    // Assert
    expect(todo).toEqual(mockTodo)
  })

  test('save() creates new todo with POST when no id', async () => {
    // Arrange
    let capturedBody = null
    server.use(
      http.post('*/api/todos', async ({ request }) => {
        capturedBody = await request.json()
        return HttpResponse.json(
          { id: '3', ...capturedBody },
          { status: 201 }
        )
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

  test('save() updates existing todo with PUT when id exists', async () => {
    // Arrange
    let capturedBody = null
    server.use(
      http.put('*/api/todos/1', async ({ request }) => {
        capturedBody = await request.json()
        return HttpResponse.json(capturedBody)
      })
    )
    const updatedTodo = { id: '1', text: 'Updated task', completed: true }

    // Act
    const result = await todoService.save(updatedTodo)

    // Assert
    expect(capturedBody).toEqual(updatedTodo)
    expect(result).toEqual(updatedTodo)
  })

  test('remove() deletes todo with DELETE', async () => {
    // Arrange
    let deletedId = null
    server.use(
      http.delete('*/api/todos/:id', ({ params }) => {
        deletedId = params.id
        return new HttpResponse(null, { status: 204 })
      })
    )

    // Act
    await todoService.remove('1')

    // Assert
    expect(deletedId).toBe('1')
  })

  test('query() throws error on 500 response', async () => {
    // Arrange
    server.use(
      http.get('*/api/todos', () =>
        HttpResponse.json({ message: 'Server error' }, { status: 500 })
      )
    )

    // Act + Assert
    await expect(todoService.query()).rejects.toThrow()
  })

  test('save() throws error on 400 validation error', async () => {
    // Arrange
    server.use(
      http.post('*/api/todos', () =>
        HttpResponse.json({ message: 'Text required' }, { status: 400 })
      )
    )

    // Act + Assert
    await expect(todoService.save({ text: '' })).rejects.toThrow()
  })
})
```

---

## 4. Component Tests

### File: `src/cmps/todo/TodoPreview.jsx`

```jsx
export function TodoPreview({ todo, onToggle, onRemove }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        aria-label={`Mark "${todo.text}" as ${todo.completed ? 'incomplete' : 'complete'}`}
      />
      <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
        {todo.text}
      </span>
      <button onClick={() => onRemove(todo.id)} aria-label={`Delete ${todo.text}`}>
        Delete
      </button>
    </li>
  )
}
```

### File: `src/cmps/todo/TodoPreview.test.jsx`

```jsx
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
    render(<TodoPreview todo={mockTodo} onToggle={vi.fn()} onRemove={vi.fn()} />)

    // Assert
    expect(screen.getByText('Buy milk')).toBeInTheDocument()
  })

  test('shows checkbox unchecked when todo not completed', () => {
    // Arrange + Act
    render(<TodoPreview todo={mockTodo} onToggle={vi.fn()} onRemove={vi.fn()} />)

    // Assert
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).not.toBeChecked()
  })

  test('shows checkbox checked when todo completed', () => {
    // Arrange
    const completedTodo = { ...mockTodo, completed: true }

    // Act
    render(<TodoPreview todo={completedTodo} onToggle={vi.fn()} onRemove={vi.fn()} />)

    // Assert
    expect(screen.getByRole('checkbox')).toBeChecked()
  })

  test('calls onToggle with todo id when checkbox clicked', async () => {
    // Arrange
    const user = userEvent.setup()
    const handleToggle = vi.fn()
    render(<TodoPreview todo={mockTodo} onToggle={handleToggle} onRemove={vi.fn()} />)

    // Act
    await user.click(screen.getByRole('checkbox'))

    // Assert
    expect(handleToggle).toHaveBeenCalledTimes(1)
    expect(handleToggle).toHaveBeenCalledWith('1')
  })

  test('calls onRemove with todo id when delete button clicked', async () => {
    // Arrange
    const user = userEvent.setup()
    const handleRemove = vi.fn()
    render(<TodoPreview todo={mockTodo} onToggle={vi.fn()} onRemove={handleRemove} />)

    // Act
    await user.click(screen.getByRole('button', { name: /delete buy milk/i }))

    // Assert
    expect(handleRemove).toHaveBeenCalledTimes(1)
    expect(handleRemove).toHaveBeenCalledWith('1')
  })

  test('applies line-through style when completed', () => {
    // Arrange
    const completedTodo = { ...mockTodo, completed: true }

    // Act
    render(<TodoPreview todo={completedTodo} onToggle={vi.fn()} onRemove={vi.fn()} />)

    // Assert
    const text = screen.getByText('Buy milk')
    expect(text).toHaveStyle({ textDecoration: 'line-through' })
  })
})
```

### File: `src/cmps/todo/TodoList.test.jsx` (Integration Test)

```jsx
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
      http.get('*/api/todos', () =>
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

  test('shows loading spinner while fetching todos', async () => {
    // Arrange
    server.use(
      http.get('*/api/todos', async () => {
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

  test('shows error alert when API fails', async () => {
    // Arrange
    server.use(
      http.get('*/api/todos', () =>
        HttpResponse.json({ message: 'Server error' }, { status: 500 })
      )
    )

    // Act
    renderWithStore(<TodoList />)

    // Assert
    expect(await screen.findByRole('alert')).toHaveTextContent(/failed to load/i)
  })

  test('adds new todo via form submission', async () => {
    // Arrange
    const user = userEvent.setup()
    server.use(
      http.get('*/api/todos', () => HttpResponse.json([])),
      http.post('*/api/todos', async ({ request }) => {
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

  test('submits todo on Enter keypress', async () => {
    // Arrange
    const user = userEvent.setup()
    server.use(
      http.get('*/api/todos', () => HttpResponse.json([])),
      http.post('*/api/todos', async ({ request }) => {
        const body = await request.json()
        return HttpResponse.json({ id: '3', ...body }, { status: 201 })
      })
    )
    renderWithStore(<TodoList />)

    // Act
    await user.type(screen.getByRole('textbox', { name: /new todo/i }), 'Walk dog{Enter}')

    // Assert
    expect(await screen.findByText('Walk dog')).toBeInTheDocument()
  })

  test('does not submit when input is empty', async () => {
    // Arrange
    const user = userEvent.setup()
    server.use(http.get('*/api/todos', () => HttpResponse.json([])))
    renderWithStore(<TodoList />)

    // Act
    await user.click(screen.getByRole('button', { name: /add/i }))

    // Assert
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument()
  })

  test('toggles todo completion when checkbox clicked', async () => {
    // Arrange
    const user = userEvent.setup()
    server.use(
      http.get('*/api/todos', () =>
        HttpResponse.json([{ id: '1', text: 'Buy milk', completed: false }])
      ),
      http.put('*/api/todos/1', async ({ request }) => {
        const body = await request.json()
        return HttpResponse.json(body)
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
      http.get('*/api/todos', () =>
        HttpResponse.json([
          { id: '1', text: 'Buy milk', completed: false },
          { id: '2', text: 'Walk dog', completed: false }
        ])
      ),
      http.delete('*/api/todos/1', () => new HttpResponse(null, { status: 204 }))
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

  test('shows validation error when server returns 400', async () => {
    // Arrange
    const user = userEvent.setup()
    server.use(
      http.get('*/api/todos', () => HttpResponse.json([])),
      http.post('*/api/todos', () =>
        HttpResponse.json({ message: 'Text required' }, { status: 400 })
      )
    )
    renderWithStore(<TodoList />)

    // Act
    await user.type(screen.getByRole('textbox', { name: /new todo/i }), 'X')
    await user.click(screen.getByRole('button', { name: /add/i }))

    // Assert
    expect(await screen.findByRole('alert')).toHaveTextContent(/text required/i)
  })
})
```

---

## 5. MSW Setup

### File: `src/mocks/handlers.js`

```javascript
import { http, HttpResponse } from 'msw'

// In-memory database for testing
let todos = [
  { id: '1', text: 'Buy milk', completed: false },
  { id: '2', text: 'Walk dog', completed: false }
]

export const handlers = [
  // Get all todos
  http.get('*/api/todos', () => {
    return HttpResponse.json(todos)
  }),

  // Get single todo
  http.get('*/api/todos/:id', ({ params }) => {
    const todo = todos.find(t => t.id === params.id)
    if (!todo) {
      return HttpResponse.json({ message: 'Not found' }, { status: 404 })
    }
    return HttpResponse.json(todo)
  }),

  // Create todo
  http.post('*/api/todos', async ({ request }) => {
    const body = await request.json()
    
    if (!body.text || body.text.trim() === '') {
      return HttpResponse.json({ message: 'Text required' }, { status: 400 })
    }

    const newTodo = {
      id: Date.now().toString(),
      text: body.text.trim(),
      completed: false
    }
    todos.push(newTodo)
    return HttpResponse.json(newTodo, { status: 201 })
  }),

  // Update todo
  http.put('*/api/todos/:id', async ({ params, request }) => {
    const body = await request.json()
    const index = todos.findIndex(t => t.id === params.id)
    
    if (index === -1) {
      return HttpResponse.json({ message: 'Not found' }, { status: 404 })
    }

    todos[index] = { ...todos[index], ...body }
    return HttpResponse.json(todos[index])
  }),

  // Delete todo
  http.delete('*/api/todos/:id', ({ params }) => {
    const index = todos.findIndex(t => t.id === params.id)
    
    if (index === -1) {
      return HttpResponse.json({ message: 'Not found' }, { status: 404 })
    }

    todos.splice(index, 1)
    return new HttpResponse(null, { status: 204 })
  })
]

// Helper to reset database between tests
export function resetTodos() {
  todos = [
    { id: '1', text: 'Buy milk', completed: false },
    { id: '2', text: 'Walk dog', completed: false }
  ]
}
```

### File: `src/mocks/server.js`

```javascript
import { setupServer } from 'msw/node'
import { handlers } from './handlers'

export const server = setupServer(...handlers)
```

---

## 6. Test Utilities

### File: `src/test-utils/renderWithStore.jsx`

```jsx
import { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { Provider } from 'react-redux'
import { makeStore } from './makeStore'

export function renderWithStore(ui, { preloadedState, ...renderOptions } = {}) {
  const store = makeStore(preloadedState)

  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions })
  }
}
```

### File: `src/test-utils/makeStore.js`

```javascript
import { createStore, combineReducers } from 'redux'
import { todoReducer } from '../store/reducers/todo.reducer'

const rootReducer = combineReducers({
  todo: todoReducer
  // Add other reducers here as your app grows
})

export function makeStore(preloadedState = {}) {
  return createStore(rootReducer, preloadedState)
}
```

### File: `src/test-utils/test-data.js`

```javascript
// Shared test fixtures
export const mockTodo = {
  id: '1',
  text: 'Test todo',
  completed: false
}

export const mockTodos = [
  mockTodo,
  { id: '2', text: 'Another todo', completed: true }
]

export const mockCompletedTodo = {
  id: '3',
  text: 'Completed task',
  completed: true
}
```

---

## 7. E2E Test Plan (for [app-name]-infra)

### File: `e2e-plans/todo-crud.md`

```markdown
# E2E Test Plan: Todo CRUD Operations

**Status:** ⏳ Pending implementation in [app-name]-infra  
**Created:** 2025-01-16  
**Frontend PR:** #123

## User Journey to Test

1. User navigates to /todos
2. Sees existing todos loaded from backend
3. Clicks "Add Todo" button
4. Types "Buy groceries" in input field
5. Clicks "Add" or presses Enter
6. Sees new todo appear in list
7. Clicks checkbox to mark todo complete
8. Sees strikethrough styling applied
9. Clicks "Delete" button on the todo
10. Confirms deletion
11. Todo disappears from list
12. Refreshes page
13. Deleted todo still gone (persisted to backend)

## Critical Assertions

- [ ] Todo list loads from API on mount
- [ ] New todo appears immediately after creation (optimistic update)
- [ ] Toggle updates both UI and backend
- [ ] Delete removes todo from UI and backend
- [ ] Page refresh loads current state from backend
- [ ] Empty input validation prevents submission
- [ ] Error states display for network failures

## Test Data Requirements

```json
{
  "initialTodos": [
    { "id": "1", "text": "Existing todo", "completed": false }
  ]
}
```

## API Endpoints

- GET /api/todos
- POST /api/todos
- PUT /api/todos/:id
- DELETE /api/todos/:id

## Playwright Selectors

```javascript
const todoInput = page.getByRole('textbox', { name: /new todo/i })
const addButton = page.getByRole('button', { name: /add/i })
const todoItem = page.getByText('Buy groceries')
const checkbox = page.getByRole('checkbox', { name: /buy groceries/i })
const deleteBtn = page.getByRole('button', { name: /delete buy groceries/i })
```

## Edge Cases

1. Empty input submission → Show validation error
2. Network error during create → Show error, don't add to list
3. Network error during delete → Show error, keep in list
4. Rapid clicks on add button → Debounce, only one request

## Implementation Location

`[app-name]-infra/e2e/tests/todos/todo-crud.spec.ts`
```

---

## 8. Configuration Files

### File: `vite.config.ts`

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test-utils/setup.ts']
  }
})
```

### File: `src/test-utils/setup.ts`

```typescript
import '@testing-library/jest-dom'
import { afterAll, afterEach, beforeAll } from 'vitest'
import { server } from '../mocks/server'

// MSW server lifecycle
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
```

---

## Summary

This example demonstrates:

✅ **Plain Redux** (no RTK, no Thunks) - action creators return plain objects  
✅ **Component-type folder structure** - cmps/, pages/, store/, services/  
✅ **MSW for API mocking** - intercept at network layer, not function mocks  
✅ **Real Redux store in tests** - use `makeStore()`, never mock the store  
✅ **AAA pattern** - Arrange, Act, Assert with clear comments  
✅ **Accessibility-first selectors** - getByRole, getByLabel, getByText  
✅ **E2E delegation** - Plan created for infra repo, not implemented here  
✅ **No flaky tests** - Use `waitFor`, `findBy*`, avoid timeouts  
✅ **Immutability checks** - Verify reducers don't mutate state  
✅ **Data-driven tests** - Use `test.each` for multiple scenarios  

**Test Counts:**
- Unit tests: 23 (reducers, actions, service)
- Integration tests: 11 (components + store + MSW)
- E2E plan: 1 (for infra team)
- **Total: 34 tests + 1 E2E plan**

All tests follow the Red-Green-Refactor TDD cycle and are CI/CD-ready.
