<script setup lang="ts">
interface Props {
  id: string
  type: 'sms' | 'email'
  value: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  close: []
  confirm: []
}>()

const dialogRef = ref<HTMLDialogElement | null>(null)

const openModal = () => {
  dialogRef.value?.showModal()
}

const closeModal = () => {
  dialogRef.value?.close()
}

defineExpose({
  openModal,
  closeModal
})

const handleClose = () => {
  closeModal()
}

const handleConfirm = () => {
  emit('confirm')
  closeModal()
}

const handleBackdropClick = (event: MouseEvent) => {
  if (event.target === dialogRef.value) {
    handleClose()
  }
}

const handleDialogClose = () => {
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur()
  }
  emit('close')
}
</script>

<template>
  <dialog
    :id="id"
    ref="dialogRef"
    class="p-0 rounded-xl border-0 shadow-xl backdrop:bg-black/50 backdrop:backdrop-blur-sm max-w-md w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-[510px]:w-[calc(100%-40px)] max-[510px]:max-w-none"
    @click="handleBackdropClick"
    @close="handleDialogClose"
  >
    <div class="bg-white rounded-xl p-6 relative">
      <button
        @click="handleClose"
        class="absolute top-6 right-6 w-6 h-6 flex items-center justify-center hover:bg-(--Background) rounded transition-colors"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.8335 0.833313L0.833496 10.8333M0.833496 0.833313L10.8335 10.8333" stroke="#535862" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>

      <div class="flex flex-col items-start mb-4 pr-8">
        <div class="w-10 h-10 flex items-center justify-center mb-3">
          <img 
            v-if="type === 'sms'"
            src="/image/cabinet/phone-call.svg" 
            alt="" 
            class="w-10 h-10"
            style="filter: brightness(0) saturate(100%) invert(20%) sepia(98%) saturate(1234%) hue-rotate(120deg) brightness(95%) contrast(85%);"
          >
          <img 
            v-else
            src="/image/cabinet/mail.svg" 
            alt="" 
           class="w-10 h-10"
            style="filter: brightness(0) saturate(100%) invert(20%) sepia(98%) saturate(1234%) hue-rotate(120deg) brightness(95%) contrast(85%);"
          >
        </div>
        <h2 class="text-2xl font-regular text-(--Text-950) font-['Russo_One']">
          {{ type === 'sms' ? 'Применить номер телефона ко всем адресам?' : 'Применить email ко всем адресам?' }}
        </h2>
      </div>

      <p class="text-base text-(--Text-950) mb-6">
        {{ type === 'sms' ? 'Номер телефона' : 'Email' }} 
        <span class="font-bold">{{ value }}</span> 
        будет применён ко всем подтвержденным адресам.
      </p>

      <div class="flex flex-col max-[510px]:flex-col min-[510px]:flex-row gap-3">
        <button
          @click="handleConfirm"
          class="flex-1 px-4 py-3 bg-(--Brand-950) text-white text-sm font-semibold rounded-lg hover:bg-(--Brand-700) transition-colors cursor-pointer"
        >
          Применить
        </button>
        <button
          @click="handleClose"
          class="flex-1 px-4 py-3 border border-(--border) bg-white text-(--Brand-950) text-sm font-semibold rounded-lg hover:bg-(--Background) transition-colors cursor-pointer"
        >
          Отмена
        </button>
      </div>
    </div>
  </dialog>
</template>

<style scoped>
dialog::backdrop {
  background: #000000;
  opacity: 0.2;
}
</style>

