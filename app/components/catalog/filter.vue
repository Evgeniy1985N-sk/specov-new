<script setup lang="ts">
import type { LocationQuery } from 'vue-router'

import type { AccordionItem } from '@nuxt/ui'
import type {
	CategoryFilter,
	CategoryFilterListOption,
} from "@/types/categoryFilter";

import type {
	BrandFilter,
	CountryFilter,
	StoreFilter
} from "@/types/productCat";

interface Props {
	class?: string
	filters: CategoryFilter[];
	brands: BrandFilter[];
	countries: CountryFilter[];
	stores: StoreFilter[];
	minPrice: number; // current facet bounds
	maxPrice: number; // current facet bounds
	absoluteMinPrice: number; // original category bounds
	absoluteMaxPrice: number; // original category bounds
	totalCount: number;
}

const DEBOUNCE_TIME = 400;

const props = defineProps<Props>()

const selectedBrands = ref<number[]>([]);
const isBrandHidden = ref(true);
const visBrandCount = 5;

const selectedStores = ref<number[]>([]);

const selectedCountries = ref<number[]>([]);
const isCountryHidden = ref(true);
const visCountryCount = 5;

const minPrice = ref<number | undefined>();
const maxPrice = ref<number | undefined>();

//if flag is set always enabled
const ignoreBrandDisabled = ref(false);
const ignoreCountriesDisabled = ref(false);
const ignoreStoresDisabled = ref(false);
const ignoreDynDisabledByFilterId = ref<Record<number, boolean>>({});
/*
watch(
	() => props.brands,
	() => {
		ignoreBrandDisabled.value = false;
		ignoreCountriesDisabled.value = false;
		ignoreStoresDisabled.value = false;
		ignoreDynDisabledByFilterId.value = <Record<number, boolean>>{};
	},
	{ deep: true, immediate: true }
);
*/

const shouldDisable = (checked: boolean, disabledFromServer: boolean | undefined): boolean => {
	if (checked) return false;
	if (props.totalCount === 0) return false;
	return Boolean(disabledFromServer);
};

const isDynNumberActive = (filterId: number): boolean => {
	const st = filterState[filterId];
	return st != null && (st.min != null || st.max != null);
};
const isDynItemDisabled = (filterId: number, itemDisabledFromProps: boolean): boolean => {
	if (ignoreDynDisabledByFilterId.value[filterId]) return false;
	return itemDisabledFromProps;
}

const items = computed<AccordionItem[]>(() => {
	const items: AccordionItem[] = [];

	if (props.stores.length > 0) {
		items.push({
			label: 'Наличие в магазинах',
			slot: 'availability',
		})
	}

	//if (props.minPrice !== props.maxPrice) {
	items.push({
		label: 'Цена',
		slot: 'price',
	});
	//}

	if (props.brands.length > 0) {
		items.push({
			label: 'Бренд',
			slot: 'brand',
		})
	}

	if (props.countries.length > 0) {
		items.push({
			label: 'Страна',
			slot: 'country',
		})
	}

	// Dynamic filters
	props.filters.forEach(filter => {
		items.push({
			label: filter.name,
			slot: `filter-${filter.id}`,
		})
	})

	return items
});

/*
const emit = defineEmits<{
	handleClick: [{ id: string }]
}>();

const emitStatic = (id: string) => {
	emit('handleClick', { id });
};
*/

type FacetKind = 'brand' | 'country' | 'store' | 'dyn' | 'price';

type FacetChange =
	| { kind: 'brand'; checked: boolean; id: number }
	| { kind: 'country'; checked: boolean; id: number }
	| { kind: 'store'; checked: boolean; id: number }
	| { kind: 'dyn'; checked: boolean; filterId: number }
	| { kind: 'price' };

const emit = defineEmits<{
	handleClick: [FacetChange];
}>();

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

const emitDyn = (filterId: number, checked: boolean) => {
	emit('handleClick', { kind: 'dyn', filterId, checked });
};

const emitDynDebounced = debounce((filterId: number) => {
	emit('handleClick', { kind: 'dyn', filterId, checked: true });
}, DEBOUNCE_TIME);

