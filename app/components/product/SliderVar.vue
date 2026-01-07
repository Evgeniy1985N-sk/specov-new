<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'
import type { Swiper as SwiperClass } from 'swiper/types'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import type { ProductCard } from '~/types/product'


interface Props {
	items: ProductCard[]
}
const props = defineProps<Props>()

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
		<div class="relative max-w-(--container) m-auto">

			<swiper @swiper="onSwiper" :modules="[Navigation]"
				:slides-per-view="2" :loop="true" :space-between="12" :allowTouchMove="true" :breakpoints="{
					768: { slidesPerView: 3, spaceBetween: 24 },
					992: { slidesPerView: 4, spaceBetween: 24 },
					1200: { slidesPerView: 5, spaceBetween: 24 },
					1400: { slidesPerView: 6, spaceBetween: 24 },
				}" :navigation="false">

				<swiper-slide v-for="(item, i) in props.items" :key="item.id">

					<ProductCard :item="item" class-btns="grid grid-cols-1 gap-2!" class-media="h-[155px]! sm:h-[220px]!" />

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
	top: 28%;
	left: -22px;
}

.custom-swiper-button-next {
	top: 28%;
	right: -22px;
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
		max-width: 600px;
		margin: 0;
	}
}

@media (max-width: 576px) {
	.swiper {
		max-width: 320px;
	}
}
</style>