<script setup lang="ts">
interface Props {
  link: string
  text: string
}
const props = defineProps<Props>()
</script>

<template>
  <a :href="props.link"
    class="flex gap-1.5 items-center text-sm leading-5 cursor-pointer text-gray-600 transition hover:text-(--Brand-700)">
    {{ props.text }}
    <i class="flex items-center justify-center w-5 h-5">
      <ProductIconAng />
    </i>
  </a>
</template>