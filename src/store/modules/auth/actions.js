import {LOGIN, LOGOUT, GET_PROFILE, REFRESH_WALLET, FORGOT_PASSWORD} from "@/store/constants/actions.type";
import {SET_AUTH, SET_PROFILE} from "@/store/constants/mutations.type";
import router from "@/router";
import ApiService from "@/services/api.service";

export default {
  [LOGIN](context, {username, password}) {
    return new Promise((resolve, reject) => {
      return ApiService.login(username, password)
        .then((data) => {
          context.commit(SET_AUTH, data);
          context.dispatch(GET_PROFILE);
          context.dispatch(REFRESH_WALLET);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  [LOGOUT](context) {
    return new Promise((resolve) => {
      context.commit(SET_AUTH);
      context.commit(SET_PROFILE, null);
      if (router.app.$route.name !== "home") router.push({name: "home"});
      resolve();
    });
  },
  [FORGOT_PASSWORD](context, { phone }) {
    return new Promise((resolve, reject) => {
      return ApiService.post("forgotpassword", { phone }).then((resp) => {
        resolve(resp);
      }).catch((error)=>{
        reject(error);
      });
    });
  }
};