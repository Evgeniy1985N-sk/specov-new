<script setup lang="ts">
import type { Credit } from '~/types/cabinet'

interface Props {
  credit: Credit
  creditPercent: number
  formatPrice: (price: number) => string
}

defineProps<Props>()
</script>

<template>
  <div class="bg-(--Base-White) rounded-xl p-5">
    <div class="flex items-center gap-3 mb-5">
      <div class="w-10 h-10 bg-(--Background) rounded-lg flex items-center justify-center">
        <img src="/image/cabinet/pie-chart.svg" alt="">
      </div>
      <h3 class="text-xl font-bold text-(--Text-950)">Кредиторская задолженность</h3>
    </div>

    <div class="mb-4">
      <div class="text-base font-semibold text-(--Text-950) mb-2">Доступный лимит по договору</div>
      <div class="h-2 bg-[#e9eaeb] rounded-full overflow-hidden">
        <div class="h-full bg-(--Brand-600) rounded-full" :style="{ width: creditPercent + '%' }"></div>
      </div>
      <div class="flex justify-between mt-2 text-sm">
        <span class="text-(--Brand-950) font-medium">{{ formatPrice(credit.available) }}</span>
        <span class="text-(--Text-600)">{{ formatPrice(credit.total) }}</span>
      </div>
    </div>

    <div class="grid grid-cols-1 min-[510px]:grid-cols-2 gap-2 pt-4">
      <div class="bg-(--Background) p-4 rounded-2xl">
        <div class="text-xl font-semibold text-(--Text-950)">{{ formatPrice(credit.general) }}</div>
        <div class="text-sm text-(--Text-600)">Общая кредиторская задолженность</div>
      </div>
      <div class="bg-(--Background) p-4 rounded-2xl">
        <div class="text-xl font-semibold text-(--Error-500)">{{ formatPrice(credit.overdue) }}</div>
        <div class="text-sm text-(--Text-600)">Просроченная кредиторская задолженность</div>
      </div>
    </div>
  </div>
</template>

