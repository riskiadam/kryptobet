<script>
import Vue from "vue";
import { mapState } from "vuex";
import { FETCH_GAMES_MEMBER, TRANSFER } from "@/store/constants/actions.type";
export default {
  data() {
    return {
      payload: {
        source: "",
        target: "",
        amount: 0,
      },
      params: {
        gamesFrom: [],
        gamesTo: [],
      },

      listGames: [],
      from: {
        code: "",
        description: "",
      },
      to: {
        code: "",
        description: "",
      },
      isLoading: false,
      antidoubleclick: false,
    };
  },
  computed: {
    ...mapState({
      //currentUser: state => state.me.loggedInUser,
      walletList: (state) => state.wallet.walletList,
    }),
  },
  mounted() {
    // this.loadRules();
    // this.getGames();
  },
  methods: {
    /*setGames(){
      this.listGames = [];
      for(let i=0; i < this.walletList.length;i++){
        this.listGames.push({ code: this.walletList[i].code, text: this.walletList[i].code + ' ('+this.walletList[i].balance+')'  });
      }
    },*/
    getGames() {
      this.$store
        .dispatch(FETCH_GAMES_MEMBER)
        .then((data) => {
          this.listGames.push({ code: "Main", description: "Main" });
          for (let i = 0; i < data.data.length; i++) {
            this.listGames.push({
              code: data.data[i].code,
              description: data.data[i].description,
            });
          }
        })
        .catch((error) => {
          // this.$swal({
          //   title: "Kesalahan terjadi",
          //   text: error,
          //   icon: "error"
          // });
          this.$notify({
            group: "errorgames",
            title: "KESALAHAN TERJADI",
            text: error,
            type: "error",
            closeOnClick: true,
            max: 1,
            ignoreDuplicates: true,
          });
        })
        .finally(() => {
          //this.isGameLoading = false;
        });
    },
    clearForm() {
      this.payload.source = "";
      this.payload.target = "";
      this.payload.amount = 0;
    },
    submitTransfer() {
      this.isLoading = true;
      this.payload.source = this.from;
      this.payload.target = this.to;

      if (this.payload.amount != 0) {
        if (
          this.payload.source == this.payload.target &&
          this.payload.source != "" &&
          this.payload.target != ""
        ) {
          Vue.notify({
            group: "WarningMessage",
            title: "INFORMATION",
            text: "Tidak bisa transfer sesama game!",
            type: "warn",
            closeOnClick: true,
            max: 1,
            ignoreDuplicates: true,
          });
          // this.showMessage("Tidak bisa transfer sesama game", "error");
          this.isLoading = false;
          this.antidoubleclick = false;
          return false;
        }

        if (this.payload.source != "" && this.payload.target != "") {
          this.antidoubleclick = true;
          this.$store
            .dispatch(TRANSFER, this.payload)
            .then(() => {
              Vue.notify({
                group: "SuccessMessage",
                title: "Transfer berhasil",
                text: "Success",
                type: "success",
                closeOnClick: true,
                max: 1,
                ignoreDuplicates: true,
              });
              //this.showMessage("Transfer berhasil", "success");
              this.refreshSingleWallet(this.payload.source);
              this.refreshSingleWallet(this.payload.target);
              this.clearForm();
              this.$emit("refresh-list");
            })
            .catch((error) => {
              //console.log(error)
              Vue.notify({
                group: "ErrorMessage",
                title: "We Have a problem",
                text: error,
                type: "error",
                closeOnClick: true,
                max: 1,
                ignoreDuplicates: true,
              });
              // this.showMessage(error, "error");
            })
            .finally(() => {
              this.antidoubleclick = false;
              this.isLoading = false;
              this.antidoubleclick = false;
            });
        } else {
          this.antidoubleclick = true;
          Vue.notify({
            group: "WarningMessage",
            title: "INFORMATION",
            text: "Transfer dari/ke belum di pilih!",
            type: "warn",
            closeOnClick: true,
            max: 1,
            ignoreDuplicates: true,
          });
          // this.showMessage("Transfer dari/ke belum di pilih", "error");
          this.isLoading = false;
          this.antidoubleclick = false;
        }
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
        this.isLoading = false;
      }
    },
  },
};
</script>  

<template>
  <div>
    <b-container fluid>
      <b-row>
        <span style="font-size: 14px; font-weight: bold; margin-left: 20px"
          >Transfer</span
        >
      </b-row>
      <b-card
        class="mt-3"
        style="background-color: #d1d1d1; border-radius: 10px"
      >
        <b-row>
          <b-col cols="12" md="2" align-self="center">Transfer From</b-col>
          <b-col cols="12" md="10" align-self="center" class="mb-1">
            <b-form-select v-model="from" class="form-control">
              <b-form-select-option
                v-for="item in walletList"
                :key="item.code"
                :value="item.code"
                >{{
                  item.label === "SBOWin"
                    ? "SBOWin" + " (" + item.balance + ")"
                    : item.label + " (" + item.balance + ")"
                }}</b-form-select-option
              >
            </b-form-select>
          </b-col>
          <!--<b-col cols="2" md="2">
            <b-input class="form-control" :value="from.balance" disabled></b-input>
          </b-col>-->
        </b-row>
        <b-row class="mt-3">
          <b-col cols="12" md="2" align-self="center">Transfer To</b-col>
          <b-col cols="12" md="10" align-self="center" class="mb-1">
            <b-form-select v-model="to" class="form-control">
              <b-form-select-option
                v-for="item in walletList"
                :key="item.code"
                :value="item.code"
                >{{
                  item.label === "SBOWin"
                    ? "SBOWin" + " (" + item.balance + ")"
                    : item.label + " (" + item.balance + ")"
                }}</b-form-select-option
              >
            </b-form-select>
          </b-col>
          <!--<b-col cols="4" md="2">
            <b-input class="form-control" :value="to.balance" disabled></b-input>
          </b-col>-->
        </b-row>
        <b-row class="mt-3">
          <b-col cols="12" md="2" align-self="center">Credit Amount</b-col>
          <b-col cols="12" md="10" align-self="center" class="mb-1">
            <vue-numeric
              v-model="payload.amount"
              class="form-control"
              :precision="2"
            >
            </vue-numeric>
          </b-col>
        </b-row>
        <b-row class="mt-3" align-h="end">
          <b-col cols="12" md="2">
            <b-button
              :disabled="antidoubleclick"
              style="width: 100%"
              class="submit-button-2"
              @click.stop="submitTransfer()"
              >Submit</b-button
            >
          </b-col>
        </b-row>
      </b-card>
    </b-container>
  </div>
</template>