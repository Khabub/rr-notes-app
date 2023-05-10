<template>
  <div class="container">
    <h2>Enter a note</h2>
    <v-form class="form" @submit.prevent>
      <v-text-field
        label="Heading (max 20 characters)"
        variant="outlined"
        density="compact"
        v-model="newNote.title"
      ></v-text-field>

      <v-textarea
        label="Note..."
        variant="outlined"
        density="compact"
        v-model="newNote.note"
      ></v-textarea>

      <v-radio-group class="radio-group" :inline="inlineState" v-model="newNote.importance">
        <v-radio
          style="margin-right: 1rem"
          class="very-important"
          label="Very important"
          value="1"
        ></v-radio>
        <v-radio
          style="margin-right: 1rem"
          class="important"
          label="Important"
          color="orange"
          value="2"
        ></v-radio>
        <v-radio
          class="notso-important"
          label="Not so important"
          color="green"
          value="3"          
        ></v-radio>
      </v-radio-group>

      <v-btn color="purple" width="100vw" @click="handleEnterNote">Enter note</v-btn>

      <svg-icon class="cancel-cross" type="mdi" :path="closeIcon" @click="handleCancelCross"></svg-icon>
    </v-form>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, reactive } from "vue";
import { ref } from "vue";
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiClose } from '@mdi/js';
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { useNotesStore, type Note } from "@/stores/notes";


//const radios = ref<string>("3");
const inlineState = ref<boolean>();
const closeIcon = mdiClose;
const store = useAuthStore();
const storeNotes = useNotesStore();
const { plusButton, showInputState } = storeToRefs(store);
const { handleCreateNote } = storeNotes;

const newNote: Note = reactive({
  title: "",
  note: "",
  importance: "3"
})

const handleResize = () => {
  if (innerWidth < 506) {
    inlineState.value = false;
  } else if (innerWidth >= 506) {
    inlineState.value = true;
  }
};

const handleCancelCross = () => {
  showInputState.value = false;
  plusButton.value = true;
}

const handleEnterNote = async () => {
  await handleCreateNote(newNote);
  showInputState.value = false;
  plusButton.value = true;
  console.log(newNote);
}

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
