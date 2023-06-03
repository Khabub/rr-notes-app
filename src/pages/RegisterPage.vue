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
        <AuthButtons
          :buttonState="buttonState"
          @submit-login="handleSubmitRegister"
          :lang="setLang.authPage.register"
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

const storeNotes = useNotesStore();
const { setLang } = storeToRefs(storeNotes);

interface Form {
  name: string;
  password: string;
  password_confirmation: string;
}

const store = useAuthStore();
const { handleRegister } = store;
const { isLoggedIn, rules } = storeToRefs(store);
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
  // remove keyboard on mobile after enter
  const buttonElement = document.querySelector("button");
  if (buttonElement) {
    buttonElement.focus();
  }
  await handleRegister(form);
  if (isLoggedIn.value) {
    router.push({ name: "mainPage" });
  }
};
</script>

<style scoped lang="scss">
@import "../assets/login-register.scss";
</style>
