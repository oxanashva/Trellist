### Integration Test: Component + Store + MSW

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
