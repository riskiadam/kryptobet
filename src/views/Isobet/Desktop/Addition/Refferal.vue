<script>
import BaseLayout from "@/layouts/BaseLayout";
export default {
  name: 'Refferal',
  head: {
    link: [
      { rel: 'canonical', href:'http://158.255.47.199/refferal' }
    ]
  },
  components: {
    BaseLayout
  }
};
</script>

<template>
  <BaseLayout>
  <div class="referral" style="background-color:black;">    
    <div class="DesktopReferral" style="padding:0px; margin:0px;">
      <b-container style="background-color:transparent;" class="center justify-content-center align-center">
       
        <!-- <b-img style="width:95%; border-bottom: 0px solid white; padding:0%; margin-top:20px;" class="center align-center max-width" :src="require('@/assets/images/banner/long-banner-2.jpg')" />  -->

        <!-- Menu Tambahan -->
        <div style="background-color:#000">
          <b-row class="align-center center justify-content-center" style="background-color:#000; padding-top:20px; padding-bottom:10px; ">
            <b-button class="text-menu-bottom"  :to="{ name: 'Promotion' }" >Promosi</b-button>
            <b-button class="text-menu-bottom"  :to="{ name: 'Blog' }" >Berita</b-button>
            <b-button class="text-menu-bottom"  :to="{ name: 'Refferal' }" >Referral</b-button>
            <b-button class="text-menu-bottom"  :to="{ name: 'Help' }" >Bantuan</b-button>
            <b-button class="text-menu-bottom" target="_blank" href="http://165.22.253.162/keluaran-togel.amp" >Live Score</b-button>
          </b-row>
        </div>

        <b-row class="center justify-content-center align-center" style="margin-top:2%; padding-bottom:1%;">
          <b-img class="center align-center justify-content-center" style="width:50%" :src="require('@/assets/images/referral/top10a.png')" alt="10 TOP WINNER REFERRAL"></b-img>
        </b-row>
      </b-container>    

    <h4 class="referral-section-container center justify-content-center ">Top 10 Referral Earner This Month</h4>

    <b-row class="center justify-content-center " style="margin:2% 10% 2% 10%; padding:0%;" align-v="center">
      <b-col class="referral-text-container-col"><h6 class="referral-text-container" >RANK</h6></b-col>
      <b-col class="referral-text-container-col"><h6 class="referral-text-container" >USERNAME</h6></b-col>
      <b-col class="referral-text-container-col"><h6 class="referral-text-container" >MOBILE</h6></b-col>
      <b-col class="referral-text-container-col"><h6 class="referral-text-container" >REFERRAL CODE</h6></b-col>
    </b-row>

    <b-row class="referral-row-container center justify-content-center" align-v="center">
      <b-col><b-img class="image-referral-rank center align-center justify-content-center" :src="require('@/assets/images/referral/top1.png')"></b-img></b-col>
      <b-col><h6 class="referral-text-container-2">XXXXew99</h6></b-col>
      <b-col><h6 class="referral-text-container-2">08569324XXXX</h6></b-col>
      <b-col><h6 class="referral-text-container-2">wyzDpn0qa0iUvnyoZxXXXX</h6></b-col>
    </b-row>

    <b-row class="referral-row-container center justify-content-center" align-v="center">
      <b-col><b-img class="image-referral-rank center align-center justify-content-center" :src="require('@/assets/images/referral/top2.png')" alt="Peringkat Kedua"></b-img></b-col>
      <b-col><h6 class="referral-text-container-2">XXXXy73</h6></b-col>
      <b-col><h6 class="referral-text-container-2">081398435XXXX</h6></b-col>
      <b-col><h6 class="referral-text-container-2">asdDtr2qa3iUpoetlZxXXXX</h6></b-col>
    </b-row>

    <b-row class="referral-row-container center justify-content-center" align-v="center">
      <b-col><b-img class="image-referral-rank center align-center justify-content-center" :src="require('@/assets/images/referral/top3.png')" alt="Peringkat Ketiga"></b-img></b-col>
      <b-col><h6 class="referral-text-container-2">XXXXent04</h6></b-col>
      <b-col><h6 class="referral-text-container-2">085690345XXXX</h6></b-col>
      <b-col><h6 class="referral-text-container-2">yusDpn02a0iUdfrrAxXXXX</h6></b-col>
    </b-row>

    <b-row class="referral-row-container center justify-content-center" align-v="center">
      <b-col><b-img class="image-referral-rank center align-center justify-content-center" :src="require('@/assets/images/referral/top4.png')"  alt="Peringkat Keempat"></b-img></b-col>
      <b-col><h6 class="referral-text-container-2">XXXXon11</h6></b-col>
      <b-col><h6 class="referral-text-container-2">0812004583XXXX</h6></b-col>
      <b-col><h6 class="referral-text-container-2">mnbpn2qa2nNbvnoZvXXXX</h6></b-col>
    </b-row>

    <b-row class="referral-row-container center justify-content-center" align-v="center">
      <b-col><b-img class="image-referral-rank center align-center justify-content-center" :src="require('@/assets/images/referral/top5.png')"  alt="Peringkat Kelima"></b-img></b-col>
      <b-col><h6 class="referral-text-container-2">XXXXvine33</h6></b-col>
      <b-col><h6 class="referral-text-container-2">081294358XXXX</h6></b-col>
      <b-col><h6 class="referral-text-container-2">jglCfd5qa2iFemhgAvXXXX</h6></b-col>
    </b-row>

    <b-row class="referral-row-container center justify-content-center" align-v="center">
      <b-col><b-img class="image-referral-rank center align-center justify-content-center" :src="require('@/assets/images/referral/top6.png')"  alt="Peringkat Keenam"></b-img></b-col>
      <b-col><h6 class="referral-text-container-2">XXXXk55</h6></b-col>
      <b-col><h6 class="referral-text-container-2">08789235XXXX</h6></b-col>
      <b-col><h6 class="referral-text-container-2">mbrTkfs3ty9yUvhgfBrXXXX</h6></b-col>
    </b-row>

    <b-row class="referral-row-container center justify-content-center" align-v="center">
      <b-col><b-img class="image-referral-rank center align-center justify-content-center" :src="require('@/assets/images/referral/top7.png')"  alt="Peringkat Ketujuh"></b-img></b-col>
      <b-col><h6 class="referral-text-container-2">XXXXaret34</h6></b-col>
      <b-col><h6 class="referral-text-container-2">085734343XXXX</h6></b-col>
      <b-col><h6 class="referral-text-container-2">pouSbv4yu3jKmeuuLhXXXX</h6></b-col>
    </b-row>

    <b-row class="referral-row-container center justify-content-center" align-v="center">
      <b-col><b-img class="image-referral-rank center align-center justify-content-center" :src="require('@/assets/images/referral/top8.png')"  alt="Peringkat Kedelapan"></b-img></b-col>
      <b-col><h6 class="referral-text-container-2">XXXXael73</h6></b-col>
      <b-col><h6 class="referral-text-container-2">08139450XXXX</h6></b-col>
      <b-col><h6 class="referral-text-container-2">werBvc5rt2gBoutrHcXXXX</h6></b-col>
    </b-row>

    <b-row class="referral-row-container center justify-content-center" align-v="center">
      <b-col><b-img class="image-referral-rank center align-center justify-content-center" :src="require('@/assets/images/referral/top9.png')" alt="Peringkat Kesembilan"></b-img></b-col>
      <b-col><h6 class="referral-text-container-2">XXXXips33</h6></b-col>
      <b-col><h6 class="referral-text-container-2">08561112XXXX</h6></b-col>
      <b-col><h6 class="referral-text-container-2">lkhDpn7qa6iGhjgZxXXXX</h6></b-col>
    </b-row>

    <b-row class="referral-row-container center justify-content-center" align-v="center">
      <b-col><b-img class="image-referral-rank center align-center justify-content-center" :src="require('@/assets/images/referral/top10.png')" alt="Peringkat Kesepuluh"></b-img></b-col>
      <b-col><h6 class="referral-text-container-2">XXXXy84</h6></b-col>
      <b-col><h6 class="referral-text-container-2">08560039XXXX</h6></b-col>
      <b-col><h6 class="referral-text-container-2">retMvc23a2gasfA4rHcXXXX</h6></b-col>
    </b-row>

    <b-row align-v="center">
      
    </b-row>

    </div>    
  </div>
  </BaseLayout>
</template> 
