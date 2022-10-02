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
      <v-dialog
          transition="dialog-bottom-transition"
          max-width="800"

      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              color="primary"
              v-bind="attrs"
              v-on="on"
              rounded
              depressed
              style="margin-left: 20px"
          >Details</v-btn>
        </template>
        <template v-slot:default="dialog">
          <v-card>
            <v-toolbar
                color="primary"
                dark
            > {{ product.name }}</v-toolbar>
            <v-list>
              <v-col cols="4" v-for="component in component_list" :key="component.id">
                <CardProductComponent :component="component" />
              </v-col>
            </v-list>
            <v-card-actions class="justify-end">
              <v-btn
                  text
                  @click="dialog.value = false"
              >Close</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import CardComponent from "./CardComponent";
import CardProductComponent from "./CardProductComponent"

export default {
  name: "CardProduct",
  props: ["product"],
  components: {
    CardProductComponent,
  },
  component_list : [],
  computed: {
    ...mapGetters({
      currency: "currency",
      cart_items: "getItems",
    }),
  },
  data() {
    return {
      component_list: this.product.components
    };
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
