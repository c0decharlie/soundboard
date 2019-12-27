import Vue from "vue";

import 'materialize-css';
import 'materialize-css/sass/materialize.scss';

import App from "./App.vue";
import router from './routes';

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
