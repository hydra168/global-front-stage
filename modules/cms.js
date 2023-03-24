import {
  getApiMenu,
  getApiLottoryList,
  getApiSpotlights,
  getApiBoardList,
  getApiHelperList,
  getApiHelper,
  getApiAnnouncementList,
  getApiPromotionList,
  getApiPromotionPic,
  getApiPromotionDetail,
  getArticleList,
} from '../api/data/cms';
import { router } from '../router';
import { DEVICE_TYPE } from '@G/consts';
import pc from '../router/pc';

const state = {
  menus: { menus: [], showType: null },
  lottoryGameList: [],
  showMenu: false,
  currentMenuTitle: '', // m 設置 header 上面的文字
  currentMenuIcon: 'menu', // m 設置 header 上面的icon
  // ps: [], // ??
  spotlights: [], // 輪播圖
  boardList: [], // 公告列表
  articles: [], // 展示文章
  articleTotal: null,
  helperList: [],
  helperDetail: {},
  // 彈窗公告
  announcementIsOpen: false,
  announcementList: [],
  announcementCurrentIndex: '',
  announcementCurrentItem: { a: 1 },
  announcementViewDate: localStorage.getItem('_vD') || '',
  // 優惠活動
  promotionList: [],
  promotionType: null,
  promotionDetail: null,
  promotionPic: '',
};

