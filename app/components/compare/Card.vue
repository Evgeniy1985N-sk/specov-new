<script setup lang="ts">
import type { ProductCard } from '~/types/product'
import { useCartsStore } from '@/stores/carts'

interface Props {
  item: ProductCard
  classMedia?: string
  classBtns?: string
  isRow?: boolean
  isList?: boolean
  isCol?: boolean
}

const props = defineProps<Props>();
const cartsStore = useCartsStore();
const compareStore = useCompareStore();
const likeStore = useLikeStore();
const { pictureDetail } = useProductPicture();

const productImg = computed(() => {
  return props.item.imgs?.find(p => p.main) ?? undefined;
});

function addProductToCart() {
  cartsStore.addToCart(
    0,
    {
      id: props.item.id,
      name: props.item.name,
      name_lat: props.item.name_lat,
      code_1c: props.item.code_1c
    },
    { char: props.item.char, price: props.item.price },
	productImg.value,
  );
}
/*
const compareItems = computed(() => {
  return compareStore.items
})

watch((compareItems), () => {
  getCompareIds()
}, { deep: true })

getCompareIds()
function getCompareIds() {
  compareIds.value = compareItems.value.map((item) => item.id)
}
*/

</script>



<template>

  <!-- CARD -->
  <div class="card grid gap-2 lg:gap-0 cursor-pointer">

    <div class="flex justify-between items-start">
      <img class="max-w-[54px] h-[54px] object-contain" :src="productImg ? pictureDetail(productImg) : undefined" alt="pict">

      <div class="card__btns hidden lg:grid gap-1 opacity-0 transition-opacity">
        <ProductButtonFavorite :is-active="likeStore.isLiked(props.item)"/>
        <ProductButtonCompare @handle-click="compareStore.toggleItem(props.item)"
          :is-active="compareStore.isInCompare(props.item)" :is-trash="true" />
      </div>

    </div>

    <div class="flex justify-between items-end gap-4">

      <div class="grid">
        <!-- Price -->
        <div class="sm:gap-2 flex flex-wrap sm:items-center flex-col sm:flex-row sm:flex-nowrap">
          <p class="text-sm leading-5 sm:text-base sm:leading-6 font-bold text-gray-950">
            {{ props.item.price.toLocaleString('ru-RU') }} ₽
          </p>
          <div v-if="props.item.old_price" class="gap-2 hidden lg:flex justify-center items-center">
            <div class="text-zinc-400 line-through shrink-0">
              {{ props.item.old_price.toLocaleString('ru-RU') }} ₽
            </div>
            <div class="bg-[seagreen] leading-[22px] text-center text-white text-xs px-1.5 rounded-md">
              -{{ props.item.discount }}%
            </div>
          </div>
        </div>
        <!-- Price -->
         <p class="text-xs leading-[18px] sm:text-sm sm:leading-5 font-medium line-clamp-2">
          {{ props.item.price }}
         </p>
      </div>

      <UButton @click="addProductToCart" class="card__btn-cart hidden lg:flex w-9 min-h-9 p-0 shrink-0 opacity-0 transition-opacity">
        <WrapIcon>
          <ProductIconCart />
        </WrapIcon>
      </UButton>
    </div>

  </div>
  <!-- CARD -->

</template>

<style scoped>
.card:hover .card__btns {
  opacity: 1;
}
.card:hover :deep(.card__btn-cart) {
  opacity: 1;
}
</style>
