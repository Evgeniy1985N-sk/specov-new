<script setup lang="ts">
interface Props {
  class?: string
}
const props = defineProps<Props>()
const counter = ref(0)
</script>


<template>
  <div :class="props.class" 
  class="w-full bg-white border-zinc-300 gap-3 flex justify-between items-center border border-solid rounded-xl overflow-hidden text-emerald-950 
  text-sm">
    <button @click="counter--" class="h-10 w-10 cursor-pointer hover:bg-gray-100 transition">
      <svg width="100%" height="100%" style="overflow: visible;" preserveAspectRatio="none"
        viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.1667 20H25.8334" stroke="#0A0D12" stroke-width="1.66667" stroke-linecap="round"
          stroke-linejoin="round"></path>
      </svg>
    </button>
    <div class="flex items-center justify-center min-w-5">{{ counter < 0 ? counter = 0 : counter }}</div>
    <button @click="counter++" class="h-10 w-10 cursor-pointer hover:bg-gray-100 transition">
      <svg width="100%" height="100%" style="overflow: visible;" preserveAspectRatio="none"
        viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.0001 14.1667V25.8334M14.1667 20.0001H25.8334" stroke="#0A0D12" stroke-width="1.66667"
          stroke-linecap="round" stroke-linejoin="round"></path>
      </svg>
    </button>
  </div>
</template>