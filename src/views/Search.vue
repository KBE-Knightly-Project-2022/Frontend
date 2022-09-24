<template>
  <v-row>
    <v-col cols="4" v-for="product in product_list" :key="product.id">
      <CardProduct :product="product" />
    </v-col>
    <v-col cols="4" v-for="component in component_list" :key="component.id">
      <CardComponent :component="component" />
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import CardProduct from "../components/CardProduct.vue";
import CardComponent from "../components/CardComponent.vue";
export default {
  name: "Search",
  components: {
    CardProduct,
    CardComponent,
  },
  data() {
    return {
      product_list: [],
      component_list: [],
    };
  },
  computed: {
    ...mapGetters({
      products: "getFilterProducts",
      component: "getFilterComponent",
    }),
  },
  watch: {
    "$route.query.query": {
      handler: function (value) {
        console.log(this.component(value), "value");
        this.product_list = this.products(value);
        this.component_list = this.component(value);
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {
    this.$store.dispatch("fetchProducts");
  },
  methods: {
    ...mapActions(["fetchProducts"]),
  },
};
</script>
