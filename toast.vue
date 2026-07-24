<template>
  <div v-if="message" :class="['toast', type]">
    {{ message }}
  </div>
</template>

<script>
export default {
  name: 'Toast',
  props: {
    message: String,
    type: { type: String, default: 'error' }
  }
}
</script>

<style scoped>
.toast { padding: 12px; border-radius: 6px; margin-bottom: 15px; font-weight: 600; text-align: center; }
.error { background: rgba(225, 29, 72, 0.15); color: #f43f5e; border: 1px solid #f43f5e; }
.success { background: rgba(34, 197, 94, 0.15); color: #22c55e; border: 1px solid #22c55e; }
</style>
