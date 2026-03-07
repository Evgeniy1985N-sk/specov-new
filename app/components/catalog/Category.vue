<script setup lang="ts">
import type { CategoryCatalog, CategoryCatalogParams, CategoryCatalogPrecalc, CategoryCatalogSortCol, CategoryCatalogSortDir } from '~/types/productCat';
import type { ProductCard } from '~/types/product';
import { useProductCatApi } from '~/composables/api/useProductCatApi';
import { useCategory } from '~/composables/useCategory';

const props = defineProps<{
	data: CategoryCatalog;
}>();

//const FILTER_POPOVER_DELAY = 1000; // ms

const isShowPopover = ref(false);
const isShoWFilter = ref(false);
const isList = ref(false);

const { y: mousePositionY } = useMousePosition();
const aside = ref<HTMLElement | null>(null);
const popoverPos = ref({
	top: 0,
	left: 0,
});
const mouseClientY = computed(() => {
	if (!import.meta.client) return 0;
	return mousePositionY.value;
});
const updatePopoverPos = () => {
	if (!import.meta.client) return;

	const rect = aside.value?.getBoundingClientRect();
	const left = (rect?.right ?? 0) + 16; // 16px gap from sidebar

	popoverPos.value = {
		top: mouseClientY.value,
		left,
	};
};

const maxProductCount = 500; //absolute maximum
const productIncCount = 20; //increment for "show more"
const productVisibleInitCount = 20;

const route = useRoute();

//to be able to track page refreshing
const isRefreshing = ref(false);
const pendingTotalCount = ref<number | null>(null);
watch(
	() => props.data,
	() => {
		isRefreshing.value = false;
	},
	{ deep: false }
);
const skeletonCount = computed(() => {
	if (!isRefreshing.value) return 0;

	if (pendingTotalCount.value == null) {
		return productVisibleInitCount;
	}

	// When we know next total, show exact number
	return Math.max(0, Math.min(pendingTotalCount.value, productVisibleCount.value));
});
/*
const skeletonCount = computed(() => {
	const total = facetState.value.total_count ?? 0;
	const visible = productVisibleCount.value;
	return Math.max(0, Math.min(total, visible));
});
*/
const skeletonItems = computed(() => Array.from({ length: skeletonCount.value }));

const { scrollToSection } = useScrollTo();
const scrollToTop = (): void => {
	scrollToSection("prod-container");
	//if (!import.meta.client) return;
	//window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
};

const productVisibleCount = ref(Number(route.query.count) || productVisibleInitCount);

// Buffer for all loaded products
const productsBuffer = ref<ProductCard[]>([]);
watch(
	() => props.data.products,
	(products) => {
		productsBuffer.value = products || [];
		productVisibleCount.value = Number(route.query.count) || productVisibleInitCount;
	},
	{ immediate: true }
);

const displayedItems = computed(() =>
	productsBuffer.value.slice(0, productVisibleCount.value)
);

const childCategories = computed(() =>
	props.data.category.children
);

const breadcrumbCategories = computed(() => {
	if (!props.data.category.parents) {
		return [];
	}
	const cats = [...props.data.category.parents];
	cats.push(props.data.category);
	return cats;
});

// Loading state for fetching
const isLoading = ref(false);

const sort = ref<{
	sort: CategoryCatalogSortCol,
	dir: CategoryCatalogSortDir
}>({ sort: "popularity", dir: "desc" });
watch(sort, () => {
	applyProductSettings();
});

const classAside = computed(() => ({
	'fixed top-0 -left-full lg:left-0 h-screen overflow-auto lg:overflow-visible lg:h-full overscroll-[contain] transition z-100 lg:z-1 lg:relative flex items-start w-full lg:max-w-[280px] bg-white': true,
	'left-0': isShoWFilter.value
}));

type FacetChange =
	| { kind: 'brand'; checked: boolean; id: number }
	| { kind: 'country'; checked: boolean; id: number }
	| { kind: 'store'; checked: boolean; id: number }
	| { kind: 'dyn'; checked: boolean; filterId: number }
	| { kind: 'price' };

const filterClick = async (change: FacetChange) => {
	updatePopoverPos();

	const ok = await fetchProdCountForFilter(change);
	if (ok) {
		isShowPopover.value = true;
	}
};

const sorterRef = ref();
const filterRef = ref();

const resetAllFilters = async () => {
	isShowPopover.value = false;
	filterRef.value?.resetFilters();
	productVisibleCount.value = productVisibleInitCount;
	isRefreshing.value = true;
	pendingTotalCount.value = null; // unknown -> use max skeletons (init count)
	await refreshPage();
	scrollToTop();
}

