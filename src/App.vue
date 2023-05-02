<template>
  <NavBar />
  <RouterView> </RouterView>
  <v-btn
    class="plusButton"
    icon="mdi-plus"
    color="blue"
    size="large"
    style="font-size: 2rem"
    >+</v-btn
  >
</template>

<script setup lang="ts">
import "@fontsource/roboto";
import NavBar from "./components/NavBar.vue";
</script>

<style scoped>
.plusButton {
  position: absolute;
  right: 30px;
  bottom: 30px;
}
</style>
