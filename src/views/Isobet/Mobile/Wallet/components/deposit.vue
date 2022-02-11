<script>
import Vue from "vue";
import { GET_RECENT_TRANSACTION } from "@/store/constants/actions.type";
export default {
  data() {
    return {
      sispayCollapse: false,
      transferCollapse: false,
      antidoubleclick: false,
      payload: {
        bankCode: "",
        amount: 0,
        credit: 0,
        emoneySourceAccount: "",
        emoneyCode: "",
      },
      bankSource: {
        accountNo: "54231245",
        accountName: "Annie Gunawan",
        accountBank: "BRI",
      },
      bankReceiver: {
        accountNo: "12412312",
        accountName: "Indra Hidayat",
        accountBank: "BCA",
      },
      bankList: [],
      currentTab: 0,
      emoneyList: [],
      emoneyDestinationAccount: {
        accountNo: "ID1021106965341",
        accountName: "PANORAMIC AQUA DESIGN",
        accountBank: "QRIS",
        percentage: 1,
      },
    };
  },
  computed: {
    creditAmount: {
      get() {
        let credit = (this.payload.amount * 0.99) / 1000;

        return credit;
      },

      set(val) {
        if (!val) {
          return 0;
        }
      },
    },
    creditAmount2: {
      get() {
        let credit = this.payload.amount / 1000;
        if (this.currentTab == 0 || this.currentTab == 1) {
          credit = Math.floor(
            ((this.payload.amount / 1000) *
              this.currentUser.depositBankAccountPercentage) /
              100
          );
        } else {
          credit = Math.floor(
            ((this.payload.amount / 1000) *
              this.emoneyDestinationAccount.percentage) /
              100
          );
        }
        return credit;
      },
      set(val) {
        if (!val) {
          return 0;
        }
      },
    },
  },

  mounted() {
    // this.loadRules();
    this.loadBank();
    this.payload.bankCode = this.currentUser.depositBankAccount;
  },
  methods: {
    loadBank() {
      this.changeLoader(true);
      this.ApiService.get("param/bank")
        .then((resp) => {
          //this.bankList = resp.data;
          let tmp = [];
          this.emoneyList = [];
          for (let i = 0; i < resp.data.length; i++) {
            if (resp.data[i].code == this.currentUser.bank.code) {
              tmp.push(resp.data[i]);
            }

            if (
              (resp.data[i].type == "PULSA" || resp.data[i].type == "EMONEY") &&
              resp.data[i].name !== "QRIS"
            ) {
              this.emoneyList.push(resp.data[i]);
            }
          }
          this.bankList = tmp;
          //console.log(this.bankList);
        })
        .finally(() => {
          this.changeLoader(false);
        });
    },

    loadBankAccount(bankCode) {
      //this.changeLoader(true);
      let payload = {
        BankCode: bankCode,
        BankAccountCode: this.emoneyDestinationAccount.code,
      };
      this.ApiService.post("param/bankaccountbybank", payload)
        .then((resp) => {
          let data = resp.data;
          this.emoneyDestinationAccount.code = data.code;
          this.emoneyDestinationAccount.accountName = data.accountName;
          this.emoneyDestinationAccount.accountNo = data.accountNo;
          this.emoneyDestinationAccount.accountBank = data.bank.name;
          this.emoneyDestinationAccount.percentage = data.percentage;
        })
        .finally(() => {
          //this.changeLoader(false);
        });
    },
    triggerSispay() {
      this.sispayCollapse = !this.sispayCollapse;
    },
    triggerTransfer() {
      this.transferCollapse = !this.transferCollapse;
    },
    depositTransfer() {
      this.changeLoader(true);
      if (this.creditAmount != 0) {
        this.antidoubleclick = true;
        let payload = {
          MethodType: "Member",
          ToBank: this.currentUser.depositBankAccount,
          ToAccountName: this.currentUser.depositBankAccountName,
          ToAccountNo: this.currentUser.depositBankAccountNo,
          Amount: this.creditAmount2,
        };
        this.antidoubleclick = true;
        this.ApiService.post("trx/deposit", payload)
          .then(() => {
            Vue.notify({
              group: "SuccessMessage",
              title: "Deposit Berhasil",
              text: "Success",
              type: "success",
              closeOnClick: true,
              max: 1,
              ignoreDuplicates: true,
            });
            this.$store.dispatch(GET_RECENT_TRANSACTION);
            this.refreshWallet();
            this.payload.amount = 0;
            this.$emit("refresh-list");
          })
          .catch((error) => {
            Vue.notify({
              group: "ErrorMessage",
              title: "We Have a problem",
              text: error,
              type: "error",
              closeOnClick: true,
              max: 1,
              ignoreDuplicates: true,
            });
          })
          .finally(() => {
            this.antidoubleclick = false;
            this.changeLoader(false);
            this.antidoubleclick = false;
          });
      } else {
        Vue.notify({
          group: "WarningMessage",
          title: "INFORMATION",
          text: "Amount tidak boleh 0!",
          type: "warn",
          closeOnClick: true,
          max: 1,
          ignoreDuplicates: true,
        });
        this.antidoubleclick = false;
        this.changeLoader(false);
      }
    },
    depoEmoney() {
      this.changeLoader(true);
      this.antidoubleclick = true;

      if (this.creditAmount2 != 0) {
        let payload = {
          MethodType: "Member",
          ToBank: this.emoneyDestinationAccount.code,
          ToAccountName: this.emoneyDestinationAccount.accountName,
          ToAccountNo: this.emoneyDestinationAccount.accountNo,
          FromBank: this.payload.emoneyCode,
          FromAccountNo: this.payload.emoneySourceAccount,
          Amount: this.payload.amount,
          CreditAmount: this.creditAmount2,
        };
        this.antidoubleclick = true;
        this.ApiService.post("trx/deposit/emoney", payload)
          .then(() => {
            Vue.notify({
              group: "SuccessMessage",
              title: "Deposit Berhasil",
              text: "Success",
              type: "success",
              closeOnClick: true,
              max: 1,
              ignoreDuplicates: true,
            });
            this.$store.dispatch(GET_RECENT_TRANSACTION);
            this.refreshWallet();
            this.payload.amount = 0;
            this.$emit("refresh-list");
          })
          .catch((error) => {
            Vue.notify({
              group: "ErrorMessage",
              title: "We Have a problem",
              text: error,
              type: "error",
              closeOnClick: true,
              max: 1,
              ignoreDuplicates: true,
            });
          })
          .finally(() => {
            this.antidoubleclick = false;
            this.changeLoader(false);
          });
      } else {
        Vue.notify({
          group: "WarningMessage",
          title: "INFORMATION",
          text: "Amount tidak boleh 0!",
          type: "warn",
          closeOnClick: true,
          max: 1,
          ignoreDuplicates: true,
        });
        this.antidoubleclick = false;
        this.changeLoader(false);
      }
    },
    depoQris() {
      this.changeLoader(true);
      this.antidoubleclick = true;

      if (this.creditAmount != 0) {
        let payload = {
          MethodType: "Member",
          ToBank: "d806a639-45e4-466e-aed1-d9d45dfd8947",
          ToAccountName: "PANORAMIC AQUA DESIGN",
          ToAccountNo: "ID1021106965341",
          FromBank: "7e95fd55-fcac-474c-9f75-1959c2c7e312",
          FromAccountNo: this.payload.emoneySourceAccount,
          Amount: this.payload.amount,
          CreditAmount: this.creditAmount,
        };
        this.antidoubleclick = true;
        this.ApiService.post("trx/deposit/emoney", payload)
          .then(() => {
            Vue.notify({
              group: "SuccessMessage",
              title: "Deposit Berhasil",
              text: "Success",
              type: "success",
              closeOnClick: true,
              max: 1,
              ignoreDuplicates: true,
            });
            this.$store.dispatch(GET_RECENT_TRANSACTION);
            this.refreshWallet();
            this.payload.amount = 0;
            this.$emit("refresh-list");
          })
          .catch((error) => {
            Vue.notify({
              group: "ErrorMessage",
              title: "We Have a problem",
              text: error,
              type: "error",
              closeOnClick: true,
              max: 1,
              ignoreDuplicates: true,
            });
          })
          .finally(() => {
            this.antidoubleclick = false;
            this.changeLoader(false);
          });
      } else {
        Vue.notify({
          group: "WarningMessage",
          title: "INFORMATION",
          text: "Amount tidak boleh 0!",
          type: "warn",
          closeOnClick: true,
          max: 1,
          ignoreDuplicates: true,
        });
        this.antidoubleclick = false;
        this.changeLoader(false);
      }
    },
    depoSispay() {
      this.changeLoader(true);
      this.antidoubleclick = true;
      if (this.creditAmount != 0) {
        this.antidoubleclick = true;
        let payload = {
          Amount: this.creditAmount,
          ToBank: this.payload.bankCode,
        };
        this.ApiService.post("trx/deposit/sispay", payload)
          .then((resp) => {
            window.open(resp.data, "_self");
            this.$emit("refresh-list");
            //return false;
            // let param =
            //   '{"code":"openbrowser","url":"' + resp.data + '&Platform=app"}';
            // window.postMessage(param, "*");

            // this.$emit("refresh-list");
            // this.$router.push({ name: "Wallet" });
            // return false;
          })
          .catch((error) => {
            Vue.notify({
              group: "ErrorMessage",
              title: "We Have a problem",
              text: error,
              type: "error",
              closeOnClick: true,
              max: 1,
              ignoreDuplicates: true,
            });
            this.antidoubleclick = false;
          })
          .finally(() => {
            this.antidoubleclick = false;
            this.changeLoader(false);
            this.antidoubleclick = false;
          });
      } else {
        Vue.notify({
          group: "WarningMessage",
          title: "INFORMATION",
          text: "Amount tidak boleh 0!",
          type: "warn",
          closeOnClick: true,
          max: 1,
          ignoreDuplicates: true,
        });
        this.antidoubleclick = false;
        this.changeLoader(false);
      }
    },
    changeTab(idx) {
      this.currentTab = idx;
    },
  },
  watch: {
    "payload.emoneyCode": function (val) {
      this.emoneyDestinationAccount.code = null;
      this.loadBankAccount(val);
    },
  },
};
</script>

