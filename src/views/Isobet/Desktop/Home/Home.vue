<script>
import Vue from "vue";
import apiService from "@/services/api.service";
import VueNumber from "vue-number-animation";
import { mapState } from "vuex";
import Flip from "@/layouts/components/Flip.vue";
import Carousel from "@/layouts/components/Carousel.vue";
import { slider, slideritem } from "vue-concise-slider";
import { GET_LOBBY_PRODUCT } from "@/store/constants/actions.type";
import BaseLayout from "@/layouts/BaseLayout";

Vue.use(VueNumber);

export default {
  name: "Home",
  head: {
    link: [{ rel: "canonical", href: "http://158.255.47.199/home" }],
  },
  components: {
    Carousel,
    slider,
    slideritem,
    Flip,
    BaseLayout,
  },
  data() {
    return {
      counter: "05",
      counter1: "08",
      data: "",
      rulesData: {
        content: "",
      },
      isGameLoading: false,
      isValue: false,
      gamesProducts: [],
      gamesCode: null,
      gameList: [],
      someList: [
        {
          html: "slide1",
          style: {
            background: "#1bbc9b",
          },
        },
        {
          html: "slide2",
          style: {
            background: "#4bbfc3",
          },
        },
        {
          html: "slide3",
          style: {
            background: "#7baabe",
          },
        },
      ],
      options: {
        currentPage: 0,
        speed: 300,
        autoplay: "2000",
        itemAnimation: true,
        centeredSlides: false,
        thresholdDistance: 100,
        thresholdTime: 300,
        loopedSlides: 20,
        slidesToScroll: 1,
        loop: true,
        direction: "vertical",
        pagination: false,
      },
      options2: {
        currentPage: 0,
        autoplay: "7000",
        loop: true,
        loopedSlides: 10,
        itemAnimation: true,
        effect: "slide",
        timingFunction: "ease",
        pagination: true,
        centeredSlides: false,
      },
      info: null,
      linkGames: null,
    };
  },
  mounted() {
    // this.loadRules();
  },
  computed: {
    ...mapState({
      isAuthenticated: (state) => state.auth.isAuthenticated,
      currentUser: (state) => state.me.loggedInUser,
    }),
  },
  methods: {
    theFormat(number) {
      return `IDR 63.170.${number.toFixed(2)}`;
    },
    theFormat2(number) {
      return `IDR ${number.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    },
    loadRules() {
      this.changeLoader(true);
      this.ApiService.get("configuration/rules")
        .then((resp) => {
          this.rulesData = resp.data;
          console.log(this.rulesData);
        })
        .finally(() => {
          this.changeLoader(false);
        });
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
              var ua = navigator.userAgent.toLowerCase();
              var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
              var userAgent =
                navigator.userAgent || navigator.vendor || window.opera;
              // Android detection
              if (isAndroid) {
                // let param = '{"code":"openbrowser","url":"'+data.Metadata+'"}';
                // window.postMessage(param, "*");
                window.open(data.data, "_blank");
              }
              // iOS detection from: http://stackoverflow.com/a/9039885/177710
              else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
                this.linkGames = data.data;
                this.$bvModal.show("gamelinkHome");
                window.open(data.data, "_blank");
              }
              // Desktop detection
              else {
                window.open(data.data, "_blank");
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
                  this.$bvModal.show("gamelinkHome");
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
                  this.$bvModal.show("gamelinkHome");
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
                  this.$bvModal.show("gamelinkHome");
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
      this.isGameLoading = true;
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
      this.isGameLoading = false;
    },
    playGamesProduct(gameId, providerCode) {
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

      this.isGameLoading = true;
      let code = providerCode;

      if (this.isAuthenticated) {
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
        this.$store
          .dispatch(GET_LOBBY_PRODUCT, {
            gamesCode: code,
            productCode: gameId,
            deviceType: deviceType,
          })
          .then((data) => {
            if (code == "PPL" || code == "MX") {
              var ua = navigator.userAgent.toLowerCase();
              var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
              var userAgent =
                navigator.userAgent || navigator.vendor || window.opera;
              // Android detection
              if (isAndroid) {
                // let param = '{"code":"openbrowser","url":"'+data.Metadata+'"}';
                // window.postMessage(param, "*");
                window.open(data.Metadata, "_blank");
              }
              // iOS detection from: http://stackoverflow.com/a/9039885/177710
              else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
                this.linkGames = data.Metadata;
                this.$bvModal.show("gamelinkHome");
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
                this.$bvModal.show("gamelinkHome");
                window.open(data.Data, "_blank");
              }
              // Desktop detection
              else {
                window.open(data.Data, "_blank");
              }
            }
          })
          .catch((error) => {
            this.$notify({
              group: "errorgames",
              title: "KESALAHAN TERJADI",
              text: error,
              type: "error",
              closeOnClick: true,
              max: 1,
              ignoreDuplicates: true,
            });
          })
          .finally(() => {
            this.isGameLoading = false;
          });
      } else {
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
    notify() {
      this.$notify({
        group: "foo",
        type: "success",
        title: "Important message",
        text: "Hello user! This is a notification!",
      });
    },
  },
};
</script>

<template>
  <BaseLayout>
    <div class="home">
      <Carousel />
      <b-modal
        id="gamelinkHome"
        hide-footer
        class="center"
        ref="gamelinkHome"
        centered
        size="sm"
        scrollable
      >
        <template #modal-header="{ close }" class="center">
          <h4
            class="gamelink-text modal-title-20 center justify-content-center"
          >
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
      <div class="DesktopHome">
        <!-- Jackpot -->
        <div class="position-relative center" style="margin-top: 2%">
          <img
            loading="lazy"
            width="1200"
            height="145"
            style="width: 90%; border-radius: 20px"
            src="images/animation-jackpot.gif"
          />
          <div class="position-absolute animation-text">
            <number
              ref="number1"
              :from="6517312390"
              :to="9227312890"
              :format="theFormat2"
              :duration="50000000"
              :delay="2"
              easing="Power1.easeOut"
              class="animation-text-value"
            />
          </div>
        </div>
        <!-- Menu Service -->
        <div
          style="background-color: #000; margin-top: 0px; padding: 20px 60px"
        >
          <b-row class="center" align-v="center">
            <b-col cols="12" md="4" style="padding: 5px">
              <b-card style="background-color: #4a2156">
                <h4
                  style="
                    color: white;
                    font-weight: bold;
                    padding-bottom: 20px;
                    border-bottom: 1px solid white;
                  "
                >
                  Product
                </h4>
                <div style="width: 100%; margin: 0px auto; height: 370px">
                  <!-- Using the slider component -->
                  <slider ref="slider2" :options="options2">
                    <slideritem
                      style="width: 100%; margin-left: 10px; margin-right: 10px"
                    >
                      <b-card
                        style="
                          height: 250px;
                          padding: 0%;
                          margin: 0%;
                          border-radius: 0%;
                          background-color: #4a2156;
                          border: 0px solid;
                        "
                      >
                        <b-row style="padding: 0%; margin: 0%">
                          <h5 style="color: #dfb074; font-size: 20px">
                            SPORTS
                          </h5>
                        </b-row>
                        <b-row style="padding: 0%; margin: 0%">
                          <h6
                            class="left text-left"
                            style="color: white; font-size: 16px"
                          >
                            Well-known Asian & European view Sports <br />
                            Betting available here
                          </h6>
                        </b-row>

                        <b-row style="padding: 0%; margin: 0%; margin-top: 10%">
                          <h5 style="color: #dfb074; font-size: 20px">
                            E-GAMES
                          </h5>
                        </b-row>
                        <b-row style="padding: 0%; margin: 0%">
                          <h6
                            class="left text-left"
                            style="color: white; font-size: 16px"
                          >
                            We have Asian themed games as well as <br />
                            European themed games to cater the <br />
                            need of our Operators across the globe
                          </h6>
                        </b-row>
                      </b-card>
                    </slideritem>

                    <slideritem
                      style="width: 100%; margin-left: 10px; margin-right: 10px"
                    >
                      <b-card
                        style="
                          height: 250px;
                          padding: 0%;
                          margin: 0%;
                          border-radius: 0%;
                          background-color: #4a2156;
                          border: 0px solid;
                        "
                      >
                        <b-row style="padding: 0%; margin: 0%">
                          <h5 style="color: #dfb074; font-size: 20px">
                            LIVE CASINO
                          </h5>
                        </b-row>
                        <b-row style="padding: 0%; margin: 0%">
                          <h6
                            class="left text-left"
                            style="color: white; font-size: 16px"
                          >
                            Unforgettable experience with the best live <br />
                            casino games online
                          </h6>
                        </b-row>

                        <b-row style="padding: 0%; margin: 0%; margin-top: 10%">
                          <h5 style="color: #dfb074; font-size: 20px">
                            LOTTERY
                          </h5>
                        </b-row>
                        <b-row style="padding: 0%; margin: 0%">
                          <h6
                            class="left text-left"
                            style="color: white; font-size: 16px"
                          >
                            Bet now and enjoy big wins with our live <br />
                            lottery games such as Isin4D and Keno. <br />
                            Fast payout and hight winning odds <br />
                            guaranteed!
                          </h6>
                        </b-row>
                      </b-card>
                    </slideritem>

                    <slideritem
                      style="width: 100%; margin-left: 10px; margin-right: 10px"
                    >
                      <b-card
                        style="
                          height: 250px;
                          padding: 0%;
                          margin: 0%;
                          border-radius: 0%;
                          background-color: #4a2156;
                          border: 0px solid;
                        "
                      >
                        <b-row style="padding: 0%; margin: 0%">
                          <h5 style="color: #dfb074; font-size: 20px">POKER</h5>
                        </b-row>
                        <b-row style="padding: 0%; margin: 0%">
                          <h6
                            class="left text-left"
                            style="color: white; font-size: 16px"
                          >
                            Poker games - Avalaible Now! Enjoy all of <br />
                            Games today!
                          </h6>
                        </b-row>

                        <b-row style="padding: 0%; margin: 0%; margin-top: 10%">
                          <h5 style="color: #dfb074; font-size: 20px">
                            RACING
                          </h5>
                        </b-row>
                        <b-row style="padding: 0%; margin: 0%">
                          <h6
                            class="left text-left"
                            style="color: white; font-size: 16px"
                          >
                            HORSE RACING - Available Now! Enjou all <br />
                            of match races today!
                          </h6>
                        </b-row>
                      </b-card>
                    </slideritem>
                  </slider>
                </div>
              </b-card>
            </b-col>
            <b-col cols="12" md="4" style="padding: 5px">
              <b-card style="background-color: #4a2156">
                <h4
                  style="
                    color: white;
                    font-weight: bold;
                    padding-bottom: 20px;
                    border-bottom: 1px solid white;
                  "
                >
                  Member Service
                </h4>
                <div style="width: 100%; margin: 0px auto; height: 370px">
                  <!-- Using the slider component -->
                  <slider ref="slider3" :options="options2">
                    <slideritem
                      style="
                        width: 100%;
                        margin-left: 10px;
                        margin-right: 10px;
                        padding: 0px;
                        justify-content: left;
                      "
                    >
                      <b-row
                        style="
                          padding: 0px 0px;
                          margin: 0px;
                          width: 100%;
                          height: 250px;
                        "
                        align-v="center"
                      >
                        <b-row
                          style="padding: 0px 10%; margin: 0px; width: 100%"
                          align-v="center"
                        >
                          <b-col style="padding: 0%; margin: 0%" cols="7">
                            <b-row style="padding: 0%; margin: 0%">
                              <h5 style="color: #dfb074; font-size: 20px">
                                DEPOSIT
                              </h5>
                            </b-row>
                            <b-row style="padding: 0%; margin: 0%">
                              <h6
                                class="left text-left"
                                style="color: white; font-size: 16px"
                              >
                                Average Time
                              </h6>
                            </b-row>
                          </b-col>

                          <b-col style="padding: 0%; margin: 0%" cols="5">
                            <b-row
                              style="padding: 0%; margin: 0%"
                              align-v="center"
                            >
                              <b-col
                                style="padding: 0%; margin: 0%"
                                cols="12"
                                md="6"
                              >
                                <Flip
                                  v-bind:value="counter"
                                  style="
                                    font-size: 30px;
                                    margin: 0px;
                                    padding: 0px;
                                  "
                                />
                              </b-col>
                              <b-col
                                style="padding: 0%; margin: 0%"
                                cols="12"
                                md="6"
                              >
                                <h5 style="font-size: 15px; color: white">
                                  mins
                                </h5>
                              </b-col>
                            </b-row>
                          </b-col>
                          <b-col style="padding: 0%; margin: 0%" cols="12">
                            <b-progress
                              :value="40"
                              variant="warning"
                              striped
                              class="mt-2"
                              style="border-radius=30px;"
                            ></b-progress>
                          </b-col>
                        </b-row>

                        <b-row
                          style="
                            padding: 0px 10%;
                            margin: 0px;
                            width: 100%;
                            margin-top: 10px;
                          "
                          align-v="center"
                        >
                          <b-col style="padding: 0%; margin: 0%" cols="7">
                            <b-row style="padding: 0%; margin: 0%">
                              <h5 style="color: #dfb074; font-size: 20px">
                                WITHDRAWAL
                              </h5>
                            </b-row>
                            <b-row style="padding: 0%; margin: 0%">
                              <h6
                                class="left text-left"
                                style="color: white; font-size: 16px"
                              >
                                Average Time
                              </h6>
                            </b-row>
                          </b-col>

                          <b-col style="padding: 0%; margin: 0%" cols="5">
                            <b-row
                              style="padding: 0%; margin: 0%"
                              align-v="center"
                            >
                              <b-col
                                style="padding: 0%; margin: 0%"
                                cols="12"
                                md="6"
                              >
                                <Flip
                                  v-bind:value="counter1"
                                  style="
                                    font-size: 30px;
                                    margin: 0px;
                                    padding: 0px;
                                  "
                                />
                              </b-col>
                              <b-col
                                style="padding: 0%; margin: 0%"
                                cols="12"
                                md="6"
                              >
                                <h5 style="font-size: 15px; color: white">
                                  mins
                                </h5>
                              </b-col>
                            </b-row>
                          </b-col>
                          <b-col style="padding: 0%; margin: 0%" cols="12">
                            <b-progress
                              :value="80"
                              variant="warning"
                              striped
                              class="mt-2"
                              style="border-radius=30px;"
                            ></b-progress>
                          </b-col>
                        </b-row>
                        <b-row
                          style="
                            padding: 0px 10%;
                            margin: 0px;
                            width: 100%;
                            margin-top: 10px;
                          "
                          align-v="center"
                        >
                          <b-col style="padding: 0%; margin: 0%" cols="7">
                            <b-row style="padding: 0%; margin: 0%">
                              <h5 style="color: #dfb074; font-size: 20px">
                                PENGGUNA ONLINE
                              </h5>
                            </b-row>
                            <b-row style="padding: 0%; margin: 0%">
                              <b-row style="padding: 0%; margin: 0%">
                                <img
                                  loading="lazy"
                                  width="65"
                                  height="65"
                                  style="width: 100%; border-radius: 10px"
                                  :src="
                                    require('@/assets/images/icon/onlineuser_icon.png')
                                  "
                                />
                              </b-row>
                            </b-row>
                          </b-col>
                          <b-col style="padding: 0%; margin: 0%" cols="5">
                            <b-row
                              style="padding: 0%; margin: 0%"
                              align-v="center"
                            >
                              <b-col
                                style="padding: 0%; margin: 0%"
                                cols="12"
                                md="6"
                              >
                                &nbsp;
                              </b-col>
                              <b-col
                                style="padding: 0%; margin: 0%"
                                cols="12"
                                md="6"
                              >
                                <h5 style="font-size: 1.5rem; color: #dfb074">
                                  120666
                                </h5>
                                <h5
                                  style="
                                    font-size: 15px;
                                    color: white;
                                    margin-left: -52px;
                                  "
                                >
                                  Person / Per hour
                                </h5>
                              </b-col>
                            </b-row>
                          </b-col>
                        </b-row>
                      </b-row>
                    </slideritem>

                    <!-- <slideritem style="width:100%; margin-left:10px; margin-right:10px;">
                        <b-row style="padding:0%; margin:0%; height:250px;">
                          <b-col class="text-left left" style="padding:0%; margin:0%;">
                            <b-row class="text-left left" style="padding:0%; margin:0%; height:50px;" align-v="center" >
                              <img loading="lazy"  style="width:100%; border-radius:10px; width:50px; height:50px;" src="https://ik.imagekit.io/splat4321cdn/Isobet/icon/testing-service-3_ASUsdQbur.png" width="50" height="50"/>   
                              <h5 style="color:#DFB074; font-size:20px;">LIVE HELP</h5> 
                            </b-row>              
                          </b-col>            
                        </b-row>          
                      </slideritem> -->
                  </slider>
                </div>
              </b-card>
            </b-col>
            <b-col cols="12" md="4" style="padding: 5px">
              <b-card style="background-color: #4a2156">
                <h4
                  style="
                    color: white;
                    font-weight: bold;
                    padding-bottom: 20px;
                    border-bottom: 1px solid white;
                  "
                >
                  Bank
                </h4>
                <div style="width: 100%; margin: 0px auto; height: 370px">
                  <!-- Using the slider component -->
                  <slider ref="slider2" :options="options2">
                    <slideritem
                      style="width: 100%; margin-left: 10px; margin-right: 10px"
                    >
                      <b-row
                        style="
                          padding: 0px 0px;
                          margin: 0px;
                          width: 100%;
                          height: 250px;
                        "
                        align-v="start"
                      >
                        <b-row
                          style="padding: 0px 10%; margin: 0px; width: 100%"
                          align-v="start"
                        >
                          <b-col style="padding: 0%; margin: 0%" cols="7">
                            <b-row style="padding: 0%; margin: 0%">
                              <h5 style="color: #dfb074; font-size: 20px">
                                SUPPORTED BANK
                              </h5>
                            </b-row>
                          </b-col>
                        </b-row>
                        <b-row
                          style="padding: 0%; margin: 0%; width: 100%"
                          align-v="start"
                        >
                          <b-col style="padding: 0%; margin: 0%">
                            <b-row style="padding: 5%; margin: 0%">
                              <img
                                loading="lazy"
                                width="19"
                                height="19"
                                style="
                                  height: 0%;
                                  border-radius: 10px;
                                  margin: 5%;
                                "
                                :src="
                                  require('@/assets/images/icon/button-online.png')
                                "
                              />
                              <img
                                loading="lazy"
                                width="96"
                                height="36"
                                style="width: 60%"
                                :src="require('@/assets/images/logo/BCA.png')"
                              />
                            </b-row>
                            <b-row style="padding: 5%; margin: 0%">
                              <img
                                loading="lazy"
                                width="19"
                                height="19"
                                style="
                                  height: 0%;
                                  border-radius: 10px;
                                  margin: 5%;
                                "
                                :src="
                                  require('@/assets/images/icon/button-online.png')
                                "
                              />
                              <img
                                loading="lazy"
                                width="96"
                                height="36"
                                style="width: 60%"
                                :src="require('@/assets/images/logo/BNI.png')"
                              />
                            </b-row>
                          </b-col>
                          <b-col style="padding: 0%; margin: 0%">
                            <b-row style="padding: 5%; margin: 0%">
                              <img
                                loading="lazy"
                                width="19"
                                height="19"
                                style="
                                  height: 0%;
                                  border-radius: 10px;
                                  margin: 5%;
                                "
                                :src="
                                  require('@/assets/images/icon/button-online.png')
                                "
                              />
                              <img
                                loading="lazy"
                                width="96"
                                height="36"
                                style="width: 60%"
                                :src="require('@/assets/images/logo/BRI.png')"
                              />
                            </b-row>
                            <b-row style="padding: 5%; margin: 0%">
                              <img
                                loading="lazy"
                                width="19"
                                height="19"
                                style="
                                  height: 0%;
                                  border-radius: 10px;
                                  margin: 5%;
                                "
                                :src="
                                  require('@/assets/images/icon/button-online.png')
                                "
                              />
                              <img
                                loading="lazy"
                                width="96"
                                height="36"
                                style="width: 60%"
                                :src="
                                  require('@/assets/images/logo/MANDIRI.png')
                                "
                              />
                            </b-row>
                          </b-col>
                        </b-row>
                      </b-row>
                    </slideritem>
                  </slider>
                </div>
              </b-card>
            </b-col>
          </b-row>
        </div>
        <!-- Menu Tambahan -->
        <div style="background-color: #000">
          <b-row
            class="align-center center justify-content-center"
            style="
              background-color: #000;
              padding-top: 15px;
              padding-bottom: 20px;
            "
          >
            <b-button class="text-menu-bottom" :to="{ name: 'Promotion' }">
              Promosi
            </b-button>
            <b-button class="text-menu-bottom" :to="{ name: 'Blog' }">
              Berita
            </b-button>
            <b-button class="text-menu-bottom" :to="{ name: 'Refferal' }">
              Referral
            </b-button>
            <b-button class="text-menu-bottom" :to="{ name: 'Help' }">
              Bantuan
            </b-button>
            <b-button
              class="text-menu-bottom"
              target="_blank"
              href="http://165.22.253.162/keluaran-togel.amp"
            >
              Live Score
            </b-button>
          </b-row>
        </div>
        <!-- Menu & Winner List -->
        <div style="margin-bottom: 3%">
          <b-row style="padding: 0%; margin: 0%">
            <b-col
              cols="12"
              md="1"
              style="background-color: black; padding: 0%; margin: 0%"
            >
            </b-col>
            <b-col
              cols="12"
              md="2"
              style="
                background-color: black;
                padding: 0%;
                margin: 0%;
                margin-right: 1%;
              "
            >
              <b-row
                style="
                  padding: 2%;
                  margin: 0%;
                  background-image: linear-gradient(#101010, #161616, #1d1d1d);
                "
              >
                <b-col cols="12" md="2" class="center">
                  <img
                    loading="lazy"
                    width="25"
                    height="25"
                    style="width: 25px; height: 25px"
                    :src="require('@/assets/images/icon/piala.png')"
                  />
                </b-col>
                <b-col cols="12" md="10" class="center">
                  <span style="font-weight: bold; color: white">
                    WINNER PLAYER
                  </span>
                </b-col>
              </b-row>
              <b-row
                style="
                  padding: 0% 8% 0% 8%;
                  margin: 0%;
                  background-image: linear-gradient(#101010, #161616, #1d1d1d);
                  height: 300px;
                "
              >
                <div style="width: 100%; margin: 0px; height: 300px">
                  <slider
                    ref="slider"
                    :options="options"
                    style="
                      width: 100%;
                      margin: 0px;
                      padding: 0px;
                      height: 300px;
                    "
                  >
                    <slideritem
                      style="width: 100%; padding: 0%; margin: 0%; height: 50px"
                    >
                      <div
                        style="
                          background-color: white;
                          width: 100%;
                          padding: 0%;
                          margin: 0%;
                        "
                      >
                        <b-row
                          style="width: 100%; padding: 0%; margin: 0%"
                          align-v="center"
                        >
                          <b-col cols="12" md="3">
                            <img
                              loading="lazy"
                              width="30"
                              height="30"
                              style="width: 30px"
                              :src="
                                require('@/assets/images/icon/profile-user.png')
                              "
                            />
                          </b-col>
                          <b-col cols="12" md="9">
                            <b-row>
                              <h6
                                style="
                                  font-size: 10px;
                                  color: black;
                                  font-weight: bold;
                                "
                              >
                                Ru****04
                              </h6>
                            </b-row>
                            <b-row>
                              <h6 style="font-size: 10px; color: #db7702">
                                IDR 200.063,65
                              </h6>
                            </b-row>
                          </b-col>
                        </b-row>
                      </div>
                    </slideritem>
                    <slideritem
                      style="width: 100%; padding: 0%; margin: 0%; height: 50px"
                    >
                      <div
                        style="
                          background-color: white;
                          width: 100%;
                          padding: 0%;
                          margin: 0%;
                        "
                      >
                        <b-row
                          style="width: 100%; padding: 0%; margin: 0%"
                          align-v="center"
                        >
                          <b-col cols="12" md="3">
                            <img
                              loading="lazy"
                              width="30"
                              height="30"
                              style="width: 30px"
                              :src="
                                require('@/assets/images/icon/profile-user.png')
                              "
                            />
                          </b-col>
                          <b-col cols="12" md="9">
                            <b-row>
                              <h6
                                style="
                                  font-size: 10px;
                                  color: black;
                                  font-weight: bold;
                                "
                              >
                                Ha****13
                              </h6>
                            </b-row>
                            <b-row>
                              <h6 style="font-size: 10px; color: #db7702">
                                IDR 200.234,25
                              </h6>
                            </b-row>
                          </b-col>
                        </b-row>
                      </div>
                    </slideritem>
                    <slideritem
                      style="width: 100%; padding: 0%; margin: 0%; height: 50px"
                    >
                      <div
                        style="
                          background-color: white;
                          width: 100%;
                          padding: 0%;
                          margin: 0%;
                        "
                      >
                        <b-row
                          style="width: 100%; padding: 0%; margin: 0%"
                          align-v="center"
                        >
                          <b-col cols="12" md="3">
                            <img
                              loading="lazy"
                              width="30"
                              height="30"
                              style="width: 30px"
                              :src="
                                require('@/assets/images/icon/profile-user.png')
                              "
                            />
                          </b-col>
                          <b-col cols="12" md="9">
                            <b-row>
                              <h6
                                style="
                                  font-size: 10px;
                                  color: black;
                                  font-weight: bold;
                                "
                              >
                                Yu****21
                              </h6>
                            </b-row>
                            <b-row>
                              <h6 style="font-size: 10px; color: #db7702">
                                IDR 100.304,25
                              </h6>
                            </b-row>
                          </b-col>
                        </b-row>
                      </div>
                    </slideritem>
                    <slideritem
                      style="width: 100%; padding: 0%; margin: 0%; height: 50px"
                    >
                      <div
                        style="
                          background-color: white;
                          width: 100%;
                          padding: 0%;
                          margin: 0%;
                        "
                      >
                        <b-row
                          style="width: 100%; padding: 0%; margin: 0%"
                          align-v="center"
                        >
                          <b-col cols="12" md="3">
                            <img
                              loading="lazy"
                              width="30"
                              height="30"
                              style="width: 30px"
                              :src="
                                require('@/assets/images/icon/profile-user.png')
                              "
                            />
                          </b-col>
                          <b-col cols="12" md="9">
                            <b-row>
                              <h6
                                style="
                                  font-size: 10px;
                                  color: black;
                                  font-weight: bold;
                                "
                              >
                                Gi****19
                              </h6>
                            </b-row>
                            <b-row>
                              <h6 style="font-size: 10px; color: #db7702">
                                IDR 500.323,05
                              </h6>
                            </b-row>
                          </b-col>
                        </b-row>
                      </div>
                    </slideritem>
                    <slideritem
                      style="width: 100%; padding: 0%; margin: 0%; height: 50px"
                    >
                      <div
                        style="
                          background-color: white;
                          width: 100%;
                          padding: 0%;
                          margin: 0%;
                        "
                      >
                        <b-row
                          style="width: 100%; padding: 0%; margin: 0%"
                          align-v="center"
                        >
                          <b-col cols="12" md="3">
                            <img
                              loading="lazy"
                              width="30"
                              height="30"
                              style="width: 30px"
                              :src="
                                require('@/assets/images/icon/profile-user.png')
                              "
                            />
                          </b-col>
                          <b-col cols="12" md="9">
                            <b-row>
                              <h6
                                style="
                                  font-size: 10px;
                                  color: black;
                                  font-weight: bold;
                                "
                              >
                                Ke****09
                              </h6>
                            </b-row>
                            <b-row>
                              <h6 style="font-size: 10px; color: #db7702">
                                IDR 200.163,65
                              </h6>
                            </b-row>
                          </b-col>
                        </b-row>
                      </div>
                    </slideritem>
                    <slideritem
                      style="width: 100%; padding: 0%; margin: 0%; height: 50px"
                    >
                      <div
                        style="
                          background-color: white;
                          width: 100%;
                          padding: 0%;
                          margin: 0%;
                        "
                      >
                        <b-row
                          style="width: 100%; padding: 0%; margin: 0%"
                          align-v="center"
                        >
                          <b-col cols="12" md="3">
                            <img
                              loading="lazy"
                              width="30"
                              height="30"
                              style="width: 30px"
                              :src="
                                require('@/assets/images/icon/profile-user.png')
                              "
                            />
                          </b-col>
                          <b-col cols="12" md="9">
                            <b-row>
                              <h6
                                style="
                                  font-size: 10px;
                                  color: black;
                                  font-weight: bold;
                                "
                              >
                                Ju****77
                              </h6>
                            </b-row>
                            <b-row>
                              <h6 style="font-size: 10px; color: #db7702">
                                IDR 100.123,15
                              </h6>
                            </b-row>
                          </b-col>
                        </b-row>
                      </div>
                    </slideritem>
                  </slider>
                </div>
              </b-row>
            </b-col>
            <b-col cols="12" md="8" style="padding: 0%; margin: 0%">
              <!-- Menu Games -->
              <div class="home-banner-container">
                <b-row>
                  <b-col class="games-type justify-content-center center">
                    <router-link :to="{ path: '/games/SB' }">
                      <img
                        loading="lazy"
                        width="120"
                        height="120"
                        :src="
                          require('@/assets/images/button/home/games-home-3.png')
                        "
                        alt="sportsbook"
                      />
                    </router-link>
                  </b-col>
                  <b-col class="games-type justify-content-center center">
                    <router-link :to="{ path: '/games/LC' }">
                      <img
                        loading="lazy"
                        width="120"
                        height="120"
                        :src="
                          require('@/assets/images/button/home/games-home-2.png')
                        "
                        alt="sportsbook"
                      />
                    </router-link>
                  </b-col>
                  <b-col class="games-type justify-content-center center">
                    <router-link :to="{ path: '/games/P' }">
                      <img
                        loading="lazy"
                        width="120"
                        height="120"
                        :src="
                          require('@/assets/images/button/home/games-home-4.png')
                        "
                        alt="sportsbook"
                      />
                    </router-link>
                  </b-col>
                  <b-col class="games-type justify-content-center center">
                    <router-link :to="{ path: '/games/S' }">
                      <img
                        loading="lazy"
                        width="120"
                        height="120"
                        :src="
                          require('@/assets/images/button/home/games-home-1.png')
                        "
                        alt="sportsbook"
                      />
                    </router-link>
                  </b-col>
                </b-row>
              </div>
              <!-- Menu Provider -->
              <div class="home-banner-container-2">
                <b-row>
                  <b-col class="games-type justify-content-center center">
                    <router-link :to="{ path: '/games/S' }">
                      <img
                        loading="lazy"
                        width="142"
                        height="50"
                        :src="
                          require('@/assets/images/button/home/games-logo-1.png')
                        "
                      />
                    </router-link>
                  </b-col>
                  <b-col class="games-type justify-content-center center">
                    <router-link :to="{ path: '/games/S' }">
                      <img
                        loading="lazy"
                        width="100"
                        height="50"
                        :src="
                          require('@/assets/images/button/home/games-logo-2.png')
                        "
                      />
                    </router-link>
                  </b-col>
                  <b-col class="games-type justify-content-center center">
                    <router-link :to="{ path: '/games/S' }">
                      <img
                        loading="lazy"
                        width="100"
                        height="50"
                        :src="
                          require('@/assets/images/button/home/games-logo-3.png')
                        "
                      />
                    </router-link>
                  </b-col>
                  <b-col class="games-type justify-content-center center">
                    <router-link :to="{ path: '/games/S' }">
                      <img
                        loading="lazy"
                        width="100"
                        height="50"
                        :src="
                          require('@/assets/images/button/home/games-logo-4.png')
                        "
                      />
                    </router-link>
                  </b-col>
                  <b-col class="games-type justify-content-center center">
                    <router-link :to="{ path: '/games/S' }">
                      <img
                        loading="lazy"
                        width="100"
                        height="50"
                        :src="
                          require('@/assets/images/button/home/games-logo-5.png')
                        "
                      />
                    </router-link>
                  </b-col>
                </b-row>
              </div>
              <!-- Pembatas -->
              <div class="home-banner-container-3"></div>
            </b-col>
            <b-col
              cols="12"
              md="1"
              style="background-color: black; padding: 0%; margin: 0%"
            >
            </b-col>
          </b-row>
        </div>
      </div>
      <!-- SEO Description -->
      <b-row class="DesktopHome home-text-title" align-v="center">
        <h1 class="home-text-description">
          Slot Online Depo Pulsa IsoBet Situs Slot
        </h1>
      </b-row>
      <b-row class="DesktopHome home-text-subtitle">
        <h2 class="home-subtext-description">
          Game
          <a
            href="http://158.255.47.199/"
            rel="noopener noreferrer"
            target="_blank"
            >slot online</a
          >
          menjadi salah satu cara yang bisa dilakukan oleh para penjelajah
          online untuk mencari uang secara online dengan bermain di situs
          <a
            href="http://158.255.47.199/"
            rel="noopener noreferrer"
            target="_blank"
            >slot depo pulsa</a
          >. Dengan hanya mengandalkan koneksi internet dan pulsa telpon, para
          pemaian game slot sudah bisa bermain game slot online pada mesin slot
          kesukaannya di mana pun dan kapan pun menggunakan ponsel pintar
          ataupun komputer yang mereka miliki. Tentunya permainan harus di
          lakukan di situs judi slot online yang saat ini agen judi slot online
          atau singkatnya <strong> agen slot </strong> dapat mudah di cari dan
          didapatkan dari daftar slot online terbaik di Internet. <br /><br />
          Meski kelihatannya mudah untuk mendapatkan
          <strong>slot terpercaya</strong>, ada beberapa kendala yang biasanya
          dihadapi ketika akan bermain online slot di casino online. Salah
          satunya adalah memilih situs judi online untuk mendapatkan
          <strong>agen slot online terbaik</strong>. Tidak sedikit situs slot
          online baru yang justru melakukan kecurangan dan membuat para pemain
          terus mengalami kekalahan. Jika bertemu dengan bandar judi slot
          seperti ini, berapa pun modal uang asli dan pulsa yang Anda miliki
          akan habis terkuras dalam waktu yang relatif singkat . <br /><br />
          Untuk mengantisipasi kejadian seperti ini maka kita dapat mencari
          terlebih dahulu di internet situs slot online deposit pulsa tanpa
          potongan apa yang direkomendasikan terutama di rekomendasikan pada
          daftar slot terpercaya. Pilihlah situs judi slot online yang memang
          sudah memiliki rekam jejak dan feedback bagus di internet, seperti
          <strong>IsoBet slot depo pulsa</strong>. Isobet mengkhususkan diri
          pada slot online deposit pulsa tanpa potongan yang tentunya adalah
          judi slot deposit pulsa dai beragam jenis. <br /><br />
          IsoBet <strong>situs judi slot</strong> merupakan official partner
          dari beberapa publisher games judi online terkemuka dunia dan terkenal
          sebagai <strong>agen judi slot online</strong> yang bonafide. Anda
          bisa bermain judi slot online deposit pulsa ternama, seperti
          <a
            href="https://www.pragmaticplay.com/"
            rel="noopener noreferrer"
            target="_blank"
            >Pragmatic Play</a
          >
          dan
          <a
            href="https://habanerosystems.com/"
            rel="noopener noreferrer"
            target="_blank"
            >Habanero Slot</a
          >
          hingga judi bola di IsoBet judi online slot. Yakinlah pasti agen judi
          slot satu-satunya yang banyak beredar di dunia maya dan terkenal akan
          keamanan slot terpercaya adalah cuma
          <strong>Isobet judi slot online</strong> terpercaya. <br /><br />
          Berbekal menjadi partner resmi situs judi slot online di Indonesia,
          <strong>IsoBet</strong> dipastikan bebas dari kecurangan sehingga Anda
          bisa bermain dengan tenang dan nyaman. Terlebih lagi, situs
          <strong>IsoBet</strong> dapat dengan mudah diakses lewat banyak
          perangkat seperti komputer, laptop, serta smartphone dengan sistem
          operasi Android ataupun iOs dan semua tentunya untuk bermain game slot
          online deposit pulsa tanpa potongan.<br />
        </h2>
      </b-row>
      <b-row class="DesktopHome home-text-title" align-v="center">
        <h2 class="home-text-description">
          Bandar Gaming Slot Online Terpercaya
        </h2>
      </b-row>
      <b-row class="DesktopHome home-text-subtitle">
        <h3 class="home-subtext-description">
          Judi <strong>slot deposit pulsa</strong> yang biasanya hanya bisa
          dimainkan di mesin slot yang terdapat di game slot casino kini bisa
          dimainkan di mana saja dan kapan saja lewat salah satu bentuk judi
          slot online terpercaya, atau singkatnya game slot. Lewat situs slot
          online, semuanya dimainkan melalui salah satu situs judi slot yang
          telah dijalin kerjasamanya dengan provider game slot online di dunia.
          Di Indonesia sendiri, salah satu situs judi slot online yang telah
          melakukan kerja sama dengan berbagai publisher judi slot online
          terpercaya adalah IsoBet. Moto IsoBet adalah "Memberikan pengalaman
          dan keuntungan luar biasa kepada para pemain slot depo pulsa hanya di
          situs judi slot online terpercaya IsoBet". <br /><br />
          Tentunya kita sudah tidak asing dengan provider slot online seperti
          <a
            href="http://5.77.39.126/"
            rel="noopener noreferrer"
            target="_blank"
            >Hotwin</a
          >, slot joker123, slot Pragmatic Play, Habanero Slot, Microgaming,
          Spade Gaming ataupun RTG Slot. Game-game slot online mereka merupakan
          game-game slot online yang paling sering dimainkan pemain slot online
          uang asli di seluruh dunia. Selain itu mereka juga dapat bermain
          gaming slot lain di mesin slot online seperti live casino online,
          poker online hingga ke judi bola. Inti dari kesemuanya adalah ingin
          mendapatkan bonus jackpot dari salah satu penyedia situs judi slot
          online terpercaya 24 jam. <br /><br />
          Masing-masing provider membawa puluhan hingga ratusan game slot online
          yang bisa Anda mainkan sesuai dengan kegemaran kita. Masing-masing
          game slot terbaik ini tentunya memiliki tema yang berbeda, mulai dari
          tema sejarah hingga film yang tengah populer saat ini. Selain itu,
          masing-masing permainan judi <strong>slot deposit pulsa</strong> baik
          dengan deposit via pulsa telkomsel, link aja atau yang lain, juga
          mempunyai nilai maksimal jackpot yang berbeda di setiap taruhan judi,
          sehingga kita memiliki banyak pilihan ingin bermain di game judi slot
          pulsa yang relatif mudah mendapatkan jackpot terbesar tetapi nilainya
          kecil atau yang jarang bonus jackpot tapi nilainya sangat besar.
          <br /><br />
          Tentunya dengan bermain <strong>slot depo pulsa</strong> di IsoBet
          Anda akan mendapat berbagai keuntungan yang tidak bisa Anda dapatkan
          di situs judi slot online lainnya. Berikut ini adalah ulasan dari
          keuntungan ikut serta menjadi
          <a
            href="http://158.255.47.199/register"
            rel="noopener noreferrer"
            target="_blank"
            >new member</a
          >
          di IsoBet situs judi slot online terpercaya:<br />
        </h3>
      </b-row>
      <b-row class="DesktopHome home-subtext-title" align-v="center">
        <h2 class="home-subtext-subdescription">
          Keuntungan Main di Situs Slot IsoBet
        </h2>
      </b-row>
      <b-row class="DesktopHome home-text-subtitle">
        <h3 class="home-subtext-description">
          Satu keuntungan new member terbesar jika main
          <strong>slot depo pulsa</strong> di IsoBet slot indonesia online resmi
          adalah kita akan mendapatkan berbagai bonus yang tidak bisa didapatkan
          di situs judi online indonesia lainnya. Apa saja keuntungan terbaik
          slot yang dimaksud? Berikut ini beberapa di antaranya: <br />
        </h3>
      </b-row>
      <b-row class="DesktopHome home-subtext-title" align-v="center">
        <h2 class="home-subtext-subdescription-small">
          Bonus dan Promosi Menarik
        </h2>
      </b-row>
      <b-row class="DesktopHome home-text-subtitle">
        <h3 class="home-subtext-description">
          Dengan bermain di situs Isobet online resmi mudah menang kita memiliki
          kesempatan untuk mendapatkan bonus dan promosi menarik berupa saldo
          deposit pulsa tanpa potongan yang bisa digunakan sebagai tambahan
          modal dalam bermain <strong>slot depo pulsa</strong> pada situs judi
          slot online terbaik. Semua jenis online slot pada daftar slot di
          IsoBet memastikan member mendapatkan bonus dan promosi terbaik baik
          itu pulsa maupun uang asli, dan tenutnya
          <strong>slot deposit pulsa</strong> menjadi pilihan member teratas di
          agen slot deposit pulsa indonesia. <br /><br />
          Sebagai contoh, saat ini tersedia promosi bonus welcome member 100%
          dan deposit pulsa tanpa potongan, di mana member baru dapat bonus
          kredit secara gratis dan kita akan tetap mendapatkan uang asli dalam
          kredit judi
          <a
            href="http://158.255.47.199/"
            rel="noopener noreferrer"
            target="_blank"
            >slot deposit pulsa</a
          >
          kita. Dalam waktu tertentu pun tersedia event freespin situs judi
          slot. Kami juga akan mengadakan event setiap bulannya dengan hadiah
          menarik bagi para pecinta game judi online slot terutama bonus double
          bagi para VIP member agen slot IsoBet situs judi slot depo pulsa
          terbaik. <br />
        </h3>
      </b-row>
      <b-row class="DesktopHome home-subtext-title" align-v="center">
        <h2 class="home-subtext-subdescription-small">
          Jackpot Terbesar Slot Online Terbesar
        </h2>
      </b-row>
      <b-row class="DesktopHome home-text-subtitle">
        <h3 class="home-subtext-description">
          Semua dari kita ingin mendapatkan jackpot ketika sedang bermain di
          situs slot baik itu mesi slot, live casino online ataupun taruhan judi
          lainnya di agen judi slot terpercaya. Apalagi jika hadiah yang bisa
          didapat jumlahnya sangat besar bukan? <br /><br />
          Jika kita main di situs judi online slot seperti IsoBet agen slot,
          kita memiliki kesempatan untuk meraih kemenangan
          <strong>slot deposit pulsa</strong> hingga ratusan juta rupiah. Anda
          tidak perlu takut jika kemenangan
          <strong>slot depo pulsa</strong> Anda pada permaian situs judi slot
          tidak dibayarkan karena tidak ada batas maximal withdraw di IsoBet
          agen judi online, naik itu ratusan juga hingga miliaran rupiah di
          semua permainan mudah menang seperti slot terbaik slot Joker123, slot
          Pragmatic, Poker Online Indonesia ataupun game judi slot lainnya --
          semua pasti dibayar. Para new member dipastikan akan nyaman dan aman
          atas transaksinya karena IsoBet agen slot online sebagai mitra para
          provider game kelas dunia menyiapkan customer service 24 jam slot
          terbaik selama permainan kita. Customer service 24 jam ini akan
          mendampingi para pemain slot depo pulsa dalam permainan di situs slot
          IsoBet agen judi online terbesar dan penyedia slot indonesia slot
          terbaik. <br />
        </h3>
      </b-row>
      <b-row class="DesktopHome home-subtext-title" align-v="center">
        <h2 class="home-subtext-subdescription-small">
          Data Pribadi Dijamin Keamanannya
        </h2>
      </b-row>
      <b-row class="DesktopHome home-text-subtitle">
        <h3 class="home-subtext-description">
          Kebocoran data tentu menjadi hal yang paling ingin dihindari oleh
          penjudi di mana pun mereka bermain. Hal ini dikarenakan kebocoran data
          akan membuat identitas asli pemain akan tersebar luas dan mengganggu
          kenyamanan dan keamanan dari para pejudi. <br /><br />
          Anda tidak perlu takut hal ini terjadi jika bermain slot online di
          Isobet <strong>slot depo pulsa</strong>. Setelah Anda melakukan
          registrasi, setiap data member di situs judi slot IsoBet yang diterima
          akan di-enkripsi dengan sistem tercanggih sehingga data diri pribadi
          aman dan tidak akan jatuh ke tangan yang salah. Semua data baik data
          pribadi, data finansial, data permainan mesin slot, semua deposit
          pulsa tanpa potongan akan aman disimpan di database kami. <br />
        </h3>
      </b-row>
      <b-row class="DesktopHome home-subtext-title" align-v="center">
        <h2 class="home-subtext-subdescription">
          Cara Menang Judi Online dengan Mudah
        </h2>
      </b-row>
      <b-row class="DesktopHome home-text-subtitle">
        <h3 class="home-subtext-description">
          Siapapun pastinya ingin memainkan permainan judi online yang mudah
          menang di bandar judi slot. Tentunya ini dikarenakan jackpot atau
          bonus judi online yang besar tentunya sudah menanti untuk bisa diraih
          para pemenang slot terpercaya. Meski begitu, ada beberapa langkah yang
          bisa Anda lakukan agar kemenangan dalam bermain slot online ini bisa
          didapatkan dengan mudah dari bandar judi slot deposit pulsa tanpa
          potongan. Berikut ini beberapa langkah yang bisa Anda lakukan: <br />
        </h3>
      </b-row>
      <b-row class="DesktopHome home-subtext-title" align-v="center">
        <h2 class="home-subtext-subdescription-small">
          Pahami main slot deposit pulsa tanpa potongan
        </h2>
      </b-row>
      <b-row class="DesktopHome home-text-subtitle">
        <h3 class="home-subtext-description">
          Memahami permainan slot deposit pulsa tanpa potongan adalah merupakan
          hal paling penting dan biasanya justru tidak diingat oleh seseorang
          sebelum mulai memainkan slot pulsa. Jika Anda tidak memahami permainan
          judi online slot pulsa yang ingin dimainkan, hal ini sama saja seperti
          membeli kucing dalam karung. Anda hanya akan bermain judi slot
          terpercaya tanpa tahu apa yang akan dihadapi. Customer service Isobet
          siap membantu dan memandu segala pertanyaan maupun keluh kesah para
          VIP member IsoBet <strong>slot deposit pulsa tanpa potongan.</strong>
          <br /><br />
          Sebagai contoh bermain slot deposit pulsa tanpa potongan. Sebelum
          bermain, ada baiknya jika Anda mengenal dan menghafalkan kombinasi
          simbol
          <a
            href="https://en.wikipedia.org/wiki/Slot_machine"
            rel="noopener noreferrer"
            target="_blank"
            >slot</a
          >
          yang bisa menghadirkan jackpot dalam judi slot online di situs slot
          terbaru. Tanpa mengenal kombinasi ini, mustahil Anda bisa memenangkan
          permainan slot terbaru yang baru dilihat dan dikenal. Begitu juga
          apabila mau bermain di
          <strong>slot deposit pulsa tanpa potongan</strong> terpercaya di
          Indonesia lainnya. bermain slot terbaru pulsa tentu harus mencoba demo
          nya terlebih dahulu sebelum main dengan bandar judi sebenarnya.
          <br /><br />
          Hal yang sama juga harus Anda lakukan sebelum main di situs
          <strong>slot deposit pulsa tanpa potongan</strong> lainnya. Beberapa
          permainan <strong>slot depo pulsa</strong> biasanya berhubungan dengan
          teori probabilitas sehingga Anda harus bisa melakukan analisa
          permainan dengan mudah di setiap daftar slot online terbaik yang ada.
          <br /><br />
          Sebagai situs <strong>slot deposit pulsa</strong> terbaik di
          Indonesia, kami memberikan Anda kesempatan untuk melakukan uji coba
          permainan judi sebelum mulai memasang taruhan pada daftar slot online
          bandar judi casino online terpercaya di indonesia. Manfaatkan hal
          tersebut agar Anda bisa meraih keuntungan maksimal dari slot terbaru.
          <br />
        </h3>
      </b-row>
      <b-row class="DesktopHome home-subtext-title" align-v="center">
        <h2 class="home-subtext-subdescription-small">
          Persiapkan waktu yang cukup
        </h2>
      </b-row>
      <b-row class="DesktopHome home-text-subtitle">
        <h3 class="home-subtext-description">
          Langkah selanjutnya yang harus Anda lakukan setelah memahami game judi
          online yang Anda incar adalah jangan terburu-buru dalam bermain
          <strong>slot deposit pulsa</strong>. Salah satu kesalahan pejudi
          pemula biasanya terjadi dalam permainan judi slot online. Mereka
          biasanya bermain terburu-buru, apalagi ketika mereka sudah mulai
          memenangkan permainan di situs judi slot online. <br /><br />
          Bermainlah dengan santai. Konsentrasi dan konsisten adalah kunci utama
          untuk memenangkan setiap permainan slot online. Jika terburu-buru,
          biasanya konsentrasi akan langsung hilang ketika Anda melakukan
          sedikit kesalahan dalam judi <strong>slot deposit pulsa</strong>.
          Jangan pernah berharap lawan akan melakukan kesalahan yang sama karena
          biasanya mereka sudah jauh lebih berpengalaman di situs judi slot
          online. <br />
        </h3>
      </b-row>
      <b-row class="DesktopHome home-subtext-title" align-v="center">
        <h2 class="home-subtext-subdescription-small">
          Lakukan pengaturan modal yang baik
        </h2>
      </b-row>
      <b-row class="DesktopHome home-text-subtitle">
        <h3 class="home-subtext-description">
          Manajemen modal merupakan hal penting lain yang mudah sekali dilupakan
          ketika bermain judi online. Seorang penjudi
          <strong>slot deposit pulsa</strong> ketika sudah bermain biasanya
          tidak akan fokus lagi pada modal yang mereka miliki. Yang ada di dalam
          pikiran mereka adalah bagaimana caranya agar bisa meraih kemenangan
          saat bermain. <br /><br />
          Ketika hal ini sudah terjadi, akan sangat beruntung jika pemain
          tersebut selalu meraih kemenangan. Namun, jika kekalahan dialami,
          biasanya tidak terasa modal bermain sudah semakin menipis saat main di
          situs judi online. <br /><br />
          Hal semacam ini biasanya ditemukan dalam judi
          <strong>slot online</strong>. Dalam judi slot online, kehadiran
          kombinasi gambar yang mendatangkan jackpot
          <strong>slot deposit pulsa</strong> dalam beberapa game slot online
          cukup mudah didapat sehingga kemenangan beruntun pun bisa saja
          terjadi. <br /><br />
          Untuk itu, sebelum bermain dalam sebuah gem
          <a
            href="https://en.wikipedia.org/wiki/Online_gambling"
            rel="noopener noreferrer"
            target="_blank"
            >judi online</a
          >, alangkah baiknya jika Anda sudah menetapkan terlebih dahulu batasan
          modal yang akan dimainkan pada <strong>slot deposit pulsa</strong>.
          Hal ini penting untuk mengantisipasi jika Anda mengalami kekalahan
          nantinya.<br /><br />
          Tahu kapan waktunya harus berhenti baik ketika sedang menang ataupun
          kalah adalah salah satu ciri Anda sudah menguasai permainan judi
          online pada <strong>slot deposit pulsa</strong> Kalah itu hal yang
          biasa karena Anda pastinya membutuhkan pengalaman dalam bermain
          sebelum bisa mendapatkan kemenangan.<br />
        </h3>
      </b-row>
    </div>
  </BaseLayout>
</template>