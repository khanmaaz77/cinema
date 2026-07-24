<template>
  <nav class="navbar">
    <div class="nav-brand">
      <router-link to="/" class="logo">🎬 CineMax</router-link>
    </div>

    <div class="nav-links">
      <router-link to="/">Latest Movies</router-link>
      <router-link to="/help">Helpline</router-link>

      <template v-if="user">
        <router-link to="/profile">Booking History</router-link>
        <span class="user-greeting">Hi, {{ user.name }}</span>
        <button class="btn-text" @click="handleLogout">Logout</button>
      </template>

      <template v-else>
        <router-link to="/login">Login</router-link>
        <router-link to="/register" class="btn">Register</router-link>
      </template>

      <button class="theme-toggle" @click="toggleTheme">
        {{ isDark ? '☀️ Light' : '🌙 Dark' }}
      </button>
    </div>
  </nav>
</template>

<script>
import { getCurrentUser, logoutUser } from '../services/auth'

export default {
  name: 'Navbar',
  data() {
    return {
      user: null,
      isDark: true
    }
  },
  mounted() {
    this.user = getCurrentUser()
    const savedTheme = localStorage.getItem('theme') || 'dark'
    this.isDark = savedTheme === 'dark'
    document.documentElement.setAttribute('data-theme', savedTheme)
  },
  watch: {
    $route() {
      this.user = getCurrentUser()
    }
  },
  methods: {
    handleLogout() {
      logoutUser()
      this.user = null
      this.$router.push('/')
    },
    toggleTheme() {
      this.isDark = !this.isDark
      const theme = this.isDark ? 'dark' : 'light'
      document.documentElement.setAttribute('data-theme', theme)
      localStorage.setItem('theme', theme)
    }
  }
}
</script>

<style scoped>
.navbar { display: flex; justify-content: space-between; align-items: center; padding: 15px 30px; background-color: var(--card-bg); border-bottom: 1px solid var(--border-color); }
.logo { font-size: 1.4rem; font-weight: 800; color: var(--primary); }
.nav-links { display: flex; gap: 20px; align-items: center; }
.user-greeting { color: var(--accent); font-weight: 600; }
.btn-text { background: none; color: var(--text-sub); }
.btn-text:hover { color: var(--text-main); }
.theme-toggle { padding: 6px 12px; background: var(--border-color); color: var(--text-main); border-radius: 20px; font-size: 0.85rem; }
</style>
