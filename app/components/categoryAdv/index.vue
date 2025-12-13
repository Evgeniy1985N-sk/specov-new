<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination } from 'swiper/modules'
import type { Swiper as SwiperClass } from 'swiper/types'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const slides = [
	{
		image: '/image/Image-1.png',
		title: 'Всё для сада',
		textButton: 'Смотреть раздел',
		theme: 'dark',
	},
	{
		image: '/image/Image-2.png',
		title: 'Аренда инструмента',
		text: 'Более 5 000 товаров для разных задач',
		textButton: 'Взять в аренду',
	},
		{
		image: '/image/Image-1.png',
		title: 'Всё для сада',
		textButton: 'Смотреть раздел',
		theme: 'dark',
	},
	{
		image: '/image/Image-2.png',
		title: 'Аренда инструмента',
		text: 'Более 5 000 товаров для разных задач',
		textButton: 'Взять в аренду',
	},
		{
		image: '/image/Image-1.png',
		title: 'Всё для сада',
		textButton: 'Смотреть раздел',
		theme: 'dark',
	},
	{
		image: '/image/Image-2.png',
		title: 'Аренда инструмента',
		text: 'Более 5 000 товаров для разных задач',
		textButton: 'Взять в аренду',
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
		<div class="relative max-w-(--container) px-4 m-auto pt-6 pb-5">

			<swiper @swiper="onSwiper" :modules="[Navigation, Pagination]" :pagination="{ clickable: true }"
				:slides-per-view="1" 
				:centeredSlides="true" 
				:loop="true" 
				:space-between="8" 
				:breakpoints="{
					768: {spaceBetween: 32},
					769: { slidesPerView: 2, spaceBetween: 32, centeredSlides: false },
				}" :navigation="false">

				<swiper-slide v-for="(item, i) in slides" :key="i" class="rounded-2xl sm:p-8 p-5">
					<img :src="item.image" :alt="item.title"
						class="absolute inset-0 -z-1 w-full h-full object-cover rounded-lg" />
					<div class="flex flex-col h-full">
						<div :class="[item.theme === 'dark' ? 'text-(--color1)' : 'text-white']"
							class="max-w-[320px] mb-2 font-['Russo_One'] font-normal text-2xl leading-8 sm:text-4xl sm:leading-11 tracking-[-2%]">
							{{ item.title }}
						</div>
						<p v-if="item.text" :class="[item.theme === 'dark' ? 'text-(--color1)' : 'text-white']" class="max-w-[190px] mb-6 sm:mb-16">
							{{ item.text }}
						</p>
						<div class="flex items-end mt-auto">
							<button
								class="cursor-pointer text-emerald-950 rounded-[10px] bg-white hover:bg-gray-300 transition text-center text-sm leading-5 sm:leading-7 font-semibold sm:text-lg py-2 px-4 sm:py-4 sm:px-6">
								{{ item.textButton }}
							</button>
						</div>
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
.swiper {
	max-width: 100%;
	padding-bottom: 40px;
}

.swiper-slide {
	height: auto;
}

.custom-swiper-button-prev {
	top: 46%;
	left: -8px;
}

.custom-swiper-button-next {
	top: 46%;
	right: -8px;
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

@media (max-width: 1023px) {
	.swiper {
		max-width: 592px;
	}
}
</style>