const emitPriceDebounced = debounce(() => {
	emit('handleClick', { kind: 'price' });
}, DEBOUNCE_TIME);

const formatPrice = (price?: number): string =>
	price !== undefined ? String(price).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : '';

const formattedMinPrice = computed({
	get() {
		// Только если значение реально задано — форматируем
		return formatPrice(minPrice.value);
	},
	set(val: string) {
		const clean = val.replace(/\D/g, '')
		// Если строка пустая — ставим undefined, иначе число
		minPrice.value = clean ? Number(clean) : undefined
	}
})

const formattedMaxPrice = computed({
	get() {
		return formatPrice(maxPrice.value);
	},
	set(val: string) {
		const clean = val.replace(/\D/g, '')
		maxPrice.value = clean ? Number(clean) : undefined
	}
});
const formatDynNumVal = (val?: number): string => {
	return val !== undefined ? val.toString() : "";
}

//list options
const getListOptions = (filter: CategoryFilter): CategoryFilterListOption[] => {
	const opts = (filter.options as any)?.values;
	return Array.isArray(opts) ? opts : [];
};

//price bunds
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
		//syncPriceSelectionToBounds();
		clampPriceSelectionToCurrentBounds();
	},
	{ immediate: true },
);

const ensureListStateShape = (filter: CategoryFilter) => {
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
// type FilterValue =
// 	| Record<string, boolean> // t_text, t_list
// 	| boolean                 // t_bool
// 	| { min?: number; max?: number } // t_number
// 	| string | undefined      // t_date
const filterState = reactive<Record<number, any>>({}); //key is the filter ID

function createDefaultFilterValue(filter: CategoryFilter): any {
	switch (filter.data_type) {
		case 't_text':
		case 't_list':
			return {}
		case 't_bool':
			return false
		case 't_number':
			return { min: undefined, max: undefined }
		case 't_date':
			return undefined
	}
}

watchEffect(() => {
	props.filters.forEach(filter => {
		if (!(filter.id in filterState)) {
			filterState[filter.id] = createDefaultFilterValue(filter);
		}
		ensureListStateShape(filter);
	})
});

function resetFilters() {
	// Checkboxes
	selectedBrands.value = [];
	selectedCountries.value = [];
	selectedStores.value = [];

	// Price
	minPrice.value = undefined
	maxPrice.value = undefined

	// Show/hide
	isBrandHidden.value = true
	isCountryHidden.value = true

	ignoreBrandDisabled.value = false;
	ignoreCountriesDisabled.value = false;
	ignoreStoresDisabled.value = false;
	ignoreDynDisabledByFilterId.value = {};

	// Dynamic filters
	Object.keys(filterState).forEach((id: string) => {
		const idNum = Number(id.replace('filter-', ''))
		if (Number.isNaN(idNum)) return

		const filter = props.filters.find(
			(f: CategoryFilter) => f.id === idNum
		);
		if (!filter) return;

		filterState[idNum] = createDefaultFilterValue(filter);
	})
}

const buildFilterQuery = (): Record<string, any> => {
	const query: Record<string, any> = {};

	// Static
	if (selectedBrands.value.length) query.brands = selectedBrands.value.join(',');
	if (selectedCountries.value.length) query.countries = selectedCountries.value.join(',');
	if (selectedStores.value.length) query.stores = selectedStores.value.join(',');

	const price = getNormalizedPriceSelection();

	if (price.min != null) query.min_price = price.min;
	if (price.max != null) query.max_price = price.max;

	// Dynamic typed
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

			// checkbox -> option ids
			if (presentType === 'is_checkbox') {
				const ids = Object.keys(state)
					.filter((k) => Boolean(state[k]))
					.map((k) => Number(k))
					.filter((n) => !Number.isNaN(n));

				if (ids.length) query[`filters_list[${filterId}]`] = ids.join(',');
				continue;
			}

			// radio -> you said you can use hashes (store in state as { [hash]: true } or a single hash string)
			// If your radio UI stores hashes in an object:
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

		//not used
		if (filter.data_type === 't_date') {
			if (typeof state === 'string' && state.length) query[`filters_date[${filterId}]`] = state;
			continue;
		}
	}

	return query;
};

