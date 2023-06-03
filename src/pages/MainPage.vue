<template>
  <div>
    <transition name="input-scroll">
      <InputForm v-if="showInputState.enterNote" />
    </transition>
    <transition name="input-scroll">
      <EditForm v-if="showInputState.editNote" :data="notePropsData" />
    </transition>
    <div class="container">
      <div v-if="textabove && allNotes.length > 0" class="headline">
        <h1>{{ setLang.mainPage.h1 }}</h1>
        <p>{{ setLang.mainPage.p }}</p>
      </div>
      <div v-else class="without-heading"></div>
      <div v-if="!allNotes.length && !loading">
        <h1>{{ setLang.errors.emptyDB }}</h1>
      </div>
      <div v-if="checkLogin" class="container menuIcon">
        <div v-for="(item, index) in allNotes" :key="index">
          <TheNote
            :id="item.id"
            :title="item.title"
            :note="item.note"
            :created_at="item.created_at"
            :importance="item.importance"
            @note-props-edit="handleNotePropsEdit"
          />
        </div>
      </div>
    </div>
    <TheLoading v-if="loading" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive } from "vue";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { useNotesStore, type Note } from "@/stores/notes";
import { useRouter } from "vue-router";
import TheNote from "@/components/UI/TheNote.vue";
import InputForm from "@/components/InputForm.vue";
import EditForm from "@/components/EditForm.vue";
import type { NoteProps } from "@/components/UI/NoteDetail.vue";
import TheLoading from "@/components/UI/TheLoading.vue";

const store = useAuthStore();
const storeNotes = useNotesStore();
const { fetchUser } = store;
const { isLoggedIn, plusButton, showInputState } = storeToRefs(store);
const router = useRouter();
const { allNotesHandler } = storeNotes;
const { allNotes, textabove, setLang, loading } = storeToRefs(storeNotes);

const notePropsData: Note = reactive({
  id: 0,
  title: "",
  note: "",
  importance: "",
});

// check if is user logged in
const checkLogin = computed(() => isLoggedIn.value);

onMounted(async () => {
  try {
    const userFound = await fetchUser();
    loading.value = true;
    if (!userFound) {
      router.push({ name: "authWindow" });
    } else {
      console.log("User found!!!");
      await allNotesHandler();
      plusButton.value = true;
    }
  } catch (error) {
    console.error(error);
  }
});

const handleNotePropsEdit = (data: NoteProps) => {
  notePropsData.id = data.id as number;
  notePropsData.title = data.title as string;
  notePropsData.note = data.note as string;
  notePropsData.importance = data.importance as string;
};
</script>

<style scoped lang="scss">
  @import "../assets/globals.scss";
.container {
  @include flexDJA(column);
  height: 100%;
  
  h1 {
    text-align: center;
  }
}
.headline {
  @include flexDJA(column);
  margin-top: 3rem;
  line-height: 2rem;
  padding: 0.5rem;
}
.without-heading {
  margin-top: 3.5rem;
}
.input-scroll-enter-from {
  transform: translateY(-350px);
  @include opacityAndHeight (0, 0);  
}
.input-scroll-enter-active {
  transition: all 0.5s ease-in;
}
.input-scroll-enter-to {
  @include opacityAndHeight (1, 450px);
}
.input-scroll-leave-from {
  @include opacityAndHeight (1, 450px);
}
.input-scroll-leave-active {
  transition: all 0.5s ease-out;
}
.input-scroll-leave-to {
  @include opacityAndHeight (0, 0);
  transform: translateY(-350px);
}

@media (min-width: 900px) {
  .menuIcon:hover {
    cursor: pointer;
  }
}
</style>
