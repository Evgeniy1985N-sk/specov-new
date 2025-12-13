<script setup lang="ts">
interface Props {
  class?: string
}
const props = defineProps<Props>()
</script>

<template>
  <!-- search -->
  <form :class="props.class"
    class="w-full border-zinc-300 py-[7px] sm:py-[9px] px-[11px] gap-2 flex justify-center bg-white items-center border border-solid rounded-lg">
    <input class="line-clamp-1 w-full font-medium text-gray-500 overflow-ellipsis focus:outline-none"
      placeholder="Найти спецодежду или инструменты">
    <button class="h-5 w-5 cursor-pointer"><svg width="100%" height="100%" style="overflow: visible;" preserveAspectRatio="none"
        viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M17.5 17.5L14.5834 14.5833M16.6667 9.58333C16.6667 13.4954 13.4954 16.6667 9.58333 16.6667C5.67132 16.6667 2.5 13.4954 2.5 9.58333C2.5 5.67132 5.67132 2.5 9.58333 2.5C13.4954 2.5 16.6667 5.67132 16.6667 9.58333Z"
          stroke="#717680" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"></path>
      </svg>
    </button>
  </form>
</template>