import { getApiGame, getApiGamePromo, getApiGameList, getApiGameRecordList, getApiGameLogRecordList, getApiGameSlot } from '../api/data/games';
import { getApiLottery, getApiUltimate } from '../api/data/lottery';
import app from '@/main';
import { slotGameList } from '../assets/json/slotGameList';
import { map } from 'lodash';
import { gameTitleMap } from '@ASSETS/userCentre/gameInfo';
import {
  GAMESRECORD_DETAILS_TITLEMAP_ONLYSHOW_WINLOSE,
  GAMESRECORD_CHANGE_TEXT_DINGWEIDAN,
  GAMESRECORD_CHANGE_TEXT_DAXIAODANSHUANG,
  GAMESRECORD_CHANGE_TEXT_DA,
  GAMESRECORD_CHANGE_TEXT_XIAO,
  GAMESRECORD_CHANGE_TEXT_DAN,
  GAMESRECORD_CHANGE_TEXT_SHUANG,
} from '@G/consts';
const gameHideItem = [
  'CellScore',
  'BetAmount',
  'PayoutAmount',
  'LineCode',
  'ChannelID',
  'MRate',
  'Odds',
  'OrderNo',
  'SRate',
  'DataType',
  'Type',
  'ID',
  'Jackpotcomm',
];

