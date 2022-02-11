import Service from "@/services/games.service";
import {
  FETCH_GAMES_CATEGORY,
  GET_LOBBY,
  FETCH_GAMES_LIST,
  GET_LOBBY_PRODUCT,
  FETCH_GAMES_MEMBER
} from "@/store/constants/actions.type";
import { SET_GAMES_CATEGORY_LIST, SET_GAMES_MEMBER } from "@/store/constants/mutations.type";

export default {
  [FETCH_GAMES_CATEGORY](context) {
    return new Promise(resolve => {
      return Service.gamesCategoryList().then(resp => {
        context.commit(SET_GAMES_CATEGORY_LIST, resp.data);
        resolve();
      });
    });
  },
  [FETCH_GAMES_MEMBER](context) {
    return new Promise(resolve => {
      return Service.gamesList().then(resp => {
        context.commit(SET_GAMES_MEMBER, resp.data);
        resolve(resp);
      });
    });
  },
  [GET_LOBBY](context, gamesCode) {
    return new Promise((resolve, reject) => {
      return Service.getLobby(gamesCode)
        .then(resp => {
          resolve(resp.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  [FETCH_GAMES_LIST](context, gamesCode) {
    return new Promise((resolve, reject) => {
      return Service.getGamesProduct(gamesCode)
        .then(resp => {
          resolve(resp.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  [GET_LOBBY_PRODUCT](context, { vendor, gamesCode, productCode, deviceType }) {
    return new Promise((resolve, reject) => {
      return Service.getLobbyProduct(vendor, gamesCode, productCode, deviceType)
        .then(resp => {
            resolve(resp.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};