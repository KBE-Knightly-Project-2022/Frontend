const state = {
  items: [],
};

const getters = {
  getItems: (state) => {
    return state.items;
  },
  cartItemCount: (state) => {
    return state.items.length;
  },
};

const actions = {
  addItemToCart({ commit }, item) {
    item.qty = 1;
    let items = [...state.items, item];

    commit("setCartItems", items);
  },

  async removeItem({ commit }, id) {
    let items = state.items.filter((item) => {
      return item.id != id;
    });
    commit("setCartItems", items);
  },
};

const mutations = {
  setCartItems(state, items) {
    state.items = items;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
