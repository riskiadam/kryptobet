import {GET_PROFILE, FETCH_MAIN_WALLET, LOGOUT, GET_RECENT_TRANSACTION, GET_RECENT_DEPOSIT,GET_RECENT_WITHDRAW,GET_RECENT_TRANSFER} from "@/store/constants/actions.type";
import {SET_PROFILE, SET_WALLET, SET_RECENT_TRANSACTION} from "@/store/constants/mutations.type";
// import router from "@/router";
import ApiService from "@/services/api.service";

export default {
  [GET_PROFILE](context) {
    return new Promise((resolve, reject) => {
      return ApiService.get("me")
        .then(resp => {
          context.commit(SET_PROFILE, resp.data);
          resolve();
        })
        .catch(error => {
          if (error == "Account Blacklisted.") context.dispatch(LOGOUT);
          reject(error);
        });
    });
  },
  [FETCH_MAIN_WALLET](context) {
    return new Promise((resolve, reject) => {
      context.commit(SET_WALLET, []);
      return ApiService.get("me/credit")
        .then(resp => {
          context.commit(SET_WALLET, resp.data);
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  [GET_RECENT_TRANSACTION](context) {
    return new Promise(resolve => {
      return ApiService.get("/me/trx/recent").then(resp => {
        context.commit(SET_RECENT_TRANSACTION, resp.data);
        resolve(resp);
      });
    });
  },
  [GET_RECENT_DEPOSIT]() {
    return new Promise(resolve => {
      return ApiService.get("/report/recent/deposit").then(resp => {
        resolve(resp);
      });
    });
  },
  [GET_RECENT_WITHDRAW]() {
    return new Promise(resolve => {
      return ApiService.get("/report/recent/withdrawal").then(resp => {
        resolve(resp);
      });
    });
  },
  [GET_RECENT_TRANSFER]() {
    return new Promise(resolve => {
      return ApiService.get("/report/recent/transfer").then(resp => {
        resolve(resp);
      });
    });
  },
};