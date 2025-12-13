<script setup lang="ts">
  interface Props {
    addClass?: string
  }
  const props = defineProps<Props>()
</script>
<template>
  <div :class="props.addClass" class="max-w-(--container) m-auto px-4">
    <slot />
  </div>
</template>