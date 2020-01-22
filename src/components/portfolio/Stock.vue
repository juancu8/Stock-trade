<template>
  <div>
    <div class="card mt-3">
      <div class="card-header">
        <h3> {{ stock.name }} </h3>
        <small> Quantity: {{ stock.quantity }}</small>
        <small>| Price: {{ stock.price | currency }}</small>
        <small>| Buy price: {{stock.buyPrice}}</small>
        <small :style="{color: diffCompare}">| Diff: {{ stock.price - stock.buyPrice }}</small>
      </div>
      <div class="card-body form-inline">
        <input 
          type="number" 
          class="form-control"
          placeholder="Quantity"
          :class="{danger: insufficientQuantity}"
          v-model="quantity"
        >
        <button 
          class="btn btn-success"
          @click="sellStock"
          :disabled="quantity <= 0 || insufficientQuantity"
        > Sell </button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['stock'],
    data() {
      return {
        quantity: 0
      }
    },
    computed: {
      insufficientQuantity() {
        return this.quantity > this.stock.quantity;
      },
      diffCompare(){
        if (this.stock.price !== this.stock.buyPrice) {
          return (this.stock.price > this.stock.buyPrice) ? 'green' : 'red';
        }
      }
    },
    methods: {
      sellStock() {
        const order = {
          stockId: this.stock.id,
          stockPrice: this.stock.price,
          quantity: this.quantity
        };
        this.$store.dispatch('sellStock', order);
        this.quantity = 0;
      }
    }
  }
</script>

<style scoped>
.danger {
  border: 1px solid red;
}
</style>