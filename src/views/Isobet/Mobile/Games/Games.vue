<script>
import Vue from "vue";
import apiService from "@/services/api.service";
import { mapState } from "vuex";
import BaseLayout from "@/layouts/BaseLayout";
import MenuMobile from "@/layouts/components/MenuMobile.vue";
import { GET_LOBBY_PRODUCT } from "@/store/constants/actions.type";
import gamesList from "../../GamesList/GamesList.json";
import slotsList from "../../GamesList/GamesSlotList.json";

export default {
  name: "Mobilegames",
  head: {
    link: function () {
      return [
        {
          rel: "canonical",
          href: "http://158.255.47.199/mobile/games/" + this.gameCategory,
        },
      ];
    },
  },
  props: {
    gameCategory: {
      type: String,
      required: true,
    },
  },
  components: {
    BaseLayout,
    MenuMobile,
  },
  data: () => {
    return {
      isGameLoading: false,
      gamesProducts: [],
      gamesCode: null,
      linkGames: "",
      gameList: gamesList,
      slotList: slotsList,
    };
  },
  mounted() {
    //this.getGames();
    //console.log('current')
    //console.log(this.isAuthenticated)
    //console.log('games');
    //console.log(this.gamesCategoryList);
  },
  computed: {
    ...mapState({
      //gamesCategoryList: state => state.games.categoryList,
      isAuthenticated: (state) => state.auth.isAuthenticated,
      currentUser: (state) => state.me.loggedInUser,
    }),
  },
  methods: {
    /*getGames() {
      for (let i = 0; i < this.gamesCategoryList.length; i++) {
        if (this.gamesCategoryList[i].code == this.gameCategory) {
          this.gameList = this.gamesCategoryList[i].gameList;
          break;
        }
      }
    },*/
    // play(code) {
    //   if (!this.isAuthenticated) {
    //     this.$notify({
    //       group: "firstlogin",
    //       title: "INFORMATION",
    //       text: "Harap Login terlebih dahulu!",
    //       type: "warn",
    //       closeOnClick: true,
    //       max: 1,
    //       ignoreDuplicates: true,
    //     });
    //     return false;
    //   }
    //   this.changeLoader(true);
    //   if (this.isAuthenticated) {
    //     let deviceType = "d";
    //     if (navigator.platform == "iPhone" || navigator.platform == "iPad") {
    //       deviceType = "m";
    //     } else {
    //       let userAgent = navigator.userAgent;
    //       let match = userAgent.match(/Android/g);
    //       if (match === null) {
    //         deviceType = "d";
    //       } else {
    //         deviceType = "m";
    //       }
    //     }
    //     if (code === "IDN") {
    //       apiService
    //         .get("games/lobby/" + code + "?deviceType=" + deviceType)
    //         .then((resp) => {
    //           let data = resp.data;
    //           var ua = navigator.userAgent.toLowerCase();
    //           var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
    //           var userAgent =
    //             navigator.userAgent || navigator.vendor || window.opera;
    //           if (isAndroid) {
    //             window.open(data, "_blank");
    //           } else if (/iPad|iPhone|iPod/.test(userAgent)) {
    //             this.linkGames = resp.data;
    //             this.$bvModal.show("popuplinkgames");
    //             window.open(data, "_blank");
    //           } else {
    //             window.open(data, "_blank");
    //           }
    //         })
    //         .catch((error) => {
    //           Vue.notify({
    //             group: "ErrorMessage",
    //             title: "Kesalahan Terjadi",
    //             text: error,
    //             type: "error",
    //             closeOnClick: true,
    //             max: 1,
    //             ignoreDuplicates: true,
    //           });
    //         })
    //         .finally(() => {
    //           this.changeLoader(false);
    //           //this.isLoading = false;
    //         });
    //     } else {
    //       apiService
    //         .get("games/lobby/Api2All/" + code + "/" + deviceType)
    //         .then((resp) => {
    //           let data = resp.data;

    //           if (code == "KN") {
    //             var ua = navigator.userAgent.toLowerCase();
    //             var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
    //             var userAgent =
    //               navigator.userAgent || navigator.vendor || window.opera;
    //             // Android detection
    //             if (isAndroid) {
    //               // let param = '{"code":"openbrowser","url":"'+data.Metadata+'"}';
    //               // window.postMessage(param, "*");
    //               window.open("/widget.html?token=" + data.Data + "&lang=id");
    //             } else if (
    //               /iPad|iPhone|iPod/.test(userAgent) &&
    //               !window.MSStream
    //             ) {
    //               this.linkGames =
    //                 "/widget.html?token=" + data.Data + "&lang=id";
    //               this.$bvModal.show("popuplinkgames");
    //               window.open("/widget.html?token=" + data.Data + "&lang=id");
    //             } else {
    //               window.open("/widget.html?token=" + data.Data + "&lang=id");
    //             }
    //           } else if (code == "PPL") {
    //             var ua3 = navigator.userAgent.toLowerCase();
    //             var isAndroid3 = ua3.indexOf("android") > -1; //&& ua.indexOf("mobile");
    //             var userAgent3 =
    //               navigator.userAgent || navigator.vendor || window.opera;
    //             // Android detection
    //             if (isAndroid3) {
    //               // let param = '{"code":"openbrowser","url":"'+data.Metadata+'"}';
    //               // window.postMessage(param, "*");
    //               window.open(data.Metadata, "_blank");
    //             } else if (
    //               /iPad|iPhone|iPod/.test(userAgent3) &&
    //               !window.MSStream
    //             ) {
    //               this.linkGames = data.Metadata;
    //               this.$bvModal.show("popuplinkgames");
    //               window.open(data.Metadata, "_blank");
    //             }
    //             // Desktop detection
    //             else {
    //               window.open(data.Metadata, "_blank");
    //             }
    //           } else {
    //             var ua2 = navigator.userAgent.toLowerCase();
    //             var isAndroid2 = ua2.indexOf("android") > -1; //&& ua.indexOf("mobile");
    //             var userAgent2 =
    //               navigator.userAgent || navigator.vendor || window.opera;
    //             // Android detection
    //             if (isAndroid2) {
    //               // let param = '{"code":"openbrowser","url":"'+data.Data+'"}';
    //               // window.postMessage(param, "*");
    //               window.open(data.Data, "_blank");
    //             }
    //             // iOS detection
    //             else if (
    //               /iPad|iPhone|iPod/.test(userAgent2) &&
    //               !window.MSStream
    //             ) {
    //               this.linkGames = data.Data;
    //               this.$bvModal.show("popuplinkgames");
    //               window.open(data.Data, "_blank");
    //             } else {
    //               window.open(data.Data, "_blank");
    //             }
    //           }
    //         })
    //         .catch((error) => {
    //           Vue.notify({
    //             group: "ErrorMessage",
    //             title: "Kesalahan Terjadi",
    //             text: error,
    //             type: "error",
    //             closeOnClick: true,
    //             max: 1,
    //             ignoreDuplicates: true,
    //           });
    //         })
    //         .finally(() => {
    //           this.changeLoader(false);
    //           //this.isLoading = false;
    //         });
    //     }
    //   } else {
    //     this.changeLoader(false);
    //     this.$notify({
    //       group: "firstlogin",
    //       title: "INFORMATION",
    //       text: "Harap Login terlebih dahulu!",
    //       type: "warn",
    //       closeOnClick: true,
    //       max: 1,
    //       ignoreDuplicates: true,
    //     });
    //   }
    // },
    play(category, code) {
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

      apiService
        .get("games/lobby/SBOWin/" + category + "/" + code + "/" + deviceType)
        .then((resp) => {
          let data = resp.data;
          window.open(data.Target, "_blank");

          // if (code == "KN") {
          //   window.open("/widget.html?token=" + data.Data + "&lang=id");
          // } else if (code == "PPL") {
          //   window.open(data.Metadata, "_blank");
          // } else {
          //   window.open(data.Data, "_blank");
          // }
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
    showGamesMaintenance() {
      this.isGameLoading = true;
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
    playGamesProduct(gameId, providerCode, vendor = "TrillionGaming") {
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

      this.showLoading = true;
      let code = providerCode;

      if (vendor == undefined) vendor = "TrillionGaming";

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
            vendor: vendor,
            gamesCode: code,
            productCode: gameId,
            deviceType: deviceType,
          })
          .then((data) => {
            if (vendor == "TrillionGaming") {
              if (code == "PPL" || code == "MX") {
                window.open(data.Metadata, "_blank");
              } else {
                window.open(
                  "/trg.html?payload=" +
                    encodeURIComponent(data.Payload) +
                    "&target=" +
                    encodeURIComponent(data.Target)
                );
              }
            } else {
              console.log(data);
              window.open(
                "/trg.html?payload=" +
                  encodeURIComponent(data.Payload) +
                  "&target=" +
                  encodeURIComponent(data.Target)
              );
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
            this.showLoading = false;
          })
          .finally(() => {
            this.showLoading = false;
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
  },
  watch: {
    $route() {
      //this.getGames();
    },
  },
};
</script>

<template>
  <BaseLayout>
    <div class="games-page">
      <div class="MobileGames" style="padding: 0px; margin: 0px">
        <b-img
          style="width: 100%; border-bottom: 1px solid white"
          v-show="this.gameCategory == 'LC'"
          class="center align-center max-width"
          :src="require('@/assets/images/banner/slide5.jpg')"
          alt="Menu-Live-Casino-Games"
        />
        <b-img
          style="width: 100%; border-bottom: 1px solid white"
          v-show="this.gameCategory == 'SB'"
          class="center align-center max-width"
          :src="require('@/assets/images/banner/slide2.jpg')"
          alt="Menu-Sportbook-Games"
        />
        <b-img
          style="width: 100%; border-bottom: 1px solid white"
          v-show="this.gameCategory == 'P'"
          class="center align-center max-width"
          :src="require('@/assets/images/banner/slide9.jpg')"
          alt="Menu-Poker-Games"
        />
        <b-img
          style="width: 100%; border-bottom: 1px solid white"
          v-show="this.gameCategory == 'L'"
          class="center align-center max-width"
          :src="require('@/assets/images/banner/slide12.jpg')"
          alt="Menu-Lottery-Games"
        />
        <b-img
          style="width: 100%; border-bottom: 1px solid white"
          v-show="this.gameCategory == 'S'"
          class="center align-center max-width"
          :src="require('@/assets/images/banner/slide13.jpg')"
          alt="Menu-Slot-Games"
        />
        <b-img
          style="width: 100%; border-bottom: 1px solid white"
          v-show="this.gameCategory == 'OG'"
          class="center align-center max-width"
          :src="require('@/assets/images/banner/slide7.jpg')"
          alt="Menu-Other-Games"
        />
        <b-img
          style="width: 100%; border-bottom: 1px solid white"
          v-show="this.gameCategory == 'T'"
          class="center align-center max-width"
          :src="require('@/assets/images/banner/slide19.jpg')"
          alt="Menu-Tangkas-Games"
        />
        <MenuMobile />

        <b-row
          v-show="this.gameCategory == 'SB'"
          style="margin: 0px; padding: 0px"
          class="center text-center align-center justify-content-center"
          align-h="center"
        >
          <!-- SPORTBOOK 4  -->
          <b-col
            style="padding: 0px; margin: 0px"
            cols="4"
            v-show="this.gameCategory == 'SB'"
          >
            <b-button
              style="
                margin: 5px;
                padding: 5px;
                background-color: #f1e60d;
                border-radius: 10px;
              "
              @click="play('SportsBook', 0)"
            >
              <b-img
                style="width: 100%; border-radius: 5px"
                :src="
                  require('@/assets/images/games/mobile/sportbook/SBO-SPORT.jpg')
                "
                alt="Menu-Sportbook-Games"
              ></b-img>
            </b-button>
          </b-col>
        </b-row>
        <b-row
          v-show="this.gameCategory == 'LC'"
          style="margin: 0px; padding: 0px"
          class="center text-center align-center justify-content-center"
          align-h="center"
        >
          <!-- LIVE CASINO 6 -->
          <b-col
            v-for="(game, i) in gameList"
            style="padding: 0px; margin: 0px"
            cols="4"
            :key="i"
          >
            <b-button
              style="
                margin: 5px;
                padding: 5px;
                background-color: #f1e60d;
                border-radius: 10px;
              "
              @click="play('SeamlessGame', game.gameProviderId, game.gameId)"
            >
              <b-img
                style="max-width: 76px; border-radius: 1px; height: 48px"
                fluid-grow
                :src="`http://gp-winfast888.17mybet.com${game.imageUrl}`"
                alt="Menu-Live-Casino-Games"
              ></b-img>
            </b-button>
          </b-col>
        </b-row>
        <b-row
          v-show="this.gameCategory == 'P'"
          style="margin: 0px; padding: 0px"
          class="center text-center align-center justify-content-center"
          align-h="center"
        >
          <!-- POKER 1 -->
          <b-col
            style="padding: 0px; margin: 0px"
            cols="4"
            v-show="this.gameCategory == 'P'"
          >
            <b-button
              style="
                margin: 5px;
                padding: 5px;
                background-color: #f1e60d;
                border-radius: 10px;
              "
              @click="playGamesProduct('POKER', 'IDN')"
            >
              <b-img
                style="width: 100%; border-radius: 5px"
                :src="require('@/assets/images/games/mobile/poker/IDN.jpg')"
                alt="Menu-Live-Casino-Games"
              ></b-img>
            </b-button>
          </b-col>
          <!-- POKER 2 -->
          <b-col
            style="padding: 0px; margin: 0px"
            cols="4"
            v-show="this.gameCategory == 'P'"
          >
            <b-button
              style="
                margin: 5px;
                padding: 5px;
                background-color: #f1e60d;
                border-radius: 10px;
              "
              @click="playGamesProduct('LOBBY', 'ONEPOKER')"
            >
              <b-img
                style="width: 100%; border-radius: 5px"
                :src="
                  require('@/assets/images/games/mobile/poker/OG-LOBBY.jpg')
                "
                alt="Menu-Live-Casino-Games"
              ></b-img>
            </b-button>
          </b-col>
          <!-- POKER 3 -->
          <b-col
            style="padding: 0px; margin: 0px"
            cols="4"
            v-show="this.gameCategory == 'P'"
          >
            <b-button
              style="
                margin: 5px;
                padding: 5px;
                background-color: #f1e60d;
                border-radius: 10px;
              "
              @click="playGamesProduct('poker', 'ONEPOKER')"
            >
              <b-img
                style="width: 100%; border-radius: 5px"
                :src="
                  require('@/assets/images/games/mobile/poker/OG-POKER.jpg')
                "
                alt="Menu-Live-Casino-Games"
              ></b-img>
            </b-button>
          </b-col>
          <!-- POKER 4 -->
          <b-col
            style="padding: 0px; margin: 0px"
            cols="4"
            v-show="this.gameCategory == 'P'"
          >
            <b-button
              style="
                margin: 5px;
                padding: 5px;
                background-color: #f1e60d;
                border-radius: 10px;
              "
              @click="playGamesProduct('POKERAOF', 'ONEPOKER')"
            >
              <b-img
                style="width: 100%; border-radius: 5px"
                :src="require('@/assets/images/games/mobile/poker/OG-AOF.jpg')"
                alt="Menu-Live-Casino-Games"
              ></b-img>
            </b-button>
          </b-col>
          <!-- POKER 5 -->
          <b-col
            style="padding: 0px; margin: 0px"
            cols="4"
            v-show="this.gameCategory == 'P'"
          >
            <b-button
              style="
                margin: 5px;
                padding: 5px;
                background-color: #f1e60d;
                border-radius: 10px;
              "
              @click="playGamesProduct('OMAHA', 'ONEPOKER')"
            >
              <b-img
                style="width: 100%; border-radius: 5px"
                :src="
                  require('@/assets/images/games/mobile/poker/OG-OMAHA.jpg')
                "
                alt="Menu-Live-Casino-Games"
              ></b-img>
            </b-button>
          </b-col>
          <!-- POKER 6 -->
          <b-col
            style="padding: 0px; margin: 0px"
            cols="4"
            v-show="this.gameCategory == 'P'"
          >
            <b-button
              style="
                margin: 5px;
                padding: 5px;
                background-color: #f1e60d;
                border-radius: 10px;
              "
              @click="playGamesProduct('POKER6', 'ONEPOKER')"
            >
              <b-img
                style="width: 100%; border-radius: 5px"
                :src="
                  require('@/assets/images/games/mobile/poker/OG-POKER6.jpg')
                "
                alt="Menu-Live-Casino-Games"
              ></b-img>
            </b-button>
          </b-col>
          <!-- POKER 7 -->
          <b-col
            style="padding: 0px; margin: 0px"
            cols="4"
            v-show="this.gameCategory == 'P'"
          >
            <b-button
              style="
                margin: 5px;
                padding: 5px;
                background-color: #f1e60d;
                border-radius: 10px;
              "
              @click="playGamesProduct('POKER6AOF', 'ONEPOKER')"
            >
              <b-img
                style="width: 100%; border-radius: 5px"
                :src="
                  require('@/assets/images/games/mobile/poker/OG-POKER6-AOF.jpg')
                "
                alt="Menu-Live-Casino-Games"
              ></b-img>
            </b-button>
          </b-col>
          <!-- POKER 8 -->
          <b-col
            style="padding: 0px; margin: 0px"
            cols="4"
            v-show="this.gameCategory == 'P'"
          >
            <b-button
              style="
                margin: 5px;
                padding: 5px;
                background-color: #f1e60d;
                border-radius: 10px;
              "
              @click="playGamesProduct('CAPSA', 'ONEPOKER')"
            >
              <b-img
                style="width: 100%; border-radius: 5px"
                :src="
                  require('@/assets/images/games/mobile/poker/OG-CAPSA.jpg')
                "
                alt="Menu-Live-Casino-Games"
              ></b-img>
            </b-button>
          </b-col>
          <!-- POKER 9 -->
          <b-col
            style="padding: 0px; margin: 0px"
            cols="4"
            v-show="this.gameCategory == 'P'"
          >
            <b-button
              style="
                margin: 5px;
                padding: 5px;
                background-color: #f1e60d;
                border-radius: 10px;
              "
              @click="playGamesProduct('CEME', 'ONEPOKER')"
            >
              <b-img
                style="width: 100%; border-radius: 5px"
                :src="require('@/assets/images/games/mobile/poker/OG-CEME.jpg')"
                alt="Menu-Live-Casino-Games"
              ></b-img>
            </b-button>
          </b-col>
          <!-- POKER 10 -->
          <b-col
            style="padding: 0px; margin: 0px"
            cols="4"
            v-show="this.gameCategory == 'P'"
          >
            <b-button
              style="
                margin: 5px;
                padding: 5px;
                background-color: #f1e60d;
                border-radius: 10px;
              "
              @click="playGamesProduct('CEMEKELILING', 'ONEPOKER')"
            >
              <b-img
                style="width: 100%; border-radius: 5px"
                :src="
                  require('@/assets/images/games/mobile/poker/OG-CEMEKELILING.jpg')
                "
                alt="Menu-Live-Casino-Games"
              ></b-img>
            </b-button>
          </b-col>
          <!-- POKER 11 -->
          <b-col
            style="padding: 0px; margin: 0px"
            cols="4"
            v-show="this.gameCategory == 'P'"
          >
            <b-button
              style="
                margin: 5px;
                padding: 5px;
                background-color: #f1e60d;
                border-radius: 10px;
              "
              @click="playGamesProduct('BANKERCEME', 'ONEPOKER')"
            >
              <b-img
                style="width: 100%; border-radius: 5px"
                :src="
                  require('@/assets/images/games/mobile/poker/OG-BANKER.jpg')
                "
                alt="Menu-Live-Casino-Games"
              ></b-img>
            </b-button>
          </b-col>
          <!-- POKER 12 -->
          <b-col
            style="padding: 0px; margin: 0px"
            cols="4"
            v-show="this.gameCategory == 'P'"
          >
            <b-button
              style="
                margin: 5px;
                padding: 5px;
                background-color: #f1e60d;
                border-radius: 10px;
              "
              @click="playGamesProduct('DOMINOQQ', 'ONEPOKER')"
            >
              <b-img
                style="width: 100%; border-radius: 5px"
                :src="
                  require('@/assets/images/games/mobile/poker/OG-DOMINO-QQ.jpg')
                "
                alt="Menu-Live-Casino-Games"
              ></b-img>
            </b-button>
          </b-col>
          <!-- POKER 13 -->
          <b-col
            style="padding: 0px; margin: 0px"
            cols="4"
            v-show="this.gameCategory == 'P'"
          >
            <b-button
              style="
                margin: 5px;
                padding: 5px;
                background-color: #f1e60d;
                border-radius: 10px;
              "
              @click="playGamesProduct('BANDARPOKER', 'ONEPOKER')"
            >
              <b-img
                style="width: 100%; border-radius: 5px"
                :src="
                  require('@/assets/images/games/mobile/poker/OG-BANDAR.jpg')
                "
                alt="Menu-Live-Casino-Games"
              ></b-img>
            </b-button>
          </b-col>
          <!-- POKER 14 -->
          <b-col
            style="padding: 0px; margin: 0px"
            cols="4"
            v-show="this.gameCategory == 'P'"
          >
            <b-button
              style="
                margin: 5px;
                padding: 5px;
                background-color: #f1e60d;
                border-radius: 10px;
              "
              @click="playGamesProduct('POKERPOT', 'ONEPOKER')"
            >
              <b-img
                style="width: 100%; border-radius: 5px"
                :src="
                  require('@/assets/images/games/mobile/poker/OG-POKERPOT.jpg')
                "
                alt="Menu-Live-Casino-Games"
              ></b-img>
            </b-button>
          </b-col>
          <!-- POKER 15 -->
          <b-col
            style="padding: 0px; margin: 0px"
            cols="4"
            v-show="this.gameCategory == 'P'"
          >
            <b-button
              style="
                margin: 5px;
                padding: 5px;
                background-color: #f1e60d;
                border-radius: 10px;
              "
              @click="playGamesProduct('LUDOKING', 'ONEPOKER')"
            >
              <b-img
                style="width: 100%; border-radius: 5px"
                :src="
                  require('@/assets/images/games/mobile/poker/OG-LUDO-KING.jpg')
                "
                alt="Menu-Live-Casino-Games"
              ></b-img>
            </b-button>
          </b-col>
          <!-- POKER 16 -->
          <b-col
            style="padding: 0px; margin: 0px"
            cols="4"
            v-show="this.gameCategory == 'P'"
          >
            <b-button
              style="
                margin: 5px;
                padding: 5px;
                background-color: #f1e60d;
                border-radius: 10px;
              "
              @click="playGamesProduct('TOURNAMENT', 'ONEPOKER')"
            >
              <b-img
                style="width: 100%; border-radius: 5px"
                :src="
                  require('@/assets/images/games/mobile/poker/OG-TOURNAMENT.jpg')
                "
                alt="Menu-Live-Casino-Games"
              ></b-img>
            </b-button>
          </b-col>
        </b-row>
        <b-row
          v-show="this.gameCategory == 'S'"
          style="margin: 0px; padding: 0px"
          class="center text-center align-center justify-content-center"
          align-h="center"
        >
          <!-- SLOT 1 -->
          <b-col
            v-for="(game, i) in slotList"
            style="padding: 0px; margin: 0px"
            cols="4"
            :key="i"
          >
            <b-button
              style="
                margin: 5px;
                padding: 5px;
                background-color: #f1e60d;
                border-radius: 10px;
              "
              @click="play('SeamlessGame', game.gameProviderId, game.gameId)"
            >
              <b-img
                style="max-width: 76px; border-radius: 1px; height: 48px"
                fluid-grow
                :src="`http://gp-winfast888.17mybet.com${game.imageUrl}`"
                alt="Menu-Live-Casino-Games"
              ></b-img>
            </b-button>
          </b-col>
        </b-row>

        <b-row
          v-show="this.gameCategory == 'OG'"
          style="margin: 0px; padding: 0px"
          class="center text-center align-center justify-content-center"
          align-h="center"
        >
          <!-- OTHER GAMES 2 -->
          <b-col
            style="padding: 0px; margin: 0px"
            cols="4"
            v-show="this.gameCategory == 'OG'"
          >
            <b-button
              style="
                margin: 5px;
                padding: 5px;
                background-color: #f1e60d;
                border-radius: 10px;
              "
              @click="play('VirtualSports', 0)"
            >
              <b-img
                style="width: 100%; border-radius: 5px"
                :src="
                  require('@/assets/images/games/mobile/sportbook/SBOVS.png')
                "
                alt="Menu-Other-Games"
              ></b-img>
            </b-button>
          </b-col>
        </b-row>
      </div>
    </div>
    <b-modal
      id="popuplinkgames"
      hide-footer
      class="center"
      ref="popuplinkgames"
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
  </BaseLayout>
</template>
