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
  <nav class="flex flex-wrap justify-center gap-x-5 gap-y-2.5 items-center">
    <NuxtLink v-for="(item, index) in menu" :to="item.src" :key="index" class="text-xs leading-[18px] font-medium hover:text-(--Brand-700) transition-colors">
      {{ item.name }}
    </NuxtLink>
  </nav>
</template>