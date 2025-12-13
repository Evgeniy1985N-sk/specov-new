<script setup lang="ts">
  interface Props {
    class?: string
  }
  const props = defineProps<Props>()
</script>
<template>
  <div :class="props.class" class="max-w-(--container) m-auto px-4">
    <slot />
  </div>
</template>