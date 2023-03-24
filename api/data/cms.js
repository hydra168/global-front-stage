import { promiseHandle } from '../promiseHandle';
import { urlReplace, urlDevice } from '../../utils';

/**
 * 後台內容管理項目 相關 api
 */

/**
 * 前台元件
 */
// 選單
export function getApiMenu(params = {}) {
  return promiseHandle({
    apiName: 'getApiMenu',
    url: urlDevice('/menus'),
    method: 'get',
    params,
  });
}
export function getApiLottoryList(params = {}) {
  return promiseHandle({
    apiName: 'getApiLottoryList',
    url: urlDevice('/gamegroups'),
    method: 'get',
    params,
  });
}

// 輪播圖
export function getApiSpotlights(params = {}) {
  return promiseHandle({
    apiName: 'getApiSpotlights',
    url: urlDevice('/spotlights'),
    method: 'get',
    params,
  });
}

// 公告
export function getApiBoardList(params = {}) {
  return promiseHandle({
    apiName: 'getApiBoardList',
    url: urlDevice('/boards'),
    method: 'get',
    params,
  });
}

// 彈窗公告
export function getApiAnnouncementList(params = {}) {
  return promiseHandle({
    apiName: 'getApiAnnouncementList',
    url: urlDevice('/announcement'),
    method: 'get',
    params,
  });
}

// 展示文章
export function getArticleList(params = {}) {
  return promiseHandle({
    apiName: 'getArticleList',
    url: urlDevice('/articles'),
    method: 'get',
    params,
  });
}

/**
 * 幫助中心
 *  */
// 取得 幫助中心列表
export function getApiHelperList(params = {}) {
  return promiseHandle({
    apiName: 'getApiHelperList',
    url: urlDevice('/helper'),
    method: 'get',
    params,
  });
}

// 取得 幫助中心列表 @params {String} id 列表項目id
export function getApiHelper(params = {}) {
  return promiseHandle({
    apiName: 'getApiHelper',
    url: urlDevice(`/helper/${params.code}`),
    method: 'get',
  });
}

/**
 * 優惠活動
 *  */
// 取得優惠活動列表
export function getApiPromotionList(params = {}) {
  return promiseHandle({
    apiName: 'getApiPromotionList',
    url: '/pc/promotion/list',
    method: 'get',
    params,
  });
}

// 取得優惠活動列表
export function getApiPromotionPic(params = {}) {
  return promiseHandle({
    apiName: 'getApiPromotionPic',
    url: urlDevice('/promotion/pic'),
    method: 'get',
    params,
  });
}

// 取得優惠活動明細
// @params {String} id 要查詢的活動id
export function getApiPromotionDetail(params = {}) {
  return promiseHandle({
    apiName: 'getApiPromotionDetail',
    url: urlReplace('/pc/promotion/details/{id}', params),
    method: 'get',
    params,
  });
}
