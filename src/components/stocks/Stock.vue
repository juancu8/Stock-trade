<template>
  <div>
    <div class="card mt-3">
      <div class="card-header">
        <h3> {{ stock.name }} </h3>
        <small>( price: {{ stock.price | currency }} )</small>
      </div>
      <div class="card-body form-inline">
        <input 
          type="number" 
          class="form-control"
          placeholder="Quantity"
          v-model="quantity"
          :class="{danger: insufficientFunds}"
        >
        <button 
          class="btn btn-success"
          @click="buyStock"
          :disabled="quantity <= 0 || insufficientFunds"
        > {{ insufficientFunds ? 'Not funds' : 'Buy' }} </button>
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
      funds() {
        return this.$store.getters.funds;
      },
      insufficientFunds() {
        return this.stock.price * this.quantity > this.funds;
      }
    },
    methods: {
      buyStock() {
        const order = {
          stockId: this.stock.id,
          stockPrice: this.stock.price,
          quantity: this.quantity
        };
        this.$store.dispatch('buyStock', order);
        this.quantity = 0;
      }
    }
  }
</script>

<style scoped>
  .danger:focus {
    border: px solid red;
  }
</style>