import { getApiPing, getApiConfigure, getApiVersion, getPackageVersion, getTimeStamp, getForbiddenArea } from '../api/data/sys';
import { isMobile, IS_USERCENTRE_DIALOG, IS_HELPCENTRE_DIALOG, OPEN_WINDOW_ZENDESK_CHAT } from '../consts';
import { gsap } from 'gsap';
import { router } from '../router';
import { timediff } from '@G/filters';
import app from '@/main';

const timeStampStorage = '__timestamp__';
const forbiddenAreaStorage = '__forbiddenArea__';
const apiVersion = '__apiVersion__';

const state = {
  webTitle: '', // 全站名稱
  // apiVersion: '', //api 版本
  apiVersion: JSON.parse(window.localStorage.getItem(apiVersion)) || null,
  packageVersion: null,
  isErrorInfo: { apiName: '', isError: '' }, // 全域 error
  isLoading: false, // 全域 loading
  isLoadingBar: { show: false, message: '' }, // 全域 loading 自訂文字
  messageBar: { show: false, message: '', type: 'error' }, // 全域 snackBar info
  globalBox: '', // LoginBox: 登入 | RegisterBox: 註冊
  ping: null,
  isMobile,
  isMobileWidth: 992,
  config: {
    isLoading: true,
  },
  userAgent: window.navigator.userAgent,
  isReactNativeApp: window.ReactNativeWebView ? true : false,
  // isAndroidApp:
  //   /android.*build*wv/i.test(window.navigator.userAgent.toLowerCase()) &&
  //   !/(micromessenger|mqqbrowser|MQQBrowser|QQ|QQBrowser|qq|qqbrowser|sogoumobilebrowser|baidubrowser|baiduhd|baiduboxapp|vivobrowser|metasr|se|360se|ucweb|ubrowser|ucbrowser)/i.test(
  //     window.navigator.userAgent.toLowerCase()
  //   ), //android
  // isIOSApp:
  //   /(iphone|ipad|ipod)/i.test(window.navigator.userAgent.toLowerCase()) &&
  //   !/(crios|safari|micromessenger|MQQBrowser|QQ|QQBrowser|qq|mqqbrowser|qqbrowser|sogoumobilebrowser|baidubrowser|baiduhd|baiduboxapp|vivobrowser|metasr|se|360se|ucweb|ubrowser|ucbrowser)/i.test(
  //     window.navigator.userAgent.toLowerCase()
  //   ),
  isAndroidApp: Boolean(window.test?.hello) || Boolean(window.$App?.openSystemWebview), //android
  isIOSApp: Boolean(window.webkit?.messageHandlers?.openSystemWebview?.hello), //ios
  isFlutterApp: Boolean(window.appobject?.postMessage),
  zendeskStatus: 1, // zendesk 客服狀態  1: 不使用或載入中, 0: 載入完成
  liveChatStatus: 1, // liveChat 客服狀態  1: 不使用或載入中, 0: 載入完成
  tawkStatus: 1, // tawk 客服狀態  1: 不使用或載入中, 0: 載入完成
  meiQiaStatus: 1, // meiqia 客服狀態  1: 不使用或載入中, 0: 載入完成
  chatWootStatus: 1, // ChatWoot  客服狀態  1: 不使用或載入中, 0: 載入完成
  freshchatStatus: 1, // freshchat 客服狀態  1: 不使用或載入中, 0: 載入完成
  whisperStatus: 1, // whisper 客服狀態  1: 不使用或載入中, 0: 載入完成
  isUserCentreDialog: IS_USERCENTRE_DIALOG,
  isHelpCentreDialog: IS_HELPCENTRE_DIALOG,
  userCentreDialogPath: '',
  helpCentreDialogPath: '',
  dialogPageType: '',
  dialogPagePath: '',
  timeStamp: window.localStorage.getItem(timeStampStorage) || null,
  forbiddenArea: window.localStorage.getItem(forbiddenAreaStorage) || null,
  openWindowZendeskChat: OPEN_WINDOW_ZENDESK_CHAT, // zendesk 是否另開客服視窗  true: 要另開, false: 不開
  checkAppMethodLog: '',
  loadedTime: null,
  loadedTime1: null,
  loadedTime2: null,
  loadedTime3: null,
  imWindow: null,
};
const actions = {
  ONLOAD({ dispatch, state }) {
    dispatch('MAKE_SALT'); // 加鹽
    dispatch('CHECK_USER_LOGIN');
    dispatch('CHECK_THIRDPARTYCHAT_STATUS');
    dispatch('CHECK_TIMESTAMP');
    dispatch('GET_PACKAGE_VERSION');
    state.loadedTime = new Date() * 1;
    dispatch('CHECK_NATIVE_METHOD');
  },
  async GET_API_VERSION({ commit }) {
    if (state.apiVersion && state.apiVersion.expires > new Date() * 1) {
      return;
    }
    await getApiVersion().then(res => {
      if (res.isError) {
        res.isOpen && commit('SET_MESSAGE', { message: res.error });
      } else {
        commit('SET_API_VERSION', res.version);
      }
    });
  },
  async GET_PACKAGE_VERSION({ state, commit }) {
    await getPackageVersion()
      .then(res => {
        state.packageVersion = res.data;
      })
      .catch(err => {
        if (err.status === 404) {
          console.log('version.json not found.');
        }
      });
  },
  GET_PING({ commit, rootGetters }) {
    if (rootGetters.ping != null) return;
    let timer = window.setInterval(() => {
      if (rootGetters.token) {
        const res = getApiPing();
        res.isError && res.isOpen && commit('SET_MESSAGE', { message: res.error });
      }
    }, 10000);
    commit('SET_PING', timer);
  },
  async GET_CONFIGURE({ commit }) {
    return new Promise((resolve, reject) => {
      getApiConfigure().then(res => {
        if (res.isError) {
          res.isOpen && commit('SET_MESSAGE', { message: res.error });
          reject(res);
        } else {
          commit('SET_CONFIG', res.result);
          resolve(res.result);
        }
      });
    });
  },
  /**
   * 其他 -----------------------------
   */
  // 在線客服
  SHOW_LIVE_CHAT({ commit, dispatch, state, rootGetters }, type) {
    const { toggleCustomService } = window;
    if (type === 0) {
      if (!state.zendeskStatus) {
        switch (state.openWindowZendeskChat) {
          case true:
            window.$zopim.livechat.window.openPopout(); //zendesk 另開客服視窗
            break;
          default:
            window.$zopim.livechat.window.show();
            break;
        }
      } else if (!state.tawkStatus) {
        toggleCustomService();
      } else if (!state.liveChatStatus) {
        window.LiveChatWidget.call('maximize');
      } else if (!state.meiQiaStatus) {
        window._MEIQIA('showPanel');
      } else if (!state.chatWootStatus) {
        window.chatwootSDK.toggle();
      } else if (!state.freshchatStatus) {
        if (!window.fcWidget.isOpen()) {
          window.fcWidget.open();
        } else {
          window.fcWidget.close();
        }
      } else if (!state.whisperStatus) {
        const { isNativeApp, userInfo } = rootGetters;
        const { live_chat_whisper } = rootGetters.config;
        const url = `${live_chat_whisper}&name=${userInfo.Name}&uid=${userInfo.id}`;
        if (isNativeApp) {
          dispatch('NATIVE_OPEN_URL', url);
        } else {
          window.open(url);
        }
      } else {
        commit('SET_MESSAGE', { message: rootGetters.config.LiveChat_Null_Tips || app.$t('g_modules_sys_liveChatLater'), type: 'error' });
      }
    } else if (!state.zendeskStatus && !type) {
      switch (state.openWindowZendeskChat) {
        case true:
          window.$zopim.livechat.window.openPopout(); //zendesk 另開客服視窗
          break;
        default:
          window.$zopim.livechat.window.show();
          break;
      }
    } else if (type === 1) {
      switch (state.tawkStatus) {
        case 0: // tawk 客服狀態  1: 不使用或載入中, 0: 載入完成
          toggleCustomService();
          break;
        default:
          window.$zopim.livechat.window.show();
          break;
      }
    } else if (!state.liveChatStatus && type === 2) {
      const { visibility } = window.LiveChatWidget.get('state');
      if (visibility == 'maximized') {
        window.LiveChatWidget.call('minimize');
      } else {
        window.LiveChatWidget.call('maximize');
      }
    } else if (!state.meiQiaStatus && type === 3) {
      window._MEIQIA('showPanel');
    } else if (!state.chatWootStatus && type === 4) {
      window.$chatwoot.toggle();
    } else if (!state.freshchatStatus && type === 5) {
      if (!window.fcWidget.isOpen) {
        window.fcWidget.open();
      } else {
        window.fcWidget.close();
      }
    } else if (!state.zendeskStatus && type === 6) {
      window.$zopim?.livechat?.window?.show(); // only ZendeskChat客服
    } else if (!state.whisperStatus && type === 7) {
      const { isNativeApp, userInfo } = rootGetters;
      const { live_chat_whisper } = rootGetters.config;
      let url;
      if (userInfo.Name && window.localStorage.getItem('userInfo')) {
        url = `${live_chat_whisper}?name=${userInfo.Name}&uid=${userInfo.id}`;
      } else {
        url = `${live_chat_whisper}`;
      }

      if (isNativeApp) {
        dispatch('NATIVE_OPEN_URL', url);
      } else {
        window.open(url);
      }
    } else {
      commit('SET_MESSAGE', { message: rootGetters.config.LiveChat_Null_Tips || app.$t('g_modules_sys_liveChatLater'), type: 'error' });
    }
  },
  // mobile 跳轉下載頁
  GET_APP_DOWNLOAD({ rootGetters }) {
    let url = `${rootGetters.config.app || ''}&lang=${rootGetters.locale}&templatetype=${rootGetters.config.appdownload_template_type || 'complex'}`;
    if (rootGetters.config.app && rootGetters.config.ios_download) {
      url = `${rootGetters.config.app || ''}?iosdownload=${encodeURIComponent(rootGetters.config.ios_download) || ''}&lang=${
        rootGetters.locale
      }&templatetype=${rootGetters.config.appdownload_template_type || 'complex'}`;
    }
    const elementA = document.createElement('a');
    elementA.href = url;
    elementA.target = '_blank';
    elementA.click();
  },
  // 檢查各種在線客服
  CHECK_THIRDPARTYCHAT_STATUS: ({ commit, state, rootGetters }) => {
    const statusTawk = setInterval(() => {
      if (window.isTawkLoaded) {
        clearInterval(statusTawk);
        commit('SET_TAWK_STATUS', 0);
      }
    }, 1000);
    const statusZendesk = setInterval(() => {
      if (window.$zopim) {
        clearInterval(statusZendesk);
        commit('SET_ZENDESK_STATUS', 0);
      }
    }, 1000);
    const statusLiveChat = setInterval(() => {
      if (window.__lc) {
        clearInterval(statusLiveChat);
        commit('SET_LIVECHAT_STATUS', 0);
      }
    }, 1000);
    const statusMeiQia = setInterval(() => {
      if (window._MEIQIA) {
        clearInterval(statusMeiQia);
        commit('SET_MEIQIA_STATUS', 0);
      }
    }, 1000);
    const statusChatWoot = setInterval(() => {
      if (window.chatwootSDK) {
        clearInterval(statusChatWoot);
        commit('SET_CHATWOOT_STATUS', 0);
      }
    }, 1000);
    const statusFreshchat = setInterval(() => {
      if (window.fcWidget) {
        clearInterval(statusFreshchat);
        commit('SET_FRESHCHAT_STATUS', 0);
      }
    }, 1000);
    const statusWhisper = setInterval(() => {
      const { live_chat_whisper } = rootGetters.config;
      if (live_chat_whisper) {
        clearInterval(statusWhisper);
        commit('SET_WHISPER_STATUS', 0);
      }
    }, 1000);
  },
  PAGE_GO_TOP: () => {
    gsap.to('html,body', { scrollTop: 0, duration: 0.5 });
  },

  async GET_FORBIDDEN_AREA({ commit }) {
    const forbiddenArea = await getForbiddenArea().then(res => {
      if (res.status === 403) {
        router.push({ name: 'error403', params: res });
        return res.data;
      } else {
        return res;
      }
    });
    commit('SET_FORBIDDEN_AREA', forbiddenArea);
  },
  async CHECK_TIMESTAMP({ commit, dispatch }) {
    const currentStamp = await getTimeStamp().then(res => {
      if (res.isError) {
        res.isOpen && commit('SET_MESSAGE', { message: res.error });
      } else {
        return res.timeStamp;
      }
    });
    if (currentStamp != state.timeStamp) {
      commit('SET_TIMESTAMP', currentStamp);
      await dispatch('GET_FORBIDDEN_AREA');
    }
    const forbid = getters.forbiddenArea();
    if (forbid.blackip) {
      const { blackip, error } = forbid;
      commit('SET_MESSAGE', { message: error });
      router.push({ name: 'error403', params: { blackip } });
    }
  },
  NATIVE_OPEN_URL({ state, dispatch }, url) {
    if (state.isIOSApp) {
      window.webkit?.messageHandlers?.openSystemWebview?.postMessage(url);
    } else if (state.isAndroidApp) {
      window.$App?.openSystemWebview && window.$App?.openSystemWebview(url);
      window.test?.hello && window.test?.hello(url);
    } else if (state.isFlutterApp) {
      window.appobject?.postMessage && window.appobject?.postMessage(`{"action":3,"message":"","url":"${url}"}`);
    } else {
      dispatch('WEB_OPEN_URL', url);
    }
  },
  WEB_OPEN_URL({ state }, url) {
    if (!state.imWindow || state.imWindow.closed) {
      state.imWindow = window.open(url);
    } else {
      state.imWindow.location.href = url;
    }
  },
  CHECK_NATIVE_METHOD({ state }) {
    const timeSpent = { ios: 0, android: 0 };
    const tick = setInterval(() => {
      const now = new Date() * 1;
      const duration = now - state.loadedTime;
      state.checkAppMethodLog = '';
      state.isIOSApp = Boolean(window.webkit?.messageHandlers?.openSystemWebview);
      state.isAndroidApp = Boolean(window.test?.hello || window.$App?.openSystemWebview);
      if (!state.isAndroidApp) {
        timeSpent.android = timediff(duration);
      }
      if (!state.isIOSApp) {
        timeSpent.ios = timediff(duration);
      }
      if (!state.isFlutterApp) {
        timeSpent.flutter = timediff(duration);
      }
      state.checkAppMethodLog += `IOS openSystemWebview: ${window.webkit?.messageHandlers?.openSystemWebview} <br>Time spent: ${timeSpent.ios}<br>`;
      state.checkAppMethodLog += `Android test.hello: ${window.test?.hello} <br>Time spent: ${timeSpent.android}<br>`;
      if ((state.isAndroidApp && state.isAndroidApp) || state.isReactNativeApp) {
        clearInterval(tick);
      }
    }, 75);
  },
};

