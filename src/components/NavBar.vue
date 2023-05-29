<template>
  <v-layout>
    <div class="container">
      <h3 v-if="typedUser">{{ typedUser.name }}</h3>
      <h3 v-else>{{ setLang.navBar.h3 }}</h3>
      <svg-icon
        class="menuIcon"
        type="mdi"
        :path="hamIcon"
        @click="handleNavMenu"
      ></svg-icon>
      <v-navigation-drawer
        style="background-color: #b3b3da"
        v-model="drawer"
        location="left"
        width="200"
        ><TheContent />
      </v-navigation-drawer>
    </div>
  </v-layout>
</template>

<script setup lang="ts">
import { watch, type Ref } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiMenu } from "@mdi/js";
import { ref } from "vue";
import TheContent from "@/components/SideMenu/TheContent.vue";
import { useNotesStore } from "@/stores/notes";

const storeNotes = useNotesStore();
const { setLang } = storeToRefs(storeNotes);

type User = {
  name: string;
};

const store = useAuthStore();
const hamIcon = mdiMenu;
const drawer = ref<boolean>(false);

const { user } = storeToRefs(store);
const { plusButton, isLoggedIn } = storeToRefs(store);
const typedUser = user as Ref<User | null>;

const emit = defineEmits<{
  (event: "sidemenu-open", value: boolean): void;
}>();

// show/hide side menu
const handleNavMenu = () => {
  drawer.value = !drawer.value;
};

watch(drawer, (oldValue, newValue) => {
  if (isLoggedIn.value) {
    plusButton.value = !plusButton.value;
  }
  emit("sidemenu-open", !newValue);
});
</script>

<style scoped>
.container {
  position: fixed;
  top: 0;
  background-color: #9ef4ff;
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  z-index: 900;
  padding: 0 1rem;
}

h3 {
  font-size: 0.8rem;
}


@media (min-width: 900px) {
  .menuIcon:hover {
    cursor: pointer;
  }
}
</style>
