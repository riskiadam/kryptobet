import Vue from "vue";
//------------------------------------------------------------------
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);
//------------------------------------------------------------------
import {BootstrapVue, IconsPlugin} from "bootstrap-vue";
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
//------------------------------------------------------------------
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
Vue.use(VueSweetalert2);
//------------------------------------------------------------------
Vue.use(require("vue-moment"));
//------------------------------------------------------------------
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
Vue.component("Flatpickr", flatPickr);
//------------------------------------------------------------------
import VueElementLoading from "vue-element-loading";
Vue.component("VueElementLoading", VueElementLoading);
//------------------------------------------------------------------
import VueNumeric from "vue-numeric";
Vue.component("vue-numeric", VueNumeric);
//------------------------------------------------------------------
import ColoredAmount from "../layouts/components/colored-amount";
Vue.component("ColoredAmount", ColoredAmount);
//------------------------------------------------------------------
import vSelect from 'vue-select'
import "vue-select/dist/vue-select.css";
Vue.component('v-select', vSelect)
//------------------------------------------------------------------
import VueTimers from "vue-timers";
Vue.use(VueTimers);
//------------------------------------------------------------------
import MarqueeText from 'vue-marquee-text-component'
Vue.component('marquee-text', MarqueeText)
//------------------------------------------------------------------
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
//---------------------------------
import VueCookies from "vue-cookies";
Vue.use(VueCookies);