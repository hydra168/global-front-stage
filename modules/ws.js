const state = {
  mailNumber: '',
};

const actions = {};

const mutations = {
  SET_MAIL_NUMBERMBER(state, paylod) {
    state.mailNumber = paylod;
  },
};

const getters = {
  mailNumber(state) {
    return state.mailNumber;
  },
};

export default {
  actions,
  state,
  mutations,
  getters,
};
