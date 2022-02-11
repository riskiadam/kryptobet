<script>
import { mapState } from "vuex";
import { LOGIN, LOGOUT } from "@/store/constants/actions.type";
import { FORGOT_PASSWORD } from "@/store/constants/actions.type";
import { REFRESH_WALLET, REFRESH_MAIN } from "@/store/constants/actions.type";

export default {
  components: {},
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
      gameList: [],
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
    sendForgotPassword() {
      let tmp = this.forgotPhone;
      this.$store
        .dispatch(FORGOT_PASSWORD, { phone: tmp })
        .then((result) => {
          console.log(result);
          this.$notify({
            group: "login1",
            title: "FORGOT PASSWORD SUKSES",
            text: "Password baru Anda akan dikirim melalui SMS.",
            type: "success",
            closeOnClick: true,
            max: 1,
            ignoreDuplicates: true,
          });
        })
        .catch((err) => {
          this.$notify({
            group: "login3",
            title: err,
            type: "error",
            closeOnClick: true,
            max: 1,
            ignoreDuplicates: true,
          });
        })
        .finally(() => {
          this.forgotPhone = "";
        });
    },
    refreshWallet() {
      if (this.isAuthenticated) {
        this.isRefreshing = true;
        this.isActive = true;
        this.$store.dispatch(REFRESH_WALLET).finally(() => {
          this.isRefreshing = false;
          this.isActive = false;
        });
      }
    },
    refreshMain() {
      if (this.isAuthenticated) {
        this.isActive = true;
        this.$store
          .dispatch(REFRESH_MAIN)
          .then((resp) => {
            if (!resp) {
              //logout
              this.forceLogout();
            }
          })
          .catch((error) => {
            console.log(error);
            this.forceLogout();
          })
          .finally(() => {
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
    addCategory: function (e) {
      if (e) e.preventDefault();
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
            group: "login1",
            title: "SUKSES LOGIN",
            text: "Selamat bermain di Isobet!",
            type: "success",
            closeOnClick: true,
            max: 1,
            ignoreDuplicates: true,
          });
          this.$router.push({ name: "HomeMobile" });
          if (this.isAuthenticated) {
            this.timer = setInterval(this.refreshMain, 30000);
          }
        })
        .catch((err) => {
          this.changeLoader(false);
          this.$notify({
            group: "login3",
            title: err.data.error,
            type: "error",
            closeOnClick: true,
            max: 1,
            ignoreDuplicates: true,
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
          group: "login2",
          title: "LOGOUT",
          text: "Silahkan login ulang untuk melanjutkan",
          type: "warning",
          closeOnClick: true,
          max: 1,
          ignoreDuplicates: true,
        });
        clearInterval(this.timer);
        this.timer = null;
      });
    },
    logout() {
      this.$store.dispatch(LOGOUT).then(() => {
        this.$notify({
          group: "login2",
          title: "BERHASIL LOGOUT",
          text: "Kami menantikan kamu Online kembali!",
          type: "success",
          closeOnClick: true,
          max: 1,
          ignoreDuplicates: true,
        });
        clearInterval(this.timer);
        this.timer = null;
      });
    },
    hideSide() {
      this.$refs.sidebar.hide();
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
  },
};
</script>

<template>
  <!-- M.LOGIN -->
  <b-modal
    v-if="!isAuthenticated"
    id="bv-modal-example"
    size="xl"
    hide-footer
    class="modal-border-white"
  >
    <template #modal-header="{ close }">
      <span class="modal-title-20"> LOGIN </span>
      <b-button variant="outline-danger" @click="close()">
        <span class="center"> X </span>
      </b-button>
    </template>
    <b-form @submit.stop.prevent="login">
      <b-row class="row-mt-50-mb-10">
        <b-col cols="1" class="row-pm-0" />
        <b-col
          cols="1"
          class="modal-custom-column center text-center justify-content-center"
        >
          <b-icon class="modal-icon-fill" icon="person-fill" />
        </b-col>
        <b-col cols="9" class="row-pm-0">
          <b-input
            v-model.lazy="loginData.username"
            type="text"
            placeholder="Username"
            size="sm"
            class="modal-custom-input"
          />
        </b-col>
        <b-col cols="1" class="row-pm-0" />
      </b-row>
      <b-row class="row-mt-10-mb-10">
        <b-col cols="1" class="row-pm-0" />
        <b-col
          cols="1"
          class="modal-custom-column center text-center justify-content-center"
        >
          <b-icon class="modal-icon-fill" icon="lock-fill" />
        </b-col>
        <b-col cols="9" class="row-pm-0">
          <b-input
            v-model="loginData.password"
            type="password"
            placeholder="Password"
            size="sm"
            v-on:keydown.enter.prevent="addCategory"
            class="modal-custom-input"
          />
        </b-col>
        <b-col cols="1" class="row-pm-0" />
      </b-row>
      <b-row
        class="row-mt-20 center text-center"
        align-h="center"
        align-v="center"
      >
        <b-col>
          <a v-b-modal.modal-tall-two-three>
            <span
              @click="$bvModal.hide('bv-modal-example')"
              class="modal-fgpwd"
            >
              Lupa Password?
            </span>
          </a>
          <router-link :to="{ name: 'Register' }">
            <span
              @click="$bvModal.hide('bv-modal-example')"
              class="modal-joinnw"
            >
              Daftar Sekarang
            </span>
          </router-link>
        </b-col>
      </b-row>
      <b-row class="modal-sblog-row">
        <b-button class="modal-sblog-button" block size="sm" type="submit">
          LOGIN
        </b-button>
      </b-row>
    </b-form>
  </b-modal>
</template>