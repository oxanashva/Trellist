import { render, screen } from '../test-utils/renderWithProviders'
import { http, HttpResponse } from 'msw'
import { server } from '../mocks/server'
import { BoardIndex} from './BoardIndex'
import { UserMsg } from '../cmps/UserMsg'

// Integration Test: Axios + MSW
it('fetches and displays boards', async () => {
  render(<BoardIndex />)
  
  // Wait for the async MSW response to hit the UI
  const heading = await screen.findByText('Your boards')
  expect(heading).toBeInTheDocument()
})

it('displays an error message when the API fails', async () => {
  // Override the default handler for just this test
  server.use(
    http.get('api/board', () => {
      return new HttpResponse(null, { status: 500 })
    })
  )

  render(
    <>
      <BoardIndex />
      <UserMsg />
    </>
  )
  
  const error = await screen.findByText(/cannot load boards/i)
  expect(error).toBeInTheDocument()
})