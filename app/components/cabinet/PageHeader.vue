<script setup lang="ts">
interface Props {
  title: string
  backTo?: string
  backText?: string
  addButtonText?: string
  addButtonBreakpoint?: string
  addButtonClass?: string
  addButtonIcon?: string
  showNotifications?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showNotifications: true,
  addButtonBreakpoint: 'min-[534px]:inline'
})

const emit = defineEmits<{
  back: []
  add: []
  notifications: []
}>()

const handleBack = () => {
  emit('back')
}

const handleAdd = () => {
  emit('add')
}

const handleNotifications = () => {
  emit('notifications')
}
</script>

<template>
  <div class="flex items-center justify-between gap-2">
    <div class="flex items-center gap-3">
      <NuxtLink
        v-if="backTo"
        :to="backTo"
        class="xl:hidden flex items-center gap-2 rounded-lg transition-colors border border-(--border) p-3 max-[510px]:p-2 bg-(--Base-White) cursor-pointer"
      >
        <img src="/image/cabinet/arrow-right.svg" alt="" class="rotate-180">
        <span v-if="backText" class="text-sm font-medium text-(--Text-950)">{{ backText }}</span>
      </NuxtLink>
      <button
        v-else
        @click="handleBack"
        class="xl:hidden flex items-center gap-2 rounded-lg transition-colors border border-(--border) p-3 max-[510px]:p-2 bg-(--Base-White) cursor-pointer"
      >
        <img src="/image/cabinet/arrow-right.svg" alt="" class="rotate-180">
        <span v-if="backText" class="text-sm font-medium text-(--Text-950)">{{ backText }}</span>
      </button>
      <h1 class="text-2xl font-regular text-(--Text-950) font-['Russo_One']">{{ title }}</h1>
    </div>
    <div v-if="addButtonText || showNotifications" class="flex items-center gap-3">
      <button
        v-if="addButtonText"
        @click="handleAdd"
        :class="[
          'flex items-center gap-2 bg-(--Brand-950) text-white text-sm font-semibold rounded-lg hover:bg-(--Brand-700) transition-colors cursor-pointer max-[510px]:p-2',
          addButtonClass || 'px-4 py-2.5'
        ]"
      >
        <template v-if="addButtonIcon">
          <svg class="min-[510px]:hidden" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 4.16667V15.8333M4.16667 10H15.8333" stroke="currentColor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <img :src="addButtonIcon" alt="" class="hidden min-[510px]:block w-5 h-5 brightness-0 invert">
        </template>
        <svg v-else width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 4.16667V15.8333M4.16667 10H15.8333" stroke="currentColor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span :class="['hidden', addButtonBreakpoint]">{{ addButtonText }}</span>
      </button>
      <button
        v-if="showNotifications"
        @click="handleNotifications"
        class="rounded-lg transition-colors border border-(--border) p-3 max-[510px]:p-2 bg-(--Base-White) cursor-pointer"
      >
        <img src="/image/cabinet/bell.svg" alt="">
      </button>
    </div>
  </div>
</template>
