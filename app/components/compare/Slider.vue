<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'
import type { Swiper as SwiperClass } from 'swiper/types'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import type { ProductCard } from '~/types/product'


interface Props {
	items?: ProductCard[]
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

const slideInfo = computed(() => {
	const s = swiperInstance.value
	if (!s || !props.items?.length) return { current: 0, total: 0 }
	return {
		current: s.realIndex + 1,
		total: props.items.length
	}
})

const showNavigation = computed(() => {
	const s = swiperInstance.value
	if (!s || !props.items?.length) return false
	
	const slidesPerView = typeof s.params.slidesPerView === 'number' 
		? s.params.slidesPerView 
		: 1
	
	return props.items.length > slidesPerView
})

</script>

<template>
	<ClientOnly>

		<div class="relative max-w-(--container) m-auto w-full min-w-0 sm:min-w-auto">

			<swiper @swiper="onSwiper" :modules="[Navigation]" :slides-per-view="1" :loop="true" :space-between="12"
				:allowTouchMove="true" :breakpoints="{
					640: { slidesPerView: 2, spaceBetween: 24 },
					768: { slidesPerView: 3, spaceBetween: 24 },
					992: { slidesPerView: 4, spaceBetween: 24 },
				}" :navigation="false">

				<swiper-slide v-for="(item, i) in props.items" :key="item.id">

					<ProductCard :item="item" class-title="text-xs leading-[18px]" />

				</swiper-slide>

			</swiper>

			<div v-if="showNavigation" class="flex justify-between items-center">
				<button @click="goPrev" class="custom-swiper-button-prev">
					<svg class="w-2! sm:hidden" width="8" height="14" viewBox="0 0 8 14" fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path d="M7 13L1 7L7 1" stroke="#535862" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
					</svg>
					<svg class="hidden sm:block" width="20" height="20" viewBox="0 0 20 20" fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path d="M16.6666 10H3.33325M3.33325 10L8.33325 15M3.33325 10L8.33325 5" stroke="#535862" stroke-width="2"
							stroke-linecap="round" stroke-linejoin="round"></path>
					</svg>
				</button>
				<p class="text-sm leading-5 font-medium sm:hidden">
					{{ slideInfo.current }} из {{ slideInfo.total }}
				</p>
				<button @click="goNext" class="custom-swiper-button-next">
					<svg class="hidden sm:block" width="20" height="20" viewBox="0 0 20 20" fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path d="M3.33325 10H16.6666M16.6666 10L11.6666 5M16.6666 10L11.6666 15" stroke="#535862" stroke-width="2"
							stroke-linecap="round" stroke-linejoin="round"></path>
					</svg>
					<svg class="w-2! sm:hidden" width="8" height="14" viewBox="0 0 8 14" fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path d="M1 13L7 7L1 1" stroke="#535862" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
					</svg>
				</button>
			</div>

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


@media (max-width: 640px) {
	.swiper {
		padding-bottom: 16px;
	}

	.custom-swiper-button-prev,
	.custom-swiper-button-next {
		position: static;
		transform: none;
		width: 24px;
		height: 24px;
		background: transparent !important;
		border: 0;
	}

}
</style>