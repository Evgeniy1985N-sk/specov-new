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

</script>

<template>
	<ClientOnly>
		<div class="fixed top-0 left-0 z-100 w-full bg-white">
			<div class="relative max-w-(--container) m-auto">

				<swiper @swiper="onSwiper" :modules="[Navigation]" :slides-per-view="2" :loop="false" :space-between="12"
					:allowTouchMove="true" :breakpoints="{
						768: { slidesPerView: 3, spaceBetween: 24 },
						992: { slidesPerView: 4, spaceBetween: 24 },
					}" :navigation="false">

					<swiper-slide v-for="(item, i) in props.items" :key="item.id">

						<CompareCard :item="item" />

					</swiper-slide>

				</swiper>

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

	.custom-swiper-button-prev,
	.custom-swiper-button-next {
		display: none;
	}
}
</style>