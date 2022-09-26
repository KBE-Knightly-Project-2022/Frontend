<template>
  <v-card class="mx-auto" max-width="344" outlined>
    <v-list-item three-line>
      <v-list-item-content>
<!--        <div class="text-overline mb-4">{{ component.type }}</div>-->
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
      <v-spacer></v-spacer>
      <v-dialog
          v-model="dialog"
          width="500"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              rounded
              depressed
              color="primary"
              v-bind="attrs"
              v-on="on"
          >
            Details
          </v-btn>
        </template>

        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            {{ component.name }}
          </v-card-title>

          <v-card-text>
            ID: {{component.id}}
          </v-card-text>
          <v-card-text>
            price: {{component.price}}
          </v-card-text>
          <v-card-text>
            description: {{component.description}}
          </v-card-text>
          <v-card-text>
            attack: {{component.attack}}
          </v-card-text>
          <v-card-text>
            defence: {{component.defence}}
          </v-card-text>
          <v-card-text>
            position: {{component.position}}
          </v-card-text>
          <v-card-text>
            weight: {{component.weight}}
          </v-card-text>
          <v-card-text>
            maxrange: {{component.minrange}}
          </v-card-text>
          <v-card-text>
            maxrange: {{component.maxrange}}
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="primary"
                text
                @click="dialog = false"
            >
              I accept
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card-actions>

  </v-card>

</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "CardComponent",
  props: ["component"],
  data () {
    return {
      dialog: false,
    }
  },
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
