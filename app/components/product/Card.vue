<script setup lang="ts">
import type { ProductCard } from '~/types/product'
import { useCartStore } from '@/stores/cart'

interface Props {
  item: ProductCard
  classMedia?: string
  classBtns?: string
  isRow?: boolean
  isList?: boolean
  isCol?: boolean
}

const date = ref('12.01.2026 в 17.00')
const props = defineProps<Props>()
const route = useRoute()
const isCatalogPage = computed(() => route.path === '/catalog')
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

const spec = [
  { label: 'Макс. крутящий момент', value: '6 Нм' },
  { label: 'Число скоростей', value: '1' },
  { label: 'Тип аккумулятора', value: 'Li-lon' },
  { label: 'Напряжение аккумулятора', value: '3.6 В' },
  { label: 'Устройство аккумулятора', value: 'встроенный' },
  { label: 'Вид упаковки', value: 'чемодан/кейс' },
];

const classContent = computed(() => ({
  'sm:max-w-[130px] lg:max-w-[232px] w-full': props.isRow,
  'min-h-[174px] sm:min-h-auto': isCatalogPage.value && !props.isRow
}))

const classCounter = computed(() => ({
  'max-w-full hidden sm:flex!': props.isRow,
}))

const classButtonCart = computed(() => ({
  'w-full': props.isRow
}))

const classCard = computed(() => ({
  'custom-class relative pl-[100px] sm:pl-0 sm:flex flex-wrap sm:flex-nowrap gap-4 justify-between pb-8 sm:pb-12 border-b border-gray-300': props.isRow,
  'grid': !props.isRow,
}))

const classMedia = computed(() => ({
  'absolute top-0 left-0 flex items-baseline sm:items-center sm:relative w-20 h-20 border-0 sm:border sm:w-56 sm:h-56! lg:w-[280px] lg:h-[280px]! shrink-0': props.isRow,
  'relative items-center': !props.isRow
}))

</script>


<template>

  <!-- CARD -->
  <div
    :class="classCard"
    class="gap-4 md:gap-8">

    <!-- Media -->
    <div
      :class="classMedia, props.classMedia"
      class="flex justify-center h-[155px] sm:h-[230px] xl:h-[280px] rounded-2xl border border-(--border) overflow-hidden xl:overflow-visible">

      <!-- BUTTONS -->
      <div :class="isRow ? 'hidden sm:flex' : 'flex'"
        class="absolute top-1 right-1 z-10 sm:top-3 sm:right-3 flex-row gap-1 sm:gap-2">

        <ProductButtonFavorite :date="date" />

        <ProductButtonCompare>
          <ProductIconCompare />
        </ProductButtonCompare>

      </div>
      <!-- BUTTONS -->

      <!-- SLIDER -->
      <div class="flex items-center justify-center w-full h-fit">
        <ProductSliderImgs :imgs="props.item.imgs" />
      </div>
      <!-- SLIDER -->

    </div>
    <!-- Media -->

    <!-- isRow -->
    <div v-if="isRow" class="max-w-[280px]">
      <span class="text-sm leading-5">
        Код товара: 15561175
      </span>
      <p class="mb-4 sm:mb-[46px] text-sm leading-5 text-gray-950 font-bold">
        {{ props.item.title }}
      </p>
      <div class="hidden sm:grid gap-4">
        <p v-for="(item, i) in spec" :key="i" class="flex gap-1 text-sm leading-5">
          <span class="font-medium text-gray-600">
            {{ item.label }}
          </span>
          <b class="min-w-16 font-bold text-gray-950">
            {{ item.value }}
          </b>
        </p>
      </div>
    </div>
    <!-- isRow -->

    <!-- Content -->
    <div :class="classContent"
      class="flex flex-col items-start self-stretch">

      <!-- Prices -->
      <div :class="isRow ? 'w-full flex-row sm:flex-wrap gap-x-2' : ''"
        class="sm:gap-2 flex flex-wrap sm:items-center flex-col sm:flex-row sm:flex-nowrap">

        <div v-if="isRow && props.item.oldPrice" class="lg:w-full order-1 lg:-order-1">
          <div class="bg-[seagreen] w-fit leading-[22px] text-center text-white text-xs px-1.5 rounded-md">
            -{{ props.item.discont }}%
          </div>
        </div>

        <!-- Price + btns -->
        <div :class="isRow ? 'w-full sm:w-auto' : 'w-full' " class="flex justify-between">

          <div class="leading-[30px] text-zinc-950 font-semibold text-lg sm:text-xl">
            {{ props.item.price.toLocaleString('ru-RU') }} ₽
          </div>

          <!-- IF ROW -->
          <div v-if="isRow" class="sm:hidden flex">

            <ProductButtonFavorite class="py-0! shadow-none text-gray-600" :date="date" />

            <ProductButtonCompare class="py-0! shadow-none text-gray-600">
              <ProductIconCompare />
            </ProductButtonCompare>

          </div>
          <!-- IF ROW -->

        </div>
        <!-- Price + btns -->

        <div v-if="props.item.oldPrice" class="gap-2 flex justify-center items-center">
          <div class="text-zinc-400 line-through shrink-0">
            {{ props.item.oldPrice.toLocaleString('ru-RU') }} ₽
          </div>
          <div v-if="!isRow" class="bg-[seagreen] leading-[22px] text-center text-white text-xs px-1.5 rounded-md">
            -{{ props.item.discont }}%
          </div>
        </div>

      </div>
      <!-- Prices -->

      <!-- Title -->
      <div v-if="!isRow" class="min-h-10 mt-1">
        <nuxt-link :to="{ name: 'products-id', params: { id: props.item.id } }"
          class="text-sm text-gray-600 line-clamp-3 sm:line-clamp-2 overflow-ellipsis">
          {{ props.item.title }}
        </nuxt-link>
      </div>
      <!-- Title -->

      <!-- Buttons -->
      <div
        :class="props.classBtns, isRow ? 'max-w-[130px] sm:max-w-full flex-col-reverse gap-2 lg:gap-4' : 'gap-4 mt-auto'"
        class="w-full font-semibold flex flex-wrap xl:flex-nowrap lg:justify-center pt-5 lg:items-center">

        <UButton @click="addToCart(props.item.id)" :class="classButtonCart" class="shrink-0 gap-1 px-4 min-h-10">
          <i class="flex items-center justify-center h-5 w-5">
            <ProductIconCart />
          </i>
          <span class="text-sm leading-5">
            В корзину
          </span>
        </UButton>

        <UInputNumber v-model="counter" :min="0" size="xl" color="neutral"
          :class="classCounter"
          :ui="{ root: 'hidden! lg:flex! min-h-10' }" :increment="{
            class: 'active:bg-gray-100!',
            color: 'neutral',
            variant: 'ghost',
            size: 'lg',
          }" :decrement="{
            class: 'active:bg-gray-100!',
            color: 'neutral',
            variant: 'ghost',
            size: 'lg'
          }" />

      </div>
      <!-- Buttons -->

    </div>
    <!-- Content -->

  </div>
  <!-- CARD -->

</template>

<style scoped>
@media (min-width: 1200px) {
  .custom-class:deep(.img-sl) {
    max-width: 220px;
  }
}

@media (max-width: 639px) {
  .custom-class:deep(.img-sl) {
    width: 100%;
  }
}
</style>