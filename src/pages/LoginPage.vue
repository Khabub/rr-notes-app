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
        <AuthButtons
          :buttonState="buttonState"
          @submit-login="handleSubmitLogin"
          :lang="setLang.loginPage.login"
        />
      </div>
      <TheAlert />
    </form>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from "vue";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useNotesStore } from "@/stores/notes";
import AuthButtons from "@/components/UI/AuthButtons.vue";
import TheAlert from "@/components/UI/TheAlert.vue";

interface Form {
  name: string;
  password: string;
}

const store = useAuthStore();
const { handleLogin } = store;
const { isLoggedIn, plusButton, showInputState, rules } =
  storeToRefs(store);
const router = useRouter();
const storeNotes = useNotesStore();
const { allNotes, setLang } = storeToRefs(storeNotes);

const form: Form = reactive({
  name: "",
  password: "",
});

// diable login button if the inputs are empty
const buttonState = computed(() => !(form.name && form.password) ?? true);

// login, redirect
const handleSubmitLogin = async () => {
  // remove keyboard on mobile after enter
  const buttonElement = document.querySelector("button");
  if (buttonElement) {
    buttonElement.focus();
  }
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

<style scoped lang="scss">
@import "../assets/login-register.scss";
</style>
