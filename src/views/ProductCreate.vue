<template>
  <div class="mx-16 my-10 height" style="height: 100%; width: 100%">
    <h3>Create Product</h3>
    <v-row>
      <v-col cols="4">
        <v-text-field
            v-model="form.name"
            type="text"
            label="Product Name"
        ></v-text-field>
      </v-col>
<!--      <v-col cols="4">-->
<!--        <v-text-field-->
<!--            v-model="form.price"-->
<!--            type="number"-->
<!--            label="Price"-->
<!--        ></v-text-field>-->
<!--      </v-col>-->
<!--      <v-col cols="6">-->
<!--        <v-textarea v-model="form.description" rows="2" label="Description"></v-textarea>-->
<!--      </v-col>-->
    </v-row>
    <v-row>
      <v-col
          class="text-center mt-10 text-h5"
          v-for="(title, i) in titles"
          :key="i"
      >
        <v-icon :color="title.color" class="mr-2" size="30">{{
            title.icon
          }}
        </v-icon
        >
        {{ title.name }}
      </v-col>
    </v-row>
    <v-row align="center" no-gutters class="pt-4">
      <!-- todo column -->
      <v-col cols="6" class="column">
        <draggable
            class="list-group"
            :list="component_list"
            group="people"
            style="height: 250px"
        >
          <v-card
              class="mx-auto mb-4"
              max-width="344"
              outlined
              v-for="(component, i) in component_list"
              :key="component.id"
          >
            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-title class="text-h5 mb-1">
                  {{ component.name }}
                </v-list-item-title>
                <v-list-item-subtitle>{{
                    component.description
                  }}
                </v-list-item-subtitle>
                <h3>Price: {{ component.price }}</h3>
              </v-list-item-content>

              <v-list-item-avatar
                  tile
                  size="80"
                  color="grey"
              ></v-list-item-avatar>
            </v-list-item>
          </v-card>
        </draggable>
      </v-col>
      <v-divider vertical></v-divider>

      <!-- product column -->
      <v-col class="column">
        <draggable
            class="list-group"
            :list="form.product_components"
            group="people"
            style="height: 250px"
        >
          <v-card
              class="mx-auto mb-4"
              max-width="344"
              outlined
              v-for="(product_component, i) in form.product_components"
              :key="product_component.id"
          >
            <v-list-item three-line>
              <v-list-item-content>
                <div class="text-overline mb-4">
                  {{ product_component.type }}
                </div>
                <v-list-item-title class="text-h5 mb-1">
                  {{ product_component.name }}
                </v-list-item-title>
                <v-list-item-subtitle>{{
                    product_component.description
                  }}
                </v-list-item-subtitle>
                <h3>Price: {{ product_component.price }}</h3>
              </v-list-item-content>

              <v-list-item-avatar
                  tile
                  size="80"
                  color="grey"
              ></v-list-item-avatar>
            </v-list-item>
          </v-card>
        </draggable>
      </v-col>
      <v-col cols="12" class="btn-column">
        <v-btn color="primary" @click="saveProduct">Save</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import {mapGetters, mapActions} from "vuex";

export default {
  name: "ProductCreate",
  components: {
    draggable,
  },
  data() {
    return {
      titles: [
        {
          name: "Components",
          icon: "mdi-puzzle",
          color: "#b284ea",
        },
        {
          name: "Product",
          icon: "mdi-chess-king",
          color: "#b284ea",
        },
      ],
      form: {
        name: "",
        product_components: [],
      },
    };
  },
  computed: {
    ...mapGetters({
      component_list: "getComponentList",
    }),
  },
  mounted() {
    this.$store.dispatch("fetchComponents");
  },
  methods: {
    ...mapActions(["productCreate"]),
    saveProduct() {
      this.productCreate(this.form);
    },
  },
};
</script>

<style>
.column {
  height: 60vh;
  overflow: scroll;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.column::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.column {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.btn-column {
  text-align: right;
}

.btn-column .v-btn {
  margin-top: 10px;
  margin-right: 30px;
}
</style>
