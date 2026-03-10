<script setup lang="ts">
import type { LocationQuery } from 'vue-router';
import type {
	CategoryFilter,
	CategoryFilterListOption,
} from '@/types/categoryFilter';
import type {
	BrandFilter,
	CountryFilter,
	StoreFilter,
} from '@/types/productCat';

interface Props {
	class?: string;
	filters: CategoryFilter[];
	brands: BrandFilter[];
	countries: CountryFilter[];
	stores: StoreFilter[];
	minPrice: number;
	maxPrice: number;
	absoluteMinPrice: number;
	absoluteMaxPrice: number;
	totalCount: number;
}

//type FacetKind = 'brand' | 'country' | 'store' | 'dyn' | 'price';

type FacetChange =
	| { kind: 'brand'; checked: boolean; id: number }
	| { kind: 'country'; checked: boolean; id: number }
	| { kind: 'store'; checked: boolean; id: number }
	| { kind: 'dyn'; checked: boolean; filterId: number }
	| { kind: 'price' };

type SectionKey = 'availability' | 'price' | 'brand' | 'country' | `filter-${number}`;

interface FilterSection {
	key: SectionKey;
	label: string;
	collapsible: boolean;
	defaultOpen?: boolean;
}

const DEBOUNCE_TIME = 400;

const props = defineProps<Props>();

const emit = defineEmits<{
	handleClick: [FacetChange];
}>();

const selectedBrands = ref<number[]>([]);
const selectedStores = ref<number[]>([]);
const selectedCountries = ref<number[]>([]);

const minPrice = ref<number | undefined>();
const maxPrice = ref<number | undefined>();

const ignoreBrandDisabled = ref(false);
const ignoreCountriesDisabled = ref(false);
const ignoreStoresDisabled = ref(false);
const ignoreDynDisabledByFilterId = ref<Record<number, boolean>>({});

const visBrandCount = 5;
const visCountryCount = 5;

const debounce = <T extends (...args: any[]) => void>(fn: T, waitMs = 350) => {
	let timer: ReturnType<typeof setTimeout> | undefined;

	return (...args: Parameters<T>) => {
		if (timer) {
			clearTimeout(timer);
		}

		timer = setTimeout(() => {
			fn(...args);
		}, waitMs);
	};
};

const emitDynDebounced = debounce((filterId: number) => {
	emit('handleClick', { kind: 'dyn', filterId, checked: true });
}, DEBOUNCE_TIME);

const emitPriceDebounced = debounce(() => {
	emit('handleClick', { kind: 'price' });
}, DEBOUNCE_TIME);

const shouldDisable = (checked: boolean, disabledFromServer: boolean | undefined): boolean => {
	if (checked) return false;
	if (props.totalCount === 0) return false;
	return Boolean(disabledFromServer);
};

const shouldDisableBrand = (id: number, disabledFromServer: boolean | undefined): boolean => {
	if (ignoreBrandDisabled.value) return false;
	return shouldDisable(selectedBrands.value.includes(id), disabledFromServer);
};

const shouldDisableCountry = (id: number, disabledFromServer: boolean | undefined): boolean => {
	if (ignoreCountriesDisabled.value) return false;
	return shouldDisable(selectedCountries.value.includes(id), disabledFromServer);
};

const shouldDisableStore = (id: number, disabledFromServer: boolean | undefined): boolean => {
	if (ignoreStoresDisabled.value) return false;
	return shouldDisable(selectedStores.value.includes(id), disabledFromServer);
};

const isDynNumberActive = (filterId: number): boolean => {
	const st = filterState[filterId];
	return st != null && (st.min != null || st.max != null);
};

const isDynItemDisabled = (filterId: number, itemDisabledFromProps: boolean | undefined): boolean => {
	if (ignoreDynDisabledByFilterId.value[filterId]) return false;
	return Boolean(itemDisabledFromProps);
};

const getListOptions = (filter: CategoryFilter): CategoryFilterListOption[] => {
	const opts = (filter.options as any)?.values;
	return Array.isArray(opts) ? opts : [];
};

