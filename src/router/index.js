import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Components from "../views/Components.vue";
import ProductCreate from "../views/ProductCreate.vue";
import Products from "../views/Products.vue";
import Search from "../views/Search.vue";
import Cart from "../views/Cart.vue";
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
    name: "Home",
    component: Home,
    // meta: {
    //     middleware: [log, auth],
    // },
  },
  {
    path: "/components/:type",
    name: "Components",
    component: Components,
    // meta: {
    //     middleware: [log, auth],
    // },
  },
  {
    path: "/product/create",
    name: "ProductCreate",
    component: ProductCreate,
    // meta: {
    //     middleware: [log, auth],
    // },
  },
  {
    path: "/products",
    name: "Products",
    component: Products,
    // meta: {
    //     middleware: [log, auth],
    // },
  },
  {
    path: "/search",
    name: "Search",
    component: Search,
    // meta: {
    //     middleware: [log, auth],
    // },
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
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
