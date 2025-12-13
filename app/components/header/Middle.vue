<script setup lang="ts">
import IconsCompare from '@/components/icons/Compare.vue'
import IconsFavorite from '@/components/icons/Favorite.vue'
import IconsCart from '@/components/icons/Cart.vue'

const isMenu = ref(false)
const isCatalog = ref(false)

const buttons = [
  {
    src: '/compare',
    icon: IconsCompare
  },
  {
    src: '/favorite',
    icon: IconsFavorite
  },
  {
    src: '/cart',
    icon: IconsCart
  },
]


</script>

<template>
  <div class="flex-wrap justify-between sm:flex-nowrap max-w-(--container) w-full m-auto px-4 gap-4 self-stretch
    items-center sm:justify-center flex">

    <HeaderLogo />

    <HeaderCatalogButton @toggle-catalog="isCatalog = !isCatalog" :is-active="isCatalog" />

    <HeaderSearch class="w-full order-1 sm:order-0" />

    <!-- buttons -->
    <a v-for="item in buttons" :href="item.src"
      class="text-(--Brand-950) hidden lg:flex border-zinc-300 p-[11px] justify-spacse-between h-11 w-11 flex-col bg-white hover:bg-gray-300 transition items-center border border-solid rounded-lg">
      <span class="h-5 w-5">
        <component :is="item.icon" />
      </span>
    </a>

    <HeaderLogin class="hidden lg:flex" />

    <HeaderBurger :is-active="isMenu" @click="isMenu = !isMenu" />

    <HeaderMobileMenu :is-show="isMenu" />

    <HeaderCatalogMenu :is-show="isCatalog" @hide-catalog="isCatalog = !isCatalog" />

    <HeaderMobileMenuBottom @toggle-catalog="isCatalog = !isCatalog" />

  </div>
</template>

<style></style>