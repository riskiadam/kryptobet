<script>
import { mapState } from "vuex";
import { LOGIN, LOGOUT } from "@/store/constants/actions.type";
import { FORGOT_PASSWORD } from "@/store/constants/actions.type";
import { REFRESH_WALLET, REFRESH_MAIN } from "@/store/constants/actions.type";

export default {
  components: {
  },
  data: () => {
    return {
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
      gameList: []
    };
  },
  computed: {
    ...mapState({
      //gamesCategoryList: state => state.games.categoryList,
      isAuthenticated: (state) => state.auth.isAuthenticated,
      currentUser: (state) => state.me.loggedInUser,
      walletList: (state) => state.wallet.walletList,
    }),
  },
  created() {
    // this.fetchEventsList();
    // var currentUrl = window.location.pathname;
    // console.log(currentUrl);
  },
  mounted() {
    this.profile = this.currentUser;
  },
  methods: {
    sendForgotPassword(){
        let tmp = this.forgotPhone;
        this.$store.dispatch(FORGOT_PASSWORD, { phone: tmp }).then((result)=>{
            console.log(result)
            this.$notify({
              group: 'login1',
              title: 'FORGOT PASSWORD SUKSES',
              text: 'Password baru Anda akan dikirim melalui SMS.',
              type : 'success',
              closeOnClick : true,
              max : 1,
              ignoreDuplicates : true
            });
        }).catch((err)=>{
          this.$notify({
                group: 'login3',
                title: err,
                type : 'error',
                closeOnClick : true,
                max : 1,
                ignoreDuplicates : true
          });
        }).finally(()=>{
          this.forgotPhone = '';
        });
    },
    refreshWallet(){
      if(this.isAuthenticated){
        this.isRefreshing = true;
        this.isActive = true;
          this.$store.dispatch(REFRESH_WALLET).finally(()=>{
            this.isRefreshing = false;
            this.isActive = false;
        });
      }      
    },
    refreshMain(){
      if(this.isAuthenticated){
        this.isActive = true;
        this.$store.dispatch(REFRESH_MAIN)
        .then(resp =>{
          if(!resp){
            //logout
            this.forceLogout();
          }
        }).catch(error => {
          console.log(error)
          this.forceLogout();
        })
        .finally(()=>{
          this.isActive = false;
        });
      }
    },
    shuffle() {
        var currentIndex = this.params.numbers.length,
        temporaryValue,
        randomIndex;

        while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = this.params.numbers[currentIndex];
        this.params.numbers[currentIndex] = this.params.numbers[randomIndex];
        this.params.numbers[randomIndex] = temporaryValue;
      }
    },
    addCategory: function(e){
        if(e) e.preventDefault();
        console.log("Submit Success");
        this.login();
    },
    /*checkLogin() {
      this.ApiService.post("/member/signin", this.loginData)
        .then(() => {
          this.shuffle();
          this.params.showPin = true;
        })
        .catch((err) => {
          this.showMessage(err, "error");
        });
    },*/
    login() {
      this.changeLoader(true);
      this.showPin = false;
      let payload = {
        username: this.loginData.username,
        password: this.loginData.password,
      };
      this.$store
        .dispatch(LOGIN, payload)
        .then(() => {
          this.clearForm();
          this.changeLoader(false);
          this.$notify({
            group: 'login1',
            title: 'SUKSES LOGIN',
            text: 'Selamat bermain di Isobet!',
            type : 'success',
            closeOnClick : true,
            max : 1,
            ignoreDuplicates : true
          });
          if(this.isAuthenticated){
            this.timer = setInterval(this.refreshMain, 30000)
          }
        })
        .catch((err) => { 
          this.changeLoader(false);         
          this.$notify({
                group: 'login3',
                title: err.data.error,
                type : 'error',
                closeOnClick : true,
                max : 1,
                ignoreDuplicates : true
          });
        })
        .finally(() => {
          this.params.showPin = false;
          this.changeLoader(false);
        });
    },
    getLogo() {
      this.ApiService.get("layout/logo").then((resp) => {
        this.logo = resp.data.content;
      });
    },
    clearForm() {
      this.loginData.username = "";
      this.loginData.password = "";
    },
    forceLogout() {
      this.$store.dispatch(LOGOUT).then(() => {
        this.$notify({
              group: 'login2',
              title: 'LOGOUT',
              text: 'Silahkan login ulang untuk melanjutkan',
              type : 'warning',
              closeOnClick : true,
              max : 1,
              ignoreDuplicates : true
        });
        clearInterval(this.timer);
        this.timer = null;
      });
    },
    logout() {
      this.$store.dispatch(LOGOUT).then(() => {
        this.$notify({
              group: 'login2',
              title: 'BERHASIL LOGOUT',
              text: 'Kami menantikan kamu Online kembali!',
              type : 'success',
              closeOnClick : true,
              max : 1,
              ignoreDuplicates : true
        });
        clearInterval(this.timer);
        this.timer = null;
      });
    },
    hideSide(){
        this.$refs.sidebar.hide();
    },    
    onOver1() {
      this.$refs.collapse1.visible = true;
      this.$refs.collapse2.visible = false;
      this.$refs.collapse3.visible = false;
      this.$refs.collapse4.visible = false;
      this.$refs.collapse5.visible = false;
      this.$refs.collapse6.visible = false;
    },
    onLeave1() {
      this.$refs.collapse1.visible = false;
    },
    onOver2() {
      this.$refs.collapse2.visible = true;
      this.$refs.collapse1.visible = false;
      this.$refs.collapse3.visible = false;
      this.$refs.collapse4.visible = false;
      this.$refs.collapse5.visible = false;
      this.$refs.collapse6.visible = false;
    },
    onLeave2() {
      this.$refs.collapse2.visible = false;
    },
    onOver3() {
      this.$refs.collapse3.visible = true;
      this.$refs.collapse1.visible = false;
      this.$refs.collapse2.visible = false;
      this.$refs.collapse4.visible = false;
      this.$refs.collapse5.visible = false;
      this.$refs.collapse6.visible = false;
    },
    onLeave3() {
      this.$refs.collapse3.visible = false;
    },
    onOver4() {
      this.$refs.collapse4.visible = true;
      this.$refs.collapse1.visible = false;
      this.$refs.collapse2.visible = false;
      this.$refs.collapse3.visible = false;
      this.$refs.collapse5.visible = false;
      this.$refs.collapse6.visible = false;
    },
    onLeave4() {
      this.$refs.collapse4.visible = false;
    },
    onOver5() {
      this.$refs.collapse5.visible = true;
      this.$refs.collapse4.visible = false;
      this.$refs.collapse1.visible = false;
      this.$refs.collapse2.visible = false;
      this.$refs.collapse3.visible = false;
      this.$refs.collapse6.visible = false;
    },
    onLeave5() {
      this.$refs.collapse5.visible = false;
    },
    onOver6() {
      this.$refs.collapse6.visible = true;
      this.$refs.collapse5.visible = false;
      this.$refs.collapse4.visible = false;
      this.$refs.collapse1.visible = false;
      this.$refs.collapse2.visible = false;
      this.$refs.collapse3.visible = false;
    },
    onLeave6() {
      this.$refs.collapse6.visible = false;
    },
    onLeaveAll() {
      this.$refs.collapse1.visible = false;
      this.$refs.collapse2.visible = false;
      this.$refs.collapse3.visible = false;
      this.$refs.collapse4.visible = false;
      this.$refs.collapse5.visible = false;
      this.$refs.collapse6.visible = false;
    },
    showAlert() {
      this.$notify({
        group: "login1",
        title: "SUKSES LOGIN",
        text: "Selamat bermain di Isobet!",
        type: "success",
        closeOnClick: true,
        max: 1,
        ignoreDuplicates: true,
      });
    },
    showAlert2() {
      this.$notify({
        group: "login2",
        title: "SUKSES LOGOUT",
        text: "Kami menantikan kamu Online kembali!",
        type: "success",
        closeOnClick: true,
        max: 1,
        ignoreDuplicates: true,
      });
    },
    showButton() {
      this.isShowButton = true;
    },
  },
  watch: {
    $route() {
      //this.getGames();
    },
  }
};
</script>

