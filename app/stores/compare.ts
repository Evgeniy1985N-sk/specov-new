// stores/compare.ts
import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import type { ProductCard } from '@/types/product';

export const useCompareStore = defineStore('compare', () => {
  const compares = ref<ProductCard[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const maxCompareLimit = 20; // Limit for comparison products

  // Check if a product is in compare list
  const comparedProduct = (id: number) => {
    return compares.value.find((productItem: ProductCard) => productItem.id === id);
  };

  const isInCompare = (id: number) => {
    return compares.value.some((productItem: ProductCard) => productItem.id === id);
  };

  const hasCompareItems = computed(() => compares.value.length > 0);

  const totalCompares = computed(() => {
    return compares.value.length;
  });

  const canAddMore = computed(() => {
    return compares.value.length < maxCompareLimit;
  });

  const isAtLimit = computed(() => {
    return compares.value.length >= maxCompareLimit;
  });

  // Fetch compare list from server
  const fetchCompares = async () => {
    isLoading.value = true;
    error.value = null;
    
    // try {
    //   const { data, error: fetchError } = await useFetch<ProductCard[]>('/api/user/compares', {
    //     headers: useRequestHeaders(['cookie']), // Important for SSR authentication
    //     credentials: 'include'
    //   });
    //
    //   if (fetchError.value) {
    //     throw new Error(fetchError.value.message);
    //   }
    //
    //   if (data.value) {
    //     compares.value = data.value;
    //   }
    // } catch (err: any) {
    //   error.value = err.message || 'Failed to fetch compare list';
    //   console.error('Error fetching compares:', err);
    // } finally {
    //   isLoading.value = false;
    // }
  };

  // Add/Remove product from compare list
  const handleCompare = async (product: ProductCard) => {
    const isCurrentlyInCompare = isInCompare(product.id);
    
    // If already in compare, remove it
    if (isCurrentlyInCompare) {
      compares.value = compares.value.filter((item: ProductCard) => item.id !== product.id);
      
      // try {
      //   const { error: apiError } = await useFetch(`/api/products/${product.id}/compare`, {
      //     method: 'DELETE',
      //     headers: useRequestHeaders(['cookie']),
      //     credentials: 'include',
      //     body: JSON.stringify({ productId: product.id })
      //   });
      //
      //   if (apiError.value) {
      //     // Revert on error
      //     compares.value.push(product);
      //     throw new Error(apiError.value.message);
      //   }
      // } catch (err: any) {
      //   error.value = err.message || 'Failed to remove from compare';
      //   console.error('Error removing from compare:', err);
      //   return false;
      // }
      
      return true;
    } 
    // If not in compare, check limit and add
    else {
      if (isAtLimit.value) {
        error.value = `Cannot add more than ${maxCompareLimit} products to compare`;
        return false;
      }

      // Optimistic update
      compares.value.push(product);

      // try {
      //   const { error: apiError } = await useFetch(`/api/products/${product.id}/compare`, {
      //     method: 'POST',
      //     headers: useRequestHeaders(['cookie']),
      //     credentials: 'include',
      //     body: JSON.stringify({ productId: product.id })
      //   });
      //
      //   if (apiError.value) {
      //     // Revert optimistic update on error
      //     compares.value = compares.value.filter((item: ProductCard) => item.id !== product.id);
      //     throw new Error(apiError.value.message);
      //   }
      // } catch (err: any) {
      //   error.value = err.message || 'Failed to add to compare';
      //   console.error('Error adding to compare:', err);
      //   return false;
      // }
      
      return true;
    }
  };

  const addToCompare = async (product: ProductCard) => {
    if (isAtLimit.value) return;
    await handleCompare(product);
  };

  // Batch update compares (for syncing from client storage)
  const setComparesFromLS = async (products: ProductCard[]) => {
    if (!products.length) return;

    // try {
    //   const { error: apiError } = await useFetch('/api/user/compares/sync', {
    //     method: 'POST',
    //     headers: useRequestHeaders(['cookie']),
    //     credentials: 'include',
    //     body: JSON.stringify({ products })
    //   });
    //
    //   if (apiError.value) {
    //     throw new Error(apiError.value.message);
    //   }
    //
    //   // After successful sync, fetch fresh data
    //   await fetchCompares();
    // } catch (err: any) {
    //   error.value = err.message || 'Failed to sync compare list';
    //   console.error('Error syncing compares:', err);
    // }
  };

  // Clear all compares
  const clearCompares = async () => {
    if (compares.value.length === 0) return true;

    try {
      const { error: apiError } = await useFetch('/api/user/compares/clear', {
        method: 'DELETE',
        headers: useRequestHeaders(['cookie']),
        credentials: 'include'
      });

      if (apiError.value) {
        throw new Error(apiError.value.message);
      }

      compares.value = [];
      return true;
    } catch (err: any) {
      error.value = err.message || 'Failed to clear compare list';
      console.error('Error clearing compares:', err);
      return false;
    }
  };

  // Remove specific product from compare
  const removeFromCompare = async (productId: number) => {
    const product = comparedProduct(productId);
    if (!product) return true;

    compares.value = compares.value.filter((item: ProductCard) => item.id !== productId);

    try {
      const { error: apiError } = await useFetch(`/api/products/${productId}/compare`, {
        method: 'DELETE',
        headers: useRequestHeaders(['cookie']),
        credentials: 'include'
      });

      if (apiError.value) {
        // Revert on error
        if (product) {
          compares.value.push(product);
        }
        throw new Error(apiError.value.message);
      }
      
      return true;
    } catch (err: any) {
      error.value = err.message || 'Failed to remove from compare';
      console.error('Error removing from compare:', err);
      return false;
    }
  };

  // Auto-fetch on client-side for authenticated users
  // if (process.client) {
  //   const { status } = useAuth(); // Assuming you have auth setup
  //   if (status.value === 'authenticated') {
  //     fetchCompares();
  //   }
  // }

  return {
    // State
    compares,
    isLoading,
    error,
    maxCompareLimit,
    
    // Getters
    comparedProduct,
    isInCompare,
    hasCompareItems,
    totalCompares,
    canAddMore,
    isAtLimit,
    
    // Actions
    handleCompare,
    addToCompare,
    setComparesFromLS,
    fetchCompares,
    clearCompares,
    removeFromCompare
  };
});
