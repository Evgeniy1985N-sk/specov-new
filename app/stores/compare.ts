import { defineStore } from "pinia";
import type { Compare } from "~/types/product";


export const useCompareStore = defineStore("compare", () => {
	const items = ref<Compare[]>([]);

	function toggleItem(id: number) {
		const existItem = items.value.find(item => item.id === id)
		if (existItem) {
			items.value = items.value.filter(item => item.id !== id)
		} else {
			items.value.push({
				id: id
			})
		}
	}

	function deleteItem(id: number) {
		items.value = items.value.filter(item => item.id !== id)
	}

	const hasProducts = computed(() => items.value.length > 0 );

	const isInCompare = (id: number): boolean => items.value.find(item => item.id == id) != undefined;

	return {
		items,
		hasProducts,
		isInCompare,
		toggleItem,
		deleteItem,
	};
});

