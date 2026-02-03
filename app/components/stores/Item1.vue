<script setup lang="ts">
import IconPin from './icon/Pin.vue';

interface Props {
  address: string
  text1: string
  text2?: string
  phone: string
  phoneModal1: string
  phoneModal2: string
}

const props = defineProps<Props>()

</script>

<template>
  <div class="grid gap-4 sm:gap-6">

    <div class="text-gray-950 text-[18px] leading-7 sm:text-[24px] sm:leading-8 font-['Russo_One'] self-stretch w-fit">
      {{ props.address }}
    </div>

    <div class="grid">
      <span class="text-sm sm:text-base font-medium">Режим работы</span>
      <div class="grid gap-2 text-gray-950 sm:text-lg sm:leading-7 font-bold">
        <p>{{ props.text1 }}</p>
        <p v-if="props.text2">{{ props.text2 }}</p>
      </div>
    </div>

    <div class="grid">
      <span class="text-sm sm:text-base font-medium">
        Телефоны
      </span>
      <StoresPhone class-phone="text-base! sm:text-lg! sm:leading-7! font-bold" :phone="props.phone"
        :phone-modal1="props.phoneModal1" :phone-modal2="props.phoneModal2" />
    </div>

    <div class="gap-2 flex flex-wrap items-center cursor-pointer">
      <WrapIcon class="w-6 h-6 sm:w-7 sm:h-7">
        <IconPin />
      </WrapIcon>
      <div class="text-green-700 sm:text-lg sm:leading-7 font-bold">
        Построить
        маршрут
      </div>
    </div>
  </div>
</template>