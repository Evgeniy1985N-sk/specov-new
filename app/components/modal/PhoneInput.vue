<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import IMask from 'imask'

const props = defineProps<{
  modelValue: string
   hasError?: boolean 
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'blur', event: FocusEvent): void
}>()

const inputRef = ref<HTMLInputElement | null>(null)
let mask: any = null

onMounted(() => {
  if (!inputRef.value) return

  mask = IMask(inputRef.value, {
    mask: '+{7} (000) 000-00-00',
    lazy: true
  })

  // Сразу устанавливаем значение из modelValue
  if (props.modelValue) {
    mask.unmaskedValue = props.modelValue
  }

  mask.on('accept', () => {
    const unmasked = mask.unmaskedValue || ''
    emit('update:modelValue', unmasked)
  })
})

// Реакция на внешние изменения (например, сброс формы)
watch(
  () => props.modelValue,
  (newVal) => {
    if (mask && mask.unmaskedValue !== newVal) {
      mask.unmaskedValue = newVal
    }
  }
)

function handleBlur(event: FocusEvent) {
  emit('blur', event)
}

onBeforeUnmount(() => {
  mask?.destroy()
})
</script>

<template>
  <input ref="inputRef" type="tel"
  :class="props.hasError ? 'ring-red-500! ' : '' "
    class="border-0 appearance-none placeholder:text-dimmed min-h-10 focus:outline-none disabled:cursor-not-allowed disabled:opacity-75 transition-colors bg-default ring ring-inset ring-accented px-3 py-2 gap-2 w-full ring-gray-300! text-gray-900 font-semibold rounded-lg focus-visible:ring-2 text-sm focus-visible:ring-inset focus-visible:ring-inverted"
    placeholder="" 
    @blur="handleBlur" />

</template>

<style scoped>
  input {
    --ui-bg: white;
  }
</style>