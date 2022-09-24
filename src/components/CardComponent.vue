<template>
  <v-card class="mx-auto" max-width="344" outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <div class="text-overline mb-4">{{ component.type }}</div>
        <v-list-item-title class="text-h5 mb-1">
          {{ component.name }}
        </v-list-item-title>
        <v-list-item-subtitle>{{ component.description }}</v-list-item-subtitle>
        <h3>Price: {{ component.price }} {{ currency }}</h3>
      </v-list-item-content>

      <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
      <v-btn
        rounded
        depressed
        color="primary"
        :disabled="checkItemExistInCart(component.id)"
        @click="addItemToCart(component)"
      >
        {{ checkItemExistInCart(component.id) ? "Added to cart" : "Add to cart" }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "CardComponent",
  props: ["component"],
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
