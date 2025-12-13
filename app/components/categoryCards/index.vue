<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const slides = [
	{
		image: '/image/cards/img-1.png',
		title: 'Спецодежда',
	},
	{
		image: '/image/cards/img-2.png',
		title: 'СИЗ',
	},
	{
		image: '/image/cards/img-3.png',
		title: 'Инструменты',
	},
	{
		image: '/image/cards/img-4.png',
		title: 'Строительное оборудование',
	},
]

</script>

<template>
	<Section>
		<ClientOnly>
			<div class="relative max-w-(--container) px-4 m-auto pb-6 sm:pb-20">

				<swiper :slides-per-view="2" :space-between="8" :breakpoints="{
					577: { slidesPerView: 1, spaceBetween: 32 },
					769: { slidesPerView: 3, spaceBetween: 32 },
					1025: { slidesPerView: 4, spaceBetween: 32, },
				}" :navigation="false">

					<swiper-slide v-for="(item, i) in slides" :key="i" :class="`slide-${i}`" class="rounded-2xl overflow-hidden">
						<img :src="item.image" :alt="item.title" class="absolute bottom-0 -z-1" />
						<div class="flex flex-col h-full">
							<div
								class="text-[#0A0D12] font-sans font-semibold sm:text-xl text-xs leading-[18px] sm:leading-[30px] tracking-[0%]">
								{{ item.title }}
							</div>
						</div>

					</swiper-slide>

				</swiper>
			</div>
		</ClientOnly>
	</Section>
</template>

<style scoped>
.swiper-slide {
	height: 280px;
	padding: 24px;
	padding-bottom: 0;
}

.swiper-slide:after {
	content: '';
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 59px;
	background: url('/image/cards/pattern.svg');
}

.slide-0 {
	background: #EEEEEE;
}

.slide-0 img {
	right: 20px;
}

.slide-1 {
	background: #F6F4E8;
}

.slide-1 img {
	right: 20px;
	bottom: 12px;
}

.slide-2 {
	background: #C9E0E4;
}

.slide-3 {
	background: #F5F5F5;
}

@media (max-width: 768px) {
	.swiper {
		max-width: 280px;
		margin-left: 0;
		overflow: visible;
	}
}

@media (max-width: 576px) {
	.swiper {
		max-width: 290px;
		height: 140px;
	}

	.swiper-slide {
		height: 100%;
		padding: 12px;
	}

	.swiper-slide:after {
		height: 30px;
		background: url('/image/cards/pattern-mob.svg');
	}

	.swiper-slide img {
		right: 10px;
		max-width: 90px;
	}

	.slide-1 img {
		bottom: 6px;
	}
}
</style>