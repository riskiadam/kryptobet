<script>
import BaseLayout from "@/layouts/BaseLayout";
import MenuMobile from "@/layouts/components/MenuMobile.vue";
export default {
  name: 'MobilePromotion',
  head: {
    link: [
      { rel: 'canonical', href:'http://158.255.47.199/mobile/profile' }
    ]
  },
  components: {
    BaseLayout,
    MenuMobile
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
      <div style="padding:0px; margin:0px;" class="bannerPromotion ">
        <b-img
          style="width:100%; border-bottom: 1px solid white;"
          class="center align-center max-width"
          :src="require('@/assets/images/banner/slide21.jpg')"
          alt="Banner Promotion"
        />
        <MenuMobile />
      </div>
      <div class="promotion">
        <div class="mobilePromotion text-light center">
          <span
            style="margin-bottom:2%; font-weight:bold;"
            class="ql align-center"
          >
            Promotion<br />
          </span>

          <span style="margin-bottom:5%; font-size:12px;" class="ql align-center">
            Banyak Promo Cashback dan Hadiah lainnya <br />
            yang bisa dinikmati di Isobet
          </span>

          <div v-for="promo in data" :key="promo.code">
            <b-row class="mt-4 ">
              <b-col>
                <b-img
                  class="p-0"
                  fluid-grow
                  :src="promo.imageUrl"
                  v-b-toggle="`accordion-${promo.code}`"
                ></b-img>
              </b-col>
            </b-row>
            <b-row class="mb-2">
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
