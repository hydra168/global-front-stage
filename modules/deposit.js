import {
  getApiDepositList,
  getApiDepositDetail,
  postApiDeposit,
  postApiDepositUSDT,
  postApiDepositCurrency,
  postApiDepositJcf,
  getApiDepositStatus,
} from '../api/data/deposit';
import app from '@/main';

const state = {
  depositList: {},
  depositDetail: {},
  depositOrderInfo: {},
  depositStatus: null,
  postDepositStatus: {}, // 取款res
};
const actions = {
  // 取得 存款列表
  async GET_DEPOSIT_LIST({ commit }, params) {
    return new Promise((resolve, reject) => {
      getApiDepositList(params).then(res => {
        if (res.isError) {
          res.isOpen && commit('SET_MESSAGE', { message: res.error });
          reject(res);
        } else {
          commit('SET_DEPOSIT_LIST', res.result);
          resolve(res);
        }
      });
    });
  },
  /**
   * 取得 存款明細
   * @param {String} id 查詢 id
   *  */
  async GET_DEPOSIT_DETAIL({ commit }, { id = '' } = {}) {
    return new Promise((resolve, reject) => {
      getApiDepositDetail({ id }).then(res => {
        if (res.isError) {
          res.isOpen && commit('SET_MESSAGE', { message: res.error });
          reject(res);
        } else {
          commit('SET_DEPOSIT_DETAIL', res.result);
          resolve(res);
        }
      });
    });
  },
  // 取得 存款狀態：每5秒檢查一次，成功後停止檢查 // DODO 待確認
  // @param {string} id
  async GET_DEPOSIT_STATUS({ dispatch, commit }, data) {
    let res = await getApiDepositStatus(data);
    let handle = 0;
    if (res.isError) {
      res.isOpen && commit('SET_MESSAGE', { message: res.error });
    } else {
      if (res.status) {
        commit('SET_MESSAGE', { message: app.$t('g_modules_deposit_depositSuccess'), type: 'success' });
        clearTimeout(handle);
      } else {
        console.log('---');
      }
    }
  },
  // 提交存款
  async POST_DEPOSIT({ commit }, param) {
    const browserHash = localStorage.getItem('visitorId');
    param.BrowserHash = browserHash;
    return new Promise((resolve, reject) => {
      postApiDeposit(param).then(res => {
        if (res.isError) {
          res.isOpen && commit('SET_MESSAGE', { message: res.error });
          commit('POST_DEPOSIT_STATUS', { type: 'error', result: res });
          reject(res);
        } else {
          commit('SET_MESSAGE', { message: app.$t('g_modules_deposit_orderedSuccess'), type: 'success' });
          commit('POST_DEPOSIT_STATUS', { type: 'success', result: res.result });
          resolve(res);
        }
      });
    });
  },
  // 提交存款
  async POST_DEPOSIT_USDT({ commit }, param) {
    const browserHash = localStorage.getItem('visitorId');
    param.BrowserHash = browserHash;
    return new Promise((resolve, reject) => {
      postApiDepositUSDT(param).then(res => {
        if (res.isError) {
          res.isOpen && commit('SET_MESSAGE', { message: res.error });
          reject(res);
        } else {
          commit('SET_MESSAGE', { message: app.$t('g_modules_deposit_orderedSuccess'), type: 'success' });
          commit('SET_DEPOSIT_ORDER_INFO', res.result);
          resolve(res);
        }
      });
    });
  },
  // 提交其他幣種存款
  async POST_DEPOSIT_CURRENCY({ commit }, data) {
    const browserHash = localStorage.getItem('visitorId');
    data.BrowserHash = browserHash;
    return new Promise((resolve, reject) => {
      postApiDepositCurrency(data).then(res => {
        if (res.isError) {
          res.isOpen && commit('SET_MESSAGE', { message: res.error });
          reject(res);
        } else {
          commit('SET_MESSAGE', { message: app.$t('g_modules_deposit_orderedSuccess'), type: 'success' });
          commit('SET_DEPOSIT_ORDER_INFO', res.result);
          resolve(res);
        }
      });
    });
  },
  // 提交全球支付
  async POST_DEPOSIT_JCF({ commit }, data) {
    const browserHash = localStorage.getItem('visitorId');
    data.BrowserHash = browserHash;
    return new Promise((resolve, reject) => {
      postApiDepositJcf(data).then(res => {
        if (res.isError) {
          res.isOpen && commit('SET_MESSAGE', { message: res.error });
          reject(res);
        } else {
          commit('SET_MESSAGE', { message: app.$t('g_modules_deposit_orderedSuccess'), type: 'success' });
          // commit('SET_DEPOSIT_ORDER_INFO', res.result);
          resolve(res);
        }
      });
    });
  },
};
const mutations = {
  SET_DEPOSIT_LIST(state, payload) {
    state.depositList = payload;
  },
  SET_DEPOSIT_DETAIL(state, payload) {
    state.depositDetail = payload;
  },
  SET_DEPOSIT_ORDER_INFO(state, payload) {
    payload.postscript = payload.order.slice(-4);
    state.depositOrderInfo = payload;
  },
  SET_DEPOSIT_STATUS(state, payload) {
    state.depositStatus = payload;
  },
  POST_DEPOSIT_STATUS(state, payload) {
    state.postDepositStatus = payload;
  },
};
const getters = {
  depositList: state => state.depositList,
  depositDetail: state => state.depositDetail,
  depositOrderInfo: state => state.depositOrderInfo,
  depositStatus: state => state.depositStatus,
  postDepositStatus: state => state.postDepositStatus,
};

export default {
  state,
  actions,
  mutations,
  getters,
};
