<template>
  <v-container>
    <v-row class="mb-4">
      <v-col class="text-h4 font-weight-medium">Projects</v-col>
    </v-row>
  
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      colors: [
        "#c07bc3",
        "#a6dcaf",
        "#ddddce",
        "#16ee96",
        "#7571f2",
        "#e9db78",
        "#1e86e3",
        "#df3f4b",
        "#408299",
        "#a08ede",
      ],
      text: "Time is up",
    };
  },
  components: {
  },

  computed: {
    ...mapGetters({
      projects: "getProjects",
      users: "getUsers",
      taskStatusCount: "getCountTask",
    }),
  },
  mounted() {
    this.$store.dispatch("projects");
    this.$store.dispatch("users");
    this.$store.dispatch("taskStatusCount");
  },
  methods: {
    remainingDays(to) {
      let date1 = this.$moment();
      let date2 = this.$moment(to);
      let diff = date2.diff(date1, "days");
      if (diff < 0) {
        return 0;
      }
      return diff;
    },
    generateColor() {
      return this.colors[Math.floor(Math.random() * this.colors.length)];
    },
  },
};
</script>
<style scoped>
.divider {
  border-bottom: 2px solid black;
  margin: 40px 0;
}
</style>
