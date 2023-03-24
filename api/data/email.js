import { promiseHandle } from '../promiseHandle';
import { urlReplace, urlDevice } from '../../utils';

/**
 * 站內信相關
 *  */
/**
 * 取得 站內信列表
 * @param {string} page 當前頁數
 * @param {string} page_num 當前頁數筆數
 * @param {string} is_show_all 顯示全部1....
 */
export function getApiStationLetterList(params = {}) {
  return promiseHandle({
    apiName: 'getApiStationLetterList',
    url: urlDevice('/usercentre/stationletter/list'),
    method: 'get',
    params,
  });
}
/**
 * 取得 站內信
 * @param {string} page 當前頁數
 * @param {string} page_num 當前頁數筆數
 * @param {string} is_show_all 顯示全部1....
 */
export function getApiStationLetter(params = {}) {
  return promiseHandle({
    apiName: 'getApiStationLetter',
    url: urlDevice(`/usercentre/stationletter/${params.id}`),
    method: 'get',
    params,
  });
}
/**
 * 取得 站內信
 * @param {string} id 當前頁數
 */
export function postApiReceiveReward(data = {}) {
  return promiseHandle({
    apiName: 'postApiReceiveReward',
    url: urlDevice(`/usercentre/stationletter/receive`),
    method: 'post',
    data,
  });
}

/**
 * 刪除 站內信
 * @param {string} ids 刪除ids....
 */
export function postDeleteMail(data = {}) {
  return promiseHandle({
    apiName: 'postDeleteMail',
    url: urlDevice(`/usercentre/stationletter/delete`),
    method: 'post',
    data,
  });
}
