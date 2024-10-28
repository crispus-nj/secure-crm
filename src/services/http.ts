import axios from 'axios'

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const api = axios.create({
  // baseURL: API_BASE_URL,
  baseURL: 'http://localhost:8000',
  // http://localhost:8000
})

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  },
)

export default api