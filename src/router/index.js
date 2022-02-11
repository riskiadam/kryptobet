import Vue from "vue";
import VueRouter from "vue-router";
import VueHead from 'vue-head';
import VueMeta from "vue-meta";
import Home from "../views/Isobet/Desktop/Home/Home.vue";
import HomeMobile from "../views/Isobet/Mobile/Home/Home.vue";
import authState from "../store/modules/auth/state";
// import Tawk from 'vue-tawk';

// Vue.use(Tawk, { tawkSrc: 'https://embed.tawk.to/60532f77f7ce182709316438/1f12f2rfg'})
Vue.use(VueRouter);
Vue.use(VueMeta);
Vue.use(VueHead)

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/mobile",
    name: "HomeMobile",
    component: HomeMobile,
  },
  {
    path: "/mobilelogin",
    name: "MobileLogin",
    component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "mobilelogin" */ "../views/Isobet/Mobile/Login/Login.vue"),
  },
  {
    path: "/referral",
    name: "Refferal",
    component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "referral" */ "../views/Isobet/Desktop/Addition/Refferal.vue"),
  },
  {
    path: "/mobile/referral",
    name: "MobileRefferal",
    component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "mobilereferral" */ "../views/Isobet/Mobile/Addition/Refferal.vue"),
  },
  {
    path: "/help",
    name: "Help",
    component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "help" */ "../views/Isobet/Desktop/Addition/Help.vue"),
  },
  {
    path: "/mobile/help",
    name: "MobileHelp",
    component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "mobilehelp" */ "../views/Isobet/Mobile/Addition/Help.vue"),
  },
  {
    path: '/barcode',
    name: 'Barcode',
    component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "barcode" */ '../views/Isobet/Desktop/Addition/Barcode.vue'),
  },
  {
    path: '/mobile/barcode',
    name: 'MobileBarcode',
    component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "mobilebarcode" */ '../views/Isobet/Mobile/Addition/Barcode.vue'),
  },
  {
    path: "/register/:refCode?",
    name: "Register",
    props: true,
    component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "register" */ "../views/Isobet/Desktop/Register/Register.vue"),
  },
  {
    path: "/mobile/register/:refCode?",
    name: "MobileRegister",
    props: true,
    component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "mobileregister" */ "../views/Isobet/Mobile/Register/Register.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "profile" */ "../views/Isobet/Desktop/Profile/profile.vue"),
  },
  {
    path: "/mobile/profile",
    name: "MobileProfile",
    component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "mobileprofile" */ "../views/Isobet/Mobile/Profile/profile.vue"),
  },
  {
    path: "/promotion",
    name: "Promotion",
    component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "promotion" */ "../views/Isobet/Desktop/Promotion/promotion.vue"),
  },
  {
    path: "/mobile/promotion",
    name: "MobilePromotion",
    component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "mobilepromotion" */ "../views/Isobet/Mobile/Promotion/promotion.vue"),
  },
  {
    path: "/Blog",
    name: "Blog",
    component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "blog" */ "../views/Isobet/Desktop/Blog/blogList.vue"),
  },
  {
    path: "/mobile/Blog",
    name: "MobileBlog",
    component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "mobileblog" */ "../views/Isobet/Mobile/Blog/blogList.vue"),
  },
  {
    path: "/blog/:blogCode?",
    name: "BlogSingle",
    props: true,
    component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "blogsingle" */ "../views/Isobet/Desktop/Blog/blogSingle.vue"),
  },
  {
    path: "/mobile/blog/:blogCode?",
    name: "MobileBlogSingle",
    props: true,
    component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "mobileblogsingle" */ "../views/Isobet/Mobile/Blog/blogSingle.vue"),
  },
  {
    path: "/report",
    name: "Report",
    props: true,
    component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "report" */ "../views/Isobet/Desktop/Report/report.vue"),
  },
  {
    path: "/mobile/report",
    name: "MobileReport",
    props: true,
    component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "mobilereport" */ "../views/Isobet/Mobile/Report/report.vue"),
  },
  {
    path: "/wallet",
    name: "Wallet",
    props: true,
    component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "wallet" */ "../views/Isobet/Desktop/Wallet/wallet.vue"),
  },
  {
    path: "/mobile/wallet",
    name: "MobileWallet",
    props: true,
    component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "mobilewallet" */ "../views/Isobet/Mobile/Wallet/wallet.vue"),
  },
  {
    path: "/games/:gameCategory?",
    name: "games",
    props: true,
    component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "games" */ "../views/Isobet/Desktop/Games/Games.vue"),
  },
  {
    path: "/mobile/games/:gameCategory?",
    name: "Mobilegames",
    props: true,
    component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "mobilegames" */ "../views/Isobet/Mobile/Games/Games.vue"),
  },
  {
    path: "/home",
    name: "home",
    component: Home,
  },
  {
    path: "*",
    redirect: '/home'
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (authState.isAuthenticated && to.name == "Register")
    next({ name: "home" });
  else next();
});

// Route case-sensitivity hotfix
if (router.mode === 'history') {
  router.history.getCurrentLocation = function () {
    let path = window.location.pathname
    let base = router.history.base
    // Removes base from path (case-insensitive)
    if (base && path.toLowerCase().indexOf(base.toLowerCase()) === 0) {
      path = path.slice(base.length)
    }
    return (path || '/') + window.location.search + window.location.hash
  }
}
export default router;