<script setup lang="ts">

import type { UiState } from '~/types/uiState'

const isShowSearch = ref(false)
const isShowCatalogMenu = ref(false)

function showSearch() {
  isShowSearch.value = true
}
function closeSearch() {
  isShowSearch.value = false
}
function toggleShowCatalogMenu() {
  isShowCatalogMenu.value = !isShowCatalogMenu.value
}
function closeCatalogMenu() {
  isShowCatalogMenu.value = false
}

provide<UiState>('UiState', {
  isShowSearch,
  isShowCatalogMenu,
  showSearch,
  closeSearch,
  toggleShowCatalogMenu,
  closeCatalogMenu,
})

</script>

<template>
  <header :class="{ 'popup': isShowSearch }"
    class="relative z-100 w-full left-0 py-3 sm:pt-4 lg:pt-0 flex flex-col items-center gap-2 sm:gap-3 self-stretch bg-white shadow-[0px_4px_6px_-1px_#0A0D120D]">

    <!-- TOP -->
    <HeaderTop :class="isShowSearch ? 'hidden lg:block' : '' " />
    <!-- TOP -->

    <!-- MIDDLE -->
    <HeaderMiddle />
    <!-- MIDDLE -->

    <!-- BOTTOM -->
    <HeaderBottom :class="isShowSearch ? 'z-0' : ''" />
    <!-- BOTTOM -->

  </header>
</template>

<style>
.popup::after {
  content: '';
  position: fixed;
  top: 200px;
  inset: 0;
  background: white;
}

@media (min-width: 640px) {
  .popup::after {
    background: rgba(0, 0, 0, .2);
  }
}
</style>
