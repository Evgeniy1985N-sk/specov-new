<script setup lang="ts">
interface Props {
  class?: string
}
const props = defineProps<Props>()
</script>

<template>
  <div :class="props.class" class="absolute top-fill w-full py-2.5 px-3.5 bg-white rounded-xl shadow-md">

    <slot />

  </div>
</template>