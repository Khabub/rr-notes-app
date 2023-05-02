<template>
  <v-layout>
    <div class="container">
      <h3 v-if="typedUser">{{ typedUser.name }}</h3>
      <h3 v-else>Not logged in</h3>
      <svg-icon type="mdi" :path="hamIcon" @click="handleNavMenu"></svg-icon>
      <v-navigation-drawer
        style="background-color: #b3b3da"
        v-model="drawer"
        location="left"
        width="180"
        temporary
      >
        <div class="footer">
          <div class="drawer">
            <h2>rr-notes</h2>
            <hr
              style="
                border-top: 3px solid grey;
                width: 110%;
                margin-bottom: 1rem;
              "
            />
            <h3 v-if="typedUser">{{ typedUser.name }}</h3>
            <h3 v-else>Not logged in</h3>
          </div>
          <div>
            <div className="contact-icons">
              <SvgIcon
                class="svg-icon"
                type="mdi"
                :path="pathFB"
                @click="
                  () =>
                    openInNewTab('https://www.facebook.com/robert.rozehnal.7')
                "
              ></SvgIcon>
              <SvgIcon
                class="svg-icon"
                type="mdi"
                :path="pathGithub"
                @click="() => openInNewTab('https://github.com/Khabub')"
              ></SvgIcon>
            </div>
            <p class="created">Created by Robert Rozehnal, 2023</p>
          </div>
        </div>
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
import { mdiFacebook } from "@mdi/js";
import { mdiGithub } from "@mdi/js";
import { openInNewTab } from "@/utils/openNewTab";
import { ref } from "vue";

type User = {
  name: string;
};

const store = useAuthStore();
const hamIcon = mdiMenu;
const pathFB = mdiFacebook;
const pathGithub = mdiGithub;
const drawer = ref<boolean>(false);

const { user } = storeToRefs(store);
const typedUser = user as Ref<User | null>;

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

h2 {
  padding: 0.5rem;
}
.drawer {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: auto;
  justify-content: space-between;
  height: 100vh;
}

.contact-icons {
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  align-items: flex-end;
}

.created {
  font-size: 0.7rem;
  margin-top: 0.5rem;
}
</style>
