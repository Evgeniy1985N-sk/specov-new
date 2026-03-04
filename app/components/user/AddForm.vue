<script setup lang="ts">
import IMask from 'imask'

const emit = defineEmits<{
  cancel: []
  submit: [data: { fullName: string; phone: string; email: string; seesOnlyOwnOrders: boolean }]
}>()

const formData = reactive({
  fullName: '',
  phone: '',
  email: '',
  seesOnlyOwnOrders: false
})

const phoneInputRef = ref<HTMLInputElement | null>(null)
let phoneMask: ReturnType<typeof IMask> | null = null

const isFormValid = computed(() => {
  return formData.fullName.trim() !== '' && 
         formData.phone.length >= 18 && 
         formData.email.trim() !== ''
})

const handleCancel = () => {
  emit('cancel')
}

const handleSubmit = () => {
  if (!isFormValid.value) return
  emit('submit', { ...formData })
}

onMounted(() => {
  if (phoneInputRef.value) {
    phoneMask = IMask(phoneInputRef.value, {
      mask: '+7 (000) 000-00-00'
    })
    phoneMask.on('accept', () => {
      formData.phone = phoneMask?.value || ''
    })
  }
})

onBeforeUnmount(() => {
  if (phoneMask) {
    phoneMask.destroy()
    phoneMask = null
  }
})
</script>

<template>
  <div class="flex flex-col gap-6 w-full min-[1280px]:max-w-[590px]">
    <button
      @click="handleCancel"
      class="flex items-center gap-2 transition-colors cursor-pointer self-start"
    >
      <img src="/image/cabinet/chevron-left.svg" alt="">
      <span class="text-sm font-semibold text-(--Text-600)">Все пользователи</span>
    </button>

    <h1 class="text-2xl font-regular text-(--Text-950) font-['Russo_One']">Добавить нового пользователя</h1>

    <div class="bg-(--Base-White) rounded-xl p-5">
      <div class="flex flex-col gap-4">
        <div>
          <label class="text-sm text-(--Text-600) font-medium mb-2 block">ФИО</label>
          <input
            v-model="formData.fullName"
            type="text"
            class="w-full px-4 py-2.5 border border-(--border) rounded-lg bg-(--Base-White) text-(--Text-950) text-sm focus:outline-none focus:border-(--Brand-600)"
          >
        </div>

        <div>
          <label class="text-sm text-(--Text-600) font-medium mb-2 block">Телефон</label>
          <input
            ref="phoneInputRef"
            type="tel"
            class="w-full px-4 py-2.5 border border-(--border) rounded-lg bg-(--Base-White) text-(--Text-950) text-sm focus:outline-none focus:border-(--Brand-600)"
          >
        </div>

        <div>
          <label class="text-sm text-(--Text-600) font-medium mb-2 block">Email</label>
          <input
            v-model="formData.email"
            type="email"
            required
            class="w-full px-4 py-2.5 border border-(--border) rounded-lg bg-(--Base-White) text-(--Text-950) text-sm focus:outline-none focus:border-(--Brand-600)"
          >
        </div>

        <div class="flex items-center gap-3">
          <label class="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              v-model="formData.seesOnlyOwnOrders"
              class="sr-only peer"
            >
            <div class="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-(--Brand-600)"></div>
          </label>
            <span class="text-base font-semibold text-(--Text-950)">Видит только свои заказы</span>
        </div>

        <button
          @click="handleSubmit"
          :disabled="!isFormValid"
          :class="[
            'px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors max-[510px]:w-full min-[510px]:w-[104px]',
            isFormValid 
              ? 'bg-(--Brand-950) text-white hover:bg-(--Brand-700) cursor-pointer' 
              : 'bg-(--Background) text-(--Text-600) cursor-not-allowed'
          ]"
        >
          Создать
        </button>
      </div>
    </div>
  </div>
</template>

