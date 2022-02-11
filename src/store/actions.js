import { CHANGE_LOADER, GET_CONFIGURATION, GET_POPUP } from "@/store/constants/actions.type";
import { SET_LOADER, SET_CONFIGURATION, SET_POPUP } from "@/store/constants/mutations.type";
import ApiService from "@/services/api.service";

export default {
    [GET_POPUP](context) {
      return new Promise(resolve => {
        ApiService.get("announcement").then(resp => {
          context.commit(SET_POPUP, resp.data);
          resolve();
        });
      });
    },
    [CHANGE_LOADER](context, payload){
        context.commit(SET_LOADER, payload);
    },
    [GET_CONFIGURATION](context) {
        return new Promise((resolve, reject) => {
           return ApiService.get("configuration/trxlimit")
            .then(resp => {
              context.commit(SET_CONFIGURATION, resp.data);
              resolve();
            })
            .catch(error => {
              reject(error);
            });
        });
      },
}