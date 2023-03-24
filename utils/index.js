import JSEncrypt from 'jsencrypt';
import lodash from 'lodash';
import publicKey from '../assets/publicKey';
import { store } from '../modules';
import { COUNTRY } from '@G/consts';

/**
 * 動態替換 url
 *  */
export const urlReplace = (url, obj) => {
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
    console.error(`${url}: urlReplace error: api 傳送格式有誤，請確認`);
  }
};

/**
 * 動態替換 device url
 */
export const urlDevice = url => {
  return store.getters.isMobile ? `/m${url}` : `/pc${url}`;
};

// DODO   Storage 加密
/**
 * setStorage
 * @param {string} key
 * @param {string, object} val
 */
export const setStorage = (key, val) => {
  if (key && (val || typeof val === 'boolean' || typeof val === 'number')) {
    localStorage.setItem(key, JSON.stringify(val));
  } else {
    console.error('儲存 localstorage 的格式錯誤，請確認有設定相關的數值');
  }
};

/**
 * getStorage(get)
 * @param {string} key
 */
export const getStorage = key => {
  if (key) {
    let val = localStorage.getItem(key);
    return JSON.parse(val);
  } else {
    console.error('儲存 localstorage 的格式錯誤，請確認有設定相關的數值');
  }
};

/**
 * removeStorage(remove)
 * @param {string} key
 */

/**
 * 帳密 加密
 * @param {string} key
 */
export const encrypted = (userInfo = {}) => {
  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(publicKey);
  return encrypt.encrypt(JSON.stringify(userInfo));
};

/**
 * 載入元件
 */
// pc
export const loadView_pc = (view, group) => {
  switch (group) {
    case 'userCentre':
      return () => import(/*webpackChunkName:'pc-userCentre-[request]'*/ `@VIEWS/pc/${group}/${view}.vue`);
    case 'helpCentre':
      return () => import(/*webpackChunkName:'pc-helpCentre-[request]'*/ `@VIEWS/pc/${group}/${view}.vue`);
    default:
      return () => import(/*webpackChunkName:'pc-[request]'*/ `@VIEWS/pc/${view}.vue`);
  }
};
// mobile
export const loadView_mobile = (view, group) => {
  switch (group) {
    case 'userCentre':
      return () => import(/*webpackChunkName:'mobile-userCentre-[request]'*/ `@VIEWS/mobile/${group}/${view}.vue`);
    default:
      return () => import(/*webpackChunkName:'mobile-[request]'*/ `@VIEWS/mobile/${view}.vue`);
  }
};

/**
 * 合併陣列相同index 後者覆蓋前者 以最新的為主
 */
export const mergeArrayObjects = (contents, defaultContents) => {
  const a = lodash.cloneDeep(contents);
  const b = lodash.cloneDeep(defaultContents);
  a.forEach((obj, i) => {
    Object.keys(obj).forEach(key => {
      if (b[i] && b[i][key]) {
        if (a[i][key]) {
          b[i][key] = a[i][key];
        }
      }
    });
  });
  return b;
};

/**
 * 合併陣列相同 code 後者覆蓋前者 無匹配到將新增項目
 * 必要 key值 code, show
 */
export const mergeArrayObjectsCode = (contents, defaultContents) => {
  if (!contents.length) return defaultContents;
  const optsData = lodash.cloneDeep(contents);
  const orgData = lodash.cloneDeep(defaultContents);
  optsData.forEach(opts => {
    const index = orgData.findIndex(org => opts.code === org.code);
    if (index >= 0) {
      // 比對到 將依 key 進行修改
      Object.keys(opts).forEach(key => {
        orgData[index][key] = opts[key];
      });
    } else {
      // 比對不到就新增整條 obj
      orgData.push(opts);
    }
  });
  // 濾掉 show = false
  return orgData.filter(item => item.show).sort((a, b) => (a.sort < b.sort ? -1 : a.sort > b.sort ? 1 : 0));
};

/**
 * 深層拷貝
 * @param {Object|Array} value
 * @returns {Object|Array}
 */
export const deepCopy = value => {
  return JSON.parse(JSON.stringify(value));
};

export const textReplacer = (regex, str, value) => {
  return str.replace(regex, value);
};

export const copyToClipboard = ({ dom, successCb, errorCb }) => {
  try {
    dom.select();
    dom.setSelectionRange(0, 99999);
    document.execCommand('copy');
    if (successCb) successCb();
  } catch (e) {
    if (errorCb) errorCb();
  }
};

export const getValidator = key => {
  if (key === 'mobile') {
    if (COUNTRY === 'china') {
      return /^[1][3456789][0-9]{9}$/;
    } else if (COUNTRY === 'hongkong') {
      return /^[\d]{10}$/;
    } else if (COUNTRY === 'india') {
      return /^[\d]{10}$/;
    } else if (COUNTRY === 'china+india') {
      return /^[\d]{10,11}$/;
    }
  }
};

export const isSE = () => !!navigator.userAgent.match(/SE 2.x/gi);

export const cardStarText = (text = '') => {
  return text
    .trim()
    .split('')
    .map((e, index, Arr) => {
      if (index < 4 || index > Arr.length - 5) {
        return e;
      }
      return '*';
    })
    .join('');
};
export const testImage = obj => {
  const tester = new Image();
  obj.loaded = false;
  tester.onload = () => {
    obj.loaded = true;
    this.$forceUpdate();
  };
  tester.src = obj.src;
};

const CharAndNumberText = '1234567890abcdefghijkllmnopqrstuvwxyzABCBEFGHIJKLMNOPQRSTUVWXYZ';
// const CharText = 'abcdefghijkllmnopqrstuvwxyzABCBEFGHIJKLMNOPQRSTUVWXYZ',

function createName() {
  return Array(8)
    .fill(0)
    .map((element, index) => {
      return index < 4 ? CharAndNumberText[Math.floor(Math.random() * CharAndNumberText.length)] : '*';
    })
    .join('');
}

export function createFakeLeaderBoardData(fakeDataCount = 56, option = {}) {
  return Array(fakeDataCount)
    .fill(0)
    .map((element, index) => {
      return {
        name: createName(),
        number: 9999 + Math.floor(Math.random() * 90000),
      };
    });
}

export function format(text) {
  const map = store.getters.textTransMap;

  map?.forEach((str, k) => {
    text = text?.replace?.(new RegExp(k, 'ig'), str);
  });
  return text;
}
