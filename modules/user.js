import {
  // 個人資訊
  getApiProfile,
  postApiProfile,
  getApiUserInfo,
  // 修改密碼
  putApiLoginPassword,
  putApiSetWpass,
  putApiWpass,
  // 個人銀行卡
  getApiBankList,
  postApiBank,
  getApiVip,
  getGrandtotal,
  getInviteCodeInfo,
  validateAndCacheCardInfo,
} from '../api/data/user';
import { store } from '../modules';
import { setStorage, getStorage } from '../utils';
import app from '@/main';
import { decodeConfigAPIValue } from '@UTILS/configAPI';
import { router } from '../router';
/**
 * 命名規範:
 * state: 小駝峰
 * actions: {XXX}_{XXX} 大寫_大寫
 * mutations: SET_{XXX} 大寫
 * getters: 小駝峰
 */

const state = {
  userProfileData: null,
  userBankList: [], // 個人銀行卡列表
  userDetailInfo: {}, // 個人明細
  postUserProfileStatus: '', // 可用於 新增修改個人資訊回饋訊息
  putPasswordStatus: '', // 可用於 修改密碼回饋訊息
  vipLevel: {},
  cardValidation: {},
  grandtotal: {},
  inviteCodeInfo: {},
  inviteTotal: {},
  invitecode: {},
};

const actions = {
  /**
   * 個人資訊 -----------------------------
   */
  // 取得 個人資訊
  GET_USER_PROFILE({ commit }) {
    return new Promise((resolve, reject) => {
      getApiProfile().then(res => {
        if (res.isError) {
          res.isOpen && commit('SET_MESSAGE', { message: res.error });
          reject(res);
        } else {
          let { result } = res;
          result.cards = result.cards ? JSON.parse(result.cards) : [];
          commit('SET_USER_PROFILE', result);
          resolve(result);
        }
      });
    });
  },
  //新增 修改 個人資訊
  async POST_USER_PROFILE({ commit, dispatch }, data) {
    const res = await postApiProfile(data);
    if (res.isError) {
      res.isOpen && commit('SET_MESSAGE', { message: res.error });
    } else {
      commit('SET_MESSAGE', { message: app.$t('g_modules_user_modifySuccess'), type: 'success' });
      commit('POST_USER_PROFILE_STATUS', 'success');
      dispatch('GET_USER_PROFILE'); // 重新取得使用者資訊
    }
  },
  // m 取得 個人資訊
  async GET_USER_DETAIL_INFO({ commit }) {
    const res = await getApiUserInfo();
    if (res.isError) {
      res.isOpen && commit('SET_MESSAGE', { message: res.error });
    } else {
      commit('SET_USER_DETAIL_INFO', res.result);
    }
  },
  /**
   * 修改密碼相關 ------------------------------
   */
  // 修改登入密碼
  async PUT_LOGIN_PASSWORD({ commit, dispatch }, data) {
    const res = await putApiLoginPassword(data);
    if (res.isError) {
      res.isOpen && commit('SET_MESSAGE', { message: res.error });
    } else {
      commit('SET_MESSAGE', { message: app.$t('g_modules_user_modifySuccess'), type: 'success' });
      commit('PUT_PASSWORD_STATUS', 'success');
      dispatch('GET_USER_PROFILE'); // 重新取得使用者資訊
      setTimeout(() => {
        router.push('/userCentre');
      }, 2000);
    }
  },
  // 第一次設置 取款密碼
  async PUT_SET_W_PASSWORD({ commit, dispatch, rootGetters }, data) {
    const res = await putApiSetWpass(data);
    if (res.isError) {
      res.isOpen && commit('SET_MESSAGE', { message: res.error });
    } else {
      let data = { ...rootGetters.userInfo };
      data.w = true;
      commit('SET_USER_INFO', data);
      commit('SET_MESSAGE', { message: app.$t('g_modules_user_withdrawalPassword_modifySuccess'), type: 'success' });
      commit('PUT_PASSWORD_STATUS', 'success');
      setTimeout(() => {
        router.push('/userCentre');
      }, 2000);
      // dispatch('CHECK_USER_LOGIN');
    }
  },
  // 修改 取款密碼
  async PUT_W_PASSWORD({ commit }, data) {
    const res = await putApiWpass(data);
    if (res.isError) {
      res.isOpen && commit('SET_MESSAGE', { message: res.error });
    } else {
      commit('SET_MESSAGE', { message: app.$t('g_modules_user_withdrawalPassword_modifySuccess'), type: 'success' });
      commit('PUT_PASSWORD_STATUS', 'success');
      setTimeout(() => {
        router.push('/userCentre');
      }, 2000);
    }
  },
  /**
   * 銀行卡相關 -----------------------------
   */
  // 取得 個人銀行卡
  GET_USER_BANK_LIST({ commit }) {
    return new Promise((resolve, reject) => {
      getApiBankList().then(res => {
        if (res.isError) {
          res.isOpen && commit('SET_MESSAGE', { message: res.error });
          reject(res);
        } else {
          commit('SET_USER_BANK_LIST', res.result);
          resolve(res.result);
        }
      });
    });
  },
  // CNBankCard 中国各大银行卡号查询
  async CHECK_CARD_NO({ state }, cardNo) {
    return new Promise((resolve, reject) => {
      // validateAndCacheCardInfo({ cardNo }).then(res => {
      //   if (res.isError) {
      //     reject(res);
      //   } else {
      //     state.cardValidation = res;
      //     resolve(res);
      //   }
      // });
    });
  },
  // 新增銀行卡
  async POST_USER_BANK({ commit, dispatch }, data) {
    return new Promise((resolve, reject) => {
      postApiBank(data).then(res => {
        if (res.isError) {
          res.isOpen && commit('SET_MESSAGE', { message: res.error });
          reject(res);
        } else {
          commit('SET_MESSAGE', { message: app.$t('g_modules_user_bindSuccess'), type: 'success' });
          dispatch('GET_USER_BANK_LIST');
          resolve(res);
        }
      });
    });
  },
  // 取得 VIP 等級
  async GET_VIP_LEVEL({ commit }) {
    const res = await getApiVip();
    if (res.isError) {
      res.isOpen && commit('SET_MESSAGE', { message: res.error });
    } else {
      commit('SET_VIP_LEVEL', res.result);
    }
  },
  // 取得會員紅利與好友
  async GET_GRANDTOTAL({ commit }, params) {
    const res = await getGrandtotal(params);
    if (res.isError) {
      res.isOpen && commit('SET_MESSAGE', { message: res.error });
    } else {
      commit('SET_GRANDTOTAL', res.result);
    }
  },
  // 取得邀請碼
  async GET_INVITE_CODE_INFO({ commit }, params) {
    const res = await getInviteCodeInfo(params);
    if (res.isError) {
      res.isOpen && commit('SET_MESSAGE', { message: res.error });
    } else {
      commit('SET_INVITE_CODE_INFO', res.result);
    }
  },
};

