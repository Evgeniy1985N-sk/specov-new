<script setup lang="ts">
import Icon1 from '~/components/about/icon/Icon1.vue';
import Icon2 from '@/components/about/icon/Icon2.vue';
import Icon3 from '@/components/about/icon/Icon3.vue';

const items = ref([
  {
    title: '30+ лет',
    text: 'на рынке спецодежды и профессионального инструмента',
    icon: markRaw(Icon1),
  },
  {
    title: '15 000+',
    text: 'позиций в каталоге товаров',
    icon: markRaw(Icon2),
  },
  {
    title: '4 000+',
    text: 'постоянных клиентов во всех сферах',
    icon: markRaw(Icon3),
  },
])
</script>

<template>

  <div class="flex flex-col lg:flex-row gap-2 sm:gap-6">

    <div v-for="item in items" class="flex flex-row lg:flex-col gap-6 w-full p-6 border border-gray-200 rounded-xl bg-white">
      <WrapIcon class="w-11 h-11 bg-gray-100 rounded-xl">
        <component :is="item.icon" />
      </WrapIcon>
      <div>
        <div class="mb-2 font-['Russo_One'] text-[30px] leading-[38px] text-gray-950">
          {{ item.title }}
        </div>
        <p class="font-semibold">
          {{ item.text }}
        </p>
      </div>
    </div>

  </div>

</template>