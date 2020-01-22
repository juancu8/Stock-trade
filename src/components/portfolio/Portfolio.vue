<template>
  <div>
    <div class="card-deck" v-if="stocks.length > 0">
      <app-stock v-for="stock in stocks" :key="stock.id" :stock="stock"></app-stock>
    </div>
    <div class="jumbotron" v-else>
      <h1 class="display-4">Any Stocks!!</h1>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import Stock from './Stock.vue';

  export default {
    computed: {
      ...mapGetters({
        stocks: 'stockPortfolio'
      })
    },
    components: {
      appStock: Stock
    }
  }
</script>

<style scoped>

</style>