// applyProductSettings fetches products with current settings (filters, sorting, from, count).
const applyProductSettings = async () => {
	productVisibleCount.value = productVisibleInitCount;
	isShowPopover.value = false;
	isRefreshing.value = true;
	pendingTotalCount.value = facetState.value.total_count; // known beforehand
	await refreshPage();
	scrollToTop();
}

const refreshPage = async () => {
	const filters = filterRef.value?.buildFilterQuery();

	await navigateTo({
		path: `/category/${props.data.category.id}/`,
		query: {
			...filters,
			sort: sort.value.sort,
			dir: sort.value.dir,
			count: productVisibleCount.value
		}
	});
}

const { catalog, catalogProductCount } = useProductCatApi();

// Fetch more products from server
const fetchMoreProducts = async (): Promise<boolean> => {
	try {
		isLoading.value = true;

		console.log(`Fetching ${productIncCount} more products from position ${productsBuffer.value.length}`);

		const apiParams = <CategoryCatalogParams>{
			...route.query,
			from: productsBuffer.value.length,
			count: productIncCount,
		};
		const catalogData = await catalog(props.data.category.id, apiParams);
		productsBuffer.value = [...productsBuffer.value, ...catalogData.products];

		return true;
	} catch (error) {
		console.error('Error fetching more products:', error);
		return false;
	} finally {
		isLoading.value = false;
	}
};

const showMore = async () => {
	const newCount = productVisibleCount.value + productIncCount;

	// Check if we've reached the maximum
	if (newCount > maxProductCount) {
		console.log("Maximum displayed count reached");
		return;
	}

	// Check if we need to fetch more products from server
	if (newCount > productsBuffer.value.length) {
		const success = await fetchMoreProducts();
		if (!success) {
			console.log("Failed to fetch more products");
			return;
		}
	}

	// Update visible count
	productVisibleCount.value = newCount;
};

type FacetKind = 'brand' | 'country' | 'store' | 'dyn' | 'price';

const buildQueryExcluding = (kind: FacetKind, dynFilterId?: number): Record<string, any> => {
	const q = { ...(filterRef.value?.buildFilterQuery() ?? {}) };

	if (kind === 'brand') {
		delete q.brands;
	}
	if (kind === 'country') {
		delete q.countries;
	}
	if (kind === 'store') {
		delete q.stores;
	}
	if (kind === 'price') {
		delete q.min_price;
		delete q.max_price;
	}
	if (kind === 'dyn') {
		// remove only this dynamic filter from query keys
		// your keys are: filters_hash[ID], filters_list[ID], filters_num[ID][min|max], filters_date[ID]
		const prefix1 = `filters_hash[${dynFilterId}]`;
		const prefix2 = `filters_list[${dynFilterId}]`;
		const prefix3 = `filters_num[${dynFilterId}]`;
		const prefix4 = `filters_date[${dynFilterId}]`;

		for (const key of Object.keys(q)) {
			if (
				key === prefix1 ||
				key === prefix2 ||
				key.startsWith(prefix3) ||
				key === prefix4
			) {
				delete q[key];
			}
		}
	}

	return q;
};

const { 
	mergeDynFilters,
	mergeBrandFilters,
	mergeCountryFilters,
	mergeStoreFilters,
} = useCategory();
const prodCountForFilterIsLoading = ref(false);
const facetState = ref<CategoryCatalogPrecalc>({
	total_count: props.data.total_count,
	filters: mergeDynFilters(props.data.category.filters ?? [], props.data.filters ?? []),
	brands: mergeBrandFilters(props.data.category.brands ?? [], props.data.brands ?? []),
	countries: mergeCountryFilters(props.data.category.countries ?? [], props.data.countries ?? []),
	stores: mergeStoreFilters(props.data.category.stores ?? [], props.data.stores ?? []),
	min_price: props.data.min_price,
	max_price: props.data.max_price,
});

watch(
	() => props.data,
	(next) => {
		// keep facetState aligned with server result after navigateTo()
		facetState.value = {
			total_count: next.total_count,
			filters: mergeDynFilters(next.category.filters ?? [], next.filters ?? []),
			brands: mergeBrandFilters(next.category.brands ?? [], next.brands ?? []),
			countries: mergeCountryFilters(next.category.countries ?? [], next.countries ?? []),
			stores: mergeStoreFilters(next.category.stores ?? [], next.stores ?? []),
			min_price: next.min_price,
			max_price: next.max_price,
		};
	},
	{ immediate: true }
);

