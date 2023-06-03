<template>
  <div class="container">
    <h1>{{ setLang.authPage.h1 }}</h1>
    <h1 class="text-rrnotes">rr-notes</h1>
    <div class="buttons">
      <RouterLink :to="{ name: 'login' }"
        ><v-btn variant="elevated" color="success">{{
          setLang.authPage.login
        }}</v-btn></RouterLink
      >
      <RouterLink :to="{ name: 'register' }">
        <v-btn variant="elevated" color="warning">{{
          setLang.authPage.register
        }}</v-btn></RouterLink
      >
    </div>
    <h5 class="infotext">{{ setLang.authPage.infoText }}</h5>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useNotesStore } from "@/stores/notes";

const storeNotes = useNotesStore();
const { setLang } = storeToRefs(storeNotes);
</script>

<style scoped lang="scss">
@import "../assets/globals.scss";
.container {
  @include flexDJA(column);
  height: 100vh;
  .text-rrnotes {
    margin-bottom: 2rem;
  }
  .buttons {
    @include flexDJA(column);
    gap: 2rem;
    padding: 3rem;
    border: 1px solid $color-border;
    border-radius: 1rem;
  }
  .infotext {
    text-align: center;
    margin-top: 1rem;
    padding: 0.5rem;
  }
}
</style>
