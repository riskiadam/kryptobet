<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      isAuthenticated: (state) => state.auth.isAuthenticated,
      currentUser: (state) => state.me.loggedInUser,
    }),
  },
};
</script>

<template>
  <div class="home">
    <div class="ButtonHome">
      <div class="ButtonHomeRow" v-if="!isAuthenticated">
        <div class="ButtonHomeCol center text-center">
          <b-button
            @click="$bvModal.show('bv-modal-example')"
            class="ButtonHomeLogin"
          >
            <b-row class="center text-center" align-h="center">
              <img
                loading="lazy"
                width="30"
                height="30"
                class="ButtonHomeImage"
                :src="require('@/assets/images/icon/icon-login.png')"
              />
            </b-row>
            <b-row class="center text-center" align-h="center">
              <span class="ButtonHomeSpan">Login</span>
            </b-row>
          </b-button>
        </div>
        <div class="ButtonHomeCol center text-center">
          <b-button :to="{ name: 'MobileRegister' }" class="ButtonHomeLogin">
            <b-row class="center text-center" align-h="center">
              <img
                loading="lazy"
                width="30"
                height="30"
                class="ButtonHomeImage"
                :src="require('@/assets/images/icon/icon-register.png')"
              />
            </b-row>
            <b-row class="center text-center" align-h="center">
              <span class="ButtonHomeSpan">Register</span>
            </b-row>
          </b-button>
        </div>
        <div class="ButtonHomeCol center text-center">
          <b-button :to="{ name: 'MobilePromotion' }" class="ButtonHomeLogin">
            <b-row class="center text-center" align-h="center">
              <img
                loading="lazy"
                width="30"
                height="30"
                class="ButtonHomeImage"
                :src="require('@/assets/images/icon/icon-promotion.png')"
              />
            </b-row>
            <b-row class="center text-center" align-h="center">
              <span class="ButtonHomeSpan">Promotion</span>
            </b-row>
          </b-button>
        </div>
      </div>
      <b-row class="ButtonHomeRow" v-if="isAuthenticated">
        <b-col class="ButtonHomeCol center text-center">
          <b-button :to="{ name: 'MobileWallet' }" class="ButtonHomeLogin">
            <b-row class="center text-center" align-h="center">
              <img
                loading="lazy"
                width="30"
                height="30"
                class="ButtonHomeImage"
                :src="require('@/assets/images/icon/icon-wallet.png')"
              />
            </b-row>
            <b-row class="center text-center" align-h="center">
              <span class="ButtonHomeSpan">Wallet</span>
            </b-row>
          </b-button>
        </b-col>
        <b-col class="ButtonHomeCol center text-center">
          <b-button :to="{ name: 'MobileReport' }" class="ButtonHomeLogin">
            <b-row class="center text-center" align-h="center">
              <img
                loading="lazy"
                width="30"
                height="30"
                class="ButtonHomeImage"
                :src="require('@/assets/images/icon/icon-report.png')"
              />
            </b-row>
            <b-row class="center text-center" align-h="center">
              <span class="ButtonHomeSpan">Report</span>
            </b-row>
          </b-button>
        </b-col>
        <b-col class="ButtonHomeCol center text-center">
          <b-button :to="{ name: 'MobilePromotion' }" class="ButtonHomeLogin">
            <b-row class="center text-center" align-h="center">
              <img
                loading="lazy"
                width="30"
                height="30"
                class="ButtonHomeImage"
                :src="require('@/assets/images/icon/icon-promotion.png')"
              />
            </b-row>
            <b-row class="center text-center" align-h="center">
              <span class="ButtonHomeSpan">Promotion</span>
            </b-row>
          </b-button>
        </b-col>
      </b-row>
    </div>
    <div class="KategoriHome">
      <b-row align-h="center" align-v="center">
        <b-col class="KategoriHomeCol">
          <b-button class="button-games" :to="{ name: 'HomeMobile' }">
            <span class="button-games-span">All</span>
          </b-button>
        </b-col>
        <b-col class="KategoriHomeCol">
          <b-button class="button-games" :to="{ path: '/mobile/games/SB' }">
            <span class="button-games-span">Sportbook</span>
          </b-button>
        </b-col>
        <b-col class="KategoriHomeCol">
          <b-button class="button-games" :to="{ path: '/mobile/games/LC' }">
            <span class="button-games-span">Live Casino</span>
          </b-button>
        </b-col>

        <b-col class="KategoriHomeCol">
          <b-button class="button-games" :to="{ path: '/mobile/games/S' }">
            <span class="button-games-span">Slots</span>
          </b-button>
        </b-col>
        <b-col class="KategoriHomeCol">
          <b-button class="button-games" :to="{ path: '/mobile/games/OG' }">
            <span class="button-games-span">Game Lain</span>
          </b-button>
        </b-col>
      </b-row>
    </div>
  </div>
</template>