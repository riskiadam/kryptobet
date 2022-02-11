<script>
import BaseLayout from "@/layouts/BaseLayout";

export default {
  name: 'Barcode',
  head: {
    link: [
      { rel: 'canonical', href:'http://158.255.47.199/barcode' }
    ]
  },
  components: {
    BaseLayout
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
      <div class="DesktopRegister" style="padding:0px; margin:0px;">
        <b-row align-v="center" align-h="center" style="padding:20px 0px">
          <b-col cols="4">
            <b-img style="width:100%; border: 0px solid white;" class="center align-center max-width" :src="require('@/assets/images/logo/logo-app.png')" alt="Banner Promotion Isobet" /> 
          </b-col>
          <b-col cols="3" class="center justify-content-center">
            <b-img style="width:100%; border: 0px solid white;" class="center align-center max-width" :src="`${publicPath}qr-code-isobet.png`" alt="Banner Promotion Isobet" /> 

            <h1 style="font-size:25px; margin-bottom:0.5%; color:white;" class="ql align-center">Scan and Download</h1>
              <h5 style="color: white; font-size:18px; margin-bottom:2%; margin-top:10px;" class="ql align-center">Download dan Mainkan segera di Smartphone</h5>
          </b-col>
        </b-row>
      </div>
      <a class="center justify-content-center text-center" style="display:none;" ref="goTo" href="/files/ISOBET.apk" download>DOWNLOAD</a>
    </div>
  </BaseLayout>
</template>