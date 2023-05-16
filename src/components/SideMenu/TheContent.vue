<template>
  <div class="side-menu">
    <div class="drawer">
      <h2>rr-notes</h2>
      <hr
        style="border-top: 3px solid grey; width: 110%; margin-bottom: 1rem"
      />
      <h3 v-if="typedUser">{{ typedUser.name }}</h3>
      <h3 v-else>{{ setLang.theContent.h3 }}</h3>
      <v-btn
        v-if="isLoggedIn"
        class="logout-class"
        variant="elevated"
        density="compact"
        color="error"
        @click="handleSubmitLogout"
        >{{ setLang.theContent.logout }}</v-btn
      >
      <hr style="border-top: 3px solid grey; width: 110%; margin-top: 1rem" />
      <div v-if="isLoggedIn" class="textabove">
        <h4>{{ setLang.theContent.h4 }}</h4>
        <v-switch v-model="textabove" color="primary" hide-details></v-switch>
      </div>
      <div class="textabove">
        <h4>{{ setLang.theContent.h4_1 }}</h4>
        <v-radio-group class="radio-label" v-model="radios">
          <v-radio label="ENG" color="primary" value="english"></v-radio>
          <v-radio label="CZE" color="primary" value="czech"></v-radio>
        </v-radio-group>
      </div>
      <div v-if="isLoggedIn" class="savenotes">
        <h4>{{ setLang.theContent.h4_2 }}</h4>
        <v-btn
          class="logout-class"
          variant="elevated"
          density="compact"
          color="primary"
          @click="saveToFile(allNotes)"
          >{{ setLang.theContent.save }}</v-btn
        >
      </div>
    </div>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import { saveToFile } from "@/utils/saveToFile";
import TheFooter from "@/components/SideMenu/TheFooter.vue";
import { useNotesStore } from "@/stores/notes";
import { useRouter } from "vue-router";
import { ref } from "vue";
import type { Ref } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";

type User = {
  name: string;
};

const store = useAuthStore();
const showNotes = ref<boolean>(false);
const { handleLogout } = store;
const router = useRouter();
const storeNotes = useNotesStore();
const { textabove, allNotes, radios, setLang } = storeToRefs(storeNotes);
const { user, isLoggedIn, plusButton } = storeToRefs(store);

const typedUser = user as Ref<User | null>;

// logout
const handleSubmitLogout = async () => {
  await handleLogout();
  showNotes.value = false;
  plusButton.value = false;
  router.push({ name: "authWindow" });
};
</script>

<style scoped>
.drawer {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.side-menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: auto;
  justify-content: space-between;
  height: 100vh;
}
.logout-class {
  margin-top: 1rem;
}
.textabove,
.savenotes {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid grey;
  padding: 1rem 1rem 0 1rem;
  border-radius: 1rem;
  margin: 0.9rem;
}

.savenotes {
  padding-bottom: 1rem;
}

h2 {
  padding: 0.5rem;
}
h3 {
  font-size: 0.9rem;
}

h4 {
  font-weight: 400;
  text-align: center;
}
.radio-label {
  font-weight: 700;
}
</style>
