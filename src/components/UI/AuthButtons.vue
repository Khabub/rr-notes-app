<template>
  <v-btn
    :disabled="props.buttonState"
    variant="elevated"
    density="compact"
    color="success"
    @click="emit('submit-login')"
    >{{ props.lang }}</v-btn
  >
  <RouterLink :to="{ name: 'authWindow' }">
    <v-btn
      variant="elevated"
      density="compact"
      color="blue"
      @click="errors = ''"
      >{{ setLang.loginPage.back }}</v-btn
    ></RouterLink
  >
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useNotesStore } from "@/stores/notes";
import { useAuthStore } from "@/stores/auth";
import type { PropType } from "vue";

const { setLang } = storeToRefs(useNotesStore());
const { errors } = storeToRefs(useAuthStore());

const props = defineProps({
  lang: String as PropType<string>,
  buttonState: Boolean as PropType<boolean>,
});

const emit = defineEmits<{
  (event: "submit-login"): void;
}>();
</script>
