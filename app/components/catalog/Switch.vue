<script setup lang="ts">
import List from './Icon/List.vue';
import Masonry from './Icon/Masonry.vue';

const emit = defineEmits(['handleClick'])


const items = ref([
  { label: 'list', icon: markRaw(List), isActive: false },
  { label: 'masonry', icon: markRaw(Masonry), isActive: true },
]);

function toggleActive(index: number) {
  items.value = items.value.map((t, i) => ({
    ...t,
    isActive: i === index
  }));
}

</script>

<template>

  <div class="flex gap-1 bg-gray-100 p-1 rounded-lg">
    <button v-for="(item, i) in items" :key="i" @click="toggleActive(i), $emit('handleClick')" :class="item.isActive ? 'bg-white text-gray-950 pointer-events-none' : 'hover:text-(--Brand-700)'"
      class="flex items-center justify-center grow w-9 h-9 cursor-pointer transition rounded-lg">
        <component :is="item.icon" />
    </button>
  </div>

</template>

<style scoped></style>