const state = {
  // 常用
  gameTypeData: [
    { title: '电子大厅', name: 'slotLobby', routeLink: 'slotLobby' },
    { title: '真人大厅', name: 'liveLobby', routeLink: 'liveLobby' },
    { title: '捕鱼大厅', name: 'fishLobby', routeLink: 'fishLobby' },
    { title: '棋牌大厅', name: 'chessLobby', routeLink: 'chessLobby' },
    { title: '彩票', name: 'ultimate', routeLink: 'ultimate' },
    { title: '极速PK10', name: 'jsPk10', routeLink: 'play/BxkZVPiJb63a' },
    { title: '马耳他幸运飞艇', name: 'maert', routeLink: 'play/8897460809813' },
    { title: '北京赛车', name: 'bjPk10', routeLink: 'play/4839157149977' },
    { title: '极速赛车', name: 'jssc', routeLink: 'play/2147212049129' },
    { title: '重庆时时彩', name: 'cqssc', routeLink: 'play/450181680062271488' },
    { title: '极速分分彩', name: 'jsffc', routeLink: 'play/6681474621111' },
    { title: '极速飞艇', name: 'jsft', routeLink: 'play/7043222726362' },
    { title: '赛马竞彩', name: 'smjc', routeLink: 'play/33444096365427' },
    { title: '体育', name: 'cssports', routeLink: 'play/cssports' },
    { title: '棋牌', name: 'ky', routeLink: 'play/46297061913392' },
    { title: 'AG真人', name: 'agLive', routeLink: 'play/AGwftrtxRP9syJ' },
    { title: 'AG捕鱼', name: 'agFish', routeLink: 'play/AGSvcZAA53g2Ly' },
  ],
  gameUrl: null,
  gameUrlStatus: null,
  gameLinkList: [], // 後台
  gameSlotList: [], // 電子遊藝列表
  gameRecordList: {}, // pc 用的遊戲紀錄列表
  gameLogRecordList: {}, // m 用的遊戲紀錄列表
  fullscreen: false, // 進入遊戲頁面 m展示全高 pc由按鈕操作
  fullWidth: false, // 進入遊戲頁面展示全寬 依照排版自行取用
  games: [],
};
const actions = {
  /**
   * 共同彩票遊戲路口
   * @param {String} type ultimate 彩票 ｜ lottery 目前沒有??
   */
  async GET_ULTIMATE({ commit }, type = '') {
    if (type != 'ultimate' && type != 'lottery') {
      commit('SET_MESSAGE', { message: app.$t('g_modules_games_errorTypeNull') });
    } else {
      commit('SET_LOADING_BAR', { message: app.$t('g_modules_games_waitText') });
      const tz = new Date().getTimezoneOffset();
      let res = {};
      type === 'ultimate' && (res = await getApiUltimate({ tz }));
      type === 'lottery' && (res = await getApiLottery({ tz }));
      if (res.isError) {
        res.isOpen && commit('SET_MESSAGE', { message: res.error });
        commit('SET_GAME_URL_STATUS', 'error');
      } else {
        commit('SET_GAME_URL_STATUS', 'success');
        commit('SET_GAME_URL', res.result);
      }
      commit('SET_LOADING_BAR', { show: false });
    }
  },
  /**
   * 遊戲類型
   * @param {String} id 遊戲id
   * @param tz 不需要帶
   * @param {string} room VIP2： 房間 初級房  中等房 高級房
   */
  async GET_GAME_URL({ commit }, { id = '', tz = '', room = '' } = {}) {
    commit('SET_LOADING_BAR', { message: app.$t('g_modules_games_waitText') });
    tz = new Date().getTimezoneOffset();
    const res = await getApiGame({ id, room, zone: tz });
    if (res.isError) {
      res.isOpen && commit('SET_MESSAGE', { message: res.error });
      commit('SET_GAME_URL_STATUS', 'error');
    } else {
      commit('SET_GAME_URL_STATUS', 'success');
      commit('SET_GAME_URL', res.result.link);
    }
    commit('SET_LOADING_BAR', { show: false });
  },
  /**
   * Promo 遊戲連結
   * @param {String} type 遊戲類型 真人live,棋牌chess,捕魚fish,電子slot
   * @param {String} id 遊戲id
   *  */
  async GET_GAME_PROMO_URL({ commit }, { type = '', id = '' } = {}) {
    commit('SET_LOADING_BAR', { message: app.$t('g_modules_games_waitText') });
    const res = await getApiGamePromo({ type, id });
    if (res.isError) {
      res.isOpen && commit('SET_MESSAGE', { message: res.error });
      commit('SET_GAME_PROMO_URL_STATUS', 'error');
    } else {
      commit('SET_GAME_PROMO_URL_STATUS', 'success');
      commit('SET_GAME_PROMO_URL', res.result.link);
    }
    commit('SET_LOADING_BAR', { show: false });
  },

  // 取得 遊戲 link data列表
  async GET_GAME_LINK_LIST({ commit }) {
    const res = await getApiGameList();
    if (res.isError) {
      res.isOpen && commit('SET_MESSAGE', { message: res.error });
    } else {
      commit('GET_GAME_LINK_LIST', res.result);
    }
  },
  // 取得 電子遊藝列表 預設給1
  async GET_GAME_SLOT_LIST({ commit }, { id = 1 } = {}) {
    commit('SET_LOADING_BAR', { message: app.$t('g_modules_games_waitText') });
    // const res = await getApiGameSlot({ id });
    // if (res.isError) {
    //   res.isOpen && commit('SET_MESSAGE', { message: res.error });
    // } else {
    //   commit('SET_GAME_SLOT_LIST', res.games);
    // }
    commit(
      'SET_GAME_SLOT_LIST',
      slotGameList.filter(slot => slot.show)
    );
    commit('SET_LOADING_BAR', { show: false });
  },
  // pc 取得 遊戲紀錄列表
  async GET_GAMES_RECORD_LIST({ commit }, params) {
    const res = await getApiGameRecordList(params);
    if (res.isError) {
      res.isOpen && commit('SET_MESSAGE', { message: res.error });
    } else {
      commit('SET_GAMES_RECORD_LIST', res.result);
    }
  },
  // m 取得 遊戲紀錄列表
  async GET_GAMES_LOG_RECORD_LIST({ commit, rootGetters }, params) {
    const res = await getApiGameLogRecordList(params);
    // console.log(res.result);
    if (res.isError) {
      res.isOpen && commit('SET_MESSAGE', { message: res.error });
    } else {
      // rootGetters.format(res.result);
      commit('SET_GAMES_LOG_RECORD_LIST', res.result);
      // console.log(state.gameLogRecordList);
    }
  },
};
const mutations = {
  SET_GAME_URL(state, payload) {
    state.gameUrl = payload;
  },
  SET_GAME_URL_STATUS(state, payload) {
    state.gameUrlStatus = payload;
  },
  SET_GAME_PROMO_URL(state, payload) {
    state.gameUrl = payload;
  },
  SET_GAME_PROMO_URL_STATUS(state, payload) {
    state.gameUrlStatus = payload;
  },
  GET_GAME_LINK_LIST(state, payload) {
    state.gameLinkList = payload;
  },
  SET_GAME_SLOT_LIST(state, payload) {
    state.gameSlotList = payload;
  },
  SET_GAMES_RECORD_LIST(state, payload) {
    state.gameRecordList = payload;
  },
  SET_GAMES_LOG_RECORD_LIST(state, payload) {
    state.gameLogRecordList = payload;
  },
  SET_FULL_SCREEN(state, payload) {
    state.fullscreen = payload;
  },
  SET_FULL_WIDTH(state, payload) {
    state.fullWidth = payload;
  },
  SET_GAMES(state, payload) {
    state.games = payload;
  },
};
const getters = {
  gameTypeData: state => state.gameTypeData, // DODO 只回傳 key 值
  gameUrl: state => state.gameUrl,
  gameUrlStatus: state => state.gameUrlStatus,
  gameLinkList: state => state.gameLinkList,
  gameSlotList: state => (state.gameSlotList ? state.gameSlotList : []),
  // gameRecordList: state => state.gameRecordList,
  gameRecordList: (state, getters) => getters.format(state.gameRecordList),
  gameLogRecordList: (state, getters) => getters.format(state.gameLogRecordList),
  fullscreen: state => state.fullscreen,
  fullWidth: state => state.fullWidth,
  gameRecordSplitor: () => ({
    ssc: '',
    pk10: ' ',
  }),
  gameResultMap: () => ({
    pk10: {
      1: '01',
      2: '02',
      3: '03',
      4: '04',
      5: '05',
      6: '06',
      7: '07',
      8: '08',
      9: '09',
      10: '10',
    },
    ssc: {
      0: '0',
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6',
      7: '7',
      8: '8',
      9: '9',
    },
    gd115: {
      0: '0',
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6',
      7: '7',
      8: '8',
      9: '9',
      10: '10',
      11: '11',
    },
  }),
  format: (state, getters) => logs => {
    let { games, ...rest } = logs;
    games = games?.map(item => {
      let sport = item.detail_json ? JSON.parse(item.detail_json) : null;
      const contentObj = JSON.parse(item.contents);
      const { GameName, Rule, Cmd, PlayValue } = contentObj;
      if (sport) {
        sport = {
          ...sport[0],
          GameName,
          Rule,
        };
      } else {
        const code = (contentObj.code = contentObj.Numbers?.length === 10 ? 'pk10' : 'ssc');
        const splitor = getters.gameRecordSplitor[code] || '';

        let { gameRecords } = getters.textMap;

        // 大小單雙替換文字
        // const textDAXIAODANSHUANG = GAMESRECORD_CHANGE_TEXT_DAXIAODANSHUANG ?? '大小单双';
        // const textDa = GAMESRECORD_CHANGE_TEXT_DA ?? '大';
        // const textXiao = GAMESRECORD_CHANGE_TEXT_XIAO ?? '小';
        // const textDan = GAMESRECORD_CHANGE_TEXT_DAN ?? '单';
        // const textShuang = GAMESRECORD_CHANGE_TEXT_SHUANG ?? '双';
        // 定位膽替換文字
        const textDingWeiDan = GAMESRECORD_CHANGE_TEXT_DINGWEIDAN ?? '定位胆';
        // 只顯示漲跌
        const onlyUpperOrLower = GAMESRECORD_DETAILS_TITLEMAP_ONLYSHOW_WINLOSE;
        // 最大的跌值
        const smallBiggest = { pk10: 5, ssc: 4 }[code];
        item.pv = contentObj.PlayValue;
        item.numbers = contentObj.Numbers;
        contentObj.PlayValue = PlayValue.split(',').map(numbers => {
          return numbers
            .split(splitor)
            .filter(item => item.replace(/\s+/g, '') != '')
            .map(n => {
              let { gameResultMap } = getters;
              return !onlyUpperOrLower ? gameResultMap[code][n] ?? n : n > smallBiggest ? '涨' : '跌';
            });
        });
        contentObj.Numbers = contentObj.Numbers?.map(n => {
          let { gameResultMap } = getters;
          return !onlyUpperOrLower ? gameResultMap[code][n] ?? n : n > smallBiggest ? '涨' : '跌';
        });
        contentObj.Cmd = Cmd === '定位胆' ? textDingWeiDan : Cmd;
        // contentObj.PlayValue = PlayValue === 'ou1,ou2,oe1,oe2' ? textDAXIAODANSHUANG : '大小单双';
        // contentObj.PlayValue = PlayValue === 'ou1' ? textDa : '大';
        // contentObj.PlayValue = PlayValue === 'ou2' ? textXiao : '小';
        // contentObj.PlayValue = PlayValue === 'oe1' ? textDan : '单';
        // contentObj.PlayValue = PlayValue === 'oe2' ? textShuang : '双';
        gameRecords.forEach((text, key) => {
          contentObj.Cmd = contentObj.Cmd.replace(key, gameRecords.get(key));
        });

        // 替換其他文字
        for (const i in item) {
          if (item[i]?.replace) {
            gameRecords.forEach((text, key) => {
              item[i] = item[i].replace(key, gameRecords.get(key));
            });
          }
        }
      }
      return {
        ...item,
        sport,
        contentObj: map(contentObj, (value, label) => {
          return { value, label };
        })
          .map((item, i) => {
            const add = (item.label + item.value).length < 50 ? 0 : 10000;
            item.sort = i + add;
            return item;
          })
          .filter(item => !gameHideItem.includes(item.label) && !!gameTitleMap[item.label])
          .sort((a, b) => a.sort - b.sort)
          .map(item => {
            const { value, label } = item;
            return { value, label, text: gameTitleMap[label] };
          }),
      };
    });
    return { games, ...rest };
  },
  textMap: () => ({
    gameRecords: new Map([]),
  }),
};

export default {
  state,
  actions,
  mutations,
  getters,
};
