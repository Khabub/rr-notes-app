<template>
  <div class="container" :class="importanceCheck(props.importance!)">
    <div class="right-side-date">
      <span>{{ getTime(props.created_at as string) }}</span>
    </div>
    <h2 class="note-heading-h2 note-position">{{ props.title }}</h2>
    <p class="note-content note-position">{{ props.note }}</p>

    <div class="edit-delete">
      <v-btn
        size="small"
        color="orange"
        variant="outlined"
        @click="handleEdit"
        >{{ setLang.noteDetail.edit }}</v-btn
      >
      <v-btn
        size="small"
        color="error"
        variant="flat"
        @click="alertDialog = true"
        >{{ setLang.noteDetail.delete }}</v-btn
      >
    </div>

    <svg-icon
      class="cancel-cross"
      type="mdi"
      :path="closeIcon"
      @click="emit('cancel-crossEmit')"
    ></svg-icon>

    <v-dialog v-model="alertDialog">
      <div class="alert-dialog">
        {{ setLang.noteDetail.confirm }}
        <div class="alert-buttons">
          <v-btn
            variant="elevated"
            color="red"
            size="small"
            @click="handleAlertDelete"
            >{{ setLang.noteDetail.confirm_btn }}</v-btn
          >
          <v-btn
            variant="elevated"
            color="blue"
            size="small"
            @click="alertDialog = false"
            >{{ setLang.noteDetail.cancel }}</v-btn
          >
        </div>
      </div>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import { getTime } from "@/utils/getTime";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiClose } from "@mdi/js";
import { useNotesStore } from "@/stores/notes";
import { useAuthStore } from "@/stores/auth";
import { useSnackbar } from "@/stores/snackbar";
import { storeToRefs } from "pinia";
import { reactive, ref } from "vue";

const closeIcon = mdiClose;
const storeNotes = useNotesStore();
const store = useAuthStore();
const storeSnackbar = useSnackbar();
const alertDialog = ref<boolean>(false);

const { handleDeleteNote } = storeNotes;
const { setLang } = storeToRefs(storeNotes);
const { plusButton, showInputState } = storeToRefs(store);
const { getSnackbar } = storeSnackbar;

// props from TheNote
const props = defineProps({
  id: Number as PropType<number>,
  title: String as PropType<string>,
  note: String as PropType<string>,
  importance: String as PropType<string>,
  created_at: String as PropType<string>,
});

const noteDetailsProps = reactive(props);
export type NoteProps = typeof props;

// emits
const emit = defineEmits<{
  (event: "cancel-crossEmit"): void;
  (event: "note-props", value: NoteProps): void;
}>();

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

const handleEdit = () => {
  emit("cancel-crossEmit");
  emit("note-props", noteDetailsProps);
  showInputState.value.editNote = !showInputState.value.editNote;
  plusButton.value = false;
};

const handleAlertDelete = async () => {
  await handleDeleteNote(props.id as number);
  getSnackbar(true, "red", setLang.value.noteDetail.noteDeleted!);
  emit("cancel-crossEmit");
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

.alert-dialog {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: rgb(255, 255, 255);
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 5px 5px 10px grey;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 250px;
}
.alert-buttons {
  display: flex;
  justify-content: space-around;
  width: inherit;
}
</style>
