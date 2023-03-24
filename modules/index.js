require('es6-promise').polyfill();
import Vuex from 'vuex';

import G_login from './login';
import G_sys from './sys';
import G_user from './user';
import G_balance from './balance';
import G_withdrawals from './withdrawals';
import G_deposit from './deposit';
import G_payment from './payment';
import G_cms from './cms';
import G_games from './games';
import G_email from './email';
import G_ws from './ws';
import G_i18n from './i18n';
import G_agencyCenter from './agencyCenter';

export let store = null;
export const mergeStore = ({ Vue, agentModules = {} }) => {
  Vue.use(Vuex);
  const modules = {
    ...agentModules,
    G_login,
    G_sys,
    G_user,
    G_balance,
    G_withdrawals,
    G_deposit,
    G_payment,
    G_games,
    G_cms,
    G_email,
    G_ws,
    G_i18n,
    G_agencyCenter,
  };
  store = new Vuex.Store({
    modules,
    // strict: debug
  });
  return store;
};
