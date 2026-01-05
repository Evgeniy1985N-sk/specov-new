<script setup lang="ts">
interface Props {
  title: string
  goods?: number
}
const props = defineProps<Props>()

const declensionGoods = computed(() => {
  const n = props.goods ?? 0

  if (n % 100 >= 11 && n % 100 <= 14) {
    return 'товаров'
  }

  const lastDigit = n % 10

  if (lastDigit === 1) {
    return 'товар'
  }
  if (lastDigit >= 2 && lastDigit <= 4) {
    return 'товара'
  }
  return 'товаров'
})
</script>

<template>
  <div class="flex gap-2 flex-wrap items-baseline">
    <h1 class="text-[24px] leading-8 sm:text-[36px] sm:leading-11 text-gray-950 font-['Russo_One']">
      {{ props.title }}
    </h1>
    <span v-if="props.goods" class="text-sm leading-5 font-medium">
      {{ props.goods }}
      {{ declensionGoods }}
    </span>
  </div>
</template>