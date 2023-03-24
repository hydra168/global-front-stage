import { isMobile } from '@G/consts';
import transformApi from '../transformApi';

/**
 * 動態替換 url
 *  */
const urlReplace = (url, obj) => {
  let checkUrl = typeof url === 'string' && url.length !== 0;
  let checkObj = typeof obj === 'object' && !Array.isArray(obj) && Object.keys(obj).length !== 0;
  if (checkUrl && checkObj) {
    Object.keys(obj).forEach(i => {
      let regExp = new RegExp(`{${i}}`, 'g');
      let replaceText = obj[i];
      url = url.replace(regExp, replaceText);
    });
    return url;
  } else {
    console.error('urlReplace error: api 傳送格式有誤，請確認');
  }
};

/**
 * 動態替換 device url
 */
const urlDevice = url => {
  return isMobile ? `/m${url}` : `/pc${url}`;
};

// 總覽（團隊今日訊息）
export function getApiSummary(params = {}) {
  return transformApi({
    apiName: 'getApiSummary',
    url: urlDevice('/user-agent/summary'),
    method: 'get',
    params,
  });
}

// 總覽（團隊每日訊息）
export function getApiDaily(params = {}) {
  return transformApi({
    apiName: 'getApiDaily',
    url: urlDevice('/user-agent/summary/daily'),
    method: 'get',
    params,
  });
}

// 代理推廣
export function getApiLinks(params = {}) {
  return transformApi({
    apiName: 'getApiLinks',
    url: urlDevice('/user-agent/links'),
    method: 'get',
    params,
  });
}

// 團隊管理
export function getApiTeam(params = {}) {
  return transformApi({
    apiName: 'getApiTeam',
    url: urlDevice('/user-agent/team'),
    method: 'get',
    params,
  });
}

// 顯示返點反佣
export function getApiTeamRebate(params = {}) {
  return transformApi({
    apiName: 'getApiTeamRebate',
    url: urlDevice(urlReplace('/user-agent/team/{target_id}/setting', params)),
    method: 'get',
    params,
  });
}

// 修改備註
export function putApiTeamRemark(data = {}) {
  return transformApi({
    apiName: 'putApiTeamRemark',
    url: urlDevice(urlReplace('/user-agent/team/{target_id}', data)),
    method: 'put',
    data,
  });
}

// 查看團隊
export function getApiTeamItem(params = {}) {
  return transformApi({
    apiName: 'getApiTeamItem',
    url: urlDevice(urlReplace('/user-agent/{sub_id}/team', params)),
    method: 'get',
    params,
  });
}

// 代理錢包
export function getApiBalance(params = {}) {
  return transformApi({
    apiName: 'getApiBalance',
    url: urlDevice('/user-agent/balance'),
    method: 'get',
    params,
  });
}

// 代理錢包帳變紀錄
export function getApiBalanceLog(params = {}) {
  return transformApi({
    apiName: 'getApiBalanceLog',
    url: urlDevice('/user-agent/balance/log'),
    method: 'get',
    params,
  });
}

// 代理錢包轉主錢包
export function postApiAgentBalance(data = {}) {
  return transformApi({
    apiName: 'postApiAgentBalance',
    url: urlDevice('/user-agent/balance'),
    method: 'post',
    data,
  });
}
