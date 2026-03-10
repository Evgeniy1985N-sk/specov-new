<script setup lang="ts">
import { computed } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';

import { type ProductCatPublicList } from '@/types/productCat';
import { categoryLink } from '@/utils/categoryLink';

const { imgSrc } = useCategory();

interface Props {
	items?: ProductCatPublicList[];
	loading?: boolean;
	class?: string;
}

const props = withDefaults(defineProps<Props>(), {
	items: () => [],
	loading: false,
});

const { declineProductWord } = useProduct();

const skeletonItems = [0, 1, 2, 3];

const hasItems = computed((): boolean => {
	return props.items.length > 0;
});

const showSkeletons = computed((): boolean => {
	return props.loading;
});

const showContent = computed((): boolean => {
	return !props.loading && hasItems.value;
});

const showEmpty = computed((): boolean => {
	return !props.loading && !hasItems.value;
});
</script>

<template>
	<div :class="props.class">
		<ClientOnly>
			<div v-if="showSkeletons" class="cards-skeleton-grid">
				<div
					v-for="item in skeletonItems"
					:key="item"
					class="card-skeleton"
				>
					<div class="card-skeleton__icon" />
					<div class="card-skeleton__content">
						<div class="card-skeleton__title" />
						<div class="card-skeleton__meta" />
					</div>
				</div>
			</div>

			<swiper
				v-else-if="showContent"
				:slides-per-view="'auto'"
				:space-between="8"
			>
				<swiper-slide v-for="item in props.items" :key="item.id">
					<NuxtLink
						:to="categoryLink(item)"
						class="flex items-center gap-4 h-full lg:min-h-20 p-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-100 transition"
					>
						<span class="flex items-center shrink-0 w-10 h-10 lg:w-16 lg:h-16 rounded-lg bg-white">
							<img :src="imgSrc(item)" class="w-full h-full" alt="фото">
						</span>

						<div class="grid gap-.5">
							<p class="max-w-[200px] line-clamp-2 text-sm leading-5 text-gray-950 font-semibold">
								{{ item.name }}
							</p>
							<span class="text-[12px] leading-[18px] font-medium">
								{{ declineProductWord(item.product_count) }}
							</span>
						</div>
					</NuxtLink>
				</swiper-slide>
			</swiper>

			<div v-else-if="showEmpty" class="hidden"></div>

			<template #fallback>
				<div v-if="props.loading" class="cards-skeleton-grid">
					<div
						v-for="item in skeletonItems"
						:key="item"
						class="card-skeleton"
					>
						<div class="card-skeleton__icon" />
						<div class="card-skeleton__content">
							<div class="card-skeleton__title" />
							<div class="card-skeleton__meta" />
						</div>
					</div>
				</div>
			</template>
		</ClientOnly>
	</div>
</template>

<style scoped>
.cards-skeleton-grid {
	display: grid;
	grid-template-columns: 1fr;
	gap: 8px;
}

.card-skeleton {
	position: relative;
	display: flex;
	align-items: center;
	gap: 16px;
	min-height: 56px;
	padding: 8px;
	border-radius: 8px;
	border: 1px solid rgb(229 231 235);
	background: white;
	overflow: hidden;
}

.card-skeleton::after {
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

.card-skeleton__icon {
	position: relative;
	z-index: 1;
	flex: 0 0 auto;
	width: 40px;
	height: 40px;
	border-radius: 8px;
	background: rgb(229 231 235);
}

.card-skeleton__content {
	position: relative;
	z-index: 1;
	display: grid;
	gap: 6px;
	flex: 1 1 auto;
}

.card-skeleton__title {
	width: 75%;
	height: 16px;
	border-radius: 6px;
	background: rgb(229 231 235);
}

.card-skeleton__meta {
	width: 45%;
	height: 12px;
	border-radius: 6px;
	background: rgb(229 231 235);
}

@keyframes shimmer {
	100% {
		transform: translateX(100%);
	}
}

@media (max-width: 767px) {
	.swiper {
		margin-left: 0;
		overflow: visible;
	}

	.swiper:deep(.swiper-slide) {
		width: auto !important;
		height: auto;
	}
}

@media (min-width: 768px) {
	.cards-skeleton-grid {
		grid-template-columns: repeat(3, 1fr);
	}

	.card-skeleton {
		min-height: 80px;
	}

	.card-skeleton__icon {
		width: 64px;
		height: 64px;
	}

	.swiper:deep(.swiper-wrapper) {
		transform: none !important;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 8px;
	}

	.swiper:deep(.swiper-slide) {
		margin: 0 !important;
	}
}

@media (min-width: 1023px) {
	.cards-skeleton-grid {
		grid-template-columns: repeat(4, 1fr);
	}

	.swiper:deep(.swiper-wrapper) {
		grid-template-columns: repeat(4, 1fr);
	}
}
</style>
