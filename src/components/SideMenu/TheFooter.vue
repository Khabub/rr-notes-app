<template>
  <div>
    <div class="contact-icons">
      <SvgIcon
        class="svg-icon menuIcon"
        type="mdi"
        :path="pathFB"
        @click="
          () => openInNewTab('https://www.facebook.com/robert.rozehnal.7')
        "
      ></SvgIcon>
      <SvgIcon
        class="svg-icon menuIcon"
        type="mdi"
        :path="pathGithub"
        @click="() => openInNewTab('https://github.com/Khabub')"
      ></SvgIcon>
    </div>
    <p class="created">{{ setLang.theFooter.p }}</p>
  </div>
</template>

<script setup lang="ts">
import { openInNewTab } from "@/utils/openNewTab";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiFacebook } from "@mdi/js";
import { mdiGithub } from "@mdi/js";
import { useNotesStore } from "@/stores/notes";
import { storeToRefs } from "pinia";

const { setLang } = storeToRefs(useNotesStore());
const pathFB = mdiFacebook;
const pathGithub = mdiGithub;
</script>

<style scoped lang="scss">
@import "../../assets/globals.scss";
.contact-icons {
  @include flexDJA(row, space-evenly, flex-end);
  width: 100%;
}
.created {
  font-size: 0.7rem;
  margin-top: 0.5rem;
}

@media (min-width: 900px) {
  .menuIcon:hover {
    cursor: pointer;
  }
}
</style>
