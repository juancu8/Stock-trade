<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link to="/" tag="a" class="navbar-brand">Stock Trader</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav mr-auto">
        <router-link to="/" tag="li" class="nav-item" active-class="active" exact>
          <a class="nav-link">Home</a>
        </router-link>
        <router-link to="/portfolio" tag="li" class="nav-item" active-class="active">
          <a class="nav-link">Portfolio</a>
        </router-link>
        <router-link to="stocks" tag="li" class="nav-item" active-class="active">
          <a class="nav-link">Stocks</a>
        </router-link>
      </ul>
      <ul class="navbar-nav">
        <li class="nav-item"><span class="navbar-text">Your Funds: <span :style="{color: differenceFunds}">{{ funds | currency }}</span></span></li>
        <li class="nav-item"><a class="nav-link" @click="endDay">End day</a></li>
        <li 
          class="nav-item dropdown" 
          :class="{show: dropdownOpen}" @click="dropdownOpen =! dropdownOpen">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Save & Load
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown" :class="{show: dropdownOpen}">
            <a class="dropdown-item" href="#" @click="saveData">Save</a>
            <a class="dropdown-item" href="#" @click="loadServer">Load</a>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
  import {mapActions} from 'vuex';
  import axios from 'axios';

  export default {
    data() {
      return {
        dropdownOpen: false
      }
    },
    computed: {
      funds() {
        return this.$store.getters.funds;
      },
      differenceFunds() {
        if ( this.funds != 10000 ) {
          return (this.funds > 10000) ? 'green' : 'red';
        }
      }
    },
    methods: {
      ...mapActions([
        'randomizedStocks',
        'loadData'
      ]),
      endDay() {
        this.randomizedStocks();
      },
      saveData() {
        const data = {
          funds: this.$store.getters.funds,
          stockPortfolio: this.$store.getters.stockPortfolio,
          stocks: this.$store.getters.stocks
        };
        axios.put('/data.json', data)
          .then( res => console.log(res) )
          .catch( error => console.log(error) );
      },
      loadServer() {
        this.loadData();
      }
    }
  }
</script>

<style scoped>
  .nav-link {
    cursor: pointer;
  }
</style>