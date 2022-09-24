import api from "../../plugins/api";
import router from "@/router";
const state = {
  components: [],
  dummy_components: [
    {
      id: 1,
      name: "armour 1",
      type: "armour",
      price: 44,
      description: "This is description.",
    },
    {
      id: 2,
      name: "armour 2",
      type: "armour",
      price: 340,
      description: "This is description.",
    },
    {
      id: 3,
      name: "shield 1",
      type: "shield",
      price: 20,
      description: "This is description.",
    },
    {
      id: 4,
      name: "shield 2",
      type: "shield",
      price: 10,
      description: "This is description.",
    },
    {
      id: 5,
      name: "shield 3",
      type: "shield",
      price: 40,
      description: "This is description.",
    },
    {
      id: 6,
      name: "weapon 1",
      type: "weapon",
      price: 50,
      description: "This is description.",
    },
    {
      id: 7,
      name: "weapon 2",
      type: "weapon",
      price: 60,
      description: "This is description.",
    },
    {
      id: 8,
      name: "weapon 3",
      type: "weapon",
      price: 70,
      description: "This is description.",
    },
    {
      id: 9,
      name: "weapon 4",
      type: "weapon",
      price: 20,
      description: "This is description.",
    },
  ],
};

const getters = {
  getComponentList: (state) => {
    return state.components;
  },
  getFilterComponent: (state) => (query) => {
    return state.dummy_components.filter((component) => {
      return (
        component.name.includes(query) ||
        component.description.includes(query)
      );
    });
  },
};

const actions = {
  async fetchComponents({ commit }, type) {
    // let response = await api.get("component/type=?" + type);
    // commit("setComponents", response.data.data);

    if (type) {
      var data = state.dummy_components.filter((component) => {
        return component.type === type;
      });
    } else {
      var data = state.dummy_components;
    }
    commit("setComponents", data);
  },
};

const mutations = {
  setComponents(state, components) {
    state.components = components;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
