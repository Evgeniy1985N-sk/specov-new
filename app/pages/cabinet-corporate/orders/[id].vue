<script setup lang="ts">
const route = useRoute()
const router = useRouter()

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
  total: number
  products: Product[]
}

const order = ref<Order>({
  id: '481439875',
  date: '15 августа',
  productCount: 3,
  total: 32991.40,
  products: [
    {
      article: '67502',
      name: 'Ведро гибкое сверхпрочное, 14 л, желтое, Сибртех',
      image: '/image/products/img-13.png',
      quantity: 80,
      pricePerUnit: 217.60,
      sum: 25600.00,
      discount: 32,
      toPay: 17408.00
    },
    {
      article: '80881',
      name: 'Валик для внутренних работ синтетический, 250 мм, ворс 12 мм, D 36 мм, D ручки 6 мм, полиакрил Matrix',
      image: '/image/products/img-14.png',
      quantity: 30,
      pricePerUnit: 134.94,
      sum: 5190.00,
      discount: 22,
      toPay: 4048.20
    },
    {
      article: '80881',
      name: 'Шпательная лопатка из нержавеющей стали, 100 мм, двухкомпонентная ручка Matrix',
      image: '/image/products/img-15.png',
      quantity: 20,
      pricePerUnit: 127.56,
      sum: 3270.80,
      discount: 22,
      toPay: 2551.20
    }
  ]
})

const formatPrice = (price: number) => {
  return price.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' ₽'
}

const goBack = () => {
  router.push('/cabinet-corporate/orders')
}
</script>

<template>
  <Header />

  <main class="pt-8 pb-23">
    <div class="max-w-(--container) mx-auto px-4 min-[510px]:px-8 xl:px-0">
      <div class="flex gap-8 min-[1280px]:mx-4.5">
        <div class="hidden xl:block">
          <Sidebar />
        </div>

        <div class="flex-1 flex flex-col gap-4 min-[510px]:gap-6">
          <div class="flex gap-3">
            <button @click="goBack"
              class="xl:hidden rounded-lg transition-colors border border-(--border) p-3 max-[510px]:p-2 bg-(--Base-White) cursor-pointer">
              <img src="/image/cabinet/arrow-right.svg" alt="" class="rotate-180">
            </button>
            <div>
              <h1 class="text-2xl font-bold text-(--Text-950)">{{ order.id }}</h1>
              <div class="text-sm text-(--Text-600)">от {{ order.date }}</div>
            </div>
          </div>

          <div class="flex items-center justify-between bg-(--Base-White) rounded-xl p-4">
            <div class="flex items-center gap-2">
              <img src="/image/sidebar/shopping-bag.svg" alt="" class="w-5 h-5">
              <span class="text-(--Text-950) font-medium">{{ order.productCount }} {{ order.productCount === 1 ? 'товар'
                : order.productCount < 5 ? 'товара' : 'товаров' }}</span>
            </div>
            <div class="text-base font-bold text-(--Text-950)">{{ formatPrice(order.total) }}</div>
          </div>

          <div class="flex flex-col">
            <div v-for="(product, index) in order.products" :key="index"
              :class="['py-4', { 'border-t border-(--border)': index !== 0 }]">
              <div class="flex gap-4 mb-4">
                <div class="w-20 h-20 bg-(--Base-White) rounded-lg flex items-center justify-center">
                  <img :src="product.image" :alt="product.name" class="w-16 h-16 object-contain">
                </div>
                <div class="flex-1">
                  <div class="text-sm font-semibold text-(--Text-950) mb-1">{{ product.name }}</div>
                  <div class="text-sm text-(--Text-600)">Артикул: {{ product.article }}</div>
                </div>
              </div>

              <div class="grid grid-cols-1 gap-2 text-sm">
                <div class="flex justify-between items-center">
                  <span class="text-(--Text-600) text-sm font-medium">Цена за шт.</span>
                  <span class="font-semibold text-(--Text-950)">{{ formatPrice(product.pricePerUnit) }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-(--Text-600) text-sm font-medium">Количество:</span>
                  <span class="font-semibold text-(--Text-950)">{{ product.quantity }} шт.</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-(--Text-600) text-sm font-medium">Сумма:</span>
                  <span class="font-semibold text-(--Text-950)">{{ formatPrice(product.sum) }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-(--Text-600) text-sm font-medium">Скидка:</span>
                  <span class="font-semibold text-(--Brand-700)">{{ product.discount }}%</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-(--Text-600) text-sm font-medium">К оплате:</span>
                  <span class="font-semibold text-(--Text-950)">{{ formatPrice(product.toPay) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
