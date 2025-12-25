<script setup lang="ts">
const emit = defineEmits(['handleClick'])
interface Props {
  classWrap?: string
  classWrapIcon?: string
  classText?: string
  text?: string
  isIcon?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  isIcon: true
})
</script>

<template>
  <div @click="$emit('handleClick')" :class="props.classWrap" class="flex items-center gap-2 w-fit cursor-pointer">
    <WrapIcon v-if="props.isIcon" class="w-9 h-9" :class="props.classWrapIcon">
      <ModalIconArrowLeft />
    </WrapIcon>
    <p v-if="props.text" :classWrap="props.classText" class="text-[24px] leading-8 font-['Russo_One'] text-black">
      {{ props.text }}
    </p>
  </div>
</template>