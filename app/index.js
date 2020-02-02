import Vue from "vue";

import 'materialize-css';
import 'materialize-css/sass/materialize.scss';

import App from "./App.vue";
import router from './routes';
import { store } from './store/store';

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");

export const eventBus = new Vue({});
