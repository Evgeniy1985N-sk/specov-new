<script setup lang="ts">
import type { ProductCard } from '~/types/product'
import { useCartStore } from '@/stores/cart'

interface Props {
  item: ProductCard
  classBtns?: string
}

const props = defineProps<Props>()

const counter = ref(0)

const cart = useCartStore().cart

function addToCart(itemId: string) {
  const existingItem = cart.find(item => item.id === itemId)

  if (existingItem) {
    existingItem.count = counter.value
  } else {
    cart.push({
      id: itemId,
      count: counter.value
    })
  }
}

</script>


<template>
  <div class="grid gap-4">
    <div
      class="relative flex items-center justify-center h-[155px] sm:h-[280px] rounded-2xl overflow-hidden border border-(--border)">

      <div class="absolute top-1 right-1 z-10 sm:top-3 sm:right-3 flex flex-row gap-1 sm:gap-2">

        <ProductIconButton>
          <ProductIconFavorite />
        </ProductIconButton>

        <ProductIconButton hover-color="hover:text-(--Brand-600)">
          <ProductIconCompare />
        </ProductIconButton>

      </div>

      <ProductSliderImgs :imgs="props.item.imgs" />

    </div>
    <div class="flex flex-col justify-between items-start self-stretch">
      <div class="sm:gap-2 flex flex-wrap sm:items-center flex-col sm:flex-row">

        <div class="leading-[30px] text-zinc-950 font-semibold text-lg sm:text-xl">
          {{ props.item.price.toLocaleString('ru-RU') }} ₽
        </div>

        <div v-if="props.item.oldPrice" class="gap-2 flex justify-center items-center">
          <div class="text-zinc-400 line-through">
            {{ props.item.oldPrice.toLocaleString('ru-RU') }} ₽
          </div>
          <div class="bg-[seagreen] leading-[22px] text-center text-white text-xs px-1.5 rounded-md">
            -{{ props.item.discont }}% </div>
        </div>

      </div>

      <div class="min-h-10 mt-1">
        <nuxt-link :to="{ name: 'products-id', params: { id: props.item.id } }"
          class="text-sm text-gray-600 line-clamp-3 sm:line-clamp-2 overflow-ellipsis">
          {{ props.item.title }}
        </nuxt-link>
      </div>

      <div :class="props.classBtns"
        class="w-full gap-4 font-semibold flex flex-wrap xl:flex-nowrap lg:justify-center pt-5 lg:items-center">

        <UButton @click="addToCart(props.item.id)" class="shrink-0 gap-1 px-4 min-h-10">
          <i class="flex items-center justify-center h-5 w-5">
            <ProductIconCart />
          </i>
          <span class="text-sm leading-5">
            В корзину
          </span>
        </UButton>


        <UInputNumber v-model="counter" :min="0" size="xl" color="neutral" :ui="{ root: 'hidden! lg:flex!' }"
          :increment="{
            color: 'neutral',
            variant: 'solid',
            size: 'lg',
          }" :decrement="{
            color: 'neutral',
            variant: 'solid',
            size: 'lg'
          }" />

      </div>
    </div>
  </div>
</template>

<style scoped>
/* CSS стили */
</style>