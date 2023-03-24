import { promiseHandle } from '../promiseHandle';
import { urlReplace, urlDevice } from '@G/utils';

/**
 * 我的錢包
 *  */
// 取得 所有種類的錢包
export function getApiBalanceAllInfo(params = {}) {
  return promiseHandle({
    apiName: 'getApiBalanceAllInfo',
    url: urlDevice('/usercentre/balance/all'),
    method: 'get',
    params,
  });
}
// 轉回
export function postApiBalance(data = {}) {
  return promiseHandle({
    apiName: 'getApiBalance',
    url: '/pc/usercentre/balance',
    method: 'post',
    data,
  });
}

// 取得 我的錢包 總出入金
export function getApiBalanceTotal(params = {}) {
  return promiseHandle({
    apiName: 'getApiBalanceTotal',
    url: '/pc/usercentre/total',
    method: 'get',
    params,
  });
}
/**
 * 取得 存款列表
 * @param {string} page 當前頁數
 * @param {string} num 當前頁數比數
 * @param {string} s 開始時間....
 * @param {string} e 結束時間....
 * @param {number} type (5:系統加值/6:系統扣除)
 */
export function getApiBalanceHistoryList(params = {}) {
  return promiseHandle({
    apiName: 'getApiBalanceHistoryList',
    url: urlReplace('pc/usercentre/balance-history', params),
    method: 'get',
    params,
  });
}
