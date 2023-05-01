<template>
  <div class="container">
    <h1>Welcome to</h1>
    <h1 class="text-rrnotes">rr-notes</h1>
    <div class="buttons">
      <RouterLink :to="{ name: 'login' }"
        ><v-btn variant="elevated" color="success">Login</v-btn></RouterLink
      >
      <RouterLink :to="{ name: 'register' }">
        <v-btn variant="elevated" color="warning">Register</v-btn></RouterLink
      >
    </div>
    <h2 v-if="checkLogin">I am logged in</h2>
    <h3 v-if="typedUser">{{ typedUser.name }}</h3> 
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import { computed, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";


const store = useAuthStore();
const { fetchUser } = store;
const { isLoggedIn, user } = storeToRefs(store);

const typedUser = user as Ref<User | null>;
  
const checkLogin = computed(() => isLoggedIn.value);

onMounted(async () => {
  await fetchUser();
});

</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.text-rrnotes {
  margin-bottom: 2rem;
}

.buttons {
  display: flex;
  flex-direction: column;  
  align-items: center;
  gap: 2rem;
  padding: 3rem;
  border: 1px solid black;
  border-radius: 1rem;
}
</style>
