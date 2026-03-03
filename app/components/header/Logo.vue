<script setup lang="ts">
import type { UiState } from '~/types/uiState';

const { isShowSearch } = inject<UiState>('UiState')!
</script>

<template>
  <NuxtLink :class="{'hidden sm:block': isShowSearch}" to="/">
    <div class="w-[122px] sm:w-[137px] h-auto">
      <img src="/image/logo.svg" alt="Logo">
    </div>
  </NuxtLink>
</template>