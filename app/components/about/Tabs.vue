<script setup lang="ts">

const tabs = ref([
  {
    label: 'Условия для юрлиц',
    isActive: true,
  },
  {
    label: 'Условия для физлиц',
    isActive: false,
  },
])
function toggleActive(index: number) {
  tabs.value = tabs.value.map((item, i) => ({
    ...item,
    isActive: i === index
  }));
}
</script>

<template>
  <div class="grid gap-10">

    <div class="flex lg:grid grid-cols-2 gap-1 bg-gray-100 p-1 rounded-lg">

      <button v-for="(tab, i) in tabs" :key="i" @click="toggleActive(i)" :class="tab.isActive ? 'bg-white text-gray-950' : ' text-gray-600'"
        class="flex items-center justify-center grow gap-4 text-sm leading-5 w-full h-10 p-2.5 cursor-pointer transition rounded-lg">
        <p class="text-left font-semibold">
          {{ tab.label }}
        </p>
      </button>

    </div>

    <Cards v-if="tabs[0]?.isActive" />

    <AboutCards3 v-if="tabs[1]?.isActive" />

  </div>
</template>