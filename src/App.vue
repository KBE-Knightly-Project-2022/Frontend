<template>
  <v-app class="font-ubuntu">
    <v-main>
      <v-row>
        <drawer></drawer>
        <router-view />
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
import Drawer from "../src/components/layout/Drawer.vue";

export default {
  name: "App",
  components: {
    Drawer,
  },
  data: () => ({
    //
  }),
};
</script>
<style>
.home {
  background-color: #ecddfdb1;
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
  background-color: #ecddfd;
  text-align: center !important;
}

.cursor-pointer {
  cursor: pointer;
}
</style>
