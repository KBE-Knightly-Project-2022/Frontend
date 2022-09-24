<template>
  <v-app class="font-ubuntu">
    <v-main>
      <v-row>
        <v-card class="mx-auto overflow-hidden main-card" width="100%">
          <v-row>
            <v-col cols="2">
              <drawer></drawer>
            </v-col>
            <v-col cols="8">
              <v-row>
                <v-col cols="6" class="mx-auto">
                  <v-text-field
                    v-model="search"
                    class="mt-6"
                    append-icon="mdi-magnify"
                    label="Search..."
                    @change="searchItems"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row style="height: 100%">
                <router-view />
                <Footer />
              </v-row>
            </v-col>
            <v-col cols="2 mt-2 px-2" class="right-sidebar">
              <v-btn
                v-if="isAuthenticated"
                class="text-capitalize text-body-1 font-weight-medium btn-logout"
                text
                @click="logout"
                >Logout
                <v-icon class="ml-2">mdi-logout</v-icon>
              </v-btn>
              <Login v-if="!isAuthenticated" />
              <v-btn text class="" to="register" v-if="!isAuthenticated">
                Register
                <v-icon class="ml-2">mdi-lock-plus</v-icon>
              </v-btn>
              <v-select
                :items="[
                  { value: '1', text: 'bronze' },
                  { value: '2', text: 'silver' },
                  { value: '3', text: 'gold' },
                  { value: '4', text: 'donkey' },
                  { value: '5', text: 'cow' },
                ]"
                :value="currency"
                class="select"
                @change="updateCurrency"
              ></v-select>

              <v-badge color="primary accent-4"  :content="cartItemCount > 0 ? cartItemCount : '0'" overlap>
               
                  <router-link :to="'/cart'"
                    ><v-icon large >mdi-cart-variant</v-icon>
                  </router-link>
              </v-badge>
            </v-col>
          </v-row>
        </v-card>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
import Drawer from "../src/components/layout/Drawer.vue";
import Footer from "../src/components/layout/Footer.vue";
import Login from "../src/components/Login.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "App",
  components: {
    Drawer,
    Footer,
    Login,
  },
  data: () => ({
    search: "",
  }),
  computed: {
    ...mapGetters(["isAuthenticated", "currency", "cartItemCount"]),
  },
  methods: {
    ...mapActions(["LogOut", "updateCurrency"]),
    logout() {
      this.LogOut();
      this.$router.push({ name: "Home" });
    },
    searchItems() {
      this.$router.push("/search?query=" + this.search);
    },
  },
};
</script>
<style>
.home {
  background-color: rgba(255, 255, 255, 0.22);
  min-height: 100vh;
}

.col-left {
  flex-grow: 0 !important;
}

.cursor-move {
  cursor: move;
}

.opacity {
  opacity: 0;
}

.min-height {
  height: 100% !important;
}

.img {
  margin: 3em 0 0 5em;
}

.card-title {
  background-color: rgba(255, 255, 255, 0.66);
  text-align: center !important;
}

.cursor-pointer {
  cursor: pointer;
}
.right-sidebar {
  background: rgba(255, 255, 255, 0.3);
  padding: 25px;
  max-height: 200px;
}
.main-card {
  min-height: 96vh;
  height: auto;
}
a {
  text-decoration: none;
}
.v-badge__badge {
  font-size: 12px !important;
  min-width: 20px !important;
  height: 20px !important;
}
</style>
