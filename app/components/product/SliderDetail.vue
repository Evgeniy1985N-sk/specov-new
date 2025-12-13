<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Thumbs, Navigation } from 'swiper/modules'
import { ref } from 'vue'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/thumbs'
import 'swiper/css/navigation'

import type { ProductImage } from '~/types/product'

interface Props {
	imgs?: ProductImage[]
}
const props = defineProps<Props>()

const mainSwiper = ref<any>(null)
const thumbsSwiper = ref<any>(null)

const setMainSwiper = (swiper: any) => {
	mainSwiper.value = swiper
}

// Получаем экземпляр слайдера миниатюр
const setThumbsSwiper = (swiper: any) => {
	thumbsSwiper.value = swiper
}

// Управление навигацией через кастомные кнопки
const slideMainPrev = () => {
	if (mainSwiper.value) mainSwiper.value.slidePrev()
}
const slideMainNext = () => {
	if (mainSwiper.value) mainSwiper.value.slideNext()
}
</script>

<template>
	<ClientOnly>
		<div class="flex gap-4">

			<!-- Контейнер для миниатюр с навигацией -->
			<div class="hidden lg:flex flex-col gap-1">

				<button @click="slideMainPrev"
					class="bg-white hover:bg-gray-100 w-14 h-5 border border-gray-300 rounded-lg flex items-center justify-center transition cursor-pointer"
					aria-label="Предыдущая миниатюра">
					<svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M1 6L6 1L11 6" stroke="#535862" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
					</svg>
				</button>

				<!-- Миниатюры -->
				<swiper class="thumbs-swiper" :direction="'vertical'" :slides-per-view="6" :space-between="4"
					:loop="false" :watch-slides-progress="true" :modules="[Thumbs]" @swiper="setThumbsSwiper">
					<swiper-slide v-for="(item, i) in props.imgs" :key="i">
						<img :src="item.src" :alt="item.alt + ' thumb'" class="w-full h-auto rounded" />
					</swiper-slide>
				</swiper>

				<!-- Кнопка ВНИЗ -->
				<button @click="slideMainNext"
					class="bg-white hover:bg-gray-100 w-14 h-5 border border-gray-300 rounded-lg flex items-center justify-center transition cursor-pointer"
					aria-label="Следующая миниатюра">
					<svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M1 1L6 6L11 1" stroke="#535862" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
					</svg>
				</button>

			</div>

			<!-- Основной слайдер -->
			<swiper :slides-per-view="1" :loop="false" :space-between="0" :modules="[Pagination, Thumbs]"
				:thumbs="{ swiper: thumbsSwiper }" :pagination="{ clickable: true }" @swiper="setMainSwiper"
				class="main-swiper">
				<swiper-slide v-for="(item, i) in props.imgs" :key="i">
					<img :src="item.src" :alt="item.alt" class="w-full h-auto object-cover" />
				</swiper-slide>
			</swiper>

		</div>
	</ClientOnly>
</template>

<style scoped>
.main-swiper {
	max-width: 400px;
	height: 460px;
	margin: 0;
}

.main-swiper :deep(.swiper-pagination) {
	display: none;
}

.thumbs-swiper {
	flex-shrink: 0;
	width: 56px;
	height: 356px;
}

.thumbs-swiper .swiper-slide {
	width: 100% !important;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 4px;
	cursor: pointer;
}

.thumbs-swiper .swiper-slide-thumb-active {
	opacity: 1;
	border: 1px solid var(--Brand-600);
	border-radius: 8px;
}

.swiper-slide img {
	width: 100%;
	height: 100%;
	object-fit: contain;
}

@media (max-width: 1023px) {
	.main-swiper {
		margin: auto;
		margin-top: 40px;
		padding-bottom: 100px;
	}

	.main-swiper :deep(.swiper-pagination) {
		display: block;
	}

	.thumbs-swiper {
		display: none;
	}
}

@media (max-width: 768px) {
	.main-swiper {
		margin-top: 0;
		padding-bottom: 40px;
	}
}

@media (max-width: 640px) {
	.main-swiper {
		height: auto;
		padding-bottom: 0;
	}
}
</style>