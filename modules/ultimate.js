import { getApiLottery, getApiUltimate } from '../api/data/lottery';

const state = {
  // 常用
  ultimateTypeData: [{ title: '彩票', name: 'ultimate', value: 'ultimate' }],
  ultimateUrl: '',
};
const actions = {};

const mutations = {
  SET_ULTIMATE_URL(state, payload) {
    state.ultimateUrl = payload;
  },
};

const getters = {
  ultimateTypeData: state => state.ultimateTypeData,
  ultimateUrl: state => state.ultimateUrl,
};

export default {
  state,
  actions,
  mutations,
  getters,
};
