import { SET_GAMES_CATEGORY_LIST, SET_GAMES_MEMBER } from "@/store/constants/mutations.type";

export default {
  [SET_GAMES_CATEGORY_LIST](state, payload) {
    var allCat = ["SB", "CAS", "PKR", "SLOT"];
    payload.sort(function(a, b) {
      return allCat.indexOf(a.code) - allCat.indexOf(b.code);
    });
    state.categoryList = payload;
    //state.categoryList = [{"code":"SB","description":"Sportsbook","games":[{"code":"AFB1188","description":"AFB Sportsbook","remarks":"AFB 1188 Sportsbook","hasLobby":true,"isMaintenance":false},{"code":"SBO","description":"SBO Bet","remarks":"SBO Bet","hasLobby":true,"isMaintenance":false}]},{"code":"CAS","description":"Casino","games":[{"code":"GD88","description":"GD88 Casino","remarks":"Green Dragon 88 Casino","hasLobby":true,"isMaintenance":false},{"code":"LG88","description":"LG88 Casino","remarks":"LG88 Casino","hasLobby":true,"isMaintenance":false},{"code":"WM","description":"WM Casino","remarks":"WM Casino","hasLobby":true,"isMaintenance":false}]},{"code":"PKR","description":"Poker","games":[{"code":"WE1","description":"WE1 Poker","remarks":"WE1 Poker","hasLobby":true,"isMaintenance":false}]},{"code":"SLOT","description":"Slot","games":[{"code":"JDB","description":"JDB Slot","remarks":"JDB Casino","hasLobby":true,"isMaintenance":false},{"code":"PP","description":"Pragmatic Play","remarks":"Pragmatic Play","hasLobby":false,"isMaintenance":false},{"code":"QT","description":"QTech","remarks":"QTech Casino","hasLobby":true,"isMaintenance":false}]}];
  },
  [SET_GAMES_MEMBER](state, payload) {
    var allCat = ["TrillionGaming"];
    payload.sort(function(a, b) {
      return allCat.indexOf(a.code) - allCat.indexOf(b.code);
    });
    state.gameMemberList = payload;
  },
};