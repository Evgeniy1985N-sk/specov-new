<script setup lang="ts">
interface Props {
  text?: string
}
const props = defineProps<Props>()
</script>

<template>

  <button class="flex gap-2 items-center text-sm leading-5 cursor-pointer hover:text-gray-500 transition">
    <slot />
    {{ props.text }}
  </button>

</template>