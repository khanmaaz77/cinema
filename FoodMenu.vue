<template>
  <div class="food-section">
    <h3>Add Snacks & Beverages</h3>
    <div class="food-list">
      <div v-for="item in foods" :key="item.id" class="food-card">
        <div class="food-info">
          <h4>{{ item.name }}</h4>
          <p class="food-meta">₹{{ item.price }} • ⭐ {{ item.rating }}</p>
        </div>
        <div class="food-qty">
          <button @click="updateQty(item.id, -1)" :disabled="!getQty(item.id)">-</button>
          <span>{{ getQty(item.id) }}</span>
          <button @click="updateQty(item.id, 1)">+</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FoodMenu',
  props: { foods: { type: Array, required: true } },
  emits: ['update-food-selection'],
  data() {
    return { selectedFoodMap: {} }
  },
  methods: {
    getQty(id) {
      return this.selectedFoodMap[id] ? this.selectedFoodMap[id].qty : 0
    },
    updateQty(id, change) {
      const item = this.foods.find(f => f.id === id)
      const currentQty = this.getQty(id)
      const newQty = currentQty + change

      if (newQty <= 0) {
        delete this.selectedFoodMap[id]
      } else {
        this.selectedFoodMap[id] = { ...item, qty: newQty }
      }
      this.$emit('update-food-selection', Object.values(this.selectedFoodMap))
    }
  }
}
</script>

<style scoped>
.food-section { margin-top: 25px; text-align: left; }
.food-list { display: flex; flex-direction: column; gap: 12px; margin-top: 10px; }
.food-card { display: flex; justify-content: space-between; align-items: center; padding: 12px; background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 6px; }
.food-meta { font-size: 0.85rem; color: var(--accent); font-weight: bold; }
.food-qty { display: flex; align-items: center; gap: 10px; }
.food-qty button { width: 28px; height: 28px; background: var(--border-color); color: var(--text-main); border-radius: 4px; font-weight: bold; }
</style>
