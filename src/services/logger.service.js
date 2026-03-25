import { parseLogArgs } from './logger.shared.js'

const _apiBase = import.meta.env.VITE_API_URL ?? '/api/'
const BASE_URL = `${_apiBase.endsWith('/') ? _apiBase : `${_apiBase}/`}log`

const remoteEnabled =
    import.meta.env.MODE === 'production' ||
    import.meta.env.VITE_ENABLE_REMOTE_LOGGING === 'true'

const isDev = import.meta.env.MODE !== 'production'

// ---------------------------------------------------------------------------
// Core log dispatcher
// ---------------------------------------------------------------------------

function doLog(level, ...args) {
    const { message, errorFields, metaFields } = parseLogArgs(args, isDev)

    const payload = {
        // Loki-queryable base fields
        level,
        service: 'frontend',
        timestamp: new Date().toISOString(),
        // Page context — frontend equivalent of requestId
        url: location.pathname,
        // Flat error fields (prefixed error_*) + caller-supplied meta
        ...errorFields,
        ...metaFields,
        // Message last so it isn't shadowed by a meta field named 'message'
        message,
    }

    if (isDev) {
        // Pretty-print in the browser console; show all fields for visibility
        console[level]?.(`[${level.toUpperCase()}]`, message, { ...errorFields, ...metaFields })
    }

    if (!remoteEnabled) return

    fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    }).catch(() => { /* transport errors are intentionally swallowed */ })
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Frontend logger.
 * Ships structured JSON to the backend `/log` endpoint in production.
 * Falls back to console-only in development.
 *
 * Accepts the same variadic contract as the backend logger:
 *   logger.info('message')
 *   logger.error('Fetch failed', err)
 *   logger.warn('Slow render', err, { componentId, renderMs })
 *
 * Sensitive fields (password, token, …) are automatically redacted.
 * Error objects are flattened into flat `error_*` fields — Loki-safe.
 *
 * @example
 * logger.info('User signed in', { userId })
 * logger.error('API call failed', err, { endpoint: '/api/boards' })
 */
export const logger = {
    debug: (...args) => doLog('debug', ...args),
    info: (...args) => doLog('info', ...args),
    warn: (...args) => doLog('warn', ...args),
    error: (...args) => doLog('error', ...args),
}
