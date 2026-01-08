<script setup lang="ts">
interface Props {
  text: string
}
const props = defineProps<Props>()

defineEmits(['handleClick'])
</script>

<template>
  <button @click="$emit('handleClick')"
    class="flex gap-1.5 items-center text-sm leading-5 cursor-pointer text-gray-600 transition hover:text-(--Brand-700)">
    {{ props.text }}
    <i class="flex items-center justify-center w-5 h-5">
      <ProductIconAng />
    </i>
  </button>
</template>