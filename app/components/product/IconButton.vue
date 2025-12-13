<script setup lang="ts">

interface Color {
  hoverColor?: string
}

const props = defineProps<Color>()

</script>


<template>
  <button
    :class="props.hoverColor || 'hover:text-(--Brand-700)'"
    class="flex justify-center items-center bg-white text-(--Brand-950) transition shadow-[0_1px_3px_0_rgba(10,13,18,0.10),0_1px_2px_-1px_rgba(10,13,18,0.10)] p-2 rounded-full cursor-pointer">
    <div class="h-5 w-5">
      <slot />
    </div>
  </button>
</template>