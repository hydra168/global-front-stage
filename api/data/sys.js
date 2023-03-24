import { promiseHandle } from '../promiseHandle';
import { urlDevice } from '../../utils';
import axios from 'axios';

/**
 * 系統相關 api
 * 命名規範 {method}Api{後端給的api名稱}
 */

//
export function getApiPing(params = {}) {
  return promiseHandle({
    apiName: 'getApiPing',
    url: urlDevice('/usercentre/ping'),
    method: 'get',
    params,
  });
}

// 相關配置
export function getApiConfigure(params = {}) {
  return promiseHandle({
    apiName: 'getApiConfigure',
    url: urlDevice('/configure'),
    method: 'get',
    params,
  });
}

// API 版本
export function getApiVersion() {
  return promiseHandle({
    apiName: 'getApiVersion',
    url: '/version',
    method: 'get',
  });
}

// 前端打包 版本
export function getPackageVersion() {
  return axios.get('../version.json');
}

// 取得地區限制時間戳
export function getTimeStamp() {
  return promiseHandle({
    apiName: 'getTimeStamp',
    url: '/timeStamp',
    method: 'get',
  });
}

// 取得地區限制
export function getForbiddenArea() {
  return promiseHandle({
    apiName: 'getForbiddenArea',
    url: '/forbiddenArea',
    method: 'get',
  });
}
