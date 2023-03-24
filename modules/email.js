/* eslint-disable */
import { getApiStationLetterList, getApiStationLetter, postApiReceiveReward, postDeleteMail } from '../api/data/email';

/**
 * 命名規範:
 * state: 小駝峰
 * actions: {XXX}_{XXX} 大寫_大寫
 * mutations: SET_{XXX} 大寫
 * getters: 小駝峰
 */

const state = {
  stationLetterList: {},
  stationLetter: {},
  receiveRewardStatus: 0,
  deleteLetterStatus: 0,
};

const actions = {
  /**
   * 取得站內信列表
   * @param {string} page 當前頁數
   * @param {string} page_num 當前頁數筆數
   * @param {string} is_show_all 顯示全部1....
   */
  async GET_STATION_LETTER_LIST({ dispatch, commit }, data) {
    const res = await getApiStationLetterList(data);
    if (res.isError) {
      res.isOpen && commit('SET_MESSAGE', { message: res.error });
    } else {
      commit('SET_STATION_MAIL_LIST', res.result);
    }
  },
  /**
   * 取得站內信內容
   * @param {number} id
   */
  async GET_STATION_LETTER({ commit }, data) {
    const res = await getApiStationLetter(data);
    if (res.isError) {
      res.isOpen && commit('SET_MESSAGE', { message: res.error });
    } else {
      commit('SET_STATION_MAIL', res.result);
    }
  },
  /**
   * 取得站內信獎勵
   * @param {number} detail.id
   */
  async POST_RECEIVE_REWARD({ commit }, data) {
    const res = await postApiReceiveReward(data);
    if (res.isError) {
      res.isOpen && commit('SET_MESSAGE', { message: res.error });
    } else {
      commit('SET_RECEIVE_REWARD_STATUS', 1);
    }
  },
  /**
   * 刪除站內信
   * @param {array} ids
   */
  async POST_DELETE_LETTERS({ dispatch, commit }, data) {
    const res = await postDeleteMail(data);
    if (res.isError) {
      res.isOpen && commit('SET_MESSAGE', { message: res.error });
    } else {
      dispatch('GET_STATION_LETTER_LIST', {
        is_show_all: 1,
      });
      commit('SET_MESSAGE', { message: res.result, type: 'success' });
      commit('SET_DELETE_LETTER_STATUS', 1);
    }
  },
};

const mutations = {
  /**
   * 儲存站內信列表
   */
  SET_STATION_MAIL_LIST(state, payload) {
    state.stationLetterList = payload;
  },
  /**
   * 儲存站內信
   */
  SET_STATION_MAIL(state, payload) {
    state.stationLetter = payload;
  },
  /**
   * 儲存站內信領取狀態
   */
  SET_RECEIVE_REWARD_STATUS(state, payload) {
    state.receiveRewardStatus = payload;
  },
  /**
   *儲存站內信刪除狀態
   */
  SET_DELETE_LETTER_STATUS(state, payload) {
    state.deleteLetterStatus = payload;
  },
};

const getters = {
  stationLetterList: state => state.stationLetterList,
  stationLetter: state => state.stationLetter,
  receiveRewardStatus: state => state.receiveRewardStatus,
  deleteLetterStatus: state => state.deleteLetterStatus,
};

export default {
  actions,
  state,
  mutations,
  getters,
};
