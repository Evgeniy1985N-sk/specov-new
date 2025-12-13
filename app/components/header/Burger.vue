<script setup lang="ts">
interface Props {
  isActive: boolean
  class?: string
}
const props = defineProps<Props>()
</script>

<template>
  <button :class="props.class"
    class="flex lg:hidden items-center shrink-0 border-zinc-300 p-[11px] justify-center w-9 h-9 sm:h-11 sm:w-11 flex-col bg-white border border-solid rounded-lg">

      <svg v-if="!props.isActive" width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.833374 5.83334H15.8334M0.833374 0.833344H15.8334M5.83337 10.8333H15.8334" stroke="#053628"
          stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
      </svg>

      <svg v-else width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.8335 0.833252L0.833496 10.8333M0.833496 0.833252L10.8335 10.8333" stroke="#053628"
          stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
      </svg>

  </button>
</template>