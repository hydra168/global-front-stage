import {
  getApiWithdrawalsList,
  postApiWithdrawal,
  getApiUsdtWithdrawal,
  getApiVirtualUsdt,
  patchApiVirtualUsdt,
  getApiWithdrawalCurrency,
} from '../api/data/withdrawals';
import app from '@/main';

/**
 * 取款(提現)相關
 */
const state = {
  withdrawalsList: {},
  postWithdrawalsStatus: '',
  virtualUsdtInfo: {},
  withdrawalsCurrencyList: {},
};
const actions = {
  // 取得 取款紀錄列表
  async GET_WITHDRAWALS_LIST({ commit }, param) {
    return new Promise((resolve, reject) => {
      getApiWithdrawalsList(param).then(res => {
        if (res.isError) {
          res.isOpen && commit('SET_MESSAGE', { message: res.error });
          reject(res);
        } else {
          commit('SET_WITHDRAWALS_LIST', res.result);
          resolve(res);
        }
      });
    });
  },
  // 提交 取款
  async POST_WITHDRAWALS({ commit, dispatch }, param) {
    const browserHash = localStorage.getItem('visitorId');
    param.BrowserHash = browserHash;
    const res = await postApiWithdrawal(param);
    if (res.isError) {
      let { error } = res;
      res.isOpen && commit('SET_MESSAGE', { message: error });
    } else {
      // ! 專門針對流水任務
      if (res.error) {
        console.log('res.error', res.error, app.$t);
        return Promise.reject(app.$t(res.error));
      } else {
        commit('SET_MESSAGE', { message: app.$t('g_modules_withdrawals_createSuccess'), type: 'success' });
        commit('POST_WITHDRAWALS_STATUS', 'success');
        dispatch('GET_BALANCE_ALL_INFO');
      }
    }
  },
  // 提交 USDT取款 是否可以
  async GET_USDT_WITHDRAWALS({ commit, dispatch }, param) {
    const res = await getApiUsdtWithdrawal(param);
    if (res.result && res.result.result && res.result.result.desposit) {
      return true;
    }
    return false;
  },
  // 取得用戶 USDT 帳戶資訊
  async GET_VIRTUAL_USDT({ commit }) {
    return new Promise((resolve, reject) => {
      getApiVirtualUsdt().then(res => {
        if (res.isError) {
          res.isOpen && commit('SET_MESSAGE', { message: res.error });
          reject(res);
        } else {
          commit('SET_VIRTUAL_USDT', res.result);
          resolve(res.result);
        }
      });
    });
  },
  // 更新 USDT 帳戶
  async PATCH_VIRTUAL_USDT({ commit, dispatch }, param) {
    const res = await patchApiVirtualUsdt(param);
    if (res.isError) {
      res.isOpen && commit('SET_MESSAGE', { message: res.error });
    } else {
      dispatch('GET_VIRTUAL_USDT');
      commit('SET_MESSAGE', { message: app.$t('g_modules_withdrawals_modifySuccess'), type: 'success' });
    }
  },
  // 出金支付-非人民幣支付列表
  async GET_WITHDRAWAL_CURRENCY_LIST({ commit }, param) {
    const res = await getApiWithdrawalCurrency(param);
    if (res.isError) {
      res.isOpen && commit('SET_MESSAGE', { message: res.error });
    } else {
      return (state.withdrawalsCurrencyList = res.result);
    }
  },
};
const mutations = {
  SET_WITHDRAWALS_LIST(state, payload) {
    state.withdrawalsList = payload;
  },
  // 可用於任何 取款相關動作的回饋
  POST_WITHDRAWALS_STATUS(state, payload) {
    state.postWithdrawalsStatus = payload;
  },
  SET_VIRTUAL_USDT(state, payload) {
    state.virtualUsdtInfo = payload;
  },
};
const getters = {
  withdrawalsList: state => state.withdrawalsList,
  postWithdrawalsStatus: state => state.postWithdrawalsStatus,
  virtualUsdtInfo: state => state.virtualUsdtInfo,
  isWithdrawHideUsdt: () => false,
  withdrawalsCurrencyList: state => state.withdrawalsCurrencyList,
};

export default {
  state,
  actions,
  mutations,
  getters,
};
