<script setup lang="ts">
import { onBeforeUnmount, watch, nextTick } from 'vue'
import IMask from 'imask'

interface Props {
  id: string
  type: 'sms' | 'email'
  currentValue: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  close: []
  getCode: [value: string]
  success: []
}>()

const dialogRef = ref<HTMLDialogElement | null>(null)
const formRef = ref<HTMLFormElement | null>(null)
const phoneInputRef = ref<HTMLInputElement | null>(null)

const formData = reactive({
  value: '',
  code: ''
})

const codeSent = ref(false)
const countdown = ref(60)
let countdownTimer: ReturnType<typeof setInterval> | null = null
let phoneMask: any = null

const canResendCode = computed(() => codeSent.value && countdown.value <= 0)
const canConfirm = computed(() => codeSent.value && formData.code.length > 0)

const initPhoneMask = () => {
  if (!phoneInputRef.value || props.type !== 'sms') return
  
  phoneMask = IMask(phoneInputRef.value, {
    mask: '+{7} (000) 000-00-00',
    lazy: false
  })
  
  phoneMask.on('accept', () => {
    const unmasked = phoneMask.unmaskedValue || ''
    formData.value = unmasked
  })
}

const destroyPhoneMask = () => {
  if (phoneMask) {
    phoneMask.destroy()
    phoneMask = null
  }
}

watch(
  () => formData.value,
  (newVal) => {
    if (phoneMask && phoneMask.unmaskedValue !== newVal && props.type === 'sms') {
      phoneMask.unmaskedValue = newVal
    }
  }
)

const openModal = () => {
  formData.value = ''
  formData.code = ''
  codeSent.value = false
  countdown.value = 60
  if (countdownTimer) {
    clearInterval(countdownTimer)
    countdownTimer = null
  }
  dialogRef.value?.showModal()
  
  nextTick(() => {
    initPhoneMask()
  })
}

const closeModal = () => {
  dialogRef.value?.close()
}

defineExpose({
  openModal,
  closeModal
})

const startCountdown = () => {
  countdown.value = 60
  if (countdownTimer) {
    clearInterval(countdownTimer)
  }
  countdownTimer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      if (countdownTimer) {
        clearInterval(countdownTimer)
        countdownTimer = null
      }
    }
  }, 1000)
}

const handleResendCode = () => {
  formData.code = ''
  countdown.value = 60
  if (countdownTimer) {
    clearInterval(countdownTimer)
    countdownTimer = null
  }
  emit('getCode', formData.value)
  codeSent.value = true
  startCountdown()
}

const handleClose = () => {
  closeModal()
}

const handleGetCode = (e: Event) => {
  e.preventDefault()
  if (!formRef.value) return
  
  if (!formRef.value.checkValidity()) {
    formRef.value.reportValidity()
    return
  }
  
  emit('getCode', formData.value)
  codeSent.value = true
  startCountdown()
}

const handleConfirm = () => {
  // TODO: Implement actual code verification logic
  emit('success')
  closeModal()
}

const handleBackdropClick = (event: MouseEvent) => {
  if (event.target === dialogRef.value) {
    handleClose()
  }
}

const handleDialogClose = () => {
  if (countdownTimer) {
    clearInterval(countdownTimer)
    countdownTimer = null
  }
  destroyPhoneMask()
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur()
  }
  emit('close')
}

onBeforeUnmount(() => {
  if (countdownTimer) {
    clearInterval(countdownTimer)
  }
  destroyPhoneMask()
})
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

      <div class="flex flex-col items-start mb-6 pr-8">
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
          {{ type === 'sms' ? 'Введите новый номер телефона' : 'Введите новый email' }}
        </h2>
      </div>

      <form ref="formRef" @submit="handleGetCode">
        <div class="flex flex-col gap-4 mb-6">
          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium text-(--Text-600)">
              {{ type === 'sms' ? 'Номер телефона' : 'Email' }}
            </label>
            <input
              v-if="type === 'sms'"
              ref="phoneInputRef"
              type="tel"
              required
              placeholder="+7 (999) 999-99-99"
              :disabled="codeSent && !canResendCode"
              class="w-full px-4 py-3 border border-(--border) rounded-lg text-sm text-(--Text-950) focus:outline-none focus:border-(--Brand-600) disabled:bg-(--Background) disabled:cursor-not-allowed"
            >
            <input
              v-else
              v-model="formData.value"
              type="email"
              required
              :disabled="codeSent && !canResendCode"
              class="w-full px-4 py-3 border border-(--border) rounded-lg text-sm text-(--Text-950) focus:outline-none focus:border-(--Brand-600) disabled:bg-(--Background) disabled:cursor-not-allowed"
            >
          </div>

          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium text-(--Text-600)">Код из смс</label>
            <input
              v-model="formData.code"
              type="text"
              :required="codeSent"
              class="w-full px-4 py-3 border border-(--border) rounded-lg text-sm text-(--Text-950) focus:outline-none focus:border-(--Brand-600)"
            >
          </div>
        </div>

        <div v-if="codeSent && !canResendCode" class="mb-6">
          <div class="flex items-start gap-2 mb-2">
            <img 
              src="/image/cabinet/info-circle.svg" 
              alt="" 
              class="w-5 h-5 mt-0.5 shrink-0"
            >
            <p class="text-sm text-(--Text-950)">
              Мы отправили код на ваш {{ type === 'sms' ? 'номер телефона' : 'email' }}
            </p>
          </div>
          <p class="text-sm text-(--Text-600) ml-7">
            Получить новый код можно через {{ countdown }} {{ countdown === 1 ? 'секунду' : countdown < 5 ? 'секунды' : 'секунд' }}
          </p>
        </div>

        <button
          v-if="!codeSent"
          type="submit"
          class="w-full px-4 py-3 bg-(--Brand-950) text-white text-sm font-semibold rounded-lg hover:bg-(--Brand-700) transition-colors cursor-pointer"
        >
          Получить код
        </button>

        <button
          v-if="canResendCode"
          type="button"
          @click="handleResendCode"
          class="w-full px-4 py-3 bg-(--Brand-950) text-white text-sm font-semibold rounded-lg hover:bg-(--Brand-700) transition-colors cursor-pointer"
        >
          Отправить код повторно
        </button>

        <button
          v-if="canConfirm"
          type="button"
          @click="handleConfirm"
          class="w-full px-4 py-3 bg-(--Brand-950) text-white text-sm font-semibold rounded-lg hover:bg-(--Brand-700) transition-colors cursor-pointer mt-3"
        >
          Подтвердить
        </button>
      </form>
    </div>
  </dialog>
</template>

<style scoped>
dialog::backdrop {
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}
</style>

