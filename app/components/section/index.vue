<script setup lang="ts">
interface Props {
  class?: string
}
const props = defineProps<Props>()
</script>


<template>
  <section :class="props.class" class="my-(--section-indent) relative overflow-hidden">
    <slot />
  </section>
</template>