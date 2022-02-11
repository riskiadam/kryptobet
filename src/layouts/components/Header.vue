<script>
import { mapState } from "vuex";
import { LOGIN, LOGOUT } from "@/store/constants/actions.type";
import { REFRESH_WALLET } from "@/store/constants/actions.type"
import { FORGOT_PASSWORD } from "@/store/constants/actions.type";
import PinModal from "./pinEntry";
import emailjs from 'emailjs-com';
import router from '@/router/index.js';

export default {
  name: "Header",
  components: {
    PinModal,
  },
  data: () => {
    return {
      name: '',
      email: '',
      message: '',
      isActive1 : true,
      isActive : false,
      timer: '',
      isRefreshing:false,
      headerBgVariant: 'danger',
      footerBgVariant: 'danger',
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
      forgotPhone: ""
    };
  },
  computed: {
    ...mapState({
      //gamesCategoryList: state => state.games.categoryList,
      isAuthenticated: state => state.auth.isAuthenticated,
      currentUser: state => state.me.loggedInUser,
      walletList: state => state.wallet.walletList
    })
  },
  mounted() {
    this.profile = this.currentUser;
  },
  methods: {
    sendEmail: (e) => {
      emailjs.sendForm('service_gxi38tm', 'template_fof4vrw', e.target, 'user_wBWkNJhZzJYdHvx7Nfnia')
        .then((result) => {
            console.log('SUCCESS!', result.status, result.text);            
            router.push({name:'ForgotPassword'});
        }, (error) => {
            console.log('FAILED...', error);
        });        
    },
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
    shuffle() {
      var currentIndex = this.params.numbers.length,
        temporaryValue,
        randomIndex;

      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = this.params.numbers[currentIndex];
        this.params.numbers[currentIndex] = this.params.numbers[randomIndex];
        this.params.numbers[randomIndex] = temporaryValue;
      }
    },
    addCategory: function(e)
    {
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
      this.showPin = false;
      let payload = {
        username: this.loginData.username,
        password: this.loginData.password,
      };
      this.$store
        .dispatch(LOGIN, payload)
        .then(() => {
          this.clearForm();
          this.$notify({
            group: 'login1',
            title: 'SUKSES LOGIN',
            text: 'Selamat bermain di Isobet Bet!',
            type : 'success',
            closeOnClick : true,
            max : 1,
            ignoreDuplicates : true
          });
          if(this.isAuthenticated){
            this.timer = setInterval(this.refreshMain, 30000)
          }
          // this.$swal('Success Login!','Selamat Bermain!','success');
          // this.showMessage("Login Sukses", "success");
        })
        .catch((err) => {          
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
    }  
  },
};
</script>

<template>
  <div class="max-width">   
    <div class="DesktopHeader header-container max-width" > 
      <b-container fluid class="max-width">            
        <b-row class="max-width" style="padding-top:5px;">
           <b-col cols="12" md="12" class="logo-container max-width center"> 
            <router-link :to="{ name: 'home' }">
              <!-- <b-img :src="require('@/assets/images/logo/logo-desktop.png')" class="image-logo-container" alt="logo Isobet"/>               -->
              <span class="right align-right text-right" style="color:white; font-size:100px;">
                Kripto707
              </span>
            </router-link>            
          </b-col>                  
          <!-- <b-col cols="12" md="12" class="logo-container max-width right align-right text-right" style="padding:0px; margin:0px;"> 
            <span class="right align-right text-right" style="color:white; font-size:14px;">ALTERNATIF LINK : <a href="http://158.255.47.199/" style="font-size:14px;"> 158.255.47.199 </a></span> 
          </b-col>                   -->
        </b-row>
      </b-container>
    </div>
    <PinModal
      :isShown="params.showPin"
      :numbers="params.numbers"
      @submitPin="login">
    </PinModal>
    <div style="padding:0px; margin:0px">
      <b-modal id="modal-tall" size="lg" hide-footer class="center" centered>
        <template #modal-header="{ close }" class="center">      
          <!-- Emulate built in modal header close button action -->      
          <b-button disabled variant="outline-danger" @click="close()" >
            <span class="center"></span>
          </b-button> 
          <h4 style="color:white;" class="center justify-content-center">CONTACT US</h4>
          <b-button variant="outline-danger" @click="close()" >
            <span class="center">X</span>
          </b-button> 
        </template>
        <img style="padding:0%; margin:0%; width:100%; border-left:1px solid white; border-bottom:1px solid white; border-right:1px solid white;" class="center justify-content-center align-center align-content-center" src="@/assets/images/popup/hubungi-kami.jpg" alt="contact us Isobet" >        
      </b-modal>
    </div>
  </div>  
</template>