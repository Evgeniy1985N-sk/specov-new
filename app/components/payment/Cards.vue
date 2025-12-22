<script setup lang="ts">
import Icon1 from '~/components/payment/icon/Icon-1.vue';
import Icon2 from '@/components/payment/icon/Icon-2.vue';
import Icon3 from '@/components/payment/icon/Icon-3.vue';

const items = ref([
  {
    title: 'Безналичная оплата',
    icon: markRaw(Icon1),
  },
  {
    title: 'Оплата наличными и картой+',
    icon: markRaw(Icon2),
  },
  {
    title: 'Отсрочка платежа на гибких условиях ',
    text: 'Подробнее об условиях и сумме уточняйте у своего персонального менеджера',
    icon: markRaw(Icon3),
  },
])
</script>

<template>

  <div class="grid gap-6 grid-cols-[1fr 1fr] lg:grid-cols-[286px_286px_1fr]">

    <div v-for="(item, i) in items" :class="{ 'col-span-2 lg:col-auto': i === items.length - 1 }"
      class="item flex flex-col gap-6 w-full p-6 border border-gray-200 rounded-xl bg-white">
      <WrapIcon class="w-6 h-6">
        <component :is="item.icon" />
      </WrapIcon>
      <div class="grid gap-2 mt-auto">
        <div class="text-sm leading-5 text-gray-950 font-semibold">
          {{ item.title }}
        </div>
        <p v-if="item.text" class="text-sm leading-5 text-gray-700">
          {{ item.text }}
        </p>
      </div>
    </div>

  </div>

</template>

<style scoped></style>