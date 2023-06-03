<template>
  <v-alert
    v-if="errors"
    prominent
    variant="elevated"
    density="compact"
    type="error"
    :text="setLang.errors.login"
    style="margin-top: 1rem"
  ></v-alert>
</template>

<script setup lang="ts">
import { useNotesStore } from "@/stores/notes";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";

const { setLang } = storeToRefs(useNotesStore());
const { errors } = storeToRefs(useAuthStore());
</script>
