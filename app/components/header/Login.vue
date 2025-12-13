<script setup lang="ts">
interface Props {
  class?: string
}
const props = defineProps<Props>()
</script>

<template>
  <div :class="props.class">
    <UModal>
      <UButton
        class="bg-gray-100 hover:bg-gray-200 active:bg-neutral-300 border-zinc-300 py-[9px] px-[15px] gap-2 flex justify-center items-center border border-solid rounded-lg cursor-pointer">
        <template #leading>
          <span class="h-5 w-5">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5 14.1667C5 14.9416 5 15.3291 5.08519 15.647C5.31635 16.5098 5.99022 17.1836 6.85295 17.4148C7.17087 17.5 7.55836 17.5 8.33333 17.5H13.5C14.9001 17.5 15.6002 17.5 16.135 17.2275C16.6054 16.9878 16.9878 16.6054 17.2275 16.135C17.5 15.6002 17.5 14.9001 17.5 13.5V6.5C17.5 5.09987 17.5 4.3998 17.2275 3.86502C16.9878 3.39462 16.6054 3.01217 16.135 2.77248C15.6002 2.5 14.9001 2.5 13.5 2.5H8.33333C7.55836 2.5 7.17087 2.5 6.85295 2.58519C5.99022 2.81635 5.31635 3.49022 5.08518 4.35295C5 4.67087 5 5.05836 5 5.83333M10 6.66667L13.3333 10M13.3333 10L10 13.3333M13.3333 10H2.5"
                stroke="#053628" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
          <div class="text-emerald-950 font-semibold text-base"> Войти </div>
        </template>
      </UButton>

      <template #content>
        <form action="">
          <h2>form</h2>
          <input type="text">
          <input type="text">
        </form>
      </template>
    </UModal>
  </div>

</template>