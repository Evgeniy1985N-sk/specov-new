<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'

const slides = [
	{ name: 'Спецодежда', src: '/spetsodezhda' },
	{ name: 'Инструменты', src: '/instrumenty' },
	{ name: 'СИЗ', src: '/siz' },
	{ name: 'Строительное оборудование', src: '/stroitelnoe-oborudovanie' },
	{ name: 'Электроинструмент', src: '/elektroinstrument' },
	{ name: 'Текстиль', src: '/tekstil' },
	{ name: 'Всё для сада', src: '/vsyo-dlya-sada' },
	{ name: 'Текст-1', src: '/tekstil' },
	{ name: 'Текст-2', src: '/vsyo-dlya-sada' },
]

const prevButton = ref<HTMLElement | null>(null)
const nextButton = ref<HTMLElement | null>(null)

</script>

<template>
	<ClientOnly>
		<div class="relative max-w-[950px]">
			<swiper class="h-8" :modules="[Navigation]" :slides-per-view="'auto'" :space-between="20"
				:watch-slides-progress="true" :navigation="{
					prevEl: prevButton,
					nextEl: nextButton,
				}">
				<swiper-slide v-for="(item, i) in slides" :key="i" class="w-auto! shrink-0! flex! items-center">
					<a :href="item.src" class="whitespace-nowrap text-gray-600 hover:text-(--Brand-700)">
						{{ item.name }}
					</a>
				</swiper-slide>
			</swiper>

			<button ref="prevButton"
				class="absolute z-20 top-1/2 left-0 -translate-y-1/2 transition border-zinc-300 p-[5px] flex justify-center items-center h-8 w-8 bg-white hover:bg-gray-300 border border-solid rounded-full cursor-pointer">
				<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5 rotate-180">
					<path d="M7.5 15L12.5 10L7.5 5" stroke="#535862" stroke-width="1.66667" stroke-linecap="round"
						stroke-linejoin="round" />
				</svg>
			</button>

			<div class="absolute left-5 top-0 h-full w-16 bg-linear-to-r from-white to-transparent z-10 pointer-events-none">
			</div>

			<button ref="nextButton"
				class="absolute z-20 top-1/2 right-0 -translate-y-1/2 transition border-zinc-300 p-[5px] flex justify-center items-center h-8 w-8 bg-white hover:bg-gray-300 border border-solid rounded-full cursor-pointer">
				<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5">
					<path d="M7.5 15L12.5 10L7.5 5" stroke="#535862" stroke-width="1.66667" stroke-linecap="round"
						stroke-linejoin="round" />
				</svg>
			</button>


			<div class="absolute right-5 top-0 h-full w-16 bg-linear-to-l from-white to-transparent z-10 pointer-events-none">
			</div>
		</div>
	</ClientOnly>
</template>

<style scoped>
.swiper-button-disabled {
	display: none !important;
}
.swiper-button-disabled + div {
	display: none !important;
}
</style>