import axios from 'axios'

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const api = axios.create({
  // baseURL: API_BASE_URL,
  // baseURL: 'http://192.168.0.110:8000',
  baseURL: 'https://access-control-module.onrender.com',
})

api.interceptors.request.use(
  config => {
    const user = JSON.parse(sessionStorage.getItem('user')!)
    const token = user?.token
    if (token) {
      console.log(token)
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  },
)

export default api
