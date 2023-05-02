<template>
  <div class="container">
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
    
    <v-btn variant="elevated" color="error" @click="handleSubmitLogout">Logout</v-btn>    
  </div>
</div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, type Ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { useNotesStore } from "@/stores/notes";
import { useRouter } from "vue-router";
import TheNote from "@/components/UI/TheNote.vue";


type User = {
  name: string;
};

const store = useAuthStore();
const storeNotes = useNotesStore();
const { fetchUser, handleLogout } = store;
const { isLoggedIn, user } = storeToRefs(store);
const router = useRouter();

const showNotes = ref<boolean>(false);
const typedUser = user as Ref<User | null>;
const { allNotesHandler } = storeNotes;
const { allNotes } = storeToRefs(storeNotes);

const checkLogin = computed(() => isLoggedIn.value);

const handleSubmitLogout = async () => {
  await handleLogout();
  showNotes.value = false;
  console.log("Logged Out");
  router.push({name: "authWindow"});
};

onMounted(async () => {
  try {
    const userFound = await fetchUser();
    if (!userFound) {
      router.push({ name: "authWindow" });
    } else {
      await allNotesHandler();
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
  margin-top: 1.2rem;
}
</style>
