<template>
  <div class="container" :class="importanceCheck(props.importance!)">
    <div class="right-side-date">
      <span>{{ getTime(props.created_at as string) }}</span>
    </div>
    <h2 class="note-heading-h2 note-position">{{ props.title }}</h2>
    <p class="note-content note-position">{{ props.note }}</p>

    <div class="edit-delete">
      <v-btn size="small" color="orange" variant="outlined">Edit</v-btn>
      <v-btn size="small" color="error" variant="flat">Delete</v-btn>
    </div>

    <svg-icon
      class="cancel-cross"
      type="mdi"
      :path="closeIcon"
      @click="emit('cancel-crossEmit')"
    ></svg-icon>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import { getTime } from "@/utils/getTime";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiClose } from "@mdi/js";

const closeIcon = mdiClose;

const props = defineProps({
  id: Number as PropType<number>,
  title: String as PropType<string>,
  note: String as PropType<string>,
  importance: String as PropType<string>,
  created_at: String as PropType<string>,
});

const emit = defineEmits<{ (event: "cancel-crossEmit"): void }>();

console.log("Note Detail");

const importanceCheck = (item: string) => {
  switch (item) {
    case "1":
      return "impRed";
    case "2":
      return "impOrange";
    case "3":
      return "impGreen";
    default:
      break;
  }
};
</script>

<style scoped>
.container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid;
  border-radius: 0.8rem;
  box-shadow: 5px 5px 10px 5px grey;
  background-color: white;
  padding: 0.3rem;
}

.note-position {
  width: 90vw;
  max-width: 350px;
  padding: 0 1.5rem;
}

.note-content {
  overflow: hidden;
  font-size: 0.9rem;
}

.note-heading-h2 {
  font-size: 1.2rem;
  margin-top: 1rem;
}

.right-side-date {
  font-size: 0.8rem;
  position: absolute;
  font-style: italic;
  right: 50%;
  transform: translateX(50px);
  bottom: 5px;
}

.impRed {
  border-color: red;
}
.impOrange {
  border-color: orange;
}
.impGreen {
  border-color: green;
}
.cancel-cross {
  position: absolute;
  top: 5px;
  right: 6px;
  color: red;
}
.edit-delete {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 350px;
  margin: 2rem 0;
}
</style>
