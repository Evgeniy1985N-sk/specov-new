<script setup lang="ts">
const items = ref([
  {
    label: 'Онлайн',
    src: '/image/payment/img-1.png',
    isActive: true,
  },
  {
    label: 'По карте',
    src: '/image/payment/img-2.png',
    isActive: false,
  },
  {
    label: 'SberPay',
    src: '/image/payment/img-3.png',
    isActive: false,
  },
  {
    label: 'Оплата TPay',
    src: '/image/payment/img-4.png',
    isActive: false,
  },
  {
    label: 'Mir Pay',
    src: '/image/payment/img-5.png',
    isActive: false,
  },
  {
    label: 'Долями',
    src: '/image/payment/img-6.png',
    isActive: false,
  },
])
function toggleActive(index: number) {
  items.value = items.value.map((item, i) => ({
    ...item,
    isActive: i === index
  }));
}
</script>

<template>
  <div class="grid gap-6 grid-cols-4">

    <button v-for="(item, i) in items" :key="i" @click="toggleActive(i)" 
    :class="item.isActive ? 'border-(--Brand-600)' : 'border-gray-300'"
      class="grid gap-6 p-4 cursor-pointer border rounded-lg transition">
      <img :src="item.src" :alt="item.label">
      <p class="text-left text-gray-950 font-semibold">
        {{ item.label }}
      </p>
    </button>

  </div>

</template>