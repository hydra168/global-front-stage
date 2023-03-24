/* eslint-disable */
import { postApiLogin, postApiLogin1159, getApiLogout, postApiRegister, getApiAs, getApiCaptcha } from '../api/data/login';
import { setStorage, getStorage, encrypted } from '../utils';
import { PC_SHOW_LOGIN_PAGE } from '../consts';

import { router } from '../router';
import aes from 'crypto-js/aes';
import enc from 'crypto-js/enc-utf8';
import md5 from 'crypto-js/md5';
import app from '@/main';

/**
 * 命名規範:
 * state: 小駝峰
 * actions: {XXX}_{XXX} 大寫_大寫
 * mutations: SET_{XXX} 大寫
 * getters: 小駝峰
 */

const state = {
  userInfo: { name: '游客' },
  rememberData: {},
  referralCode: '',
  salt: '',
  token: window.localStorage.getItem('token') || null,
  isLogin: false, // 判斷目前是否為登入狀態
  registerStatus: null,
  isAgency: window.localStorage.getItem('_ag') || false,
  loginRedirect: null,
  captcha: {
    id: '',
    b64s: '',
  },
};

const actions = {
  /**
   * 登入操作
   * @param {string} Name 使用者名稱
   * @param {string} Passwd 使用者密碼
   * @param {boolean} Remember 記住帳密
   */
  async POST_LOGIN_1159({ dispatch, commit }, data) {
    let { Name, Passwd, Id, Value, Remember } = data;
    const BrowserHash = localStorage.getItem('visitorId');
    // console.log('BrowserHash: ', BrowserHash);
    const res = await postApiLogin1159(encrypted({ Name, Passwd, Id, Value, BrowserHash }));
    if (res.isError) {
      res.status === 403 && router.push({ name: 'error403', params: res });
      res.status === 404 && router.push({ name: 'error404', params: res });
      res.isOpen && commit('SET_MESSAGE', { message: res.error });
    } else {
      // 記住帳密
      Remember ? commit('SET_REMEMBER', { n: Name, p: Passwd }) : localStorage.removeItem('__r');
      commit('SET_GLOBAL_BOX', '');
      commit('SET_USER_INFO', res.result);
      commit('SET_IS_LOGIN', true);
      // dispatch('GET_PING');
      dispatch('GET_BALANCE_ALL_INFO');
      dispatch('GET_VIP_LEVEL');
      commit('SET_MESSAGE', { message: app.$t('g_modules_login_loginSuccess'), type: 'success' });
      if (state.loginRedirect == null) {
        router.push('/');
      } else {
        router.push(state.loginRedirect);
        commit('SET_LOGIN_REDIRECT', null);
      }
    }
    return res;
  },
  /**
   * 登入操作
   * @param {string} Name 使用者名稱
   * @param {string} Passwd 使用者密碼
   * @param {boolean} Remember 記住帳密
   */
  async POST_LOGIN({ dispatch, commit }, data) {
    let { Name, Passwd, Id, Value, Remember } = data;
    const BrowserHash = localStorage.getItem('visitorId');
    // console.log('BrowserHash: ', BrowserHash);
    const res = await postApiLogin(encrypted({ Name, Passwd, Id, Value, BrowserHash }));
    if (res.isError) {
      res.status === 403 && router.push({ name: 'error403', params: res });
      res.status === 404 && router.push({ name: 'error404', params: res });
      res.isOpen && commit('SET_MESSAGE', { message: res.error });
    } else {
      // 記住帳密
      Remember ? commit('SET_REMEMBER', { n: Name, p: Passwd }) : localStorage.removeItem('__r');
      commit('SET_GLOBAL_BOX', '');
      commit('SET_USER_INFO', res.result);
      commit('SET_IS_LOGIN', true);
      // dispatch('GET_PING');
      dispatch('GET_BALANCE_ALL_INFO');
      dispatch('GET_VIP_LEVEL');
      commit('SET_MESSAGE', { message: app.$t('g_modules_login_loginSuccess'), type: 'success' });
      if (state.loginRedirect == null) {
        router.push('/');
      } else {
        router.push(state.loginRedirect);
        commit('SET_LOGIN_REDIRECT', null);
      }
    }
    return res;
  },
  /**
   * 管理者以玩家身份登入操作
   * @param {string} token
   */
  async GET_LOGIN_BY_TOKEN({ commit, dispatch }, { token = '' }) {
    const res = await getApiAs({ token });
    if (res.isError) {
      commit('SET_MESSAGE', { message: res.error });
      if (navigator.userAgent.indexOf('MSIE') > 0) {
        //close IE
        if (navigator.userAgent.indexOf('MSIE 6.0') > 0) {
          window.opener = null;
          window.close();
        } else {
          window.open('', '_top');
          window.top.close();
        }
      } else if (navigator.userAgent.indexOf('Firefox') > 0) {
        //close firefox
        window.location.href = 'about:blank ';
      } else {
        //close chrome;It is effective when it is only one.
        window.opener = null;
        window.open('', '_self');
        window.close();
      }
    } else {
      commit('SET_GLOBAL_BOX', '');
      commit('SET_USER_INFO', res.result);
      commit('SET_IS_LOGIN', true);
      // dispatch('GET_PING');
      dispatch('GET_BALANCE_ALL_INFO');
      commit('SET_MESSAGE', { message: app.$t('g_modules_login_loginSuccess'), type: 'success' });
      router.push('/');
    }
  },
  /**
   * 登出操作
   */
  async GET_LOGOUT({ commit }) {
    commit('SET_LOADING_BAR');
    const res = await getApiLogout();
    if (res.isError) {
      res.isOpen && commit('SET_MESSAGE', { message: app.$t('g_modules_login_logoutError') });
    } else {
      commit('SET_MESSAGE', { message: app.$t('g_modules_login_logoutSuccess'), type: 'success' });
      commit('SET_LOGOUT');
    }
    commit('SET_LOADING_BAR', { show: false });
  },
  /**
   * 註冊帳號
   * @param {string} Name 使用者名稱
   * @param {string} Passwd 使用者密碼
   * @param {string} RePasswd 使用者密碼確認
   * @param {string} Mobile 使用者手機
   * @param {string} Code 推薦碼
   */
  async POST_REGISTER({ dispatch, commit }, data) {
    const res = await postApiRegister(encrypted(data));
    if (res.isError) {
      res.isOpen && commit('SET_MESSAGE', { message: res.error });
    } else {
      commit('SET_MESSAGE', { message: app.$t('g_modules_login_registeredSuccess'), type: 'success' });
      setTimeout(() => {
        localStorage.removeItem('__r');
        commit('SET_GLOBAL_BOX', '');
        commit('SET_USER_INFO', res.result);
        commit('SET_IS_LOGIN', true);
        // dispatch('GET_PING');
        dispatch('GET_BALANCE_ALL_INFO');
        commit('SET_MESSAGE', { message: app.$t('g_modules_login_loginSuccess'), type: 'success' });
        if (state.loginRedirect == null) {
          router.push('/');
        } else {
          router.push(state.loginRedirect);
          commit('SET_LOGIN_REDIRECT', null);
        }
        router.push('/');
      }, 800);
    }
    return res;
  },
  /**
   * 檢查 使用者登入狀況
   */
  CHECK_USER_LOGIN({ commit }) {
    const token = window.localStorage.getItem('token');
    let user = window.localStorage.getItem('userInfo');
    if (user && token) {
      try {
        user = JSON.parse(aes.decrypt(user, md5(token).toString()).toString(enc));
      } catch (e) {
        commit('SET_IS_LOGIN', false);
        return;
      }
      user['token'] = token;
      commit('SET_USER_INFO', user);
      commit('SET_IS_LOGIN', true);
    }
  },
  /**
   * 製鹽
   */
  MAKE_SALT({ commit }) {
    let salt = localStorage.getItem('__t');
    !salt && (salt = md5('T' + new Date().getTime()).toString());
    localStorage.setItem('__t', salt);
    commit('SET_SALT', salt);
  },
  /**
   * 檢查 是否有記住密碼
   */
  CHECK_REMEMBER({ commit, state }) {
    let hasRemember = window.localStorage.getItem('__r');
    if (hasRemember) {
      try {
        // 解鹽
        let rememberData = JSON.parse(aes.decrypt(hasRemember, state.salt + state.salt).toString(enc));
        commit('SET_REMEMBER', rememberData);
      } catch (e) {
        return;
      }
    }
  },
  async GET_CAPTCHA({ commit, state }) {
    const res = await getApiCaptcha();
    if (res.isError) {
      res.isOpen && commit('SET_MESSAGE', { message: app.$t('g_modules_login_captchaGetError') });
    } else {
      commit('SET_CAPTCHA', res);
    }
  },
};

