import { defineStore } from "pinia";
import type { Compare } from "~/types/product";


export const useCompareStore = defineStore("compare", () => {
  const items = ref<Compare[]>([]);

  function toggleItems(idItem: string) {
    const existItem = items.value.find(item => item.id === idItem)
    if (existItem) {
      items.value = items.value.filter(item => item.id !== idItem )
    } else {
      items.value.push({
        id: idItem
      })
    }
  }

  function deleteItems(idItem: string) {
    items.value = items.value.filter(item => item.id !== idItem)
  }

  watch(items, () => {
    console.log(items.value)
  }, {deep: true})

  return {
    items,
    toggleItems,
    deleteItems,
  };
});
