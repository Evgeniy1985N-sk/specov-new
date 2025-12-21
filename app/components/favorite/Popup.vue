<script setup lang="ts">
interface Props {
  class?: string
  date: string
}
const props = defineProps<Props>()

const emit = defineEmits(['closePopup'])
</script>

<template>
  <div :class="props.class" class="flex sm:items-center gap-2 rounded-xl border border-gray-200 p-2">

    <span class="flex items-center justify-center shrink-0 w-[35px] h-[35px] border-2 border-[rgba(220,104,3,0.1)] rounded-full">
      <span
        class="flex items-center justify-center w-[25px] h-[25px] border-2 border-[rgba(220,104,3,0.3)] rounded-full">
        <!-- <FavoriteIconMark /> -->
        <span class="flex items-center justify-center w-[17px] h-[17px] border-2 border-[#DC6803] rounded-full text-[#DC6803] font-bold text-[11px]">
          !
        </span>
      </span>
    </span>
    <p class="text sm leading-5 text-gray-700">
      <NuxtLink to="/cabinet" class="text-(--Brand-700) font-semibold">
        Войдите в личный кабинет
      </NuxtLink>, чтобы сохранить список избранного. Если этого не сделать, он автоматически удалится
      {{ props.date }}
    </p>
    <button @click="$emit('closePopup')" class="cursor-pointer ml-auto">
      <WrapIcon class="w-9 h-9">
        <FavoriteIconCross />
      </WrapIcon>
    </button>

  </div>
</template>