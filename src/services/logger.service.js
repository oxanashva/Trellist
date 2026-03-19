const _apiBase = import.meta.env.VITE_API_URL ?? '/api/'
const BASE_URL = `${_apiBase.endsWith('/') ? _apiBase : `${_apiBase}/`}log`
const remoteEnabled =
    import.meta.env.MODE === 'production' ||
    import.meta.env.VITE_ENABLE_REMOTE_LOGGING === 'true'

// Keys whose values must never appear in logs
const SENSITIVE_PATTERNS = [
    /password/i, /secret/i, /token/i,
    /apikey/i, /api_key/i,
    /cardnumber/i, /creditcard/i, /cvv/i, /pin/i,
    /ssn/i,
]

function isSensitiveKey(key) {
    return SENSITIVE_PATTERNS.some(p => p.test(key))
}

function serializeError(err) {
    return {
        name: err.name,
        message: err.message,
        stack: import.meta.env.MODE !== 'production' ? err.stack : undefined,
        // Preserve Axios-specific fields if present
        status: err.response?.status,
        endpoint: err.config ? `${err.config.method?.toUpperCase()} ${err.config.url}` : undefined,
        code: err.code,
    }
}

export function sanitize(value) {
    if (value instanceof Error) return serializeError(value) // must come before object check
    if (!value || typeof value !== 'object') return value
    if (Array.isArray(value)) return value.map(sanitize)

    return Object.fromEntries(
        Object.entries(value).map(([k, v]) => [
            k,
            isSensitiveKey(k) ? '[REDACTED]' : sanitize(v),
        ])
    )
}

// Structured Loki-compatible payload
function buildLokiPayload(level, safe) {
    // Separate the string message from metadata objects
    const messageParts = []
    const meta = {}

    for (const arg of safe) {
        if (typeof arg === 'string') {
            messageParts.push(arg)
        } else if (arg && typeof arg === 'object') {
            Object.assign(meta, arg)
        }
    }

    return {
        ...meta, // Loki structured fields — queryable via {service="frontend", level="error"}
        level,
        message: messageParts.join(' '), // clean string — good for Loki line
        timestamp: new Date().toISOString(),
        url: location.pathname,
    }
}

function doLog(level, ...args) {
    const safe = args.map(sanitize)

    if (import.meta.env.MODE === 'development') {
        console[level](...safe)
    }

    if (!remoteEnabled) return

    const payload = buildLokiPayload(level, safe)

    fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    }).catch(() => { })
}

export const logger = {
    debug: (...args) => doLog('debug', ...args),
    info: (...args) => doLog('info', ...args),
    warn: (...args) => doLog('warn', ...args),
    error: (...args) => doLog('error', ...args),
}