const actions = {
  // 首頁選單內容
  async GET_MENU({ commit, state }) {
    if (!state.menus.menus || state.menus.menus.length === 0) {
      const res = await getApiMenu();
      if (res.isError) {
        // api沒有isError的值 本段程式碼不會作用
        res.isOpen && commit('SET_MESSAGE', { message: res.error });
      } else {
        commit('SET_MENUS', res.result);
      }
    }
  },
  // 首頁彩票列表內容
  async GET_LOTTORY_GAME_LIST({ commit, state }) {
    if (state.lottoryGameList.length === 0) {
      // pid: 4, num:6 => 只顯示彩票的前六個
      // const res = await getApiLottoryList({ pid: 4, num: 6 });
      const res = await getApiLottoryList();
      if (res.isError) {
        // api沒有isError的值 本段程式碼不會作用
        res.isOpen && commit('SET_MESSAGE', { message: res.error });
      } else {
        commit('SET_LOTTORY_GAME_LIST', res.games);
      }
    }
  },
  // 輪播內容
  async GET_SPOTLIGHTS({ commit }) {
    const res = await getApiSpotlights();
    if (res.isError) {
      res.isOpen && commit('SET_MESSAGE', { message: res.error });
    } else {
      commit('SET_SPOTLIGHTS', res.result || []);
    }
  },
  // 公告內容
  async GET_BOARD_LIST({ commit }) {
    const res = await getApiBoardList();
    if (res.isError) {
      res.isOpen && commit('SET_MESSAGE', { message: res.error });
    } else {
      commit('SET_BOARD_LIST', res.result || []);
    }
  },
  // 展示文章
  async GET_ARTICLES({ commit, state }, { page = 1, num = 10 }) {
    const res = await getArticleList({ page, num });
    if (res.isError) {
      res.isOpen && commit('SET_MESSAGE', { message: res.error });
    } else {
      commit('SET_ARTICLES', res.result || []);
      state.articleTotal = res.total;
    }
  },
  /**
   * 幫助中心
   */
  async GET_HELPER_LIST({ commit }) {
    const res = await getApiHelperList();
    if (res.isError) {
      res.isOpen && commit('SET_MESSAGE', { message: res.error });
    } else {
      commit('SET_HELPER_LIST', res.result);
    }
  },
  async GET_HELPER_DETAIL({ commit }, { code = '' } = {}) {
    const res = await getApiHelper({ code });
    if (res.isError) {
      res.isOpen && commit('SET_MESSAGE', { message: res.error });
    } else {
      commit('SET_HELPER_DETAIL', res.result);
    }
  },
  /**
   * 彈窗公告
   */
  async GET_ANNOUNCEMENT_LIST({ commit, rootGetters }) {
    // rootGetters.announcementViewDate ;
    return new Promise((resolve, reject) => {
      getApiAnnouncementList().then(res => {
        if (res.isError) {
          res.isOpen && commit('SET_MESSAGE', { message: res.error });
          reject(res);
        } else {
          commit('SET_ANNOUNCEMENT_LIST', res.result || []);
          rootGetters.config &&
            commit('SET_ANNOUNCEMENT_IS_OPEN', {
              ischeck: true,
              status: rootGetters.config.index_announcement_enable == 1 || rootGetters.config.enable_mobile_announcement == 1,
            });
          resolve(res.result);
        }
      });
    });
  },
  async OPEN_ANNOUNCEMENT({ commit, state }, id) {
    const index = state.announcementList.findIndex(i => i.Id == +id);
    if (index !== -1) {
      const item = state.announcementList[index];
      commit('SET_ANNOUNCEMENT_CURRENT_INDEX', index);
      commit('SET_ANNOUNCEMENT_CURRENT_ITEM', item);
      commit('SET_ANNOUNCEMENT_IS_OPEN', { ischeck: false, status: true });
    }
  },
  /**
   * 優惠活動
   */
  async GET_PROMOTION_LIST({ commit }) {
    const res = await getApiPromotionList();
    if (res.isError) {
      res.isOpen && commit('SET_MESSAGE', { message: res.error });
    } else {
      commit('SET_PROMOTION_LIST', res.result);
    }
  },
  async GET_PROMOTION_PIC({ commit }) {
    const res = await getApiPromotionPic({ id: 0 });
    if (res.isError) {
      res.isOpen && commit('SET_MESSAGE', { message: res.error });
    } else {
      const type = DEVICE_TYPE === 'mobile' ? 'm' : 'pc';
      const item = res.result.find(item => item.Platform === type);
      if (item && item.Path) {
        commit('SET_PROMOTION_PIC', item.Path);
      }
    }
  },
  async GET_PROMOTION_DETAIL({ commit }, { id = '' } = {}) {
    const res = await getApiPromotionDetail({ id });
    if (res.isError) {
      res.isOpen && commit('SET_MESSAGE', { message: res.error });
    } else {
      commit('SET_PROMOTION_DETAIL', res.result);
    }
  },
  /**
   * 首頁路由處理
   */
  ROUTER_PUSH({ dispatch }, link) {
    // 第三方網站
    if (typeof link === 'string' && link.match(/https?:\/\//)) {
      window.open(link);
      return;
    }
    // 寄信
    if (typeof link === 'string' && link.match(/mailto?:\/\//)) {
      dispatch('OPEN_MAIL', { mailAddress: link });
      return;
    }
    switch (link) {
      case 'liveChat': // 開啟客服
        dispatch('SHOW_LIVE_CHAT', 0);
        break;
      case 'liveChatTawk': // 開啟Tawk客服
        dispatch('SHOW_LIVE_CHAT', 1);
        break;
      case 'liveChatLiveChat': // 開啟美洽客服
        dispatch('SHOW_LIVE_CHAT', 2);
        break;
      case 'liveChatMeiQia': // 開啟美洽客服
        dispatch('SHOW_LIVE_CHAT', 3);
        break;
      case 'liveChatWoot': // 開啟ChatWoot客服
        dispatch('SHOW_LIVE_CHAT', 4);
        break;
      case 'liveChatFresh': // 開啟FreshChat客服
        dispatch('SHOW_LIVE_CHAT', 5);
        break;
      case 'scrollTop': // 回到頂部
        dispatch('PAGE_GO_TOP');
        break;
      case 'register':
        dispatch('SET_GLOBAL_BOX');
        break;
      default:
        router.push(link);
        break;
    }
  },
  /**
   * 首頁路由處理，能使用參數
   */
  ROUTER_PUSHOPTION({ dispatch }, { link = '', option = null }) {
    // 第三方網站
    if (typeof link === 'string' && link.match(/https?:\/\//)) {
      // 預設值是另開視窗
      if (!option) {
        window.open(link);
      }
      // 預設值是另開視窗
      if (option.Blank) {
        window.open(link);
      } else {
        // 跳轉網頁
        window.location.href = link;
      }
      return;
    }
    // 寄信
    if (typeof link === 'string' && `${link}`.startsWith('mailto:')) {
      console.error('Email:error');
      // window.open(link);
      // dispatch('OPEN_MAIL', { mailAddress: 'aaa@gmail.com' });
      return;
    }
    switch (link) {
      case 'liveChat': // 開啟客服
        dispatch('SHOW_LIVE_CHAT', 0);
        break;
      case 'liveChatTawk': // 開啟Tawk客服
        dispatch('SHOW_LIVE_CHAT', 1);
        break;
      case 'liveChatLiveChat': // 開啟美洽客服
        dispatch('SHOW_LIVE_CHAT', 2);
        break;
      case 'liveChatMeiQia': // 開啟美洽客服
        dispatch('SHOW_LIVE_CHAT', 3);
        break;
      case 'liveChatWoot': // 開啟ChatWoot客服
        dispatch('SHOW_LIVE_CHAT', 4);
        break;
      case 'liveChatFresh': // 開啟FreshChat客服
        dispatch('SHOW_LIVE_CHAT', 5);
        break;
      case 'scrollTop': // 回到頂部
        dispatch('PAGE_GO_TOP');
        break;
      case 'register':
        dispatch('SET_GLOBAL_BOX');
        break;
      default:
        router.push(link);
        break;
    }
  },
  /**
   * 開啟信箱
   */
  OPEN_MAIL({ dispatch }, params) {
    params.mailAddress ? window.open('mailto:' + params.mailAddress) : '';
  },
};

const mutations = {
  SET_MENUS(state, payload) {
    state.menus = payload;
  },
  SET_LOTTORY_GAME_LIST(state, payload) {
    state.lottoryGameList = payload;
  },
  SET_SHOW_MENU(state, payload) {
    state.showMenu = payload;
  },
  SET_CURRENT_MENU_TITLE(state, payload) {
    state.currentMenuTitle = payload;
  },
  SET_CURRENT_MENU_ICON(state, payload) {
    state.currentMenuIcon = payload;
  },
  SET_SPOTLIGHTS(state, payload) {
    state.spotlights = payload;
  },
  SET_BOARD_LIST(state, payload) {
    state.boardList = payload;
  },
  SET_ARTICLES(state, payload) {
    state.articles = payload;
  },
  // SET_PS(state, payload) {
  //   state.ps = payload;
  // },
  /**
   * 幫助中心
   */
  SET_HELPER_LIST(state, payload) {
    state.helperList = payload;
  },
  SET_HELPER_DETAIL(state, payload) {
    state.helperDetail = payload;
  },
  /**
   * 彈窗公告
   */
  SET_ANNOUNCEMENT_IS_OPEN(state, payload) {
    const { ischeck, status } = payload;
    const nowDate = new Date().toISOString().split('T')[0];
    const viewDate = state.announcementViewDate;
    const isSame = nowDate !== viewDate;
    state.announcementIsOpen = ischeck ? isSame && status : status;
  },
  SET_ANNOUNCEMENT_LIST(state, payload) {
    state.announcementList = payload;
  },
  SET_ANNOUNCEMENT_CURRENT_INDEX(state, payload) {
    state.announcementCurrentIndex = payload;
  },
  SET_ANNOUNCEMENT_CURRENT_ITEM(state, payload) {
    state.announcementCurrentItem = payload;
  },
  SET_ANNOUNCEMENT_VIEW_DATE(state, payload) {
    state.announcementViewDate = payload;
    localStorage.setItem('_vD', payload);
  },
  /**
   * 優惠活動
   */
  SET_PROMOTION_LIST(state, payload) {
    state.promotionList = payload.list;
    state.promotionType = payload.pt_list;
  },
  SET_PROMOTION_PIC(state, payload) {
    state.promotionPic = payload;
  },
  SET_PROMOTION_DETAIL(state, payload) {
    state.promotionDetail = payload;
  },
};

const getters = {
  menus: state => state.menus,
  lottoryGameList: state => state.lottoryGameList,
  showMenu: state => state.showMenu,
  currentMenuTitle: state => state.currentMenuTitle,
  currentMenuIcon: state => state.currentMenuIcon,
  // ps: state => state.ps,

  spotlights: state => state.spotlights,
  boardList: state => state.boardList,
  articles: state => state.articles,
  articleTotal: state => state.articleTotal,

  helperList: state => state.helperList,
  helperDetail: state => state.helperDetail,

  announcementIsOpen: state => state.announcementIsOpen,
  announcementList: state => state.announcementList,
  announcementCurrentIndex: state => state.announcementCurrentIndex,
  announcementCurrentItem: state => state.announcementCurrentItem,
  announcementViewDate: state => state.announcementViewDate,

  promotionList: state => state.promotionList,
  promotionType: state => state.promotionType,
  promotionDetail: state => state.promotionDetail,
  promotionPic: state => state.promotionPic,
  appDownloadPath: (state, rootState) => {
    if (rootState.config.app && rootState.config.ios_download) {
      return `${rootState.config.app || ''}?iosdownload=${encodeURIComponent(rootState.config.ios_download) || ''}&lang=${
        rootState.locale
      }&templatetype=${rootState.config.appdownload_template_type || 'complex'}`;
    }
    return `${rootState.config.app || ''}&lang=${rootState.locale}&templatetype=${rootState.config.appdownload_template_type || 'complex'}`;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
