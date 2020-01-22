<template>
  <div class="container">
		<div class="row">
			<div class="col-12">
				<app-header></app-header>
			</div>
		</div>
		<transition name="slide" mode="out-in">
			<router-view></router-view>
		</transition>
	</div>
</template>

<script>
import Header from './components/shared/Header.vue';
import {mapActions} from 'vuex';

export default {
	components: {
		'app-header': Header
	},
	methods: {
		...mapActions([
			'randomizedStocks'
		]),
	},
	created() {
		this.$store.dispatch('initStocks');
		setInterval(() => {
			this.randomizedStocks();
		},60000);
	}
};
</script>

<style>
	body {
		padding: 15px;
	}

	.slide-enter-active {
		animation: slide-in 200ms ease-out forwards;
	}
	
	.slide-leave-active {
		animation: slide-out 200ms ease-out forwards;
	}
	
	@keyframes slide-in {
		from {
			transform: translateY(-30px);
			opacity: 0;
		}
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}

	@keyframes slide-out {
		from {
			transform: translateY(0);
			opacity: 1;
		}
		to {
			transform: translateY(-30px);
			opacity: 0;
		}
	}

</style>
