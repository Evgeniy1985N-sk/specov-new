<script setup lang="ts">
import Pyramid from '@/components/product/icon/Pyramid.vue';
interface Porps {
  isActive: boolean
  text: string
  isSortByMax: boolean
}
const props = defineProps<Porps>()
const emmit = defineEmits(['handleClick'])

const classIcon = computed(() => ({
  'scale-y-[-1]': !props.isSortByMax
}))

</script>

<template>
  <button @click="$emit('handleClick')" :class="{'text-gray-950': props.isActive }"
    class="min-w-[83px] cursor-pointer flex gap-1.5">
    {{ props.text }}
    <i v-if="props.isActive" :class="classIcon" class="transiton">
      <Pyramid />
    </i>
  </button>
</template>