import moment from "moment";

export default {
  isAuthenticated: (state) => {
    let hasToken = !!state.token;
    if (hasToken) {
      let tokenNotExpired = () => {
        let utcNow = moment.utc();
        let expiry = moment(state.token[".expires"]);
        return expiry > utcNow;
      };
      if (tokenNotExpired) return true;
      else return false;
    } else return false;
  },
  hasToken: (state) => {
    return !!state.token;
  }
};