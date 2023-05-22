<template>
  <div>
    <NavBar />
    <RouterView
      v-slot="{ Component }"
      :showInputState="showInputState.enterNote"
    >
      <transition name="trans">
        <component :is="Component" />
      </transition>
    </RouterView>
    <v-btn
      v-if="plusButton"
      class="plusButton"
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

const store = useAuthStore();
const { plusButton, showInputState } = storeToRefs(store);

// open window for inserting a note after clicking plus button
const showEnterForm = () => {
  showInputState.value.enterNote = !showInputState.value.enterNote;
  plusButton.value = false;
  window.scrollTo({top: 0});
};

</script>

<style scoped>
.plusButton {
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