const isSingleDynamicFilter = (filter: CategoryFilter): boolean => {
	if (filter.data_type === 't_bool') {
		return true;
	}

	if (filter.data_type === 't_text') {
		return filter.items.length === 1;
	}

	if (filter.data_type === 't_list') {
		return getListOptions(filter).length === 1;
	}

	return false;
};

const sections = computed<FilterSection[]>(() => {
	const result: FilterSection[] = [];

	if (props.stores.length > 0) {
		result.push({
			key: 'availability',
			label: 'Наличие в магазинах',
			collapsible: props.stores.length > 1,
			defaultOpen: true,
		});
	}

	result.push({
		key: 'price',
		label: 'Цена',
		collapsible: true,
		defaultOpen: true,
	});

	if (props.brands.length > 0) {
		result.push({
			key: 'brand',
			label: 'Бренд',
			collapsible: props.brands.length > 1,
			defaultOpen: true,
		});
	}

	if (props.countries.length > 0) {
		result.push({
			key: 'country',
			label: 'Страна',
			collapsible: props.countries.length > 1,
			defaultOpen: true,
		});
	}

	for (const filter of props.filters) {
		result.push({
			key: `filter-${filter.id}`,
			label: filter.name,
			collapsible: !isSingleDynamicFilter(filter),
			defaultOpen: false,
		});
	}

	return result;
});

const filterState = reactive<Record<number, any>>({});

const createDefaultFilterValue = (filter: CategoryFilter): any => {
	switch (filter.data_type) {
		case 't_text':
		case 't_list':
			return {};
		case 't_bool':
			return false;
		case 't_number':
			return { min: undefined, max: undefined };
		case 't_date':
			return undefined;
	}
};

const ensureListStateShape = (filter: CategoryFilter): void => {
	if (filter.data_type !== 't_list') return;

	const options = getListOptions(filter);

	if (!filterState[filter.id] || typeof filterState[filter.id] !== 'object') {
		filterState[filter.id] = {};
	}

	for (const opt of options) {
		if (filterState[filter.id][opt.id] == null) {
			filterState[filter.id][opt.id] = false;
		}
	}
};

watchEffect(() => {
	props.filters.forEach((filter) => {
		if (!(filter.id in filterState)) {
			filterState[filter.id] = createDefaultFilterValue(filter);
		}

		ensureListStateShape(filter);
	});
});

const getNormalizedPriceSelection = (): { min?: number; max?: number } => {
	const absoluteLo = props.absoluteMinPrice;
	const absoluteHi = props.absoluteMaxPrice;

	let nextMin = minPrice.value;
	let nextMax = maxPrice.value;

	if (nextMin != null && nextMax != null && nextMin > nextMax) {
		[nextMin, nextMax] = [nextMax, nextMin];
	}

	if (nextMin === absoluteLo) {
		nextMin = undefined;
	}

	if (nextMax === absoluteHi) {
		nextMax = undefined;
	}

	return {
		min: nextMin,
		max: nextMax,
	};
};

const clampPriceSelectionToCurrentBounds = (): void => {
	const lo = props.minPrice;
	const hi = props.maxPrice;

	if (minPrice.value != null) {
		minPrice.value = Math.max(lo, Math.min(minPrice.value, hi));
	}

	if (maxPrice.value != null) {
		maxPrice.value = Math.max(lo, Math.min(maxPrice.value, hi));
	}

	if (
		minPrice.value != null &&
		maxPrice.value != null &&
		minPrice.value > maxPrice.value
	) {
		[minPrice.value, maxPrice.value] = [maxPrice.value, minPrice.value];
	}
};

watch(
	() => [props.minPrice, props.maxPrice],
	() => {
		clampPriceSelectionToCurrentBounds();
	},
	{ immediate: true },
);

const updateArraySelection = <T>(arrayRef: Ref<T[]>, item: T, checked: boolean): void => {
	if (checked) {
		if (!arrayRef.value.includes(item)) {
			arrayRef.value = [...arrayRef.value, item];
		}
	} else {
		arrayRef.value = arrayRef.value.filter((existing) => existing !== item);
	}
};

