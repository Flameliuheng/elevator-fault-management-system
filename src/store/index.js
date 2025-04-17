import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    role: null
  }),
  actions: {
    login(userData) {
      this.user = userData.username
      this.isAuthenticated = true
      this.role = userData.role
      localStorage.setItem('auth', JSON.stringify(userData))
    },
    logout() {
      this.user = null
      this.isAuthenticated = false
      this.role = null
      localStorage.removeItem('auth')
    },
    initialize() {
      const auth = localStorage.getItem('auth')
      if (auth) {
        const userData = JSON.parse(auth)
        this.user = userData.username
        this.isAuthenticated = true
        this.role = userData.role
      }
    }
  }
})