import axios from 'axios';
import { store } from '../modules';
// import QS from 'qs';
import defaults from './config';
import app from '@/main';

Object.assign(axios.defaults, defaults);
axios.interceptors.request.use(
  config => {
    config.headers = {
      Authorization: 'token ' + store.getters.token,
      'content-type': config.headers['Content-Type'] ?? 'application/json; charset=UTF-8',
      Accept: 'application/json; charset=UTF-8',
      'x-lang': app.$store.getters.locale,
    };
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (axios.$logan) axios.$logan.loganReport({ error });
    return Promise.reject(error.response);
  }
);

/**
 * promiseHandle
 * 處理 api device url
 * 處理全局錯誤
 */
export const promiseHandle = async ({ apiName, url, method, data, params, headers }) => {
  if (apiName !== 'getApiPing') store.commit('SET_LOADING', true);
  store.commit('SET_ERROR_INFO');
  const resultData = await axios({ url, method, data, params, headers })
    .then(response => {
      // 成功處理
      store.commit('SET_LOADING', false);
      store.commit('SET_ERROR_INFO', { apiName, isError: false });
      // DODO 處理 api 回傳格式不依
      if (
        apiName === 'getApiBoardList' ||
        apiName === 'getApiSpotlights' ||
        apiName === 'getApiAnnouncementList' ||
        apiName === 'getApiGameList' ||
        apiName === 'getApiGame' ||
        apiName === 'getApiGamePromo' ||
        apiName === 'getApiUsdtWithdrawal' ||
        apiName === 'getApiConfigure'
      ) {
        return { status: response.status, result: response.data };
      }
      return { status: response.status, ...response.data };
    })
    .catch(error => {
      if (apiName === 'getForbiddenArea') {
        return error;
      }
      // 失敗處理
      store.commit('SET_LOADING', false);
      store.commit('SET_ERROR_INFO', { apiName, isError: true });
      if (error) {
        let { status, data } = error;
        // DODO 處理 api 回傳格式不依
        if (status === 400) {
          // 資源不存在
          if (apiName === 'postApiDepositJcf') {
            let ErrorStr = data.error.match(/\{(.+?)\}/g);
            if (ErrorStr) {
              ErrorStr = JSON.parse(ErrorStr);
              store.commit('SET_MESSAGE', { message: ErrorStr.msg, type: 'error' });
              return (error = { status, isError: true, isOpen: false, ...data });
            } else {
              store.commit('SET_MESSAGE', { message: data.error, type: 'error' });
              return (error = { status, isError: true, isOpen: false, ...data });
            }
          }
          store.commit('SET_MESSAGE', { message: data.error, type: 'error' });
          return (error = { status, isError: true, isOpen: false, ...data });
        } else if (status === 401) {
          // 会话已失效，请重新登录
          store.commit('SET_MESSAGE', { message: app.$t('g_api_error_401'), type: 'error' });
          store.commit('SET_LOGOUT');
          return (error = { status, isError: true, isOpen: false, ...data });
        } else if (status === 403) {
          // 權限不足
          store.commit('SET_MESSAGE', { message: data.error, type: 'error' });
          return (error = { status, isError: true, isOpen: false, ...data });
        } else if (status === 404) {
          // 404
          store.commit('SET_MESSAGE', { message: data.error, type: 'error' });
          return (error = { status, isError: true, isOpen: false, ...data });
        } else if (status === 500) {
          // 捕捉遊戲錢包加載超時處理
          if (apiName === 'getApiBalanceAllInfo') {
            return (error = { status, isError: true, isOpen: true, ...data });
          }
          // 服务器请求异常，请刷新再试
          store.commit('SET_MESSAGE', { message: data.error, type: 'error' });
          return (error = { status, isError: true, isOpen: false, ...data });
        } else {
          return (error = { status, isError: true, isOpen: true, ...data });
        }
      } else {
        //斷網回傳格式
        store.commit('SET_MESSAGE', { message: '无法取得连线。请联系客服', type: 'error' });
        return (error = { status: 404, isError: true, isOpen: true });
      }
    });
  return resultData;
};
