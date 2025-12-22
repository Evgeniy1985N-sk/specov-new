<script setup lang="ts">
defineProps({
  class: {
    type: String
  },
  tag: {
    type: String,
    default: 'h2'
  }
})
</script>

<template>
  <component :is="tag" :class="class" class="font-['Russo_One'] text-[24px] leading-8 sm:text-[30px] sm:leading-[38px] text-gray-950">
    <slot />
  </component>
</template>