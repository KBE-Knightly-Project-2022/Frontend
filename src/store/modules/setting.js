const state = {
  settings: {
    currency: "bronze",
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
    console.log("ooooh im changeing currency to" + currency)
    state.currency = currency;
    console.log(state.currency)
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
