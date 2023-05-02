<template>
  <div class="container" :class="importanceCheck(props.importance!)">
    <div class="right-side-date">
      <span>{{ getTime(props.created_at as string) }}</span>
    </div>
    <div>
      <h2 class="note-heading-h2">{{ props.title }}</h2>
      <p class="note-content">{{ props.note }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import { getTime } from "@/utils/getTime";


const props = defineProps({
  id: Number as PropType<number>,
  title: String as PropType<string>,
  note: String as PropType<string>,
  importance: Number as PropType<number>,
  created_at: String as PropType<string>,
});



const importanceCheck = (item: number) => {
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
};
</script>

<style scoped>
.container {
  display: flex;
  position: relative;
  width: 90vw; 
  max-width: 350px;
  border: 2px solid;
  border-radius: 0.8rem;
  margin-bottom: 1rem;
  box-shadow: 5px 5px 10px 5px grey;
  padding: 0 1rem;    
}

.note-content {
  overflow: hidden;  
  font-size: 0.9rem;
  margin: 0.2rem 0 1.5rem;
}

.note-heading-h2 {
  font-size: 1.2rem;
  margin-top: 1rem;
}

.right-side-date {
  font-size: 0.8rem;
  position: absolute;
  font-style: italic;
  right: 10px;
  bottom: 2px;
}

.impRed {
  border-color: red;
}
.impOrange {
  border-color: orange;
}
.impGreen {
  border-color: green;
}
</style>
