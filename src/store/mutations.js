import {SET_LOADER, SET_CONFIGURATION, SET_POPUP} from "@/store/constants/mutations.type";

export default {
  [SET_LOADER](state, payload) {
    state.isLoading = payload;
  },
  [SET_CONFIGURATION](state, data) {
    state.trx.mindp = data.find(x => x.code == "MINDP").content;
    state.trx.denomdp = data.find(x => x.code == "DENOMDP").content;
    state.trx.maxdp = data.find(x => x.code == "MAXDP").content;
    state.trx.minwd = data.find(x => x.code == "MINWD").content;
    state.trx.denomwd = data.find(x => x.code == "DENOMWD").content;
    state.trx.maxwd = data.find(x => x.code == "MAXWD").content;
    state.trx.denomdp = data.find(x => x.code == "DENOMDP").content;
    state.trx.denomwd = data.find(x => x.code == "DENOMWD").content;
  },
  [SET_POPUP](state, data) {
    state.popUp = data;
  },
};