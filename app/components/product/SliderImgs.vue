<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper/modules'


import 'swiper/css'
import 'swiper/css/pagination'

import type { ProductImage } from '~/types/product'


interface Props {
	imgs: ProductImage[]
}
const props = defineProps<Props>()


</script>

<template>
	<ClientOnly>

		<swiper :slides-per-view="1" :loop="false" :space-between="0" :pagination="{ clickable: true }"
		:navigation="false" :modules="[Pagination]">

			<swiper-slide v-for="(item, i) in props.imgs" :key="i">

        <img :src="item.src" :alt="item.alt" class="max-w-[115px] sm:max-w-full">

			</swiper-slide>

		</swiper>

	</ClientOnly>
</template>

<style scoped>
.swiper :deep(.swiper-pagination) {
	display: none;
}
.swiper-slide {
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>