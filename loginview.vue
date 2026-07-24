<template>
  <div class="auth-card card">
    <h2>Login to CineMax</h2>
    <Toast v-if="error" :message="error" />
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label>Email Address</label>
        <input v-model="email" type="email" placeholder="enter email" required />
      </div>
      <div class="form-group">
        <label>Password</label>
        <input v-model="password" type="password" placeholder="enter password" required />
      </div>
      <button type="submit" class="btn">Login</button>
    </form>
  </div>
</template>

<script>
import { loginUser } from '../services/auth'
import Toast from '../components/Toast.vue'

export default {
  name: 'LoginView',
  components: { Toast },
  data() {
    return { email: '', password: '', error: null }
  },
  methods: {
    async handleLogin() {
      try {
        await loginUser(this.email, this.password)
        const redirect = this.$route.query.redirect || '/'
        this.$router.push(redirect)
      } catch (err) {
        this.error = err.message
      }
    }
  }
}
</script>

<style scoped>
.auth-card { max-width: 400px; margin: 40px auto; padding: 30px; }
form { display: flex; flex-direction: column; gap: 15px; margin-top: 15px; }
.form-group { display: flex; flex-direction: column; gap: 5px; }
input { padding: 10px; background: var(--bg-color); color: var(--text-main); border: 1px solid var(--border-color); border-radius: 6px; }
</style>
