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
      this.user.token = 'etetahauywuyuqywquyuqyuq'
      console.log(this.user)
      sessionStorage.setItem('user', JSON.stringify(this.user))
    },
    logOut() {
      this.user = null
      sessionStorage.removeItem('user')
    },
  },
})