<template>
  <!-- STRUKTUR TAB DEPOSIT -->
  <div>
    <b-container fluid>
      <b-row>
        <span class="title-deposit">Deposit</span>
      </b-row>

      <b-row>
        <b-col cols="12" md="2">
          <b-row>
            <b-col cols="4" md="12" class="col-no-padding">
              <div
                style="border: 0px solid #041734; height: 72px"
                class="col-type"
                v-bind:class="{ 'col-type-active': currentTab == 0 }"
                v-on:click="changeTab(0)"
              >
                <div class="btn-sispay">Bank</div>
              </div>
            </b-col>
            <!-- <b-col cols="4" md="12" class="col-no-padding">
              <div
                style="border: 0px solid #041734; height: 72px"
                class="col-type"
                v-bind:class="{ 'col-type-active': currentTab == 1 }"
                v-on:click="changeTab(1)"
              >
                <div class="btn-sispay">Sispay</div>
              </div>
            </b-col> -->
            <b-col cols="4" md="12" class="col-no-padding">
              <div
                style="border: 0px solid #041734"
                class="col-type"
                v-bind:class="{ 'col-type-active': currentTab == 2 }"
                v-on:click="changeTab(2)"
              >
                <div class="btn-sispay">Pulsa / eMoney</div>
              </div>
            </b-col>
            <b-col cols="4" md="12" class="col-no-padding">
              <div
                style="border: 0px solid #041734; height: 72px"
                class="col-type"
                v-bind:class="{ 'col-type-active': currentTab == 3 }"
                v-on:click="changeTab(3)"
              >
                <div class="btn-sispay">QRIS</div>
              </div>
            </b-col>
          </b-row>
        </b-col>
        <b-col cols="12" md="10" class="col-no-padding">
          <div class="tab-deposit-container" style="background-color: #d1d1d1">
            <!-- SISPAY -->
            <!-- <div
              style="background-color: #f2f2f2"
              class="tab-deposit-content"
              v-if="currentTab == 1"
            >
              <b-row>
                <b-col
                  cols="12"
                  md="12"
                  style="
                    font-size: 16px;
                    font-weight: bold;
                    text-align: center;
                    padding-bottom: 10px;
                  "
                  >Sispay</b-col
                >
              </b-row>
              <b-row>
                <b-col cols="12" md="3" align-self="left">Bank</b-col>
                <b-col cols="12" md="9" align-self="center">
                  <v-select
                    v-model="payload.bankCode"
                    :options="bankList"
                    :reduce="(x) => x.name"
                    label="name"
                    class="bg-white text-grey"
                    placeholder="Bank *"
                    block
                  ></v-select>
                </b-col>
              </b-row>
              <b-row class="mt-3">
                <b-col cols="12" md="3" align-self="left">Cash Amount</b-col>
                <b-col cols="12" md="9" align-self="center">
                  <vue-numeric
                    v-model="payload.amount"
                    class="form-control"
                    :precision="0"
                  ></vue-numeric>
                </b-col>
              </b-row>
              <b-row class="mt-3">
                <b-col cols="12" md="3" align-self="left">Credit Amount</b-col>
                <b-col cols="12" md="9" align-self="center">
                  <vue-numeric
                    v-model="creditAmount"
                    class="form-control"
                    readonly
                    :precision="0"
                  ></vue-numeric>
                </b-col>
              </b-row>
              <b-row class="mt-3" align-h="end">
                <b-col cols="12" md="3" class="col-submit-depo">
                  <b-button
                    :disabled="antidoubleclick"
                    style="width: 100%"
                    class="submit-button-2"
                    @click="depoSispay"
                  >
                    Submit
                  </b-button>
                </b-col>
              </b-row>
            </div> -->
            <!-- BANK -->
            <div
              style="background-color: #f2f2f2"
              class="tab-deposit-content"
              v-if="currentTab == 0"
            >
              <b-row>
                <b-col
                  cols="12"
                  md="12"
                  style="
                    font-size: 16px;
                    font-weight: bold;
                    text-align: center;
                    padding-bottom: 10px;
                  "
                  >Manual Transfer</b-col
                >
              </b-row>
              <b-row>
                <b-col
                  cols="12"
                  md="2"
                  align-self="left"
                  style="padding-top: 4px"
                  >Bank</b-col
                >
                <b-col cols="12" md="10" align-self="center">
                  <v-select
                    v-model="payload.bankCode"
                    :options="bankList"
                    :reduce="(x) => x.code"
                    label="name"
                    class="bg-white text-grey"
                    placeholder="Bank *"
                    block
                  ></v-select>
                </b-col>
              </b-row>
              <b-row class="mt-3">
                <b-col cols="12" md="6" class="form-cont-col">
                  <b-row>
                    <b-col cols="12" style="text-align: left"
                      >Cash Amount</b-col
                    >
                    <b-col cols="12">
                      <vue-numeric
                        v-model="payload.amount"
                        class="form-control"
                        :precision="0"
                      ></vue-numeric>
                    </b-col>
                  </b-row>
                </b-col>
                <b-col cols="12" md="6" class="form-cont-col">
                  <b-row>
                    <b-col
                      cols="12"
                      style="text-align: left"
                      class="margin-form-cont"
                      >Source Account</b-col
                    >
                    <b-col cols="12">
                      <b-textarea
                        :value="`${currentUser.bank.name} / ${currentUser.accountName} / ${currentUser.accountNo}`"
                        class="form-control-2"
                        readonly
                      ></b-textarea>
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
              <b-row class="mt-3">
                <b-col cols="12" md="6" class="form-cont-col">
                  <b-col cols="12" style="text-align: left"
                    >Credit Amount</b-col
                  >
                  <b-col cols="12">
                    <vue-numeric
                      v-model="creditAmount"
                      class="form-control"
                      :recision="0"
                      readonly
                    ></vue-numeric>
                  </b-col>
                </b-col>
                <b-col cols="12" md="6" class="form-cont-col">
                  <b-col
                    cols="12"
                    style="text-align: left"
                    class="margin-form-cont"
                    >Destination Account</b-col
                  >
                  <b-col cols="12">
                    <b-textarea
                      :value="`${currentUser.depositBankAccount} / ${currentUser.depositBankAccountName} / ${currentUser.depositBankAccountNo}`"
                      class="form-control-2"
                      readonly
                    ></b-textarea>
                  </b-col>
                </b-col>
              </b-row>

              <b-row class="col-submit-depo-3">
                <b-col
                  cols="12"
                  md="12"
                  style="text-align: left; padding: 0px; margin: 0px"
                >
                  <span style="font-weight: bold">Note : </span>
                </b-col>
                <b-col
                  cols="12"
                  md="12"
                  style="
                    text-align: left;
                    font-style: italic;
                    padding: 0px;
                    margin: 0px;
                  "
                >
                  <span style="text-align: justify; width: 100%; padding: 0px"
                    >Harap Transfer Uang terlebih dahulu, setelah itu baru
                    membuat Form Deposit, dan bila Uang tidak sesuai dengan
                    Rekening yang sudah di daftarkan, maka di anggap
                    Hangus.</span
                  >
                </b-col>
              </b-row>

              <b-row class="mt-3" align-h="end">
                <b-col cols="12" md="3" class="col-submit-depo-2">
                  <a @click="depositTransfer">
                    <b-button
                      :disabled="antidoubleclick"
                      style="width: 100%"
                      class="submit-button-2"
                    >
                      Submit
                    </b-button>
                  </a>
                </b-col>
              </b-row>
            </div>
            <!-- E-MONEY -->
            <div
              style="background-color: #f2f2f2"
              class="tab-deposit-content"
              v-if="currentTab == 2"
            >
              <b-row>
                <b-col
                  cols="12"
                  md="12"
                  style="
                    font-size: 16px;
                    font-weight: bold;
                    text-align: center;
                    padding-bottom: 10px;
                  "
                  >Pulsa / E-Money Transfer</b-col
                >
              </b-row>
              <b-row>
                <b-col
                  cols="12"
                  md="2"
                  align-self="left"
                  style="padding-top: 4px"
                  >Pulsa / E-Money</b-col
                >
                <b-col cols="12" md="10" align-self="center">
                  <v-select
                    v-model="payload.emoneyCode"
                    :options="emoneyList"
                    :reduce="(x) => x.code"
                    label="name"
                    class="bg-white text-grey"
                    placeholder="Pulsa / E-Money *"
                    block
                  ></v-select>
                </b-col>
              </b-row>
              <b-row class="mt-3">
                <b-col cols="12" md="6" class="form-cont-col">
                  <b-row>
                    <b-col cols="12" style="text-align: left"
                      >Cash Amount</b-col
                    >
                    <b-col cols="12">
                      <vue-numeric
                        v-model="payload.amount"
                        class="form-control"
                        :precision="0"
                      ></vue-numeric>
                    </b-col>
                  </b-row>
                </b-col>
                <b-col cols="12" md="6" class="form-cont-col">
                  <b-row>
                    <b-col
                      cols="12"
                      style="text-align: left"
                      class="margin-form-cont"
                      >Nama Account(Emoney)/No Referensi(Pulsa)</b-col
                    >
                    <b-col cols="12">
                      <b-input
                        type="text"
                        class="form-control"
                        v-model="payload.emoneySourceAccount"
                      ></b-input>
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
              <b-row class="mt-3">
                <b-col cols="12" md="6" class="form-cont-col">
                  <b-col cols="12" style="text-align: left"
                    >Credit Amount</b-col
                  >
                  <b-col cols="12">
                    <vue-numeric
                      v-model="creditAmount2"
                      class="form-control"
                      :recision="0"
                      readonly
                    ></vue-numeric>
                  </b-col>
                </b-col>
                <b-col cols="12" md="6" class="form-cont-col">
                  <b-col
                    cols="12"
                    style="text-align: left"
                    class="margin-form-cont"
                    >Nama Account(Emoney)/No Referensi(Pulsa) Tujuan</b-col
                  >
                  <b-col cols="12">
                    <b-textarea
                      :value="
                        emoneyDestinationAccount.code == null
                          ? ``
                          : `${emoneyDestinationAccount.accountNo}`
                      "
                      class="form-control-2"
                      readonly
                    ></b-textarea>
                  </b-col>
                </b-col>
              </b-row>

              <b-row class="col-submit-depo-3">
                <b-col
                  cols="12"
                  md="12"
                  style="text-align: left; padding: 0px; margin: 0px"
                >
                  <span style="font-weight: bold">Note : </span>
                </b-col>
                <b-col
                  cols="12"
                  md="12"
                  style="
                    text-align: left;
                    font-style: italic;
                    padding: 0px;
                    margin: 0px;
                  "
                >
                  <span style="text-align: justify; width: 100%; padding: 0px"
                    >Harap Transfer Uang terlebih dahulu, setelah itu baru
                    membuat Form Deposit, dan bila Uang tidak sesuai dengan
                    Rekening yang sudah di daftarkan, maka di anggap
                    Hangus.</span
                  >
                </b-col>
              </b-row>

              <b-row class="mt-3" align-h="end">
                <b-col cols="12" md="3" class="col-submit-depo-2">
                  <a @click="depoEmoney">
                    <b-button
                      :disabled="antidoubleclick"
                      style="width: 100%"
                      class="submit-button-2"
                    >
                      Submit
                    </b-button>
                  </a>
                </b-col>
              </b-row>
            </div>
            <!-- Q-ris -->
            <div
              style="background-color: #f2f2f2"
              class="tab-deposit-content"
              v-if="currentTab == 3"
            >
              <b-row>
                <b-col
                  cols="12"
                  md="12"
                  style="
                    font-size: 16px;
                    font-weight: bold;
                    text-align: center;
                    padding-bottom: 10px;
                  "
                  >QRIS</b-col
                >
              </b-row>
              <b-row>
                <b-img
                  style="
                    width: 100%;
                    border-bottom: 0px solid white;
                    padding: 0% 10%;
                  "
                  class="center align-center max-width"
                  :src="require('@/assets/images/banner/Qris.jpg')"
                />
              </b-row>

              <b-row class="mt-3">
                <b-col cols="12" md="6" class="form-cont-col">
                  <b-row>
                    <b-col cols="12" style="text-align: left"
                      >Cash Amount</b-col
                    >
                    <b-col cols="12">
                      <vue-numeric
                        v-model="payload.amount"
                        class="form-control"
                        :precision="0"
                      ></vue-numeric>
                    </b-col>
                  </b-row>
                </b-col>
                <b-col cols="12" md="6" class="form-cont-col">
                  <b-row>
                    <b-col
                      cols="12"
                      style="text-align: left"
                      class="margin-form-cont"
                      >Nama Account(Emoney)/No Referensi(Pulsa)</b-col
                    >
                    <b-col cols="12">
                      <b-input
                        type="text"
                        class="form-control"
                        v-model="payload.emoneySourceAccount"
                      ></b-input>
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>

              <b-row class="mt-3">
                <b-col cols="12" md="6" class="form-cont-col">
                  <b-col cols="12" style="text-align: left"
                    >Credit Amount</b-col
                  >
                  <b-col cols="12">
                    <vue-numeric
                      v-model="creditAmount"
                      class="form-control"
                      :precision="2"
                      readonly
                    ></vue-numeric>
                  </b-col>
                </b-col>

                <b-col cols="12" md="6" class="form-cont-col">
                  <b-col
                    cols="12"
                    style="text-align: left"
                    class="margin-form-cont"
                    >Nama Account(Emoney) Tujuan</b-col
                  >
                  <b-col cols="12">
                    <b-textarea
                      v-model="emoneyDestinationAccount.accountName"
                      :options="emoneyList"
                      :reduce="(x) => x.code"
                      class="form-control-2"
                      readonly
                    ></b-textarea>
                  </b-col>
                </b-col>
              </b-row>

              <b-row class="col-submit-depo-3">
                <b-col
                  cols="12"
                  md="12"
                  style="text-align: left; padding: 0px; margin: 0px"
                >
                  <span style="font-weight: bold">Note : </span>
                </b-col>
                <b-col
                  cols="12"
                  md="12"
                  style="
                    text-align: left;
                    font-style: italic;
                    padding: 0px;
                    margin: 0px;
                  "
                >
                  <span style="text-align: justify; width: 100%; padding: 0px"
                    >Harap Transfer Uang terlebih dahulu, setelah itu baru
                    membuat Form Deposit, dan bila jumlah Uang tidak sama dengan
                    jumlah yang ditransfer dan no Rekening tidak sesuai dengan
                    yang sudah di daftarkan, maka di anggap Hangus.</span
                  >
                </b-col>
              </b-row>

              <b-row class="mt-3" align-h="end">
                <b-col cols="12" md="3" class="col-submit-depo-2">
                  <a @click="depoQris">
                    <b-button
                      :disabled="antidoubleclick"
                      style="width: 100%"
                      class="submit-button-2"
                    >
                      Submit
                    </b-button>
                  </a>
                </b-col>
              </b-row>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
    <b-row style="margin-top: 10px">
      <b-col style="color: black; font-size: 13px" cols="12" md="4">
        * Deposit value minimal :
        <!-- <span >{{ trxLimit.mindp | decimal }}</span> -->
        <span>{{ parseFloat(trxLimit.mindp).toLocaleString() }}</span>
      </b-col>
      <b-col style="color: black; font-size: 13px" cols="12" md="4">
        * Deposit denomination :
        <!-- <span >{{ trxLimit.denomdp | decimal }}</span> -->
        <span>{{ parseFloat(trxLimit.denomdp).toLocaleString() }}</span>
      </b-col>
      <b-col style="color: black; font-size: 13px" cols="12" md="4">
        * Deposit value maximum :
        <!-- <span style="color:black; font-size: 13px;" cols="4">{{ trxLimit.maxdp | decimal }}</span> -->
        <span style="color: black; font-size: 13px" cols="4">{{
          parseFloat(trxLimit.maxdp).toLocaleString()
        }}</span>
      </b-col>
    </b-row>
  </div>
</template>
