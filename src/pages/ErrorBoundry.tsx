import { FallbackProps } from 'react-error-boundary'
import { Link } from 'react-router'
import HomeIcon from '../assets/images/icons/home.svg?react'

export function ErrorFallback({ resetErrorBoundary }: FallbackProps) {
  return (
    <div className="error-container">
      <h2>Something went wrong</h2>
      <button className="btn-neutral" onClick={resetErrorBoundary}>
        Try again
      </button>
      <Link className="link-btn" to="/" aria-label="Go home">
        <HomeIcon width={24} height={24} fill="currentColor" />
        Go home
      </Link>
    </div>
  )
}
