import Vue from 'vue';
import VueRouter from 'vue-router';

import MainboardView from './views/Mainboard.vue';
import Manage from './views/Manage.vue';

Vue.use(VueRouter);

const ROUTES = [
    { path: '/', component: MainboardView },
    { path: '/manage', component: Manage }
];

export default new VueRouter({ routes: ROUTES });
