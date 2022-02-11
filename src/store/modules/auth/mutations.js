import { SET_AUTH } from "@/store/constants/mutations.type";
import JwtService from "@/services/jwt.service";
import ApiService from "@/services/api.service";

export default {
  [SET_AUTH](state, token) {
    if (token) {
      JwtService.saveToken(token);
      ApiService.setHeader();
      state.token = token;
      state.isAuthenticated = true;
      
    } else {
      JwtService.destroyToken();
      ApiService.removeHeader();
      state.token = null;
      state.isAuthenticated = false;
    }
  },
};