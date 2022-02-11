import Vue from 'vue'
import VueSweetalert2 from 'vue-sweetalert2';
import Notifications from 'vue-notification';
import velocity      from 'velocity-animate';
import VueElementLoading from "vue-element-loading";
import KProgress from 'k-progress';

import App from './App.vue'
import router from './router'
import ApiService from "@/services/api.service";
import IdleVue from "idle-vue";
import Meta from "vue-meta";

import store from '@/store';
import "./common/globalPlugins";
import "./common/mixin";
import "./common/filter";
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.config.productionTip = false

const eventsHub = new Vue();
  Vue.use(IdleVue, {
  eventEmitter: eventsHub,
  idleTime: 60000
});

Vue.use(Meta);
Vue.use(VueSweetalert2);
Vue.use(Notifications, { velocity });
Vue.component("VueElementLoading", VueElementLoading);
Vue.component('k-progress', KProgress);

Vue.axios.get(`${window.location.origin}/config.json`).then(resp=>{
  ApiService.init(resp.data.apiUrl);
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
});