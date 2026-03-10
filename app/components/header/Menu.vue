<script setup lang="ts">
import { computed, ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';

import { useCategory } from '~/composables/useCategory';
import { useMainCats } from '~/composables/useMainCats';

import 'swiper/css';
import 'swiper/css/navigation';

const prevButton = ref<HTMLElement | null>(null);
const nextButton = ref<HTMLElement | null>(null);

const { link } = useCategory();

const { mainCats, ensureMainCats, pending } = useMainCats();
await ensureMainCats();

const skeletonItems = Array.from({ length: 8 }, (_, i) => i);

const hasMainCats = computed((): boolean => {
	return Array.isArray(mainCats.value) && mainCats.value.length > 0;
});
</script>

<template>
	<div class="slider-wrapper relative max-w-[950px]">
		<ClientOnly>
			<div v-if="pending || !hasMainCats" class="skeleton-row">
				<div
					v-for="item in skeletonItems"
					:key="item"
					class="skeleton-pill"
				/>
			</div>

			<div v-else>
				<swiper
					class="h-7"
					:modules="[Navigation]"
					:slides-per-view="'auto'"
					:space-between="20"
					:watch-slides-progress="true"
					:navigation="{
						prevEl: prevButton,
						nextEl: nextButton,
					}"
				>
					<swiper-slide
						v-for="(item, i) in mainCats"
						:key="i"
						class="w-auto! shrink-0! flex! items-center"
					>
						<a
							:href="link(item)"
							class="text-sm whitespace-nowrap text-gray-600 hover:text-(--Brand-700)"
						>
							{{ item.name }}
						</a>
					</swiper-slide>
				</swiper>

				<button
					ref="prevButton"
					class="absolute z-20 top-1/2 left-0 -translate-y-1/2 transition border-zinc-300 p-[5px] flex justify-center items-center h-8 w-8 bg-white hover:bg-gray-300 border border-solid rounded-full cursor-pointer"
				>
					<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 rotate-180">
						<path d="M7.5 15L12.5 10L7.5 5" stroke="#535862" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
					</svg>
				</button>

				<div class="slider-wrapper__gradient absolute left-5 top-0 h-full w-16 bg-linear-to-r from-white to-transparent z-10 pointer-events-none" />

				<button
					ref="nextButton"
					class="absolute z-20 top-1/2 right-0 -translate-y-1/2 transition border-zinc-300 p-[5px] flex justify-center items-center h-8 w-8 bg-white hover:bg-gray-300 border border-solid rounded-full cursor-pointer"
				>
					<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5">
						<path d="M7.5 15L12.5 10L7.5 5" stroke="#535862" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
					</svg>
				</button>

				<span class="slider-wrapper__gradient absolute right-5 top-0 h-full w-16 bg-linear-to-l from-white to-transparent z-10 pointer-events-none text-0">...</span>
			</div>

			<template #fallback>
				<div class="skeleton-row">
					<div
						v-for="item in skeletonItems"
						:key="item"
						class="skeleton-pill"
					/>
				</div>
			</template>
		</ClientOnly>
	</div>
</template>

<style scoped>
.swiper-button-disabled {
	display: none !important;
}

.swiper-button-disabled + .slider-wrapper__gradient {
	display: none !important;
}

.skeleton-row {
	display: flex;
	align-items: center;
	gap: 20px;
	height: 28px;
	overflow: hidden;
	padding-inline: 40px;
}

.skeleton-pill {
	position: relative;
	flex: 0 0 auto;
	height: 20px;
	border-radius: 9999px;
	background: #e5e7eb;
	overflow: hidden;
}

.skeleton-pill:nth-child(1) {
	width: 72px;
}

.skeleton-pill:nth-child(2) {
	width: 96px;
}

.skeleton-pill:nth-child(3) {
	width: 88px;
}

.skeleton-pill:nth-child(4) {
	width: 110px;
}

.skeleton-pill:nth-child(5) {
	width: 84px;
}

.skeleton-pill:nth-child(6) {
	width: 100px;
}

.skeleton-pill:nth-child(7) {
	width: 78px;
}

.skeleton-pill:nth-child(8) {
	width: 92px;
}

.skeleton-pill::after {
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

@keyframes shimmer {
	100% {
		transform: translateX(100%);
	}
}

@media (max-width: 640px) {
	.skeleton-row {
		gap: 12px;
		padding-inline: 0;
	}
}
</style>
