<script setup lang="ts">
import { computed } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import type { ProductCard } from '~/types/product';

interface Props {
	items?: ProductCard[];
	loading?: boolean;
	skeletonCount?: number;
}

const props = withDefaults(defineProps<Props>(), {
	items: () => [],
	loading: false,
	skeletonCount: 4,
});

const skeletonItems = computed(() =>
	Array.from({ length: props.skeletonCount }, (_, i) => ({
		id: `skeleton-${i}`,
	})),
);
</script>

<template>
	<ClientOnly>
		<swiper
			:slides-per-view="2"
			:loop="!props.loading && props.items.length > 1"
			:space-between="12"
			:breakpoints="{
				577: { slidesPerView: 1, spaceBetween: 32 },
				769: { slidesPerView: 3, spaceBetween: 32 },
				1025: { slidesPerView: 4, spaceBetween: 32 },
			}"
			:navigation="false"
		>
			<template v-if="props.loading">
				<swiper-slide
					v-for="item in skeletonItems"
					:key="item.id"
				>
					<ProductSkeletonCard :skeleton-count="4" :is-list="false"/>
				</swiper-slide>
			</template>

			<template v-else>
				<swiper-slide
					v-for="item in props.items"
					:key="item.id"
				>
					<ProductCard :item="item" />
				</swiper-slide>
			</template>
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
