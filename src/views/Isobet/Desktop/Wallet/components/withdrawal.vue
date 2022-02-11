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
        cash: 0,
      },
      bankReceiver: {
        accountNo: "54231245",
        accountName: "Annie Gunawan",
        accountBank: "BRI",
      },
    };
  },
  computed: {
    creditAmount: {
      get() {
        return this.payload.cash / 1000;
      },
      set(val) {
        if (!val) {
          return 0;
        }
      },
    },
  },
  mounted() {
    // this.withdrawalPending
    this.bankReceiver.accountNo = this.currentUser.accountNo;
    this.bankReceiver.accountName = this.currentUser.accountName;
    this.bankReceiver.accountBank = this.currentUser.depositBankAccount;
  },
  methods: {
    withdraw() {
      this.changeLoader(true);
      if (this.creditAmount != 0) {
        let payload = {
          MethodType: "Member",
          ToBank: this.currentUser.depositBankAccount,
          ToAccountName: this.currentUser.accountName,
          ToAccountNo: this.currentUser.accountNo,
          Amount: this.creditAmount,
        };
        this.antidoubleclick = true;
        this.ApiService.post("trx/withdraw", payload)
          .then(() => {
            Vue.notify({
              group: "SuccessMessage",
              title: "Withdrawal Request Berhasil",
              text: "Success",
              type: "success",
              closeOnClick: true,
              max: 1,
              ignoreDuplicates: true,
            });
            this.$store.dispatch(GET_RECENT_TRANSACTION);
            this.refreshWallet();
            this.payload.cash = 0;
            this.$emit("refresh-list");
            this.changeLoader(false);
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
            this.changeLoader(false);
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
  },
};
</script>
    
<template>
  <div style="background-color: #fff; padding-top: 5px; border-radius: 10px">
    <b-container fluid style="padding: 0%; margin: 0%">
      <b-row>
        <span style="font-size: 14px; font-weight: bold; margin-left: 20px"
          >Withdrawal</span
        >
      </b-row>

      <b-card
        class="mt-3"
        style="background-color: #d1d1d1; border-radius: 10px"
      >
        <b-row class="mt-3">
          <b-col cols="12" md="2" align-self="center" style="font-weight: bold"
            >Bank</b-col
          >
          <b-col cols="12" md="4" align-self="center">
            <b-input
              :value="`${bankReceiver.accountBank}`"
              class="form-control"
              readonly
            ></b-input>
          </b-col>

          <b-col cols="12" md="2" align-self="center" style="font-weight: bold"
            >Bank Branch</b-col
          >
          <b-col cols="12" md="4" align-self="center">
            <b-input
              :value="`${bankReceiver.accountBank}`"
              class="form-control"
              readonly
            ></b-input>
          </b-col>
        </b-row>

        <b-row class="mt-3">
          <b-col cols="12" md="2" align-self="center" style="font-weight: bold"
            >Account Name</b-col
          >
          <b-col cols="12" md="4" align-self="center">
            <b-input
              :value="`${bankReceiver.accountName}`"
              class="form-control"
              readonly
            ></b-input>
          </b-col>

          <b-col cols="12" md="2" align-self="center" style="font-weight: bold"
            >Account Number</b-col
          >
          <b-col cols="12" md="4" align-self="center">
            <b-input
              :value="`${bankReceiver.accountNo}`"
              class="form-control"
              readonly
            ></b-input>
          </b-col>
        </b-row>

        <b-row class="mt-3">
          <b-col cols="12" md="2" align-self="center" style="font-weight: bold"
            >Cash Amount</b-col
          >
          <b-col cols="12" md="10" align-self="center">
            <vue-numeric
              v-model="payload.cash"
              class="form-control"
              :precision="0"
            >
            </vue-numeric>
          </b-col>

          <!-- <b-col cols="2" align-self="center">Destination Account</b-col>
          <b-col cols="3" align-self="center">
            <b-input
              :value="`${bankReceiver.accountBank} / ${bankReceiver.accountName} / ${bankReceiver.accountNo}`"
              class="form-control"
              readonly
            ></b-input>
          </b-col> -->
        </b-row>

        <b-row class="mt-3">
          <b-col cols="12" md="2" align-self="center" style="font-weight: bold"
            >Credit Amount</b-col
          >
          <b-col cols="12" md="10" align-self="center">
            <vue-numeric
              v-model="creditAmount"
              class="form-control"
              readonly
              :precision="0"
            ></vue-numeric>
          </b-col>
        </b-row>

        <b-row class="mt-3" align-h="end">
          <b-col cols="12" md="2">
            <b-button
              :disabled="antidoubleclick"
              style="width: 100%"
              class="submit-button-2"
              @click="withdraw"
            >
              Submit
            </b-button>
          </b-col>
        </b-row>
      </b-card>

      <b-row class="mt-2">
        <b-col style="color: black; font-size: 13px" cols="12" md="4">
          * Withdrawal value minimal :
          <span>{{ parseFloat(trxLimit.minwd).toLocaleString() }}</span>
        </b-col>
        <b-col style="color: black; font-size: 13px" cols="12" md="4">
          * Withdrawal denomination :
          <span>{{ parseFloat(trxLimit.denomwd).toLocaleString() }}</span>
        </b-col>
        <b-col style="color: black; font-size: 13px" cols="12" md="4">
          * Withdrawal value maximum :
          <span> {{ parseFloat(trxLimit.maxwd).toLocaleString() }} </span>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>