const mutations = {
  SET_DIALOG_PAGE(state, path) {
    if (path) {
      const arr = path.split('/');
      state.dialogPageType = arr[1];
      state.dialogPagePath = arr[2];
    }
  },
  CLEAR_DIALOG_PAGE(state) {
    state.dialogPageType = '';
  },
  /**
   * 全局 error
   * @param {string} apiName api 名稱
   * @param {Boolean} isError 是否錯誤
   */
  SET_ERROR_INFO(state, { apiName = '', isError = '' } = {}) {
    state.isErrorInfo = { apiName, isError };
  },
  SET_LOADING(state, payload) {
    state.isLoading = payload;
  },
  /**
   * 等待彈窗
   * @param {string} message 顯示文字
   */
  SET_LOADING_BAR(state, { show = true, message = '' } = {}) {
    state.isLoadingBar = { show, message };
  },
  /**
   * 開啟全局 modal box
   * LoginBox: 登入
   * RegisterBox: 註冊
   */
  SET_GLOBAL_BOX(state, payload) {
    state.globalBox = payload;
  },
  /**
   * 提示彈窗
   * @param {string} message 顯示文字
   * @param {type} type 主題 success/warning/info/error
   */
  SET_MESSAGE(state, { show = true, message = '', type = 'error' } = {}) {
    state.messageBar = { show, message, type };
  },
  SET_BROWSER_TITLE(state, payload = document.title) {
    document.title = payload;
  },
  SET_WEB_TITLE(state, payload) {
    state.webTitle = payload;
  },
  SET_CONFIG(state, payload) {
    state.config = payload;
  },
  SET_PING(state, b) {
    state.ping = b;
  },
  SET_IS_MOBILE(state, payload) {
    state.isMobile = payload;
  },
  SET_ZENDESK_STATUS(state, payload) {
    state.zendeskStatus = payload;
  },
  SET_LIVECHAT_STATUS(state, payload) {
    state.liveChatStatus = payload;
  },
  SET_TAWK_STATUS(state, payload) {
    state.tawkStatus = payload;
  },
  SET_MEIQIA_STATUS(state, payload) {
    state.meiQiaStatus = payload;
  },
  SET_CHATWOOT_STATUS(state, payload) {
    state.chatWootStatus = payload;
  },
  SET_FRESHCHAT_STATUS(state, payload) {
    state.freshchatStatus = payload;
  },
  SET_WHISPER_STATUS(state, payload) {
    state.whisperStatus = payload;
  },
  SET_API_VERSION(state, payload) {
    window.localStorage.setItem(
      apiVersion,
      JSON.stringify({
        version: payload,
        expires: new Date() * 1 + 20 * 1000, //20秒過期
      })
    );
  },
  SET_TIMESTAMP(state, payload) {
    state.timeStamp = payload;
    window.localStorage.setItem(timeStampStorage, payload);
  },
  SET_FORBIDDEN_AREA(state, payload) {
    window.localStorage.setItem(forbiddenAreaStorage, JSON.stringify(payload));
  },
};

