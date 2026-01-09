<script setup lang="ts">
const isShowSearch = ref(false)
function showSearch() {
  isShowSearch.value = !isShowSearch.value
}
provide('search', {
  isShowSearch,
  showSearch
})
</script>

<template>
  <header :class="{ 'popup': isShowSearch }"
    class="relative z-100 w-full left-0 py-3 sm:pt-4 lg:pt-0 flex flex-col items-center gap-2 sm:gap-6 self-stretch border-b border-gray-300 bg-white">

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