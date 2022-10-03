<template>
  <v-row>
    <v-col>
      <h3>Cart</h3>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Name</th>
              <th class="text-left">Qty</th>
              <th class="text-left">Price</th>
              <th class="text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="items.length" v-for="item in items" :key="item.id">
              <td>{{ item.name }}</td>
              <td>{{ item.qty }}</td>
              <td>{{ item.price }} {{currency}}</td>
              <td>
                <v-btn
                  light
                  depressed
                  text
                  color="red"
                  @click="removeItem(item.id)"
                >
                  <v-icon class="ml-2">mdi-close</v-icon></v-btn
                >
              </td>
            </tr>
            <tr v-if="items.length === 0" class="text-center">
                <td colspan="4">No item found!</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2" class="text-right"><b>Total</b></td>
              <td>
                <b>{{ total_amount }} {{currency}}</b>
              </td>
            </tr>
          </tfoot>
        </template>
      </v-simple-table>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Cart",
  metaInfo: {
    title: 'Cart'
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      items: "getItems",
      currency: 'currency'
    }),
    total_amount() {
      let total = 0;
      this.items.map((item) => {
        total += item.qty * item.price;
      });

      return total;
    },
  },
  methods: {
    ...mapActions(["removeItem"]),
  },
};
</script>
