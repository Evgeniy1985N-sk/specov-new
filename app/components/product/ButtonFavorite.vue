<script setup lang="ts">
interface Props {
  class?: string
  date?: string
}
const props = defineProps<Props>()
const isActive = ref(false)
</script>

<template>

  <UModal :ui="{ content: 'gap-0' }">

    <button :class="props.class" @click="isActive = !isActive"
      class="flex justify-center hover:text-(--Brand-700) items-center bg-white text-(--Brand-950) transition shadow-[0_1px_3px_0_rgba(10,13,18,0.10),0_1px_2px_-1px_rgba(10,13,18,0.10)] p-2 rounded-full cursor-pointer">
      <div class="h-5 w-5">
        <svg width="100%" height="100%" style="overflow: visible;" preserveAspectRatio="none" viewBox="0 0 20 20"
          :fill="isActive ? '#F04438' : 'none' " xmlns="http://www.w3.org/2000/svg">
          <path
            d="M13.426 2.5C16.3612 2.5 18.3334 5.29375 18.3334 7.9C18.3334 13.1781 10.1482 17.5 10.0001 17.5C9.85193 17.5 1.66675 13.1781 1.66675 7.9C1.66675 5.29375 3.63897 2.5 6.57416 2.5C8.25934 2.5 9.36119 3.35312 10.0001 4.10312C10.639 3.35312 11.7408 2.5 13.426 2.5Z"
            :stroke="isActive ? '#F04438' : 'currentColor' " stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
      </div>
    </button>

    <template #body>

      <div class="grid gap-6">
        <div class="grid gap-2">
          <div class="text-[18px] leading-7 text-black font-bold">Список избранного</div>
          <p class="font-medium">
            Войдите в профиль, чтобы сохранить список. Если этого не сделать, он удалится {{props.date}}
          </p>
        </div>
        <UButton size="xl" type="submit">
          Войти в профиль
        </UButton>
      </div>

    </template>

  </UModal>

</template>
