<script setup lang="ts">
interface Props {
  class?: string
}
const props = defineProps<Props>()
const counter = ref(0)
</script>

<template>
  <UInputNumber
    :min="0"
    size="xl"
    color="neutral"
  />
</template>