import Vue from 'vue';
import VueRouter from 'vue-router';

import Mainboard from './views/Mainboard.vue';
import Management from './views/Management.vue';

Vue.use(VueRouter);

const ROUTES = [
    { path: '/', component: Mainboard },
    { path: '/management', component: Management }
];

export default new VueRouter({ 
    routes: ROUTES,
    linkActiveClass: 'active'
});
