<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'

interface Item {
  name: string
  quantity: number
  image: string
}

interface Props {
  items: Item[]
  class?: string
}

const props = defineProps<Props>()

</script>

<template>
  <ClientOnly>

    <swiper :slides-per-view="1" :space-between="8" :class="props.class">

      <swiper-slide v-for="(item, i) in props.items" :key="i">

        <NuxtLink to="/catalog"
          class="flex items-center gap-4 p-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-100 transition">
          <span class="flex items-center w-10 h-10 rounded-lg bg-white">
            <img :src="item.image" :alt="item.name">
          </span>
          <div class="grid gap-.5">
            <p class="line-clamp-1 text-sm leading-5 text-gray-950 font-semibold">
              {{ item.name }}
            </p>
            <span class="text-[12px] leading-[18px] font-medium">
              {{ item.quantity }} товаров
            </span>
          </div>
        </NuxtLink>

      </swiper-slide>

    </swiper>

  </ClientOnly>
</template>

<style scoped>
@media (max-width: 767px) {
  .swiper {
    max-width: 160px;
    margin: 0;
    overflow: visible;
  }
}

@media (min-width: 768px) {

  .swiper:deep(.swiper-wrapper) {
    transform: none !important;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }

  .swiper:deep(.swiper-slide) {
    width: auto !important;
    margin: 0 !important;
  }

}

@media (min-width: 1023px) {

  .swiper:deep(.swiper-wrapper) {
    grid-template-columns: repeat(5, 1fr);
  }

}
</style>