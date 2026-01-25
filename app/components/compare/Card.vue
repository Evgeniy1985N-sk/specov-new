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
const compareStore = useCompareStore()
const toggleCompare = useCompareStore().toggleItems
const compareIds = ref<string[]>([])

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

</script>



<template>

  <!-- CARD -->
  <div>

    <ProductButtonFavorite :date="date" />

    <ProductButtonCompare @handle-click="toggleCompare(props.item.id)"
      :is-active="compareIds.includes(props.item.id)" />

    <img :src="props.item.image" :alt="props.item.title">

    <!-- Prices -->
    <div class="sm:gap-2 flex flex-wrap sm:items-center flex-col sm:flex-row sm:flex-nowrap">

      <!-- Price + btns -->
      <div class="flex justify-between">

        <div class="leading-[30px] text-zinc-950 font-semibold text-lg sm:text-xl">
          {{ props.item.price.toLocaleString('ru-RU') }} ₽
        </div>

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


    <UButton @click="addToCart(props.item.id)" class="shrink-0 gap-1 px-4 min-h-10">
      <i class="flex items-center justify-center h-5 w-5">
        <ProductIconCart />
      </i>
    </UButton>

  </div>
  <!-- CARD -->

</template>

<style scoped></style>