<script setup lang="ts">
interface Item {
  isActive: Boolean
  label: string
  src: string
  isSoon?: boolean
}
interface Props {
  items: Item[]
}
const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'handleClick', index: number): void
}>()

</script>

<template>
  <div class="grid gap-2 sm:gap-6 sm:grid-cols-2 md:grid-cols-4">

    <button v-for="(item, i) in props.items" :key="i" @click="$emit('handleClick', i)"
      :class="item.isActive ? 'border-(--Brand-600)' : 'border-gray-300'"
      class="grid gap-4 min-h-[100px] p-4 cursor-pointer border rounded-lg transition">

      <div class="flex items-center justify-between">
        <img :src="item.src" :alt="item.label">
        <span v-if="item.isSoon" class="py-0.5 px-1.5 text-xs text-(--Brand-700) border border-(--Brand-200) rounded-lg bg-[#EDFCF4]">Скоро</span>
      </div>

      <p class="text-sm leading-5 text-left text-gray-950 font-semibold">
        {{ item.label }}
      </p>
    </button>

  </div>

</template>