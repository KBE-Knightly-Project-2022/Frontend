import Vuex from "vuex";
import Vue from "vue";
import createPersistedState from "vuex-persistedstate";
import auth from "./modules/auth";
import component from "./modules/component";
import product from "./modules/product";
import cart from "./modules/cart";
import setting from "./modules/setting";

Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    auth,
    component,
    product,
    cart,
    setting,
  },
  plugins: [
    createPersistedState({
      // storage: window.sessionStorage,
      reducer(val) {
        return {
          auth: val.auth,
        //   cart: val.cart,
          setting: val.setting,
        };
      },
    }),
  ],
});
