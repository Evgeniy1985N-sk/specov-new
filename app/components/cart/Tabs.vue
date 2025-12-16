<script setup lang="ts">
import Pin from './icon/Pin.vue';
import Box from './icon/Box.vue';
import Car from './icon/Car.vue';

const tabs = ref([
  {
    label: 'Самовывоз',
    dsc: '2 магазина',
    icon: Pin,
    isActive: true,
  },
  {
    label: 'Доставка курьером',
    dsc: 'от 290 рублей',
    icon: Car,
    isActive: false,
  },
  {
    label: 'Транспортная компания',
    dsc: 'Рассчитать доставку',
    icon: Box,
    isActive: false,
  }
])
function toggleActive(index: number) {
  tabs.value = tabs.value.map((item, i) => ({
    ...item,
    isActive: i === index
  }));
}
</script>

<template>
  <div class="grid gap-6">

    <div class="flex lg:grid grid-cols-3 gap-1 bg-gray-100 p-1 rounded-lg">
      <button v-for="(tab, i) in tabs" :key="i" @click="toggleActive(i)" :class="tab.isActive ? 'bg-white' : ''"
        class="flex items-center grow gap-4 text-sm leading-5 w-full h-[60px] px-4 py-2.5 cursor-pointer transition rounded-lg">
        <WrapIcon class="w-6 h-6">
          <component :is="tab.icon" />
        </WrapIcon>
        <div class="grid">
          <p class="text-left text-gray-950 font-semibold">
            {{ tab.label }}
          </p>
          <span class="text-left text-sm leading-5 font-medium">
            {{ tab.dsc }}
          </span>
        </div>
      </button>
    </div>

    <div class="grid">
      <div v-if="tabs[0]?.isActive" class="flex">
        <CartStore />
      </div>
      <div v-if="tabs[1]?.isActive" class="flex">
        2
      </div>
      <div v-if="tabs[2]?.isActive" class="flex">
        3
      </div>
    </div>

  </div>
</template>