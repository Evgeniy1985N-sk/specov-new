<script setup lang="ts">
import IconCompare from '@/components/header/icon/Compare.vue'
import IconFavorite from '@/components/header/icon/Favorite.vue'
import IconCart from '@/components/header/icon/Cart.vue'
import type { UiState } from '~/types/uiState';

import { useLikeStore } from '@/stores/likes';
import { useCartsStore } from '@/stores/carts';

const likesStore = useLikeStore();
const cartsStore = useCartsStore();
const comparesStore = useCompareStore();

const { hasProducts: likesHas } = storeToRefs(likesStore);
const { hasProducts: cartsHas } = storeToRefs(cartsStore);
const { hasProducts: comparesHas } = storeToRefs(comparesStore);

const isMenu = ref(false)
const { isShowSearch, isShowCatalogMenu, toggleShowCatalogMenu, closeCatalogMenu } = inject<UiState>('UiState')!

const isProfile = ref(false)
const buttons = computed(() => [
  {
    src: '/compare',
    icon: IconCompare,
	selected: comparesHas,
  },
  {
    src: '/favorite',
    icon: IconFavorite,
	selected: likesHas,
  },
  {
    src: '/cart',
    icon: IconCart,
	selected: cartsHas,
  },
]);

watch(() => isShowSearch, () => {
  if (isShowCatalogMenu.value) closeCatalogMenu()
}, { deep: true })

</script>

<template>
  <div class="flex-wrap justify-between sm:flex-nowrap max-w-(--container) w-full m-auto px-4 gap-4 self-stretch
    items-center flex">

    <HeaderLogo />

    <HeaderCatalogButton @toggle-catalog="toggleShowCatalogMenu" :is-active="isShowCatalogMenu" />

    <HeaderSearch class="w-full order-1 sm:order-0" />

    <!-- buttons -->
    <NuxtLink v-for="item in buttons" :to="item.src"
		:key="item.src"
      class="text-(--Brand-950) hidden lg:flex border-zinc-300 p-[11px] justify-spacse-between h-11 w-11 flex-col bg-white hover:bg-gray-300 transition items-center border border-solid rounded-lg">
      <span class="h-5 w-5">
        <component :is="item.icon" :selected="item.selected.value" />
      </span>
    </NuxtLink>
    <!-- buttons -->

    <!-- BUTTON LOGIN -->
    <HeaderLogin />
    <!-- BUTTON LOGIN -->

    <HeaderBurger :is-active="isMenu" @click="isMenu = !isMenu" />

    <HeaderMobileMenu :is-show="isMenu" />

    <!-- CATALOG MENU -->
    <HeaderCatalogMenu :is-show="isShowCatalogMenu" @hide-catalog="toggleShowCatalogMenu" />
    <!-- CATALOG MENU -->

    <HeaderProfile :is-show="isProfile" />

    <!-- MOBILE MENU BOTTOM -->
    <HeaderMobileMenuBottom @toggle-catalog="toggleShowCatalogMenu" @toggle-profile="isProfile = !isProfile" />
    <!-- MOBILE MENU BOTTOM -->

  </div>
</template>

<style></style>
