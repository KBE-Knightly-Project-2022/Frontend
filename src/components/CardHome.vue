<template>
  <v-card class="mx-auto card" width="960" height="590" elevation="7">
    <v-row>
      <v-col class="leftside">
        <div class="text-h4">WELCOME</div>
        <v-img class="shrink my-10" src="../assets/Taskmanager.png"></v-img>

        <div>
          <!-- dashboard -->
          <v-btn
            elevation="5"
            class="text-subtitle-1 btn-rounded font-weight-medium mt-5"
            color="#B385EB"
            width="210"
            to="/register"
            >Register <v-icon class="ml-2">mdi-lock-plus</v-icon></v-btn
          >
          <!-- login modal dialog -->
          <div class="text-center">
            <v-dialog v-model="loginDialog" width="700">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  elevation="5"
                  class="text-subtitle-1 btn-rounded font-weight-medium my-3"
                  color="#B385EB"
                  v-bind="attrs"
                  v-on="on"
                  width="210"
                >
                  Login
                  <v-icon class="ml-2">mdi-login</v-icon>
                </v-btn>
              </template>

              <v-card>
                <v-card-title class="text-h5 card-title"> Login </v-card-title>
                <div v-for="(errorArray, idx) in notifmsg" :key="idx">
                  <div v-for="(allErrors, idx) in errorArray" :key="idx">
                    <span class="text-danger">{{ allErrors }} </span>
                  </div>
                </div>
                <v-form v-model="valid" class="mx-8" @submit.prevent="submit">
                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="loginEmail"
                        :rules="emailRules"
                        label="Email"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="loginPassword"
                        :rules="passwordRules"
                        label="Password"
                        :append-icon="loginValue ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="() => (loginValue = !loginValue)"
                        :type="loginValue ? 'password' : 'text'"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-card-text class="ml-2"
                    >Don't have an account?
                    <v-btn class="text-capitalize mb-1" text to="/register"
                      >Register</v-btn
                    >
                  </v-card-text>
                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="#B385EB"
                      text
                      @click="loginDialog = false"
                      class="my-5 mx-2"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                      color="#B385EB"
                      class="btn-rounded px-4 my-5 mx-2"
                      type="submit"
                    >
                      Login
                    </v-btn>
                  </v-card-actions>
                </v-form>
              </v-card>
            </v-dialog>
          </div>
        </div>
      </v-col>
      <v-col>
        <v-img
          class="img"
          max-width="280px"
          src="../assets/frontpict2.png"
        ></v-img>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      notifmsg: "",
      dialog: false,
      loginDialog: false,
      projectName: "",
      projectDesc: "",
      loginEmail: "",
      loginPassword: "",
      menu: false,
      loginValue: String,
      dateFrom: "",
      dateTo: "",
      valid: true,
      friends: [],
      isUpdating: false,
      // all the users from database will be shown in the participant drop down
      people: ["Sandra Adams", "Max Verstappen", "Luis Hamilton"],
      nameRules: [(v) => !!v || "Name is required"],
      textareaRules: [(v) => !!v || "Description cannot be empty"],
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) =>
          (v && v.length >= 6) || "Password must be more than 6 characters",
      ],
    };
  },
  watch: {
    isUpdating(val) {
      if (val) {
        setTimeout(() => (this.isUpdating = false), 3000);
      }
    },
  },
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    remove(item) {
      const index = this.friends.indexOf(item);
      if (index >= 0) this.friends.splice(index, 1);
    },
    ...mapActions(["LogIn"]),
    async submit() {
      const User = new FormData();
      User.append("email", this.loginEmail);
      User.append("password", this.loginPassword);
      try {
        await this.LogIn(User)
          .then((res) => {
            if (this.$store.getters.isAuthenticated) {
              this.$router.push("/dashboard");
            }
          })
          .catch((err) => {
            this.notifmsg = err.response.data.errors;
          });
      } catch (error) {}
    },
  }, // methods
  computed: {
    dateFromFormat() {
      return this.dateFrom.split("-").reverse().join("-");
    },
    dateToFormat() {
      return this.dateTo.split("-").reverse().join("-");
    },
  },
};
</script>
<style scoped>
.leftside {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ##0017ff;
  height: 500px;
  margin-left: 12px;
  border-bottom-right-radius: 75px;
}

.card {
  margin-top: 8em;
}

.btn-rounded {
  border-bottom-left-radius: 15px !important;
  border-top-right-radius: 15px !important;
}

.logo {
  height: 138px;
  width: 165px;
  object-fit: cover;
}
</style>
