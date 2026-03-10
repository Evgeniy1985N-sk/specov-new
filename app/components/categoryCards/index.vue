<script setup lang="ts">
import { computed } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { useCategory } from '~/composables/useCategory';

const { imgSrc, link } = useCategory();

const { mainCats, ensureMainCats, pending } = useMainCats();
await ensureMainCats();

const skeletonItems = [0, 1, 2, 3];

const hasCards = computed((): boolean => {
	return Array.isArray(mainCats.value) && mainCats.value.length > 0;
});
</script>

<template>
	<Section>
		<div class="relative max-w-(--container) px-4 m-auto pb-6 sm:pb-20">
			<ClientOnly>
				<div v-if="pending || !hasCards" class="cards-fallback-grid">
					<div
						v-for="item in skeletonItems"
						:key="item"
						class="card-skeleton rounded-2xl overflow-hidden"
					>
						<div class="card-skeleton-title" />
						<div class="card-skeleton-image" />
					</div>
				</div>

				<swiper
					v-else
					:slides-per-view="2"
					:space-between="8"
					:breakpoints="{
						577: { slidesPerView: 1, spaceBetween: 32 },
						769: { slidesPerView: 3, spaceBetween: 32 },
						1025: { slidesPerView: 4, spaceBetween: 32 },
					}"
					:navigation="false"
				>
					<swiper-slide
						v-for="(item, i) in mainCats"
						:key="item.id"
						:class="`slide-${i}`"
						class="rounded-2xl overflow-hidden"
					>
						<NuxtLink :to="link(item)" class="block h-full">
							<img :src="imgSrc(item)" :alt="item.name" class="absolute bottom-0 left-0 -z-1" />
							<div class="flex flex-col h-full">
								<div
									class="text-[#0A0D12] font-sans font-semibold sm:text-xl text-xs leading-[18px] sm:leading-[30px] tracking-[0%]"
								>
									{{ item.name }}
								</div>
							</div>
						</NuxtLink>
					</swiper-slide>
				</swiper>

				<template #fallback>
					<div class="cards-fallback-grid">
						<div
							v-for="item in skeletonItems"
							:key="item"
							class="card-skeleton rounded-2xl overflow-hidden"
						>
							<div class="card-skeleton-title" />
							<div class="card-skeleton-image" />
						</div>
					</div>
				</template>
			</ClientOnly>
		</div>
	</Section>
</template>

<style scoped>
.swiper-slide {
	height: 280px;
	padding: 24px;
	padding-bottom: 0;
}

.swiper-slide::after {
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

.slide-1 {
	background: #F6F4E8;
}

.slide-2 {
	background: #C9E0E4;
}

.slide-3 {
	background: #F5F5F5;
}

.cards-fallback-grid {
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	gap: 8px;
}

.card-skeleton {
	position: relative;
	height: 280px;
	padding: 24px;
	padding-bottom: 0;
	background: #f3f4f6;
}

.card-skeleton::after {
	content: '';
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 59px;
	background: url('/image/cards/pattern.svg');
	opacity: 0.5;
}

.card-skeleton::before {
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
	z-index: 1;
}

.card-skeleton-title {
	position: relative;
	z-index: 2;
	width: 60%;
	height: 28px;
	border-radius: 8px;
	background: #e5e7eb;
}

.card-skeleton-image {
	position: absolute;
	left: 24px;
	bottom: 20px;
	z-index: 2;
	width: 110px;
	height: 110px;
	border-radius: 12px;
	background: #e5e7eb;
}

@keyframes shimmer {
	100% {
		transform: translateX(100%);
	}
}

@media (min-width: 769px) {
	.cards-fallback-grid {
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 32px;
	}
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

	.swiper-slide::after {
		height: 30px;
		background: url('/image/cards/pattern-mob.svg');
	}

	.swiper-slide img {
		left: 50%;
		transform: translateX(-50%);
		max-width: 90px;
	}

	.cards-fallback-grid {
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 8px;
	}

	.card-skeleton {
		height: 140px;
		padding: 12px;
	}

	.card-skeleton::after {
		height: 30px;
		background: url('/image/cards/pattern-mob.svg');
	}

	.card-skeleton-title {
		width: 70%;
		height: 18px;
	}

	.card-skeleton-image {
		left: 50%;
		bottom: 10px;
		transform: translateX(-50%);
		width: 90px;
		height: 56px;
	}
}
</style>