//returns count, filters, brands, countries, stors 
//for petential products.
const fetchProdCountForFilter = async (change?: FacetChange): Promise<boolean> => {
	try {
		prodCountForFilterIsLoading.value = true;

		const qFull = filterRef.value?.buildFilterQuery() ?? {};
		const fullParams = <CategoryCatalogParams>{ count: 0, ...qFull };

		const kind = change?.kind ?? null;

		if (kind === 'price' || !change) {
			const fullData = await catalogProductCount(props.data.category.id, fullParams);

			const baseDyn = props.data.category.filters ?? [];
			const baseBrands = props.data.category.brands ?? [];
			const baseCountries = props.data.category.countries ?? [];
			const baseStores = props.data.category.stores ?? [];

			facetState.value = {
				total_count: fullData.total_count,
				filters: mergeDynFilters(baseDyn, fullData.filters ?? []),
				brands: mergeBrandFilters(baseBrands, fullData.brands ?? []),
				countries: mergeCountryFilters(baseCountries, fullData.countries ?? []),
				stores: mergeStoreFilters(baseStores, fullData.stores ?? []),
				min_price: fullData.min_price,
				max_price: fullData.max_price,
			};

			return true;
		}

		const qFacet = change.kind === "dyn"
			? buildQueryExcluding("dyn", change.filterId)
			: buildQueryExcluding(change.kind);

		const facetParams = <CategoryCatalogParams>{ count: 0, ...qFacet };

		const [fullData, facetData] = await Promise.all([
			catalogProductCount(props.data.category.id, fullParams),
			catalogProductCount(props.data.category.id, facetParams),
		]);

		const baseDyn = props.data.category.filters ?? [];
		const baseBrands = props.data.category.brands ?? [];
		const baseCountries = props.data.category.countries ?? [];
		const baseStores = props.data.category.stores ?? [];

		let nextDyn = mergeDynFilters(baseDyn, fullData.filters ?? []);
		let nextBrands = mergeBrandFilters(baseBrands, fullData.brands ?? []);
		let nextCountries = mergeCountryFilters(baseCountries, fullData.countries ?? []);
		let nextStores = mergeStoreFilters(baseStores, fullData.stores ?? []);

		if (kind === "brand") {
			nextBrands = mergeBrandFilters(baseBrands, facetData.brands ?? []);
		} else if (kind === "country") {
			nextCountries = mergeCountryFilters(baseCountries, facetData.countries ?? []);
		} else if (kind === "store") {
			nextStores = mergeStoreFilters(baseStores, facetData.stores ?? []);
		} else if (kind === "dyn") {
			nextDyn = mergeDynFilters(baseDyn, facetData.filters ?? []);
		}

		facetState.value = {
			total_count: fullData.total_count,
			filters: nextDyn,
			brands: nextBrands,
			countries: nextCountries,
			stores: nextStores,
			min_price: fullData.min_price,
			max_price: fullData.max_price,
		};

		return true;
	} catch (error) {
		console.error("Error fetching product count for filter:", error);
		return false;
	} finally {
		prodCountForFilterIsLoading.value = false;
	}
};
onMounted(() => {
	filterRef.value?.initFromQuery(route.query);
	sorterRef.value?.initFromQuery(route.query);
});

</script>

