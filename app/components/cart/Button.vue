<script setup lang="ts">
interface Props {
  text?: string
}
const props = defineProps<Props>()
</script>

<template>

  <button class="flex gap-2 items-center text-sm leading-5 font-semibold cursor-pointer hover:text-(--Brand-700) transition">
    <slot />
    {{ props.text }}
  </button>

</template>