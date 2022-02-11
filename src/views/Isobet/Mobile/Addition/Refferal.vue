<script>
import BaseLayout from "@/layouts/BaseLayout";
import MenuMobile from "@/layouts/components/MenuMobile.vue";
export default {
  name: 'MobileRefferal',
  head: {
    link: [
      { rel: 'canonical', href:'http://158.255.47.199/mobile/refferal' }
    ]
  },
  components: {
    BaseLayout,
    MenuMobile
  }
};
</script>

<template>
  <BaseLayout>
    <div class="referral" style="background-color:black;">
      <div class="MobileReferral" style="padding:0px; margin:0px;">
          <b-img style="width:100%; border-bottom: 1px solid white;" class="center align-center max-width" :src="require('@/assets/images/banner/slide20.jpg')" alt="Banner Referral Isobet" />  
          <MenuMobile />
          <b-row class="center justify-content-center align-center" style="margin-top:2%; padding-bottom:1%;">
            <b-img class="center align-center justify-content-center" style="width:50%" :src="require('@/assets/images/referral/top10a.png')"  alt="10 TOP WINNER REFERRAL"></b-img>
          </b-row>
      <h4 class="referral-section-container center justify-content-center ">Top 10 Referral Earner This Month</h4>
      <b-row class="center justify-content-center " style="margin:2% 5% 2% 5%; padding:0%;" align-v="center">
        <b-col class="referral-text-container-col"><h6 class="referral-text-container text-left" style="margin-left: 30px; " >RANK</h6></b-col>
        <b-col class="referral-text-container-col"><h6 class="referral-text-container text-left" >USERNAME</h6></b-col>
        <b-col class="referral-text-container-col"><h6 class="referral-text-container text-left" style="margin-left: 10px; " >MOBILE</h6></b-col>
        <b-col class="referral-text-container-col"><h6 class="referral-text-container text-left" style="margin-left: 10px; ">REFERRAL CODE</h6></b-col>
      </b-row>
      <b-row class="referral-row-container center justify-content-center" align-v="center">
        <b-col cols="3" style="padding:0px; margin:0px;"><b-img class="image-referral-rank center align-center justify-content-center" :src="require('@/assets/images/referral/top1.png')" alt="Peringkat Pertama"></b-img></b-col>
        <b-col cols="3" style="padding:0px; margin:0px;"><h6 class="referral-text-container-2 text-left">XXXXew99</h6></b-col>
        <b-col cols="3" style="padding:0px; margin:0px;"><h6 class="referral-text-container-2 text-left">08569324XXXX</h6></b-col>
        <b-col cols="3" style="padding:0px; margin:0px;"><h6 class="referral-text-container-2 text-left">wyzDpn0qa0iUvnyoZxXXXX</h6></b-col>
      </b-row>
      <b-row class="referral-row-container center justify-content-center" align-v="center">
        <b-col cols="3" style="padding:0px; margin:0px;"><b-img class="image-referral-rank center align-center justify-content-center" :src="require('@/assets/images/referral/top2.png')" alt="Peringkat Kedua"></b-img></b-col>
        <b-col cols="3" style="padding:0px; margin:0px;"><h6 class="referral-text-container-2 text-left">XXXXy73</h6></b-col>
        <b-col cols="3" style="padding:0px; margin:0px;"><h6 class="referral-text-container-2 text-left">081398435XXXX</h6></b-col>
        <b-col cols="3" style="padding:0px; margin:0px;"><h6 class="referral-text-container-2 text-left">asdDtr2qa3iUpoetlZxXXXX</h6></b-col>
      </b-row>
      <b-row class="referral-row-container center justify-content-center" align-v="center">
        <b-col cols="3" style="padding:0px; margin:0px;"><b-img class="image-referral-rank center align-center justify-content-center" :src="require('@/assets/images/referral/top3.png')" alt="Peringkat Ketiga"></b-img></b-col>
        <b-col cols="3" style="padding:0px; margin:0px;"><h6 class="referral-text-container-2 text-left">XXXXent04</h6></b-col>
        <b-col cols="3" style="padding:0px; margin:0px;"><h6 class="referral-text-container-2 text-left">085690345XXXX</h6></b-col>
        <b-col cols="3" style="padding:0px; margin:0px;"><h6 class="referral-text-container-2 text-left">yusDpn02a0iUdfrrAxXXXX</h6></b-col>
      </b-row>
      <b-row class="referral-row-container center justify-content-center" align-v="center">
        <b-col cols="3" style="padding:0px; margin:0px;"><b-img class="image-referral-rank center align-center justify-content-center" :src="require('@/assets/images/referral/top4.png')"  alt="Peringkat Keempat"></b-img></b-col>
        <b-col cols="3" style="padding:0px; margin:0px;"><h6 class="referral-text-container-2 text-left">XXXXon11</h6></b-col>
        <b-col cols="3" style="padding:0px; margin:0px;"><h6 class="referral-text-container-2 text-left">0812004583XXXX</h6></b-col>
        <b-col cols="3" style="padding:0px; margin:0px;"><h6 class="referral-text-container-2 text-left">mnbpn2qa2nNbvnoZvXXXX</h6></b-col>
      </b-row>
      <b-row class="referral-row-container center justify-content-center" align-v="center">
        <b-col cols="3" style="padding:0px; margin:0px;"><b-img class="image-referral-rank center align-center justify-content-center" :src="require('@/assets/images/referral/top5.png')"  alt="Peringkat Kelima"></b-img></b-col>
        <b-col cols="3" style="padding:0px; margin:0px;"><h6 class="referral-text-container-2 text-left">XXXXvine33</h6></b-col>
        <b-col cols="3" style="padding:0px; margin:0px;"><h6 class="referral-text-container-2 text-left">081294358XXXX</h6></b-col>
        <b-col cols="3" style="padding:0px; margin:0px;"><h6 class="referral-text-container-2 text-left">jglCfd5qa2iFemhgAvXXXX</h6></b-col>
      </b-row>
      <b-row class="referral-row-container center justify-content-center" align-v="center">
        <b-col cols="3" style="padding:0px; margin:0px;"><b-img class="image-referral-rank center align-center justify-content-center" :src="require('@/assets/images/referral/top6.png')" alt="Peringkat Keenam"></b-img></b-col>
        <b-col cols="3" style="padding:0px; margin:0px;"><h6 class="referral-text-container-2 text-left">XXXXk55</h6></b-col>
        <b-col cols="3" style="padding:0px; margin:0px;"><h6 class="referral-text-container-2 text-left">08789235XXXX</h6></b-col>
        <b-col cols="3" style="padding:0px; margin:0px;"><h6 class="referral-text-container-2 text-left">mbrTkfs3ty9yUvhgfBrXXXX</h6></b-col>
      </b-row>
      <b-row class="referral-row-container center justify-content-center" align-v="center">
        <b-col cols="3" style="padding:0px; margin:0px;"><b-img class="image-referral-rank center align-center justify-content-center" :src="require('@/assets/images/referral/top7.png')"  alt="Peringkat Ketujuh"></b-img></b-col>
        <b-col cols="3" style="padding:0px; margin:0px;"><h6 class="referral-text-container-2 text-left">XXXXaret34</h6></b-col>
        <b-col cols="3" style="padding:0px; margin:0px;"><h6 class="referral-text-container-2 text-left">085734343XXXX</h6></b-col>
        <b-col cols="3" style="padding:0px; margin:0px;"><h6 class="referral-text-container-2 text-left">pouSbv4yu3jKmeuuLhXXXX</h6></b-col>
      </b-row>
      <b-row class="referral-row-container center justify-content-center" align-v="center">
        <b-col cols="3" style="padding:0px; margin:0px;"><b-img class="image-referral-rank center align-center justify-content-center" :src="require('@/assets/images/referral/top8.png')"  alt="Peringkat Kedelapan"></b-img></b-col>
        <b-col cols="3" style="padding:0px; margin:0px;"><h6 class="referral-text-container-2 text-left">XXXXael73</h6></b-col>
        <b-col cols="3" style="padding:0px; margin:0px;"><h6 class="referral-text-container-2 text-left">08139450XXXX</h6></b-col>
        <b-col cols="3" style="padding:0px; margin:0px;"><h6 class="referral-text-container-2 text-left">werBvc5rt2gBoutrHcXXXX</h6></b-col>
      </b-row>
      <b-row class="referral-row-container center justify-content-center" align-v="center">
        <b-col cols="3" style="padding:0px; margin:0px;"><b-img class="image-referral-rank center align-center justify-content-center" :src="require('@/assets/images/referral/top9.png')"  alt="Peringkat Kesembilan"></b-img></b-col>
        <b-col cols="3" style="padding:0px; margin:0px;"><h6 class="referral-text-container-2 text-left">XXXXips33</h6></b-col>
        <b-col cols="3" style="padding:0px; margin:0px;"><h6 class="referral-text-container-2 text-left">08561112XXXX</h6></b-col>
        <b-col cols="3" style="padding:0px; margin:0px;"><h6 class="referral-text-container-2 text-left">lkhDpn7qa6iGhjgZxXXXX</h6></b-col>
      </b-row>
      <b-row class="referral-row-container center justify-content-center" align-v="center">
        <b-col cols="3" style="padding:0px; margin:0px;"><b-img class="image-referral-rank left text-left" :src="require('@/assets/images/referral/top10.png')"  alt="Peringkat Kesepuluh"></b-img></b-col>
        <b-col cols="3" style="padding:0px; margin:0px;"><h6 class="referral-text-container-2 text-left">XXXXy84</h6></b-col>
        <b-col cols="3" style="padding:0px; margin:0px;"><h6 class="referral-text-container-2 text-left">08560039XXXX</h6></b-col>
        <b-col cols="3" style="padding:0px; margin:0px;"><h6 class="referral-text-container-2 text-left">retMvc23a2gasfA4rHcXXXX</h6></b-col>
      </b-row>
      </div>    
    </div>
  </BaseLayout>
</template> 