const updateCountrySelection = (newId: number, checked: boolean): void => {
	updateArraySelection(selectedCountries, newId, checked);
	ignoreCountriesDisabled.value = !checked;
};

const updateBrandSelection = (newId: number, checked: boolean): void => {
	updateArraySelection(selectedBrands, newId, checked);
	ignoreBrandDisabled.value = !checked;
};

const updateStoreSelection = (newId: number, checked: boolean): void => {
	updateArraySelection(selectedStores, newId, checked);
	ignoreStoresDisabled.value = !checked;
};

const updateDynSelection = (filterId: number, nextValue: any, checked: boolean): void => {
	filterState[filterId] = nextValue;
	ignoreDynDisabledByFilterId.value[filterId] = !checked;
};

function resetFilters(): void {
	selectedBrands.value = [];
	selectedCountries.value = [];
	selectedStores.value = [];

	minPrice.value = undefined;
	maxPrice.value = undefined;

	ignoreBrandDisabled.value = false;
	ignoreCountriesDisabled.value = false;
	ignoreStoresDisabled.value = false;
	ignoreDynDisabledByFilterId.value = {};

	Object.keys(filterState).forEach((id: string) => {
		const idNum = Number(id.replace('filter-', ''));
		if (Number.isNaN(idNum)) return;

		const filter = props.filters.find((f: CategoryFilter) => f.id === idNum);
		if (!filter) return;

		filterState[idNum] = createDefaultFilterValue(filter);
	});
}

const buildFilterQuery = (): Record<string, any> => {
	const query: Record<string, any> = {};

	if (selectedBrands.value.length) query.brands = selectedBrands.value.join(',');
	if (selectedCountries.value.length) query.countries = selectedCountries.value.join(',');
	if (selectedStores.value.length) query.stores = selectedStores.value.join(',');

	const price = getNormalizedPriceSelection();

	if (price.min != null) query.min_price = price.min;
	if (price.max != null) query.max_price = price.max;

	for (const [filterIdStr, state] of Object.entries(filterState)) {
		const filterId = Number(filterIdStr);
		if (Number.isNaN(filterId) || state == null) continue;

		const filter = props.filters.find((f) => f.id === filterId);
		if (!filter) continue;

		if (filter.data_type === 't_text') {
			const hashes = Object.keys(state).filter((k) => Boolean(state[k]));
			if (hashes.length) query[`filters_hash[${filterId}]`] = hashes.join(',');
			continue;
		}

		if (filter.data_type === 't_list') {
			const presentType = (filter.options as any)?.present_type;

			if (presentType === 'is_checkbox') {
				const ids = Object.keys(state)
					.filter((k) => Boolean(state[k]))
					.map((k) => Number(k))
					.filter((n) => !Number.isNaN(n));

				if (ids.length) query[`filters_list[${filterId}]`] = ids.join(',');
				continue;
			}

			if (presentType === 'is_radio') {
				const hashes = Object.keys(state).filter((k) => Boolean(state[k]));
				if (hashes.length) query[`filters_hash[${filterId}]`] = hashes.join(',');
				continue;
			}
		}

		if (filter.data_type === 't_number') {
			if (state.min != null) query[`filters_num[${filterId}][min]`] = state.min;
			if (state.max != null) query[`filters_num[${filterId}][max]`] = state.max;
			continue;
		}

		if (filter.data_type === 't_bool') {
			if (state === true) query[`filters_bool[${filterId}]`] = '1';
			continue;
		}

		if (filter.data_type === 't_date') {
			if (typeof state === 'string' && state.length) query[`filters_date[${filterId}]`] = state;
		}
	}

	return query;
};

