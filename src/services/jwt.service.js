const TOKEN_KEY = "key.token";

export const getToken = () => {
  try {
    var tokenObject = JSON.parse(localStorage.getItem(TOKEN_KEY));
    return tokenObject;
  } catch (error) {
    destroyToken();
  }
};

export const saveToken = (token) => {
  window.localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
};

export const destroyToken = () => {
  window.localStorage.removeItem(TOKEN_KEY);
};

export default {
  getToken,
  saveToken,
  destroyToken
};