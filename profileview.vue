<template>
  <div>
    <h2>Your Booking History</h2>
    <div v-if="bookings.length === 0" class="no-history">
      <p>No bookings found.</p>
    </div>

    <div v-else class="history-list">
      <div v-for="b in bookings" :key="b.id" class="card history-card">
        <div class="ticket-header">
          <h3>{{ b.movieTitle }}</h3>
          <span class="badge">{{ b.bookingDate }}</span>
        </div>
        <p><strong>Cinema:</strong> {{ b.cinema }}</p>
        <p><strong>Showtime:</strong> {{ b.showtime }}</p>
        <p><strong>Seats:</strong> {{ b.seats.join(', ') }}</p>
        <p v-if="b.foods && b.foods.length"><strong>Food Items:</strong> {{ b.foods.join(', ') }}</p>
        <div class="ticket-footer">
          <span>Paid via {{ b.paymentMethod }}</span>
          <span class="amount">₹{{ b.totalAmount }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchBookingsByUserId } from '../services/api'
import { getCurrentUser } from '../services/auth'

export default {
  name: 'ProfileView',
  data() {
    return { bookings: [] }
  },
  async mounted() {
    const user = getCurrentUser()
    if (user) {
      this.bookings = await fetchBookingsByUserId(user.id)
    }
  }
}
</script>

<style scoped>
.no-history { padding: 40px; text-align: center; color: var(--text-sub); }
.history-list { display: flex; flex-direction: column; gap: 15px; margin-top: 20px; }
.history-card { padding: 20px; display: flex; flex-direction: column; gap: 8px; text-align: left; }
.ticket-header { display: flex; justify-content: space-between; align-items: center; }
.badge { background: var(--border-color); padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; }
.ticket-footer { display: flex; justify-content: space-between; font-weight: bold; margin-top: 10px; border-top: 1px dashed var(--border-color); padding-top: 10px; }
.amount { color: var(--accent); }
</style>
