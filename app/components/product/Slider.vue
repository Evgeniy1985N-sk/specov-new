<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import type { ProductCard } from '~/types/product'


interface Props {
	items: ProductCard[]
}
const props = defineProps<Props>()


</script>

<template>
	<ClientOnly>

		<swiper :slides-per-view="2" :loop="true" :space-between="12"
		:breakpoints="{
			577: { slidesPerView: 1, spaceBetween: 32 },
			769: { slidesPerView: 3, spaceBetween: 32 },
			1025: { slidesPerView: 4, spaceBetween: 32 },
		}" 
		:navigation="false">

			<swiper-slide v-for="(item, i) in props.items" :key="item.id">

				<ProductCard :item="item" />

			</swiper-slide>

		</swiper>

	</ClientOnly>
</template>

<style scoped>
@media (max-width: 768px) {
	.swiper {
		max-width: 280px;
		margin-left: 0;
		overflow: visible;
	}
}

@media (max-width: 576px) {
	.swiper {
		max-width: 100%;
	}
}
</style>