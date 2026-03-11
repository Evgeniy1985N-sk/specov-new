<script setup lang="ts">
import type { ProductDimension } from '~/types/product';
interface Props {
  items: ProductDimension[]
}
const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'handleClick', index: number): void
}>()

</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="font-sans font-bold text-base leading-6 text-black">
      Размеры
    </div>
    <div class="flex gap-1">
      <button v-for="(item, i) in props.items" :key="item.label" @click="$emit('handleClick', i)" :class="item.isActive ? 'border-(--Brand-950)' : 'border-gray-200'"
        class="w-10 h-6 text-sm text-(--Brand-950) font-semibold border rounded-lg cursor-pointer transition">
        {{ item.label }}
      </button>
    </div>
  </div>
</template>