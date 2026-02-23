const BASE_URL = (import.meta.env.VITE_API_URL || '') + '/api/log'
const remoteEnabled =
    import.meta.env.MODE === 'production' ||
    import.meta.env.VITE_ENABLE_REMOTE_LOGGING === 'true'

const SENSITIVE_KEYS = new Set([
    'password', 'newPassword', 'confirmPassword', 'token', 'secret',
])

function sanitize(args) {
    return args.map(a => {
        if (!a || typeof a !== 'object') return a
        const copy = { ...a }
        SENSITIVE_KEYS.forEach(k => { if (k in copy) copy[k] = '[REDACTED]' })
        return copy
    })
}

function doLog(level, ...args) {
    // Always log to browser console for local debugging
    const safe = sanitize(args)
    console[level](...safe)

    if (!remoteEnabled) return

    const message = safe
        .map(a => (typeof a === 'string' ? a : JSON.stringify(a)))
        .join(' | ')

    // Fire-and-forget: do not await, do not let logging slow down the UI
    fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ level, message, timestamp: Date.now(), url: location.pathname }),
    }).catch(() => {}) // fail silently to avoid infinite error loops
}

export const logger = {
    debug: (...args) => doLog('debug', ...args),
    info:  (...args) => doLog('info',  ...args),
    warn:  (...args) => doLog('warn',  ...args),
    error: (...args) => doLog('error', ...args),
}
