<script>
import Vue from "vue";
import { LOGIN } from "@/store/constants/actions.type";
import BaseLayout from "@/layouts/BaseLayout";
import MenuMobile from "@/layouts/components/MenuMobile.vue";
export default {
  name: "MobileRegister",
  head: {
    link: [{ rel: "canonical", href: "http://158.255.47.199/mobile/register" }],
  },
  props: {
    refCode: {
      type: String,
      default: null,
    },
  },
  components: {
    BaseLayout,
    MenuMobile
  },
  data() {
    return {
      params: {
        bankList: [],
      },
      bank: {
        code: "",
      },
      isLoading: false,
      payload: {
        username: null,
        password: null,
        conPassword: null,
        email: null,
        phone: null,
        accountNo: null,
        bankCode: null,
        accountName: null,
        refferalCode: null,
      },
      status: "0",
    };
  },
  mounted() {
    this.loadBank();
    if (this.refCode) this.payload.ReferralCode = this.refCode;
  },
  methods: {
    loadBank() {
      this.changeLoader(true);
      this.ApiService.get("param/bank")
        .then((resp) => {
          let tmp = [];
          for (let i = 0; i < resp.data.length; i++) {
            if (resp.data[i].type != "PULSA") {
              tmp.push(resp.data[i]);
            }
          }

          this.params.bankList = tmp;
        })
        .finally(() => {
          this.changeLoader(false);
        });
    },
    checkAlphaNumeric($event) {
      var specialKeys = [
        48,
        49,
        50,
        51,
        52,
        53,
        54,
        55,
        56,
        57,
        65,
        66,
        67,
        68,
        69,
        70,
        71,
        72,
        73,
        74,
        75,
        76,
        77,
        78,
        79,
        80,
        81,
        82,
        83,
        84,
        85,
        86,
        87,
        88,
        89,
        90,
        97,
        98,
        99,
        100,
        101,
        102,
        103,
        104,
        105,
        106,
        107,
        108,
        109,
        110,
        111,
        112,
        113,
        114,
        115,
        116,
        117,
        118,
        119,
        120,
        121,
        122,
      ];

      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if (specialKeys.indexOf(keyCode) === -1) {
        $event.preventDefault();
        console.log($event.which);
      }

      // var specialKeys1 = [
      //   "digit3",
      //   "digit4",
      //   "digit5"
      // ];
      //  let keyCode1 = $event.keyCode1 ? $event.keyCode1 : $event.code;
      //  if (specialKeys1.indexOf(keyCode1) === -1) {
      //   $event.preventDefault();
      // }
    },
    register() {
      var regex = /^[A-Za-z0-9 ]+$/;
      var isValid = regex.test(this.payload.username);
      if (!isValid) {
        Vue.notify({
          group: "ErrorMessage",
          title: "Kesalahan Terjadi",
          text: "Username tidak boleh menggunakan karakter spesial",
          type: "error",
          closeOnClick: true,
          max: 1,
          ignoreDuplicates: true,
        });
        // this.showMessage("Username Contains Special Charachter", "error");
      } else {
        this.changeLoader(true);
        if (this.refCode) this.payload.ReferralCode = this.refCode;

        if (this.payload.email == "") this.payload.email = null;

        this.ApiService.post("member/register", this.payload)
          .then(() => {
            Vue.notify({
              group: "SuccessMessage",
              title: "Registrasi Berhasil",
              text: "Selamat Bergabung bersama Kami",
              type: "success",
              closeOnClick: true,
              max: 1,
              ignoreDuplicates: true,
            });
            // this.showMessage("Registrasi Berhasil", "success");
            let loginPayload = {
              username: this.payload.username,
              password: `${this.payload.password}`,
            };
            this.$store.dispatch(LOGIN, loginPayload).then(() => {
              this.$router.push({ name: "home" });
            });
            this.clearForm();
            this.$router.push({ name: "home" });
          })
          .catch((error) => {
            Vue.notify({
              group: "ErrorMessage",
              title: "Kesalahan Terjadi",
              text: error,
              type: "error",
              closeOnClick: true,
              max: 1,
              ignoreDuplicates: true,
            });
            // this.showMessage(error, "error");
          })
          .finally(() => {
            this.changeLoader(false);
          });
      }
    },
    clearForm() {
      this.payload.username = null;
      this.payload.password = null;
      this.payload.conPassword = null;
      this.payload.email = null;
      this.payload.phone = null;
      this.payload.accountNo = null;
      this.payload.bankCode = null;
      this.payload.accountName = null;
      this.payload.refferalCode = null;
    },
  },
};
</script>

