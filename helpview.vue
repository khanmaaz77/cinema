<template>
  <div class="card help-box">
    <h2>Helpline & Support</h2>
    <p class="subtitle">We're here to help you with your booking issues.</p>

    <div class="support-channels">
      <div class="channel">
        <h4>📞 Phone Support</h4>
        <p>1800-123-CINEMA (Toll Free)</p>
      </div>
      <div class="channel">
        <h4>✉️ Email Support</h4>
        <p>support@cinemax.com</p>
      </div>
    </div>

    <form @submit.prevent="submitQuery" class="help-form">
      <h3>Submit Your Inquiry</h3>
      <input v-model="queryText" placeholder="Describe your issue..." required />
      <button class="btn" type="submit">Submit Ticket</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'HelpView',
  data() {
    return { queryText: '' }
  },
  methods: {
    submitQuery() {
      alert('Your inquiry has been submitted! Our support team will get back to you shortly.')
      this.queryText = ''
    }
  }
}
</script>

<style scoped>
.help-box { max-width: 600px; margin: 30px auto; padding: 30px; text-align: left; }
.subtitle { color: var(--text-sub); margin-bottom: 20px; }
.support-channels { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px; }
.channel { padding: 15px; background: var(--bg-color); border-radius: 6px; }
.help-form { display: flex; flex-direction: column; gap: 10px; }
input { padding: 10px; background: var(--bg-color); color: var(--text-main); border: 1px solid var(--border-color); border-radius: 6px; }
</style>
