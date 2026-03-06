<script setup lang="ts">
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper/modules'
import type { Swiper as SwiperClass } from 'swiper/types'

import 'swiper/css'
import 'swiper/css/pagination'

import type { Picture } from '~/types/picture'
import { useProductPicture } from '~/composables/useProductPicture';

interface Props {
	imgs: Picture[]
	link: string
}
const props = defineProps<Props>()

const { picturePreview } = useProductPicture();
const swiperInstance = ref<SwiperClass | null>(null)

const onBulletHover = (index: number) => {
	if (swiperInstance.value) {
		swiperInstance.value.slideTo(index)
	}
}

const onSwiperInit = (swiper: SwiperClass) => {
	swiperInstance.value = swiper
}
</script>

<template>
	<ClientOnly>
		<swiper :key="imgs.length" ref="swiperRef" :slides-per-view="1" :loop="false" :space-between="0" :pagination="{
			dynamicBullets: true,
			dynamicMainBullets: 6,
			clickable: true,
		}" :modules="[Pagination]" :navigation="false" @swiper="onSwiperInit">
			<swiper-slide v-for="(item, i) in props.imgs" :key="i">
				<NuxtLink :to="props.link">
					<img :src="picturePreview(item)"
						class="max-w-[115px] sm:max-w-full max-h-[135px] md:max-h-48 xl:max-h-[235px]">
				</NuxtLink>
			</swiper-slide>
		</swiper>

		<NuxtLink v-if="props.imgs.length > 1" ref="customPaginationRef" :to="props.link" class="custom-pagination">
			<div v-for="(item, index) in props.imgs" :key="index" class="custom-pagination__bullet"
				@mouseenter="onBulletHover(index)" />
		</NuxtLink>
	</ClientOnly>
</template>

<style scoped>
.custom-pagination {
	position: absolute;
	inset: 0;
	z-index: 1;
	display: flex;
}

.custom-pagination__bullet {
	width: 100%;
	cursor: pointer;
}

.swiper :deep(.swiper-pagination) {
	display: none;
}

.swiper-slide {
	display: flex;
	justify-content: center;
	align-items: center;
}

@media (min-width: 1280px) {
	.swiper {
		position: absolute;
		inset: 0;
		height: calc(100% + 26px);
		padding-bottom: 26px;
	}

	.swiper :deep(.swiper-pagination) {
		bottom: 0;
		display: block;
	}

	.swiper :deep(.swiper-pagination .swiper-pagination-bullet) {
		width: 6px;
		height: 6px;
	}
}
</style>