<script setup lang="ts">
const items = [
  {
    title: '30 лет на рынке',
    src: '/image/banner/Icon-1.svg'
  },
  {
    title: 'Только оригинальные товары',
    src: '/image/banner/Icon-2.svg'
  },
  {
    title: 'Более 10 000 наименований товаров в наличии',
    src: '/image/banner/Icon-3.svg'
  },
  {
    title: 'Гарантия от производителей на всю продукцию',
    src: '/image/banner/Icon-4.svg'
  },
]
</script>


<template>

  <div class="max-w-(--container) m-auto px-0 sm:px-4">

    <div class="relative p-5 sm:p-[50px] rounded-xl bg-[linear-gradient(90deg,#053628_0%,#447869_100%)]">
      <img class="hidden xl:block absolute bottom-0 right-0" src="/image/banner/Image.png" alt="Man">

      <div class="flex flex-wrap max-w-[560px] gap-[30px] sm:gap-[70px] justify-between">

        <div v-for="item in items" class="grid gap-6 max-w-[140px] sm:max-w-[230px]">
          <img class="w-8 h-8" :src="item.src" :alt="item.title">
          <p class="font-sans font-medium text-sm sm:text-base leading-6 tracking-[0%] text-white">
            {{ item.title }}
          </p>
        </div>

      </div>
    </div>

  </div>
</template>