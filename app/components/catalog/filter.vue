<script setup lang="ts">
import type { LocationQuery } from 'vue-router'

import type { AccordionItem } from '@nuxt/ui'
import { type CategoryFilter } from "@/types/categoryFilter";

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
	minPrice: number;
	maxPrice: number;
}

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

	//always present
	items.push({
		label: 'Цена',
		slot: 'price',
	});

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

const emit = defineEmits<{
	handleClick: [{ id: string }]
}>();

const emitStatic = (id: string) => {
	emit('handleClick', { id });
};

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

const emitDyn = (filterId: number) => {
	emit('handleClick', { id: `dyn-${filterId.toString()}` });
};

const emitDynDebounced = debounce(emitDyn, 400);

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

function buildFilterQuery() {
	const query: Record<string, any> = {}

	// Static filters
	if (selectedBrands.value.length) {
		query.brands = selectedBrands.value.join(',')
	}

	if (selectedCountries.value.length) {
		query.countries = selectedCountries.value.join(',')
	}

	if (selectedStores.value.length) {
		query.stores = selectedStores.value.join(',')
	}

	if (minPrice.value != null) query.min_price = minPrice.value
	if (maxPrice.value != null) query.max_price = maxPrice.value

	// Dynamic filters
	Object.entries(filterState).forEach(([filterId, value]) => {
		if (value == null) return

		// checkbox list
		if (
			typeof value === 'boolean'
			|| (typeof value === 'object' && !('min' in value))
		) {
			const hashes = Object.keys(value).filter(k => value[k])
			if (hashes.length) {
				query[`filters[${filterId}]`] = hashes.join(',')
			}
		}

		// number range
		else if (typeof value === 'object' && 'min' in value) {
			if (value.min != null) {
				query[`filters[${filterId}][min]`] = value.min
			}
			if (value.max != null) {
				query[`filters[${filterId}][max]`] = value.max
			}
		}

		// boolean
		else if (typeof value === 'boolean') {
			query[`filters[${filterId}]`] = value
		}

		// date
		// else if (typeof value === 'string') {
		// 	query[`filters[${filterId}]`] = value
		// }
	});

	return query;
}

const updateCountrySelection = (newId: number, checked: boolean) => {
	updateArraySelection(selectedCountries, newId, checked);
	if (!checked) ignoreCountriesDisabled.value = true;
};

