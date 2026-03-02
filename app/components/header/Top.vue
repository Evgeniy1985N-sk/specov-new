<script setup lang="ts">
interface Props {
  class?: string
}
const props = defineProps<Props>()
</script>


<template>
  <!-- top -->
  <div :class="props.class" class="hidden lg:block bg-gray-100 w-full">
    <div class="max-w-(--container) m-auto px-4 gap-1 self-stretch items-center 
      justify-between flex-wrap flex py-1.5">

      <!-- left -->
      <HeaderNav />

      <!-- right -->
      <HeaderPhone />

    </div>
  </div>
</template>