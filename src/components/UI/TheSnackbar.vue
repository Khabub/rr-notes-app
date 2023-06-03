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
import { storeToRefs } from "pinia";
import { useSnackbar } from "@/stores/snackbar";

const { snackbar } = storeToRefs(useSnackbar());
</script>
