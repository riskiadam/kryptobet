import {
  SET_PROFILE,
  SET_RECENT_TRANSACTION
} from "@/store/constants/mutations.type";

export default {
  [SET_PROFILE](state, data) {
    state.loggedInUser = data;
  },
  [SET_RECENT_TRANSACTION](state, data) {
    state.recentTransaction = data;
  }
};