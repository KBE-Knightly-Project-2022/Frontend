import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Register from "../views/Register.vue";

Vue.use(VueRouter);

const routes = [
//   {
//     path: "/",
//     name: "Home",
//     component: Home,
//   },
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
    // meta: {
    //     middleware: [log, auth],
    // },
  },
 
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
