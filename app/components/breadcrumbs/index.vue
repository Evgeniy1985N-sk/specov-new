<script setup lang="ts">
import BreadcrumbsIconHome from '@/components/breadcrumbs/icon/Home.vue'

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
  
  <div class="overflow-hidden">
    <SectionContainer>
      <UBreadcrumb :items="items" class="breadcrumb py-8 pb-4 sm:pb-8"
        :ui="{ item: 'min-w-max text-(--Brand-950)', link: 'text-gray-600 hover:text-gray-500 font-bold', separatorIcon: 'text-300' }">
        <template #home>
          <div class="flex items center justify-center w-5 h-5">
            <BreadcrumbsIconHome />
          </div>
        </template>
      </UBreadcrumb>
    </SectionContainer>
  </div>

</template>

<style scoped>
.breadcrumb :deep(li:last-child span) {
  color: var(--Brand-700);
}
</style>