const updateBrandSelection = (newId: number, checked: boolean) => {
	updateArraySelection(selectedBrands, newId, checked);
	if (!checked) ignoreBrandDisabled.value = true;
};
const updateStoreSelection = (newId: number, checked: boolean) => {
	updateArraySelection(selectedStores, newId, checked);
	if (!checked) ignoreStoresDisabled.value = true;
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

	if (!checked) {
		ignoreDynDisabledByFilterId.value[filterId] = true;
	}
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
	<UAccordion :class="props.class" :items="items" type="multiple" :default-value="['0', '1', '2']">

		<template #availability="{ item }">

			<div @click="emitStatic('store')" class="custom-scrollbar lg:overflow-auto lg:max-h-[244px] flex flex-wrap lg:grid lg:grid-cols-1 gap-4">
				<label v-for="st in stores" :key="st.id" :class="true ? 'opacity-40 pointer-events-none' : '' " class="flex gap-2 items-center cursor-pointer">
					<UCheckbox size="xl" :model-value="selectedStores.includes(st.id)"
						:disabled="(ignoreStoresDisabled === true) ? false : st.disabled"
						@update:model-value="updateStoreSelection(st.id, $event as boolean)" />
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

			<div @click="emitStatic('price')" class="flex gap-2">

				<UInput color="neutral" v-model="formattedMinPrice" :placeholder="`от ${formatPrice(props.minPrice)}`"
					:ui="{ base: 'font-medium text-gray-950 ring-gray-900', trailing: 'pe-1' }">
					<template v-if="formattedMinPrice?.length" #trailing>
						<UButton color="neutral" variant="link" size="sm" icon="i-lucide-x" aria-label="Clear input"
							class="text-gray-500 hover:text-gray-600" @click="formattedMinPrice = ''" />
					</template>
				</UInput>

				<UInput color="neutral" v-model="formattedMaxPrice" :placeholder="`до ${formatPrice(props.maxPrice)}`"
					:ui="{ base: 'font-medium text-gray-950', trailing: 'pe-1' }">
					<template v-if="formattedMaxPrice?.length" #trailing>
						<UButton color="neutral" variant="link" size="sm" icon="i-lucide-x" aria-label="Clear input"
							class="text-gray-500 hover:text-gray-600" @click="formattedMaxPrice = ''" />
					</template>
				</UInput>

			</div>

			<CatalogInputRange :max-range="props.maxPrice" v-model:min-value="minPrice" v-model:max-value="maxPrice" />

		</template>

		<template #brand="{ item }" v-if="props.brands?.length">

			<div @click="emitStatic('brand')" class="grid gap-4">
				<label v-for="(br, ind) in props.brands" :key="br.id"
					:class="(ind < visBrandCount || isBrandHidden === false) ? 'flex' : 'hidden'"
					class="gap-2 items-center cursor-pointer">
					<UCheckbox size="xl" :model-value="selectedBrands.includes(br.id)"
						:disabled="(ignoreBrandDisabled === true) ? false : br.disabled"
						@update:model-value="updateBrandSelection(br.id, $event as boolean)" />
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

			<div @click="emitStatic('country')" class="grid gap-4">
				<label v-for="(c, ind) in props.countries" :key="c.id"
					:class="(ind < visCountryCount || isCountryHidden === false) ? 'flex' : 'hidden'"
					class="gap-2 items-center cursor-pointer">
					<UCheckbox size="xl" :model-value="selectedCountries.includes(c.id)"
						:disabled="(ignoreCountriesDisabled === true) ? false : c.disabled"
						@update:model-value="updateCountrySelection(c.id, $event as boolean)" />
					<span class="text-sm leading-5 text-gray-950">
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
			<div @click="emitDyn(filter.id)" class="grid gap-4">

				<!-- TEXT / LIST → CHECKBOXES -->
				<template v-if="filter.data_type === 't_text' || filter.data_type === 't_list'">
					<label v-for="item in filter.items" :key="item.hash" class="flex gap-2 items-center cursor-pointer">
						<UCheckbox size="xl" :model-value="filterState[filter.id][item.hash]"
							:disabled="isDynItemDisabled(filter.id, item.disabled)"
							@update:model-value="updateDynSelection(filter.id, item.hash, $event as boolean)" />
						<span class="text-sm leading-5 text-gray-950">
							{{ item.value }}
						</span>
					</label>
				</template>

				<!-- BOOLEAN -->
				<template v-else-if="filter.data_type === 't_bool'">
					<UCheckbox size="xl" v-model="filterState[filter.id]" :label="filter.name" :disabled="filter.disabled" />
				</template>

				<!-- NUMBER -->
				<template v-else-if="filter.data_type === 't_number'">
					<div class="flex gap-2">
						<UInput v-model="filterState[filter.id].min" type="number"
							:placeholder="`От ${formatDynNumVal(filter.items[0]?.min)}`" :disabled="filter.disabled"
							@input="emitDynDebounced(filter.id)" />
						<UInput v-model="filterState[filter.id].max" type="number"
							:placeholder="`До ${formatDynNumVal(filter.items[0]?.max)}`" :disabled="filter.disabled"
							@input="emitDynDebounced(filter.id)" />
					</div>
				</template>

				<!-- DATE -->
				<template v-else-if="filter.data_type === 't_date'">
					<UInput v-model="filterState[filter.id]" type="date" :disabled="filter.disabled" />
				</template>

			</div>
		</template>

	</UAccordion>
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
