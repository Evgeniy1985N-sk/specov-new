import { defineStore } from "pinia";
import type { Compare } from "~/types/product";


export const useCompareStore = defineStore("compare", () => {
  const compare = ref<Compare[]>([]);

  function toggleCompare(idItem: string) {
    const existItem = compare.value.find(item => item.id === idItem)
    if (existItem) {
      compare.value = compare.value.filter(item => item.id !== idItem )
    } else {
      compare.value.push({
        id: idItem
      })
    }
  }

  watch(compare, () => {
    console.log(compare.value)
  }, {deep: true})

  return {
    compare,
    toggleCompare,
  };
});
