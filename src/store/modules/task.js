import api from "../../plugins/api";
import router from '@/router';
const state = {
    tasks: {},
    taskAll: [],
};

const getters = {
    getTasks: (state) => state.tasks,
    getTaskAll: (state) => state.taskAll,

};

const actions = {

    async taskCreate({ dispatch }, task) {
        await api.post("task/create", task);
        return await dispatch("tasks", router.currentRoute.params.id);
    },

    async tasks({ commit }, project_id) {
        let response = await api.get("tasks/" + project_id);
        commit("setTasks", response.data.data);
    },

    async taskAll({ commit }) {
        let response = await api.get("taskAll");
        commit("setTaskAll", response.data.data);
    },

    async taskStatusUpdate({ dispatch }, status) {
        console.log('sadfsfsdf');
        await api.post("task/status", status);
        await dispatch("taskAll");
    },

    async taskDelete({ dispatch }, id) {
        await api.delete("task/delete/" + id);
        await dispatch("taskAll");
    },




};

const mutations = {
    setTasks(state, tasks) {
        state.tasks = tasks;
    },
    setTaskAll(state, taskAll) {
        state.taskAll = taskAll;
    }
};

export default {
    state,
    getters,
    actions,
    mutations,
};