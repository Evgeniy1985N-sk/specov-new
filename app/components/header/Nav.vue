<script setup lang="ts">
const menu = ref([
  {
    name: "О компании",
    src: "/about"
  },
  {
    name: "Оплата и доставка",
    src: "/pay-delivery"
  },
  {
    name: "Сервис и гарантия",
    src: "/service-warranty"
  },
])
</script>

<template>
  <nav class="font-medium text-gray-600 flex flex-wrap justify-center gap-x-5 gap-y-2.5 items-center">
    <a v-for="(item, index) in menu" :href="item.src" :key="index" class="hover:text-(--Brand-700)">
      {{ item.name }}
    </a>
  </nav>
</template>