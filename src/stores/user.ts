import { defineStore } from 'pinia'
import type { IUser } from '@/models/user.interface'
import api from '@/services/http'

function getUserFromSession(): IUser | null {
  const userData = sessionStorage.getItem('user')
  return userData ? JSON.parse(userData) : null
}

export const userStore = defineStore('user', {
  state: () => ({
    // Initialize user state from sessionStorage
    user: getUserFromSession() || null,
  }),
  actions: {
    async login(data: unknown | null) {
      try {
        const response = await api.post('/auth/login', data)
        this.user = response.data.Payload
        sessionStorage.setItem('user', JSON.stringify(this.user))
      } catch (error: unknown) {
        console.log(error)
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
