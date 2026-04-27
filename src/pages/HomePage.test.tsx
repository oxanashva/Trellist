import { render, screen } from '../test-utils/renderWithProviders'
import { HomePage } from './HomePage'

// Unit Test: Simple Component
it('renders the correct app header', () => {
  render(<HomePage />)
  const headerElement = screen.getByText(/trellis/i)
  expect(headerElement).toBeInTheDocument()
})
