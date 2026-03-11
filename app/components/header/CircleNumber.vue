<script setup lang="ts">
interface Props {
  number: number
}
const props = defineProps<Props>()
</script>

<template>
  <span
    class="absolute -top-1.5 -right-1.5 flex items-center justify-center w-5 h-5 text-white text-xs font-semibold bg-(--Brand-700) rounded-full">
    {{ props.number }}
  </span>
</template>