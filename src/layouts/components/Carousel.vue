<script>
import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
import LazyHydrate from "vue-lazy-hydration";
import "swiper/css/swiper.css";

export default {
  components: {
    Swiper,
    SwiperSlide,
    LazyHydrate,
  },
  directives: {
    LazyHydrate,
    swiper: directive,
  },
  computed: {
    routerLine() {
      return this.$route.path;
    },
    checkBanner() {
      var x = this.bannerList.filter((x) => x.router === this.routerLine);
      return x[0].imgUrl;
    },
  },
  data: () => {
    return {
      sliders: null,
      render: 0,
      swiperOption: {
        slidesPerView: 1,
        loop: true,
        lazy: true,
        centeredSlides: true,
        effect: "fade",
        autoplay: {
          delay: 4000,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        keyboard: {
          enabled: true,
        },
      },
      bannerList: [
        // GAMES
        {
          router: "/games/SB",
          imgUrl: "2.jpg",
        },
        {
          router: "/games/LC",
          imgUrl: "5.jpg",
        },
        {
          router: "/games/P",
          imgUrl: "9.jpg",
        },
        {
          router: "/games/L",
          imgUrl: "12.jpg",
        },
        {
          router: "/games/S",
          imgUrl: "13.jpg",
        },
        {
          router: "/games/OG",
          imgUrl: "7.jpg",
        },
        {
          router: "/games/T",
          imgUrl: "9.jpg",
        },
        // ROUTE
        {
          router: "/promotion",
          imgUrl: "23.jpg",
        },
        {
          router: "/Blog",
          imgUrl: "18.jpg",
        },
        {
          router: "/refferal",
          imgUrl: "20.jpg",
        },
        {
          router: "/help",
          imgUrl: "17.jpg",
        },
        {
          router: "/register",
          imgUrl: "23.jpg",
        },
        {
          router: "/profile",
          imgUrl: "23.jpg",
        },
        {
          router: "/wallet",
          imgUrl: "23.jpg",
        },
        {
          router: "/report",
          imgUrl: "23.jpg",
        },
      ],
    };
  },
  mounted() {
    this.getSliders();
  },
  methods: {
    getSliders() {
      this.ApiService.get("slider").then((response) => {
        this.sliders = response.data;
        for (let i = 0; i < this.sliders.length; i++) {
          this.sliders[i].imageUrl = this.sliders[i].imageUrl.replace(
            "10000//Carousel",
            "10000///Carousel"
          );
        }
      });
    },
  },
};
</script>

<template>
  <LazyHydrate when-visible>
    <swiper
      v-if="routerLine === '/mobile'"
      class="swiper"
      :slides-per-view="3"
      :space-between="50"
      :options="swiperOption"
    >
      <swiper-slide v-for="x in sliders" :key="x.imageUrl">
        <img
          class="swiper-lazy d-block img-fluid w-100"
          width="600"
          height="134"
          :src="x.imageUrl"
          :alt="x.code"
          :img-alt="x.code"
        />
        <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <b-img
      v-else-if="routerLine !== '/'"
      loading="lazy"
      class="games-page-banner center align-center max-width"
      :src="require(`@/assets/images/banner/slide${checkBanner}`)"
      alt="Menu-Live-Casino-Games"
    />
  </LazyHydrate>
</template>