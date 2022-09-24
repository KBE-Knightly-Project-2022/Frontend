<template>
  <v-row>
    <v-col cols="4" v-for="component in component_list" :key="component.id">
      <CardComponent :component="component" />
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import CardComponent from "../components/CardComponent.vue";

export default {
  name: "Components",
  components: {
    CardComponent,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      component_list: "getComponentList",
    }),
  },
  watch: {
    "$route.params.type": function () {
      this.fetchComponents( this.$route.params.type);
    },
  },
  mounted() {
    this.fetchComponents( this.$route.params.type);
  },
  methods: {
    ...mapActions(["fetchComponents"]),
  },
};
</script>
