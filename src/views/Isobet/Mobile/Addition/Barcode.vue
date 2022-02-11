<script>
import BaseLayout from "@/layouts/BaseLayout";
import MenuMobile from "@/layouts/components/MenuMobile.vue";
export default {
  name: 'MobileBarcode',
  head: {
    link: [
      { rel: 'canonical', href:'http://158.255.47.199/mobile/barcode' }
    ]
  },
  components: {
    BaseLayout,
    MenuMobile
  },
  data() {
    return {
      publicPath: process.env.BASE_URL
    };
  }, 
  mounted() {
    this.$refs.goTo.click();
    this.loadBank();
    if (this.refCode) this.payload.ReferralCode = this.refCode;    
  }
};
</script>
    
<template>
  <BaseLayout>
    <div class="register">    
      <div class="MobileRegister" style="padding:0px; margin:0px;">
        <b-img class="center align-center max-width" :src="require('@/assets/images/banner/slide18.jpg')" alt="Banner Blog News Isobet" />     
        <MenuMobile />
        <b-row align-v="center" align-h="center" style="padding:20px 0px">
        <b-img style="width:100%; border: 0px solid white;" class="center align-center max-width" :src="require('@/assets/images/logo/logo-app.png')" alt="Banner Promotion isobet" /> 
          <b-img style="width:60%; border: 0px solid white;" class="center align-center max-width" :src="`${publicPath}qr-code-isobet.png`" alt="Banner Promotion isobet" /> 
          <div align-v="center" align-h="center" class="justify-content-center center" style="padding:0px; margin:0px;">          
            <h1 style="font-size:25px; margin-bottom:0.5%; color:white;" class="ql align-center">Scan and Download</h1>
            <h5 style="color: white; font-size:12px; margin-bottom:2%; margin-top:5px;" class="ql align-center">Download dan Mainkan segera di Smartphone</h5>
          </div>
        </b-row>
      </div>
      <a class="center justify-content-center text-center" style="display:none;" ref="goTo" href="/files/ISOBET.apk" download>DOWNLOAD</a>
    </div>
  </BaseLayout>
</template>