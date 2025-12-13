<script setup lang="ts">
import type { ProductCard } from '~/types/product'

interface Props {
  item: ProductCard
  classBtns?: string
}

const props = defineProps<Props>()

</script>


<template>
  <div class="grid gap-4">
    <div
      class="relative flex items-center justify-center h-[155px] sm:h-[280px] rounded-2xl overflow-hidden border border-(--border)">

      <div class="absolute top-1 right-1 z-10 sm:top-3 sm:right-3 flex flex-row gap-1 sm:gap-2">

        <ProductIconButton>
          <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 20 20" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M9.99437 4.27985C8.32825 2.332 5.54987 1.80804 3.46233 3.59168C1.37478 5.37532 1.08089 8.35748 2.72025 10.467C4.08326 12.2209 8.20823 15.9201 9.56017 17.1174C9.71142 17.2513 9.78705 17.3183 9.87526 17.3446C9.95225 17.3676 10.0365 17.3676 10.1135 17.3446C10.2017 17.3183 10.2773 17.2513 10.4286 17.1174C11.7805 15.9201 15.9055 12.2209 17.2685 10.467C18.9079 8.35748 18.6498 5.35656 16.5264 3.59168C14.403 1.8268 11.6605 2.332 9.99437 4.27985Z"
              stroke="currentColor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>
        </ProductIconButton>

        <ProductIconButton hover-color="hover:text-(--Brand-600)">
          <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 20 20" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M6.66667 10.8333V14.1667M13.3333 9.16667V14.1667M10 5.83333V14.1667M6.5 17.5H13.5C14.9001 17.5 15.6002 17.5 16.135 17.2275C16.6054 16.9878 16.9878 16.6054 17.2275 16.135C17.5 15.6002 17.5 14.9001 17.5 13.5V6.5C17.5 5.09987 17.5 4.3998 17.2275 3.86502C16.9878 3.39462 16.6054 3.01217 16.135 2.77248C15.6002 2.5 14.9001 2.5 13.5 2.5H6.5C5.09987 2.5 4.3998 2.5 3.86502 2.77248C3.39462 3.01217 3.01217 3.39462 2.77248 3.86502C2.5 4.3998 2.5 5.09987 2.5 6.5V13.5C2.5 14.9001 2.5 15.6002 2.77248 16.135C3.01217 16.6054 3.39462 16.9878 3.86502 17.2275C4.3998 17.5 5.09987 17.5 6.5 17.5Z"
              stroke="currentColor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>
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

      <div :class="props.classBtns" class="w-full gap-4 font-semibold flex flex-wrap sm:flex-nowrap sm:justify-center pt-5 items-center">
        <ProductBasketButton />
        <ProductCounter class="hidden sm:flex" />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* CSS стили */
</style>