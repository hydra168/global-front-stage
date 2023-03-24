import { promiseHandle } from '../promiseHandle';
import { urlReplace, urlDevice } from '../../utils';
/**
 * 取款(提現)相關
 *  */
/**
 * 取得 取款列表
 * @param {string} page 當前頁數
 * @param {string} num 當前頁數比數
 * @param {string} s 開始時間....
 * @param {string} e 結束時間....
 */
export function getApiWithdrawalsList(params = {}) {
  return promiseHandle({
    apiName: 'getApiWithdrawalsList',
    url: urlReplace(urlDevice('/usercentre/withdrawals'), params),
    method: 'get',
    params,
  });
}
// 提交 提現
export function postApiWithdrawal(data = {}) {
  return promiseHandle({
    apiName: 'postApiWithdrawal',
    url: urlDevice('/usercentre/withdrawal'),
    method: 'post',
    data,
  });
}

// 提交 USDT提現 是否可以
export function getApiUsdtWithdrawal(params = {}) {
  return promiseHandle({
    apiName: 'getApiUsdtWithdrawal',
    url: urlDevice('/usercentre/usdtstate'),
    method: 'get',
    params,
  });
}

// 取得 取款上限
export function getApiWithdrawalMax(params = {}) {
  return promiseHandle({
    apiName: 'getApiWithdrawalMax',
    url: urlReplace('/pc/usercentre/withdrawal/max'),
    method: 'get',
    params,
  });
}
// 取得用戶 USDT 帳戶資訊
export function getApiVirtualUsdt(params = {}) {
  return promiseHandle({
    apiName: 'getApiVirtualUsdt',
    url: '/pc/usercentre/virtual-currency/usdt',
    method: 'get',
    params,
  });
}
// 更新 USDT 帳戶
export function patchApiVirtualUsdt(data = {}) {
  return promiseHandle({
    apiName: 'patchApiVirtualUsdt',
    url: '/pc/usercentre/virtual-currency/usdt',
    method: 'patch',
    data,
  });
}

// 出金支付-非人民幣支付列表
export function getApiWithdrawalCurrency(params = {}) {
  return promiseHandle({
    apiName: 'getApiWithdrawalCurrency',
    url: '/pc/usercentre/withdrawalCurrency',
    method: 'get',
    params,
  });
}
