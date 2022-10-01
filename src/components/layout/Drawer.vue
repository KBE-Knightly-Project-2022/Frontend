<template>
  <v-row>
    <v-navigation-drawer
      color="white"
      v-model="drawer"
      :mini-variant.sync="mini"
      permanent
      fixed
    >
      <v-list-item class="px-2">
        <v-list-item-title class="font-weight-medium logo">
          <img src="@/assets/logo-castle.png" alt="" :class="mini ? 'small-image' : 'full-image'" />
        </v-list-item-title>

        <v-btn icon @click.stop="mini = !mini">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>

          <v-list-item-title>
            <router-link
              text
              class="text-body-1 text-decoration-none black--text font-weight-medium"
              :to="'/'"
            >
              Home
            </router-link>
          </v-list-item-title>
        </v-list-item>

        <v-list-group :value="false" prepend-icon="mdi-puzzle">
          <template v-slot:activator>
            <v-list-item-title
              text
              class="text-body-1 text-decoration-none black--text font-weight-medium"
              >Components</v-list-item-title
            >
          </template>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-spear</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              <router-link
                text
                class="text-body-1 text-decoration-none black--text font-weight-medium"
                :to="'/components/weapon'"
              >
                Weapon
              </router-link>
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-shield-crown</v-icon>
            </v-list-item-icon>

            <v-list-item-title>
              <router-link
                text
                class="text-body-1 text-decoration-none black--text font-weight-medium"
                :to="'/components/armour'"
              >
                Armor
              </router-link>
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-shield</v-icon>
            </v-list-item-icon>

            <v-list-item-title>
              <router-link
                text
                class="text-body-1 text-decoration-none black--text font-weight-medium"
                :to="'/components/shield'"
              >
                Shield
              </router-link>
            </v-list-item-title>
          </v-list-item>
        </v-list-group>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-pencil-outline</v-icon>
          </v-list-item-icon>

          <v-list-item-title>
            <router-link
              text
              class="text-body-1 text-decoration-none black--text font-weight-medium"
              :to="'/product/create'"
            >
              Product Create
            </router-link>
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-format-list-bulleted</v-icon>
          </v-list-item-icon>

          <v-list-item-title>
            <router-link
              text
              class="text-body-1 text-decoration-none black--text font-weight-medium"
              :to="'/products'"
            >
              Products
            </router-link>
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-dialog
              v-model="dialog"
              width="500"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  class="text-body-1 text-decoration-none black--text font-weight-medium"
                  style="background-color: white"
                  elevation="0"
                  v-bind="attrs"
                  v-on="on"
              >
                Ask the Oracle
              </v-btn>
            </template>

            <v-card
                class="text-body-1 text-decoration-none black--text font-weight-medium"
            >
              <v-card-title
                  style="margin-top: 10px">
                Tell me your name child
              </v-card-title>

              <v-text-field
                  label="Name"
                  variant="outlined"
                  style="margin: 30px"
                  :rules="[required]"
                  v-model="oracleName"
                  clearable>

              </v-text-field>

              <v-card-text>
                youre age is : {{ oracleAge.age}}
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    style="background-color: white"
                    text
                    @click="dialog = false"
                >
                  i have no time for this
                </v-btn>

                <v-btn
                    text
                    style="background-color:white"
                    :disabled="oracleName === ''"
                    @click="getAge()"
                >
                  tell me wench
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-row>
</template>
<script>
import Login from "../Login.vue";
import { mapActions } from "vuex";
import api from "../../plugins/api";

export default {
  components: {
    Login,
  },
  data() {
    return {
      drawer: true,
      dialog: false,
      oracleName: "",
      oracleAge: "",
      items: [
        // { title: "Home", icon: "mdi-home-outline", url: "Home" },
        {
          title: "Dashboard",
          icon: "mdi-view-dashboard-outline",
          url: "Dashboard",
        },
        { title: "Task", icon: "mdi-calendar-check", url: "Task" },
      ],
      mini: false,
      testy: "",
    };
  },
  methods: {
    ...mapActions(["LogOut"]),
    logout() {
      this.LogOut();
      this.$router.push({ name: "Home" });
    },
    async getAge() {
      let response = await api.get("age?name=" + this.oracleName,
          {
            headers: {
              "Authorization": "Bearer " + localStorage.getItem("keycloakToken"),
            }
          }).then((response) => {
            this.oracleAge = response.data
      });
      this.oracleName = ""
    }
  },
};
</script>
<style scoped>
.btn-logout {
  margin-left: -15px;
  margin-right: -8px;
}
.select {
  max-width: 75px;
}
.text-right {
  float: right;
}
.v-avatar {
  background: transparent !important;
  height: au;
  width: au;
  margin: au;
  /* width: 100% !important; */
}
.logo {
  text-align: center;
}
.logo .full-image {
  width: 80px !important;
  height: 80px !important;
  margin: auto;
}
.logo .small-image {
  width: 40px !important;
  height: 40px !important;
  margin: auto;
}
a {
  text-decoration: none;
}
</style>
