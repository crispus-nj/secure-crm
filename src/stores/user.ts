import { defineStore } from 'pinia'
import type { IUser } from '@/models/user.interface'

// Create a function to get the user from sessionStorage
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
    login(data: IUser) {
      // Assign the user data to the state
      this.user = data ?? null
      if (this.user) {
        // Ensure the token is correctly set
        this.user.token = 'etetahauywuyuqywquyuqyuq'
        sessionStorage.setItem('user', JSON.stringify(this.user))
      }
      console.log('User logged in:', this.user) // Debugging line
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
