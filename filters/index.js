/* eslint-disable */
Date.prototype.Format = function (fmt) {
  //author: meizz
  let o = {
    'M+': this.getMonth() + 1, //月份
    'd+': this.getDate(), //日
    'h+': this.getHours(), //小时
    'H+': this.getHours() + 8, //小时
    'm+': this.getMinutes(), //分
    's+': this.getSeconds(), //秒
    'q+': Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  for (let k in o)
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
  return fmt;
};
const formatDate = value => {
  if (!value || value == '0001-01-01T00:00:00Z') return '--';
  value = new Date(value).Format('yyyy-MM-dd hh:mm:ss');
  return value;
};

const formatDateAdd8Hours = value => {
  if (!value || value == '0001-01-01T00:00:00Z') return '--';
  value = new Date(value.replace(/[-]/gi, '/')).Format('yyyy-MM-dd HH:mm:ss');
  return value;
};
const formatD = value => {
  if (!value || value == '0001-01-01T00:00:00Z') return '--';
  value = new Date(value).Format('yyyy-MM-dd');
  return value;
};
const formatT = value => {
  if (!value || value == '0001-01-01T00:00:00Z') return '--';
  value = new Date(value).Format('hh:mm:ss');
  return value;
};

// 金額加逗號 + 保留小數２位 (ex: 1,000,123.00元)
const money = (num, fixed = 2) => {
  num = isNaN(Number(num)) ? 0 : num;
  return Number(num).toLocaleString('ja-JP', {
    minimumFractionDigits: fixed,
    maximumFractionDigits: fixed,
  });
};

const recordLength = (result, key) => {
  this.$set(key, result.length);
  return result;
};

// 將日期格式化成 YYYY-MM-DD
const timeFormat2Day = date => {
  var Y = date.getFullYear();
  var M = date.getMonth() + 1;
  var D = date.getDate();
  return Y + '-' + (M < 10 ? '0' + M : M) + '-' + (D < 10 ? '0' + D : D);
};
const pureHtml = html => {
  return html
    .replace(/style=\"([^"]*)\"/gi, '')
    .replace(/[<]strong[>]/gi, '')
    .replace(/[<]\/strong[>]/gi, '');
};
const timediff = (diff = 0) => {
  diff = isNaN(Number(diff)) ? 0 : Number(diff);
  const intervals = {
    second: 1 * 1000,
    minute: 1 * 60 * 1000,
    hour: 1 * 60 * 60 * 1000,
    day: 1 * 60 * 60 * 24 * 1000,
  };
  let formatStr = '';
  const days = Math.floor(diff / intervals.day);
  diff -= days * intervals.day;
  const hours = Math.floor(diff / intervals.hour);
  diff -= hours * intervals.hour;
  const minutes = Math.floor(diff / intervals.minute);
  diff -= minutes * intervals.minute;
  const sec = Math.floor(diff / intervals.second);
  diff -= sec * intervals.second;
  formatStr += days ? `${days}d ` : '';
  formatStr += hours ? `${hours}h ` : '';
  formatStr += minutes ? `${minutes}min ` : '';
  formatStr += sec ? `${sec}s` : '';
  formatStr += `:${diff}ms`;
  return formatStr;
};
export { formatDate, formatDateAdd8Hours, formatD, formatT, money, recordLength, timeFormat2Day, pureHtml, timediff };
