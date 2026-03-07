<script setup lang="ts">
import { computed, ref, watch } from "vue";
import type { ProductCard } from "~/types/product";
import { useScroll } from "~/composables/useScroll";
import { useCompareApi } from "~/composables/api/useCompareApi";
import { useCompareStore } from "@/stores/compare";
import type { CompareGroup, ProductComparePage, ProductCompareSet } from "~/types/productCompare";

const compareStore = useCompareStore();
const activeIndex = ref(0);
const isDifference = ref(false);
const { scrollPosition } = useScroll();

const { page: comparePage } = useCompareApi();

const compareRequestProducts = computed(() => {
	return compareToAnonProducts(compareStore.items);
});

const compareRequestSignature = computed(() => {
	return compareRequestProducts.value
		.map((item) => `${item.id}:${item.char_id ?? ""}`)
		.join("|");
});

const { data, error, refresh } = await useAsyncData<ProductComparePage>(
	"compare",
	async () => {
		return await comparePage(compareRequestProducts.value);
	},
	{
		server: false,
		default: () => ({
			products: [],
		}),
		watch: [compareRequestSignature],
	}
);

const compareProducts = computed<ProductCompareSet[]>(() => data.value.products ?? []);

const groupedItems = computed<CompareGroup[]>(() => {
	const groups: CompareGroup[] = [];
	const groupsById = new Map<number, CompareGroup>();

	for (const item of compareProducts.value) {
		const category = item.categories?.[0];

		if (!category) {
			continue;
		}

		let group = groupsById.get(category.id);

		if (!group) {
			group = {
				categoryId: category.id,
				category: category.name,
				items: [],
			};
			groupsById.set(category.id, group);
			groups.push(group);
		}

		group.items.push(item);
	}

	return groups;
});

watch(
	groupedItems,
	(items) => {
		if (!items.length) {
			activeIndex.value = 0;
			return;
		}

		if (activeIndex.value >= items.length) {
			activeIndex.value = 0;
		}
	},
	{ immediate: true }
);

const categoryProducts = computed(() => {
	return groupedItems.value.map((group, index) => ({
		category: group.category,
		count: group.items.length,
		isActive: index === activeIndex.value,
	}));
});

const activeProducts = computed<ProductCard[]>(() => {
	return groupedItems.value[activeIndex.value]?.items ?? [];
});

const toggleActive = (index: number): void => {
	activeIndex.value = index;
};

const deleteProducts = async (): Promise<void> => {
	for (const item of activeProducts.value) {
		compareStore.deleteItem(item);
	}

	activeIndex.value = 0;
	await refresh();
};

const deleteAllCompare = async (): Promise<void> => {
	compareStore.clear();
	activeIndex.value = 0;
	await refresh();
};
</script>
<template>

	<Header />

	<Breadcrumbs />

	<main>

		<Section>
			<SectionContainer>

				<div class="flex items-center justify-between mb-6">

					<TitleGoods title="Сравнение товаров" />

					<div class="flex gap-4 sm:gap-0 sm:bg-gray-100 rounded-lg">
						<button @click="deleteAllCompare"
							class="flex gap-2.5 items-center p-2 sm:p-4 pr-0 hover:text-(--Brand-700) transition-colors cursor-pointer">
							<WrapIcon>
								<CompareIconTrash />
							</WrapIcon>
							<span class="hidden sm:block text-sm leading-5 font-semibold">
								Удалить все
							</span>
						</button>
						<button
							class="flex gap-2.5 items-center p-2 sm:p-4 pl-0 hover:text-(--Brand-700) transition-colors cursor-pointer">
							<WrapIcon>
								<CompareIconShare />
							</WrapIcon>
							<span class="hidden sm:block text-sm leading-5 font-semibold">
								Поделиться
							</span>
						</button>
					</div>

				</div>

				<CompareTabs v-if="compareProducts.length" @handle-click="(i) => toggleActive(i)"
					@click-on-cross="deleteProducts" :items="categoryProducts" class="mb-6" />

				<div class="flex gap-4">
					<CompareSlider :items="activeProducts" />
					<CompareSlider class="sm:hidden" :items="activeProducts" />
				</div>

				<CompareSliderScroll v-if="scrollPosition > 800" :items="activeProducts" />

			</SectionContainer>
		</Section>

		<Section class="pt-10">
			<SectionContainer v-if="compareProducts.length">

				<div class="flex flex-wrap gap-2.5 justify-between items-center mb-5 sm:mb-8">
					<h2 class="text-[20px] leading-8 sm:text-[24px] sm:leading-8 text-gray-950 font-['Russo_One']">
						Сравнение характеристик
					</h2>
					<USwitch v-model="isDifference" label="Показать различия" />
				</div>

				<CompareAccordion 
					v-if="groupedItems"
					:show-differences="isDifference" 
					:group="groupedItems[activeIndex]"
				/>
			</SectionContainer>
		</Section>

	</main>

	<Footer />

</template>
