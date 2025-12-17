<script setup lang="ts">
interface Props {
  class?: string
}
const props = defineProps<Props>()
</script>


<template>

  <div class="grid gap-2">
    <p class="flex items-baseline text-sm leading-5 text-gray-950 font-semibold">
      <span class="max-w-[500px] whitespace-nowrap pr-2">
        1 товар
      </span>
      <span class="flex-1 border-b border-dotted border-gray-300 border-opacity-0 relative h-0 mx-2"></span>
      <b class="font-bold text-gray-950 whitespace-nowrap">
        7 990 ₽
      </b>
    </p>
    <p class="flex items-baseline text-[20px] leading-[30px] text-gray-950 font-semibold">
      <span class="max-w-[500px] whitespace-nowrap pr-2">
        Итого
      </span>
      <span class="flex-1 border-b border-dotted border-gray-300 border-opacity-0 relative h-0 mx-2"></span>
      <b class="whitespace-nowrap">
        7 990 ₽
      </b>
    </p>
  </div>

</template>
