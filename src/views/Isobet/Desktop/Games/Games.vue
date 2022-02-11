<script>
import { mapState } from "vuex";
import Vue from "vue";
import apiService from "@/services/api.service";
import { GET_LOBBY_PRODUCT } from "@/store/constants/actions.type";
import BaseLayout from "@/layouts/BaseLayout";
import gamesList from "../../GamesList/GamesList.json";
import slotsList from "../../GamesList/GamesSlotList.json";

export default {
  name: "games",
  head: {
    link: function () {
      return [
        {
          rel: "canonical",
          href: "http://158.255.47.199/games/" + this.gameCategory,
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
  },
  data: () => {
    return {
      isGameLoading: false,
      gamesProducts: [],
      gamesCode: null,
      gameList: gamesList,
      slotList: slotsList,
      linkGames: null,
      gamesJSON: null,
    };
  },
  computed: {
    ...mapState({
      isAuthenticated: (state) => state.auth.isAuthenticated,
      currentUser: (state) => state.me.loggedInUser,
    }),
  },
  methods: {
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
  },
};
</script>

<template>
  <BaseLayout>
    <div class="games-page">
      <div class="DesktopGames" style="padding: 0px; margin: 0px">
        <b-img
          style="width: 100%; border-bottom: 0px solid white; padding: 0% 10%"
          v-show="this.gameCategory == 'S'"
          class="center align-center max-width"
          :src="require('@/assets/images/banner/long-banner-1.jpg')"
        />
        <b-img
          style="width: 100%; border-bottom: 0px solid white; padding: 0% 10%"
          v-show="this.gameCategory == 'LC'"
          class="center align-center max-width"
          :src="require('@/assets/images/banner/long-banner-2.jpg')"
        />
        <b-img
          style="width: 100%; border-bottom: 0px solid white; padding: 0% 10%"
          v-show="this.gameCategory == 'SB'"
          class="center align-center max-width"
          :src="require('@/assets/images/banner/long-banner-3.jpg')"
        />
        <b-img
          style="width: 100%; border-bottom: 0px solid white; padding: 0% 10%"
          v-show="this.gameCategory == 'P'"
          class="center align-center max-width"
          :src="require('@/assets/images/banner/long-banner-4.jpg')"
        />
        <b-img
          style="width: 100%; border-bottom: 0px solid white; padding: 0% 10%"
          v-show="this.gameCategory == 'OG'"
          class="center align-center max-width"
          :src="require('@/assets/images/banner/long-banner-5.jpg')"
        />
        <b-img
          style="width: 100%; border-bottom: 0px solid white; padding: 0% 10%"
          v-show="this.gameCategory == 'L'"
          class="center align-center max-width"
          :src="require('@/assets/images/banner/long-banner-6.jpg')"
        />

        <!-- Menu Tambahan -->
        <div style="background-color: #000">
          <b-row
            class="align-center center justify-content-center"
            style="
              background-color: #000;
              padding-top: 20px;
              padding-bottom: 20px;
            "
          >
            <b-button class="text-menu-bottom" :to="{ name: 'Promotion' }"
              >Promosi</b-button
            >
            <b-button class="text-menu-bottom" :to="{ name: 'Blog' }"
              >Berita</b-button
            >
            <b-button class="text-menu-bottom" :to="{ name: 'Refferal' }"
              >Referral</b-button
            >
            <b-button class="text-menu-bottom" :to="{ name: 'Help' }"
              >Bantuan</b-button
            >
            <b-button
              class="text-menu-bottom"
              target="_blank"
              href="http://165.22.253.162/keluaran-togel.amp"
              >Live Score</b-button
            >
          </b-row>
        </div>

        <b-container
          class="inner-container games-page-container"
          fluid
          style="padding: 0px; margin: 0px; width: 100%"
        >
          <!-- ####### SLOT GAMES ####### -->
          <b-row
            class="row-games"
            v-show="this.gameCategory == 'S'"
            style="background-color: #1e1f23; padding: 2%; margin: 0% 5%"
          >
            <b-col
              v-for="(game, i) in slotList"
              :key="i"
              cols="12"
              md="4"
              class="center mt-4"
            >
              <b-img
                class="center align-center"
                fluid-grow
                style="height: 244px"
                :src="`http://gp-winfast888.17mybet.com${game.imageUrl}`"
              />
              <h5
                style="color: #509cb6; font-weight: bold; margin-top: 4%"
                class="center"
              >
                {{ game.label }}
              </h5>
              <b-button
                v-if="isAuthenticated"
                size="sm"
                :disabled="isGameLoading"
                @click="play('SeamlessGame', game.gameProviderId, game.gameId)"
                class="game-btn-play mt-2"
              >
              </b-button>
            </b-col>
          </b-row>

          <!-- ####### SPORTBOOK GAMES ####### -->
          <b-row
            class="row-games"
            v-show="this.gameCategory == 'SB'"
            style="background-color: #1e1f23; padding: 2%; margin: 0% 5%"
          >
            <b-col cols="12" md="4" class="center">
              <b-img
                style="width: 100%; border-bottom: 0px solid white; padding: 0%"
                class="center align-center max-width"
                :src="require('@/assets/images/games/desktop/SBO.jpg')"
              />
              <h5
                style="color: #509cb6; font-weight: bold; margin-top: 4%"
                class="center"
              >
                SBOBET SPORTS
              </h5>
              <b-button
                v-if="isAuthenticated"
                size="sm"
                :disabled="isGameLoading"
                @click="play('SportsBook', 0)"
                class="game-btn-play"
              >
              </b-button>
            </b-col>
          </b-row>

          <!-- ####### LIVE CASINO GAMES ####### -->
          <b-row
            class="row-games"
            v-show="this.gameCategory == 'LC'"
            style="background-color: #1e1f23; padding: 2%; margin: 0% 5%"
          >
            <b-col
              v-for="(game, i) in gameList"
              :key="i"
              cols="12"
              md="4"
              class="center mt-4"
            >
              <b-img
                class="center align-center"
                fluid-grow
                style="height: 244px"
                :src="`http://gp-winfast888.17mybet.com${game.imageUrl}`"
              />
              <h5
                style="color: #509cb6; font-weight: bold; margin-top: 4%"
                class="center"
              >
                {{ game.label }}
              </h5>
              <b-button
                v-if="isAuthenticated"
                size="sm"
                :disabled="isGameLoading"
                @click="play('SeamlessGame', game.gameProviderId, game.gameId)"
                class="game-btn-play mt-2"
              >
              </b-button>
            </b-col>
          </b-row>

          <!-- ####### POKER GAMES ####### -->
          <b-row
            class="row-games"
            v-show="this.gameCategory == 'P'"
            style="background-color: #1e1f23; padding: 2%; margin: 0% 5% 0% 5%"
          >
            <b-col cols="12" md="4" class="center">
              <b-img
                style="width: 100%; border-bottom: 0px solid white; padding: 0%"
                class="center align-center max-width"
                :src="require('@/assets/images/games/desktop/IDN.jpg')"
              />
              <h5
                style="color: #509cb6; font-weight: bold; margin-top: 4%"
                class="center"
              >
                IDN POKER
              </h5>
              <b-button
                v-if="isAuthenticated"
                size="sm"
                :disabled="isGameLoading"
                @click="playGamesProduct('POKER', 'IDN')"
                class="game-btn-play"
              >
              </b-button>
            </b-col>
            <b-col cols="12" md="4" class="center">
              <b-img
                style="width: 100%; border-bottom: 0px solid white; padding: 0%"
                class="center align-center max-width"
                :src="require('@/assets/images/games/desktop/ONEPOKER.jpg')"
              />
              <h5
                style="color: #509cb6; font-weight: bold; margin-top: 4%"
                class="center"
              >
                ONE GAMING LOBBY
              </h5>
              <b-button
                v-if="isAuthenticated"
                size="sm"
                :disabled="isGameLoading"
                @click="playGamesProduct('LOBBY', 'ONEPOKER')"
                class="game-btn-play"
              >
              </b-button>
            </b-col>
            <b-col cols="12" md="4" class="center">
              <b-img
                style="width: 100%; border-bottom: 0px solid white; padding: 0%"
                class="center align-center max-width"
                :src="require('@/assets/images/games/desktop/ONEPOKER.jpg')"
              />
              <h5
                style="color: #509cb6; font-weight: bold; margin-top: 4%"
                class="center"
              >
                ONE GAMING POKER
              </h5>
              <b-button
                v-if="isAuthenticated"
                size="sm"
                :disabled="isGameLoading"
                @click="playGamesProduct('POKER', 'ONEPOKER')"
                class="game-btn-play"
              >
              </b-button>
            </b-col>
          </b-row>
          <b-row
            class="row-games"
            v-show="this.gameCategory == 'P'"
            style="background-color: #1e1f23; padding: 2%; margin: 0% 5% 0% 5%"
          >
            <b-col cols="12" md="4" class="center">
              <b-img
                style="width: 100%; border-bottom: 0px solid white; padding: 0%"
                class="center align-center max-width"
                :src="require('@/assets/images/games/desktop/ONEPOKER.jpg')"
              />
              <h5
                style="color: #509cb6; font-weight: bold; margin-top: 4%"
                class="center"
              >
                ONE GAMING POKER AOF
              </h5>
              <b-button
                v-if="isAuthenticated"
                size="sm"
                :disabled="isGameLoading"
                @click="playGamesProduct('POKERAOF', 'ONEPOKER')"
                class="game-btn-play"
              >
              </b-button>
            </b-col>
            <b-col cols="12" md="4" class="center">
              <b-img
                style="width: 100%; border-bottom: 0px solid white; padding: 0%"
                class="center align-center max-width"
                :src="require('@/assets/images/games/desktop/ONEPOKER.jpg')"
              />
              <h5
                style="color: #509cb6; font-weight: bold; margin-top: 4%"
                class="center"
              >
                ONE GAMING OMAHA
              </h5>
              <b-button
                v-if="isAuthenticated"
                size="sm"
                :disabled="isGameLoading"
                @click="playGamesProduct('OMAHA', 'ONEPOKER')"
                class="game-btn-play"
              >
              </b-button>
            </b-col>
            <b-col cols="12" md="4" class="center">
              <b-img
                style="width: 100%; border-bottom: 0px solid white; padding: 0%"
                class="center align-center max-width"
                :src="require('@/assets/images/games/desktop/ONEPOKER.jpg')"
              />
              <h5
                style="color: #509cb6; font-weight: bold; margin-top: 4%"
                class="center"
              >
                ONE GAMING POKER6
              </h5>
              <b-button
                v-if="isAuthenticated"
                size="sm"
                :disabled="isGameLoading"
                @click="playGamesProduct('POKER6', 'ONEPOKER')"
                class="game-btn-play"
              >
              </b-button>
            </b-col>
          </b-row>
          <b-row
            class="row-games"
            v-show="this.gameCategory == 'P'"
            style="background-color: #1e1f23; padding: 2%; margin: 0% 5% 0% 5%"
          >
            <b-col cols="12" md="4" class="center">
              <b-img
                style="width: 100%; border-bottom: 0px solid white; padding: 0%"
                class="center align-center max-width"
                :src="require('@/assets/images/games/desktop/ONEPOKER.jpg')"
              />
              <h5
                style="color: #509cb6; font-weight: bold; margin-top: 4%"
                class="center"
              >
                ONE GAMING POKER 6 AOF
              </h5>
              <b-button
                v-if="isAuthenticated"
                size="sm"
                :disabled="isGameLoading"
                @click="playGamesProduct('POKER6AOF', 'ONEPOKER')"
                class="game-btn-play"
              >
              </b-button>
            </b-col>
            <b-col cols="12" md="4" class="center">
              <b-img
                style="width: 100%; border-bottom: 0px solid white; padding: 0%"
                class="center align-center max-width"
                :src="require('@/assets/images/games/desktop/ONEPOKER.jpg')"
              />
              <h5
                style="color: #509cb6; font-weight: bold; margin-top: 4%"
                class="center"
              >
                ONE GAMING CAPSA
              </h5>
              <b-button
                v-if="isAuthenticated"
                size="sm"
                :disabled="isGameLoading"
                @click="playGamesProduct('CAPSA', 'ONEPOKER')"
                class="game-btn-play"
              >
              </b-button>
            </b-col>
            <b-col cols="12" md="4" class="center">
              <b-img
                style="width: 100%; border-bottom: 0px solid white; padding: 0%"
                class="center align-center max-width"
                :src="require('@/assets/images/games/desktop/ONEPOKER.jpg')"
              />
              <h5
                style="color: #509cb6; font-weight: bold; margin-top: 4%"
                class="center"
              >
                ONE GAMING CEME
              </h5>
              <b-button
                v-if="isAuthenticated"
                size="sm"
                :disabled="isGameLoading"
                @click="playGamesProduct('CEME', 'ONEPOKER')"
                class="game-btn-play"
              >
              </b-button>
            </b-col>
          </b-row>
          <b-row
            class="row-games"
            v-show="this.gameCategory == 'P'"
            style="background-color: #1e1f23; padding: 2%; margin: 0% 5% 0% 5%"
          >
            <b-col cols="12" md="4" class="center">
              <b-img
                style="width: 100%; border-bottom: 0px solid white; padding: 0%"
                class="center align-center max-width"
                :src="require('@/assets/images/games/desktop/ONEPOKER.jpg')"
              />
              <h5
                style="color: #509cb6; font-weight: bold; margin-top: 4%"
                class="center"
              >
                ONE GAMING CEME KELILING
              </h5>
              <b-button
                v-if="isAuthenticated"
                size="sm"
                :disabled="isGameLoading"
                @click="playGamesProduct('CEMEKELILING', 'ONEPOKER')"
                class="game-btn-play"
              >
              </b-button>
            </b-col>
            <b-col cols="12" md="4" class="center">
              <b-img
                style="width: 100%; border-bottom: 0px solid white; padding: 0%"
                class="center align-center max-width"
                :src="require('@/assets/images/games/desktop/ONEPOKER.jpg')"
              />
              <h5
                style="color: #509cb6; font-weight: bold; margin-top: 4%"
                class="center"
              >
                ONE GAMING BANKER CEME
              </h5>
              <b-button
                v-if="isAuthenticated"
                size="sm"
                :disabled="isGameLoading"
                @click="playGamesProduct('BANKERCEME', 'ONEPOKER')"
                class="game-btn-play"
              >
              </b-button>
            </b-col>
            <b-col cols="12" md="4" class="center">
              <b-img
                style="width: 100%; border-bottom: 0px solid white; padding: 0%"
                class="center align-center max-width"
                :src="require('@/assets/images/games/desktop/ONEPOKER.jpg')"
              />
              <h5
                style="color: #509cb6; font-weight: bold; margin-top: 4%"
                class="center"
              >
                ONE GAMING DOMINO QQ
              </h5>
              <b-button
                v-if="isAuthenticated"
                size="sm"
                :disabled="isGameLoading"
                @click="playGamesProduct('DOMINOQQ', 'ONEPOKER')"
                class="game-btn-play"
              >
              </b-button>
            </b-col>
          </b-row>
          <b-row
            class="row-games"
            v-show="this.gameCategory == 'P'"
            style="background-color: #1e1f23; padding: 2%; margin: 0% 5% 0% 5%"
          >
            <b-col cols="12" md="4" class="center">
              <b-img
                style="width: 100%; border-bottom: 0px solid white; padding: 0%"
                class="center align-center max-width"
                :src="require('@/assets/images/games/desktop/ONEPOKER.jpg')"
              />
              <h5
                style="color: #509cb6; font-weight: bold; margin-top: 4%"
                class="center"
              >
                ONE GAMING BANDAR POKER
              </h5>
              <b-button
                v-if="isAuthenticated"
                size="sm"
                :disabled="isGameLoading"
                @click="playGamesProduct('BANDARPOKER', 'ONEPOKER')"
                class="game-btn-play"
              >
              </b-button>
            </b-col>
            <b-col cols="12" md="4" class="center">
              <b-img
                style="width: 100%; border-bottom: 0px solid white; padding: 0%"
                class="center align-center max-width"
                :src="require('@/assets/images/games/desktop/ONEPOKER.jpg')"
              />
              <h5
                style="color: #509cb6; font-weight: bold; margin-top: 4%"
                class="center"
              >
                ONE GAMING POKER POT
              </h5>
              <b-button
                v-if="isAuthenticated"
                size="sm"
                :disabled="isGameLoading"
                @click="playGamesProduct('POKERPOT', 'ONEPOKER')"
                class="game-btn-play"
              >
              </b-button>
            </b-col>
            <b-col cols="12" md="4" class="center">
              <b-img
                style="width: 100%; border-bottom: 0px solid white; padding: 0%"
                class="center align-center max-width"
                :src="require('@/assets/images/games/desktop/ONEPOKER.jpg')"
              />
              <h5
                style="color: #509cb6; font-weight: bold; margin-top: 4%"
                class="center"
              >
                ONE GAMING LUDO KING
              </h5>
              <b-button
                v-if="isAuthenticated"
                size="sm"
                :disabled="isGameLoading"
                @click="playGamesProduct('LUDOKING', 'ONEPOKER')"
                class="game-btn-play"
              >
              </b-button>
            </b-col>
          </b-row>
          <b-row
            class="row-games"
            v-show="this.gameCategory == 'P'"
            style="background-color: #1e1f23; padding: 2%; margin: 0% 5% 5% 5%"
          >
            <b-col cols="12" md="4" class="center">
              <b-img
                style="width: 100%; border-bottom: 0px solid white; padding: 0%"
                class="center align-center max-width"
                :src="require('@/assets/images/games/desktop/ONEPOKER.jpg')"
              />
              <h5
                style="color: #509cb6; font-weight: bold; margin-top: 4%"
                class="center"
              >
                ONE GAMING TOURNAMENT
              </h5>
              <b-button
                v-if="isAuthenticated"
                size="sm"
                :disabled="isGameLoading"
                @click="playGamesProduct('TOURNAMENT', 'ONEPOKER')"
                class="game-btn-play"
              >
              </b-button>
            </b-col>
          </b-row>

          <!-- ####### LOTTERY GAMES ####### -->
          <b-row
            align-h="center"
            class="row-games center align-center"
            v-show="this.gameCategory == 'L'"
            style="padding: 0%; margin: 1% 8% 0% 8%"
          >
            <b-col cols="12" md="4" class="center">
              <b-img
                style="width: 100%; border-bottom: 0px solid white; padding: 0%"
                class="center align-center max-width"
                :src="
                  require('@/assets/images/games/desktop/IBC-NUMBER-GAMES.jpg')
                "
              />
              <h5
                style="color: #509cb6; font-weight: bold; margin-top: 4%"
                class="center"
              >
                IBC NUMBER GAMES
              </h5>
              <b-button
                v-if="isAuthenticated"
                size="sm"
                :disabled="isGameLoading"
                @click="playGamesProduct('NUMBERGAMES', 'IBC')"
                class="game-btn-play"
              >
              </b-button>
            </b-col>
            <b-col cols="12" md="4" class="center">
              <b-img
                style="width: 100%; border-bottom: 0px solid white; padding: 0%"
                class="center align-center max-width"
                :src="require('@/assets/images/games/desktop/ISIN.jpg')"
              />
              <h5
                style="color: #509cb6; font-weight: bold; margin-top: 4%"
                class="center"
              >
                ISIN 4D LOTTERY
              </h5>
              <b-button
                v-if="isAuthenticated"
                size="sm"
                :disabled="isGameLoading"
                @click="playGamesProduct('LOTTERY', 'ISIN')"
                class="game-btn-play"
              >
              </b-button>
            </b-col>
            <b-col cols="12" md="4" class="center">
              <b-img
                style="width: 100%; border-bottom: 0px solid white; padding: 0%"
                class="center align-center max-width"
                :src="require('@/assets/images/games/desktop/IXT.jpg')"
              />
              <h5
                style="color: #509cb6; font-weight: bold; margin-top: 4%"
                class="center"
              >
                IXT MM TANGKAS GAMING
              </h5>
              <b-button
                v-if="isAuthenticated"
                size="sm"
                :disabled="isGameLoading"
                @click="playGamesProduct('LOBBY', 'IXT')"
                class="game-btn-play"
              >
              </b-button>
            </b-col>
          </b-row>

          <!-- ####### OTHER GAMES ####### -->
          <b-row
            class="row-games"
            v-show="this.gameCategory == 'OG'"
            style="background-color: #1e1f23; padding: 2%; margin: 0% 5%"
          >
            <b-col cols="12" md="4" class="center">
              <b-img
                style="width: 100%; border-bottom: 0px solid white; padding: 0%"
                class="center align-center max-width"
                :src="require('@/assets/images/games/desktop/SBOVS.jpg')"
              />
              <h5
                style="color: #509cb6; font-weight: bold; margin-top: 4%"
                class="center"
              >
                SBO VIRTUAL SPORTS
              </h5>
              <b-button
                v-if="isAuthenticated"
                size="sm"
                :disabled="isGameLoading"
                @click="play('VirtualSports', 0)"
                class="game-btn-play"
              >
              </b-button>
            </b-col>
          </b-row>
        </b-container>
      </div>
      <b-modal
        id="gamelinkGames"
        hide-footer
        class="center"
        ref="gamelinkGames"
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
    </div>
  </BaseLayout>
</template>
