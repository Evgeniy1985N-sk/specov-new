<script setup lang="ts">
import type { CategoryCatalog, CategoryCatalogParams, CategoryCatalogSortCol, CategoryCatalogSortDir } from '~/types/productCat';
import type { ProductCard } from '~/types/product';
import { useProductCatApi } from '~/composables/api/useProductCatApi';

const props = defineProps<{
	data: CategoryCatalog;
}>();

const FILTER_POPOVER_DELAY = 1000; // ms

const isShowPopover = ref(false);
const isShoWFilter = ref(false);
const isList = ref(false);

const { y: mousePositionY } = useMousePosition();
const filterTop = ref(0);

const maxProductCount = 500; //absolute maximum
const productIncCount = 20; //increment for "show more"
const productVisibleInitCount = 20;

const route = useRoute();

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

const isCardVisible = computed(() =>
	(productsBuffer.value?.length ?? 0) > 0
);

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

//show pop over
// let filterPopoverTimeoutId: ReturnType<typeof setTimeout> | null = null;
const filterClick = async (filter: { id: string }) => {

	filterTop.value = mousePositionY.value;
	console.log("filter click, mousePositionY:", mousePositionY.value)
	const res = await fetchProdCountForFilter();
	if (res) {
		isShowPopover.value = true;
	}

	// If a timeout already exists, reset it
	// if (filterPopoverTimeoutId) {
	// 	clearTimeout(filterPopoverTimeoutId);
	//
	// }
	// filterPopoverTimeoutId = setTimeout(() => {
	// 	(async () => {
	// 		const res = await fetchProdCountForFilter();
	// 		if (res) {
	// 			isShowPopover.value = true;
	// 		}
	// 		filterPopoverTimeoutId = null;
	// 	})();
	// }, FILTER_POPOVER_DELAY);
}

const sorterRef = ref();
const filterRef = ref();

const resetAllFilters = () => {
	filterRef.value?.resetFilters();
	productVisibleCount.value = productVisibleInitCount;
	refreshPage();
}

// applyProductSettings fetches products with current settings (filters, sorting, from, count).
const applyProductSettings = () => {
	productVisibleCount.value = productVisibleInitCount;
	isShowPopover.value = false;
	refreshPage();
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
			from: productsBuffer.value.length,
			count: productIncCount,
			...route.query,
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

const foundProdCountForFilter = ref(0);
const prodCountForFilterIsLoading = ref(false);
const fetchProdCountForFilter = async (): Promise<boolean> => {
	try {

		const filters = filterRef.value?.buildFilterQuery();

		const apiParams = <CategoryCatalogParams>{
			count: 0,
			...filters,
		};
		prodCountForFilterIsLoading.value = true;
		const catalogData = await catalogProductCount(props.data.category.id, apiParams);
		foundProdCountForFilter.value = catalogData.total_count;

		return true;
	} catch (error) {
		console.error('Error fetching product count for filter:', error);
		return false;
	} finally {
		prodCountForFilterIsLoading.value = false;
	}
};

onMounted(() => {
	filterRef.value?.initFromQuery(route.query);
	sorterRef.value?.initFromQuery(route.query);
});
const cards = ref([
	{
		name: 'Столярные Столярные',
		quantity: 698,
		image: '/image/example/img-1.jpg'
	},
	{
		name: 'Специальные Столярные Столярные',
		quantity: 418,
		image: '/image/example/img-2.jpg'
	},
	{
		name: 'Искробезопасные Искробезопасные Искробезопасные',
		quantity: 698,
		image: '/image/example/img-3.jpg'
	},
	{
		name: 'Безынерционные Искробезопасные Искробезопасные',
		quantity: 698,
		image: '/image/example/img-4.jpg'
	},
	{
		name: 'С медным бойком Искробезопасные Искробезопасные Искробезопасные',
		quantity: 35,
		image: '/image/example/img-5.jpg'
	},
	{
		name: 'Молотки плиточника',
		quantity: 8,
		image: '/image/example/img-6.jpg'
	},
	{
		name: 'Кровельщика',
		quantity: 110,
		image: '/image/example/img-7.jpg'
	},
	{
		name: 'Молотки-топоры',
		quantity: 12,
		image: '/image/example/img-8.jpg'
	},
])
</script>

<template>

	<Header />

	<Breadcrumbs :categories="breadcrumbCategories" />

	<main>

		<Section class="mt-0!">
			<SectionContainer>
				<TitleGoods class="mb-6" :goods="data.total_count" :title="data.category.name" />

				<!-- <CatalogCardSlider v-if="childCategories" :items="childCategories" class="mb-8 hidden! md:block!" /> -->

				<CatalogCardSlider :items="cards" class="mb-6 hidden! md:block!" />

				<div class="flex gap-8">

					<!-- ASIDE -->
					<aside ref="aside" :class="classAside" v-if="isCardVisible">
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
							<CatalogFilter ref="filterRef" :brands="props.data.brands" :countries="props.data.countries"
								:filters="props.data.filters" :stores="props.data.stores" :minPrice="props.data.min_price"
								:maxPrice="props.data.max_price" class="px-4 sm:px-6 lg:px-0" @handle-click="filterClick" />
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
						<CatalogPopover v-if="isShowPopover" :goods="foundProdCountForFilter" @handle-click="applyProductSettings"
							class="hidden! lg:inline-block!" :top="filterTop" />
						<!-- POPOVER -->


					</aside>
					<!-- ASIDE -->


					<div class="w-full" v-if="isCardVisible">

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


						<!-- <CatalogCardSlider v-if="childCategories" :items="childCategories" class="mb-6! md:hidden!" /> -->
						<CatalogCardSlider :items="cards" class="mb-6 md:hidden!" />

						<!-- Cards -->
						<div
							:class="isList ? 'grid-cols-1 gap-8 pt-6 border-t border-gray-300' : 'grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-6'"
							class="grid lg:gap-8">
							<ProductCard :is-row="isList" :is-list="!isList" v-for="item in displayedItems" :item="item"
								:key="item.id" />
						</div>
						<!-- Cards -->

						<!-- More Cards  -->
						<UButton
							class="w-full min-h-10 mt-6 bg-gray-100 text-(--Brand-950) text-sm font-semibold hover:bg-gray-200 active:bg-gray-300 cursor-pointer px-4 py-2.5"
							v-if="productVisibleCount < maxProductCount && productVisibleCount < props.data.total_count"
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
