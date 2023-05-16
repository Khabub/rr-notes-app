<template>
  <div class="container display-flex">
    <form class="login-window display-flex" @submit.prevent>
      <h1>{{ setLang.loginPage.login2 }}</h1>
      <v-text-field
        class="input"
        :label="setLang.loginPage.label"
        density="compact"
        variant="outlined"
        v-model="form.name"
      ></v-text-field>
      <v-text-field
        class="input"
        type="password"
        @keydown.enter="handleSubmitLogin"
        :label="setLang.loginPage.password"
        density="compact"
        variant="outlined"
        v-model="form.password"
      ></v-text-field>
      <div class="buttons display-flex">
        <v-btn
          variant="elevated"
          density="compact"
          color="success"
          @click="handleSubmitLogin"
          >{{ setLang.loginPage.login }}</v-btn
        >
        <RouterLink :to="{ name: 'authWindow' }">
          <v-btn variant="elevated" density="compact" color="blue">{{
            setLang.loginPage.back
          }}</v-btn></RouterLink
        >
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useNotesStore } from "@/stores/notes";

interface Form {
  name: string;
  password: string;
  password_confirmation: string;
}

const store = useAuthStore();
const { handleLogin } = store;
const { isLoggedIn, plusButton, showInputState } = storeToRefs(store);
const router = useRouter();
const storeNotes = useNotesStore();
const { allNotes, setLang } = storeToRefs(storeNotes);

const form: Form = reactive({
  name: "",
  password: "",
  password_confirmation: "",
});

// login, redirect
const handleSubmitLogin = async () => {
  await handleLogin(form);
  if (isLoggedIn.value) {
    allNotes.value = [];
    router.push({ name: "mainPage" });
    showInputState.value.enterNote = false;
    showInputState.value.editNote = false;
    plusButton.value = true;    
  } else {
    console.log("NOT logged in");
  }
};
</script>

<style scoped>
.display-flex {
  display: flex;
  justify-content: center;
  align-items: center;
}
.container {
  height: 100vh;
}
.input {
  width: 200px;
}
.login-window {
  flex-direction: column;
  width: 260px;
  background-color: azure;
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 5px 5px 15px black;
}

h1 {
  margin-bottom: 2rem;
}

.buttons {
  margin: 1rem 0;
  justify-content: space-evenly;
  width: 260px;
}

.impRed {
  color: red;
}
.impOrange {
  color: orange;
}
.impGreen {
  color: Green;
}
</style>
