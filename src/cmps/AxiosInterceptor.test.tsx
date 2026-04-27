import { vi, describe, test, expect, beforeEach } from 'vitest'
import { render, screen, waitFor } from '../test-utils/renderWithProviders'
import { http, HttpResponse } from 'msw'
import { server } from '../mocks/server'
import { useState, useEffect } from 'react'
import { AxiosInterceptor } from './AxiosInterceptor'
import { httpService } from '../services/http.service'

// ---------------------------------------------------------------------------
// Mock useNavigate so navigation can be asserted without DOM routing.
// We test that AxiosInterceptor CALLS navigate with the right path — testing
// React Router's DOM rendering is out of scope for this unit.
// ---------------------------------------------------------------------------
const mockNavigate = vi.fn()
vi.mock('react-router', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router')>()
  return { ...actual, useNavigate: () => mockNavigate }
})

// ---------------------------------------------------------------------------
// Helper: fires one GET call on mount, reflects result as text
// ---------------------------------------------------------------------------
function ApiTrigger({ endpoint }: { endpoint: string }) {
  const [status, setStatus] = useState<'idle' | 'ok' | 'error'>('idle')

  useEffect(() => {
    httpService
      .get(endpoint)
      .then(() => setStatus('ok'))
      .catch(() => setStatus('error'))
  }, [endpoint])

  return <span data-testid="api-status">{status}</span>
}

function TestApp({ endpoint }: { endpoint: string }) {
  return (
    <AxiosInterceptor>
      <ApiTrigger endpoint={endpoint} />
    </AxiosInterceptor>
  )
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('AxiosInterceptor', () => {
  beforeEach(() => {
    sessionStorage.clear()
    localStorage.clear()
    mockNavigate.mockReset()
  })

  // ----- 401 ----------------------------------------------------------------

  describe('401 Unauthorized', () => {
    test('navigates to /auth/login', async () => {
      server.use(http.get('/api/board', () => new HttpResponse(null, { status: 401 })))

      render(<TestApp endpoint="board" />)

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/auth/login')
      })
    })

    test('clears sessionStorage', async () => {
      sessionStorage.setItem('loggedinUser', JSON.stringify({ _id: 'u1' }))
      server.use(http.get('/api/board', () => new HttpResponse(null, { status: 401 })))

      render(<TestApp endpoint="board" />)
      await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/auth/login'))

      expect(sessionStorage.getItem('loggedinUser')).toBeNull()
    })

    test('clears localStorage', async () => {
      localStorage.setItem('cachedData', 'some-value')
      server.use(http.get('/api/board', () => new HttpResponse(null, { status: 401 })))

      render(<TestApp endpoint="board" />)
      await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/auth/login'))

      expect(localStorage.getItem('cachedData')).toBeNull()
    })

    test('resets user in Redux store', async () => {
      server.use(http.get('/api/board', () => new HttpResponse(null, { status: 401 })))
      const { store } = render(<TestApp endpoint="board" />, {
        preloadedState: {
          userModule: { user: { _id: 'u1', fullname: 'Test User' }, users: [], watchedUser: null },
        },
      })

      await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/auth/login'))

      expect(store.getState().userModule.user).toBeNull()
    })
  })

  // ----- 403 ----------------------------------------------------------------

  describe('403 Forbidden', () => {
    test('does NOT navigate away', async () => {
      server.use(http.get('/api/board', () => new HttpResponse(null, { status: 403 })))

      render(<TestApp endpoint="board" />)

      await waitFor(() => {
        expect(screen.getByTestId('api-status')).toHaveTextContent('error')
      })

      expect(mockNavigate).not.toHaveBeenCalled()
    })
  })

  // ----- 404 ----------------------------------------------------------------

  describe('404 Not Found', () => {
    test('navigates to /workspace when a board endpoint returns 404', async () => {
      server.use(http.get('/api/board/b123', () => new HttpResponse(null, { status: 404 })))

      render(<TestApp endpoint="board/b123" />)

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/workspace')
      })
    })

    test('clears board from Redux store when board 404 occurs', async () => {
      server.use(http.get('/api/board/b123', () => new HttpResponse(null, { status: 404 })))
      const { store } = render(<TestApp endpoint="board/b123" />, {
        preloadedState: {
          boardModule: {
            board: { _id: 'b123', name: 'Old Board' },
            boards: [],
            boardBackground: {},
            isLoading: false,
          },
        },
      })

      await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/workspace'))

      expect(store.getState().boardModule.board).toBeNull()
    })

    test('navigates to /404 when a non-board endpoint returns 404', async () => {
      server.use(http.get('/api/user/u999', () => new HttpResponse(null, { status: 404 })))

      render(<TestApp endpoint="user/u999" />)

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/404')
      })
    })
  })

  // ----- 500 ----------------------------------------------------------------

  describe('500 Server Error', () => {
    test('navigates to /error', async () => {
      server.use(http.get('/api/board', () => new HttpResponse(null, { status: 500 })))

      render(<TestApp endpoint="board" />)

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/error')
      })
    })
  })
})
