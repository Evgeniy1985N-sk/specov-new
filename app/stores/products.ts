import { defineStore } from "pinia";
import { popularProducts } from "~/data/products";
import { buildingProducts } from "~/data/products";
import { gardenProducts } from "~/data/products";
import { relatedProducts } from "~/data/products";

export const useProductsStore = defineStore("products", () => {
  const popular = ref(popularProducts);
  const building = ref(buildingProducts);
  const garden = ref(gardenProducts);
  const related = ref(relatedProducts);

  const allProducts = [
    ...popularProducts,
    ...buildingProducts,
    ...gardenProducts,
    ...relatedProducts,
  ];

  return {
    allProducts,
    popular,
    building,
    garden,
    related,
  };
});
