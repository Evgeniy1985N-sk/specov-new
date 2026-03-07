<script setup lang="ts">
import { computed } from "vue";
import type { AccordionItem } from "@nuxt/ui";
import type { CompareGroup } from "~/types/productCompare";

const items = [
	{
		label: "Наличие и способы получения",
		slot: "avail" as const,
	},
	{
		label: "Бренд и страна производства",
		slot: "brand" as const,
	},
	{
		label: "Оценки пользователей",
		slot: "rating" as const,
	},
	{
		label: "Общие характеристики",
		slot: "filters" as const,
	},
] satisfies AccordionItem[];

type CompareProduct = CompareGroup["items"][number];

type CompareRow = {
	key: string;
	label: string;
	values: string[];
	isDifferent: boolean;
};

interface Props {
	class?: string;
	group: CompareGroup | undefined;
	showDifferences?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	showDifferences: false,
	class: undefined,
});

const products = computed<CompareProduct[]>(() => {
	return props.group?.items ?? [];
});

const normalizeCompareValue = (value: string): string => {
	return value.trim().replace(/\s+/g, " ").toLowerCase();
};

const formatValue = (value: string | number | null | undefined): string => {
	if (value === null || value === undefined) {
		return "—";
	}

	const str = String(value).trim();
	return str.length ? str : "—";
};

const formatStores = (product: CompareProduct): string => {
	if (!product.store_ids?.length) {
		return "—";
	}

	const storeNameById = new Map<number, string>(
		(product.stores ?? []).map((store) => [store.id, store.name])
	);

	const names = [...product.store_ids]
		.sort((a, b) => a - b)
		.map((id) => storeNameById.get(id))
		.filter((name): name is string => Boolean(name));

	return names.length ? names.join(", ") : "—";
};

const buildRow = (key: string, label: string, values: string[]): CompareRow => {
	const distinctValues = new Set(
		values.map((value) => normalizeCompareValue(value))
	);

	return {
		key,
		label,
		values,
		isDifferent: distinctValues.size > 1,
	};
};

const filterVisibleRows = (rows: CompareRow[]): CompareRow[] => {
	if (!props.showDifferences) {
		return rows;
	}

	return rows.filter((row) => row.isDifferent);
};

const availabilityRows = computed<CompareRow[]>(() => {
	if (!products.value.length) {
		return [];
	}

	return [
		buildRow(
			"availability-status",
			"Наличие товара",
			products.value.map((product) =>
				product.store_ids?.length ? "В наличии" : "Нет в наличии"
			)
		),
		buildRow(
			"availability-stores",
			"Магазины",
			products.value.map((product) => formatStores(product))
		),
		buildRow(
			"availability-quant",
			"Количество",
			products.value.map((product) => quantDescrLocal(product.quant_descr))
		),
	];
});

const visibleAvailabilityRows = computed<CompareRow[]>(() => {
	return filterVisibleRows(availabilityRows.value);
});

const brandRows = computed<CompareRow[]>(() => {
	if (!products.value.length) {
		return [];
	}

	return [
		buildRow(
			"brand",
			"Бренд",
			products.value.map((product) => formatValue(product.brand))
		),
		buildRow(
			"country",
			"Страна производства",
			products.value.map((product) => formatValue(product.country))
		),
	];
});

const visibleBrandRows = computed<CompareRow[]>(() => {
	return filterVisibleRows(brandRows.value);
});

const ratingRows = computed<CompareRow[]>(() => {
	if (!products.value.length) {
		return [];
	}

	return [
		buildRow(
			"rating",
			"Рейтинг",
			products.value.map((product) => formatValue(product.rating))
		),
		buildRow(
			"review-count",
			"Количество отзывов",
			products.value.map((product) => formatValue(product.review_count))
		),
	];
});

const visibleRatingRows = computed<CompareRow[]>(() => {
	return filterVisibleRows(ratingRows.value);
});

const filterRows = computed<CompareRow[]>(() => {
	if (!products.value.length) {
		return [];
	}

	const rowsByKey = new Map<string, CompareRow>();
	const order: string[] = [];

	for (const [productIndex, product] of products.value.entries()) {
		for (const filter of product.filters_display ?? []) {
			const key = String(filter.id);

			let row = rowsByKey.get(key);

			if (!row) {
				row = {
					key,
					label: filter.label,
					values: Array(products.value.length).fill("—"),
					isDifferent: false,
				};
				rowsByKey.set(key, row);
				order.push(key);
			}

			row.values[productIndex] = formatValue(filter.value);
		}
	}

	return order.map((key) => {
		const row = rowsByKey.get(key)!;
		const distinctValues = new Set(
			row.values.map((value) => normalizeCompareValue(value))
		);

		return {
			...row,
			isDifferent: distinctValues.size > 1,
		};
	});
});