const mutations = {
  SET_USER_PROFILE(state, payload) {
    setStorage('userProfile', payload);
    state.userProfileData = payload;
  },
  POST_USER_PROFILE_STATUS(state, payload) {
    state.postUserProfileStatus = payload;
  },
  SET_USER_BANK_LIST(state, payload) {
    state.userBankList = payload;
  },
  SET_USER_DETAIL_INFO(state, payload) {
    state.userDetailInfo = payload;
  },
  PUT_PASSWORD_STATUS(state, payload) {
    state.putPasswordStatus = payload;
  },
  SET_VIP_LEVEL(state, payload) {
    state.vipLevel = payload;
  },
  SET_GRANDTOTAL(state, payload) {
    state.grandtotal = payload;
  },
  SET_INVITE_CODE_INFO(state, payload) {
    state.inviteCodeInfo = payload;
  },
};

const getters = {
  userProfileData: state => (state.userProfileData ? state.userProfileData : getStorage('userProfile')),
  userBankList: state => (state.userBankList ? state.userBankList : []),
  userDetailInfo: state => state.userDetailInfo,
  postUserProfileStatus: state => state.postUserProfileStatus,
  putPasswordStatus: state => state.putPasswordStatus,
  vipLevel: state => state.vipLevel,
  grandtotal: state => state.grandtotal,
  inviteCodeInfo: state => state.inviteCodeInfo,
  cardValidation: state => state.cardValidationm,
  bankList: () => {
    const locale = store.getters.locale.replace('zh-', '').toLowerCase();
    return decodeConfigAPIValue(store.getters.config.bank_list ?? '[]')
      .map(item => {
        item.order = item.order || 0;
        item.text = `${item[locale] || item.cn}`;
        item.locale = item.locale || 'cn';
        return item;
      })
      .sort((a, b) => {
        if (a.order < b.order) {
          return 1;
        } else if (a.order > b.order) {
          return -1;
        } else {
          return 0;
        }
      });
  },
};

export default {
  actions,
  state,
  mutations,
  getters,
};
