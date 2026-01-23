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
    label: 'Комплект поставки',
    slot: 'item-3' as const,
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
  <UAccordion :class="props.class" :items="items" type="multiple" :default-value="['0', '1', '2']">

    <template #item-1="{ item }">


    </template>

  </UAccordion>
</template>

<style scoped></style>