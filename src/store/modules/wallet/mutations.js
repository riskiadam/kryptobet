import {
  SET_WALLET,
  CLEAR_WALLET,
  SET_WALLET_LOADER
} from "@/store/constants/mutations.type";

// import gameState from "@/store/modules/games/state";

export default {
  [SET_WALLET_LOADER](state, code) {
    let record = state.walletList.find(x => x.code == code);
    if (record) {
      record.isLoading = !record.isLoading;
    }
  },
  [SET_WALLET](state, data) {
    let record = state.walletList.find(x => x.code == data.code);
    if (record) {
      Object.assign(record, data);
    } else {
      //data.isLoading = true;
      state.walletList.push(data);
    }
    //DECIDE GAMES STATUS
    // let gameRec = gameState.categoryList
    //   .flatMap(x => x.games)
    //   .find(x => x.code == data.code);
    // if (gameRec) gameRec.hasError = data.hasError;
  },
  [CLEAR_WALLET](state) {
    state.walletList.forEach(x => {
      x.balance = 0;
    });
  }
};