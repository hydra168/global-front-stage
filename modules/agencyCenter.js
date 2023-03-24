import {
  getApiSummary,
  getApiDaily,
  getApiLinks,
  getApiTeam,
  getApiTeamRebate,
  putApiTeamRemark,
  getApiTeamItem,
  getApiBalance,
  getApiBalanceLog,
  postApiAgentBalance,
} from '../api/data/agencyCenter';

const state = {
  agencySummary: {},
  agencyDaily: {},
  agencyExcel: [],
  agencyLinks: {},
  agencyTeam: {},
  agencyRebate: [],
  agencyTeamItem: {},
  agencyBalance: 0,
  balanceLog: {},
  agencyStatus: '',
};

const actions = {
  async GET_AGENCY_SUMMARY({ commit }) {
    const { error, result } = await getApiSummary();
    error || commit('SET_AGENCY_SUMMARY', result);
  },
  async GET_AGENCY_DAILY({ commit }, params) {
    const { error, result } = await getApiDaily(params);
    error || commit('SET_AGENCY_DAILY', result);
  },
  async GET_AGENCY_DAILY_EXCEL({ commit }, params) {
    const { error, result } = await getApiDaily(params);
    error || commit('SET_AGENCY_DAILY_EXCEL', result.list);
  },
  async GET_AGENCY_LINKS({ commit }) {
    const { error, result } = await getApiLinks();
    error || commit('SET_AGENCY_LINKS', result);
  },
  async GET_AGENCY_TEAM({ commit }, params) {
    const { error, result } = await getApiTeam(params);
    error || commit('SET_AGENCY_TEAM', result);
  },
  async GET_AGENCY_TEAM_REBATE({ commit }, params) {
    const { error, result } = await getApiTeamRebate(params);
    !error && result && commit('SET_AGENCY_TEAM_REBATE', result);
  },
  async UPDATE_TEAM_REMARK({ commit }, params) {
    const { error } = await putApiTeamRemark(params);
    error || (commit('SET_MESSAGE', { type: 'success', message: '更新成功' }), commit('SET_AGENCY_STATUS', 'list'));
  },
  async GET_AGENCY_TEAM_ITEM({ commit }, params) {
    const { error, result } = await getApiTeamItem(params);
    error || commit('SET_AGENCY_TEAM_ITEM', result);
  },
  async GET_AGENCY_BALANCE({ commit }) {
    const { error, result } = await getApiBalance();
    error || commit('SET_AGENCY_BALANCE', result.balance);
  },
  async GET_AGENCY_BALANCE_LIST({ commit }, params) {
    const { error, result } = await getApiBalanceLog(params);
    error || commit('SET_AGENCY_BALANCE_LIST', result);
  },
  async UPDATE_AGENCY_BALANCE({ commit }, params) {
    const { error } = await postApiAgentBalance(params);
    error || commit('SET_AGENCY_STATUS', 'list');
  },
};

const mutations = {
  SET_AGENCY_SUMMARY(state, payload) {
    state.agencySummary = payload;
  },
  SET_AGENCY_DAILY(state, payload) {
    state.agencyDaily = payload;
  },
  SET_AGENCY_DAILY_EXCEL(state, payload) {
    state.agencyExcel = payload;
  },
  SET_AGENCY_LINKS(state, payload) {
    state.agencyLinks = payload;
  },
  SET_AGENCY_TEAM(state, payload) {
    state.agencyTeam = payload;
  },
  SET_AGENCY_TEAM_REBATE(state, payload) {
    state.agencyRebate = payload;
  },
  SET_AGENCY_TEAM_ITEM(state, payload) {
    state.agencyTeamItem = payload;
  },
  SET_AGENCY_BALANCE(state, payload) {
    state.agencyBalance = payload;
  },
  SET_AGENCY_BALANCE_LIST(state, payload) {
    state.balanceLog = payload;
  },
  SET_AGENCY_STATUS(state, payload) {
    state.agencyStatus = payload;
  },
};

const getters = {
  agencySummary: state => state.agencySummary,
  agencyDaily: state => state.agencyDaily,
  agencyExcel: state => state.agencyExcel,
  agencyLinks: state => state.agencyLinks,
  agencyTeam: state => state.agencyTeam,
  agencyRebate: state => state.agencyRebate,
  agencyTeamItem: state => state.agencyTeamItem,
  agencyBalance: state => state.agencyBalance,
  balanceLog: state => state.balanceLog,
  agencyStatus: state => state.agencyStatus,
};

export default {
  state,
  actions,
  mutations,
  getters,
};
