import axios from "axios";
import api from "../../plugins/api";
import setting from "./setting";

const state = {
  // dummy_products: [
  //   {
  //     name: "test1",
  //     price: 10,
  //     description: "This is description",
  //     product_components: [
  //       {
  //         id: 9,
  //         name: "weapon 4",
  //         type: "sheild",
  //         price: 20,
  //         description: "This is description.",
  //       },
  //       {
  //         id: 6,
  //         name: "weapon 3",
  //         type: "weapon",
  //         price: 20,
  //         description: "This is description.",
  //       },
  //     ],
  //   },
  // ],
  products: [],
};

const getters = {
  getProductList: (state) => state.products,
  // getFilterProducts: (state) => (query) => {
  //   return state.products.filter((product) => {
  //     return (
  //       product.name.includes(query) ||
  //       product.description.includes(query)
  //     );
  //   });
  // },
};

const actions = {
  async productCreate({ commit }, product) {
    await api.post("createProduct", product ,
        {
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("keycloakToken"),
          }});
    return await dispatch("products");
    // console.log(product, "product");
    // let products = [...state.products, product];
    // commit("setProduct", products);
  },

  async fetchProducts({ commit }) {
    let currency = setting.getters.currency(setting.state)
    let token = localStorage.getItem("keycloakToken")
    console.log("currency= " + currency)
    let response = await api.get("products?currency=" + currency , {
      headers: {
        "Authorization": "Bearer " + token,
      }
    });
    commit("setProduct", response.data);

    // commit("setProduct", state.dummy_products);
  },
};

const mutations = {
  setProduct(state, products) {
    state.products = products;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
