<template>
  <div v-if="movie" class="details-layout card">
    <img :src="movie.poster" :alt="movie.title" />
    <div class="info">
      <h1>{{ movie.title }}</h1>
      <p class="meta">{{ movie.genre }} • {{ movie.duration }} • {{ movie.language }}</p>
      <div class="rating">⭐ {{ movie.rating }} / 10</div>
      <p class="desc">{{ movie.description }}</p>
      <p class="price-tag">Ticket Price: <strong>₹{{ movie.ticketPrice }}</strong></p>
      <router-link :to="'/book/' + movie.id" class="btn">Proceed to Book</router-link>
    </div>
  </div>
</template>

<script>
import { fetchMovieById } from '../services/api'

export default {
  name: 'MovieDetailsView',
  data() {
    return { movie: null }
  },
  async mounted() {
    this.movie = await fetchMovieById(this.$route.params.id)
  }
}
</script>

<style scoped>
.details-layout { display: flex; gap: 30px; padding: 30px; margin-top: 20px; }
.details-layout img { width: 280px; border-radius: 8px; object-fit: cover; }
.info { display: flex; flex-direction: column; gap: 15px; }
.meta { color: var(--text-sub); }
.rating { font-size: 1.1rem; font-weight: bold; color: #facc15; }
.price-tag { font-size: 1.1rem; color: var(--accent); }
</style>
