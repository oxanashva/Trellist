import Axios from 'axios'
import { showErrorMsg } from './event-bus.service'

const BASE_URL = import.meta.env.VITE_API_URL || '/api/'

export const axiosInstance = Axios.create({ baseURL: BASE_URL, withCredentials: true })

// ---------------------------------------------------------------------------
// Module-level refs updated by AxiosInterceptor synchronously on every render.
// Registering the interceptor here (not inside a useEffect) guarantees it is
// in place before any child component fires an API call.
// ---------------------------------------------------------------------------
let _navigate = null
let _dispatch = null

export function registerInterceptorCallbacks(navigate, dispatch) {
    _navigate = navigate
    _dispatch = dispatch
}

axiosInstance.interceptors.response.use(
    (res) => res.data,
    (err) => {
        const status = err.response?.status
        const url = err.config?.url ?? ''

        if (status === 401) {
            sessionStorage.clear()
            localStorage.clear()
            _dispatch?.({ type: 'SET_USER', user: null })
            _dispatch?.({ type: 'SET_BOARD', board: null })
            _navigate?.('/auth/login')
        } else if (status === 403) {
            showErrorMsg("You don't have permission to do that")
        } else if (status === 404) {
            if (url.includes('board/')) {
                _dispatch?.({ type: 'SET_BOARD', board: null })
                showErrorMsg('Board not found')
                _navigate?.('/workspace')
            } else {
                _navigate?.('/404')
            }
        } else if (status === 500) {
            showErrorMsg('Server error, please try again')
            _navigate?.('/error')
        }

        return Promise.reject(err)
    }
)

export const httpService = {
    get(endpoint, data) {
        return axiosInstance.get(endpoint, { params: data })
    },
    post(endpoint, data) {
        return axiosInstance.post(endpoint, data)
    },
    put(endpoint, data) {
        return axiosInstance.put(endpoint, data)
    },
    delete(endpoint, data) {
        return axiosInstance.delete(endpoint, { data })
    },
}
