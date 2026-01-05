<script setup lang="ts">
import type { AccordionItem } from '@nuxt/ui'

const check = ref(false)
const isHidden = ref(true)

const minPrice = ref<number | undefined>(799)
const maxPrice = ref<number | undefined>(50000)

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
interface Props {
  class?: string
}
const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'handleClick', check: boolean): void
}>()

const formattedMinPrice = computed({
  get() {
    // Только если значение реально задано — форматируем
    return minPrice.value !== undefined ? String(minPrice.value).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : ''
  },
  set(val: string) {
    const clean = val.replace(/\D/g, '')
    // Если строка пустая — ставим undefined, иначе число
    minPrice.value = clean ? Number(clean) : undefined
  }
})

const formattedMaxPrice = computed({
  get() {
    return maxPrice.value !== undefined ? String(maxPrice.value).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : ''
  },
  set(val: string) {
    const clean = val.replace(/\D/g, '')
    maxPrice.value = clean ? Number(clean) : undefined
  }
})
</script>

<template>
  <UAccordion :class="props.class" :items="items" type="multiple" :default-value="['0', '1', '2']">

    <template #availability="{ item }">

      <div @click="$emit('handleClick', check)" class="grid grid-cols-2 lg:grid-cols-1 gap-4">
        <label class="flex gap-2 items-center cursor-pointer">
          <UCheckbox size="xl" v-model="check" />
          <span class="text-sm leading-5 text-gray-950">
            50 лет Октября, 118А
          </span>
        </label>
        <label class="flex gap-2 items-center cursor-pointer">
          <UCheckbox size="xl" v-model="check" />
          <span class="text-sm leading-5 text-gray-950">
            Горпищекомбинатовская, 1с1
          </span>
        </label>
      </div>

    </template>

    <template #price="{ item }">

      <div class="flex gap-2">

        <UInput color="neutral" v-model="formattedMinPrice" placeholder="от 799" :ui="{ base: 'font-medium text-gray-950 ring-gray-900', trailing: 'pe-1' }" >
          <template v-if="formattedMinPrice?.length" #trailing>
            <UButton color="neutral" variant="link" size="sm" icon="i-lucide-x" aria-label="Clear input" class="text-gray-500 hover:text-gray-600"
              @click="formattedMinPrice = ''" />
          </template>
        </UInput>

        <UInput color="neutral" v-model="formattedMaxPrice" placeholder="до 50 000" :ui="{ base: 'font-medium text-gray-950', trailing: 'pe-1' }" >
          <template v-if="formattedMaxPrice?.length" #trailing>
            <UButton color="neutral" variant="link" size="sm" icon="i-lucide-x" aria-label="Clear input" class="text-gray-500 hover:text-gray-600"
              @click="formattedMaxPrice = ''" />
          </template>
        </UInput>

      </div>

      <CatalogInputRange :max-range="80000" v-model:min-value="minPrice" v-model:max-value="maxPrice" />

    </template>

    <template #brand="{ item }">

      <div class="grid gap-4">
        <label class="flex gap-2 items-center cursor-pointer">
          <UCheckbox size="xl" v-model="check" />
          <span class="text-sm leading-5 text-gray-950">
            Aceline
          </span>
        </label>
        <label class="flex gap-2 items-center cursor-pointer">
          <UCheckbox size="xl" v-model="check" />
          <span class="text-sm leading-5 text-gray-950">
            CAT
          </span>
        </label>
        <label class="flex gap-2 items-center cursor-pointer">
          <UCheckbox size="xl" v-model="check" />
          <span class="text-sm leading-5 text-gray-950">
            DEKO
          </span>
        </label>
        <label class="flex gap-2 items-center cursor-pointer">
          <UCheckbox size="xl" v-model="check" />
          <span class="text-sm leading-5 text-gray-950">
            DeWALT
          </span>
        </label>
        <label class="flex gap-2 items-center cursor-pointer">
          <UCheckbox size="xl" v-model="check" />
          <span class="text-sm leading-5 text-gray-950">
            FinePower
          </span>
        </label>
        <label class="flex gap-2 items-center cursor-pointer">
          <UCheckbox size="xl" v-model="check" />
          <span class="text-sm leading-5 text-gray-950">
            Hyundai
          </span>
        </label>
        <label class="flex gap-2 items-center cursor-pointer">
          <UCheckbox size="xl" v-model="check" />
          <span class="text-sm leading-5 text-gray-950">
            Makita
          </span>
        </label>
        <label class="flex gap-2 items-center cursor-pointer">
          <UCheckbox size="xl" v-model="check" />
          <span class="text-sm leading-5 text-gray-950">
            AEG
          </span>
        </label>
        <label class="flex gap-2 items-center cursor-pointer">
          <UCheckbox size="xl" v-model="check" />
          <span class="text-sm leading-5 text-gray-950">
            Bort
          </span>
        </label>
        <label :class="isHidden ? 'hidden' : 'flex'" class="gap-2 items-center cursor-pointer">
          <UCheckbox size="xl" v-model="check" />
          <span class="text-sm leading-5 text-gray-950">
            Axios
          </span>
        </label>
        <label :class="isHidden ? 'hidden' : 'flex'" class="gap-2 items-center cursor-pointer">
          <UCheckbox size="xl" v-model="check" />
          <span class="text-sm leading-5 text-gray-950">
            Pnm
          </span>
        </label>
        <label :class="isHidden ? 'hidden' : 'flex'" class="gap-2 items-center cursor-pointer">
          <UCheckbox size="xl" v-model="check" />
          <span class="text-sm leading-5 text-gray-950">
            Trin
          </span>
        </label>
        <label :class="isHidden ? 'hidden' : 'flex'" class="gap-2 items-center cursor-pointer">
          <UCheckbox size="xl" v-model="check" />
          <span class="text-sm leading-5 text-gray-950">
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