const getters = {
  isErrorInfo: state => state.isErrorInfo,
  isLoading: state => state.isLoading,
  isLoadingBar: state => state.isLoadingBar,
  messageBar: state => state.messageBar,
  globalBox: state => state.globalBox,
  isMobile: state => state.isMobile,
  webTitle: state => state.webTitle,
  config: state => state.config,
  apiVersion: () => JSON.parse(window.localStorage.getItem(apiVersion)),
  isReactNativeApp: state => state.isReactNativeApp,
  isNativeApp: state => state.isAndroidApp || state.isIOSApp || state.isFlutterApp,
  dialogPageType: state => state.dialogPageType,
  dialogPagePath: state => state.dialogPagePath,
  isUserCentreDialog: state => state.isUserCentreDialog,
  isHelpCentreDialog: state => state.isHelpCentreDialog,
  openWindowZendeskChat: state => state.openWindowZendeskChat,
  forbiddenArea: () => JSON.parse(window.localStorage.getItem(forbiddenAreaStorage)),
  packageVersion: state => state.packageVersion,
  userAgent: state => state.userAgent,
  isAndroidApp: state => state.isAndroidApp,
  isIOSApp: state => state.isIOSApp,
  isFlutterApp: state => state.isFlutterApp,
  checkAppMethodLog: state => state.checkAppMethodLog,
  textTransMap: () => new Map([]),
  isUSDTWithdrawRequireDeposit: state => !Number(state.config?.USDT_withdrawal_rule),
};

export default {
  state,
  actions,
  mutations,
  getters,
};
