<template>
  <v-container>
    <v-row class="mt-8">
      <v-col class="text-h6">
        Project <v-icon class="mx-1">mdi-chevron-right</v-icon>
        <span class="text-h5 font-weight-bold">{{ project.project_name }}</span>
      </v-col>
      <v-spacer></v-spacer>
      <TaskCreateModal :people="users" @refresh="check"></TaskCreateModal>
    </v-row>
    <v-row class="my-4">
      <v-col>
        Time period from
        <strong> {{ formatDate(project.from) }} </strong>
        until
        <strong> {{ formatDate(project.to) }} </strong>
        <v-icon class="mx-1">mdi-power-on</v-icon>
        <strong> {{ remainingDays(project.to) }} Days Left</strong>
      </v-col>
    </v-row>

    <vue-chart :tasks="project.tasks"></vue-chart>
  </v-container>
</template>
<script>
import VueChart from "./VueChart.vue";
import TaskCreateModal from "./TaskCreateModal.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    VueChart,
    TaskCreateModal,
  },

  computed: {
    ...mapGetters({
      users: "getUsers",
      project: "getTasks",
    }),
  },

  mounted() {
    this.allUsers();
    this.allTasks();
  },

  methods: {
    formatDate(date) {
      return this.$moment(date).format("DD-MM-YYYY");
    },
    async allUsers() {
      await this.$store.dispatch("users");
    },
    check() {},
    async allTasks() {
      await this.$store.dispatch("tasks", this.$route.params.id);
    },
    parseDate(str) {
      var mdy = str.split("/");
      return new Date(mdy[2], mdy[0] - 1, mdy[1]);
    },
    datediff(first, second) {
      return Math.round((second - first) / (1000 * 60 * 60 * 24));
    },
    remainingDays(to) {
      let date1 = this.$moment();
      let date2 = this.$moment(to);
      let diff = date2.diff(date1, "days");
      if (diff < 0) {
        return 0;
      }
      return diff;
    },
  },
};
</script>
<style>
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}
.container {
  height: 100%;
  width: 100%;
}
.left-container {
  overflow: hidden;
  position: relative;
  height: 100%;
}
.right-container {
  border-right: 1px solid #cecece;
  float: right;
  height: 100%;
  width: 340px;
  box-shadow: 0 0 5px 2px #aaa;
  position: relative;
  z-index: 2;
}
.gantt-messages {
  list-style-type: none;
  height: 50%;
  margin: 0;
  overflow-x: hidden;
  overflow-y: auto;
  padding-left: 5px;
}
.gantt-messages > .gantt-message {
  background-color: #f4f4f4;
  box-shadow: inset 5px 0 #d69000;
  font-family: Geneva, Arial, Helvetica, sans-serif;
  font-size: 14px;
  margin: 5px 0;
  padding: 8px 0 8px 10px;
}
.gantt-selected-info {
  border-bottom: 1px solid #cecece;
  box-sizing: border-box;
  font-family: Geneva, Arial, Helvetica, sans-serif;
  height: 50%;
  line-height: 28px;
  padding: 10px;
}
.gantt-selected-info h2 {
  border-bottom: 1px solid #cecece;
}
.select-task-prompt h2 {
  color: #d9d9d9;
}
</style>
