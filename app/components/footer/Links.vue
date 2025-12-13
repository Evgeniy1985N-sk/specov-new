<script setup lang="ts">
const menu = [
  {
    name: "Публичная оферта",
    src: "/public-offer"
  },
  {
    name: "Политика конфиденциальности",
    src: "/privacy-policy"
  },
  {
    name: "Политика обработки персональных данных",
    src: "/personal-data-policy"
  },
]
</script>

<template>
  <nav class="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center">
    <a v-for="(item, index) in menu" :href="item.src" :key="index" class="font-medium text-gray-600 hover:text-(--Brand-700) text-xs leading-4 transition">
      {{ item.name }}
    </a>
  </nav>
</template>