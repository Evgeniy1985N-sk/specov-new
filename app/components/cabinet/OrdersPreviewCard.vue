<script setup lang="ts">
import type { Order } from '~/types/cabinet'

interface Props {
  orders: Order[]
  formatPrice: (price: number) => string
}

const route = useRoute()

defineProps<Props>()
</script>

<template>
  <div class="bg-(--Base-White) rounded-xl p-5">
    <div class="flex items-center justify-between mb-5">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-(--Background) rounded-lg flex items-center justify-center">
          <img src="/image/sidebar/shopping-bag.svg" alt="">
        </div>
        <h3 class="text-lg font-bold text-(--Text-950)">Заказы</h3>
      </div>
      <NuxtLink :to="`${route.path.startsWith('/cabinet-corporate') ? '/cabinet-corporate' : '/cabinet-individual'}/orders`" class="flex items-center gap-1 text-sm text-(--Text-950) font-semibold border border-(--border) py-2 px-4 bg-(--Background) rounded-lg">
        Все
        <img src="/image/cabinet/arrow-right.svg" alt="">
      </NuxtLink>
    </div>

    <div class="flex flex-col gap-2">
      <div v-for="(order, index) in orders" :key="index" class="flex items-center justify-between py-3 bg-(--Background) p-4 rounded-2xl">
        <div>
          <div class="font-bold text-(--Text-950)">{{ order.id }}</div>
          <div class="text-sm text-(--Text-600)">от {{ order.date }}</div>
        </div>
        <div class="text-right">
          <div class="font-bold text-(--Text-950)">{{ formatPrice(order.amount) }}</div>
          <div class="flex items-center gap-1.5 justify-end">
            <span class="w-1.5 h-1.5 rounded-full" :class="order.statusColor === 'green' ? 'bg-(--Brand-700)' : 'bg-(--Warning-600)'"></span>
            <span class="text-sm" :class="order.statusColor === 'green' ? 'text-(--Brand-700)' : 'text-(--Warning-600)'">{{ order.status }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

