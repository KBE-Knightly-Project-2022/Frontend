import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import i18n from "./i18n";
import CroudGantt from "croud-vue-gantt";
import store from "./store";
import axios from "axios";
import middleware from "@grafikri/vue-middleware";
import Keycloak from "keycloak-js";
router.beforeEach(middleware({ router, store }));

// axios.defaults.withCredentials = true
axios.defaults.baseURL = "http://192.168.2.104:8000/api/";

Vue.use(CroudGantt);

Vue.use(require('vue-moment'));
Vue.config.productionTip = false;


// const app = new Vue({
//   router,
//   store,
//   vuetify,
//   i18n,
//   render: (h) => h(App),
// }).$mount("#app");

let initOptions = {
  url: 'http://192.168.2.104:8080', realm: 'realm1', clientId: 'Frontend', onLoad: 'login-required'
}

let keycloak = Keycloak(initOptions);

keycloak.init({ onLoad: initOptions.onLoad }).then((auth) => {

  if (!auth) {
    window.location.reload();
  } else {
   // consoloe.log("Authenticated");

    if (keycloak.token) {
      localStorage.setItem("keycloakToken", keycloak.token);
    }


    const app = new Vue({
      router,
      store,
      vuetify,
      i18n,
      render: (h) => h(App),
    }).$mount("#app");
  }


//Token Refresh
  setInterval(() => {
    keycloak.updateToken(70).then((refreshed) => {
      if (refreshed) {
        // Vue.$log.info('Token refreshed' + refreshed);
      } else {
        Vue.$log.warn('Token not refreshed, valid for '
            + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
      }
    }).catch(() => {
      // Vue.$log.error('Failed to refresh token');
    });
  }, 6000)

}).catch(() => {
  // Vue.$log.error("Authenticated Failed");
});