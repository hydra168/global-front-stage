import { promiseHandle } from '../promiseHandle';
import { urlDevice, urlReplace } from '../../utils';

// 總覽（團隊今日訊息）
export function getApiSummary(params = {}) {
  return promiseHandle({
    apiName: 'getApiSummary',
    url: urlDevice('/user-agent/summary'),
    method: 'get',
    params,
  });
}

// 總覽（團隊每日訊息）
export function getApiDaily(params = {}) {
  return promiseHandle({
    apiName: 'getApiDaily',
    url: urlDevice('/user-agent/summary/daily'),
    method: 'get',
    params,
  });
}

// 代理推廣
export function getApiLinks(params = {}) {
  return promiseHandle({
    apiName: 'getApiLinks',
    url: urlDevice('/user-agent/links'),
    method: 'get',
    params,
  });
}

// 團隊管理
export function getApiTeam(params = {}) {
  return promiseHandle({
    apiName: 'getApiTeam',
    url: urlDevice('/user-agent/team'),
    method: 'get',
    params,
  });
}

// 顯示返點反佣
export function getApiTeamRebate(params = {}) {
  return promiseHandle({
    apiName: 'getApiTeamRebate',
    url: urlDevice(urlReplace('/user-agent/team/{target_id}/setting', params)),
    method: 'get',
    params,
  });
}

// 修改備註
export function putApiTeamRemark(data = {}) {
  return promiseHandle({
    apiName: 'putApiTeamRemark',
    url: urlDevice(urlReplace('/user-agent/team/{target_id}', data)),
    method: 'put',
    data,
  });
}

// 查看團隊
export function getApiTeamItem(params = {}) {
  return promiseHandle({
    apiName: 'getApiTeamItem',
    url: urlDevice(urlReplace('/user-agent/{sub_id}/team', params)),
    method: 'get',
    params,
  });
}

// 代理錢包
export function getApiBalance(params = {}) {
  return promiseHandle({
    apiName: 'getApiBalance',
    url: urlDevice('/user-agent/balance'),
    method: 'get',
    params,
  });
}

// 代理錢包帳變紀錄
export function getApiBalanceLog(params = {}) {
  return promiseHandle({
    apiName: 'getApiBalanceLog',
    url: urlDevice('/user-agent/balance/log'),
    method: 'get',
    params,
  });
}

// 代理錢包轉主錢包
export function postApiAgentBalance(data = {}) {
  return promiseHandle({
    apiName: 'postApiAgentBalance',
    url: urlDevice('/user-agent/balance'),
    method: 'post',
    data,
  });
}
