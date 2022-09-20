<template>
  <div>
    <div class="text-right">
      <v-dialog v-model="dialog" width="700">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            elevation="5"
            class="text-subtitle-1 btn-rounded font-weight-medium"
            color="#B385EB"
            v-bind="attrs"
            v-on="on"
            width="210"
          >
            New Project <v-icon class="ml-2">mdi-plus-thick</v-icon>
          </v-btn>
        </template>

        <v-card>
          <v-card-title class="text-h5 card-title"> New Project </v-card-title>
          <div v-for="(errorArray, idx) in notifmsg" :key="idx">
            <div v-for="(allErrors, idx) in errorArray" :key="idx">
              <span class="text-danger">{{ allErrors }} </span>
            </div>
          </div>
          <v-form v-model="valid" class="mx-8" @submit.prevent="submit">
            <v-col>
              <v-text-field
                v-model="projectName"
                :rules="nameRules"
                label="Name of Project"
                required
              ></v-text-field>
            </v-col>
            <v-col>
              <v-textarea
                v-model="projectDesc"
                outlined
                name="input-7-4"
                label="Project Description"
                :rules="textareaRules"
              ></v-textarea>
            </v-col>
            <v-col>
              <v-autocomplete
                v-model="friends"
                :disabled="isUpdating"
                :items="people"
                filled
                chips
                color="blue-grey lighten-2"
                label="Participants"
                multiple
              >
                <template v-slot:selection="data">
                  <v-chip
                    v-bind="data.attrs"
                    :input-value="data.selected"
                    close
                    @click="data.select"
                    @click:close="remove(data.item)"
                  >
                    {{ data.item.name }}
                  </v-chip>
                </template>
                <template v-slot:item="data">
                  <template v-if="typeof data.item !== 'object'">
                    <v-list-item-content
                      v-text="data.item"
                    ></v-list-item-content>
                  </template>
                  <template v-else>
                    <v-list-item-content>
                      <v-list-item-title v-html="data.item.name"></v-list-item-title>
                    </v-list-item-content>
                  </template>
                </template>
              </v-autocomplete>
            </v-col>
            <v-row class="mx-8">
              <v-col>
                <v-menu offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="dateFromFormat"
                      label="From"
                      prepend-icon="mdi-calendar"
                      v-bind="attrs"
                      v-on="on"
                      readonly
                    >
                      ></v-text-field
                    >
                  </template>
                  <v-date-picker
                    color="#B385EB"
                    v-model="dateFrom"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col>
                <v-menu offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="dateToFormat"
                      label="To"
                      prepend-icon="mdi-calendar"
                      v-bind="attrs"
                      v-on="on"
                      readonly
                    >
                      ></v-text-field
                    >
                  </template>
                  <v-date-picker
                    color="#B385EB"
                    v-model="dateTo"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="#B385EB"
                text
                @click="dialog = false"
                class="my-5 mx-2"
              >
                Cancel
              </v-btn>
              <v-btn
                color="#B385EB"
                class="btn-rounded px-4 my-5 mx-2"
                type="submit"
              >
                Create
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    people: Array,
  },
  data() {
    return {
      notifmsg: "",
      dialog: false,
      projectName: "",
      projectDesc: "",
      menu: false,
      dateFrom: "",
      dateTo: "",
      valid: true,
      friends: [],
      isUpdating: false,
      nameRules: [(v) => !!v || "Name is required"],
      textareaRules: [(v) => !!v || "Description cannot be empty"],
    };
  },
  watch: {
    isUpdating(val) {
      if (val) {
        setTimeout(() => (this.isUpdating = false), 3000);
      }
    },
  },
  // computed: {
  //   isLoggedIn: function () {
  //     return this.$store.getters.isAuthenticated;
  //   },
  // },
  methods: {
    changed() {
      console.log(this.friends);
    },
    remove(item) {
      const index = this.friends.indexOf(item);
      if (index >= 0) this.friends.splice(index, 1);
    },
    ...mapActions(["projectCreate"]),
    async submit() {
      // create project
      const project = new FormData();
      project.append("project_name", this.projectName);
      project.append("project_description", this.projectDesc);
      // array append
      this.friends.forEach((friend) => {
        project.append("participants[]", friend);
      });
      project.append("from", this.dateFrom);
      project.append("to", this.dateTo);
      try {
        await this.projectCreate(project);
        this.dialog = false;
      } catch (error) {
        this.notifmsg = error.response.data.errors;
      }
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

<style>
.text-danger {
  color: red;
  margin-left: 10px;
}
</style>
