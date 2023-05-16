<template>
  <div class="container">
    <h2>{{ setLang.editForm.h2 }}</h2>
    <v-form class="form" @submit.prevent>
      <v-text-field
        :label="setLang.editForm.labelHeading"
        variant="outlined"
        density="compact"
        v-model="newNote.title"
      ></v-text-field>

      <v-textarea
        :label="setLang.editForm.labelNote"
        variant="outlined"
        density="compact"
        v-model="newNote.note"
      ></v-textarea>

      <v-radio-group
        class="radio-group"
        :inline="inlineState"
        v-model="newNote.importance"
      >
        <v-radio
          style="margin-right: 1rem"
          class="very-important"
          :label="setLang.editForm.labelImportance1"
          value="1"
        ></v-radio>
        <v-radio
          style="margin-right: 1rem"
          class="important"
          :label="setLang.editForm.labelImportance2"
          color="orange"
          value="2"
        ></v-radio>
        <v-radio
          class="notso-important"
          :label="setLang.editForm.labelImportance3"
          color="green"
          value="3"
        ></v-radio>
      </v-radio-group>

      <v-btn color="purple" width="100vw" @click="handleEditNote">{{
        setLang.editForm.edit
      }}</v-btn>

      <svg-icon
        class="cancel-cross"
        type="mdi"
        :path="closeIcon"
        @click="handleCancelCross"
      ></svg-icon>
    </v-form>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, reactive } from "vue";
import { ref } from "vue";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiClose } from "@mdi/js";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { useNotesStore, type Note } from "@/stores/notes";
import type { PropType } from "vue";
import { useSnackbar } from "@/stores/snackbar";

const inlineState = ref<boolean>();
const closeIcon = mdiClose;
const store = useAuthStore();
const storeNotes = useNotesStore();
const { plusButton, showInputState } = storeToRefs(store);
const { handleUpdateNote } = storeNotes;
const { setLang } = storeToRefs(storeNotes);
const storeSnackbar = useSnackbar();
const { getSnackbar } = storeSnackbar;

const props = defineProps({
  data: {} as PropType<Note>,
});

// get values from props (detail note window)
const newNote = reactive({
  id: props.data?.id,
  title: props.data?.title,
  note: props.data?.note,
  importance: props.data?.importance,
}) as Note;

// set radios buttons inline or not according to resize
const handleResize = () => {
  if (innerWidth < 506) {
    inlineState.value = false;
  } else if (innerWidth >= 506) {
    inlineState.value = true;
  }
};

// cancel the window for editing note
const handleCancelCross = () => {
  showInputState.value.editNote = false;
  plusButton.value = true;
};

// submit the changes
const handleEditNote = async () => {
  await handleUpdateNote(newNote);
  getSnackbar(true, "orange", setLang.value.editForm.noteUpdate!);
  showInputState.value.editNote = false;
  plusButton.value = true;
};

// listen to resize event
onBeforeMount(() => {
  addEventListener("resize", handleResize);
});
</script>

<style scoped>
.container {
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
}

h2 {
  text-align: center;
  margin-bottom: 1rem;
}

.very-important {
  color: red;
}
.important {
  color: orange;
}
.notso-important {
  color: green;
}

.radio-group {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}
.form {
  width: 90vw;
  max-width: 550px;
}

.cancel-cross {
  position: absolute;
  top: 55px;
  right: 30px;
  color: red;
}
</style>
