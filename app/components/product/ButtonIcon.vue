<script setup lang="ts">
interface Props {
  text?: string
}
const props = defineProps<Props>()
</script>

<template>
  <button class="flex items-center gap-1.5 text-gray-600 hover:text-(--Brand-700) transition text-base leading-6 font-semibold cursor-pointer">
    <WrapIcon>
      <slot />
    </WrapIcon>
    <span class="hidden sm:block">
      {{ props.text }}
    </span>
  </button>
</template>