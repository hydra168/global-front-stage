import { promiseHandle } from '../promiseHandle';
import { urlDevice } from '../../utils';

/**
 * 使用者資訊相關 ------------------------------
 */
// pc 取得 使用者資訊
export function getApiProfile(params = {}) {
  return promiseHandle({
    apiName: 'getApiProfile',
    url: urlDevice('/usercentre/profile'),
    method: 'get',
    params,
  });
}

// pc 更新 使用者資訊
export function postApiProfile(data = {}) {
  return promiseHandle({
    apiName: 'postApiProfile',
    url: '/pc/usercentre/profile',
    method: 'post',
    data,
  });
}

// m 取得 使用者資訊
export function getApiUserInfo(params = {}) {
  return promiseHandle({
    apiName: 'getApiUserInfo',
    url: '/m/usercentre/info',
    method: 'get',
    params,
  });
}

/**
 * 修改密碼相關 ------------------------------
 */

// pc 修改 登录密码
export function putApiLoginPassword(data = {}) {
  return promiseHandle({
    apiName: 'putApiLoginPassword',
    url: urlDevice('/usercentre/password'),
    method: 'put',
    data,
  });
}

/**
 * pc 第一次設置 取款密碼
 * @param {*} data
 */
export function putApiSetWpass(data = {}) {
  return promiseHandle({
    apiName: 'putApiSetWpass',
    url: urlDevice('/usercentre/wpass'),
    method: 'put',
    data,
  });
}

/**
 * pc 變更 取款密碼密碼
 * user.w == true 已設過取款密碼並且修改時用
 * @param {string} Password 原密码
 * @param {string} Wpass 新取款密码
 * @param {string} Rwpass 确认新取款密码
 */
export function putApiWpass(data = {}) {
  return promiseHandle({
    apiName: 'putApiWpass',
    url: urlDevice('/usercentre/wpassword'),
    method: 'put',
    data,
  });
}

/**
 * 銀行卡相關 ------------------------------
 *  */
// pc 取得 個人銀行卡
export function getApiBankList(params = {}) {
  return promiseHandle({
    apiName: 'getApiBankList',
    url: urlDevice('/usercentre/banks'),
    method: 'get',
    params,
  });
}

// pc 新增 個人銀行卡
export function postApiBank(data = {}) {
  return promiseHandle({
    apiName: 'postApiBank',
    url: urlDevice('/usercentre/bank'),
    method: 'post',
    data,
  });
}

// CNBankCard 中国各大银行卡号查询
export function validateAndCacheCardInfo(params = {}) {
  return promiseHandle({
    apiName: 'validateAndCacheCardInfo',
    url: '../bc',
    method: 'get',
    params: {
      _input_charset: 'utf-8',
      cardBinCheck: true,
      ...params,
    },
  });
}

/**
 * vip 相關 ------------------------------
 *  */
// pc 取得vip 等級
export function getApiVip(data = {}) {
  return promiseHandle({
    apiName: 'getApiVip',
    url: '/pc/usercentre/vip',
    method: 'get',
    data,
  });
}

/**
 * 好友推薦 ------------------------------
 * @param {string} name
 * */
//
export function getGrandtotal(params = { name: '' }) {
  return promiseHandle({
    apiName: 'getGrandtotal',
    url: urlDevice('/usercentre/grandtotal'),
    method: 'get',
    params,
  });
}
export function getInviteCodeInfo(params = { name: '' }) {
  return promiseHandle({
    apiName: 'getInviteCodeInfo',
    url: urlDevice('/usercentre/inviteCodeInfo'),
    method: 'get',
    params,
  });
}

/**
 * H5获取下载地址
 */
export function getDownloadUrl(params = { name: '' }) {
  return promiseHandle({
    apiName: 'getDownloadUrl',
    url: '/common/version',
    method: 'get',
  });
}
