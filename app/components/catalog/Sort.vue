<script setup lang="ts">
import type { LocationQuery } from 'vue-router'

import type { CategoryCatalogSortCol, CategoryCatalogSortDir } from "@/types/productCat";

const dropdown = ref<HTMLElement | null>(null)
const isShow = ref(false)
const value = ref<string>("Сначала популярные");

const handleClickOutside = (event: Event) => {
	if (dropdown.value && !dropdown.value.contains(event.target as Node)) {
		isShow.value = false
	}
}

onMounted(() => {
	document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
	document.removeEventListener('click', handleClickOutside)
})

const emit = defineEmits<{
	(e: 'handleClick', value: { sort: CategoryCatalogSortCol, dir: CategoryCatalogSortDir }): void
}>()

const items = ref<{
	label: string;
	sort: CategoryCatalogSortCol;
	isActive: boolean;
	dir: CategoryCatalogSortDir;
}[]>([
	{ label: 'Сначала популярные', isActive: true, sort: "popularity", dir: "desc" },
	{ label: 'Сначала недорогие', isActive: false, sort: "price", dir: "asc" },
	{ label: 'Сначала дорогие', isActive: false, sort: "price", dir: "desc" },
	{ label: 'По новинкам', isActive: false, sort: "is_new", dir: "asc" },
	{ label: 'По скидке', isActive: false, sort: "has_discount", dir: "asc" },
	{ label: 'По количеству отзывов', isActive: false, sort: "review_count", dir: "desc" },
	{ label: 'Сначала с высокой оценкой', isActive: false, sort: "rating", dir: "desc" }
])

function toggleActive(index: number) {
	const selectedItem = items.value[index];

	if (selectedItem) {
		value.value = selectedItem.label;
		emit('handleClick', { sort: selectedItem.sort, dir: selectedItem.dir });
	}

	items.value = items.value.map((item, i) => ({
		...item,
		isActive: i === index
	}));

	// isShow.value = false
}

function initFromQuery(query: LocationQuery) {
	const sort = query.sort as CategoryCatalogSortCol | undefined
	const dir = query.dir as CategoryCatalogSortDir | undefined

	if (!sort || !dir) return

	const item = items.value.find(
		i => i.sort === sort && i.dir === dir
	)

	if (!item) return

	items.value = items.value.map(i => ({
		...i,
		isActive: i === item
	}))

	value.value = item.label;

	// isShow.value = false
}

const route = useRoute();
watch(
	() => route.query,
	() => {
		isShow.value = false
	}
);

defineExpose({
	initFromQuery,
});

</script>

<template>

	<div ref="dropdown" class="relative min-w-[174px] sm:min-w-[270px]">

		<div class="flex gap-1 items-center">
			<span class="hidden sm:block text-sm leading-5 font-semibold">
				Сортировка:
			</span>
			<button @click="isShow = !isShow" class="flex items-baseline gap-1 text-(--Brand-700) cursor-pointer">
				<p class="text-sm leading-5 font-semibold">
					{{ value }}
				</p>
				<WrapIcon>
					<CatalogIconAng />
				</WrapIcon>
			</button>
		</div>

		<div v-if="isShow"
			class="absolute top-full left-0 mt-3 w-full min-w-[290px] rounded-xl bg-white isolate z-100 border border-gray-200">
			<ul class="grid gap-4 p-4">
				<li v-for="(item, i) in items" :key="i" @click="toggleActive(i)" :class="item.isActive ? 'active' : ''"
					class="cursor-pointer item-custom">
					<p class="text-gray-700">
						{{ item.label }}
					</p>
				</li>
			</ul>
		</div>

	</div>

</template>

<style scope>
.item-custom {
	position: relative;
	display: flex;
	gap: 12px;
}

.item-custom:before {
	content: '';
	width: 20px;
	height: 20px;
	border: 1px solid #e5e7eb;
	border-radius: 50%;
	flex-shrink: 0;
}

.item-custom.active:before {
	border: 6px solid var(--Brand-700);
}
</style>
