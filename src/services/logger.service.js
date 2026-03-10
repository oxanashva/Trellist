const BASE_URL = (import.meta.env.VITE_API_URL ?? '/api/') + 'log'
const remoteEnabled =
    import.meta.env.MODE === 'production' ||
    import.meta.env.VITE_ENABLE_REMOTE_LOGGING === 'true'

const SENSITIVE_PATTERNS = [
    /password/i,
    /token/i,
    /secret/i,
    /apikey/i,
    /sessionId/i,
    /ssn/i,
    /cardnumber/i,
    /creditcard/i,
    /cvv/i,
    /pin/i,
    /phone/i,
    /email/i,
    // add more
]

function isSensitiveKey(key) {
    return SENSITIVE_PATTERNS.some(pattern => pattern.test(key))
}

function sanitize(value) {
    if (!value || typeof value !== 'object') return value

    if (Array.isArray(value)) return value.map(sanitize)

    return Object.fromEntries(
        Object.entries(value).map(([k, v]) => [
            k,
            isSensitiveKey(k) ? '[REDACTED]' : sanitize(v)
        ])
    )
}

function doLog(level, ...args) {
    // Always log to browser console for local debugging
    const safe = args.map(sanitize)
    console[level](...safe)

    if (!remoteEnabled) return

    const message = safe
        .map(a => (typeof a === 'string' ? a : JSON.stringify(a)))
        .join(' | ')

    // Fire-and-forget: do not await, do not let logging slow down the UI
    fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ level, message, timestamp: new Date().toISOString(), url: location.pathname }),
    }).catch(() => { }) // fail silently to avoid infinite error loops
}

export const logger = {
    debug: (...args) => doLog('debug', ...args),
    info: (...args) => doLog('info', ...args),
    warn: (...args) => doLog('warn', ...args),
    error: (...args) => doLog('error', ...args),
}
