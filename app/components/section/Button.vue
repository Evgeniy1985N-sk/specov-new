<script setup lang="ts">
interface Props {
  text: string
  path: string
}
const props = defineProps<Props>()
</script>

<template>
 <a :href="props.path"
  class="border border-(--border) sm:border-0 flex justify-center flex-wrap items-center w-9 h-9 sm:w-auto sm:h-auto gap-2 sm:bg-gray-100 hover:bg-gray-200 transition-colors duration-200 sm:px-3.5 sm:py-2.5 rounded-lg cursor-pointer"
>
    <div class="hidden sm:flex justify-center items-center px-0.5 py-0">
      <span class="text-(--Brand-950,#053628) font-[Inter] text-sm font-semibold leading-5">
        Смотреть всё
      </span>
    </div>
    <div class="flex items-center justify-center w-4 h-3 sm:h-5 sm:w-5">
      <svg class="hidden sm:block" width="100%" height="100%" style="overflow: visible;" preserveAspectRatio="none"
        viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.33325 10H16.6666M16.6666 10L11.6666 5M16.6666 10L11.6666 15" stroke="#053628" stroke-width="1.66667"
          stroke-linecap="round" stroke-linejoin="round"></path>
      </svg>
      <svg class="sm:hidden" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.5 15L12.5 10L7.5 5" stroke="black" stroke-width="2" stroke-linecap="round"
          stroke-linejoin="round" />
      </svg>
    </div>
  </a>
</template>