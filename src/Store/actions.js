import axios from 'axios';

export const loadData = ({commit}) => {
  axios.get('/data.json')
    .then(res => {
      if (res.data) {
        const data = res.data;
        const stocks = data.stocks;
        const funds = data.funds;
        const stockPortfolio = data.stockPortfolio;

        const portfolio = {
          stockPortfolio,
          funds
        };

        commit('SET_PORTFOLIO', portfolio);
        commit('SET_STOCKS', stocks);
      }
    })
    .catch(error => console.log(error));
};