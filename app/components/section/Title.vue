<script setup lang="ts">
interface Props {
  text: string
}
const props = defineProps<Props>()

</script>


<template>
  <div class="text-[24px] leading-8 sm:text-4xl sm:leading-11 text-zinc-950 font-['Russo_One']">
    {{ props.text }}
  </div>
</template>