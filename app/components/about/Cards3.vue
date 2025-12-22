<script setup lang="ts">
import Icon6 from '@/components/about/icon/Icon-6.vue';
import Icon8 from '@/components/about/icon/Icon-8.vue';

const items = ref([
  {
    text: 'Возможность оплаты в кредит и рассрочку',
    icon: markRaw(Icon8),
  },
  {
    text: 'Скидки в рамках программы лояльности',
    icon: markRaw(Icon6),
  },
])
</script>

<template>

  <div class="grid sm:grid-cols-2 lg:flex lg:flex-row gap-2 sm:gap-6">

    <div v-for="item in items"
      class="flex flex-col gap-6 w-full p-6 border border-gray-200 rounded-xl bg-white">
      <WrapIcon class="w-11 h-11 bg-gray-100 rounded-xl">
        <component :is="item.icon" />
      </WrapIcon>
      <p class="font-semibold mt-auto">
        {{ item.text }}
      </p>
    </div>

  </div>

</template>