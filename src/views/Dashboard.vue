<template>
 
    <!-- </v-col> -->
    <v-col>
      <dashboard-main></dashboard-main>
      <Footer />
    </v-col>
</template>
<script>
import Footer from "../components/layout/Footer.vue";
import DashboardMain from "../components/DashboardMain.vue";
export default {
  components: {
    Footer,
    DashboardMain,
  },
};
</script>
