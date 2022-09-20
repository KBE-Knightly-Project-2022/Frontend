import axios from "axios";
import api from "../../plugins/api";

const state = {
  projects: [],
  users: [],
  countTask: [],
};

const getters = {
  getProjects: (state) => state.projects,
  getUsers: (state) => state.users,
  getCountTask: (state) => state.countTask,
};

const actions = {
  async projectCreate({ dispatch }, project) {
    await api.post("project/create", project);
    return await dispatch("projects");
  },

  async projects({ commit }) {
    let response = await api.get("projects");
    commit("setProject", response.data.data);
  },

  //task-status-count
  async taskStatusCount({ commit }) {
    let response = await api.get("task-status-count");
    commit("setCountTask", response.data.data);
  },

  async projectDelete({ dispatch }, id) {
    await api.delete("project/delete/" + id);
    return await dispatch("projects");
  },

  // status
  async projectStatus({ dispatch }, data) {
    await api.post("project/status/", data);
    return await dispatch("projects");
  },
  //all users
  async users({ commit }) {
    let response = await api.get("users");
    commit("setUsers", response.data.data.data);
  },
};

const mutations = {
  setProject(state, projects) {
    state.projects = projects;
  },
  setUsers(state, users) {
    state.users = users;
  },
  setCountTask(state, countTask) {
    state.countTask = countTask;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
