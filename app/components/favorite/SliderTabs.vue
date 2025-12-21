<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'

import 'swiper/css'

interface Item {
  isActive: boolean
  name: string
  counter: number
}
interface Props {
  items: Item[]
}
const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'handleClick', index: number): void
}>()


function getIndex(i: number) {
  emit('handleClick', i)
}

</script>

<template>
  <ClientOnly>

    <swiper :slides-per-view="1" :space-between="8">

      <swiper-slide v-for="(item, i) in props.items" :key="i">

        <button @click="getIndex(i)" :class="item.isActive ? 'font-semibold bg-gray-100 sm:bg-none' : ''"
          class="flex justify-between w-full text-sm text-gray-950 cursor-pointer px-3 py-2 sm:p-4 lg:p-0 border border-gray-200 lg:border-0 rounded-xl">
          <span>
            {{ item.name }}
          </span>
          <span>
            {{ item.counter }}
          </span>
        </button>

      </swiper-slide>

    </swiper>

  </ClientOnly>
</template>

<style scoped>
@media (min-width: 1024px) {
  .swiper {
    max-width: 248px;
  }

  .swiper:deep(.swiper-wrapper) {
    transform: none !important;
    flex-direction: column;
    gap: 12px;
  }

}

@media (max-width: 1023px) {
  .swiper {
    max-width: 160px;
    margin: 0;
    overflow: visible;
  }
}
</style>