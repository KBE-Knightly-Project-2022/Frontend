const state = {
  setting: {
    currency: "bronze",
  },
};

const getters = {
  currency: (state) => {
    return state.setting.currency;
  },
};

const actions = {
  updateCurrency({ commit }, currency) {
    commit("setCurrency", currency);
  },
};

const mutations = {
  setCurrency(state1, currency) {
    console.log("ooooh im changeing currency to" + currency)
    state.setting.currency = currency;
    state1.setting.currency = currency;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