function initFromQuery(query: LocationQuery): void {
	resetFilters();

	if (query.brands) {
		selectedBrands.value = String(query.brands)
			.split(',')
			.map(Number)
			.filter(Boolean);
	}

	if (query.stores) {
		selectedStores.value = String(query.stores)
			.split(',')
			.map(Number)
			.filter(Boolean);
	}

	if (query.countries) {
		selectedCountries.value = String(query.countries)
			.split(',')
			.map(Number)
			.filter(Boolean);
	}

	if (query.min_price != null) {
		const val = Number(query.min_price);
		if (!Number.isNaN(val)) minPrice.value = val;
	}

	if (query.max_price != null) {
		const val = Number(query.max_price);
		if (!Number.isNaN(val)) maxPrice.value = val;
	}

	Object.entries(query).forEach(([key, rawValue]) => {
		if (!key.startsWith('filters[')) return;
		if (rawValue == null) return;

		const simpleMatch = key.match(/^filters\[(\d+)]$/);
		const rangeMatch = key.match(/^filters\[(\d+)]\[(min|max)]$/);

		if (simpleMatch) {
			const filterId = Number(simpleMatch[1]);
			if (!(filterId in filterState)) return;

			const filter = props.filters.find((f) => f.id === filterId);
			if (!filter) return;

			if (filter.data_type === 't_bool') {
				filterState[filterId] = rawValue === 'true' || rawValue === '1';
				return;
			}

			const values = String(rawValue).split(',');
			const state: Record<string, boolean> = {};

			values.forEach((v) => {
				if (v) state[v] = true;
			});

			filterState[filterId] = state;
		} else if (rangeMatch) {
			const filterId = Number(rangeMatch[1]);
			const bound = rangeMatch[2] as 'min' | 'max';

			if (!(filterId in filterState)) return;

			const num = Number(rawValue);
			if (Number.isNaN(num)) return;

			if (!filterState[filterId]) {
				filterState[filterId] = { min: undefined, max: undefined };
			}

			filterState[filterId][bound] = num;
		}
	});
}

const brandItems = computed(() => {
	return props.brands.map((br) => ({
		id: br.id,
		label: br.name,
		disabled: shouldDisableBrand(br.id, br.disabled),
	}));
});

const countryItems = computed(() => {
	return props.countries.map((c) => ({
		id: c.id,
		label: c.name,
		disabled: shouldDisableCountry(c.id, c.disabled),
	}));
});

const storeItems = computed(() => {
	return props.stores.map((st) => ({
		id: st.id,
		label: st.address,
		disabled: shouldDisableStore(st.id, st.disabled),
	}));
});

const getDynamicFilterForRender = (filter: CategoryFilter): CategoryFilter => {
	if (filter.data_type === 't_text') {
		return {
			...filter,
			items: filter.items.map((item) => ({
				...item,
				disabled: shouldDisable(
					Boolean(filterState[filter.id]?.[item.hash]),
					isDynItemDisabled(filter.id, item.disabled),
				),
			})),
		};
	}

	if (filter.data_type === 't_list' && (filter.options as any)?.present_type === 'is_checkbox') {
		const values = getListOptions(filter).map((opt) => ({
			...opt,
			disabled: shouldDisable(
				Boolean(filterState[filter.id]?.[opt.id]),
				isDynItemDisabled(filter.id, filter.disabled),
			),
		}));

		return {
			...filter,
			options: {
				...(filter.options as any),
				values,
			},
		};
	}

	if (filter.data_type === 't_bool') {
		return {
			...filter,
			disabled: shouldDisable(Boolean(filterState[filter.id]), filter.disabled),
		};
	}

	if (filter.data_type === 't_number') {
		return {
			...filter,
			disabled: shouldDisable(isDynNumberActive(filter.id), filter.disabled),
		};
	}

	return filter;
};

const shouldHidePlainSectionLabel = (section: FilterSection): boolean => {
	if (section.key === 'brand' && props.brands.length === 1) return true;
	if (section.key === 'country' && props.countries.length === 1) return true;
	if (section.key === 'availability' && props.stores.length === 1) return true;

	if (typeof section.key === 'string' && section.key.startsWith('filter-')) {
		const filterId = Number(section.key.replace('filter-', ''));
		const filter = props.filters.find((item) => item.id === filterId);

		if (!filter) return false;

		return isSingleDynamicFilter(filter);
	}

	return false;
};