<template>
  <BaseLayout>
    <div class="register">
      <div class="DesktopRegister" style="padding:0px; margin:0px;">
        <!-- Banner -->
        <div>
          <b-img
            style="width:100%; border-bottom: 0px solid white; padding:1% 10%;"
            class="center align-center max-width"
            :src="require('@/assets/images/banner/long-banner-6.jpg')"
            alt="banner"
            fluid
          />
        </div>
        <!-- Menu Tambahan -->
        <div class="desktopPromotion" style="background-color:#000">
          <b-row
            class="align-center center justify-content-center"
            style="background-color:#000; padding-top:20px; padding-bottom:20px; "
          >
            <b-button class="text-menu-bottom" :to="{ name: 'Promotion' }"
              >Promosi</b-button
            >
            <b-button class="text-menu-bottom" :to="{ name: 'Blog' }"
              >Berita</b-button
            >
            <b-button class="text-menu-bottom" :to="{ name: 'Refferal' }"
              >Referral</b-button
            >
            <b-button class="text-menu-bottom" :to="{ name: 'Help' }"
              >Bantuan</b-button
            >
            <b-button
              class="text-menu-bottom"
              target="_blank"
              href="http://165.22.253.162/keluaran-togel.amp"
              >Live Score</b-button
            >
          </b-row>
        </div>
        <!-- Form Register -->
        <b-form @submit.prevent="register">
          <div class="register-content">
            <div class="register-section-container">
              <div style="padding-left:30px;" class="register-section-title">
                REGISTRASI
              </div>
              <div class="register-section-content">
                <b-container fluid>
                  <b-row class="register-form-row">
                    <b-col col cols="12" md="4" class="register-form-label">
                      Nama
                      <div style="margin-top:0.1px;" class="small-note">
                        Sesuai dengan Rekening Bank
                      </div>
                    </b-col>
                    <b-col col cols="12" md="8" class="register-form-input">
                      <b-form-input
                        v-model="payload.accountName"
                        type="text"
                        placeholder="Nama Lengkap*"
                        size="sm"
                        fluid
                      />
                    </b-col>
                  </b-row>
                  <b-row class="register-form-row">
                    <b-col col cols="12" md="4" class="register-form-label">
                      BANK
                    </b-col>
                    <b-col col cols="12" md="8" class="register-form-input">
                      <v-select
                        v-model="payload.bankCode"
                        :options="params.bankList"
                        :reduce="(x) => x.code"
                        label="name"
                        class="bg-white text-grey"
                        placeholder="Pilih Bank*"
                        block
                        required
                      ></v-select>
                    </b-col>
                  </b-row>
                  <b-row class="register-form-row">
                    <b-col col cols="12" md="4" class="register-form-label">
                      NOMOR REKENING BANK
                      <div style="margin-top:0.1px;" class="small-note">
                        Must be Valid for Deposit / Withdrawal
                      </div>
                    </b-col>
                    <b-col col cols="12" md="8" class="register-form-input">
                      <b-form-input
                        v-model="payload.accountNo"
                        type="number"
                        placeholder="Nomor Rekening Bank*"
                        size="sm"
                        fluid
                      ></b-form-input>
                    </b-col>
                  </b-row>
                  <b-row class="register-form-row">
                    <b-col col cols="12" md="4" class="register-form-label"
                      >NO. HANDPHONE/WA/LINE</b-col
                    >
                    <b-col col cols="12" md="8" class="register-form-input">
                      <b-form-input
                        v-model="payload.phone"
                        type="number"
                        placeholder="No. Handphone/WA/Line*"
                        size="sm"
                        fluid
                      ></b-form-input>
                    </b-col>
                  </b-row>
                  <b-row class="register-form-row">
                    <b-col col cols="12" md="4" class="register-form-label">
                      USERNAME
                    </b-col>
                    <b-col col cols="12" md="8" class="register-form-input">
                      <b-form-input
                        v-model="payload.username"
                        type="text"
                        placeholder="Username*"
                        @keypress="checkAlphaNumeric"
                        size="sm"
                        fluid
                      ></b-form-input>
                    </b-col>
                  </b-row>
                  <b-row class="register-form-row">
                    <b-col col cols="12" md="4" class="register-form-label">
                      EMAIL
                    </b-col>
                    <b-col col cols="12" md="8" class="register-form-input">
                      <b-form-input
                        v-model="payload.email"
                        type="email"
                        placeholder="Alamat Email*"
                        size="sm"
                        fluid
                      ></b-form-input>
                    </b-col>
                  </b-row>
                  <b-row class="register-form-row">
                    <b-col col cols="12" md="4" class="register-form-label">
                      PASSWORD
                    </b-col>
                    <b-col col cols="12" md="8" class="register-form-input">
                      <b-form-input
                        v-model="payload.password"
                        type="password"
                        placeholder="Setidaknya 6 Huruf / Angka untuk Kata Sandi*"
                        size="sm"
                        fluid
                      ></b-form-input>
                    </b-col>
                  </b-row>
                  <b-row class="register-form-row">
                    <b-col col cols="12" md="4" class="register-form-label">
                      KONFIRMASI PASSWORD
                    </b-col>
                    <b-col col cols="12" md="8" class="register-form-input">
                      <b-form-input
                        v-model="payload.conPassword"
                        type="password"
                        placeholder="Masukkan kembali Password*"
                        size="sm"
                        fluid
                      ></b-form-input>
                    </b-col>
                  </b-row>
                  <b-row class="register-form-row-last">
                    <b-col col cols="12" md="4" class="register-form-label">
                      KODE REFERRAL
                      <div style="margin-top:0.1px;" class="small-note">
                        Opsional (jika Anda memilikinya)
                      </div>
                    </b-col>
                    <b-col col cols="12" md="8" class="register-form-input">
                      <b-form-input
                        type="text"
                        placeholder="Kode Referral"
                        size="sm"
                        fluid
                        :value="refCode"
                      ></b-form-input>
                    </b-col>
                  </b-row>
                  <b-row class="register-form-row">
                    <b-col
                      col
                      cols="12"
                      md="4"
                      class="register-form-label"
                    ></b-col>
                    <b-col
                      col
                      cols="12"
                      md="8"
                      class="register-form-input checkbox-col"
                    >
                      <b-form-checkbox
                        id="checkbox-1"
                        v-model="status"
                        name="checkbox-1"
                        value="1"
                        unchecked-value="0"
                        size="lg"
                      >
                        <div class="small-checkbox-text">
                          Dengan ini saya menyatakan telah dewasa berumur lebih
                          dari 18 tahun dan secara sadar membaca, mengerti, dan
                          menyetujui peraturan yang ada di website ini
                        </div>
                      </b-form-checkbox>
                    </b-col>
                  </b-row>
                  <b-row class="register-form-row">
                    <b-col
                      col
                      cols="12"
                      md="4"
                      class="register-form-label"
                    ></b-col>
                    <b-col col cols="12" md="8" class="register-form-input">
                      <b-button
                        type="submit"
                        class="submit-button"
                        :disabled="status == '0'"
                      >
                        SUBMIT
                      </b-button>
                    </b-col>
                  </b-row>
                </b-container>
              </div>
            </div>
          </div>
        </b-form>
      </div>
      <div class="MobileRegister" style="padding:0px; margin:0px;">
        <b-img
          style="width:100%; border-bottom: 1px solid white;"
          class="center align-center max-width"
          :src="require('@/assets/images/banner/slide5.jpg')"
          alt="Banner Promotion Isobet"
        />
        <MenuMobile />
        <b-form @submit.prevent="register">
          <div class="register-content">
            <div class="register-section-container">
              <div class="register-section-title">REGISTRASI</div>
              <div class="register-section-content">
                <b-container fluid>
                  <b-row class="register-form-row">
                    <b-col col cols="12" md="4" class="register-form-label"
                      >Nama
                      <div style="margin-top:0.1px;" class="small-note">
                        Sesuai dengan Rekening Bank
                      </div>
                    </b-col>

                    <b-col col cols="12" md="8" class="register-form-input">
                      <b-form-input
                        v-model="payload.accountName"
                        type="text"
                        placeholder="Nama Lengkap*"
                        size="sm"
                        fluid
                      ></b-form-input>
                    </b-col>
                  </b-row>

                  <b-row class="register-form-row">
                    <b-col col cols="12" md="4" class="register-form-label"
                      >BANK</b-col
                    >

                    <b-col col cols="12" md="8" class="register-form-input">
                      <b-form-select
                        v-model="payload.bankCode"
                        label="name"
                        class="bg-white text-grey"
                        placeholder="Pilih Bank*"
                        block
                        required
                      >
                        <b-form-select-option :value="null"
                          >Pilih Bank*</b-form-select-option
                        >
                        <b-form-select-option
                          v-for="item in params.bankList"
                          :key="item.code"
                          :value="item.code"
                          >{{ item.name }}</b-form-select-option
                        >
                      </b-form-select>
                    </b-col>
                  </b-row>

                  <b-row class="register-form-row">
                    <b-col col cols="12" md="4" class="register-form-label"
                      >NOMOR REKENING BANK
                      <div style="margin-top:0.1px;" class="small-note">
                        Must be Valid for Deposit / Withdrawal
                      </div>
                    </b-col>

                    <b-col col cols="12" md="8" class="register-form-input">
                      <b-form-input
                        v-model="payload.accountNo"
                        type="number"
                        placeholder="Nomor Rekening Bank*"
                        size="sm"
                        fluid
                      ></b-form-input>
                    </b-col>
                  </b-row>

                  <b-row class="register-form-row">
                    <b-col col cols="12" md="4" class="register-form-label"
                      >NO. HANDPHONE/WA/LINE</b-col
                    >

                    <b-col col cols="12" md="8" class="register-form-input">
                      <b-form-input
                        v-model="payload.phone"
                        type="number"
                        placeholder="No. Handphone/WA/Line*"
                        size="sm"
                        fluid
                      ></b-form-input>
                    </b-col>
                  </b-row>

                  <b-row class="register-form-row">
                    <b-col col cols="12" md="4" class="register-form-label">
                      USERNAME
                    </b-col>

                    <b-col col cols="12" md="8" class="register-form-input">
                      <b-form-input
                        v-model="payload.username"
                        type="text"
                        placeholder="Username*"
                        @keypress="checkAlphaNumeric"
                        size="sm"
                        fluid
                      ></b-form-input>
                    </b-col>
                  </b-row>

                  <b-row class="register-form-row">
                    <b-col col cols="12" md="4" class="register-form-label">
                      EMAIL
                    </b-col>

                    <b-col col cols="12" md="8" class="register-form-input">
                      <b-form-input
                        v-model="payload.email"
                        type="email"
                        placeholder="Alamat Email*"
                        size="sm"
                        fluid
                      ></b-form-input>
                    </b-col>
                  </b-row>

                  <b-row class="register-form-row">
                    <b-col col cols="12" md="4" class="register-form-label">
                      PASSWORD
                    </b-col>

                    <b-col col cols="12" md="8" class="register-form-input">
                      <b-form-input
                        v-model="payload.password"
                        type="password"
                        placeholder="Setidaknya 6 Huruf / Angka untuk Kata Sandi*"
                        size="sm"
                        fluid
                      ></b-form-input>
                    </b-col>
                  </b-row>

                  <b-row class="register-form-row">
                    <b-col col cols="12" md="4" class="register-form-label"
                      >KONFIRMASI PASSWORD</b-col
                    >
                    <b-col col cols="12" md="8" class="register-form-input">
                      <b-form-input
                        v-model="payload.conPassword"
                        type="password"
                        placeholder="Masukkan kembali Password*"
                        size="sm"
                        fluid
                      ></b-form-input>
                    </b-col>
                  </b-row>

                  <b-row class="register-form-row-last">
                    <b-col col cols="12" md="4" class="register-form-label">
                      KODE REFERRAL
                      <div style="margin-top:0.1px;" class="small-note">
                        Opsional (jika Anda memilikinya)
                      </div>
                    </b-col>
                    <b-col col cols="12" md="8" class="register-form-input">
                      <b-form-input
                        type="text"
                        placeholder="Kode Referral"
                        size="sm"
                        fluid
                        disabled
                        :value="refCode"
                      ></b-form-input>
                    </b-col>
                  </b-row>

                  <b-row class="register-form-row">
                    <b-col
                      col
                      cols="12"
                      md="4"
                      class="register-form-label"
                    ></b-col>
                    <b-col
                      col
                      cols="12"
                      md="8"
                      class="register-form-input checkbox-col"
                    >
                      <b-form-checkbox
                        id="checkbox-1"
                        v-model="status"
                        name="checkbox-1"
                        value="1"
                        unchecked-value="0"
                        size="lg"
                      >
                        <div class="small-checkbox-text">
                          Dengan ini saya menyatakan telah dewasa berumur lebih
                          dari 18 tahun dan secara sadar membaca, mengerti, dan
                          menyetujui peraturan di website ini
                        </div>
                      </b-form-checkbox>
                    </b-col>
                  </b-row>

                  <b-row
                    class="register-form-row center text-center justify-content-center"
                    align-h="center"
                  >
                    <b-col
                      col
                      cols="12"
                      md="4"
                      class="register-form-label"
                    ></b-col>
                    <b-col col cols="12" md="8" class="register-form-input">
                      <b-button
                        type="submit"
                        class="submit-button"
                        :disabled="status == '0'"
                        >SUBMIT</b-button
                      >
                    </b-col>
                  </b-row>
                </b-container>
              </div>
            </div>
          </div>
        </b-form>
      </div>
    </div>
  </BaseLayout>
</template>
