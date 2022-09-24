import axios from "axios";

const state = {
  user: null,
  token: null,
};

const getters = {
  isAuthenticated: (state) => !!state.token,
  getUser: (state) => state.user,
  getToken: (state) => state.token,
};

const actions = {
  async Register({ dispatch }, form) {
    await axios.post("/auth/register", form);
    let UserForm = new FormData();
    UserForm.append("email", form.email);
    UserForm.append("password", form.password);
    await dispatch("LogIn", UserForm);
  },

  async LogIn({ commit }, user) {
    await axios
      .post("/auth/login", user)
      .then((response) => {
        commit("setToken", response.data.data.token);
        commit("setUser", response.data.data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  async LogOut({ commit }) {
    commit("logout");
  },
};

const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  setToken(state, token) {
    state.token = token;
  },

  logout(state) {
    state.token = null;
    state.user = null;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
