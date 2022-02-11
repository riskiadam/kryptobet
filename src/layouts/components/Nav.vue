<script>
import Vue from "vue";
import { mapState } from "vuex";
import { LOGIN, LOGOUT } from "@/store/constants/actions.type";
import { FORGOT_PASSWORD } from "@/store/constants/actions.type";
import { REFRESH_WALLET, REFRESH_MAIN } from "@/store/constants/actions.type";

import apiService from "@/services/api.service";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import VueElementLoading from "vue-element-loading";
import PinModal from "./pinEntry";
import LoginMobile from "./Login.vue";
import ForgotMobile from "./Forgot.vue";
import Notification from "./Notification.vue";

export default {
  components: {
    PinModal,
    VuePerfectScrollbar,
    VueElementLoading,
    LoginMobile,
    ForgotMobile,
    Notification,
  },
  data: () => {
    return {
      name: "",
      email: "",
      message: "",
      isActive1: true,
      isActive: false,
      timer: "",
      isShowButton: false,
      settings: {
        maxScrollbarLength: 200,
      },
      headerBgVariant: "danger",
      footerBgVariant: "danger",
      logo: null,
      params: {
        numbers: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
        showPin: false,
      },
      loginData: {
        username: "",
        password: "",
      },
      marqueeItems: null,
      forgotPhone: "",
      isGameLoading: false,
      gamesProducts: [],
      gamesCode: null,
      gameList: [],
      linkGames: null,
    };
  },
  computed: {
    ...mapState({
      isAuthenticated: (state) => state.auth.isAuthenticated,
      currentUser: (state) => state.me.loggedInUser,
      walletList: (state) => state.wallet.walletList,
    }),
  },
  methods: {
    sendForgotPassword() {
      let tmp = this.forgotPhone;
      this.$store
        .dispatch(FORGOT_PASSWORD, { phone: tmp })
        .then((result) => {
          console.log(result);
          this.$notify({
            group: "login1",
            title: "FORGOT PASSWORD SUKSES",
            text: "Password baru Anda akan dikirim melalui SMS.",
            type: "success",
            closeOnClick: true,
            max: 1,
            ignoreDuplicates: true,
          });
        })
        .catch((err) => {
          this.$notify({
            group: "login3",
            title: err,
            type: "error",
            closeOnClick: true,
            max: 1,
            ignoreDuplicates: true,
          });
        })
        .finally(() => {
          this.forgotPhone = "";
        });
    },
    refreshWallet() {
      if (this.isAuthenticated) {
        this.isRefreshing = true;
        this.isActive = true;
        this.$store.dispatch(REFRESH_WALLET).finally(() => {
          this.isRefreshing = false;
          this.isActive = false;
        });
      }
    },
    refreshMain() {
      if (this.isAuthenticated) {
        this.isActive = true;
        this.$store
          .dispatch(REFRESH_MAIN)
          .then((resp) => {
            if (!resp) {
              this.forceLogout();
            }
          })
          .catch((error) => {
            console.log(error);
            this.forceLogout();
          })
          .finally(() => {
            this.isActive = false;
          });
      }
    },
    shuffle() {
      var currentIndex = this.params.numbers.length,
        temporaryValue,
        randomIndex;

      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = this.params.numbers[currentIndex];
        this.params.numbers[currentIndex] = this.params.numbers[randomIndex];
        this.params.numbers[randomIndex] = temporaryValue;
      }
    },
    addCategory: function (e) {
      if (e) e.preventDefault();

      this.login();
    },
    login() {
      this.changeLoader(true);
      this.showPin = false;
      let payload = {
        username: this.loginData.username,
        password: this.loginData.password,
      };
      this.$store
        .dispatch(LOGIN, payload)
        .then(() => {
          this.clearForm();
          this.changeLoader(false);
          this.$notify({
            group: "login1",
            title: "SUKSES LOGIN",
            text: "Selamat bermain di Isobet!",
            type: "success",
            closeOnClick: true,
            max: 1,
            ignoreDuplicates: true,
          });
          if (this.isAuthenticated) {
            this.timer = setInterval(this.refreshMain, 30000);
          }
        })
        .catch((err) => {
          this.changeLoader(false);
          this.$notify({
            group: "login3",
            title: err.data.error,
            type: "error",
            closeOnClick: true,
            max: 1,
            ignoreDuplicates: true,
          });
        })
        .finally(() => {
          this.params.showPin = false;
          this.changeLoader(false);
        });
    },
    getLogo() {
      this.ApiService.get("layout/logo").then((resp) => {
        this.logo = resp.data.content;
      });
    },
    clearForm() {
      this.loginData.username = "";
      this.loginData.password = "";
    },
    forceLogout() {
      this.$store.dispatch(LOGOUT).then(() => {
        this.$notify({
          group: "login2",
          title: "LOGOUT",
          text: "Silahkan login ulang untuk melanjutkan",
          type: "warning",
          closeOnClick: true,
          max: 1,
          ignoreDuplicates: true,
        });
        clearInterval(this.timer);
        this.timer = null;
      });
    },
    logout() {
      this.$store.dispatch(LOGOUT).then(() => {
        this.$notify({
          group: "login2",
          title: "BERHASIL LOGOUT",
          text: "Kami menantikan kamu Online kembali!",
          type: "success",
          closeOnClick: true,
          max: 1,
          ignoreDuplicates: true,
        });
        clearInterval(this.timer);
        this.timer = null;
      });
    },
    logoutmobile() {
      this.$store.dispatch(LOGOUT).then(() => {
        this.$notify({
          group: "login2",
          title: "BERHASIL LOGOUT",
          text: "Kami menantikan kamu Online kembali!",
          type: "success",
          closeOnClick: true,
          max: 1,
          ignoreDuplicates: true,
        });
        clearInterval(this.timer);
        this.timer = null;
        this.$router.push({ name: "HomeMobile" });
      });
    },
    hideSide() {
      this.$refs.sidebar.hide();
    },
    play(code) {
      if (!this.isAuthenticated) {
        this.$notify({
          group: "firstlogin",
          title: "INFORMATION",
          text: "Harap Login terlebih dahulu!",
          type: "warn",
          closeOnClick: true,
          max: 1,
          ignoreDuplicates: true,
        });
        return false;
      }
      this.changeLoader(true);
      if (this.isAuthenticated) {
        //this.isLoading = true;
        /*if (code === "QT")
              this.showMessage(
              "Pastikan anda menekan tombol yang benar, tekan Play Now Jika mau bermain, dan tekan Demo untuk test.",
              "info"
              );*/
        let deviceType = "d";
        if (navigator.platform == "iPhone" || navigator.platform == "iPad") {
          deviceType = "m";
        } else {
          let userAgent = navigator.userAgent;
          let match = userAgent.match(/Android/g);
          if (match === null) {
            deviceType = "d";
          } else {
            deviceType = "m";
          }
        }
        if (code === "IDN") {
          apiService
            .get("games/lobby/" + code + "?deviceType=" + deviceType)
            .then((resp) => {
              let data = resp.data;
              window.open(data, "_blank");
              //let param = '{"code":"openbrowser","url":"'+data+'"}';
              //window.postMessage(param, "*");
            })
            .catch((error) => {
              Vue.notify({
                group: "ErrorMessage",
                title: "Kesalahan Terjadi",
                text: error,
                type: "error",
                closeOnClick: true,
                max: 1,
                ignoreDuplicates: true,
              });
            })
            .finally(() => {
              //this.isLoading = false;
            });
        } else {
          apiService
            .get("games/lobby/Api2All/" + code + "/" + deviceType)
            .then((resp) => {
              let data = resp.data;

              if (code == "KN") {
                var ua = navigator.userAgent.toLowerCase();
                var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
                var userAgent =
                  navigator.userAgent || navigator.vendor || window.opera;
                // Android detection
                if (isAndroid) {
                  // let param = '{"code":"openbrowser","url":"'+data.Metadata+'"}';
                  // window.postMessage(param, "*");
                  window.open("/widget.html?token=" + data.Data + "&lang=id");
                }
                // iOS detection from: http://stackoverflow.com/a/9039885/177710
                else if (
                  /iPad|iPhone|iPod/.test(userAgent) &&
                  !window.MSStream
                ) {
                  this.linkGames =
                    "/widget.html?token=" + data.Data + "&lang=id";
                  this.$bvModal.show("modal-mobile");
                  window.open("/widget.html?token=" + data.Data + "&lang=id");
                }
                // Desktop detection
                else {
                  window.open("/widget.html?token=" + data.Data + "&lang=id");
                }
              } else if (code == "PPL") {
                var ua3 = navigator.userAgent.toLowerCase();
                var isAndroid3 = ua3.indexOf("android") > -1; //&& ua.indexOf("mobile");
                var userAgent3 =
                  navigator.userAgent || navigator.vendor || window.opera;
                // Android detection
                if (isAndroid3) {
                  // let param = '{"code":"openbrowser","url":"'+data.Metadata+'"}';
                  // window.postMessage(param, "*");
                  window.open(data.Metadata, "_blank");
                }
                // iOS detection from: http://stackoverflow.com/a/9039885/177710
                else if (
                  /iPad|iPhone|iPod/.test(userAgent3) &&
                  !window.MSStream
                ) {
                  this.linkGames = data.Metadata;
                  this.$bvModal.show("modal-mobile");
                  window.open(data.Metadata, "_blank");
                }
                // Desktop detection
                else {
                  window.open(data.Metadata, "_blank");
                }
              } else {
                var ua2 = navigator.userAgent.toLowerCase();
                var isAndroid2 = ua2.indexOf("android") > -1; //&& ua.indexOf("mobile");
                var userAgent2 =
                  navigator.userAgent || navigator.vendor || window.opera;
                // Android detection
                if (isAndroid2) {
                  // let param = '{"code":"openbrowser","url":"'+data.Data+'"}';
                  // window.postMessage(param, "*");
                  window.open(data.Data, "_blank");
                }
                // iOS detection
                else if (
                  /iPad|iPhone|iPod/.test(userAgent2) &&
                  !window.MSStream
                ) {
                  this.linkGames = data.Data;
                  this.$bvModal.show("modal-mobile");
                  window.open(data.Data, "_blank");
                }
                // Desktop detection
                else {
                  window.open(data.Data, "_blank");
                }
              }
            })
            .catch((error) => {
              Vue.notify({
                group: "ErrorMessage",
                title: "Kesalahan Terjadi",
                text: error,
                type: "error",
                closeOnClick: true,
                max: 1,
                ignoreDuplicates: true,
              });
            })
            .finally(() => {
              //this.isLoading = false;
            });
        }
      } else {
        this.changeLoader(false);
        this.$notify({
          group: "firstlogin",
          title: "INFORMATION",
          text: "Harap Login terlebih dahulu!",
          type: "warn",
          closeOnClick: true,
          max: 1,
          ignoreDuplicates: true,
        });
      }
    },
    showGames(code, link) {
      this.changeLoader(true);
      this.gamesCode = code;
      this.lobbyUrl = link;
      this.$notify({
        group: "errormaintenance",
        title: "WE ARE VERY SORRY",
        text: "This game is under maintenance!",
        type: "error",
        closeOnClick: true,
        max: 1,
        ignoreDuplicates: true,
      });
      this.changeLoader(false);
    },
    onOver1() {
      // this.$refs.collapse1.visible = true;
      // this.$refs.collapse2.visible = false;
      // this.$refs.collapse3.visible = false;
      // this.$refs.collapse4.visible = false;
      // this.$refs.collapse5.visible = false;
      // this.$refs.collapse6.visible = false;
    },
    onLeave1() {
      // this.$refs.collapse1.visible = false;
    },
    onOver2() {
      // this.$refs.collapse2.visible = true;
      // this.$refs.collapse1.visible = false;
      // this.$refs.collapse3.visible = false;
      // this.$refs.collapse4.visible = false;
      // this.$refs.collapse5.visible = false;
      // this.$refs.collapse6.visible = false;
    },
    onLeave2() {
      // this.$refs.collapse2.visible = false;
    },
    onOver3() {
      // this.$refs.collapse3.visible = true;
      // this.$refs.collapse1.visible = false;
      // this.$refs.collapse2.visible = false;
      // this.$refs.collapse4.visible = false;
      // this.$refs.collapse5.visible = false;
      // this.$refs.collapse6.visible = false;
    },
    onLeave3() {
      // this.$refs.collapse3.visible = false;
    },
    onOver4() {
      // this.$refs.collapse4.visible = true;
      // this.$refs.collapse1.visible = false;
      // this.$refs.collapse2.visible = false;
      // this.$refs.collapse3.visible = false;
      // this.$refs.collapse5.visible = false;
      // this.$refs.collapse6.visible = false;
    },
    onLeave4() {
      // this.$refs.collapse4.visible = false;
    },
    onOver5() {
      // this.$refs.collapse5.visible = true;
      // this.$refs.collapse4.visible = false;
      // this.$refs.collapse1.visible = false;
      // this.$refs.collapse2.visible = false;
      // this.$refs.collapse3.visible = false;
      // this.$refs.collapse6.visible = false;
    },
    onLeave5() {
      // this.$refs.collapse5.visible = false;
    },
    onOver6() {
      // this.$refs.collapse6.visible = true;
      // this.$refs.collapse5.visible = false;
      // this.$refs.collapse4.visible = false;
      // this.$refs.collapse1.visible = false;
      // this.$refs.collapse2.visible = false;
      // this.$refs.collapse3.visible = false;
    },
    onLeave6() {
      // this.$refs.collapse6.visible = false;
    },
    onLeaveAll() {
      // this.$refs.collapse1.visible = false;
      // this.$refs.collapse2.visible = false;
      // this.$refs.collapse3.visible = false;
      // this.$refs.collapse4.visible = false;
      // this.$refs.collapse5.visible = false;
      // this.$refs.collapse6.visible = false;
    },
    showAlert() {
      this.$notify({
        group: "login1",
        title: "SUKSES LOGIN",
        text: "Selamat bermain di Isobet!",
        type: "success",
        closeOnClick: true,
        max: 1,
        ignoreDuplicates: true,
      });
    },
    showAlert2() {
      this.$notify({
        group: "login2",
        title: "SUKSES LOGOUT",
        text: "Kami menantikan kamu Online kembali!",
        type: "success",
        closeOnClick: true,
        max: 1,
        ignoreDuplicates: true,
      });
    },
    showButton() {
      this.isShowButton = true;
    },
  },

  created() {
    // this.fetchEventsList();
    // var currentUrl = window.location.pathname;
    // console.log(currentUrl);
  },
  mounted() {
    this.profile = this.currentUser;
  },
};
</script>

