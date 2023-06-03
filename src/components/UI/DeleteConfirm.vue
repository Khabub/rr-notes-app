<template>
  <div class="alert-dialog">
    {{ setLang.noteDetail.confirm }}
    <div class="alert-buttons">
      <v-btn
        variant="elevated"
        color="red"
        size="small"
        @click="emit('alert-dialog')"
        >{{ setLang.noteDetail.confirm_btn }}</v-btn
      >
      <v-btn
        variant="elevated"
        color="blue"
        size="small"
        @click="emit('alert-set')"
        >{{ setLang.noteDetail.cancel }}</v-btn
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNotesStore } from "@/stores/notes";
import { storeToRefs } from "pinia";

const storeNotes = useNotesStore();
const { setLang } = storeToRefs(storeNotes);

const emit = defineEmits<{
  (event: "alert-dialog"): void;
  (event: "alert-set"): void;
}>();
</script>

<style scoped lang="scss">
@import "../../assets/globals.scss";
.alert-dialog {
  @include flexDJA(column);  
  gap: 1rem;
  background-color: $color-loginWindow;
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 5px 5px 10px $color-boxShadow;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 250px;
  .alert-buttons {
    @include flexDJA(row, space-around);    
    width: inherit;
  }
}
</style>
