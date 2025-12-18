<script setup lang="ts">
import type { AccordionItem } from '@nuxt/ui'

const check = ref(false)

const isHidden = ref(true)

const minPrice = ref(5799)
const maxPrice = ref(40000)

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
    label: 'Бренд',
    slot: 'brand' as const,
  },
  {
    label: 'Платформа',
    slot: 'platform' as const,
  },
  {
    label: 'Регулировка температуры',
    slot: 'temp' as const,
  },
  {
    label: 'Тип питания',
    slot: 'supply' as const,
  },
  {
    label: 'Дисплей',
    slot: 'display' as const,
  },
  {
    label: 'Мощность',
    slot: 'power' as const,
  },
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
        <UInput color="neutral" size="lg" placeholder='от 799' v-model="minPrice" class="no-spinner" />
        <UInput color="neutral" size="lg" placeholder="до 50 000" v-model="maxPrice" class="no-spinner" />
      </div>

      <CatalogInputRange :max-range="50000" v-model:min-value="minPrice" v-model:max-value="maxPrice" />

    </template>

    <template #brand="{ item }">

      <div class="grid gap-4">
        <label class="flex gap-2 items-center cursor-pointer">
          <UCheckbox size="xl" v-model="check" />
          <span class="text-sm leading-5 text-gray-950 font-medium">
            Aceline
          </span>
        </label>
        <label class="flex gap-2 items-center cursor-pointer">
          <UCheckbox size="xl" v-model="check" />
          <span class="text-sm leading-5 text-gray-950 font-medium">
            CAT
          </span>
        </label>
        <label class="flex gap-2 items-center cursor-pointer">
          <UCheckbox size="xl" v-model="check" />
          <span class="text-sm leading-5 text-gray-950 font-medium">
            DEKO
          </span>
        </label>
        <label class="flex gap-2 items-center cursor-pointer">
          <UCheckbox size="xl" v-model="check" />
          <span class="text-sm leading-5 text-gray-950 font-medium">
            DeWALT
          </span>
        </label>
        <label class="flex gap-2 items-center cursor-pointer">
          <UCheckbox size="xl" v-model="check" />
          <span class="text-sm leading-5 text-gray-950 font-medium">
            FinePower
          </span>
        </label>
        <label class="flex gap-2 items-center cursor-pointer">
          <UCheckbox size="xl" v-model="check" />
          <span class="text-sm leading-5 text-gray-950 font-medium">
            Hyundai
          </span>
        </label>
        <label class="flex gap-2 items-center cursor-pointer">
          <UCheckbox size="xl" v-model="check" />
          <span class="text-sm leading-5 text-gray-950 font-medium">
            Makita
          </span>
        </label>
        <label class="flex gap-2 items-center cursor-pointer">
          <UCheckbox size="xl" v-model="check" />
          <span class="text-sm leading-5 text-gray-950 font-medium">
            AEG
          </span>
        </label>
        <label class="flex gap-2 items-center cursor-pointer">
          <UCheckbox size="xl" v-model="check" />
          <span class="text-sm leading-5 text-gray-950 font-medium">
            Bort
          </span>
        </label>
        <label :class="isHidden ? 'hidden' : 'flex'" class="gap-2 items-center cursor-pointer">
          <UCheckbox size="xl" v-model="check" />
          <span class="text-sm leading-5 text-gray-950 font-medium">
            Axios
          </span>
        </label>
        <label :class="isHidden ? 'hidden' : 'flex'" class="gap-2 items-center cursor-pointer">
          <UCheckbox size="xl" v-model="check" />
          <span class="text-sm leading-5 text-gray-950 font-medium">
            Pnm
          </span>
        </label>
        <label :class="isHidden ? 'hidden' : 'flex'" class="gap-2 items-center cursor-pointer">
          <UCheckbox size="xl" v-model="check" />
          <span class="text-sm leading-5 text-gray-950 font-medium">
            Trin
          </span>
        </label>
        <label :class="isHidden ? 'hidden' : 'flex'" class="gap-2 items-center cursor-pointer">
          <UCheckbox size="xl" v-model="check" />
          <span class="text-sm leading-5 text-gray-950 font-medium">
            Regti
          </span>
        </label>
      </div>

      <button @click="isHidden = !isHidden" class="mt-3 text-[12px] leading-[18px] font-medium text-(--Brand-700)">
        {{ isHidden ? 'Показать еще' : 'Скрыть' }}
      </button>

    </template>

  </UAccordion>
</template>

<style scoped></style>