const mutations = {
  /**
   * 儲存 使用者資訊
   */
  SET_USER_INFO(state, user) {
    user.name = user.Name || user.name; // 後端參數變更
    let token = user.token;
    localStorage.setItem('token', token);
    localStorage.setItem('userInfo', aes.encrypt(JSON.stringify(user), md5(token).toString()).toString());
    localStorage.setItem('_ag', user.k);
    state.token = token;
    state.userInfo = user;
    state.isAgency = user.k;
  },
  /**
   * 記住密碼
   * n: 帳號, p: 密碼
   */
  SET_REMEMBER(state, payload) {
    localStorage.setItem('__r', aes.encrypt(JSON.stringify(payload), state.salt + state.salt).toString());
    state.rememberData = payload;
  },
  SET_SALT(state, payload) {
    state.salt = payload;
  },
  SET_LOGOUT(state) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('userInfo');
    }
    // this.commit('SET_USERCENTRE_DIALOG_PATH', '');
    // this.commit('SET_HELPCENTRE_DIALOG_PATH', '');
    state.isLogin = false;
    state.token = '';
    router.push(PC_SHOW_LOGIN_PAGE ? '/login' : '/');
  },
  SET_IS_LOGIN(state, payload) {
    state.isLogin = payload;
  },
  POST_REGISTER_STATUS(state, payload) {
    state.registerStatus = payload;
  },
  SET_REFERRAL_CODE(state, payload) {
    state.referralCode = payload;
  },
  SET_LOGIN_REDIRECT(state, payload) {
    state.loginRedirect = payload;
  },
  SET_CAPTCHA(state, payload) {
    state.captcha = payload;
  },
};

const getters = {
  userInfo: state => state.userInfo,
  token: state => state.token,
  rememberData: state => state.rememberData,
  referralCode: state => state.referralCode,
  isLogin: state => state.isLogin,
  registerStatus: state => state.registerStatus,
  isAgency: state => state.isAgency,
  captcha: state => state.captcha,
};

export default {
  actions,
  state,
  mutations,
  getters,
};
