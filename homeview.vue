<template>
  <div>
    <div class="filters">
      <h2>Latest Movies</h2>
      <select v-model="sortBy" class="sort-select">
        <option value="default">Featured</option>
        <option value="rating">Top Rated</option>
      </select>
    </div>

    <Toast v-if="error" :message="error" />
    <div v-if="loading" class="loading">Fetching latest releases...</div>

    <div v-else class="movie-grid">
      <MovieCard v-for="movie in sortedMovies" :key="movie.id" :movie="movie" />
    </div>
  </div>
</template>

<script>
import { fetchMovies } from '../services/api'
import MovieCard from '../components/MovieCard.vue'
import Toast from '../components/Toast.vue'

export default {
  name: 'HomeView',
  components: { MovieCard, Toast },
  data() {
    return { movies: [], loading: true, error: null, sortBy: 'default' }
  },
  computed: {
    sortedMovies() {
      if (this.sortBy === 'rating') {
        return [...this.movies].sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
      }
      return this.movies
    }
  },
  async mounted() {
    try {
      this.movies = await fetchMovies()
    } catch (err) {
      this.error = 'Failed to load movies. Ensure json-server is running.'
    } finally {
      this.loading = false
    }
  }
}
</script>

<style scoped>
.filters { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.sort-select { padding: 8px 12px; background: var(--card-bg); color: var(--text-main); border: 1px solid var(--border-color); border-radius: 6px; }
.movie-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 20px; }
.loading { text-align: center; padding: 40px; color: var(--text-sub); }
</style>
