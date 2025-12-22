<script setup lang="ts">
defineProps({
  class: {
    type: String
  },
  tag: {
    type: String,
    default: 'p'
  }
})
</script>

<template>
  <component :is="tag" :class="class" class="grid gap-4 text-[18px] leading-7 font-medium">
    <slot />
  </component>
</template>