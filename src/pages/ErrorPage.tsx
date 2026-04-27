import { Link } from 'react-router'
import HomeIcon from '../assets/images/icons/home.svg?react'

type ErrorType = 'forbidden' | 'server-error' | 'unknown'

const errorContent: Record<ErrorType, { heading: string; message: string }> = {
  forbidden: {
    heading: 'Access denied',
    message: "You don't have permission to view this page.",
  },
  'server-error': {
    heading: 'Server error',
    message: 'Something went wrong on our end. Please try again in a moment.',
  },
  unknown: {
    heading: 'Something went wrong',
    message: 'An unexpected error occurred.',
  },
}

interface Props {
  type?: ErrorType
}

export function ErrorPage({ type = 'unknown' }: Props) {
  const { heading, message } = errorContent[type]

  return (
    <div className="error-container">
      <h2>{heading}</h2>
      <p>{message}</p>
      <Link className="link-btn" to="/" aria-label="Go home">
        <HomeIcon width={24} height={24} fill="currentColor" />
        <span>Go home</span>
      </Link>
    </div>
  )
}
