<script setup lang="ts">

const props = defineProps<{
  title: string
  modelValue?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const isOpen = ref(props.modelValue ?? false)

watch(() => props.modelValue, (newValue) => {
  isOpen.value = newValue ?? false
})

function toggle() {
  isOpen.value = !isOpen.value
  emit('update:modelValue', isOpen.value)
}
</script>

<template>
  <div class="border border-gray-200 rounded-lg p-4">
    <button class="flex justify-between w-full cursor-pointer" @click="toggle" :aria-expanded="isOpen">
      <span class="text-[18px] leading-7 font-bold text-gray-950 text-left">
        {{ title }}
      </span>
      <wrap-icon :class="isOpen ? 'rotate-180' : '' ">
        <ServiceIconCheckMin />
      </wrap-icon>
    </button>
    <div v-show="isOpen" class="mt-4 text-[18px] leading-7 font-medium">
      <slot />
    </div>
  </div>
</template>

<style scoped></style>