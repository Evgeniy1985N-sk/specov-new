<script setup lang="ts">
interface Props {
  class?: string
}

const props = defineProps<Props>()
</script>

<template>
  <i :class="props.class" class="flex items-center justify-center w-5 h-5">
    <slot/>
  </i>
</template>
