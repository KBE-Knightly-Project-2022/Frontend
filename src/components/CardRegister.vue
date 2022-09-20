<template>
  <v-card class="mx-auto card-register" width="960" height="590" elevation="7">
    <v-row>
      <v-col class="leftside">
        <div class="mt-5 text-h4 text-center">Register</div>
        <div v-for="(errorArray, idx) in notifmsg" :key="idx">
          <div v-for="(allErrors, idx) in errorArray" :key="idx">
            <span class="text-danger">{{ allErrors }} </span>
          </div>
        </div>
        <v-form class="my-10 mx-4" @submit.prevent="submit">
          <v-row>
            <v-col>
              <v-text-field
                v-model="registerFirstname"
                :rules="nameRules"
                label="First name"
                required
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="registerLastname"
                :rules="nameRules"
                label="Last name"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="registerEmail"
                :rules="emailRules"
                label="Email"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="registerPassword"
                :rules="passwordRules"
                label="Password"
                :append-icon="registerValue ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="() => (registerValue = !registerValue)"
                :type="registerValue ? 'password' : 'text'"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-btn color="#B385EB" type="submit" class="btn-rounded px-4">
            Register
          </v-btn>
          <v-btn to="/" color="#B385EB" class="btn-rounded px-4 ml-5">
            Back
          </v-btn>
        </v-form>
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
      registerFirstname: "",
      registerLastname: "",
      registerEmail: "",
      registerPassword: "",
      registerValue: String,
      nameRules: [(v) => !!v || "Name is required"],
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
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    ...mapActions(["Register"]),
    async submit() {
      try {
        await this.Register({
          first_name: this.registerFirstname,
          last_name: this.registerLastname,
          email: this.registerEmail,
          password: this.registerPassword,
        });
        if (this.isLoggedIn) {
          this.$router.push("/dashboard");
        }
        this.showError = false;
      } catch (error) {
        this.notifmsg = error.response.data.errors;
        console.log(this.notifmsg);
        this.showError = true;
      }
    },
  },
};
</script>
<style scoped>
.leftside {
  background-color: #ecddfd;
  height: 500px;
  margin-left: 12px;
  border-bottom-right-radius: 75px;
}

.card-register {
  margin-top: 9em;
}
span.text-danger {
  color: red;
}
</style>
