<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      isAuthenticated: (state) => state.auth.isAuthenticated,
    }),
  },
};
</script>

<style>
</style>

<template>
  <div class="home">
    <div class="MobileHome">
      <div class="ButtonHome">
        <b-row class="padding-0px">
          <b-col v-if="!isAuthenticated" class="padding-0px center text-center">
            <b-button
              class="button-menu-mobile"
              @click="$bvModal.show('bv-modal-example')"
            >
              <b-row class="center text-center" align-h="center">
                <img
                  loading="lazy"
                  width="30"
                  height="30"
                  class="image-menu-mobile"
                  :src="require('@/assets/images/icon/icon-login.png')"
                />
              </b-row>
              <b-row class="center text-center" align-h="center">
                <span class="text-menu-mobile"> Login </span>
              </b-row>
            </b-button>
          </b-col>
          <b-col v-if="!isAuthenticated" class="padding-0px center text-center">
            <router-link :to="{ name: 'Register' }">
              <b-button class="button-menu-mobile">
                <b-row class="center text-center" align-h="center">
                  <img
                    loading="lazy"
                    width="30"
                    height="30"
                    class="image-menu-mobile"
                    :src="require('@/assets/images/icon/icon-register.png')"
                  />
                </b-row>
                <b-row class="center text-center" align-h="center">
                  <span class="text-menu-mobile"> Register </span>
                </b-row>
              </b-button>
            </router-link>
          </b-col>
          <b-col v-if="isAuthenticated" class="padding-0px center text-center">
            <b-button class="button-menu-mobile" :to="{ name: 'Wallet' }">
              <b-row class="center text-center" align-h="center">
                <img
                  loading="lazy"
                  width="30"
                  height="30"
                  class="image-menu-mobile"
                  :src="require('@/assets/images/icon/icon-wallet.png')"
                />
              </b-row>
              <b-row class="center text-center" align-h="center">
                <span class="text-menu-mobile"> Wallet </span>
              </b-row>
            </b-button>
          </b-col>
          <b-col v-if="isAuthenticated" class="padding-0px center text-center">
            <b-button :to="{ name: 'Report' }" class="button-menu-mobile">
              <b-row class="center text-center" align-h="center">
                <img
                  loading="lazy"
                  width="30"
                  height="30"
                  class="image-menu-mobile"
                  :src="require('@/assets/images/icon/icon-report.png')"
                />
              </b-row>
              <b-row class="center text-center" align-h="center">
                <span class="text-menu-mobile"> Report </span>
              </b-row>
            </b-button>
          </b-col>
          <b-col class="padding-0px center text-center">
            <router-link :to="{ name: 'Promotion' }">
              <b-button class="button-menu-mobile">
                <b-row class="center text-center" align-h="center">
                  <img
                    loading="lazy"
                    width="30"
                    height="30"
                    class="image-menu-mobile"
                    :src="require('@/assets/images/icon/icon-promotion.png')"
                  />
                </b-row>
                <b-row class="center text-center" align-h="center">
                  <span class="text-menu-mobile"> Promotion </span>
                </b-row>
              </b-button>
            </router-link>
          </b-col>
        </b-row>
      </div>
      <div class="KategoriHome">
        <b-row align-h="center" align-v="center">
          <b-col class="padding-0px">
            <b-button class="button-games" :to="{ name: 'home' }">
              <span class="button-games-text"> All </span>
            </b-button>
          </b-col>
          <b-col class="padding-0px">
            <b-button class="button-games" :to="{ path: '/games/SB' }">
              <span class="button-games-text"> Sportbook </span>
            </b-button>
          </b-col>
          <b-col class="padding-0px">
            <b-button class="button-games" :to="{ path: '/games/LC' }">
              <span class="button-games-text"> Live Casino </span>
            </b-button>
          </b-col>
          <b-col class="padding-0px">
            <!-- <b-button class="button-games" :to="{ path: '/games/P'  }"> -->
            <b-button class="button-games">
              <span class="button-games-text"> Poker </span>
            </b-button>
          </b-col>
        </b-row>
        <b-row align-h="center" align-v="center">
          <b-col class="padding-0px">
            <b-button class="button-games" :to="{ path: '/games/S' }">
              <span class="button-games-text"> Slots </span>
            </b-button>
          </b-col>
          <b-col class="padding-0px">
            <b-button class="button-games" :to="{ path: '/games/T' }">
              <span class="button-games-text"> Tangkas </span>
            </b-button>
          </b-col>
          <b-col class="padding-0px">
            <b-button class="button-games" :to="{ path: '/games/L' }">
              <span class="button-games-text"> Togel </span>
            </b-button>
          </b-col>
          <b-col class="padding-0px">
            <b-button class="button-games" :to="{ path: '/games/OG' }">
              <span class="button-games-text"> Game Lain </span>
            </b-button>
          </b-col>
        </b-row>
      </div>
    </div>
  </div>
</template>