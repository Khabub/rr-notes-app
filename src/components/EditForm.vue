<template>
  <div class="container">
    <h2>{{ setLang.editForm.h2 }}</h2>
    <v-form class="form" @submit.prevent>
      <v-text-field
        :label="setLang.editForm.labelHeading"
        :rules="[rules.required, rules.length]"
        variant="outlined"
        density="compact"
        v-model="newNote.title"
        style="margin-bottom: 1rem"
      ></v-text-field>

      <v-textarea
        :label="setLang.editForm.labelNote"
        :rules="[rules.required]"
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

      <v-btn
        color="purple"
        width="100vw"
        :disabled="buttonState || !(newNote.title.length <= 21)"
        @click="handleEditNote"
        >{{ setLang.editForm.edit }}</v-btn
      >

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
import { computed, onBeforeMount, reactive } from "vue";
import { ref } from "vue";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiClose } from "@mdi/js";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { useNotesStore, type Note } from "@/stores/notes";
import type { PropType } from "vue";
import { useSnackbar } from "@/stores/snackbar";
import { onUpdated } from "vue";

const inlineState = ref<boolean>();
const closeIcon = mdiClose;
const store = useAuthStore();
const storeNotes = useNotesStore();
const { plusButton, showInputState, rules } = storeToRefs(store);
const { handleUpdateNote, allNotesHandler } = storeNotes;
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

// disable submit button button if the inputs are empty
const buttonState = computed(() => !(newNote.title && newNote.note) ?? true);

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
  await allNotesHandler();
  getSnackbar(true, "orange", setLang.value.editForm.noteUpdate!);
  showInputState.value.editNote = false;
  plusButton.value = true;
};

// listen to resize event
onBeforeMount(() => {
  addEventListener("resize", handleResize);
});

// focus form
onUpdated(() => {
  window.scrollTo({ top: 0 });
});
</script>

<style scoped lang="scss">
@import "../assets/globals.scss";
.container {
  @include flexDJA(column);
  margin-top: 3rem;
  width: 100vw;
  .form {
    width: 90vw;
    max-width: 550px;
    position: relative;
  }
  h2 {
    text-align: center;
    margin-bottom: 1rem;
  }
  .very-important {
    color: $color-importanceRed;
  }
  .important {
    color: $color-importanceOrange;
  }
  .notso-important {
    color: $color-importanceGreen;
  }
  .radio-group {
    @include flexDJA();
    width: 100%;
    margin-bottom: 1rem;
  }
  .cancel-cross {
    position: absolute;
    top: -44px;
    right: 0px;
    color: $color-cancelCross;
  }
}

@media (min-width: 900px) {
  .cancel-cross:hover {
    cursor: pointer;
  }
}
</style>
