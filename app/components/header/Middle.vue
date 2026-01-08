<script setup lang="ts">
import IconCompare from '@/components/header/icon/Compare.vue'
import IconFavorite from '@/components/header/icon/Favorite.vue'
import IconCart from '@/components/header/icon/Cart.vue'

const isMenu = ref(false)
const isCatalog = ref(false)
const isProfile = ref(false)

const buttons = [
  {
    src: '/compare',
    icon: IconCompare
  },
  {
    src: '/favorite',
    icon: IconFavorite
  },
  {
    src: '/cart',
    icon: IconCart
  },
]

const items = ref([
  {
    id: '1',
    image: '/image/example/img-1.jpg',
    title: 'Молотки',
    price: 17100,
    oldPrice: 13400,
    discont: 20,
    dsc: 'Ручной инструмент',
    link: '/catalog',
  },
  {
    id: '2',
    image: '/image/example/img-2.jpg',
    title: 'Молотки слесарные',
    price: 17100,
    oldPrice: 13400,
    discont: 20,
    dsc: 'Ручной инструмент / Ударно-рычажный',
    link: '/catalog',
  },
  {
    id: '3',
    image: '/image/example/img-1.jpg',
    title: 'Молотки Gigant',
    price: 17100,
    oldPrice: 13400,
    discont: 20,
    dsc: 'Ручной инструмент / Ударно-рычажный',
    link: '/catalog',
  },
  {
    id: '4',
    image: '/image/example/img-1.jpg',
    title: 'Молотки Matrix',
    price: 17100,
    oldPrice: 13400,
    discont: 20,
    dsc: 'Ручной инструмент / Ударно-рычажный',
    link: '/catalog',
  },
  {
    id: '5',
    image: '/image/example/img-1.jpg',
    title: 'Молотки Волат',
    price: 17100,
    oldPrice: 13400,
    discont: 20,
    dsc: 'Ручной инструмент / Ударно-рычажный',
    link: '/catalog',
  },
  {
    id: '6',
    image: '/image/example/img-1.jpg',
    title: 'Молотки Sparta',
    price: 17100,
    oldPrice: 13400,
    discont: 20,
    dsc: 'Ручной инструмент / Ударно-рычажный',
    link: '/catalog',
  },
  {
    id: '7',
    image: '/image/example/img-3.jpg',
    title: 'Молоток Atlantis D1033',
    price: 17100,
    oldPrice: 13400,
    discont: 20,
    dsc: 'Ручной инструмент / Ударно-рычажный',
    link: '/catalog',
  },
  {
    id: '8',
    image: '/image/example/img-4.jpg',
    title: 'Молоток Rexant ',
    price: 17100,
    dsc: 'Ручной инструмент / Ударно-рычажный',
    link: '/catalog',
  },
  {
    id: '9',
    image: '/image/example/img-5.jpg',
    title: 'Молоток Atlantis Touch',
    price: 17100,
    dsc: 'Ручной инструмент / Ударно-рычажный',
    link: '/catalog',
  },
])

const itemsPart = computed(() => items.value.slice(0, 6))
const itemsPart2 = computed(() => items.value.slice(6, 9))

</script>

<template>
  <div class="flex-wrap justify-between sm:flex-nowrap max-w-(--container) w-full m-auto px-4 gap-4 self-stretch
    items-center sm:justify-center flex">

    <HeaderLogo />

    <HeaderCatalogButton @toggle-catalog="isCatalog = !isCatalog" :is-active="isCatalog" />

    <HeaderSearch :items-part="itemsPart" :items-part2="itemsPart2" class="w-full order-1 sm:order-0" />

    <!-- buttons -->
    <NuxtLink v-for="item in buttons" :to="item.src"
      class="text-(--Brand-950) hidden lg:flex border-zinc-300 p-[11px] justify-spacse-between h-11 w-11 flex-col bg-white hover:bg-gray-300 transition items-center border border-solid rounded-lg">
      <span class="h-5 w-5">
        <component :is="item.icon" />
      </span>
    </NuxtLink>

    <HeaderLogin />

    <HeaderBurger :is-active="isMenu" @click="isMenu = !isMenu" />

    <HeaderMobileMenu :is-show="isMenu" />

    <HeaderCatalogMenu :is-show="isCatalog" @hide-catalog="isCatalog = !isCatalog" />

    <HeaderProfile :is-show="isProfile" />

    <HeaderMobileMenuBottom @toggle-catalog="isCatalog = !isCatalog" @toggle-profile="isProfile = !isProfile" />

  </div>
</template>

<style></style>