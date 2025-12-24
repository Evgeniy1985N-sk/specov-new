<script setup lang="ts">
interface Props {
  classWrap?: string
  classText?: string
  text?: string
}
const props = defineProps<Props>()
</script>

<template>
  <div :class="props.classWrap" class="flex items-center gap-2">
    <WrapIcon class="w-9 h-9">
      <ModalIconArrowLeft />
    </WrapIcon>
    <p v-if="props.text" :classWrap="props.classText" class="text-[24px] leading-8 font-['Russo_One'] text-black">
      {{ props.text }}
    </p>
  </div>
</template>