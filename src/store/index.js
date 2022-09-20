import Vuex from 'vuex';
import Vue from 'vue';
import createPersistedState from "vuex-persistedstate";
import auth from './modules/auth';
import project from './modules/project';
import task from './modules/task';

Vue.use(Vuex);
export default new Vuex.Store({
    modules: {
        auth,
        project,
        task
    },
    plugins: [createPersistedState({
        // storage: window.sessionStorage,
        reducer(val) {
            return {
                auth: val.auth
            }
        }
    })]
});