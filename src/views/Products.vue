<template>
  <v-row>
    <v-col cols="4" v-for="product in products" :key="product.id">
      <CardProduct :product="product" />
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import CardProduct from "../components/CardProduct.vue";
export default {
  name: "Products",
  components: {
    CardProduct,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      products: "getProductList",
    }),
  },
  mounted() {
    this.fetchProducts()
  },
  methods: {
    ...mapActions(["fetchProducts"]),
  },
};
</script>
