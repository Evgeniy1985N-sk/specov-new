<script setup lang="ts">
import type { Discount } from '~/types/cabinet'

interface Props {
  discounts: Discount[]
}

defineProps<Props>()
</script>

<template>
  <div class="bg-(--Base-White) rounded-xl p-5">
    <div class="flex items-center gap-3 mb-5">
      <div class="w-10 h-10 bg-(--Background) rounded-lg flex items-center justify-center">
        <img src="/image/sidebar/sale.svg" alt="">
      </div>
      <h3 class="text-lg font-bold text-(--Text-950)">Скидки</h3>
    </div>

    <div class="grid grid-cols-1 min-[510px]:grid-cols-2 gap-2">
      <div v-for="(discount, index) in discounts" :key="index" class="bg-(--Background) p-4 rounded-2xl">
        <div class="text-xl font-bold text-(--Text-950)">{{ discount.percent }}%</div>
        <div class="text-sm text-(--Text-600)">{{ discount.category }}</div>
      </div>
    </div>
  </div>
</template>

