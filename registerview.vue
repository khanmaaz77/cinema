<template>
  <div class="auth-card card">
    <h2>Create Account</h2>
    <Toast v-if="error" :message="error" />
    <form @submit.prevent="handleRegister">
      <div class="form-group">
        <label>Full Name</label>
        <input v-model="name" type="text" placeholder="John Doe" required />
      </div>
      <div class="form-group">
        <label>Email</label>
        <input v-model="email" type="email" placeholder="john@example.com" required />
      </div>
      <div class="form-group">
        <label>Password</label>
        <input v-model="password" type="password" required />
      </div>
      <button type="submit" class="btn">Register</button>
    </form>
  </div>
</template>

<script>
import { registerUser } from '../services/auth'
import Toast from '../components/Toast.vue'

export default {
  name: 'RegisterView',
  components: { Toast },
  data() {
    return { name: '', email: '', password: '', error: null }
  },
  methods: {
    async handleRegister() {
      try {
        await registerUser({ name: this.name, email: this.email, password: this.password })
        this.$router.push('/')
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
