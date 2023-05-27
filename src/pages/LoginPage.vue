<template>
  <div class="container display-flex">
    <form class="login-window display-flex" @submit.prevent>
      <h1>{{ setLang.loginPage.login2 }}</h1>
      <v-text-field
        v-model="form.name"
        class="input"        
        :label="setLang.loginPage.label"
        :rules="[rules.required]"        
        clearable    
        density="compact"
        variant="outlined"
        style="margin-bottom: 1rem"
        color="primary"        
      ></v-text-field>
      <v-text-field
        class="input"
        ref="textInput"
        type="password"
        @keydown.enter="handleSubmitLogin"
        :label="setLang.loginPage.password"
        :rules="[rules.required]"
        color="primary"
        clearable
        density="compact"
        variant="outlined"
        v-model="form.password"
      ></v-text-field>
      <div class="buttons display-flex">
        <v-btn
          :disabled="buttonState"
          variant="elevated"
          density="compact"
          color="success"
          @click="handleSubmitLogin"
          >{{ setLang.loginPage.login }}</v-btn
        >
        <RouterLink :to="{ name: 'authWindow' }">
          <v-btn
            variant="elevated"
            density="compact"
            color="blue"
            @click="errors = ''"
            >{{ setLang.loginPage.back }}</v-btn
          ></RouterLink
        >
      </div>
      <v-alert
        v-if="errors"
        prominent           
        variant="elevated"
        density="compact"
        type="error"
        :text="setLang.errors.login"
        style="margin-top: 1rem;"
      ></v-alert>
    </form>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useNotesStore } from "@/stores/notes";

interface Form {
  name: string;
  password: string;  
}

const store = useAuthStore();
const { handleLogin } = store;
const { isLoggedIn, plusButton, showInputState, rules, errors } =
  storeToRefs(store);
const router = useRouter();
const storeNotes = useNotesStore();
const { allNotes, setLang } = storeToRefs(storeNotes);

const form: Form = reactive({
  name: "",
  password: "",  
});

// when using enter on mobile keyboard, the keyboard will disappear
const textInputRef = ref<HTMLInputElement | null>(null);

// diable login button if the inputs are empty
const buttonState = computed(() => !(form.name && form.password) ?? true);

// login, redirect
const handleSubmitLogin = async () => {
  textInputRef.value?.blur();
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
  align-items: flex-start;  
  margin-top: 2rem;
}
.container {
  height: 100vh;
}
.input {
  width: 200px;
}
.login-window {
  flex-direction: column;
  align-items: center;
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
