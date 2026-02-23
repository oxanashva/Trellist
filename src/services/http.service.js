import Axios from 'axios'
import { logger } from './logger.service.js'

const BASE_URL = import.meta.env.VITE_API_URL || '/api/'

const axios = Axios.create({ withCredentials: true })

export const httpService = {
    get(endpoint, data) {
        return ajax(endpoint, 'GET', data)
    },
    post(endpoint, data) {
        return ajax(endpoint, 'POST', data)
    },
    put(endpoint, data) {
        return ajax(endpoint, 'PUT', data)
    },
    delete(endpoint, data) {
        return ajax(endpoint, 'DELETE', data)
    },
}

async function ajax(endpoint, method = 'GET', data = null) {
    const url = `${BASE_URL}${endpoint}`
    const params = method === 'GET' ? data : null

    try {
        const res = await axios({ url, method, data, params })
        return res.data
    } catch (err) {
        const status = err.response?.status
        // Pull the structured message our centralized error handler sends.
        // This is already sanitized by the backend — no stack traces or internals.
        const serverMsg = err.response?.data?.error

        logger.error(`HTTP ${method} ${endpoint} failed`, { status })

        if (status === 401) {
            sessionStorage.clear()
            window.location.assign('/')
        }

        // Throw a clean Error. Callers get a readable message; raw axios
        // internals (stack traces, config objects) never propagate to the UI.
        throw new Error(serverMsg || `Request failed: ${method} ${endpoint}`)
    }
}
