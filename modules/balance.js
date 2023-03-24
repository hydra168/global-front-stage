import { getApiBalanceAllInfo, postApiBalance, getApiBalanceTotal, getApiBalanceHistoryList } from '../api/data/balance';
import app from '@/main';

/**
 * 我的錢包
 */
const state = {
  balanceTotal: {}, // 總出入金
  balanceAllInfo: {}, // 所有錢包資訊
  balanceSum: 0, // 所有錢包總合
  loadBalanceErrorCount: 0,
  isBalanceLoading: false,
  balanceHistoryList: [],
  gameWalletLabel: null,
  returnMoneyTimestamp: Number(localStorage.getItem('__balanceTick__') || 0),
};
const actions = {
  // 取得 我的錢包 總出入金
  async GET_BALANCE_TOTAL({ commit }) {
    const res = await getApiBalanceTotal();
    if (res.isError) {
      res.isOpen && commit('SET_MESSAGE', { message: res.error });
    } else {
      commit('SET_BALANCE_TOTAL', res.total);
    }
  },
  // 取得 所有種類的錢包資訊
  async GET_BALANCE_ALL_INFO({ commit, state, dispatch, rootGetters }) {
    if (!state.isBalanceLoading) {
      commit('SET_BALANCE_LOADING', true);
      const res = await getApiBalanceAllInfo();
      if (res.isError) {
        // 遊戲錢包加載超時處理 (目前不確定回傳的 error 狀態，有可能是斷網)
        if (res.isOpen) {
          commit('SET_LOAD_BALANCE_ALL_INFO', state.loadBalanceErrorCount + 1);
          if (state.loadBalanceErrorCount <= 3) {
            // 沒超過三次 重新呼叫
            setTimeout(() => {
              commit('SET_BALANCE_LOADING', false);
              dispatch('GET_BALANCE_ALL_INFO');
            }, 3000);
          } else {
            // 超過三次 顯示加載失敗
            commit('SET_MESSAGE', { message: app.$t('g_modules_balance_apiError') });
          }
        }
        setTimeout(() => {
          commit('SET_BALANCE_LOADING', false);
        }, 3000);
      } else {
        // DODO 只回主錢包與遊戲錢包
        let balanceAllInfo = {};
        let balanceSum = 0;
        let gameWallet = 0;
        for (let i in res.result) {
          if (i < 201 || i > 224) {
            balanceAllInfo[i] = { name: res.map[i], balance: res.result[i] };
            balanceSum += parseFloat(res.result[i]);
          } else if (i > 201 && i < 224) {
            gameWallet = gameWallet || parseFloat(res.result[i]);
          }
        }
        balanceAllInfo[-2] = {
          balance: gameWallet,
          name: res.map[-2],
        };
        if (rootGetters.config.Hide_GameMoneyWallet === '1') {
          delete balanceAllInfo[-2];
        }
        for (let i in balanceAllInfo) {
          if (balanceAllInfo[i].name == undefined) {
            delete balanceAllInfo[i];
          }
        }
        if (res.map[-2]) {
          state.gameWalletLabel = res.map[-2];
        }
        commit('SET_LOAD_BALANCE_ALL_INFO', 0); // 回覆預設
        commit('SET_BALANCE_ALL_INFO', balanceAllInfo);
        commit('SET_BALANCE_SUM', balanceSum);
        setTimeout(() => {
          commit('SET_BALANCE_LOADING', false);
        }, 3000);
      }
    }
  },
  // 轉回 主錢包
  async POST_BALANCE({ commit, dispatch }) {
    const timestamp = Number(new Date());
    if (Number(state.returnMoneyTimestamp) + 10000 < timestamp) {
      state.returnMoneyTimestamp = timestamp;
      const res = await postApiBalance();
      state.returnMoneyTimestamp = Number(new Date());
      localStorage.setItem('__balanceTick__', timestamp);
      if (res.isError) {
        res.isOpen && commit('SET_MESSAGE', { message: res.error });
      } else {
        return dispatch('GET_BALANCE_ALL_INFO');
      }
    }
  },
  // 取得 餘額調整列表
  async GET_BALANCE_HISTORY_LIST({ commit }, params) {
    return new Promise((resolve, reject) => {
      getApiBalanceHistoryList(params).then(res => {
        if (res.isError) {
          res.isOpen && commit('SET_MESSAGE', { message: res.error });
          reject(res);
        } else {
          res.result.logs.forEach(item => {
            item.Remark = item.Remark.replace('admin: ', '');
            return;
          });
          commit('SET_BALANCE_HISTORY_LIST', res.result);
          resolve(res);
        }
      });
    });
  },
};
const mutations = {
  SET_BALANCE_TOTAL(state, payload) {
    state.balanceTotal = payload;
  },
  SET_BALANCE_ALL_INFO(state, payload) {
    state.balanceAllInfo = payload;
  },
  SET_LOAD_BALANCE_ALL_INFO(state, payload) {
    state.loadBalanceErrorCount = payload;
  },
  SET_BALANCE_SUM(state, payload) {
    state.balanceSum = payload;
  },
  SET_BALANCE_LOADING(state, b) {
    state.isBalanceLoading = b;
  },
  SET_BALANCE_HISTORY_LIST(state, payload) {
    state.balanceHistoryList = payload;
  },
};
const getters = {
  balanceTotal: state => state.balanceTotal,
  balanceAllInfo: state => state.balanceAllInfo,
  balanceSum: state => state.balanceSum,
  loadBalanceErrorCount: state => state.loadBalanceErrorCount,
  isBalanceLoading: state => state.isBalanceLoading,
  balanceHistoryList: state => state.balanceHistoryList,
  gameWalletLabel: state => state.gameWalletLabel,
};

export default {
  state,
  actions,
  mutations,
  getters,
};
