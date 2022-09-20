import axios from "axios";
// import api from "./plugins/api";

const state = {
    user: null,
    posts: null,
    token: null,
};

const getters = {
    isAuthenticated: (state) => !!state.token,
    StatePosts: (state) => state.posts,
    StateUser: (state) => state.user,
    StateToken: (state) => state.token,
};

const actions = {
    async Register({ dispatch }, form) {
        await axios.post('/auth/register', form)
        let UserForm = new FormData()
        UserForm.append('email', form.email)
        UserForm.append('password', form.password)
        await dispatch('LogIn', UserForm)
    },

    async LogIn({ commit }, user) {
        await axios.post("/auth/login", user)
            .then(response => {
                commit('setToken', response.data.data.token)
                commit('setUser', response.data.data.user)
            }).catch(error => {
                console.log(error)
            })
    },

    async CreatePost({ dispatch }, post) {
        await axios.post("post", post);
        return await dispatch("GetPosts");
    },

    async GetPosts({ commit }) {
        let response = await axios.get("posts");
        commit("setPosts", response.data);
    },

    async LogOut({ commit }) {
        let token = null;
        commit("logout", token);
    },
};

const mutations = {
    setUser(state, user) {
        state.user = user;
    },
    setToken(state, token) {
        state.token = token;
    },

    setPosts(state, posts) {
        state.posts = posts;
    },
    logout(state, token) {
        state.token = token;
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};