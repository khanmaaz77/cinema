<template>
  <div class="card movie-card">
    <div class="rating-badge">⭐ {{ movie.rating }}</div>
    <img :src="movie.poster" :alt="movie.title" />
    <div class="card-body">
      <h3>{{ movie.title }}</h3>
      <p class="genre">{{ movie.genre }} • {{ movie.language }}</p>
      <p class="price">From ₹{{ movie.ticketPrice }}</p>
      <div class="actions">
        <router-link :to="'/movie/' + movie.id" class="btn-link">Details</router-link>
        <router-link :to="'/book/' + movie.id" class="btn">Book Tickets</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MovieCard',
  props: { movie: { type: Object, required: true } }
}
</script>

<style scoped>
.movie-card { overflow: hidden; position: relative; display: flex; flex-direction: column; }
.movie-card img { width: 100%; height: 260px; object-fit: cover; }
.rating-badge { position: absolute; top: 10px; right: 10px; background: rgba(0,0,0,0.8); color: #facc15; padding: 4px 8px; border-radius: 4px; font-weight: bold; font-size: 0.85rem; }
.card-body { padding: 15px; display: flex; flex-direction: column; flex-grow: 1; justify-content: space-between; gap: 8px; }
.genre { color: var(--text-sub); font-size: 0.85rem; }
.price { font-weight: bold; color: var(--accent); }
.actions { display: flex; justify-content: space-between; align-items: center; margin-top: 10px; }
.btn-link { color: var(--text-sub); font-size: 0.9rem; }
</style>
