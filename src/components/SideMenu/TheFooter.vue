<template>
  <div>
    <div class="contact-icons">
      <SvgIcon
        class="svg-icon"
        type="mdi"
        :path="pathFB"
        @click="
          () => openInNewTab('https://www.facebook.com/robert.rozehnal.7')
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
</template>

<script setup lang="ts">
import { openInNewTab } from "@/utils/openNewTab";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiFacebook } from "@mdi/js";
import { mdiGithub } from "@mdi/js";

const pathFB = mdiFacebook;
const pathGithub = mdiGithub;
</script>

<style scoped>
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
