<template>
  <div class="container display-flex">
    <form class="login-window display-flex" @submit.prevent>
      <h1>{{ setLang.authPage.register_2 }}</h1>
      <v-text-field
        class="input"
        :label="setLang.loginPage.label"
        :rules="[rules.required]"
        density="compact"
        variant="outlined"
        clearable
        color="primary"
        v-model="form.name"
        style="margin-bottom: 1rem"
      ></v-text-field>
      <v-text-field
        class="input"
        :label="setLang.loginPage.password"
        :rules="[rules.required]"
        color="primary"
        clearable
        type="password"
        density="compact"
        variant="outlined"
        v-model="form.password"
        style="margin-bottom: 1rem"
      ></v-text-field>
      <v-text-field
        class="input"
        :label="setLang.loginPage.passConfirm"
        @keydown.enter="handleSubmitRegister"
        :rules="[rules.required]"
        color="primary"
        clearable
        type="password"
        density="compact"
        variant="outlined"
        v-model="form.password_confirmation"
      ></v-text-field>
      <div class="buttons display-flex">
        <v-btn
          :disabled="buttonState"
          variant="elevated"
          density="compact"
          color="warning"
          @click="handleSubmitRegister"
          >{{ setLang.authPage.register }}</v-btn
        >
        <RouterLink :to="{ name: 'authWindow' }">
          <v-btn variant="elevated" density="compact" color="blue" @click="errors = ''">{{
            setLang.loginPage.back
          }}</v-btn></RouterLink
        >
      </div>
      <v-alert
        v-if="errors"
        prominent
        variant="elevated"
        density="compact"
        type="error"
        :text="setLang.errors.login"
        style="margin-top: 1rem"
      ></v-alert>
    </form>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from "vue";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useNotesStore } from "@/stores/notes";

const storeNotes = useNotesStore();
const { setLang } = storeToRefs(storeNotes);

interface Form {
  name: string;
  password: string;
  password_confirmation: string;
}

const store = useAuthStore();
const { handleRegister } = store;
const { isLoggedIn, rules, errors } = storeToRefs(store);
const router = useRouter();

const form: Form = reactive({
  name: "",
  password: "",
  password_confirmation: "",
});

// disable login button if the inputs are empty
const buttonState = computed(
  () => !(form.name && form.password && form.password_confirmation) ?? true
);

// register
const handleSubmitRegister = async () => {  
  await handleRegister(form);
  if (isLoggedIn.value) {
    router.push({ name: "mainPage" });    
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
