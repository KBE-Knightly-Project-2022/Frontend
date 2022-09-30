import api from "../../plugins/api";
import router from "@/router";
import setting from "./setting";
const state = {
  components: [],
};

const getters = {
  getComponentList: (state) => {
    return state.components;
  },
  // getFilterComponent: (state) => (query) => {
  //   return state.dummy_components.filter((component) => {
  //     return (
  //       component.name.includes(query) ||
  //       component.description.includes(query)
  //     );
  //   });
  // },
};

const actions = {
  async fetchComponents({ commit }) {
    let token = localStorage.getItem("keycloakToken")
    console.log(token)
    let currency = setting.getters.currency(setting.state) //TODO warum is das immer bronze auch wenn man state ändert
    let response = await api.get("components?currency=" + currency ,
        {
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("keycloakToken"),
          }});
    commit("setComponents", response.data);
    // if (type) {
    //   var data = state.dummy_components.filter((component) => {
    //     return component.type === type;
    //   });
    // } else {
    //   var data = state.dummy_components;
    // }
    // commit("setComponents", data);
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