const updateCountrySelection = (newId: number, checked: boolean) => {
	updateArraySelection(selectedCountries, newId, checked);
	ignoreCountriesDisabled.value = !checked ? true : false;
};

const updateBrandSelection = (newId: number, checked: boolean) => {
	updateArraySelection(selectedBrands, newId, checked);
	ignoreBrandDisabled.value = !checked ? true : false;
};
const updateStoreSelection = (newId: number, checked: boolean) => {
	updateArraySelection(selectedStores, newId, checked);
	ignoreStoresDisabled.value = !checked ? true : false;
};

// const updateDynFilterSelection = (id: number, hash: string) => {
// 	filterState[id][hash]
// 	ignoreDynDisabledByFilterId.value[id] = checked;
// };
function updateDynSelection(filterId: number, hash: string, checked: boolean) {
	if (!filterState[filterId] || typeof filterState[filterId] !== 'object') {
		filterState[filterId] = {};
	}

	filterState[filterId][hash] = checked;

	ignoreDynDisabledByFilterId.value[filterId] = !checked ? true : false;
}

function updateArraySelection<T>(
	arrayRef: Ref<T[]>,
	item: T,
	checked: boolean
) {
	if (checked) {
		if (!arrayRef.value.includes(item)) {
			arrayRef.value = [...arrayRef.value, item]
		}
	} else {
		arrayRef.value = arrayRef.value.filter(existing => existing !== item)
	}
}

function initFromQuery(query: LocationQuery) {
	resetFilters()

	//static filters: comma separated IDs: brands:1,2,3
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

	// Dynamic filters: filters[ID], filters[ID][min], filters[ID][max]
	Object.entries(query).forEach(([key, rawValue]) => {
		if (!key.startsWith('filters[')) return;
		if (rawValue == null) return;

		// filters[33]
		const simpleMatch = key.match(/^filters\[(\d+)]$/);

		// filters[33][min] / filters[33][max]
		const rangeMatch = key.match(/^filters\[(\d+)]\[(min|max)]$/);

		// Boolean / checkbox / list
		if (simpleMatch) {
			const filterId = Number(simpleMatch[1])
			if (!(filterId in filterState)) return

			const filter = props.filters.find(f => f.id === filterId)
			if (!filter) return

			// Boolean filter
			if (filter.data_type === 't_bool') {
				filterState[filterId] = rawValue === 'true' || rawValue === '1'
				return
			}

			// Checkbox / list
			const values = String(rawValue).split(',')
			const state: Record<string, boolean> = {}

			values.forEach(v => {
				if (v) state[v] = true
			})

			filterState[filterId] = state
		}

		// Number range
		else if (rangeMatch) {
			const filterId = Number(rangeMatch[1])
			const bound = rangeMatch[2] as 'min' | 'max'

			if (!(filterId in filterState)) return

			const num = Number(rawValue)
			if (Number.isNaN(num)) return

			if (!filterState[filterId]) {
				filterState[filterId] = { min: undefined, max: undefined }
			}

			filterState[filterId][bound] = num
		}
	})
}

defineExpose({
	resetFilters,
	buildFilterQuery,
	initFromQuery,
});

</script>

