import { defineStore } from 'pinia'
import type { IUser } from '@/models/User'
import api from '@/services/http'
import { showToast } from '@/services/app-service'

function getUserFromSession(): IUser | null {
  const userData = sessionStorage.getItem('user')
  return userData ? JSON.parse(userData) : null
}

export const userStore = defineStore('user', {
  state: () => ({
    // Initialize user state from sessionStorage
    user: getUserFromSession() || null,
    loading: false,
  }),
  actions: {
    async login(data: unknown | null) {
      this.loading = true
      try {
        const response = await api.post('/auth/login', data)
        this.user = response.data.Payload
        sessionStorage.setItem('user', JSON.stringify(this.user))
        this.loading = false
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        showToast(error.message, 'error')
        this.loading = false
      }
    },
    async register(data: unknown | null) {
      this.loading = true
      try {
        const response = await api.post('/auth/register', data)
        this.user = response.data.Payload
        sessionStorage.setItem('user', JSON.stringify(this.user))
        this.loading = false
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.log(error)
        showToast(error.message, 'error')
        this.loading = false
      }
    },
    logOut() {
      this.user = null
      sessionStorage.removeItem('user')
    },
  },
  getters: {
    isAuthenticated: state => {
      console.log('Checking authentication:', state.user) // Debugging line
      return state.user && !!state.user.token // Adjusted to check user and token
    },
    getUser: state => state.user,
    userRole: state => state.user?.role || null,
  },
})
