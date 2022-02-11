import Vue from "vue";
import Vuex from "vuex";

import state from './state';
import actions from './actions';
import mutations from './mutations';
import auth from './modules/auth';
import me from './modules/me';
import wallet from './modules/wallet/index';
import games from './modules/games';
import report from './modules/report';

Vue.use(Vuex);

export default new Vuex.Store({
    state: state,
    mutations: mutations,
    actions: actions,
    modules:{
        wallet,
        auth,
        me,
        games,
        report
    }
})