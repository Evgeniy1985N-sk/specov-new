<script setup lang="ts">
interface Props {
  goods: number
}
const props = defineProps<Props>()

</script>



<template>
  <div class="absolute top-[30%] left-4 sm:left-full inline-block min-w-[196px]">

    <div class="grid gap-4 popup-with-arrow bg-white border border-gray-200 rounded-xl shadow-xl p-4 max-w-xs">
      <p class="text-sm font-semibold text-center text-gray-950">Подобрано товаров: {{ props.goods }}</p>
      <UButton class="shrink-0 gap-1 px-4 min-h-10">
        <span class="text-sm leading-5">
          Показать
        </span>
      </UButton>
    </div>

  </div>
</template>

<style scoped>
.popup-with-arrow::before {
  content: '';
  position: absolute;
  top: 50%;
  left: -7px;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 8px 8px 8px 0;
  border-color: transparent white transparent transparent;
  filter: drop-shadow(-2px 0 1px rgba(0, 0, 0, 0.05));
}
</style>