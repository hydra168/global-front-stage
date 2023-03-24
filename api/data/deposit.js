import { promiseHandle } from '../promiseHandle';
import { urlReplace, urlDevice } from '../../utils';

/**
 * 存款相關 ------------------------------------------
 *  */

/**
 * 取得 存款列表
 * @param {string} page 當前頁數
 * @param {string} num 當前頁數比數
 * @param {string} s 開始時間....
 * @param {string} e 結束時間....
 */
export function getApiDepositList(params = {}) {
  return promiseHandle({
    apiName: 'getApiDepositList',
    url: urlReplace(urlDevice('/usercentre/deposits'), params),
    method: 'get',
    params,
  });
}
// 查詢 存款細項 @param {string} id
export function getApiDepositDetail(params = {}) {
  return promiseHandle({
    apiName: 'getApiDepositDetail',
    url: urlReplace('/pc/usercentre/deposit/{id}', params),
    method: 'get',
    params,
  });
}
// 提交 存款
export function postApiDeposit(data = {}) {
  return promiseHandle({
    apiName: 'postApiDeposit',
    url: urlDevice('/usercentre/deposit'),
    method: 'post',
    data,
  });
}
// 提交 USDT 存款
export function postApiDepositUSDT(data = {}) {
  return promiseHandle({
    apiName: 'postApiDepositUSDT',
    url: urlDevice('/usercentre/deposit/usdt'),
    method: 'post',
    data,
  });
}
// 提交 幣別 存款
export function postApiDepositCurrency(data = {}) {
  return promiseHandle({
    apiName: 'postApiDepositCurrency',
    url: urlDevice(urlReplace('/usercentre/deposit/currency', data)),
    method: 'post',
    data,
  });
}
// 提交 全球支付
export function postApiDepositJcf(data = {}) {
  delete data.option;
  delete data.depositName;
  return promiseHandle({
    apiName: 'postApiDepositJcf',
    url: urlDevice('/usercentre/deposit/jcf'),
    method: 'post',
    data,
  });
}

// 取得 存款狀態 @param {string} id
export function getApiDepositStatus(params = {}) {
  return promiseHandle({
    apiName: 'getApiDepositStatus',
    url: urlReplace('/pc/usercentre/deposit/status/{id}', params),
    method: 'get',
    params,
  });
}
