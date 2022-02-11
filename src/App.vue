<script>
import { mapState } from "vuex";
import {
  GET_PROFILE,
  GET_RECENT_TRANSACTION,
  GET_CONFIGURATION,
  GET_POPUP,
  REFRESH_WALLET,
  FETCH_GAMES_MEMBER,
} from "@/store/constants/actions.type";

export default {
  name: "App",
  methods: {
    checkRefferal() {
      if (this.$route.query.rc && !this.isAuthenticated) {
        this.$router.push({
          name: "Register",
          params: { refCode: this.$route.query.rc },
        });
      }
    },
    refreshAll() {
      if (this.isAuthenticated) {
        Promise.all([
          this.$store.dispatch(GET_CONFIGURATION),
          this.$store.dispatch(GET_PROFILE),
          this.$store.dispatch(GET_RECENT_TRANSACTION),
        ]).then(() => {
          //this.refrehWallet();
        });
      }
    },
    loadIcon() {
      this.ApiService.get("/layout/favicon").then((resp) => {
        if (resp.data) {
          let link = document.getElementById("favicon");
          link.href = resp.data.content;
        }
      });
    },
    checkCookies() {
      if (!this.$cookies.get("PopUp")) {
        if (!this.isAuthenticated) {
          this.$cookies.set("PopUp", "true", 60 * 10);
          this.setPopup(true);
        }
      }
    },
    refreshWallet() {
      this.$store.dispatch(FETCH_GAMES_MEMBER);
    },
    initializeContent() {
      Promise.all([
        this.$store.dispatch(GET_CONFIGURATION),
        this.$store.dispatch(GET_POPUP),
        (this.AppPreparing = false),
      ]).finally(() => {
        if (this.isAuthenticated) {
          this.$store.dispatch(GET_RECENT_TRANSACTION);
          this.$store.dispatch(GET_PROFILE);
          this.refreshWallet();
          this.$store.dispatch(REFRESH_WALLET);
        }
      });
    },
  },
  computed: {
    ...mapState({
      isAuthenticated: (state) => state.auth.isAuthenticated,
      popUpData: (state) => state.popUp,
    }),
  },
  beforeMount() {
    this.AppPreparing = true;
  },
  mounted() {
    this.checkCookies();
    this.checkRefferal();
    this.initializeContent();
  },
  data: () => {
    return {
      AppPreparing: true,
    };
  },
};
</script>

<template>
  <div id="app" style="width: 100%; padding: 0%; margin: 0%">
    <vue-element-loading
      :active="AppPreparing"
      spinner="bar-fade-scale"
      text="Preparing..."
      is-full-screen
    />
    <b-modal
      v-if="popUpData.isActive"
      body-class="announcement-card"
      centered
      hide-footer
      hide-header
      v-model="popUpShow"
    >
      <b-row align-h="center" align-v="center" class="popup-images-row">
        <b-img
          :src="popUpData.imageUrl"
          class="mb-2"
          fluid-grow
          alt="Popup Isobet"
        />
      </b-row>
      <b-row align-h="center" class="popup-images">
        <span style="color: white" v-html="popUpData.content" />
      </b-row>
    </b-modal>
    <router-view />
  </div>
</template>

<style lang="scss">
@import "@/assets/styles/base.scss";
</style>