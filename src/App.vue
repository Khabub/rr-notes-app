<template>
  <div>
    <NavBar @sidemenu-open="(value) => (drawer = value)" />
    <RouterView
      v-slot="{ Component }"
      :class="drawer ? 'side-menu-visible' : 'side-menu-hidden'"
      :showInputState="showInputState.enterNote"
    >
      <transition name="trans">
        <component :is="Component" />
      </transition>
    </RouterView>
    <v-btn
      v-if="plusButton"
      class="plus-button"
      icon="mdi-plus"
      color="blue"
      size="large"
      style="font-size: 2rem"
      @click="showEnterForm"
      >+</v-btn
    >
    <TheSnackbar />
  </div>
</template>

<script setup lang="ts">
import "@fontsource/roboto";
import NavBar from "./components/NavBar.vue";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import TheSnackbar from "./components/UI/TheSnackbar.vue";
import { ref } from "vue";

const store = useAuthStore();
const { plusButton, showInputState } = storeToRefs(store);
const drawer = ref<boolean>(false);

// open window for inserting a note after clicking plus button
const showEnterForm = () => {
  showInputState.value.enterNote = !showInputState.value.enterNote;
  plusButton.value = false;
  window.scrollTo({ top: 0 });
};
</script>

<style scoped lang="scss">
@import "../src/assets/globals";

.side-menu-visible {
  background-color: $color-sideMenu;
  filter: blur(2px);
  opacity: 0.5;
  pointer-events: none;
  transition: all 0.5s;  
}
.side-menu-hidden {
  background-color: transparent;
  filter: blur(0);
  opacity: 1;
  transition: all 0.5s;
}
.plus-button {
  position: fixed;
  right: 30px;
  bottom: 30px;
}

.trans-enter-from {
  opacity: 0;
}
.trans-enter-active {
  transition: opacity 0.5s ease-in;
}
.trans-enter-to {
  opacity: 1;
}
</style>
