<script setup lang="ts">
import type { AccordionItem } from '@nuxt/ui'


const items = [
  {
    label: 'Наличие и способы получения',
    slot: 'item-1' as const,
  },
  {
    label: 'Оценки пользователей',
    slot: 'item-2' as const,
  },
  {
    label: 'Общие характеристики',
    slot: 'item-3' as const,
  },
  {
    label: 'Комплект поставки',
    slot: 'item-4' as const,
  },
] satisfies AccordionItem[]
interface Props {
  class?: string
}
const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'handleClick', check: boolean): void
}>()

</script>

<template>
  <UAccordion :class="props.class" :items="items" type="multiple" :default-value="['0', '1', '2']"
    :ui="{ root: 'grid gap-5', label: 'text-[20px] leading-[30px] cursor-pointer' }">

    <template #item-1="{ item }">
      <div class="grid gap-4">

        <div class="grid gap-2 pb-3 border-b border-gray-300">
          <span class="text-sm leading-5 font-medium">
            Наличие товара
          </span>
          <div class="flex text-black">
            <p class="w-full max-w-[158px] sm:max-w-56 lg:max-w-[280px]">
              В наличии
            </p>
            <p class="w-full max-w-[158px] sm:max-w-56 lg:max-w-[280px]">
              В наличии
            </p>
          </div>
        </div>

        <div class="grid gap-2 pb-3 border-b border-gray-300">
          <span class="text-sm leading-5 font-medium">
            Доставка
          </span>
          <div class="flex text-black">
            <p class="w-full max-w-[158px] sm:max-w-56 lg:max-w-[280px]">
              Завтра
            </p>
            <p class="w-full max-w-[158px] sm:max-w-56 lg:max-w-[280px]">
              Завтра
            </p>
          </div>
        </div>

        <div class="grid gap-2 pb-3 border-b border-gray-300">
          <span class="text-sm leading-5 font-medium">
            Самовывоз
          </span>
          <div class="flex text-black font-medium">
            <p class="w-full max-w-[158px] sm:max-w-56 lg:max-w-[280px]">
              Сегодня
            </p>
            <p class="w-full max-w-[158px] sm:max-w-56 lg:max-w-[280px]">
              Сегодня
            </p>
          </div>
        </div>

      </div>
    </template>

    <template #item-2="{ item }">
      <div class="grid gap-4">

        <div class="grid gap-2 pb-3 border-b border-gray-300">
          <span class="text-sm leading-5 font-medium">
            Рейтинг
          </span>
          <div class="flex text-black font-medium">
            <p class="w-full max-w-[158px] sm:max-w-56 lg:max-w-[280px]">
              <i class="flex">
                <WrapIcon v-for="item in 5">
                  <CompareIconStar />
                </WrapIcon>
              </i>
              125 отзывов
            </p>
            <p class="w-full max-w-[158px] sm:max-w-56 lg:max-w-[280px]">
              <i class="flex">
                <WrapIcon v-for="item in 5">
                  <CompareIconStar />
                </WrapIcon>
              </i>
              88 отзывов
            </p>
          </div>
        </div>

      </div>
    </template>

    <template #item-3="{ item }">
      <div class="grid gap-4">

        <div class="grid gap-2 pb-3 border-b border-gray-300">
          <span class="text-sm leading-5 font-medium">
            Частота вращения шпинделя
          </span>
          <div class="flex text-black font-medium">
            <p class="w-full max-w-[158px] sm:max-w-56 lg:max-w-[280px]">
              0-500/0-1800
            </p>
            <p class="w-full max-w-[158px] sm:max-w-56 lg:max-w-[280px]">
              0-3300
            </p>
          </div>
        </div>
        
        <div class="grid gap-2 pb-3 border-b border-gray-300">
          <span class="text-sm leading-5 font-medium">
            Частота ударов
          </span>
          <div class="flex text-black font-medium">
            <p class="w-full max-w-[158px] sm:max-w-56 lg:max-w-[280px]">
              —
            </p>
            <p class="w-full max-w-[158px] sm:max-w-56 lg:max-w-[280px]">
              0-4000
            </p>
          </div>
        </div>
       
        <div class="grid gap-2 pb-3 border-b border-gray-300">
          <span class="text-sm leading-5 font-medium">
            Тормоз двигателя
          </span>
          <div class="flex text-black font-medium">
            <p class="w-full max-w-[158px] sm:max-w-56 lg:max-w-[280px]">
              Есть
            </p>
            <p class="w-full max-w-[158px] sm:max-w-56 lg:max-w-[280px]">
              Есть
            </p>
          </div>
        </div>
        
        <div class="grid gap-2 pb-3 border-b border-gray-300">
          <span class="text-sm leading-5 font-medium">
            Крепление патрона
          </span>
          <div class="flex text-black font-medium">
            <p class="w-full max-w-[158px] sm:max-w-56 lg:max-w-[280px]">
              9/16
            </p>
            <p class="w-full max-w-[158px] sm:max-w-56 lg:max-w-[280px]">
              —
            </p>
          </div>
        </div>
       
        <div class="grid gap-2 pb-3 border-b border-gray-300">
          <span class="text-sm leading-5 font-medium">
            Ленточные
          </span>
          <div class="flex text-black font-medium">
            <p class="w-full max-w-[158px] sm:max-w-56 lg:max-w-[280px]">
              нет
            </p>
            <p class="w-full max-w-[158px] sm:max-w-56 lg:max-w-[280px]">
              нет
            </p>
          </div>
        </div>

      </div>
    </template>

  </UAccordion>
</template>

<style scoped></style>