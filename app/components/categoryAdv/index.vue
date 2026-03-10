<script setup lang="ts">
import { ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination } from 'swiper/modules';
import type { Swiper as SwiperClass } from 'swiper/types';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface SlideItem {
	image: string;
	title: string;
	text?: string;
	textButton: string;
	theme?: 'dark' | 'light';
}

const slides: SlideItem[] = [
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
];

const swiperInstance = ref<SwiperClass | null>(null);

const onSwiper = (swiper: SwiperClass): void => {
	swiperInstance.value = swiper;
};

const goPrev = (): void => {
	swiperInstance.value?.slidePrev();
};

const goNext = (): void => {
	swiperInstance.value?.slideNext();
};
</script>

<template>
	<div class="relative max-w-(--container) px-4 m-auto pt-6 pb-5">
		<ClientOnly>
			<swiper
				@swiper="onSwiper"
				:modules="[Navigation, Pagination]"
				:pagination="{ clickable: true }"
				:slides-per-view="1"
				:centeredSlides="true"
				:loop="true"
				:space-between="8"
				:breakpoints="{
					768: { spaceBetween: 32 },
					769: { slidesPerView: 2, spaceBetween: 32, centeredSlides: false },
				}"
				:navigation="false"
			>
				<swiper-slide
					v-for="(item, i) in slides"
					:key="i"
					class="rounded-2xl sm:p-8 p-5"
				>
					<img
						:src="item.image"
						:alt="item.title"
						class="absolute inset-0 -z-1 w-full h-full object-cover rounded-lg"
					/>

					<div class="flex flex-col h-full">
						<div
							:class="[item.theme === 'dark' ? 'text-(--color1)' : 'text-white']"
							class="max-w-[320px] mb-2 font-['Russo_One'] font-normal text-2xl leading-8 sm:text-4xl sm:leading-11 tracking-[-2%]"
						>
							{{ item.title }}
						</div>

						<p
							v-if="item.text"
							:class="[item.theme === 'dark' ? 'text-(--color1)' : 'text-white']"
							class="max-w-[190px] mb-6 sm:mb-16"
						>
							{{ item.text }}
						</p>

						<div class="flex items-end mt-auto">
							<button
								class="cursor-pointer text-emerald-950 rounded-[10px] bg-white hover:bg-gray-300 transition text-center text-sm leading-5 sm:leading-7 font-semibold sm:text-lg py-2 px-4 sm:py-4 sm:px-6"
							>
								{{ item.textButton }}
							</button>
						</div>
					</div>
				</swiper-slide>
			</swiper>

			<button @click="goPrev" class="custom-swiper-button-prev">
				<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M16.6666 10H3.33325M3.33325 10L8.33325 15M3.33325 10L8.33325 5"
						stroke="#535862"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</button>

			<button @click="goNext" class="custom-swiper-button-next">
				<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M3.33325 10H16.6666M16.6666 10L11.6666 5M16.6666 10L11.6666 15"
						stroke="#535862"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</button>

			<template #fallback>
				<div class="adv-fallback-grid">
					<div
						v-for="i in 2"
						:key="i"
						class="adv-skeleton rounded-2xl"
					>
						<div class="adv-skeleton-content">
							<div class="adv-skeleton-title" />
							<div class="adv-skeleton-text" />
							<div class="adv-skeleton-button" />
						</div>
					</div>
				</div>
			</template>
		</ClientOnly>
	</div>
</template>

<style scoped>
.swiper {
	max-width: 100%;
	padding-bottom: 40px;
}

.swiper-slide {
	height: auto;
	min-height: 260px;
}

.custom-swiper-button-prev,
.custom-swiper-button-next {
	position: absolute;
	z-index: 10;
	width: 40px;
	height: 40px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 9999px;
	background: white;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
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

.adv-fallback-grid {
	display: grid;
	grid-template-columns: 1fr;
	gap: 8px;
	padding-bottom: 40px;
}

.adv-skeleton {
	position: relative;
	min-height: 260px;
	overflow: hidden;
	background: #f3f4f6;
}

.adv-skeleton::after {
	content: '';
	position: absolute;
	inset: 0;
	transform: translateX(-100%);
	background: linear-gradient(
		90deg,
		rgba(255, 255, 255, 0) 0%,
		rgba(255, 255, 255, 0.55) 50%,
		rgba(255, 255, 255, 0) 100%
	);
	animation: shimmer 1.4s infinite;
}

.adv-skeleton-content {
	position: relative;
	z-index: 1;
	display: flex;
	flex-direction: column;
	height: 100%;
	padding: 20px;
}

.adv-skeleton-title {
	width: 60%;
	height: 32px;
	border-radius: 8px;
	background: #e5e7eb;
	margin-bottom: 12px;
}

.adv-skeleton-text {
	width: 42%;
	height: 20px;
	border-radius: 8px;
	background: #e5e7eb;
	margin-bottom: 24px;
}

.adv-skeleton-button {
	margin-top: auto;
	width: 160px;
	height: 48px;
	border-radius: 10px;
	background: #e5e7eb;
}

@keyframes shimmer {
	100% {
		transform: translateX(100%);
	}
}

@media (min-width: 769px) {
	.adv-fallback-grid {
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 32px;
	}
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

@media (max-width: 640px) {
	.swiper-slide,
	.adv-skeleton {
		min-height: 220px;
	}

	.adv-skeleton-content {
		padding: 20px;
	}

	.adv-skeleton-title {
		height: 28px;
		width: 70%;
	}

	.adv-skeleton-text {
		height: 18px;
		width: 55%;
	}

	.adv-skeleton-button {
		width: 140px;
		height: 40px;
	}
}
</style>
