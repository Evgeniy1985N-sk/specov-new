<script setup lang="ts">
const emit = defineEmits(['handle-clik'])

</script>

<template>
  <button @click="$emit('handle-clik')" class="cursor-pointer absolute top-2 right-2">
    <WrapIcon class="w-9 h-9">
      <ModalIconClose />
    </WrapIcon>
  </button>
</template>