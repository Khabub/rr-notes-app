<template>
  <div
    class="container note-position"
    :class="importanceCheck(props.importance!)"
    @click="handleNoteDetailShow"
  >
    <div class="right-side-date">
      <span>{{ getTime(props.created_at as string) }}</span>
    </div>

    <h2 class="note-heading-h2 note-position">{{ props.title }}</h2>
    <p class="note-content note-position">{{ props.note }}</p>
  </div>
  <v-dialog v-model="noteDetailShow" max-width="380px">
    <NoteDetail
      :id="props.id"
      :title="props.title"
      :note="props.note"
      :importance="props.importance"
      :created_at="props.created_at"
      @cancel-crossEmit="handleNoteDetailShow"
      @note-props="emitHandle"
    />
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, type PropType } from "vue";
import { getTime } from "@/utils/getTime";
import NoteDetail, { type NoteProps } from "./NoteDetail.vue";

const noteDetailShow = ref<boolean>(false);

const props = defineProps({
  id: Number as PropType<number>,
  title: String as PropType<string>,
  note: String as PropType<string>,
  importance: String as PropType<string>,
  created_at: String as PropType<string>,
});

const emit = defineEmits<{
  (event: "note-props-edit", value: NoteProps): void;
}>();

const emitHandle = (data: NoteProps) => {
  emit("note-props-edit", data);
};

const handleNoteDetailShow = () => {
  noteDetailShow.value = !noteDetailShow.value;
};

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
  border: 2px solid;
  border-radius: 0.8rem;
  margin-bottom: 1rem;
  box-shadow: 5px 5px 10px 5px grey;
}

.note-position {
  width: 90vw;
  max-width: 350px;
  padding: 0 0.5rem;
}

.note-content {
  overflow: hidden;
  font-size: 0.9rem;
  margin: 0.2rem 0 1.5rem;
}

.note-heading-h2 {
  font-size: 1.2rem;
  margin-top: 1rem;
}

.right-side-date {
  font-size: 0.8rem;
  position: absolute;
  font-style: italic;
  right: 10px;
  bottom: 2px;
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
</style>
