<template>
  <div>
    <transition name="input-scroll">
      <InputForm v-if="showInputState" />
    </transition>
    <div class="container">
      <div v-if="textabove" class="headline">
        <h1>Your saved notes</h1>
        <p>(click on a note for details)</p>
      </div>
      <div v-else class="without-heading"></div>
      <div v-if="checkLogin" class="container">
        <div v-for="(item, index) in allNotes" :key="index">
          <TheNote
            :id="item.id"
            :title="item.title"
            :note="item.note"
            :created_at="item.created_at"
            :importance="item.importance"                      
          />
        </div>
      </div>
    </div>    
  </div>
  
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { useNotesStore } from "@/stores/notes";
import { useRouter } from "vue-router";
import TheNote from "@/components/UI/TheNote.vue";
import InputForm from "@/components/InputForm.vue";
// import NoteDetail from "@/components/UI/NoteDetail.vue";

const store = useAuthStore();
const storeNotes = useNotesStore();
const { fetchUser } = store;
const { isLoggedIn, plusButton, showInputState } = storeToRefs(store);
const router = useRouter();


const { allNotesHandler } = storeNotes;
const { allNotes, textabove } = storeToRefs(storeNotes);

const checkLogin = computed(() => isLoggedIn.value);



onMounted(async () => {
  try {
    const userFound = await fetchUser();
    if (!userFound) {      
      router.push({ name: "authWindow" });
    } else {     
      await allNotesHandler();
      plusButton.value= true;
      console.log("WELCOME");
    }
  } catch (error) {
    console.error(error);
  }
});
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.headline {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
  line-height: 2rem;
  padding: 0.5rem;
}
.without-heading {
  margin-top: 3rem;
}

.input-scroll-enter-from {
  transform: translateY(-350px);
  height: 0;
  opacity: 0;
}
.input-scroll-enter-active {
  transition: all 0.5s ease-in;
}
.input-scroll-enter-to {
  opacity: 1;
  height: 450px;
}

.input-scroll-leave-from {
  opacity: 1;
  height: 450px;
 
}

.input-scroll-leave-active {
  transition: all 0.5s ease-out;
}
.input-scroll-leave-to {
  opacity: 0;
  height: 0;
  transform: translateY(-350px);
}
</style>
