import { promiseHandle } from '../promiseHandle';
import { urlReplace, urlDevice } from '../../utils';
/**
 * 使用者相關 api
 * 命名規範 {method}Api{後端給的api名稱}
 */

/**
 * 登入 (针对1159PC和H5)
 *  */
export function postApiLogin1159(data = {}) {
  return promiseHandle({
    apiName: 'postApiLogin',
    url: 'plogin',
    method: 'post',
    data,
  });
}

/**
 * 登入
 *  */
export function postApiLogin(data = {}) {
  return promiseHandle({
    apiName: 'postApiLogin',
    url: 'elogin',
    method: 'post',
    data,
    headers: { 'content-type': 'text/plain' },
  });
}

/**
 * 登出
 *  */
export function getApiLogout(params = {}) {
  return promiseHandle({
    apiName: 'getApiLogout',
    url: 'logout',
    method: 'get',
    params,
  });
}

/**
 * 註冊
 */
export function postApiRegister(data = {}) {
  return promiseHandle({
    apiName: 'postApiRegister',
    url: urlDevice('/eregister'),
    method: 'post',
    data,
    headers: { 'content-type': 'text/plain' },
  });
}

/**
 * 檢查 帳號是否存在
 * @param {string} name
 */
export function postApiCheckName(data = {}) {
  return promiseHandle({
    apiName: 'postApiCheckName',
    url: urlReplace('/check/{name}', data),
    method: 'post',
    data,
  });
}

/**
 * 管理者以玩家身份登入操作
 * @param {string} token
 */
export function getApiAs(params = {}) {
  return promiseHandle({
    apiName: 'getApiAs',
    url: urlReplace('as/{token}', params),
    method: 'get',
    params,
  });
}

/**
 * 获取验证码
 */
export function getApiCaptcha(params = {}) {
  return promiseHandle({
    apiName: 'getApiCaptcha',
    url: 'captcha',
    method: 'get',
  });
}

/**
 * 發送手机验证码
 */
export function getApiCaptchaSms(params = {}) {
  return promiseHandle({
    apiName: 'getApiCaptchaSms',
    url: urlReplace('captcha_sms/{mobile}', params),
    method: 'get',
  });
}
