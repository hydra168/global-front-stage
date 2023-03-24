import { promiseHandle } from '../promiseHandle';
import { urlDevice } from '../../utils';

/**
 * 付款相關
 *  */
// 取得 付款渠道列表
export function getApiPaymentAccountList(params = {}) {
  return promiseHandle({
    apiName: 'getApiPaymentAccountList',
    url: urlDevice('/payment/accounts?t=1'),
    method: 'get',
    params,
  });
}
// 取得 付款類型列表  1: "微信" 2: "支付宝" 3: "银行" 4: "在线支付"
export function getApiPaymentsTypeList(params = {}) {
  return promiseHandle({
    apiName: 'getApiPaymentsTypeList',
    url: urlDevice('/payments?t=1'),
    method: 'get',
    params,
  });
}

// 取得 新版全球支付類型列表
export function getApiPaymentsMethods(params = { _: +Date() }) {
  return promiseHandle({
    apiName: 'getApiPaymentsMethods',
    url: urlDevice('/payment/methods'),
    method: 'get',
    params,
  });
}
