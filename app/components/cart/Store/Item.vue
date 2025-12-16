<script setup lang="ts">


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
  <div class="flex flex-col gap-6">

    <p class="font-bold text-black">
      Выбранный магазин
    </p>

    <div class="grid gap-3">

      <div class="font-semibold">
        {{ props.address }}
      </div>

      <div class="gap-3 flex flex-col items-start">
        <span class="text-sm leading-5 text-gray-950">{{ props.text1 }}</span>
      </div>

      <div class="flex gap-2 items-center">
        <WrapIcon class="h-5 w-5">
          <CartIconPhone />
        </WrapIcon>
        <a :href="'tel:' + props.phone" class="text-zinc-950 leading-5 text-sm">
          {{ props.phone }}
        </a>
        <div
          class="cursor-pointer border-zinc-300 p-[3px] flex justify-center h-6 w-6 flex-col bg-white items-center border border-solid rounded-full">
          <WrapIcon class="w-5 h-5">
            <CartIconDots />
          </WrapIcon>
        </div>
      </div>
    </div>

    <div class="grid gap-1">
      <span class="text-sm leadomg-5 font-medium">
        Забрать заказ можно:
      </span>
      <p class="text-sm leadomg-5 text-gray-950 font-bold">
        Сегодня после 16:00
      </p>
    </div>

    <UButton
      class="flex w-fit items-center justify-center h-10 cursor-pointer rounded-lg bg-white! border border-(--border) text-(--Brand-950) px-4"
      color="neutral">Изменить магазин
    </UButton>

  </div>
</template>