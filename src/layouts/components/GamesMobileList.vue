<script>
import { mapState } from "vuex";
import { GET_LOBBY_PRODUCT } from "@/store/constants/actions.type";
import pp from "../dataFile/pp.json";
import ace333 from "../dataFile/ace333.json";
import bs from "../dataFile/bs.json";
import c93 from "../dataFile/c93.json";
import cq9 from "../dataFile/cq9.json";
import dt from "../dataFile/dt.json";
//import dpt from "../dataFile/dpt.json";
import pt from "../dataFile/pt.json";
import gg from "../dataFile/gg.json";
import hb from "../dataFile/hb.json";
import ig from "../dataFile/ig.json";
import joker from "../dataFile/joker.json";
import sae from "../dataFile/sae.json";
import skywind from "../dataFile/skywind.json";
import vt from "../dataFile/vt.json";
import ls from "../dataFile/ls.json";
import mg from "../dataFile/mg.json";
import ot from "../dataFile/ot.json";
import gioco from "../dataFile/gioco.json";
import pgsoft from "../dataFile/pgsoft.json";
import playngo from "../dataFile/playngo.json";
import playtech from "../dataFile/playtech.json";

export default {
  data: () => {
    return {
      // GAMELIST
      mxList: pp,
      ace333List: ace333,
      bsList: bs,
      c93List: c93,
      cq9List: cq9,
      dtList: dt,
      ggList: gg,
      hbList: hb,
      igList: ig,
      jokerList: joker,
      saeList: sae,
      skywindList: skywind,
      vtList: vt,
      lsList: ls,
      dptList: pt,
      mgList: mg,
      otList: ot,
      giocoList: gioco,
      pgsoftList: pgsoft,
      playngoList: playngo,
      playtechList: playtech,
      //
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
      linkGames: "",
    };
  },
  mounted() {
    this.profile = this.currentUser;
  },
  computed: {
    ...mapState({
      isAuthenticated: (state) => state.auth.isAuthenticated,
      currentUser: (state) => state.me.loggedInUser,
      walletList: (state) => state.wallet.walletList,
    }),
  },
  methods: {
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
        this.changeLoader(false);
        this.playGames(code);
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
      this.changeLoader(true);
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
            this.changeLoader(false);
          })
          .finally(() => {
            this.changeLoader(false);
          });
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
  },
};
</script>

