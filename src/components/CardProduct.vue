<template>
  <v-card class="mx-auto" max-width="344" outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <div class="text-overline mb-4">{{ product.type }}</div>
        <v-list-item-title class="text-h5 mb-1">
          {{ product.name }}
        </v-list-item-title>
        <v-list-item-subtitle>{{ product.description }}</v-list-item-subtitle>
        <h3>Price: {{ product.price }} {{ currency }}</h3>
      </v-list-item-content>
    </v-list-item>

    <v-card-actions>
      <v-btn
        rounded
        depressed
        color="primary"
        :disabled="checkItemExistInCart(product.id)"
        @click="addItemToCart(product)"
      >
        {{ checkItemExistInCart(product.id) ? "Added to cart" : "Add to cart" }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "CardProduct",
  props: ["product"],
  computed: {
    ...mapGetters({
      currency: "currency",
      cart_items: "getItems",
    }),
  },
  methods: {
    ...mapActions(["addItemToCart"]),
    checkItemExistInCart(id) {
      let find = this.cart_items.filter((item) => {
        return item.id === id;
      });
      if (find.length) {
        return true;
      }
      return false;
    },
  },
};
</script>