defineExpose({
	resetFilters,
	buildFilterQuery,
	initFromQuery,
});
</script>

<template>
	<div :class="props.class" class="grid gap-6">
		<CatalogFilterSection
			v-for="section in sections"
			:key="section.key"
			:label="section.label"
			:collapsible="section.collapsible"
			:default-open="section.defaultOpen"
			:hide-plain-label="shouldHidePlainSectionLabel(section)"
		>
			<template v-if="section.key === 'availability'">
				<div class="custom-scrollbar mt-4 lg:overflow-auto lg:max-h-[244px] flex flex-wrap lg:grid lg:grid-cols-1 gap-4">
					<label
						v-for="item in storeItems"
						:key="item.id"
						:class="item.disabled ? 'opacity-40 pointer-events-none' : ''"
						class="flex gap-2 items-center cursor-pointer"
					>
						<UCheckbox
							size="xl"
							:model-value="selectedStores.includes(item.id as number)"
							:disabled="Boolean(item.disabled)"
							@update:model-value="
								updateStoreSelection(item.id as number, $event as boolean);
								emit('handleClick', { kind: 'store', id: item.id as number, checked: $event as boolean });
							"
						/>
						<span class="text-sm leading-5 text-gray-950">
							{{ item.label }}
						</span>
					</label>
				</div>
			</template>

			<template v-else-if="section.key === 'price'">
				<CatalogFilterPrice
					:model-min="minPrice"
					:model-max="maxPrice"
					:current-min="props.minPrice"
					:current-max="props.maxPrice"
					:absolute-min="props.absoluteMinPrice"
					:absolute-max="props.absoluteMaxPrice"
					:disabled="props.absoluteMinPrice === props.absoluteMaxPrice"
					@update:model-min="minPrice = $event"
					@update:model-max="maxPrice = $event"
					@change="emitPriceDebounced"
				/>
			</template>

			<template v-else-if="section.key === 'brand'">
				<CatalogFilterCheckboxList
					:items="brandItems"
					:model-value="selectedBrands"
					:limit="visBrandCount"
					:hidden-by-default="true"
					:single-label-prefix="props.brands.length === 1 ? 'Бренд' : ''"
					@toggle="(payload) => {
						updateBrandSelection(payload.id as number, payload.checked);
						emit('handleClick', { kind: 'brand', id: payload.id as number, checked: payload.checked });
					}"
				/>
			</template>

			<template v-else-if="section.key === 'country'">
				<CatalogFilterCheckboxList
					:items="countryItems"
					:model-value="selectedCountries"
					:limit="visCountryCount"
					:hidden-by-default="true"
					:lowercase-first-letter="true"
					:single-label-prefix="props.countries.length === 1 ? 'Страна' : ''"
					@toggle="(payload) => {
						updateCountrySelection(payload.id as number, payload.checked);
						emit('handleClick', { kind: 'country', id: payload.id as number, checked: payload.checked });
					}"
				/>
			</template>

			<template v-else>
				<template v-for="filter in props.filters" :key="filter.id">
					<CatalogFilterDynamic
						v-if="section.key === `filter-${filter.id}`"
						:filter="getDynamicFilterForRender(filter)"
						:model-value="filterState[filter.id]"
						:inline-single-label="isSingleDynamicFilter(filter)"
						@update:model-value="(nextValue) => {
							filterState[filter.id] = nextValue;
						}"
						@change="(checked) => {
							updateDynSelection(filter.id, filterState[filter.id], checked);

							if (filter.data_type === 't_number') {
								emitDynDebounced(filter.id);
							} else {
								emit('handleClick', { kind: 'dyn', filterId: filter.id, checked });
							}
						}"
					/>
				</template>
			</template>
		</CatalogFilterSection>
	</div>
</template>

<style scoped>
.custom-scrollbar {
	scrollbar-width: thin;
	scrollbar-color: #0C8F61 #D5D7DA;
}

.custom-scrollbar::-webkit-scrollbar {
	width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
	background: #D5D7DA;
	border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
	background: #0C8F61;
	border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
	background: #0C8F61;
}
</style>


