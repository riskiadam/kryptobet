import Service from "@/services/webcontent.service";
import { GET_SLIDER, GET_CONTACT, FORGOT_PASSWORD } from "@/store/constants/actions.type";
import { SET_CONTACT } from "@/store/constants/mutations.type";

export default {
  [GET_SLIDER]() {
    return new Promise(resolve => {
      return Service.getSlider().then(data => {
        resolve(data);
      });
    });
  },
  [GET_CONTACT](context) {
    return new Promise(resolve => {
      return BaseService.get("contact").then(resp => {
        context.commit(SET_CONTACT, resp);
        resolve(resp);
      });
    });
  }
};