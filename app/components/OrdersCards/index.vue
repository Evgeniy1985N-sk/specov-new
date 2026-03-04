<script setup lang="ts">
interface Product {
  article: string
  name: string
  image: string
  quantity: number
  pricePerUnit: number
  sum: number
  discount: number
  toPay: number
}

interface Order {
  id: string
  date: string
  productCount: number
  user: string | null
  email: string | null
  total: number
  status: string
  statusColor: string
  showRepeatButton?: boolean
  products: Product[]
}

const route = useRoute()

const props = withDefaults(defineProps<{
  order: Order
  index: number
  showUserColumn?: boolean
}>(), {
  showUserColumn: true
})

const isExpanded = ref(false)

const toggleOrder = () => {
  isExpanded.value = !isExpanded.value
}

const formatPrice = (price: number) => {
  return price.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' ₽'
}

const basePath = computed(() => {
  const currentPath = route.path.replace(/\/$/, '') || '/'

  if (currentPath.startsWith('/cabinet-individual')) {
    return '/cabinet-individual'
  }

  if (currentPath.startsWith('/cabinet-corporate')) {
    return '/cabinet-corporate'
  }

  return '/cabinet-individual'
})

const desktopGridClass = computed(() => {
  return props.showUserColumn
    ? 'grid-cols-[120px_1fr_1fr_180px_40px] xl:grid-cols-[160px_1fr_1fr_180px_40px]'
    : 'grid-cols-[120px_1fr_180px_40px] xl:grid-cols-[160px_1fr_180px_40px]'
})
</script>

