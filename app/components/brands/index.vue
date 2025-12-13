<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, } from 'swiper/modules'
import type { Swiper as SwiperClass } from 'swiper/types'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const slides = [
  {
    image: '/image/brands/image 42.png',
    title: '',
  },
  {
    image: '/image/brands/image 43.png',
    title: '',
  },
  {
    image: '/image/brands/image 44.png',
    title: '',
  },
  {
    image: '/image/brands/image 45.png',
    title: '',
  },
  {
    image: '/image/brands/image 46.png',
    title: '',
  },
  {
    image: '/image/brands/image 47.png',
    title: '',
  },
  {
    image: '/image/brands/image 48.png',
    title: '',
  },
  {
    image: '/image/brands/image 49.png',
    title: '',
  },
  {
    image: '/image/brands/image 50.png',
    title: '',
  },
  {
    image: '/image/brands/image 50-1.png',
    title: '',
  },
  {
    image: '/image/brands/image 51.png',
    title: '',
  },
  {
    image: '/image/brands/image 51-1.png',
    title: '',
  },
  {
    image: '/image/brands/image 51-2.png',
    title: '',
  },
  {
    image: '/image/brands/image 51-3.png',
    title: '',
  },
  {
    image: '/image/brands/image 51.png',
    title: '',
  },
  {
    image: '/image/brands/image 51-1.png',
    title: '',
  },
]

const slidePairs = computed(() => {
  const pairs = []
  for (let i = 0; i < slides.length; i += 2) {
    pairs.push([slides[i], slides[i + 1]])
  }
  return pairs
})

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
    <div class="relative">

      <swiper @swiper="onSwiper" :modules="[Navigation,]" :slides-per-view="1" :loop="true" :space-between="8"
        :navigation="false" :breakpoints="{
          576: { slidesPerView: 3, },
          769: { slidesPerView: 5, },
          1024: { slidesPerView: 7, },
        }">

        <swiper-slide v-for="(pair, index) in slidePairs" :key="index">
          <div>
            <img v-if="pair[0]" :src="pair[0].image" :alt="pair[0].title" />
          </div>
          <div>
            <img v-if="pair[1]" :src="pair[1].image" :alt="pair[1].title" />
          </div>
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
.custom-swiper-button-prev {
  left: -16px;
}

.custom-swiper-button-next {
  right: -16px;
}

.swiper-slide {
  display: grid;
  gap: 16px;
}

.swiper-slide div {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 64px;
  padding: 22px 26px;
  border: 1px solid var(--border);
  border-radius: 10px;
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
  .swiper {
    overflow: visible;
  }

  .custom-swiper-button-prev,
  .custom-swiper-button-next {
    display: none;
  }
}

@media (max-width: 768px) {
  .swiper {
    max-width: 96%;
    margin-left: 0;
  }

  .swiper-slide {
    grid-template-columns: repeat(2, 1fr);
  }

  .swiper-slide div {
    height: 52px;
    padding: 0;
  }

}

@media (max-width: 576px) {
  .swiper {
    max-width: 210px;
  }

  .swiper-slide {
    gap: 8px;
  }

  .swiper-slide div {
    height: 40px;
    padding: 12px;
  }
  .swiper-slide img {
    height: 100%;
    object-fit: contain;
  }
}
</style>