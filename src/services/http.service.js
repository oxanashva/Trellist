import Axios from 'axios'
import { logger } from './logger.service.js'

const BASE_URL = import.meta.env.VITE_API_URL || '/api/'

const axios = Axios.create({ baseURL: BASE_URL, withCredentials: true })

axios.interceptors.response.use(
    (res) => res.data,
    (err) => {
        const { response, config } = err
        const status = response?.status
        const serverMsg = response?.data?.error
        const requestId = response?.data?.requestId

        const method = config?.method?.toUpperCase() ?? 'UNKNOWN'
        const url = config?.url ?? 'UNKNOWN'

        logger.error(`HTTP ${method} ${url} failed`, { status, requestId })

        if (status === 401) {
            sessionStorage.clear();
            window.location.assign('/')
        }

        throw new Error(serverMsg || `Request failed: ${method} ${url}`)
    }
)

export const httpService = {
    get(endpoint, data) {
        return axios.get(endpoint, { params: data })
    },
    post(endpoint, data) {
        return axios.post(endpoint, data)
    },
    put(endpoint, data) {
        return axios.put(endpoint, data)
    },
    delete(endpoint, data) {
        return axios.delete(endpoint, { data })
    },
}