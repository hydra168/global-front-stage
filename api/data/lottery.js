import { promiseHandle } from '../promiseHandle';
import { urlReplace, urlDevice } from '../../utils';

/**
 * 終極 ultimate
 * @param {string} tz 時間差： new Date().getTimezoneOffset()
 */
export function getApiUltimate(params = { tz: '' }) {
  return promiseHandle({
    apiName: 'getApiUltimate',
    url: urlReplace(urlDevice('/ultimate?zone={tz}'), params),
    method: 'get',
    params: {},
  });
}

/**
 * 彩票 lottery
 * @param {string} tz 時間差： new Date().getTimezoneOffset()
 */
export function getApiLottery(params = { tz: '' }) {
  return promiseHandle({
    apiName: 'getApiLottery',
    url: urlReplace(urlDevice('/lottery?zone={tz}'), params),
    method: 'get',
    params: {},
  });
}
