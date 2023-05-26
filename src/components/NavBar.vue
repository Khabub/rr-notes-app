<template> 
  <v-layout>
    <div class="container">
      <h3 v-if="typedUser">{{ typedUser.name }}</h3>
      <h3 v-else>{{ setLang.navBar.h3 }}</h3>
      <svg-icon type="mdi" :path="hamIcon" @click="handleNavMenu"></svg-icon>
      <v-navigation-drawer
        style="background-color: #b3b3da"
        v-model="drawer"
        location="left"
        width="200"
        temporary          
      >
        <TheHeading />
      </v-navigation-drawer>
    </div>
  </v-layout>
</template>

<script setup lang="ts">
import type { Ref } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiMenu } from "@mdi/js";
import { ref } from "vue";
import TheHeading from "@/components/SideMenu/TheContent.vue";
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
const typedUser = user as Ref<User | null>;

// show/hide side menu
const handleNavMenu = () => {
  drawer.value = !drawer.value;
};
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
  padding: 0 0.5rem;
}

h3 {
  font-size: 0.8rem;
}
</style>
