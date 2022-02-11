<script>
export default {
  data: () => {
    return {
      contactList: []
    };
  },
  computed:{
    conLength: function(){
        return this.contactList.length
    }
  },
  mounted() {
    this.getContact();
  },
  methods: {
    getContact() {
      this.ApiService.get("contact").then((resp) => {
        this.contactList = resp.data;
      });
    }
  },
};
</script>

<template>
  <div class="footer-container">
    <span style="font-weight: bold; font-size: 15px; text-align: center; color:white; " class="MobileFooter text-center align-center center max-width justify-content-center">
      CONTACT US
    </span>
    <b-row id="contact-us" class="big-soc-column justify-content-center" style="padding:0px; margin:0px; margin-top:10px; margin-bottom:10px;" align-h="center">
      <b-col v-for="con in contactList" :key="con.code" class="soc-column">                
        <a v-if="con.link.length > 0" v-bind:href="con.link" target="_blank">
          <b-row align-v="center" align-h="center" style="padding:0px;margin:0px;">
            <b-img :src=" require(`@/assets/images/sosmed/${con.contactType.toLowerCase()}.png`) " class="soc-icon" alt="Icon Contact Number" width="35" height="35"/>                  
          </b-row>     
          <b-row align-v="center" align-h="center" style="padding:0px;margin:0px;"> 
            {{ con.content }}
          </b-row>              
        </a>
      </b-col>
    </b-row>
    <div class="copyright-container"> Copyright &copy; 2021 Isobet All Rights Reserved </div>
  </div>
</template>