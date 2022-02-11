<script>
import BaseLayout from "@/layouts/BaseLayout";
export default {
  components: {
    BaseLayout
  },
  data() {
    return {
      data: null,
    };
  },
  mounted() {
    this.loadPromo();
  },
  methods: {
    loadPromo() {
      this.changeLoader(true);
      this.ApiService.get("promotion")
        .then((resp) => {
          this.data = resp.data;
        })
        .finally(() => {
          this.changeLoader(false);
        });
    },
  },
};
</script>

<template>
  <BaseLayout>
    <div style="padding:0px; margin:0px;">
      <div class="promotion">
        <div class="desktopPromotion text-light center">
          <!-- <b-img style="width:100%; border-bottom: 0px solid white; padding:0% 10%; margin-top:20px;" class="center align-center max-width" :src="require('@/assets/images/banner/long-banner-2.jpg')" />  -->
          <!-- Menu Tambahan -->
          <div style="background-color:#000">
            <b-row class="align-center center justify-content-center" style="background-color:#000; padding-top:20px; padding-bottom:20px; ">
              <b-button class="text-menu-bottom"  :to="{ name: 'Promotion' }" >Promosi</b-button>
              <b-button class="text-menu-bottom"  :to="{ name: 'Blog' }" >Berita</b-button>
              <b-button class="text-menu-bottom"  :to="{ name: 'Refferal' }" >Referral</b-button>
              <b-button class="text-menu-bottom"  :to="{ name: 'Help' }" >Bantuan</b-button>
              <b-button class="text-menu-bottom" target="_blank" href="http://165.22.253.162/keluaran-togel.amp" >Live Score</b-button>
            </b-row>
          </div>
          <h1 style="font-size:25px; margin-bottom:0.5%;" class="ql align-center">
            Join Isobet to win special prizes.
          </h1>
          <span style="font-size:18px; margin-bottom:2%;" class="ql align-center">
            Banyak Promo Cashback dan Hadiah lainnya yang bisa dinikmati di Isobet
          </span>
          <div
            v-for="promo in data"
            :key="promo.code"
            class="row-desktop ml-auto mr-auto"
          >
            <b-row class=" mt-4">
              <b-col>
                <b-img
                  class="p-0"
                  fluid-grow
                  :src="promo.imageUrl"
                  v-b-toggle="`accordion-${promo.code}`"
                ></b-img>
              </b-col>
            </b-row>
            <b-row class=" mb-2">
              <b-col>
                <b-collapse
                  class="collapse-promotion "
                  :id="`accordion-${promo.code}`"
                  accordion
                  role="tabpanel"
                >
                  <b-card-body>
                    <b-row>
                      <b-col>
                        <h6 class="collapse-title">{{ promo.title }}</h6>
                      </b-col>
                      <hr class="hr-sidemenu" />
                    </b-row>
                    <b-row>
                      <b-col>
                        <div
                          class="promotion-horizontal"
                          v-html="promo.content"
                        />
                      </b-col>
                    </b-row>
                  </b-card-body>
                </b-collapse>
              </b-col>
            </b-row>
          </div>
        </div>
      </div>
    </div>
  </BaseLayout>
</template>
