import { defineStore } from "pinia";
import type { Cart } from "~/types/product";



export const useCartStore = defineStore("cart", () => {
  const cart = ref<Cart[]>([]);

  return {
    cart,
  };
});
