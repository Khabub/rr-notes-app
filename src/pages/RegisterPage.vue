<template>
  <div class="container display-flex">
    <form class="login-window display-flex" @submit.prevent>
      <h1>Register</h1>
      <v-text-field
        class="input"
        label="Name"
        density="compact"
        variant="outlined"
        v-model="form.name"
      ></v-text-field>
      <v-text-field
        class="input"
        label="Password"
        density="compact"
        variant="outlined"
        v-model="form.password"
      ></v-text-field>
      <v-text-field
        class="input"
        label="Password Confirm"
        density="compact"
        variant="outlined"
        v-model="form.password_confirmation"
      ></v-text-field>
      <div class="button-register">
        <v-btn variant="elevated" color="warning" @click="handleSubmitRegister"
          >Register</v-btn
        >
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";

interface Form {
  name: string;
  password: string;
  password_confirmation: string;
}

/* type User = {
  name: string;
}; */

const store = useAuthStore();
const { handleRegister } = store;
const { isLoggedIn } = storeToRefs(store);

// const typedUser = user as Ref<User | null>;

const form: Form = reactive({
  name: "",
  password: "",
  password_confirmation: "",
});

// const showNotes = ref<boolean>(false);

// const checkLogin = computed(() => isLoggedIn.value);

const handleSubmitRegister = async () => {
  await handleRegister(form);
  if (isLoggedIn.value) {
    console.log("Registered");
  }
};

/* const handleSubmitLogout = async () => {
  await handleLogout();
  showNotes.value = false;
  console.log("Logged Out");
};

const handleGetAllNotes = async () => {
  if (isLoggedIn.value) {
    await allNotesHandler();
    showNotes.value = true;
  }
}; */

/* const importanceCheck = (item: number) => {
  switch (item) {
    case 1:
      return "impRed";
    case 2:
      return "impOrange";
    case 3:
      return "impGreen";
    default:
      break;
  }
}; */
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

.button-register {
  margin: 1rem 0;
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
