<script setup lang="ts">
import type { AccordionItem } from '@nuxt/ui'

const check = ref(false)

const minPrice = ref(799)
const maxPrice = ref(50000)

const items = [
  {
    label: 'Наличие в магазинах',
    slot: 'availability' as const,
  },
  {
    label: 'Цена',
    slot: 'price' as const,
  },
  {
    label: 'Components',
    content: 'You can customize components by using the `class` / `ui` props or in your app.config.ts.'
  }
] satisfies AccordionItem[]
</script>

<template>
  <UAccordion :items="items" type="multiple" :default-value="['0', '1', '2']">

    <template #availability="{ item }">

      <div class="grid gap-4">
        <label class="flex gap-2 items-center cursor-pointer">
          <UCheckbox size="xl" v-model="check" />
          <span class="text-sm leading-5 text-gray-950 font-medium">
            50 лет Октября, 118А
          </span>
        </label>
        <label class="flex gap-2 items-center cursor-pointer">
          <UCheckbox size="xl" v-model="check" />
          <span class="text-sm leading-5 text-gray-950 font-medium">
            Горпищекомбинатовская, 1с1
          </span>
        </label>
      </div>

    </template>

    <template #price="{ item }">

      <div class="flex gap-2">
        <UInput color="neutral" size="lg" placeholder='от 799' v-model="minPrice" type="number"/>
        <UInput color="neutral" size="lg" placeholder="до 50 000" v-model="maxPrice" type="number" />
      </div>

      <CatalogInputRange :max-range="50000" v-model:min-value="minPrice" v-model:max-value="maxPrice" />

    </template>

  </UAccordion>
</template>
