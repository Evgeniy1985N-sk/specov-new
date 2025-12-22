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
  <component :is="tag" :class="class" class="font-['Russo_One'] text-[30px] leading-[38px] sm:text-[48px] sm:leading-[60px] text-gray-950">
    <slot />
  </component>
</template>