<template>
	<UAccordion :class="props.class" :items="items" type="multiple" :default-value="['0', '1', '2']"
		:ui="{ root: 'lg:grid lg:gap-6', trigger: 'lg:p-0' }">

		<template #availability="{ item }">

			<div class="custom-scrollbar lg:overflow-auto lg:max-h-[244px] flex flex-wrap lg:grid lg:grid-cols-1 gap-4">
				<label v-for="st in stores" :key="st.id"
					:class="shouldDisable(selectedStores.includes(st.id), st.disabled) ? 'opacity-40 pointer-events-none' : ''">

					<UCheckbox size="xl" :model-value="selectedStores.includes(st.id)"
						:disabled="shouldDisable(selectedStores.includes(st.id), st.disabled)" @update:model-value="
							updateStoreSelection(st.id, $event as boolean);
						emit('handleClick', { kind: 'store', id: st.id, checked: $event as boolean });
						" />
					<span class="text-sm leading-5 text-gray-950">
						{{ st.address }}
					</span>
				</label>
			</div>

			<button class="mt-4 text-xs font-medium text-(--Brand-700) cursor-pointer">
				Показать еще
			</button>

		</template>

		<template #price="{ item }">

			<div class="flex gap-2">

				<UInput color="neutral" v-model="formattedMinPrice" :disabled="props.minPrice === props.maxPrice"
					:placeholder="`от ${formatPrice(props.absoluteMinPrice)}`"
					:ui="{ base: 'font-medium text-gray-950 ring-gray-900', trailing: 'pe-1' }"
					@update:model-value="() => { emitPriceDebounced(); }">
					<template v-if="formattedMinPrice?.length" #trailing>
						<UButton color="neutral" variant="link" size="sm" icon="i-lucide-x" aria-label="Clear input"
							class="text-gray-500 hover:text-gray-600" 
							@click="() => { formattedMinPrice = ''; emitPriceDebounced(); }"
							/>
					</template>
				</UInput>

				<UInput color="neutral" v-model="formattedMaxPrice" :disabled="props.minPrice === props.maxPrice"
					:placeholder="`до ${formatPrice(props.absoluteMaxPrice)}`"
					:ui="{ base: 'font-medium text-gray-950', trailing: 'pe-1' }"
					@update:model-value="() => { emitPriceDebounced(); }">
					<template v-if="formattedMaxPrice?.length" #trailing>
						<UButton color="neutral" variant="link" size="sm" icon="i-lucide-x" aria-label="Clear input"
							class="text-gray-500 hover:text-gray-600" 
							@click="() => { formattedMaxPrice = ''; emitPriceDebounced(); }"
							/>
					</template>
				</UInput>

			</div>

			<CatalogInputRange 
				:disabled="props.absoluteMinPrice === props.absoluteMaxPrice"
				:min-range="props.absoluteMinPrice"
				:max-range="props.absoluteMaxPrice"
				v-model:min-value="minPrice"
				v-model:max-value="maxPrice"
				@change="() => { emitPriceDebounced(); }"
			/>

		</template>

		<template #brand="{ item }" v-if="props.brands?.length">

			<div class="grid gap-4">
				<label v-for="(br, ind) in props.brands" :key="br.id"
					:class="(ind < visBrandCount || isBrandHidden === false) ? 'flex' : 'hidden'"
					class="gap-2 items-center cursor-pointer">
					<UCheckbox size="xl" :model-value="selectedBrands.includes(br.id)"
						:disabled="shouldDisable(selectedBrands.includes(br.id), br.disabled)" @update:model-value="
							updateBrandSelection(br.id, $event as boolean);
						emit('handleClick', { kind: 'brand', id: br.id, checked: $event as boolean });
						" />
					<span class="text-sm leading-5 text-gray-950">
						{{ br.name }}
					</span>
				</label>
			</div>

			<button @click="isBrandHidden = !isBrandHidden" v-if="props.brands.length > visCountryCount"
				class="mt-3 text-[12px] leading-[18px] font-medium text-(--Brand-700)">
				{{ isBrandHidden ? 'Показать еще' : 'Скрыть' }}
			</button>

		</template>

		<template #country="{ item }" v-if="props.countries?.length">

			<div class="grid gap-4">
				<label v-for="(c, ind) in props.countries" :key="c.id"
					:class="(ind < visCountryCount || isCountryHidden === false) ? 'flex' : 'hidden'"
					class="gap-2 items-center cursor-pointer">
					<UCheckbox size="xl" :model-value="selectedCountries.includes(c.id)"
						:disabled="shouldDisable(selectedCountries.includes(c.id), c.disabled)" @update:model-value="
							updateCountrySelection(c.id, $event as boolean);
						emit('handleClick', { kind: 'country', id: c.id, checked: $event as boolean });
						" />
					<span class="text-sm leading-5 text-gray-950 lowercase first-letter:capitalize">
						{{ c.name }}
					</span>
				</label>
			</div>

			<button @click="isCountryHidden = !isCountryHidden" v-if="props.countries.length > visCountryCount"
				class="mt-3 text-[12px] leading-[18px] font-medium text-(--Brand-700)">
				{{ isCountryHidden ? 'Показать еще' : 'Скрыть' }}
			</button>
		</template>

		<!-- Dynamic filters -->
		<template v-for="filter in props.filters" :key="filter.id" #[`filter-${filter.id}`]>
			<div class="grid gap-4">

				<!-- TEXT / LIST → CHECKBOXES -->
				<template v-if="filter.data_type === 't_text'">
					<label v-for="item in filter.items" :key="item.hash" class="flex gap-2 items-center cursor-pointer">
						<UCheckbox size="xl" :model-value="filterState[filter.id][item.hash]"
							:disabled="shouldDisable(Boolean(filterState[filter.id]?.[item.hash]), item.disabled)"
							@update:model-value="
								updateDynSelection(filter.id, item.hash, $event as boolean);
							emit('handleClick', { kind: 'dyn', filterId: filter.id, checked: $event as boolean });
							" />
						<span class="text-sm leading-5 text-gray-950 lowercase first-letter:capitalize">
							{{ item.value }}
						</span>
					</label>
				</template>

				<template v-else-if="filter.data_type === 't_list' && (filter.options as any)?.present_type === 'is_checkbox'">
					<label v-for="opt in ((filter.options as any)?.values || [])" :key="opt.id"
						class="flex gap-2 items-center cursor-pointer">
						<UCheckbox size="xl" :model-value="Boolean(filterState[filter.id]?.[opt.id])"
							:disabled="shouldDisable(Boolean(filterState[filter.id]?.[opt.id]), filter.disabled)" @update:model-value="(v) => {
								const checked = v as boolean;
								filterState[filter.id][opt.id] = checked;
								emitDyn(filter.id, checked);
							}" />
						<span class="text-sm leading-5 text-gray-950 lowercase first-letter:capitalize">
							{{ opt.val }}
						</span>
					</label>
				</template>

				<!-- BOOLEAN -->
				<template v-else-if="filter.data_type === 't_bool'">
					<UCheckbox size="xl" :model-value="Boolean(filterState[filter.id])" :label="filter.name"
						:disabled="shouldDisable(Boolean(filterState[filter.id]), filter.disabled)" @update:model-value="(v) => {
							const checked = v as boolean;
							filterState[filter.id] = checked;
							emitDyn(filter.id, checked);
						}" />
				</template>

				<!-- NUMBER -->
				<template v-else-if="filter.data_type === 't_number'">
					<div class="flex gap-2">
						<UInput v-model="filterState[filter.id].min" type="number"
							:placeholder="`От ${formatDynNumVal(filter.items[0]?.min)}`"
							:disabled="shouldDisable(isDynNumberActive(filter.id), filter.disabled)"
							@input="emitDynDebounced(filter.id)" />
						<UInput v-model="filterState[filter.id].max" type="number"
							:placeholder="`До ${formatDynNumVal(filter.items[0]?.max)}`"
							:disabled="shouldDisable(isDynNumberActive(filter.id), filter.disabled)"
							@input="emitDynDebounced(filter.id)" />
					</div>

					<!--
					<CatalogInputRange :max-range="filter.items[0]?.min" v-model:min-value="filter.items[0]?.min" v-model:max-value="filter.items[0]?.max" />
						-->
				</template>

				<!-- DATE -->
				<template v-else-if="filter.data_type === 't_date'">
					<UInput :model-value="filterState[filter.id]" type="date" :disabled="filter.disabled" @update:model-value="(v) => {
						filterState[filter.id] = v as string;
						emit('handleClick', { kind: 'dyn', filterId: filter.id, checked: true });
					}" />
				</template>

			</div>
		</template>

	</UAccordion>
</template>

<style scoped>
@media (min-width: 1024px) {
	:deep(div[data-slot="content"])>div {
		gap: 12px;
		padding-top: 16px;
	}
}

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