<template>

	<Header />

	<Breadcrumbs :categories="breadcrumbCategories" />

	<main>

		<Section class="mt-0!">
			<SectionContainer>
				<TitleGoods class="mb-6" :goods="data.total_count" :title="data.category.name" />

				<CatalogCardSlider v-if="childCategories"
					:items="childCategories" 
					class="mb-6 hidden! md:block!" 
				/>

				<div class="flex gap-8" id="prod-container">

					<!-- ASIDE -->
					<aside ref="aside" :class="classAside" >
						<div class="grid gap-6 pb-36 sm:pb-40 lg:p-4 bg-white lg:bg-gray-100 rounded-xl w-full h-auto">

							<!-- HEADER -->
							<div class="flex lg:hidden justify-between items-center p-4 sm:p-6 border-b border-gray-200">

								<button @click="isShoWFilter = false" class="flex items-center gap-2">
									<WrapIcon>
										<CatalogIconBack />
									</WrapIcon>
									<p class="text-[24px] leading-8 font-['Russo_One'] text-black">
										Фильтры
									</p>
								</button>
								<button @click="isShoWFilter = false">
									<WrapIcon class="w-9 h-9">
										<CatalogIconCross />
									</WrapIcon>
								</button>

							</div>
							<!-- HEADER -->

							<!-- FILTER -->
							<CatalogFilter ref="filterRef" 
								class="px-4 sm:px-6 lg:px-0" 
								:brands="facetState.brands" 
								:countries="facetState.countries"
								:filters="facetState.filters" 
								:stores="facetState.stores"
								:minPrice="facetState.min_price" :maxPrice="facetState.max_price"
								:total-count="facetState.total_count"
								@handle-click="filterClick" 
							/>
							<!-- FILTER -->

							<!-- BUTTONS -->
							<div
								class="fixed bottom-0 w-full bg-white lg:bg-transparent lg:static grid gap-2 p-4 sm:p-6 lg:p-0 border-t border-gray-200">
								<UButton @click="applyProductSettings" class="min-h-10" size="lg" type="submit">
									Применить
								</UButton>

								<UButton @click="resetAllFilters"
									class="flex items-center justify-center h-10 cursor-pointer rounded-lg bg-white! text-(--Brand-950) text-sm"
									color="neutral">Сбросить
								</UButton>
							</div>
							<!-- BUTTONS -->

						</div>

						<!-- POPOVER -->
						<Teleport to="body">
						<CatalogPopover v-if="isShowPopover" :goods="facetState.total_count"
							@handle-click="applyProductSettings"
							class="hidden! lg:inline-block!" 
							:top="popoverPos.top"
							:left="popoverPos.left"
						/>
						</Teleport>
						<!-- POPOVER -->

					</aside>
					<!-- ASIDE -->


					<div class="w-full">

						<!-- Top -->
						<div class="grid grid-cols-[auto_auto] sm:flex justify-between items-center flex-wrap gap-x-2 gap-y-4 pb-6">
							<CatalogSort ref="sorterRef" @handle-click="(value) => sort = value" />

							<button @click="isShoWFilter = !isShoWFilter"
								class="flex lg:hidden gap-1.5 items-center sm:mr-auto text-sm">
								Фильтры
								<CatalogIconFilter />
							</button>

							<CatalogSwitch @handle-click="isList = !isList" />

						</div>
						<!-- Top -->

						<CatalogCardSlider v-if="childCategories"
							:items="childCategories" 
							class="mb-6 md:hidden!" 
						/>

						<!-- Cards
						<div
							:class="isList ? 'grid-cols-1 gap-8 pt-6 border-t border-gray-300' : 'grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-6'"
							class="grid lg:gap-8">
							<ProductCard :is-row="isList" :is-list="!isList" v-for="item in displayedItems" :item="item"
								:key="item.id" />
						</div>
						-->

						<!-- Cards -->
						<div v-if="isRefreshing">
							<div
								:class="isList ? 'grid-cols-1 gap-8 pt-6 border-t border-gray-300' : 'grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-6'"
								class="grid lg:gap-8"
							>
								<div
									v-for="(_, i) in skeletonItems"
									:key="`sk-${i}`"
									:class="isList ? 'flex gap-4' : 'grid gap-3'"
									class="animate-pulse bg-white rounded-xl border border-gray-200 p-3"
								>
									<!-- Image -->
									<div
										:class="isList ? 'w-[140px] h-[140px] shrink-0' : 'w-full aspect-square'"
										class="rounded-lg bg-gray-200"
									></div>

									<!-- Text blocks -->
									<div class="flex-1 grid gap-2">
										<div class="h-4 w-3/4 rounded bg-gray-200"></div>
										<div class="h-4 w-2/3 rounded bg-gray-200"></div>
										<div class="h-3 w-1/2 rounded bg-gray-200 mt-1"></div>

										<div class="flex items-center justify-between mt-3">
											<div class="h-6 w-24 rounded bg-gray-200"></div>
											<div class="h-10 w-28 rounded-lg bg-gray-200"></div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div v-else>
							<div
								:class="isList ? 'grid-cols-1 gap-8 pt-6 border-t border-gray-300' : 'grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-6'"
								class="grid lg:gap-8"
							>
								<ProductCard
									:is-row="isList"
									:is-list="!isList"
									v-for="item in displayedItems"
									:item="item"
									:key="item.id"
								/>
							</div>
						</div>
						<!-- Cards -->
						<!-- More Cards  -->
						<UButton
							class="w-full min-h-10 mt-6 bg-gray-100 text-(--Brand-950) text-sm font-semibold hover:bg-gray-200 active:bg-gray-300 cursor-pointer px-4 py-2.5"
							v-if="productVisibleCount < maxProductCount && productVisibleCount < facetState.total_count"
							@click="showMore">
							Показать еще
						</UButton>
						<!-- More Cards -->
					</div>

				</div>

			</SectionContainer>
		</Section>

		<Section>
			<SectionContainer>
				<SectionHeader>
					<SectionTitle text="Вы недавно смотрели" />
					<SectionButton text="Смотреть всё" path="/" />
				</SectionHeader>

				<ProductSlider :items="props.data.last_viewed" />

			</SectionContainer>
		</Section>

		<Feedback />

		<Section>
			<SectionContainer>
				<Stores />
			</SectionContainer>
		</Section>

	</main>

	<Footer />

</template>
