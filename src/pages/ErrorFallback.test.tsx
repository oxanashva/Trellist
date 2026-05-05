import { describe, test, expect, vi } from 'vitest'
import { render, screen } from '../test-utils/renderWithProviders'
import userEvent from '@testing-library/user-event'
import { ErrorFallback } from './ErrorBoundry'

describe('ErrorFallback', () => {
  const mockError = new Error('Test runtime error')

  test('renders "Something went wrong" heading', () => {
    // Arrange + Act
    render(<ErrorFallback error={mockError} resetErrorBoundary={vi.fn()} />)

    // Assert
    expect(screen.getByRole('heading', { name: /something went wrong/i })).toBeInTheDocument()
  })

  test('"Try again" button calls resetErrorBoundary', async () => {
    // Arrange
    const user = userEvent.setup()
    const resetFn = vi.fn()
    render(<ErrorFallback error={mockError} resetErrorBoundary={resetFn} />)

    // Act
    await user.click(screen.getByRole('button', { name: /try again/i }))

    // Assert
    expect(resetFn).toHaveBeenCalledTimes(1)
  })

  test('renders a home navigation link (React Router, not hard reload)', () => {
    // Arrange + Act
    render(<ErrorFallback error={mockError} resetErrorBoundary={vi.fn()} />)

    // Assert — must be an <a> rendered by React Router Link, not a raw <a href>
    const link = screen.getByRole('link', { name: /go home/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/')
  })
})
