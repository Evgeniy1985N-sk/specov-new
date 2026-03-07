<script setup lang="ts" >
import { computed, ref, watch } from "vue";
import { useAsyncData } from "#app";

import { useLikeStore } from "@/stores/likes";
import { useLikeApi } from "@/composables/api/useLikeApi";

import type { ProductLikePage, } from "@/types/productLike";

const isShowPopup = ref(true);

const likeStore = useLikeStore();
const activeTab = ref(0);

const { page: favoritePage } = useLikeApi();

interface Item {
	isActive: boolean;
	name: string;
	counter: number;
}

const { data, error, refresh } = await useAsyncData<ProductLikePage>(
	"favorite",
	async () => {
		const products = likeToAnonProducts(likeStore.activeList);
		return await favoritePage(products);
	},
	{ server: false }
);

const itemsTabs = ref<Item[]>([]);

watch(
	() => data.value?.categories,
	(next) => {
		const cats = next ?? [];
		itemsTabs.value = [
			{
				isActive: activeTab.value === 0,
				name: "Все категории",
				counter: cats.reduce((sum, c) => sum + (c.count ?? 0), 0),
			},
			...cats.map((c, idx) => ({
				isActive: activeTab.value === idx + 1,
				name: c.name,
				counter: c.count,
			})),
		];
	},
	{ immediate: true }
);

watch(activeTab, (newVal) => {
	itemsTabs.value = itemsTabs.value.map((item, i) => ({
		...item,
		isActive: i === newVal,
	}));
});

watch(
	() => likeStore.activeList,
	() => {
		void refresh();
	},
	{ deep: true }
);

const expDate = computed(() => (!likeStore.isLoggedIn ? likeStore.getAnonExpiryDate() : null));

const productsToRender = computed(() => data.value?.products ?? []);
</script>

<template>
	<Header />

	<main>
		<Section class="mt-6!">
			<SectionContainer>
				<FavoritePopup
					v-if="isShowPopup && expDate"
					class="mb-6"
					:date="expDate.toLocaleDateString('ru-RU')"
					@close-popup="isShowPopup = false"
				/>

				<div class="flex gap-8 flex-col lg:flex-row">
					<!-- ASIDE -->
					<aside class="w-full lg:max-w-[280px]">
						<TitleGoods class="mb-6" title="Избранное" />

						<div class="lg:p-4 lg:bg-gray-100 rounded-lg w-full">
							<FavoriteSliderTabs
								:items="itemsTabs"
								@handle-click="(index: number) => (activeTab = index)"
							/>
						</div>
					</aside>
					<!-- ASIDE -->

					<div class="w-full">
						<!-- Cards -->
						<div class="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-8">
							<ProductCard v-for="item in productsToRender" :key="item.id" :item="item" />
						</div>
						<!-- Cards -->
					</div>
				</div>
			</SectionContainer>
		</Section>
	</main>

	<Footer />
</template>
