import Vue from "vue";
import apiService from "@/services/api.service";
import {CHANGE_LOADER, REFRESH_WALLET,GET_CREDIT } from "@/store/constants/actions.type";
import {mapState, mapGetters} from "vuex";

Vue.mixin({
  data: () => {
    return {
      ApiService: apiService,
      popUpShow: false,
      pageListOptions: [10, 25, 50, 100],
      get defaultFromDate() {
        let hour = Vue.moment().get("h");
        if (hour >= 12) {
          return Vue.moment()
            .startOf("day")
            .add(12, "h")
            .format("YYYY-MM-DDTHH:mm:ss");
        } else {
          return Vue.moment()
            .startOf("day")
            .add(-12, "h")
            .format("YYYY-MM-DDTHH:mm:ss");
        }
      },
      get defaultToDate() {
        let hour = Vue.moment().get("h");
        if (hour >= 12) {
          return Vue.moment()
            .startOf("day")
            .add(36, "h")
            .add(-1, "m")
            .format("YYYY-MM-DDTHH:mm:ss");
        } else {
          return Vue.moment()
            .startOf("day")
            .add(12, "h")
            .add(-1, "m")
            .format("YYYY-MM-DDTHH:mm:ss");
        }
      }
    };
  },
  computed: {
    ...mapState({
      isLoading: (x) => x.isLoading,
      currentUser: (x) => x.me.loggedInUser,
      recentList: (x) => x.me.recentTransaction,
      trxLimit: (x) => x.trx
    }),
    ...mapGetters([
      "isAuthenticated",
      "mainWallet"
    ]),
  },
  methods: {
    changeLoader(value) {
      this.$store.dispatch(CHANGE_LOADER, value);
    },
    checkNull(val) {
      if (val) {
        return val;
      } else {
        return "";
      }
    },
    showConfirm(message, type, callbackFc) {
      if (type === "confirm") {
        this.$swal({
          title: "Confirmation",
          text: message,
          type: "question",
          showCancelButton: true
        })
        .then((resp) => {
          if (resp.value) {
            callbackFc();
          }
        });
      } else if (type === "textConfirm") {
        this.$swal({
          title: `${message}
           Please type CONFIRM to continue your actions`,
          input: "text",
          type: "info",
          showCancelButton: true
        }).then((resp) => {
          if (resp.value === "CONFIRM") {
            callbackFc();
          } else if (resp.value && resp.value !== "CONFIRM") {
            this.$swal({
              title: "Text Confirmation",
              text: "To Continue, you need to type CONFIRM",
              type: "error"
            });
          }
        });
      }
    },
    removeItemFromList(list, keyProp, valueProp) {
      let itemIndex = list.findIndex((x) => x[keyProp] == valueProp);
      if (itemIndex != -1) list.splice(itemIndex, 1);
      return list;
    },
    refreshWallet() {
      this.$store.dispatch(REFRESH_WALLET).catch(error => {
        Vue.notify({
          group: 'ErrorMessage',
          title: 'We Have a problem',
          text: error,
          type : 'error',
          closeOnClick : true,
          max : 1,
          ignoreDuplicates : true
        });
      });
    },
    showMessage(message, type) {
      let title;
      switch (type) {
        case "success":
          title = "Success";
          break;
        case "error":
          title = "We Have a problem";
          break;
        case "info":
          title = "Information";
          break;
        default:
          title = "...";
          break;
      }

      this.$swal({
        title: title,
        text: message,
        icon: type,
        position: "top-end",
        timer: 3000,
        showConfirmButton: false,
        toast: true,
        timerProgressBar: true
      });
    },
    getUTCDate(value) {
      return Vue.moment(value)
        .utc()
        .format("YYYY-MM-DD HH:mm");
    },
    getDate(value) {
      return Vue.moment(value)
        .utc()
        .format("YYYY-MM-DD");
    },
    sum(items, prop) {
      return items.reduce(function(a, b) {
        return a + b[prop];
      }, 0);
    },
    setPopup(value) {
      this.popUpShow = value;
    },
    refreshSingleWallet(code) {
      this.$store.dispatch(GET_CREDIT, code).catch(error => {
        Vue.notify({
          group: 'ErrorMessage',
          title: 'We Have a problem',
          text: error,
          type : 'error',
          closeOnClick : true,
          max : 1,
          ignoreDuplicates : true
        });
      });
    }
  }
});