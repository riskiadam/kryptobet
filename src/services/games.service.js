import BaseService from "@/services/api.service";

export default {
  gamesCategoryList() {
    return BaseService.get("TrillionGaming/category");
  },
  gamesList() {
    return BaseService.get("games");
  },
  getLobby(gamesCode) {
    return BaseService.get("games/lobby/" + gamesCode);
  },
  getGamesProduct(gamesCode) {
    return BaseService.get(gamesCode);
  },
  getLobbyProduct(vendor, gamesCode, productCode, deviceType) {
    return BaseService.get("games/lobby/TrillionGaming/" + gamesCode + "/" + productCode + "/" + deviceType);
  }
};