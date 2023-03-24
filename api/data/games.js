import { promiseHandle } from '../promiseHandle';
import { urlReplace, urlDevice } from '../../utils';

/**
 * 遊戲相關 api
 * 命名規範 {method}Api{後端給的api名稱}
 */

/**
 * 遊戲連結
 * @param {String} id 遊戲id
 * @param {string} tz 時間差： new Date().getTimezoneOffset()
 * @param {string} room VIP2： 房間 初級房  中等房 高級房
 *  */
export function getApiGame(params = {}) {
  return promiseHandle({
    apiName: 'getApiGame',
    url: urlReplace(urlDevice(`/game/{id}`), params),
    method: 'get',
    params: { room: params.room || null, zone: params.zone },
  });
}

/**
 * 電子遊藝列表
 * @param {String} id
 *  */
export function getApiGameSlot(params = {}) {
  return promiseHandle({
    apiName: 'getApiGameSlot',
    url: urlReplace('/pc/game/slot/{id}', params),
    method: 'get',
    params,
  });
}

/**
 * 遊戲列表
 * // DODO m 不需要登入 pc 需要登入
 *  */
export function getApiGameList(params = {}) {
  return promiseHandle({
    apiName: 'getApiGameList',
    url: '/m/game/list',
    method: 'get',
    params,
  });
}

/**
 * p 取得 遊戲紀錄列表
 * @param {string} page 當前頁數
 * @param {string} num 當前頁數比數
 * @param {string} s 開始時間....
 * @param {string} e 結束時間....
 */
export function getApiGameRecordList(params = {}) {
  return promiseHandle({
    apiName: 'getApiGameRecordList',
    url: urlReplace('/pc/usercentre/games', params),
    method: 'get',
    params,
  });
}

/**
 * m 取得 遊戲紀錄列表
 * @param {string} page 當前頁數
 * @param {string} num 當前頁數比數
 * @param {string} s 開始時間....
 * @param {string} e 結束時間....
 */
export function getApiGameLogRecordList(params = {}) {
  return promiseHandle({
    apiName: 'getApiGameRecordList',
    url: urlReplace('/m/usercentre/gamelogs', params),
    method: 'get',
    params,
  });
}

/**
 * Promo 遊戲連結
 * @param {String} type 遊戲類型 真人live,棋牌chess,捕魚fish,電子slot
 * @param {String} id 遊戲id
 *  */
export function getApiGamePromo(params = {}) {
  return promiseHandle({
    apiName: 'getApiGamePromo',
    url: urlReplace('/promo/{type}/{id}', params),
    method: 'get',
    // params,
  });
}

// 游戏分类列表/api/games/gamemenu
export function getGameTypes() {
  return promiseHandle({
    apiName: 'getApiGamePromo',
    url: '/pc/gamemenu',
    method: 'get',
    // params,
  });
}
