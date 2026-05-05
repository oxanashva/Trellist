import { describe, test, expect } from 'vitest'
import { render, screen } from '../test-utils/renderWithProviders'
import { ErrorPage } from './ErrorPage'

describe('ErrorPage', () => {
  test('renders generic "something went wrong" message by default', () => {
    // Arrange + Act
    render(<ErrorPage />)

    // Assert
    expect(screen.getByRole('heading', { name: /something went wrong/i })).toBeInTheDocument()
  })

  test('renders "forbidden" message for type=forbidden', () => {
    // Arrange + Act
    render(<ErrorPage type='forbidden' />)

    // Assert
    expect(screen.getByRole('heading', { name: /access denied/i })).toBeInTheDocument()
    expect(screen.getByText(/don't have permission/i)).toBeInTheDocument()
  })

  test('renders "server error" message for type=server-error', () => {
    // Arrange + Act
    render(<ErrorPage type='server-error' />)

    // Assert
    expect(screen.getByRole('heading', { name: /server error/i })).toBeInTheDocument()
    expect(screen.getByText(/try again/i)).toBeInTheDocument()
  })

  test('renders a home navigation link', () => {
    // Arrange + Act
    render(<ErrorPage />)

    // Assert — link must be a React Router link (renders as <a> with href, not hard reload)
    const link = screen.getByRole('link', { name: /go home/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/')
  })
})
