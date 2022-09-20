import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import i18n from "./i18n";
import CroudGantt from "croud-vue-gantt";
import store from "./store";
import axios from "axios";
import middleware from "@grafikri/vue-middleware";
router.beforeEach(middleware({ router, store }));

// axios.defaults.withCredentials = true
axios.defaults.baseURL = "http://127.0.0.1:8000/api/";

Vue.use(CroudGantt);

Vue.use(require('vue-moment'));
Vue.config.productionTip = false;

const app = new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
