import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import type { ProductCard } from '@/types/product';

export const useLikeStore = defineStore('like', () => {
  const likes = ref<ProductCard[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // Check if a product is liked
  const likedProduct = (id: number) => {
    return likes.value.find((productItem: ProductCard) => productItem.id === id);
  };

  const isLiked = (id: number) => {
    return likes.value.some((productItem: ProductCard) => productItem.id === id);
  };

  const isLikes = computed(() => likes.value.length > 0);

  const totalLikes = computed(() => {
    return likes.value.length;
  });

  // Fetch likes from server
  const fetchLikes = async () => {
    isLoading.value = true;
    error.value = null;
    
    // try {
    //   const { data, error: fetchError } = await useFetch<ProductCard[]>('/api/user/likes', {
    //     headers: useRequestHeaders(['cookie']), // Important for SSR authentication
    //     credentials: 'include'
    //   });
    //
    //   if (fetchError.value) {
    //     throw new Error(fetchError.value.message);
    //   }
    //
    //   if (data.value) {
    //     likes.value = data.value;
    //   }
    // } catch (err: any) {
    //   error.value = err.message || 'Failed to fetch likes';
    //   console.error('Error fetching likes:', err);
    // } finally {
    //   isLoading.value = false;
    // }
  };

  // Toggle like/unlike
  const handleLikes = async (product: ProductCard) => {
    const isCurrentlyLiked = isLiked(product.id);
    const optimisticUpdate = !isCurrentlyLiked;
    
    // Optimistic update
    if (optimisticUpdate) {
      likes.value.push(product);
    } else {
      likes.value = likes.value.filter((item: ProductCard) => item.id !== product.id);
    }

    // try {
    //   const method = optimisticUpdate ? 'POST' : 'DELETE';
    //   const { error: apiError } = await useFetch(`/api/products/${product.id}/like`, {
    //     method,
    //     headers: useRequestHeaders(['cookie']),
    //     credentials: 'include',
    //     body: JSON.stringify({ productId: product.id })
    //   });
    //
    //   if (apiError.value) {
    //     // Revert optimistic update on error
    //     if (optimisticUpdate) {
    //       likes.value = likes.value.filter((item: ProductCard) => item.id !== product.id);
    //     } else {
    //       likes.value.push(product);
    //     }
    //     throw new Error(apiError.value.message);
    //   }
    // } catch (err: any) {
    //   error.value = err.message || 'Failed to update like';
    //   console.error('Error updating like:', err);
    // }
  };

  // Batch update likes (for syncing)
  const setLikesFromLS = async (products: ProductCard[]) => {
    if (!products.length) return;

    // try {
    //   const { error: apiError } = await useFetch('/api/user/likes/sync', {
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
    //   await fetchLikes();
    // } catch (err: any) {
    //   error.value = err.message || 'Failed to sync likes';
    //   console.error('Error syncing likes:', err);
    // }
  };

  const clearLikes = () => {
    likes.value = [];
  };

  // Auto-fetch on client-side
  if (process.client) {
    // const { status } = useAuth(); // Assuming you have auth setup
    // if (status.value === 'authenticated') {
    //   fetchLikes();
    // }
  }

  return {
    likes,
    likedProduct,
    isLiked,
    isLikes,
    totalLikes,
    handleLikes,
    setLikesFromLS,
    fetchLikes,
    clearLikes,
    isLoading,
    error
  };
});
