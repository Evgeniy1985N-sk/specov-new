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
  <!-- top -->
  <div class="hidden lg:block bg-gray-100 w-full">
    <div class="max-w-(--container) m-auto px-4 gap-1 self-stretch items-center 
      justify-between flex-wrap flex leading-5 text-sm py-2">

      <!-- left -->
      <HeaderNav />

      <!-- right -->
      <HeaderPhone />

    </div>
  </div>
</template>