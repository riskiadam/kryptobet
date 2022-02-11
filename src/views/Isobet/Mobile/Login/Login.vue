<script>
import { mapState } from "vuex";
import { LOGIN, LOGOUT } from "@/store/constants/actions.type";
import { REFRESH_WALLET, REFRESH_MAIN } from "@/store/constants/actions.type";
import { FORGOT_PASSWORD } from "@/store/constants/actions.type";
import emailjs from "emailjs-com";
import BaseLayout from "@/layouts/BaseLayout";

export default {
  components: {
    BaseLayout,
  },
  data: () => {
    return {
      name: "",
      email: "",
      message: "",
      isActive1: true,
      isActive: false,
      timer: "",
      logo: null,
      isRefreshing: false,
      headerBgVariant: "danger",
      footerBgVariant: "danger",
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
      showLoadings: false,
    };
  },
  computed: {
    ...mapState({
      isAuthenticated: (state) => state.auth.isAuthenticated,
      currentUser: (state) => state.me.loggedInUser,
      walletList: (state) => state.wallet.walletList,
    }),
  },
  mounted() {
    this.profile = this.currentUser;
  },
  methods: {
    sendEmail: (e) => {
      emailjs
        .sendForm(
          "service_gxi38tm",
          "template_fof4vrw",
          e.target,
          "user_wBWkNJhZzJYdHvx7Nfnia"
        )
        .then(
          (result) => {
            console.log("SUCCESS!", result.status, result.text);
          },
          (error) => {
            console.log("FAILED...", error);
          }
        );
    },
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
    login() {
      this.showPin = false;
      console.log(this.loginData);
      this.$store
        .dispatch(LOGIN, this.loginData)
        .then(() => {
          this.clearForm();
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
  },
};
</script>

<template>
  <BaseLayout>
    <div class="nav-container-login">
      <b-form @submit.stop.prevent="login">
        <h1 style="color: white; text-align: center; margin-top: 50px">
          LOGIN
        </h1>
        <b-row class="row-mt-50-mb-10">
          <b-col cols="1" class="row-pm-0" />
          <b-col
            cols="1"
            class="
              modal-custom-column
              center
              text-center
              justify-content-center
            "
          >
            <b-icon class="modal-icon-fill" icon="person-fill" />
          </b-col>
          <b-col cols="9" class="row-pm-0">
            <b-input
              v-model="loginData.username"
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
            class="
              modal-custom-column
              center
              text-center
              justify-content-center
            "
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
                Lupa Kata Sandi?
              </span>
            </a>
            <router-link :to="{ name: 'MobileRegister' }">
              <span
                @click="$bvModal.hide('bv-modal-example')"
                class="modal-joinnw"
              >
                Daftar
              </span>
            </router-link>
          </b-col>
        </b-row>
        <b-row class="modal-sblog-row">
          <b-button class="modal-sblog-button" block size="sm" type="submit">
            Masuk
          </b-button>
        </b-row>
      </b-form>
    </div>
  </BaseLayout>
</template>