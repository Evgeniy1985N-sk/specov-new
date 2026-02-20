<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper/modules'


import 'swiper/css'
import 'swiper/css/pagination'

import type { Picture } from '~/types/picture'
import { useProductPicture } from '~/composables/useProductPicture';

interface Props {
	imgs: Picture[]
}
const props = defineProps<Props>()

const { picturePreview } = useProductPicture();

</script>

<template>
	<ClientOnly>

		<swiper :slides-per-view="1" :loop="false" :space-between="0" :pagination="{ clickable: true }" :navigation="false"
			:modules="[Pagination]">

			<swiper-slide v-for="(item, i) in props.imgs" :key="i">

				<img :src="picturePreview(item)" class="max-w-[115px] sm:max-w-full">

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

@media (min-width: 1280px) {
	.swiper {
		position: absolute;
		inset: 0;
		height: calc(100% + 26px);
	}

	.swiper :deep(.swiper-pagination) {
		bottom: 0;
		display: block;
	}
}
</style>
