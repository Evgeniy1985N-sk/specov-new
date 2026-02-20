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

</script>



<template>

  <!-- CARD -->
  <div class="card grid gap-2 lg:gap-0 cursor-pointer">

    <div class="flex justify-between items-start">
      <img class="max-w-[54px] h-[54px] object-contain" :src="props.item.image" :alt="props.item.title">

      <div class="card__btns hidden lg:grid gap-1 opacity-0 transition-opacity">
        <ProductButtonFavorite :date="date" />
        <ProductButtonCompare @handle-click="toggleCompare(props.item.id)"
          :is-active="compareIds.includes(props.item.id)" :is-trash="true" />
      </div>

    </div>

    <div class="flex justify-between items-end gap-4">

      <div class="grid">
        <!-- Price -->
        <div class="sm:gap-2 flex flex-wrap sm:items-center flex-col sm:flex-row sm:flex-nowrap">
          <p class="text-sm leading-5 sm:text-base sm:leading-6 font-bold text-gray-950">
            {{ props.item.price.toLocaleString('ru-RU') }} ₽
          </p>
          <div v-if="props.item.oldPrice" class="gap-2 hidden lg:flex justify-center items-center">
            <div class="text-zinc-400 line-through shrink-0">
              {{ props.item.oldPrice.toLocaleString('ru-RU') }} ₽
            </div>
            <div class="bg-[seagreen] leading-[22px] text-center text-white text-xs px-1.5 rounded-md">
              -{{ props.item.discont }}%
            </div>
          </div>
        </div>
        <!-- Price -->
         <p class="text-xs leading-[18px] sm:text-sm sm:leading-5 font-medium line-clamp-2">
          {{ props.item.title }}
         </p>
      </div>

      <UButton @click="addToCart(props.item.id)" class="card__btn-cart hidden lg:flex w-9 min-h-9 p-0 shrink-0 opacity-0 transition-opacity">
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