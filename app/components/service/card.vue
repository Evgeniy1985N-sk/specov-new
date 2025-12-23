<script setup lang="ts">
import Icon1 from '~/components/service/icon/Icon-1.vue';

const item = ref({
    title: 'Проверяем оборудование при покупке',
    text: 'Работоспособность оборудования и инструмента проверяем на территории наших магазинов в присутствии покупателя и выписываем гарантийный талон.',
    icon: markRaw(Icon1),
  })
</script>

<template>

  <div class="flex flex-col lg:flex-row gap-2 sm:gap-6">

    <div class="flex flex-col sm:flex-row gap-6 w-full p-6 border border-gray-200 rounded-xl bg-white">
      <WrapIcon class="shrink-0 w-11 h-11 bg-gray-100 rounded-xl">
        <component :is="item.icon" />
      </WrapIcon>
      <div>
        <div class="mb-2 font-['Russo_One'] text-[24px] leading-8 text-gray-950">
          {{ item.title }}
        </div>
        <p class="font-medium">
          {{ item.text }}
        </p>
      </div>
    </div>

  </div>

</template>