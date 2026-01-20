import { defineStore } from "pinia";
import type { Compare } from "~/types/product";


export const useCompareStore = defineStore("compare", () => {
  const items = ref<Compare[]>([]);

  function toggleitems(idItem: string) {
    const existItem = items.value.find(item => item.id === idItem)
    if (existItem) {
      items.value = items.value.filter(item => item.id !== idItem )
    } else {
      items.value.push({
        id: idItem
      })
    }
  }

  watch(items, () => {
    console.log(items.value.length)
  }, {deep: true})

  return {
    items,
    toggleitems,
  };
});
