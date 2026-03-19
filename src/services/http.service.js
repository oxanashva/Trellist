import Axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || '/api/'

const axios = Axios.create({ baseURL: BASE_URL, withCredentials: true })

axios.interceptors.response.use(
    (res) => res.data,
    (err) => {
        const { response } = err
        const status = response?.status

        if (status === 401) {
            sessionStorage.clear();
            localStorage.clear();
            window.location.assign('/')
        }

        return Promise.reject(err)
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