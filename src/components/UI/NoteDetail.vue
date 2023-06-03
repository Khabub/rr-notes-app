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
      <DeleteConfirm
        @alert-dialog="handleAlertDelete"
        @alert-set="alertDialog = false"
      />
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
import { importanceCheck } from "@/utils/importanceCheck";
import DeleteConfirm from "@/components/UI/DeleteConfirm.vue";

const closeIcon = mdiClose;
const storeNotes = useNotesStore();
const store = useAuthStore();
const storeSnackbar = useSnackbar();
const { handleDeleteNote } = storeNotes;
const { setLang } = storeToRefs(storeNotes);
const { plusButton, showInputState } = storeToRefs(store);
const { getSnackbar } = storeSnackbar;
const alertDialog = ref<boolean>(false);

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

<style scoped lang="scss">
@import "../../assets/globals.scss";
.container {
  position: relative;
  @include flexDJA(column);
  border: 2px solid;
  background-color: $color-loginWindow;
  padding: 0.3rem;
  border-radius: 0.8rem;
  box-shadow: 5px 5px 10px 5px $color-boxShadow;

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
  .cancel-cross {
    position: absolute;
    top: 5px;
    right: 6px;
    color: $color-cancelCross;
  }
  .edit-delete {
    @include flexDJA(row, space-evenly);
    width: 350px;
    margin: 2rem 0;
  }
}
.note-position {
  width: 90vw;
  max-width: 350px;
  padding: 0 1.5rem;
}

.impRed {
  border-color: $color-importanceRed;
}
.impOrange {
  border-color: $color-importanceOrange;
}
.impGreen {
  border-color: $color-importanceGreen;
}

@media (min-width: 900px) {
  .cancel-cross:hover {
    cursor: pointer;
  }
}
</style>
