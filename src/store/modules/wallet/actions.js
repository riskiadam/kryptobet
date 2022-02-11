import Service from "@/services/api.service";
import {
  TRANSFER,
  CASHOUT,
  REFRESH_WALLET,
  GET_CREDIT,
  REFRESH_MAIN
} from "@/store/constants/actions.type";

import {
  SET_WALLET,
  CLEAR_WALLET,
  SET_WALLET_LOADER
} from "@/store/constants/mutations.type";

export default {
  [TRANSFER](context, payload) {
    return new Promise((resolve, reject) => {
      return Service.post("wallet/transfer", payload)
        .then(resp => {
          resolve(resp);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  [GET_CREDIT]({ commit }, gamesCode) {
    commit(SET_WALLET_LOADER, gamesCode);
    return new Promise(resolve => {

      if (gamesCode) {
        Service.get("games/" + gamesCode + "/balance")
          .then(resp => {
            let tmp = { code: gamesCode, balance: resp.data.balance, label: gamesCode }
            //let tmp = { code: "Main", balance: resp.data }
            commit(SET_WALLET, tmp);
            resolve();
          })
          .finally(() => {
            commit(SET_WALLET_LOADER, gamesCode);
          });
      }
      Service.get("me/credit")
        .then(resp => {
          let tmp = { code: "Main", balance: resp.data.balance, label: 'Saldo Utama' }
          //let tmp = { code: "Main", balance: resp.data }
          commit(SET_WALLET, tmp);
          resolve();
        })
        .finally(() => {
          commit(SET_WALLET_LOADER, gamesCode);
        });

    });
  },
  [REFRESH_WALLET]({ commit, dispatch, getters }) {

    commit(CLEAR_WALLET);
    dispatch(GET_CREDIT, "Main");

    getters.gameList.forEach(x => {
      dispatch(GET_CREDIT, x.code);
    });
  },
  [CASHOUT]() {
    return new Promise(resolve => {
      return Service.post("wallet/cashout").then(resolve());
    });
  },
  [REFRESH_MAIN]({ commit }) {
    return new Promise((resolve, reject) => {
      return Service.get("me/credit")  //me/credit
        .then(resp => {
          let tmp = { code: "Main", balance: resp.data.balance, label: 'Saldo Utama' }
          commit(SET_WALLET, tmp);
          resolve(true);
        })
        .catch(error => {
          reject(error);
        })
    });
  }
};