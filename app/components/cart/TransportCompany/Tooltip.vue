<script setup lang="ts">
import WrapIcon from '~/components/WrapIcon.vue';

interface Props {
  title: string
  message: string
  class?: string
  classTitle?: string
  classMessage?: string
}
const props = defineProps<Props>()

</script>



<template>
  <div :class="props.class" class="flex items-center gap-2">

    <p :class="props.classTitle" class="text-sm leading-5 font-medium text-center sm:text-left">
      {{ props.title }}
    </p>

    <div class="item relative">
      <WrapIcon class="hover:text-(--Brand-700) cursor-pointer transition-colors">
        <CartIconMarkInCircle />
      </WrapIcon>

      <div
        class="item__popup absolute bottom-[calc(100%+12px)] left-1/2 -translate-x-1/2 z-10 inline-block min-w-[188px] opacity-0 transition-opacity invisible">

        <div class="grid gap-4 popup-with-arrow bg-white rounded-xl shadow-xl py-2 px-3">
          <p :class="props.classMessage" class="text-xs leading-[18px] font-semibold text-left text-gray-700">{{ props.message }}</p>
        </div>

      </div>

    </div>

  </div>
</template>

<style scoped>
.item:hover .item__popup {
  visibility: visible;
  opacity: 1;
}
.popup-with-arrow::before {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 8px 8px 0 8px;
  border-color: white transparent transparent transparent;
  filter: drop-shadow(0 2px 1px rgba(0, 0, 0, 0.05));
}
</style>