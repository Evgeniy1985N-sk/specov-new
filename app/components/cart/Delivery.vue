<script setup lang="ts">
interface Props {
  isActive: boolean
  text: string
  class?: string
}

const emit = defineEmits(['toggleActive'])

const props = defineProps<Props>()

</script>


<template>

  <div :class="props.class" class="grid gap-4">
    <p class="text-gray-950 font-semibold">
      {{ props.text }}
    </p>
    <span class="text-sm text-gray-950">
      Забрать заказ можно: сегодня после 16:00
    </span>
    <span class="text-sm text-gray-950 font-medium">
      Пн-Вс
      8:00 — 19:00
    </span>


    <button v-if="props.isActive" @click="$emit('toggleActive')" class="flex gap-2 items-center text-(--Brand-700)">
      <CartIconCheckRound2 />
      Выбран
    </button>

    <UButton v-if="!props.isActive" @click="$emit('toggleActive')" class="w-fit" size="lg" color="neutral">
      Выбрать
    </UButton>

  </div>

</template>