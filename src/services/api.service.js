import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import JwtService from "./jwt.service";
import store from "../store";
import { LOGOUT } from "@/store/constants/actions.type";

const loginConfig = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  }
};

export default {
  errorHandler(error) {
    if (!error.response) {
      Vue.notify({
        group: 'ErrorMessage',
        title: 'Network Error',
        text: 'Please check your connection!',
        type : 'error',
        closeOnClick : true,
        max : 1,
        ignoreDuplicates : true
      });
    } else if (error.response.config.url === "token") {
      // LOGIN FAILED
      return Promise.reject(error.response.data.error_description);
    } else if (error.response.status === 401 || error.response.status === 403) {
      // AUTH ERROR
      Promise.reject(error.response.data.error);
      store.dispatch(LOGOUT);
    } else {
      // OTHER ERROR
      return Promise.reject(error.response);
    }
  },
  
  successHandler(response) {
    // LOGIN REQuEST
    if (!response.data.status) return Promise.resolve(response.data);
    // OTHER REQUEST
    if (response.data.status === "Success")
      return Promise.resolve(response.data.result);
    else return Promise.reject(response.data.message);
  },

  init(apiUrl) {
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = apiUrl;
    if (JwtService.getToken()) this.setHeader();
    Vue.axios.interceptors.response.use(
      (response) => this.successHandler(response),
      (error) => this.errorHandler(error)
    );
  },

  setHeader() {
    let tokenObject = JwtService.getToken();
    if (!tokenObject) {
      this.$store.dispatch(LOGOUT);
    } else {
      Vue.axios.defaults.headers.common["Authorization"] =
        "bearer " + tokenObject.access_token;
    }
  },

  removeHeader() {
    delete Vue.axios.defaults.headers.common["Authorization"];
  },

  get(resource, query) {
    if (query) resource += this.buildQuery(query);
    return Vue.axios.get(resource);
  },

  post(resource, params, query) {
    if (query) resource += this.buildQuery(query);
    return Vue.axios.post(resource, params);
  },

  put(resource, params, query) {
    if (query) resource += this.buildQuery(query);
    return Vue.axios.put(resource, params);
  },

  delete(resource, query) {
    if (query) resource += this.buildQuery(query);
    return Vue.axios.delete(resource);
  },

  login(username, password) {
    var payload =
      "username=" + username + "&password=" + password + "&grant_type=password";
    return Vue.axios.post("oauth/token", payload, loginConfig);
  },

  buildQuery(qObject) {
    let retVal = "";
    let keys = Object.keys(qObject);
    keys.forEach((x, i) => {
      if (i === 0) retVal += `?${x}=${qObject[x]}`;
      else retVal += `&${x}=${qObject[x]}`;
    });
    return retVal;
  }
};