<template>
  <div class="nav-container">
    <Notification />
    <div class="DesktopNav">
      <b-navbar toggleable="lg" type="dark" class="custom-bg">
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-container class="center">
            <b-row class="max-width justify-content-center center">
              <!-- MENU UTAMA -->
              <b-col class="navbar-row max-height left" cols="12" md="6">
                <span class="navbar-line-top" @mouseover="onLeaveAll">-</span>
                <b-navbar-nav
                  class="max-height center max-width justify-content-center"
                >
                  <b-nav-item
                    :to="{ name: 'home' }"
                    class="color-white center"
                    @mouseover="onLeaveAll"
                  >
                    HOME
                  </b-nav-item>
                  <b-nav-item
                    :to="{ path: '/games/SB' }"
                    class="color-white center"
                    @mouseover="onOver1"
                    v-b-toggle.collapse-1
                  >
                    SPORTBOOK
                  </b-nav-item>
                  <b-nav-item
                    :to="{ path: '/games/LC' }"
                    class="color-white center"
                    @mouseover="onOver2"
                    v-b-toggle.collapse-2
                  >
                    KASINO
                  </b-nav-item>
                  <!-- <b-nav-item
                    :to="{ path: '/games/P' }"
                    class="color-white center"
                    @mouseover="onOver4"
                    v-b-toggle.collapse-4
                  >
                    POKER
                  </b-nav-item> -->
                  <b-nav-item
                    :to="{ path: '/games/S' }"
                    class="color-white center"
                    @mouseover="onOver3"
                    v-b-toggle.collapse-3
                  >
                    SLOT
                  </b-nav-item>
                  <b-nav-item
                    :to="{ path: '/games/OG' }"
                    class="color-white center"
                    @mouseover="onOver6"
                    v-b-toggle.collapse-6
                  >
                    GAMES
                  </b-nav-item>
                  <b-nav-item class="color-white center" @mouseover="onLeaveAll"
                    ><span class="nav-item-clear">--</span>
                  </b-nav-item>
                </b-navbar-nav>
              </b-col>
              <!-- MENU LOGIN -->
              <b-col class="navbar-login max-height right" cols="12" md="6">
                <b-form @submit.stop.prevent="login">
                  <b-navbar-nav
                    class="center max-width justify-content-center"
                    v-if="!isAuthenticated"
                    @mouseover="onLeaveAll"
                  >
                    <b-input
                      v-model="loginData.username"
                      type="text"
                      placeholder="Username"
                      size="sm"
                      class="input-login"
                    />
                    <b-input
                      v-model="loginData.password"
                      type="password"
                      placeholder="Password"
                      size="sm"
                      class="input-login"
                    />
                    <b-button class="btn-login" size="sm" type="submit">
                      MASUK
                    </b-button>
                    <b-button
                      class="btn-login"
                      size="sm"
                      :to="{ name: 'Register' }"
                    >
                      DAFTAR
                    </b-button>
                    <b-button
                      v-b-modal.modal-tall-two
                      class="btn-login-3"
                      size="sm"
                    >
                      Lupa Password?
                    </b-button>
                  </b-navbar-nav>
                </b-form>
                <b-navbar-nav
                  class="center max-width justify-content-center"
                  v-if="isAuthenticated"
                >
                  <b-row style="padding: 0%; margin: 0%; width: 100%">
                    <b-col cols="12" md="10" class="button-after-login-img-3">
                      <router-link :to="{ name: 'Profile' }">
                        <span
                          style="
                            color: black;
                            padding: 0%;
                            margin: 0%;
                            font-weight: bold;
                            font-size: 16px;
                          "
                        >
                          {{ this.currentUser.username }} :

                          <vue-element-loading
                            background-color="#FF9933"
                            :active="isActive"
                          >
                            <img
                              src="@/assets/images/icon/loader2.gif"
                              width="20px"
                              height="20px"
                            />
                          </vue-element-loading>

                          {{
                            mainWallet != undefined
                              ? mainWallet.balance
                              : 0 | decimal
                          }}
                        </span>
                      </router-link>
                    </b-col>
                    <b-col cols="12" md="2" style="margin: 0%; padding: 0%">
                      <router-link :to="{ name: 'Profile' }">
                        <img
                          class="button-after-login-img-2"
                          src="@/assets/images/button/header-nav/icon-button-08.png"
                        />
                      </router-link>
                    </b-col>
                  </b-row>
                  <router-link :to="{ name: 'Wallet' }">
                    <img
                      class="button-after-login-img"
                      src="@/assets/images/button/header-nav/icon-button-02.png"
                    />
                  </router-link>
                  <router-link :to="{ name: 'Report' }">
                    <img
                      class="button-after-login-img"
                      src="@/assets/images/button/header-nav/icon-button-03.png"
                    />
                  </router-link>
                  <router-link :to="{}">
                    <img
                      @click.prevent="logout()"
                      class="button-after-login-img"
                      src="@/assets/images/button/header-nav/icon-button-07.png"
                    />
                  </router-link>
                </b-navbar-nav>
              </b-col>
            </b-row>
          </b-container>
        </b-collapse>
      </b-navbar>
    </div>
    <div class="MobileNav">
      <b-navbar toggleable="lg" type="dark" class="custom-bg">
        <router-link :to="{ name: 'HomeMobile' }">
          <img
            loading="lazy"
            :src="require('@/assets/images/logo/logo-mobile.png')"
            style="width: 100px"
            alt="logo Isobet"
          />
        </router-link>
        <b-navbar-toggle
          target="sidebar-1"
          style="margin-top: 10px"
        ></b-navbar-toggle>
      </b-navbar>

      <b-sidebar
        id="sidebar-1"
        ref="sidebar"
        bg-variant="dark"
        text-variant="light"
        backdrop
        shadow
      >
        <template v-slot:title>
          <div v-if="!isAuthenticated">
            <span class="welcome">Welcome to ISOBET BET</span>
            <b-row style="padding: 0px; margin: 0px; margin-top: 10px">
              <b-col cols="6" style="padding: 0px; margin: 0px">
                <b-btn
                  id="show-btn"
                  @click="$bvModal.show('bv-modal-example'), hideSide()"
                  style="
                    padding: 8px;
                    margin: 0px;
                    margin-right: 2px;
                    width: 110px;
                    font-weight: bold;
                    background-color: #f18713;
                    color: black;
                  "
                >
                  <b-icon icon="box-arrow-in-right" class="mr-2"></b-icon>
                  <span class="button-text">Login</span>
                </b-btn>
              </b-col>
              <b-col cols="6" style="padding: 0px; margin: 0px">
                <router-link :to="{ name: 'MobileRegister' }">
                  <b-btn
                    style="
                      padding: 8px;
                      margin: 0px;
                      margin-left: 2px;
                      width: 110px;
                      background-color: #f18713;
                      color: black;
                      font-weight: bold;
                    "
                  >
                    <b-icon icon="file-person" class="mr-2"></b-icon>
                    <span class="button-text">Register</span>
                  </b-btn>
                </router-link>
              </b-col>
            </b-row>
          </div>

          <div
            v-if="isAuthenticated"
            style="padding-left: 5px; padding-top: 5px"
          >
            <b-row style="padding: 0px; margin: 0px" align-v="center">
              <b-col cols="3" style="padding: 0px; margin: 0px">
                <router-link :to="{ name: 'MobileProfile' }">
                  <b-icon
                    style="color: white; width: 60px; height: 60px"
                    icon="person-circle"
                    class="mr-2"
                  ></b-icon>
                </router-link>
              </b-col>
              <b-col
                cols="9"
                style="padding: 0px; margin: 0px; padding-left: 15px"
              >
                <b-row style="padding: 0px; margin: 0px">
                  <span class="welcome">{{
                    currentUser.username
                      ? `Welcome, ${currentUser.username}`
                      : `Hi, Welcome`
                  }}</span>
                </b-row>
                <b-row
                  style="padding: 0px; margin: 0px; height: 25px"
                  align-v="center"
                >
                  <img
                    loading="lazy"
                    :src="require('@/assets/images/icon/wallet_icon1.png')"
                    style="width: 20px; height: 20px"
                    alt="logo Isobet"
                  />
                  <span
                    style="
                      color: white;
                      margin: 0px;
                      margin-left: 5px;
                      margin-top: 2px;
                      font-weight: bold;
                      font-size: 15px;
                    "
                  >
                    {{
                      mainWallet != undefined ? mainWallet.balance : 0 | decimal
                    }}
                  </span>
                </b-row>
              </b-col>
            </b-row>
          </div>

          <div v-if="isAuthenticated">
            <b-row style="padding: 0px; margin: 0px; margin-top: 5px">
              <b-col cols="4" style="padding: 0px; margin: 0px">
                <router-link :to="{ name: 'HomeMobile' }">
                  <b-btn
                    style="
                      padding: 0px;
                      margin: 0px;
                      width: 80px;
                      height: 30px;
                      background-color: #f18f20;
                      font-weight: bold;
                      letter-spacing: 0.5px;
                      color: black;
                      border-radius: 5px 0px 0px 5px;
                      border: 0.5px solid #333;
                    "
                  >
                    <b-icon icon="house-door-fill"></b-icon>
                    <span style="font-size: 12px">Home</span>
                  </b-btn>
                </router-link>
              </b-col>
              <b-col cols="4" style="padding: 0px; margin: 0px">
                <router-link :to="{ name: 'MobileWallet' }">
                  <b-btn
                    style="
                      padding: 0px;
                      margin: 0px;
                      width: 80px;
                      height: 30px;
                      background-color: #f18f20;
                      font-weight: bold;
                      letter-spacing: 0.5px;
                      color: black;
                      border-radius: 0px 0px 0px 0px;
                      border: 0.5px solid #333;
                    "
                  >
                    <svg
                      id="svg"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      width="20"
                      height="20"
                      viewBox="0, 0, 400,400"
                    >
                      <g id="svgg">
                        <path
                          id="path0"
                          d="M152.849 66.905 C 118.202 84.041,89.855 98.389,89.855 98.789 C 89.855 99.189,94.867 99.517,100.993 99.517 L 112.131 99.517 178.909 80.700 C 215.636 70.350,245.886 61.682,246.131 61.438 C 246.863 60.705,236.996 43.113,234.579 40.842 C 224.488 31.362,225.117 31.162,152.849 66.905 M274.879 64.799 C 271.691 65.801,243.647 73.644,212.560 82.229 C 181.473 90.814,155.626 98.216,155.121 98.678 C 154.601 99.153,188.661 99.517,233.688 99.517 L 313.174 99.517 312.476 97.343 C 312.093 96.147,310.321 89.952,308.540 83.575 C 302.973 63.651,294.169 58.740,274.879 64.799 M40.097 112.447 C 35.994 114.245,30.165 121.042,29.487 124.822 C 29.171 126.580,29.037 178.523,29.190 240.249 L 29.469 352.478 32.423 356.191 C 34.048 358.233,37.292 360.882,39.633 362.077 L 43.888 364.251 190.301 364.230 C 353.816 364.206,341.088 364.745,347.104 357.595 C 351.277 352.636,351.680 349.212,351.685 318.641 L 351.691 289.939 292.995 289.656 C 226.934 289.336,229.164 289.575,218.383 281.661 C 206.661 273.057,202.899 262.296,202.899 237.381 C 202.899 210.534,207.253 199.051,220.636 190.602 C 229.746 184.852,227.228 185.067,291.787 184.541 L 351.208 184.058 351.208 154.589 C 351.208 121.013,351.025 120.114,343.068 114.493 L 338.964 111.594 190.980 111.386 C 70.484 111.216,42.457 111.413,40.097 112.447 M227.994 198.309 C 225.036 199.805,222.786 201.966,220.784 205.236 L 217.874 209.988 217.595 236.636 L 217.315 263.285 220.010 268.599 C 222.058 272.637,223.749 274.493,227.053 276.329 L 231.401 278.744 293.031 279.013 C 361.920 279.314,360.255 279.453,366.006 272.919 C 371.403 266.789,371.981 263.378,371.981 237.681 C 371.981 212.445,371.372 208.658,366.383 202.829 C 360.398 195.837,363.607 196.135,294.439 196.135 L 232.294 196.135 227.994 198.309 M271.097 226.536 C 276.961 230.378,278.920 238.386,275.405 244.150 C 268.247 255.889,250.944 251.219,250.944 237.548 C 250.944 227.270,262.545 220.932,271.097 226.536 "
                          stroke="none"
                          fill="currentColor"
                          fill-rule="evenodd"
                        ></path>
                      </g>
                    </svg>
                    <span style="font-size: 12px">Wallet</span>
                  </b-btn>
                </router-link>
              </b-col>
              <b-col cols="4" style="padding: 0px; margin: 0px">
                <router-link :to="{ name: 'MobileReport' }">
                  <b-btn
                    style="
                      padding: 0px;
                      margin: 0px;
                      width: 80px;
                      height: 30px;
                      background-color: #f18f20;
                      font-weight: bold;
                      letter-spacing: 0.5px;
                      color: black;
                      border-radius: 0px 5px 5px 0px;
                      border: 0.5px solid #333;
                    "
                  >
                    <svg
                      id="svg"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      width="20"
                      height="20"
                      viewBox="0, 0, 400,400.9661835748792"
                    >
                      <g id="svgg">
                        <path
                          id="path0"
                          d="M82.282 31.142 C 74.266 34.300,68.913 39.848,67.153 46.821 C 65.370 53.889,64.925 343.474,66.683 352.744 C 68.182 360.646,71.250 364.477,79.311 368.509 L 86.250 371.981 200.184 371.981 L 314.118 371.981 320.102 369.012 C 327.360 365.412,329.067 363.935,331.745 358.937 L 333.816 355.072 334.098 237.681 C 334.253 173.116,334.114 118.768,333.789 116.908 C 333.287 114.036,326.844 107.160,291.010 71.256 L 248.822 28.986 168.131 29.048 C 88.482 29.110,87.373 29.137,82.282 31.142 M224.155 86.781 C 224.155 140.071,224.169 140.086,276.262 140.111 C 293.038 140.120,307.315 140.477,307.990 140.905 C 308.970 141.527,309.164 160.476,308.956 235.334 L 308.696 328.986 306.610 332.850 C 304.170 337.372,300.385 341.089,295.652 343.610 C 290.750 346.221,116.134 346.929,107.344 344.374 C 100.140 342.280,94.504 336.689,92.377 329.527 C 90.010 321.556,90.003 78.838,92.370 71.773 C 95.260 63.146,100.696 58.289,109.888 56.124 C 111.889 55.652,138.418 55.223,168.841 55.170 L 224.155 55.072 224.155 86.781 M128.937 151.606 C 113.229 152.916,107.817 169.810,121.300 175.443 C 126.704 177.701,189.599 177.421,194.189 175.119 C 200.695 171.856,202.371 161.138,197.268 155.427 C 193.473 151.179,157.894 149.189,128.937 151.606 M119.135 202.856 C 111.177 207.708,112.949 220.644,122.044 224.090 C 126.520 225.786,274.514 225.501,278.613 223.789 C 287.454 220.095,288.834 207.715,280.942 202.903 C 276.047 199.918,124.025 199.874,119.135 202.856 M124.638 249.189 C 112.237 251.746,110.206 269.061,121.830 273.134 C 126.068 274.619,272.084 274.893,277.366 273.426 C 287.349 270.653,289.111 255.504,280.028 250.547 C 276.641 248.699,133.101 247.445,124.638 249.189 M122.982 298.262 C 113.817 300.036,111.320 314.337,119.153 320.186 C 122.319 322.550,269.699 324.024,277.465 321.769 C 288.364 318.605,289.076 303.363,278.533 298.900 C 275.558 297.641,129.290 297.040,122.982 298.262 "
                          stroke="none"
                          fill="currentColor"
                          fill-rule="evenodd"
                        ></path>
                      </g>
                    </svg>
                    <span style="font-size: 12px">Report</span>
                  </b-btn>
                </router-link>
              </b-col>
            </b-row>
          </div>
        </template>

        <VuePerfectScrollbar class="scroll-area" :settings="settings">
          <div class="px-3 py-2" style="background-color: black">
            <div v-if="!isAuthenticated">
              <router-link :to="{ name: 'HomeMobile' }">
                <b-btn
                  size="sm"
                  block
                  squared
                  variant="dark"
                  class="mb-1 text-left"
                  style="background-color: black; border: 0px"
                >
                  <b-icon icon="house-door-fill" class="mr-2"></b-icon>
                  <span class="text-router-sidemenu">Home</span>
                </b-btn>
              </router-link>
            </div>

            <hr
              v-if="!isAuthenticated"
              style="color: white; background-color: white"
            />

            <router-link :to="{ path: '/mobile/games/SB' }">
              <b-btn
                size="sm"
                block
                squared
                variant="dark"
                class="mb-1 text-left"
                style="background-color: black; border: 0px"
              >
                <svg
                  id="svg"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  width="20"
                  height="20"
                  viewBox="0, 0, 400,400.6768189509306"
                >
                  <g id="svgg">
                    <path
                      id="path0"
                      d="M181.726 14.228 C 49.109 28.892,-26.766 168.905,34.092 286.658 C 85.853 386.810,214.838 418.412,307.276 353.589 C 396.282 291.172,413.496 166.211,344.663 82.191 C 305.229 34.056,241.774 7.588,181.726 14.228 M211.079 25.066 C 227.938 26.796,246.129 35.346,250.814 43.741 C 252.572 46.892,246.332 74.697,243.383 76.854 C 242.814 77.270,236.628 79.076,229.635 80.868 C 214.128 84.841,199.338 89.535,185.685 94.816 C 169.279 101.161,171.593 101.112,157.360 95.416 C 140.557 88.690,129.121 84.396,123.519 82.707 C 115.009 80.143,115.290 81.448,119.109 62.267 C 123.431 40.561,123.066 40.954,145.331 34.092 C 164.068 28.317,173.374 26.302,188.156 24.820 C 193.464 24.287,204.665 24.407,211.079 25.066 M289.679 49.550 C 313.602 61.336,355.200 107.802,356.517 124.210 C 356.855 128.419,354.106 146.999,352.589 150.761 C 351.764 152.808,351.300 152.751,339.875 149.195 C 327.396 145.310,318.236 143.072,312.265 142.448 C 305.732 141.765,304.600 140.977,299.429 133.516 C 289.504 119.194,274.400 100.297,263.823 88.968 C 255.056 79.579,255.255 80.890,259.779 62.277 C 263.685 46.209,262.503 47.274,276.142 47.531 C 285.248 47.702,286.225 47.848,289.679 49.550 M124.308 94.838 C 136.554 99.066,162.448 109.436,163.643 110.590 C 165.365 112.254,168.923 185.014,167.402 187.466 C 166.383 189.107,135.346 216.428,119.503 229.628 C 114.346 233.925,113.101 233.835,98.477 228.107 C 67.665 216.037,56.516 211.033,54.706 208.460 C 50.315 202.219,50.921 149.141,55.487 140.093 C 60.649 129.863,105.551 91.371,112.322 91.371 C 113.392 91.371,118.786 92.931,124.308 94.838 M41.523 138.876 C 42.034 139.688,41.988 142.918,41.362 150.043 C 40.027 165.256,39.658 186.102,40.593 193.570 C 41.035 197.107,41.554 203.198,41.747 207.107 L 42.096 214.213 38.051 226.396 C 35.826 233.096,33.467 240.635,32.808 243.147 C 31.215 249.222,30.987 249.027,28.861 239.763 C 21.656 208.378,23.095 177.084,33.174 145.956 L 36.629 135.286 38.717 136.509 C 39.865 137.182,41.128 138.247,41.523 138.876 M323.434 156.753 C 354.402 164.774,351.951 162.815,357.225 183.756 C 363.594 209.046,365.942 226.828,363.888 234.217 C 359.073 251.534,335.173 288.701,327.985 290.049 C 321.063 291.348,283.780 285.335,280.229 282.348 C 279.154 281.444,278.469 278.716,276.798 268.697 C 274.619 255.632,270.483 236.871,267.664 227.267 C 265.310 219.244,265.360 218.979,270.605 211.764 C 281.841 196.305,291.250 181.210,299.907 164.753 C 304.742 155.563,306.536 152.961,308.036 152.961 C 308.455 152.961,315.384 154.667,323.434 156.753 M205.415 205.196 C 249.074 219.136,251.564 219.991,253.025 221.546 C 256.144 224.866,268.329 278.892,267.080 283.866 C 265.707 289.337,216.056 331.457,208.062 333.933 C 200.168 336.377,142.126 316.687,139.279 310.598 C 135.008 301.463,121.340 247.356,122.339 243.536 C 122.526 242.821,130.026 235.906,139.005 228.170 C 147.984 220.434,159.289 210.662,164.129 206.455 C 177.863 194.515,172.474 194.679,205.415 205.196 M362.244 267.109 C 360.774 274.797,336.604 313.818,334.571 311.784 C 332.954 310.168,337.873 298.226,342.060 293.603 C 347.883 287.174,353.328 279.873,358.327 271.794 C 362.827 264.519,362.713 264.655,362.244 267.109 M151.607 330.250 C 168.741 337.077,173.493 338.551,192.133 342.824 C 206.501 346.118,206.413 346.077,208.942 350.538 C 209.909 352.243,213.265 358.002,216.400 363.336 C 222.125 373.075,222.676 374.950,219.818 374.966 C 218.969 374.971,213.564 375.409,207.807 375.940 C 172.990 379.151,130.044 366.260,97.571 342.851 C 90.513 337.763,90.583 337.178,98.485 335.176 C 110.985 332.008,125.800 327.590,129.338 325.976 C 134.646 323.554,134.945 323.611,151.607 330.250 "
                      stroke="none"
                      fill="currentColor"
                      fill-rule="evenodd"
                    ></path>
                  </g>
                </svg>
                <span class="text-router-sidemenu-2">Sportbook</span>
              </b-btn>
            </router-link>

            <router-link :to="{ path: '/mobile/games/LC' }">
              <b-btn
                size="sm"
                block
                squared
                variant="dark"
                class="mb-1 text-left"
                style="background-color: black; border: 0px"
              >
                <b-icon icon="dice6" class="mr-2"></b-icon>
                <span class="text-router-sidemenu">Live Casino</span>
              </b-btn>
            </router-link>

            <!-- <router-link :to="{ path: '/mobile/games/P' }"> -->
            <b-btn
              size="sm"
              block
              squared
              variant="dark"
              class="mb-1 text-left"
              style="background-color: black; border: 0px"
            >
              <b-icon icon="suit-spade-fill" class="mr-2"></b-icon>
              <span class="text-router-sidemenu">Poker</span>
            </b-btn>
            <!-- </router-link> -->

            <router-link :to="{ path: '/mobile/games/S' }">
              <b-btn
                size="sm"
                block
                squared
                variant="dark"
                class="mb-1 text-left"
                style="background-color: black; border: 0px"
              >
                <b-icon icon="joystick" class="mr-2"></b-icon>
                <span class="text-router-sidemenu">Slots</span>
              </b-btn>
            </router-link>

            <router-link :to="{ path: '/mobile/games/T' }">
              <b-btn
                size="sm"
                block
                squared
                variant="dark"
                class="mb-1 text-left"
                style="background-color: black; border: 0px"
              >
                <svg
                  id="svg"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  width="20"
                  height="20"
                  viewBox="0, 0, 400,400.39292730844795"
                >
                  <g id="svgg">
                    <path
                      id="path0"
                      d="M184.872 7.693 C 184.008 7.778,181.090 8.032,178.389 8.257 C 147.529 10.826,118.959 23.373,97.566 43.752 C 70.866 69.186,59.474 98.935,62.485 135.363 C 62.947 140.964,63.049 141.312,66.201 148.134 C 72.999 162.846,72.717 167.699,64.160 183.222 C 54.362 200.998,48.330 214.334,48.330 218.221 C 48.330 224.227,53.884 228.626,62.373 229.344 C 67.483 229.776,67.814 230.712,67.459 243.745 C 67.157 254.858,67.345 255.347,72.986 258.139 C 75.848 259.555,76.027 260.156,74.460 263.103 C 72.437 266.907,73.334 270.782,77.756 277.347 C 81.912 283.519,82.500 285.779,81.441 291.533 C 80.373 297.339,80.493 306.736,81.672 309.712 C 85.201 318.620,102.291 321.976,126.130 318.443 C 144.163 315.770,154.081 317.456,161.450 324.446 L 164.260 327.112 172.429 343.418 C 183.940 366.397,189.851 379.346,192.689 387.806 C 193.427 390.005,194.091 391.863,194.166 391.937 C 194.241 392.010,195.894 389.493,197.839 386.344 C 227.728 337.952,265.611 303.502,297.774 295.466 C 299.141 295.124,299.423 294.910,299.206 294.377 C 295.547 285.396,295.066 269.728,298.058 256.974 C 301.398 242.731,306.407 232.891,320.459 212.966 C 334.531 193.014,345.949 171.343,349.510 157.832 C 363.199 105.892,317.649 34.992,258.499 16.170 C 239.543 10.138,202.881 5.917,184.872 7.693 M250.193 50.369 C 251.068 51.383,252.574 53.239,253.541 54.495 L 255.297 56.778 257.715 56.743 L 260.133 56.708 263.420 52.605 C 268.124 46.733,267.099 46.955,273.279 50.468 C 276.197 52.128,278.585 53.638,278.585 53.823 C 278.585 54.353,276.374 60.477,275.329 62.842 L 274.386 64.977 275.602 67.059 C 276.561 68.702,277.065 69.177,277.996 69.316 C 290.085 71.114,288.802 70.153,288.802 77.407 C 288.802 84.553,289.607 83.919,278.585 85.456 C 276.950 85.684,276.725 85.862,275.585 87.822 L 274.353 89.942 275.302 91.989 C 276.291 94.125,278.585 100.409,278.585 100.983 C 278.585 101.329,268.571 107.269,267.988 107.269 C 267.529 107.269,264.421 103.764,262.204 100.744 L 260.359 98.232 257.783 98.245 L 255.206 98.258 251.866 102.443 C 247.411 108.027,248.206 107.865,242.227 104.402 C 236.174 100.895,236.322 101.379,239.166 94.348 L 240.976 89.875 239.841 87.776 C 238.777 85.809,238.594 85.663,236.936 85.451 C 232.747 84.915,229.566 84.384,228.193 83.991 L 226.719 83.569 226.719 77.555 C 226.719 70.157,225.567 71.034,237.525 69.322 C 238.478 69.186,238.921 68.750,239.840 67.046 L 240.976 64.939 239.158 60.447 C 236.217 53.180,235.962 54.044,242.070 50.564 C 247.924 47.228,247.491 47.238,250.193 50.369 M194.259 67.793 C 194.919 68.452,194.960 68.638,196.064 75.983 C 196.950 81.875,196.499 81.124,200.083 82.680 L 202.947 83.924 208.089 80.076 C 214.701 75.128,214.059 75.076,220.148 81.041 C 228.786 89.503,228.682 89.092,223.772 95.461 C 221.719 98.124,220.039 100.399,220.039 100.517 C 220.039 100.635,220.609 102.159,221.304 103.902 C 222.000 105.646,222.581 107.108,222.594 107.151 C 222.608 107.194,225.531 107.681,229.090 108.233 C 237.587 109.551,236.935 108.646,236.935 119.118 C 236.935 129.561,237.551 128.736,228.790 130.025 C 223.071 130.867,222.387 131.049,222.167 131.788 C 222.033 132.242,221.476 133.626,220.931 134.865 C 219.764 137.513,219.542 136.984,224.309 142.917 C 228.785 148.489,228.820 148.150,223.138 154.193 C 215.091 162.753,214.693 162.858,208.538 158.035 C 206.111 156.133,203.900 154.439,203.623 154.272 C 203.190 154.009,197.961 155.702,197.180 156.358 C 197.033 156.481,196.629 158.792,196.281 161.493 C 194.987 171.555,195.726 170.923,185.248 170.923 C 174.618 170.923,175.515 171.549,174.251 163.261 C 173.723 159.804,173.289 156.854,173.286 156.706 C 173.283 156.559,172.883 156.319,172.397 156.174 C 171.911 156.029,170.513 155.471,169.292 154.933 L 167.071 153.955 162.060 157.724 C 155.241 162.852,155.991 162.970,148.802 155.640 C 141.266 147.957,141.383 148.780,146.838 141.789 L 150.175 137.514 148.781 134.081 L 147.388 130.648 140.818 129.618 C 132.508 128.315,133.202 129.303,133.202 118.785 C 133.202 108.413,132.606 109.287,140.500 108.091 C 143.726 107.602,146.640 107.128,146.977 107.037 C 147.313 106.946,148.167 105.456,148.874 103.726 L 150.160 100.581 146.888 96.449 C 141.039 89.065,140.986 89.767,147.935 82.712 C 155.585 74.947,155.381 74.981,162.182 80.341 L 166.921 84.076 169.021 83.161 C 170.175 82.658,171.582 82.056,172.148 81.823 C 173.105 81.430,173.208 81.135,173.649 77.537 C 174.269 72.483,175.109 68.418,175.675 67.737 C 176.377 66.890,193.408 66.941,194.259 67.793 M253.132 68.203 C 245.427 72.043,245.491 83.091,253.239 86.699 C 259.761 89.736,267.239 85.563,267.877 78.531 C 268.616 70.381,260.363 64.600,253.132 68.203 M180.097 98.790 C 164.486 102.576,159.087 122.180,170.501 133.633 C 182.004 145.175,201.958 139.327,205.329 123.427 C 208.503 108.452,194.924 95.193,180.097 98.790 M249.595 132.770 C 250.547 133.828,252.199 135.854,253.266 137.270 L 255.206 139.846 257.760 139.845 L 260.314 139.844 261.855 137.694 C 263.874 134.879,267.536 130.845,268.073 130.845 C 268.590 130.845,276.703 135.376,277.814 136.285 C 278.773 137.070,278.362 138.820,275.862 144.583 L 274.377 148.008 275.619 150.124 L 276.862 152.241 281.745 152.928 C 284.431 153.306,287.118 153.818,287.715 154.066 L 288.802 154.516 288.802 160.520 L 288.802 166.524 287.525 166.970 C 286.822 167.216,284.117 167.707,281.512 168.063 L 276.777 168.710 275.584 170.897 L 274.391 173.085 275.537 175.639 C 277.677 180.410,278.708 183.939,278.123 184.495 C 277.288 185.287,268.637 190.177,268.069 190.177 C 267.399 190.177,265.000 187.573,262.387 184.010 L 260.314 181.183 257.760 181.182 L 255.206 181.182 252.652 184.516 C 251.248 186.350,249.529 188.403,248.833 189.079 L 247.569 190.307 246.083 189.629 C 245.266 189.256,242.917 187.937,240.864 186.697 C 236.263 183.920,236.277 184.427,240.505 174.180 C 240.975 173.039,240.937 172.755,240.105 171.233 C 238.738 168.730,238.620 168.666,234.578 168.194 C 232.525 167.955,229.917 167.493,228.782 167.169 L 226.719 166.579 226.719 160.490 L 226.719 154.401 227.723 154.019 C 228.275 153.809,230.944 153.326,233.654 152.945 L 238.582 152.252 239.799 150.065 L 241.016 147.877 239.606 144.567 C 238.058 140.935,236.699 136.835,236.963 136.596 C 237.538 136.077,247.038 130.848,247.410 130.846 C 247.660 130.845,248.643 131.711,249.595 132.770 M255.007 150.442 C 247.401 152.938,244.843 162.268,250.277 167.701 C 257.906 175.331,270.462 167.904,267.566 157.476 C 266.198 152.550,259.690 148.905,255.007 150.442 "
                      stroke="none"
                      fill="currentColor"
                      fill-rule="evenodd"
                    ></path>
                  </g>
                </svg>
                <span class="text-router-sidemenu-2">Tangkas</span>
              </b-btn>
            </router-link>

            <router-link :to="{ path: '/mobile/games/L' }">
              <b-btn
                size="sm"
                block
                squared
                variant="dark"
                class="mb-1 text-left"
                style="background-color: black; border: 0px"
              >
                <svg
                  id="svg"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  width="20"
                  height="20"
                  viewBox="0, 0, 400,400"
                >
                  <g id="svgg">
                    <path
                      id="path0"
                      d="M183.704 43.348 C 157.735 47.401,130.522 64.869,116.048 86.776 L 111.816 93.182 105.723 93.672 C 67.370 96.752,36.785 117.004,20.698 149.970 C -7.604 207.966,24.982 276.887,87.625 291.529 L 93.399 292.879 95.611 296.995 C 126.604 354.661,204.717 375.312,261.481 340.846 C 340.808 292.680,338.454 176.486,257.267 132.843 L 250.154 129.019 254.673 126.738 C 285.119 111.369,321.572 117.519,344.348 141.866 C 376.585 176.328,370.259 230.512,330.888 257.158 C 321.367 263.602,318.651 270.829,323.358 277.190 C 330.370 286.665,341.943 282.665,360.040 264.511 C 421.738 202.619,382.303 100.733,293.917 93.669 L 288.204 93.212 283.936 86.791 C 262.670 54.795,222.346 37.318,183.704 43.348 M212.222 67.758 C 229.268 70.532,244.062 78.535,256.226 91.560 L 261.575 97.287 255.417 99.657 C 242.444 104.651,234.300 109.313,225.463 116.803 L 221.668 120.021 216.204 119.216 C 160.628 111.029,104.686 145.850,86.419 200.000 C 80.042 218.906,78.184 246.274,82.279 260.995 C 83.373 264.929,83.262 264.930,75.697 261.064 C 39.059 242.337,24.267 196.182,43.198 159.657 C 61.044 125.225,100.947 109.656,137.143 123.002 C 149.070 127.400,157.780 123.350,157.777 113.409 C 157.774 106.450,154.963 103.467,144.805 99.646 L 138.267 97.187 145.615 89.842 C 164.096 71.369,187.247 63.693,212.222 67.758 M220.000 144.807 C 307.660 164.580,322.558 282.929,242.458 323.218 C 182.606 353.323,111.402 313.412,105.203 246.284 C 99.384 183.265,158.565 130.950,220.000 144.807 M186.146 153.370 C 174.255 155.719,171.692 170.587,182.222 176.136 C 188.571 179.482,203.300 177.451,207.656 172.630 C 213.195 166.499,211.632 157.421,204.393 153.677 C 202.077 152.479,191.551 152.302,186.146 153.370 M154.235 165.217 C 148.043 167.703,133.210 181.819,127.194 190.951 C 113.903 211.125,108.564 238.840,116.495 246.489 C 125.871 255.533,135.719 249.761,137.510 234.173 C 139.857 213.732,147.717 200.010,164.049 187.844 C 176.754 178.379,168.552 159.469,154.235 165.217 M180.370 194.762 C 176.913 195.596,175.048 196.830,172.808 199.765 L 170.741 202.474 170.512 222.664 C 170.221 248.440,171.595 252.847,180.442 254.507 C 183.188 255.022,184.405 254.724,194.074 251.174 C 204.137 247.479,211.380 250.404,213.177 258.889 C 216.347 273.863,201.570 279.503,189.174 268.050 C 182.211 261.617,173.070 262.815,169.353 270.647 C 162.107 285.918,189.817 303.183,212.252 297.376 C 251.814 287.134,244.477 226.585,203.519 225.302 L 194.815 225.029 194.815 222.210 L 194.815 219.391 209.871 219.140 C 224.489 218.896,225.005 218.835,227.609 217.050 C 236.906 210.676,234.311 197.343,223.276 194.783 C 219.872 193.994,183.628 193.976,180.370 194.762 "
                      stroke="none"
                      fill="currentColor"
                      fill-rule="evenodd"
                    ></path>
                  </g>
                </svg>
                <span class="text-router-sidemenu-2">Togel</span>
              </b-btn>
            </router-link>

            <router-link :to="{ path: '/mobile/games/OG' }">
              <b-btn
                size="sm"
                block
                squared
                variant="dark"
                class="mb-1 text-left"
                style="background-color: black; border: 0px"
              >
                <b-icon icon="controller" class="mr-2"></b-icon>
                <span class="text-router-sidemenu">Game Lain</span>
              </b-btn>
            </router-link>

            <hr style="color: white; background-color: white" />

            <router-link :to="{ name: 'MobilePromotion' }">
              <b-btn
                size="sm"
                block
                squared
                variant="dark"
                class="mb-1 text-left"
                style="background-color: black; border: 0px"
              >
                <b-icon icon="gift-fill" class="mr-2"></b-icon>
                <span class="text-router-sidemenu">Promotion</span>
              </b-btn>
            </router-link>

            <router-link :to="{ name: 'MobileBlog' }">
              <b-btn
                size="sm"
                block
                squared
                variant="dark"
                class="mb-1 text-left"
                style="background-color: black; border: 0px"
              >
                <b-icon icon="receipt" class="mr-2"></b-icon>
                <span class="text-router-sidemenu">News</span>
              </b-btn>
            </router-link>

            <router-link :to="{ name: 'MobileRefferal' }">
              <b-btn
                size="sm"
                block
                squared
                variant="dark"
                class="mb-1 text-left"
                style="background-color: black; border: 0px"
              >
                <b-icon icon="people-fill" class="mr-2"></b-icon>
                <span class="text-router-sidemenu">Referral</span>
              </b-btn>
            </router-link>

            <router-link :to="{ name: 'MobileHelp' }">
              <b-btn
                size="sm"
                block
                squared
                variant="dark"
                class="mb-1 text-left"
                style="background-color: black; border: 0px"
              >
                <b-icon icon="question-circle-fill" class="mr-2"></b-icon>
                <span class="text-router-sidemenu">Bantuan</span>
              </b-btn>
            </router-link>

            <hr
              v-if="isAuthenticated"
              style="color: white; background-color: white"
            />

            <b-btn
              v-if="isAuthenticated"
              @click="logoutmobile()"
              size="sm"
              block
              squared
              variant="dark"
              class="mb-2 text-left"
              style="background-color: black; border: 0px"
            >
              <b-icon icon="box-arrow-right" class="mr-2"></b-icon>
              <span class="text-router-sidemenu">Logout</span>
            </b-btn>

            <div
              class="d-flex text-light align-items-center px-3 py-2"
              style="background-color: black; border: 0px"
            >
              <span
                class="center text-center justify-content-center"
                style="font-size: 10px; color: white; background-color: black"
                >Copyright @2021 Isobet</span
              >
            </div>
          </div>
        </VuePerfectScrollbar>
      </b-sidebar>
    </div>
    <b-modal
      id="gamelinkNav"
      hide-footer
      class="center"
      ref="gamelinkNav"
      centered
      size="sm"
      scrollable
    >
      <template #modal-header="{ close }" class="center">
        <h4 class="gamelink-text modal-title-20 center justify-content-center">
          POPUP LINK GAMES
        </h4>
        <b-button variant="outline-danger" @click="close()">
          <span class="center"> X </span>
        </b-button>
      </template>
      <ul class="row-pm-0 center">
        <p class="gamelink-paragraph">
          If the game doesn't open, <br />
          you can click the button below.
        </p>
        <a v-bind:href="this.linkGames" target="_blank">
          <b-btn class="gamelink-button"> OPEN GAME </b-btn>
        </a>
      </ul>
    </b-modal>
    <PinModal
      :isShown="params.showPin"
      :numbers="params.numbers"
      @submitPin="login"
    >
    </PinModal>
    <LoginMobile />
    <ForgotMobile />
  </div>
</template>
