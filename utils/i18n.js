import app from '@/main';

// i18n 文字轉換
export const getI18n = text => {
  return app.$t(text);
};

/*
i18n 文字替換
規劃套用位置：component/layout
語系key值命名規範：除前綴詞 g_ 外，後續一致，以便後續區別劃分。
應用情境：各站文字有異，可以藉由在各站的語系檔上設定，即可替換文字。
**/

export const textFilter = (key, prefix, slot, comp, defaultVal = '') => {
  // 多語鍵為中文直接回傳
  if (/[\u4E00-\u9FFF]+/g.test(key)) {
    return key;
  }
  if (/copyright1/.test(key)) {
    console.log(slot);
    console.log(app.$t(`g_${prefix}${key}`, { year: 2020 }));
  }
  if ((!app || !app.$te || !app.$t) && (!comp || !comp.$te || !comp.$t)) {
    return defaultVal;
  }
  const text = `${prefix}${key}`;
  if (app) {
    if (slot) {
      return app.$te(text) ? app.$t(text, slot) : app.$t(`g_${text}`, slot);
    } else {
      return app.$te(text) ? app.$t(text) : app.$t(`g_${text}`);
    }
  } else if (comp) {
    return comp.$te(text) ? comp.$t(text, slot) : comp.$t(`g_${text}`, slot);
  } else {
    // console.log(text);
  }
};
