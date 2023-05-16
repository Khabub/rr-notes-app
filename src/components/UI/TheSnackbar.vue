<template>
  <v-snackbar
    location="bottom left"
    min-width="auto"
    style="margin-bottom: 0.5rem"
    :color="snackbar.color"
    v-model="snackbar.open"
    :timeout="snackbar.timeout"
  >
    {{ snackbar.text }}
  </v-snackbar>
</template>

<script setup lang="ts">
import { useNotesStore } from "@/stores/notes";
import { storeToRefs } from "pinia";

const storeNotes = useNotesStore();
const { snackbar } = storeToRefs(storeNotes);
</script>

<style scoped></style>
