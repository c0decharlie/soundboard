import Vue from "vue";

import 'materialize-css/sass/materialize.scss';

import App from "./App.vue";
import router from './routes';
import { store } from './store/store';

Vue.config.productionTip = false;

export const eventBus = new Vue();

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
