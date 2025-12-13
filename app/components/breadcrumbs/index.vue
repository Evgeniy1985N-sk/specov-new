<script setup lang="ts">
import IconeHome from './IconeHome.vue';

const items = [
  {
    slot: 'home',
    to: '/'
  },
  {
    label: 'Инструмент',
    to: '/'
  },
  {
    label: 'Электроинструмент',
    to: '/'
  },
  {
    label: 'Перфораторы',
    to: '/'
  },
  {
    label: 'Электроперфораторы Makita',
  },
]
</script>

<template>
  <SectionContainer>
    <UBreadcrumb :items="items" class="breadcrumb py-8 pb-4 sm:pb-8" :ui="{ item: 'min-w-max text-(--Brand-950)', link: 'text-gray-600 hover:text-gray-500 font-bold', separatorIcon: 'text-300' }">
      <template #home>
        <div class="flex items center justify-center w-5 h-5">
          <IconeHome />
        </div>
      </template>
    </UBreadcrumb>
  </SectionContainer>
</template>

<style scoped>
  .breadcrumb :deep(li:last-child span) {
    color: var(--Brand-700);
}
</style>