<template>
  <div>
      <!-- M.FORGOT MOBILE -->
      <b-modal v-if="!isAuthenticated" id="modal-tall-two-three" size="xl" hide-footer class="center">    
          <template #modal-header="{ close }" > 
              <h4 class="modal-title-20 center justify-content-center">
                  lUPA PASSWORD
              </h4>
              <b-button variant="outline-danger" @click="close()" >
                  <span class="center">
                      X
                  </span>
              </b-button> 
          </template>
          <div class="modal-relative-black position-relative center justify-content-center text-center">
              <img loading="lazy" class="modal-fgwd-img center justify-content-center align-center align-content-center" src="@/assets/images/popup/forget-password.png" alt="Lupa Password" >          
              <b-row class="modal-absolute-black position-absolute max-width" align-h="center" align-v="center">
                  <b-col cols="12" md="12">
                      <h5 class="modal-fgwd-text center text-center">
                      Mohon isi nomor telepon disini. <br/> Kita akan mengirimkan <br/> Password baru dari SMS.
                      </h5>
                  </b-col>
                  <b-col cols="12" md="12">
                      <form class="modal-fgwd-form" @submit.prevent="sendForgotPassword" >
                          <input class="modal-fgwd-input" type="phone" name="email" placeholder="PHONE NUMBER, ex: 081234567890" v-model.lazy="forgotPhone">                            
                          <input class="modal-fgwd-button" type="submit" value="SUBMIT RESET PASSWORD" @click=" $bvModal.hide('modal-tall-two-three')">                            
                      </form> 
                  </b-col>
              </b-row>
          </div>        
      </b-modal>
      <!-- M.FORGOT DESKTOP -->
      <b-modal v-if="!isAuthenticated" id="modal-tall-two" size="lg" hide-footer class="center" centered>    
        <template #modal-header="{ close }" >                
          <b-button style="background-color:black; border:0px;" @click="close()" >
            <span class="center"></span>
          </b-button>
          <h4 class="title-modal-header center justify-content-center">FORGOT PASSWORD</h4>
          <b-button variant="outline-danger" @click="close()" >
            <span class="center">
              X
            </span>
          </b-button>
        </template>
        <div class="modal-header-forgot-password position-relative">
          <img loading="lazy" class="img-header-forgot-password center justify-content-center align-center align-content-center" src="@/assets/images/popup/forget-password.png" alt="Lupa Password" >        
            <b-row class="modal-row-header-forgot-password position-absolute center text-center">
              <b-col class="center text-center" >
                <b-row class="center text-center" align-h="center" >
                  <h5 class="modal-row-header-forgot-password-title center text-center">PLEASE FILL YOUR PHONE NUMBER HERE. <br/> WE WILL SEND YOUR NEW PASSWORD THROUGH SMS.</h5>
                </b-row>
                <b-row class="modal-row-header-forgot-password-5p center text-center" align-h="center">
                  <form class="contact-form" @submit.prevent="sendForgotPassword" >
                      <input class="contact-form-input" type="phone" name="email" placeholder="PHONE NUMBER, ex: 081234567890" v-model="forgotPhone">                    
                      <input class="contact-form-button" type="submit" value="SUBMIT RESET PASSWORD" @click=" $bvModal.hide('modal-tall-two')">                    
                    </form> 
                </b-row>
              </b-col>        
            
            </b-row>
        </div>
        
      </b-modal>
    </div>
</template>