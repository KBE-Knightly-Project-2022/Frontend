const state = {
  settings: {
    currency: "$",
  },
};

const getters = {
  currency: (state) => {
    return state.settings.currency;
  },
};

const actions = {
  updateCurrency({ commit }, currency) {
    commit("setCurrency", currency);
  },
};

const mutations = {
  setCurrency(state, currency) {
    state.settings.currency = currency;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
