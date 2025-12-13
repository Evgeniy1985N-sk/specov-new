<script setup lang="ts">
import IconDots from './IconDots.vue';
import IconPhone from './IconPhone.vue';
import IconPin from './IconPin.vue';

interface Props {
  isActive: boolean
  address: string
  text1: string
  text2?: string
  phone: string
}

const props = defineProps<Props>()

</script>

<template>
  <div
    :class="props.isActive ? 'border-green-600' : '' "
    class="hover:bg-gray-50 w-full gap-3 flex justify-center flex-col items-start border border-solid border-gray-300 p-6 rounded-2xl">
    <div class="text-zinc-950 leading-6 self-stretch">
      {{ props.address }}
    </div>
    <div class="min-[1430px]:flex-nowrap gap-1 font-medium leading-5 text-gray-600 text-sm flex flex-wrap items-center">
      <div class="gap-3 flex flex-col items-start">
        <div>{{ props.text1 }}</div>
        <div v-if="props.text2">{{ props.text2 }}</div>
      </div>
    </div>
    <div class="min-[1430px]:flex-nowrap gap-2 flex flex-wrap items-center">
      <div class="h-5 w-5">
        <IconPhone />
      </div>
      <a :href="'tel:' + props.phone" class="text-zinc-950 leading-5 text-sm">
        {{ props.phone }}
      </a>
      <div
        class="cursor-pointer border-zinc-300 p-[3px] flex justify-center h-6 w-6 flex-col bg-white items-center border border-solid rounded-full">
        <div class="h-4 w-4">
          <IconDots />
        </div>
      </div>
    </div>
    <div class="min-[1430px]:flex-nowrap gap-2 flex flex-wrap items-center cursor-pointer">
      <div class="h-5 w-5">
        <IconPin />
      </div>
      <div class="leading-5 text-green-700 text-sm">
        Построить
        маршрут
      </div>
    </div>
  </div>
</template>