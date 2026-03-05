<script setup lang="ts">
interface Props {
  show: boolean
  text: string
  icon?: string
  duration?: number
}

const props = withDefaults(defineProps<Props>(), {
  icon: '/image/sidebar/marker.svg',
  duration: 3000
})

const emit = defineEmits<{
  close: []
}>()

let timeoutId: ReturnType<typeof setTimeout> | null = null

watch(() => props.show, (newValue) => {
  if (newValue && props.duration > 0) {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      emit('close')
    }, props.duration)
  } else if (timeoutId) {
    clearTimeout(timeoutId)
    timeoutId = null
  }
})

onUnmounted(() => {
  if (timeoutId) {
    clearTimeout(timeoutId)
    timeoutId = null
  }
})
</script>

<template>
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0 translate-y-4"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition-all duration-300 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-4"
  >
    <div
      v-if="show"
      class="fixed left-6 bottom-6 max-[1024px]:bottom-26 max-[510px]:left-0 max-[510px]:right-0 max-[510px]:bottom-21.5 max-[510px]:w-full max-[510px]:px-4 z-2"
    >
      <div class="flex items-center max-[510px]:justify-center gap-3 p-6 bg-(--Brand-700) text-white rounded-lg shadow-lg">
        <img :src="icon" alt="" class="w-5 h-5 brightness-0 invert">
        <span class="text-sm font-medium max-[510px]:text-center">{{ text }}</span>
      </div>
    </div>
  </Transition>
</template>