<template>
  <div 
    class="bg-(--Background) rounded-lg transition-all"
    :class="isExpanded ? 'border border-(--border)' : ''"
  >
    <div 
      class="hidden min-[870px]:grid gap-2 md:gap-4 px-4 py-4 items-center cursor-pointer hover:bg-[#eaeaea] transition-colors rounded-lg"
      :class="desktopGridClass"
      @click="toggleOrder"
    >
      <div>
        <div class="font-bold text-(--Text-950)">{{ order.id }}</div>
        <div class="text-sm text-(--Text-600)">от {{ order.date }}</div>
      </div>
      <div class="flex items-center gap-2">
        <img src="/image/sidebar/shopping-bag.svg" alt="" class="w-5 h-5">
        <span class="text-sm text-(--Text-950)">{{ order.productCount }} {{ order.productCount === 1 ? 'товар' : order.productCount < 5 ? 'товара' : 'товаров' }}</span>
      </div>
      <div 
        v-if="showUserColumn"
        class="flex items-center gap-2"
      >
        <img src="/image/cabinet/user.svg" alt="" class="w-5 h-5">
        <span class="text-sm text-(--Text-950)">{{ order.user || order.email }}</span>
      </div>
      <div class="flex flex-col items-end gap-1">
        <template v-if="!order.showRepeatButton">
          <div class="font-bold text-(--Text-950)">{{ formatPrice(order.total) }}</div>
          <div class="flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-(--Brand-700)"></span>
            <span class="text-sm text-(--Brand-700)">{{ order.status }}</span>
          </div>
        </template>
        <button 
          v-else
          class="flex items-center gap-2 px-4 py-2.5 bg-(--Brand-950) text-white text-sm font-medium rounded-lg hover:bg-(--Brand-700) transition-colors"
          @click.stop
        >
          <img src="/image/cabinet/refresh-ccw.svg" alt="" class="brightness-0 invert">
          Повторить заказ
        </button>
      </div>
      <div class="flex items-center justify-end">
        <div class="w-9 h-9 rounded-lg border border-(--border) bg-(--Base-White) flex items-center justify-center">
          <svg 
            width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" 
            class="text-(--Text-600) transition-transform"
            :class="{ 'rotate-180': isExpanded }"
          >
            <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
    </div>

    <div class="block min-[870px]:hidden px-4 py-4 rounded-lg">
      <div class="flex items-start justify-between mb-4">
        <div>
          <div class="font-bold text-(--Text-950) text-lg">{{ order.id }}</div>
          <div class="text-sm text-(--Text-600)">от {{ order.date }}</div>
        </div>
        <div class="text-right">
          <div class="font-bold text-(--Text-950) text-lg">{{ formatPrice(order.total) }}</div>
          <div class="flex items-center gap-1.5 justify-end">
            <span class="w-1.5 h-1.5 rounded-full bg-(--Brand-700)"></span>
            <span class="text-sm text-(--Brand-700)">{{ order.status }}</span>
          </div>
        </div>
      </div>

      <div
        v-if="showUserColumn"
        class="flex items-center gap-2 mb-3"
      >
        <img src="/image/cabinet/user.svg" alt="" class="w-5 h-5">
        <span class="text-sm text-(--Text-950)">{{ order.user || order.email }}</span>
      </div>

      <div class="flex items-center gap-2 mb-4">
        <img src="/image/sidebar/shopping-bag.svg" alt="" class="w-5 h-5">
        <span class="text-sm text-(--Text-950)">{{ order.productCount }} {{ order.productCount === 1 ? 'товар' : order.productCount < 5 ? 'товара' : 'товаров' }}</span>
      </div>

      <NuxtLink 
        v-if="!isExpanded"
        :to="`${basePath}/orders/${order.id}`"
        class="w-full py-3 px-4 border border-(--border) rounded-lg text-sm font-semibold text-(--Brand-950) flex items-center justify-center gap-2 hover:bg-(--Background) transition-colors"
      >
        Смотреть товары
      <img src="/image/cabinet/arrow-right.svg" alt="">
      </NuxtLink>
    </div>

    <Transition
      enter-active-class="transition-all duration-500 ease-out overflow-hidden"
      enter-from-class="max-h-0"
      enter-to-class="max-h-[2000px]"
      leave-active-class="transition-all duration-500 ease-in overflow-hidden"
      leave-from-class="max-h-[2000px]"
      leave-to-class="max-h-0"
    >
      <div v-if="isExpanded && order.products.length > 0" class="hidden min-[870px]:block bg-(--Base-White) px-4 py-4 overflow-x-auto rounded-b-lg border-(--border)">
        <div class="hidden md:grid grid-cols-[70px_minmax(150px,1fr)_70px_90px_100px_70px_100px] gap-3 py-2 text-sm text-(--Text-600)">
          <div>Артикул</div>
          <div>Наименование</div>
          <div>Кол-во</div>
          <div>Цена за шт.</div>
          <div>Сумма</div>
          <div>Скидка</div>
          <div class="text-right">К оплате</div>
        </div>

        <div class="flex flex-col">
          <div 
            v-for="(product, pIndex) in order.products" 
            :key="pIndex" 
            class="grid grid-cols-2 md:grid-cols-[70px_minmax(150px,1fr)_70px_90px_100px_70px_100px] gap-2 md:gap-3 py-3 items-center"
          >
            <div class="text-sm text-(--Text-950) font-semibold">{{ product.article }}</div>
            <div class="flex items-center gap-3">
              <img :src="product.image" :alt="product.name" class="w-10 h-10 object-contain">
              <span class="text-sm text-(--Text-950) truncate font-semibold">{{ product.name }}</span>
            </div>
            <div class="text-sm text-(--Text-950) font-semibold">{{ product.quantity }} шт.</div>
            <div class="text-sm text-(--Text-950) font-semibold">{{ formatPrice(product.pricePerUnit) }}</div>
            <div class="text-sm text-(--Text-950) font-semibold">{{ formatPrice(product.sum) }}</div>
            <div class="text-sm text-(--Brand-700) font-semibold">{{ product.discount }}%</div>
            <div class="text-sm text-(--Text-950) text-right font-semibold">{{ formatPrice(product.toPay) }}</div>
          </div>
        </div>
      </div>
    </Transition>

    <Transition
      enter-active-class="transition-all duration-500 ease-out overflow-hidden"
      enter-from-class="max-h-0"
      enter-to-class="max-h-[5000px]"
      leave-active-class="transition-all duration-500 ease-in overflow-hidden"
      leave-from-class="max-h-[5000px]"
      leave-to-class="max-h-0"
    >
      <div v-if="isExpanded && order.products.length > 0" class="block min-[870px]:hidden bg-(--Base-White) px-4 py-4 rounded-b-lg border-t border-(--border)">
        <div class="flex items-center justify-between mb-4">
          <button 
            @click="toggleOrder"
            class="flex items-center gap-2 text-sm text-(--Text-950)"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="rotate-180">
              <path d="M3.3335 10H16.6668M16.6668 10L11.6668 5M16.6668 10L11.6668 15" stroke="currentColor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <div class="flex items-center gap-2 text-sm text-(--Text-950)">
            <img src="/image/sidebar/shopping-bag.svg" alt="" class="w-5 h-5">
            <span>{{ order.productCount }} {{ order.productCount === 1 ? 'товар' : order.productCount < 5 ? 'товара' : 'товаров' }}</span>
            <span class="font-bold">{{ formatPrice(order.total) }}</span>
          </div>
        </div>

        <div class="flex flex-col gap-4">
          <div 
            v-for="(product, pIndex) in order.products" 
            :key="pIndex" 
            class="flex gap-3 pb-4 border-b border-(--border) last:border-b-0"
          >
            <img :src="product.image" :alt="product.name" class="w-16 h-16 object-contain shrink-0">
            <div class="flex-1">
              <div class="font-semibold text-(--Text-950) mb-1">{{ product.name }}</div>
              <div class="text-sm text-(--Text-600) mb-3">Артикул: {{ product.article }}</div>
              
              <div class="grid grid-cols-2 gap-y-2 text-sm">
                <div>
                  <div class="text-(--Text-600)">Цена за шт.</div>
                  <div class="font-semibold text-(--Text-950)">{{ formatPrice(product.pricePerUnit) }}</div>
                </div>
                <div class="text-right">
                  <div class="text-(--Text-600)">Количество:</div>
                  <div class="font-semibold text-(--Text-950)">{{ product.quantity }} шт.</div>
                </div>
                <div>
                  <div class="text-(--Text-600)">Сумма:</div>
                  <div class="font-semibold text-(--Text-950)">{{ formatPrice(product.sum) }}</div>
                </div>
                <div class="text-right">
                  <div class="text-(--Text-600)">Скидка:</div>
                  <div class="font-semibold text-(--Brand-700)">{{ product.discount }}%</div>
                </div>
                <div class="col-span-2">
                  <div class="text-(--Text-600)">К оплате:</div>
                  <div class="font-semibold text-(--Text-950)">{{ formatPrice(product.toPay) }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