const visibleFilterRows = computed<CompareRow[]>(() => {
	return filterVisibleRows(filterRows.value);
});
</script>

<template>
	<UAccordion
		:class="props.class"
		:items="items"
		type="multiple"
		:default-value="['0', '1', '2', '3']"
		:ui="{ root: 'grid gap-5', label: 'text-lg leading-[28px] sm:text-[20px] sm:leading-[30px] cursor-pointer' }"
	>
		<template #avail>
			<div class="grid gap-4">
				<div
					v-for="row in visibleAvailabilityRows"
					:key="row.key"
					class="grid gap-2 pb-3 border-b border-gray-300"
				>
					<span class="text-sm leading-5 font-medium">
						{{ row.label }}
					</span>
					<div class="flex text-black font-medium">
						<p
							v-for="(value, index) in row.values"
							:key="`${row.key}-${index}`"
							class="w-full max-w-[158px] sm:max-w-56 lg:max-w-[280px]"
						>
							{{ value }}
						</p>
					</div>
				</div>

				<div
					v-if="!visibleAvailabilityRows.length"
					class="grid gap-2 pb-3 border-b border-gray-300"
				>
					<span class="text-sm leading-5 font-medium">
						Параметры
					</span>
					<div class="flex text-black font-medium">
						<p class="w-full">
							Нет отличающихся параметров.
						</p>
					</div>
				</div>
			</div>
		</template>

		<template #brand>
			<div class="grid gap-4">
				<div
					v-for="row in visibleBrandRows"
					:key="row.key"
					class="grid gap-2 pb-3 border-b border-gray-300"
				>
					<span class="text-sm leading-5 font-medium">
						{{ row.label }}
					</span>
					<div class="flex text-black font-medium">
						<p
							v-for="(value, index) in row.values"
							:key="`${row.key}-${index}`"
							class="w-full max-w-[158px] sm:max-w-56 lg:max-w-[280px]"
						>
							{{ value }}
						</p>
					</div>
				</div>

				<div
					v-if="!visibleBrandRows.length"
					class="grid gap-2 pb-3 border-b border-gray-300"
				>
					<span class="text-sm leading-5 font-medium">
						Параметры
					</span>
					<div class="flex text-black font-medium">
						<p class="w-full">
							Нет отличающихся параметров.
						</p>
					</div>
				</div>
			</div>
		</template>

		<template #rating>
			<div class="grid gap-4">
				<div
					v-for="row in visibleRatingRows"
					:key="row.key"
					class="grid gap-2 pb-3 border-b border-gray-300"
				>
					<span class="text-sm leading-5 font-medium">
						{{ row.label }}
					</span>
					<div class="flex text-black font-medium">
						<p
							v-for="(value, index) in row.values"
							:key="`${row.key}-${index}`"
							class="w-full max-w-[158px] sm:max-w-56 lg:max-w-[280px]"
						>
							{{ value }}
						</p>
					</div>
				</div>

				<div
					v-if="!visibleRatingRows.length"
					class="grid gap-2 pb-3 border-b border-gray-300"
				>
					<span class="text-sm leading-5 font-medium">
						Параметры
					</span>
					<div class="flex text-black font-medium">
						<p class="w-full">
							Нет отличающихся параметров.
						</p>
					</div>
				</div>
			</div>
		</template>

		<template #filters>
			<div class="grid gap-4">
				<div
					v-for="row in visibleFilterRows"
					:key="row.key"
					class="grid gap-2 pb-3 border-b border-gray-300"
				>
					<span class="text-sm leading-5 font-medium">
						{{ row.label }}
					</span>
					<div class="flex text-black font-medium">
						<p
							v-for="(value, index) in row.values"
							:key="`${row.key}-${index}`"
							class="w-full max-w-[158px] sm:max-w-56 lg:max-w-[280px]"
						>
							{{ value }}
						</p>
					</div>
				</div>

				<div
					v-if="!visibleFilterRows.length"
					class="grid gap-2 pb-3 border-b border-gray-300"
				>
					<span class="text-sm leading-5 font-medium">
						Параметры
					</span>
					<div class="flex text-black font-medium">
						<p class="w-full">
							Нет отличающихся параметров.
						</p>
					</div>
				</div>
			</div>
		</template>
	</UAccordion>
</template>

<style scoped></style>