<template>
  <div>
    <!-- GAMES LINK -->
    <b-modal
      id="gamelinkMobileList"
      hide-footer
      class="center"
      ref="gamelinkMobileList"
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

    <!-- PLAYTECH -->
    <b-modal
      class="center"
      centered
      size="xl"
      scrollable
      id="gamesPlaytechMobile"
      ref="gamesPlaytechMobile"
      hide-footer
    >
      <template #modal-header="{ close }" class="center">
        <h4
          style="color: white"
          class="modal-title-20 center justify-content-center"
        >
          PLAYTECH GAMES
        </h4>
        <b-button variant="outline-danger" @click="close()">
          <span class="center">X</span>
        </b-button>
      </template>
      <!-- Baris 1 -->
      <b-row class="center" style="padding: 0px">
        <b-col v-for="pt in playtechList" :key="pt.gameCode" cols="4">
          <b-img
            loading="lazy"
            fluid-grow
            @click="playGamesProduct(pt.gameCode, 'PLAYTECH')"
            class="game-img-slot"
            :src="
              require(`@/assets/images/games/games-slot/PLAYTECH/${pt.gameCode}.jpg`)
            "
            alt="None"
          />
        </b-col>
      </b-row>
    </b-modal>

    <!-- PRAGMATIC PLAY -->
    <b-modal
      class="center"
      centered
      size="xl"
      scrollable
      id="gamesPragmaticMobile"
      ref="gamesPragmaticMobile"
      hide-footer
    >
      <template #modal-header="{ close }" class="center">
        <h4
          style="color: white"
          class="modal-title-20 center justify-content-center"
        >
          PRAGMATIC PLAY GAMES
        </h4>
        <b-button variant="outline-danger" @click="close()">
          <span class="center">X</span>
        </b-button>
      </template>
      <!-- Baris 1 -->
      <b-row class="center" style="padding: 0px">
        <b-col v-for="pt in mxList" :key="pt.gameCode" cols="4">
          <b-img
            loading="lazy"
            fluid-grow
            @click="playGamesProduct(pt.gameCode, 'PP')"
            class="game-img-slot"
            :src="
              require(`@/assets/images/games/games-slot/MX/${pt.gameCode}.jpg`)
            "
            alt="None"
          />
        </b-col>
      </b-row>
    </b-modal>

    <!-- JOKER -->
    <b-modal
      class="center"
      centered
      size="xl"
      scrollable
      id="gamesJokerMobile"
      ref="gamesJokerMobile"
      hide-footer
    >
      <template #modal-header="{ close }" class="center">
        <h4
          style="color: white"
          class="modal-title-20 center justify-content-center"
        >
          JOKER GAMES
        </h4>
        <b-button variant="outline-danger" @click="close()">
          <span class="center">X</span>
        </b-button>
      </template>
      <!-- Baris 1 -->
      <b-row class="center" style="padding: 0px">
        <b-col v-for="pt in jokerList" :key="pt.gameCode" cols="4">
          <b-img
            loading="lazy"
            fluid-grow
            @click="playGamesProduct(pt.gameCode, 'JOKER')"
            class="game-img-slot"
            :src="
              require(`@/assets/images/games/games-slot/JOKER/${pt.gameCode}.jpg`)
            "
            alt="None"
          />
        </b-col>
      </b-row>
    </b-modal>

    <!-- PGSOFT -->
    <b-modal
      class="center"
      centered
      size="xl"
      scrollable
      id="gamesPgsoftMobile"
      ref="gamesPgsoftMobile"
      hide-footer
    >
      <template #modal-header="{ close }" class="center">
        <h4
          style="color: white"
          class="modal-title-20 center justify-content-center"
        >
          PGSOFT GAMES
        </h4>
        <b-button variant="outline-danger" @click="close()">
          <span class="center">X</span>
        </b-button>
      </template>
      <!-- Baris 1 -->
      <b-row class="center" style="padding: 0px">
        <b-col v-for="pt in pgsoftList" :key="pt.gameCode" cols="4">
          <b-img
            loading="lazy"
            fluid-grow
            @click="playGamesProduct(pt.gameCode, 'PGSOFT')"
            class="game-img-slot"
            :src="
              require(`@/assets/images/games/games-slot/PGSOFT/${pt.gameCode}.png`)
            "
            alt="None"
          />
        </b-col>
      </b-row>
    </b-modal>

    <!-- MICROGAMING -->
    <b-modal
      class="center"
      centered
      size="xl"
      scrollable
      id="gamesMicrogamingMobile"
      ref="gamesMicrogamingMobile"
      hide-footer
    >
      <template #modal-header="{ close }" class="center">
        <h4
          style="color: white"
          class="modal-title-20 center justify-content-center"
        >
          MICROGAMING GAMES
        </h4>
        <b-button variant="outline-danger" @click="close()">
          <span class="center">X</span>
        </b-button>
      </template>
      <!-- Baris 1 -->
      <b-row class="center" style="padding: 0px">
        <b-col v-for="pt in mgList" :key="pt.gameCode" cols="4">
          <b-img
            loading="lazy"
            fluid-grow
            @click="playGamesProduct(pt.gameCode, 'MICROGAMING')"
            class="game-img-slot"
            :src="
              require(`@/assets/images/games/games-slot/MG/${pt.gameCode}.png`)
            "
            alt="None"
          />
        </b-col>
      </b-row>
    </b-modal>

    <!-- PLAYNGO -->
    <b-modal
      class="center"
      centered
      size="xl"
      scrollable
      id="gamesPlayngoMobile"
      ref="gamesPlayngoMobile"
      hide-footer
    >
      <template #modal-header="{ close }" class="center">
        <h4
          style="color: white"
          class="modal-title-20 center justify-content-center"
        >
          PLAYNGO GAMES
        </h4>
        <b-button variant="outline-danger" @click="close()">
          <span class="center">X</span>
        </b-button>
      </template>
      <!-- Baris 1 -->
      <b-row class="center" style="padding: 0px">
        <b-col v-for="pt in playngoList" :key="pt.gameCode" cols="4">
          <b-img
            loading="lazy"
            fluid-grow
            @click="playGamesProduct(pt.gameCode, 'PLAYNGO')"
            class="game-img-slot"
            :src="
              require(`@/assets/images/games/games-slot/PLAYNGO/${pt.gameCode}.png`)
            "
            alt="None"
          />
        </b-col>
      </b-row>
    </b-modal>

    <!-- ONETOUCH -->
    <b-modal
      class="center"
      centered
      size="xl"
      scrollable
      id="gamesOnetouchMobile"
      ref="gamesOnetouchMobile"
      hide-footer
    >
      <template #modal-header="{ close }" class="center">
        <h4
          style="color: white"
          class="modal-title-20 center justify-content-center"
        >
          ONE TOUCH GAMES
        </h4>
        <b-button variant="outline-danger" @click="close()">
          <span class="center">X</span>
        </b-button>
      </template>
      <!-- Baris 1 -->
      <b-row class="center" style="padding: 0px">
        <b-col v-for="pt in otList" :key="pt.gameCode" cols="4">
          <b-img
            loading="lazy"
            fluid-grow
            @click="playGamesProduct(pt.gameCode, 'ONETOUCH')"
            class="game-img-slot"
            :src="
              require(`@/assets/images/games/games-slot/OT/${pt.gameCode}.png`)
            "
            alt="None"
          />
        </b-col>
      </b-row>
    </b-modal>

    <!-- GIOCOPLUS -->
    <b-modal
      class="center"
      centered
      size="xl"
      scrollable
      id="gamesGiocoplusMobile"
      ref="gamesGiocoplusMobile"
      hide-footer
    >
      <template #modal-header="{ close }" class="center">
        <h4
          style="color: white"
          class="modal-title-20 center justify-content-center"
        >
          GIOCO PLUS GAMES
        </h4>
        <b-button variant="outline-danger" @click="close()">
          <span class="center">X</span>
        </b-button>
      </template>
      <!-- Baris 1 -->
      <b-row class="center" style="padding: 0px">
        <b-col v-for="pt in giocoList" :key="pt.gameCode" cols="4">
          <b-img
            loading="lazy"
            fluid-grow
            @click="playGamesProduct(pt.gameCode, 'GIOCOPLUS')"
            class="game-img-slot"
            :src="
              require(`@/assets/images/games/games-slot/GIOCO/${pt.gameCode}.png`)
            "
            alt="None"
          />
        </b-col>
      </b-row>
    </b-modal>

    <!-- HABANERO -->
    <b-modal
      class="center"
      centered
      size="xl"
      scrollable
      id="gamesHabaneroMobile"
      ref="gamesHabaneroMobile"
      hide-footer
    >
      <template #modal-header="{ close }" class="center">
        <h4
          style="color: white"
          class="modal-title-20 center justify-content-center"
        >
          HABANERO GAMES
        </h4>
        <b-button variant="outline-danger" @click="close()">
          <span class="center">X</span>
        </b-button>
      </template>

      <b-row class="center" style="padding: 0px">
        <b-col v-for="hb in hbList" :key="hb.gameCode" cols="4">
          <b-img
            loading="lazy"
            fluid-grow
            @click="playGamesProduct(hb.gameCode, 'HABANERO')"
            class="game-img-slot"
            :src="
              require(`@/assets/images/games/games-slot/HB/${hb.gameCode}.jpg`)
            "
            alt="None"
          />
        </b-col>
      </b-row>
    </b-modal>
  </div>
</template>
