<script setup lang="ts">
const isActive = ref(false)
interface Props {
  class?: string
  isActive: boolean
}
const props = defineProps<Props>()
const emit = defineEmits(['handleClick'])
</script>

<template>
  <button @click="emit('handleClick')" :class="props.class, props.isActive ? 'text-(--Error-500)' : 'hover:text-(--Brand-600)'"
    class="flex justify-center items-center bg-white text-(--Brand-950) transition shadow-[0_1px_3px_0_rgba(10,13,18,0.10),0_1px_2px_-1px_rgba(10,13,18,0.10)] p-2 rounded-full cursor-pointer">
    <div class="h-5 w-5">
      <ProductIconCompare />
    </div>
  </button>
</template>