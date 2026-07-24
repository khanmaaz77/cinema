<template>
  <div v-if="movie" class="booking-wrapper">
    <h2>Book Tickets for {{ movie.title }}</h2>

    <div class="selection-grid">
      <!-- Left Config Controls -->
      <div class="card panel">
        <h3>1. Select Cinema & Time</h3>
        
        <div class="control">
          <label>Cinema Hall & City:</label>
          <select v-model="selectedCinema">
            <option v-for="c in cinemas" :key="c.id" :value="c.name">
              {{ c.name }} ({{ c.city }})
            </option>
          </select>
        </div>

        <div class="control">
          <label>Showtime:</label>
          <select v-model="selectedShow">
            <option v-for="time in movie.shows" :key="time" :value="time">{{ time }}</option>
          </select>
        </div>

        <div class="control">
          <label>Number of People:</label>
          <input type="number" min="1" max="10" v-model.number="ticketCount" />
        </div>

        <h3>2. Select Seats</h3>
        <SeatSelector :maxAllowed="ticketCount" @update-seats="selectedSeats = $event" />
      </div>

      <!-- Right Summary & Payment -->
      <div class="card panel">
        <FoodMenu :foods="foods" @update-food-selection="selectedFoods = $event" />

        <hr class="divider" />

        <h3>3. Bill Summary</h3>
        <div class="bill-row">
          <span>Tickets ({{ selectedSeats.length }}x ₹{{ movie.ticketPrice }}):</span>
          <span>₹{{ baseTicketCost }}</span>
        </div>
        <div class="bill-row" v-if="foodCost > 0">
          <span>Food & Beverages:</span>
          <span>₹{{ foodCost }}</span>
        </div>
        <div class="bill-row">
          <span>GST Taxes & Fees (18%):</span>
          <span>₹{{ taxCost }}</span>
        </div>
        <div class="bill-row discount" v-if="discount > 0">
          <span>Offer Discount:</span>
          <span>-₹{{ discount }}</span>
        </div>

        <!-- Promo Offer -->
        <div class="promo-box">
          <input v-model="promoCode" placeholder="Enter CINEMA50" />
          <button class="btn-sm" @click="applyOffer">Apply</button>
        </div>

        <div class="total-row">
          <span>Total Payable Amount:</span>
          <span class="total-price">₹{{ finalTotal }}</span>
        </div>

        <div class="control margin-top">
          <label>Payment Method:</label>
          <select v-model="paymentMethod">
            <option value="UPI">UPI / GPay / PhonePe</option>
            <option value="Credit/Debit Card">Credit or Debit Card</option>
            <option value="NetBanking">Net Banking</option>
          </select>
        </div>

        <button 
          class="btn full-width margin-top" 
          :disabled="selectedSeats.length !== ticketCount"
          @click="confirmBooking"
        >
          Pay ₹{{ finalTotal }} & Confirm
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchMovieById, fetchCinemas, fetchFoods, saveBooking } from '../services/api'
import { getCurrentUser } from '../services/auth'
import SeatSelector from '../components/SeatSelector.vue'
import FoodMenu from '../components/FoodMenu.vue'

export default {
  name: 'BookingView',
  components: { SeatSelector, FoodMenu },
  data() {
    return {
      movie: null,
      cinemas: [],
      foods: [],
      selectedCinema: '',
      selectedShow: '',
      ticketCount: 1,
      selectedSeats: [],
      selectedFoods: [],
      promoCode: '',
      discount: 0,
      paymentMethod: 'UPI'
    }
  },
  computed: {
    baseTicketCost() {
      return (this.selectedSeats.length || 0) * (this.movie ? this.movie.ticketPrice : 0)
    },
    foodCost() {
      return this.selectedFoods.reduce((sum, item) => sum + (item.price * item.qty), 0)
    },
    taxCost() {
      return Math.round((this.baseTicketCost + this.foodCost) * 0.18)
    },
    finalTotal() {
      const gross = this.baseTicketCost + this.foodCost + this.taxCost
      return Math.max(0, gross - this.discount)
    }
  },
  async mounted() {
    const movieId = this.$route.params.id
    this.movie = await fetchMovieById(movieId)
    this.cinemas = await fetchCinemas()
    this.foods = await fetchFoods()

    if (this.cinemas.length) this.selectedCinema = this.cinemas[0].name
    if (this.movie.shows.length) this.selectedShow = this.movie.shows[0]
  },
  methods: {
    applyOffer() {
      if (this.promoCode.trim().toUpperCase() === 'CINEMA50') {
        this.discount = 50
      } else {
        alert('Invalid Promo Code. Try "CINEMA50"')
      }
    },
    async confirmBooking() {
      const user = getCurrentUser()
      const payload = {
        userId: user.id,
        movieTitle: this.movie.title,
        cinema: this.selectedCinema,
        showtime: this.selectedShow,
        seats: this.selectedSeats,
        foods: this.selectedFoods.map(f => `${f.name} x${f.qty}`),
        paymentMethod: this.paymentMethod,
        totalAmount: this.finalTotal,
        bookingDate: new Date().toLocaleDateString()
      }

      await saveBooking(payload)
      this.$router.push('/profile')
    }
  }
}
</script>

<style scoped>
.booking-wrapper { margin-top: 10px; }
.selection-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 15px; }
.panel { padding: 20px; display: flex; flex-direction: column; gap: 15px; }
.control { display: flex; flex-direction: column; gap: 5px; text-align: left; }
select, input { padding: 8px 12px; background: var(--bg-color); color: var(--text-main); border: 1px solid var(--border-color); border-radius: 6px; }
.divider { border: 0; border-top: 1px solid var(--border-color); margin: 10px 0; }
.bill-row { display: flex; justify-content: space-between; font-size: 0.95rem; }
.discount { color: var(--accent); }
.promo-box { display: flex; gap: 10px; margin-top: 5px; }
.promo-box input { flex-grow: 1; }
.btn-sm { background: var(--border-color); color: var(--text-main); padding: 8px 12px; border-radius: 6px; }
.total-row { display: flex; justify-content: space-between; font-weight: bold; font-size: 1.1rem; margin-top: 10px; }
.total-price { color: var(--accent); }
.full-width { width: 100%; }
.margin-top { margin-top: 10px; }
</style>
