import app from '@/main';
import { setStorage, getStorage } from '../utils';
import { DEFAULT_LANGUAGE, DEFAULT_LANGUAGE_LIST } from '../consts';
const i18nStorageKey = '__global_front_stage_i18n';
// 所有能選擇的語言
const languageData = [
  {
    key: 'zh-CN',
    value: '简体中文',
  },
  {
    key: 'zh-TW',
    value: '繁體中文',
  },
  {
    key: 'en',
    value: 'English',
  },
];
const langageList = `${DEFAULT_LANGUAGE_LIST}`.split(',');
const state = {
  locale: getStorage(i18nStorageKey) ? getStorage(i18nStorageKey) : DEFAULT_LANGUAGE,
  langItem: languageData.filter(element => langageList.includes(element.key)),
};

const actions = {
  LOCALE_HANDLER({ commit, rootGetters }, params) {
    commit('SET_LOCALE', params.lang);
    switch (params.lang) {
      case 'en': {
        if (rootGetters.config.en_web_title) {
          commit('SET_BROWSER_TITLE', rootGetters.config.en_web_title);
          commit('SET_WEB_TITLE', rootGetters.config.en_title);
        } else {
          commit('SET_BROWSER_TITLE', rootGetters.config.en_title);
          commit('SET_WEB_TITLE', rootGetters.config.title);
        }
        break;
      }
      default: {
        if (rootGetters.config.web_title) {
          commit('SET_BROWSER_TITLE', rootGetters.config.web_title);
          commit('SET_WEB_TITLE', rootGetters.config.title);
        } else {
          commit('SET_BROWSER_TITLE', rootGetters.config.title);
          commit('SET_WEB_TITLE', rootGetters.config.title);
        }
        break;
      }
    }
  },
};

const mutations = {
  SET_LOCALE(state, payload) {
    state.locale = payload;
    app.$vuetify.lang.current = payload;
    app.$i18n.locale = payload;
    setStorage(i18nStorageKey, payload);
  },
};

const getters = {
  locale: state => state.locale,
  langItem: state => state.langItem,
};

export default {
  state,
  actions,
  mutations,
  getters,
};
