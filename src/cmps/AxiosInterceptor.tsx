import { type ReactNode } from 'react'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { registerInterceptorCallbacks } from '../services/http.service'

interface Props {
  children: ReactNode
}

/**
 * Wires the module-level Axios error interceptor (registered in http.service.js)
 * to the React Router navigate function and Redux dispatch. Must render inside
 * both <Router> and <Provider>.
 *
 * Calling registerInterceptorCallbacks synchronously (not in a useEffect) ensures
 * the callbacks are always fresh before any child component fires an API call.
 */
export function AxiosInterceptor({ children }: Props) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Synchronous — runs during render, before any child useEffect
  registerInterceptorCallbacks(navigate, dispatch)

  return <>{children}</>
}
