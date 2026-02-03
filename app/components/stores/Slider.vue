<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination } from 'swiper/modules'
import type { Swiper as SwiperClass } from 'swiper/types'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const slides = [
  {
    image: '/image/store.jpg',
    title: 'Img1'
  },
  {
    image: '/image/store.jpg',
    title: 'Img2'
  },
]

const swiperInstance = ref<SwiperClass | null>(null)

const onSwiper = (swiper: SwiperClass) => {
  swiperInstance.value = swiper
}

const goPrev = () => {
  swiperInstance.value?.slidePrev()
}

const goNext = () => {
  swiperInstance.value?.slideNext()
}

</script>

<template>
  <ClientOnly>
    <div class="relative min-w-0">

      <swiper @swiper="onSwiper" :modules="[Navigation, Pagination]" :pagination="{ clickable: true }"
        :slides-per-view="1" :loop="true" :space-between="0" :navigation="false">

        <swiper-slide v-for="(item, i) in slides" :key="i">
          <img :src="item.image" :alt="item.title"
            class="w-full h-[206px] sm:h-[440px] lg:h-[372px] object-cover rounded-xl" />
        </swiper-slide>

      </swiper>

      <button @click="goPrev" class="custom-swiper-button-prev">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.6666 10H3.33325M3.33325 10L8.33325 15M3.33325 10L8.33325 5" stroke="#535862" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
      </button>

      <button @click="goNext" class="custom-swiper-button-next">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.33325 10H16.6666M16.6666 10L11.6666 5M16.6666 10L11.6666 15" stroke="#535862" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
      </button>
    </div>
  </ClientOnly>
</template>

<style scoped>
.swiper {
  max-width: 100%;
  padding-bottom: 40px;
}

.swiper-slide {
  height: auto;
}

.custom-swiper-button-prev {
  top: 46%;
  left: -24px;
}

.custom-swiper-button-next {
  top: 46%;
  right: -24px;
}

.swiper-pagination {
  bottom: 0;
}

@media (max-width: 1280px) {
  .custom-swiper-button-prev {
    left: 0;
  }

  .custom-swiper-button-next {
    right: 0;
  }
}

@media (max-width: 1024px) {

  .custom-swiper-button-prev,
  .custom-swiper-button-next {
    display: none;
  }
}

</style>