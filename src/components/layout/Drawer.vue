<template>
  <v-card class="mx-auto overflow-hidden" width="100%" height="64">
    <v-app-bar color="#B385EB" dark>
      <v-row>
        <v-col cols="6" offset="2">
          <v-text-field
            class="mt-6"
            append-icon="mdi-magnify"
            label="Search News"
          ></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-row class="mt-5 text-right">
            <v-select :items="['USD', 'EUR', 'INR']" value="EUR" class="select"></v-select>
            <v-btn text class="" to="cart">
              <v-icon class="ml-2">mdi-cart-variant</v-icon>
            </v-btn>
            <Login />
            <v-btn text class="" to="register">
              Register
              <v-icon class="ml-2">mdi-lock-plus</v-icon>
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-app-bar>

    <v-navigation-drawer
      color="#B385EB"
      v-model="drawer"
      :mini-variant.sync="mini"
      permanent
      fixed
    >
      <v-list-item class="px-2">
        <v-avatar size="40" color="#ecddfdb1" class="mr-4">
          <span class="font-weight-bold">
            {{
              $store.getters.StateUser.first_name.substring(0, 1) +
              $store.getters.StateUser.last_name.substring(0, 1)
            }}
          </span>
        </v-avatar>

        <v-list-item-title class="font-weight-medium">{{
          $store.getters.StateUser.first_name +
          " " +
          $store.getters.StateUser.last_name
        }}</v-list-item-title>

        <v-btn icon @click.stop="mini = !mini">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item class="my-4" v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>
              <router-link
                text
                class="text-body-1 text-decoration-none black--text font-weight-medium"
                :to="{ name: item.url }"
                >{{ item.title }}</router-link
              >
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>
            <v-icon class="cursor-pointer">mdi-logout</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>
              <v-btn
                class="text-capitalize text-body-1 font-weight-medium btn-logout"
                text
                @click="logout"
                >Logout
              </v-btn>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>

  <!-- <v-navigation-drawer
    color="#B385EB"
    v-model="drawer"
    :mini-variant.sync="mini"
    permanent
    fixed
  >
    <v-list-item class="px-2">
      <v-avatar size="40" color="#ecddfdb1" class="mr-4">
        <span class="font-weight-bold">
          {{
            $store.getters.StateUser.first_name.substring(0, 1) +
            $store.getters.StateUser.last_name.substring(0, 1)
          }}
        </span>
      </v-avatar>

      <v-list-item-title class="font-weight-medium">{{
        $store.getters.StateUser.first_name +
        " " +
        $store.getters.StateUser.last_name
      }}</v-list-item-title>

      <v-btn icon @click.stop="mini = !mini">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense>
      <v-list-item class="my-4" v-for="item in items" :key="item.title" link>
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>
            <router-link
              text
              class="text-body-1 text-decoration-none black--text font-weight-medium"
              :to="{ name: item.url }"
              >{{ item.title }}</router-link
            >
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon>
          <v-icon class="cursor-pointer">mdi-logout</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>
            <v-btn
              class="text-capitalize text-body-1 font-weight-medium btn-logout"
              text
              @click="logout"
              >Logout
            </v-btn>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer> -->
</template>
<script>
import Login from "../Login.vue";
import { mapActions } from "vuex";

export default {
  components: {
    Login,
  },
  data() {
    return {
      drawer: true,
      items: [
        // { title: "Home", icon: "mdi-home-outline", url: "Home" },
        {
          title: "Dashboard",
          icon: "mdi-view-dashboard-outline",
          url: "Dashboard",
        },
        { title: "Task", icon: "mdi-calendar-check", url: "Task" },
      ],
      mini: true,
      testy: "",
    };
  },
  methods: {
    ...mapActions(["LogOut"]),
    logout() {
      this.LogOut();
      this.$router.push({ name: "Home" });
    },
  },
};
</script>
<style scoped>
.btn-logout {
  margin-left: -15px;
  margin-top: -8px;
}
.select {
  max-width: 75px;
}
.text-right {
  float: right;
}
</style>
