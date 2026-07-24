<template>
  <div class="seat-picker">
    <div class="screen-indicator">SCREEN THIS WAY</div>
    
    <div class="seat-grid">
      <button
        v-for="seat in totalSeats"
        :key="seat"
        :class="['seat-btn', { selected: selectedSeats.includes(seat) }]"
        :disabled="selectedSeats.length >= maxAllowed && !selectedSeats.includes(seat)"
        @click="toggleSeat(seat)"
      >
        {{ seat }}
      </button>
    </div>

    <div class="legend">
      <span><i class="box available"></i> Available</span>
      <span><i class="box selected"></i> Selected ({{ selectedSeats.length }}/{{ maxAllowed }})</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SeatSelector',
  props: {
    maxAllowed: { type: Number, required: true },
    totalSeats: { type: Number, default: 30 }
  },
  emits: ['update-seats'],
  data() {
    return { selectedSeats: [] }
  },
  watch: {
    maxAllowed(newVal) {
      if (this.selectedSeats.length > newVal) {
        this.selectedSeats = this.selectedSeats.slice(0, newVal)
        this.$emit('update-seats', this.selectedSeats)
      }
    }
  },
  methods: {
    toggleSeat(seat) {
      if (this.selectedSeats.includes(seat)) {
        this.selectedSeats = this.selectedSeats.filter(s => s !== seat)
      } else if (this.selectedSeats.length < this.maxAllowed) {
        this.selectedSeats.push(seat)
      }
      this.$emit('update-seats', this.selectedSeats)
    }
  }
}
</script>

<style scoped>
.seat-picker { text-align: center; margin: 20px 0; }
.screen-indicator { background: var(--border-color); color: var(--text-sub); padding: 6px; border-radius: 4px; font-size: 0.75rem; letter-spacing: 2px; margin-bottom: 20px; }
.seat-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 10px; max-width: 360px; margin: 0 auto; }
.seat-btn { padding: 12px; background: var(--card-bg); border: 1px solid var(--border-color); color: var(--text-main); border-radius: 6px; font-weight: bold; }
.seat-btn.selected { background: var(--accent); color: #000; border-color: var(--accent); }
.legend { display: flex; justify-content: center; gap: 20px; margin-top: 15px; font-size: 0.85rem; color: var(--text-sub); }
.box { display: inline-block; width: 12px; height: 12px; border-radius: 2px; margin-right: 5px; }
.box.available { background: var(--card-bg); border: 1px solid var(--border-color); }
.box.selected { background: var(--accent); }
</style>
