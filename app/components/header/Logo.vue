<script setup lang="ts">
interface Search {
  isShowSearch: boolean
}
const { isShowSearch } = inject<Search>('search')!
</script>

<template>
  <NuxtLink :class="{'hidden sm:block': isShowSearch}" to="/">
    <div class="w-[122px] sm:w-[137px] h-auto">
      <img src="/image/logo.svg" alt="Logo">
    </div>
  </NuxtLink>
</template>