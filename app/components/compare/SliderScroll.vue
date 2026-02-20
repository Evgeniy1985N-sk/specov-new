<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper/modules'
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
		<!-- TOP SLIDER -->
		<div class="fixed top-0 left-0 z-100 w-full pb-2 sm:pb-4 py-4 bg-white border-b border-gray-200">

			<SectionContainer>

				<div class="flex gap-2">
					<swiper class="slider" @swiper="onSwiper" :modules="[Pagination]" :slides-per-view="1" :loop="false"
						:space-between="12" :allowTouchMove="true" :breakpoints="{
							640: { slidesPerView: 2, spaceBetween: 8 },
							768: { slidesPerView: 3, spaceBetween: 8 },
							1200: { slidesPerView: 4, spaceBetween: 32 },
						}" :pagination="{ clickable: true }">

						<swiper-slide v-for="(item, i) in props.items" :key="item.id">

							<CompareCard :item="item" />

						</swiper-slide>

					</swiper>
					<swiper class="slider sm:hidden!" @swiper="onSwiper" :modules="[Pagination]" :slides-per-view="1" :loop="false"
						:space-between="12" :allowTouchMove="true" :breakpoints="{
							640: { slidesPerView: 2, spaceBetween: 8 },
							768: { slidesPerView: 3, spaceBetween: 8 },
							1200: { slidesPerView: 4, spaceBetween: 32 },
						}" :pagination="{ clickable: true }">

						<swiper-slide v-for="(item, i) in props.items" :key="item.id">

							<CompareCard :item="item" />

						</swiper-slide>

					</swiper>
				</div>

			</SectionContainer>
		</div>
		<!-- TOP SLIDER -->
	</ClientOnly>
</template>

<style scoped>
.slider {
	width: 100%;
	padding-bottom: 16px;
}

.slider :deep(.swiper-pagination) {
	bottom: -6px;
}

@media (min-width: 640px) {
	.slider :deep(.swiper-pagination) {
		display: none;
	}
}
</style>