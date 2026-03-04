<script setup lang="ts">
import type { ContactData } from '~/types/cabinet'
import ModalEditContact from '@/components/Modal/EditContact.vue'

interface Props {
  contactData: ContactData
  contactPersonLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  contactPersonLabel: 'Контактное лицо'
})

const emit = defineEmits<{
  editPhone: []
  editEmail: []
  getCode: [value: string]
  success: []
}>()

const editContactModalRef = ref<InstanceType<typeof ModalEditContact> | null>(null)
const editModalType = ref<'sms' | 'email'>('sms')
const editModalCurrentValue = ref('')
const editContactModalId = 'edit-contact-modal'

const handleEditPhone = () => {
  editModalType.value = 'sms'
  editModalCurrentValue.value = props.contactData.phone
  editContactModalRef.value?.openModal()
  emit('editPhone')
}

const handleEditEmail = () => {
  editModalType.value = 'email'
  editModalCurrentValue.value = props.contactData.email
  editContactModalRef.value?.openModal()
  emit('editEmail')
}

const handleGetCode = (value: string) => {
  emit('getCode', value)
}

const handleSuccess = () => {
  emit('success')
}
</script>

<template>
  <div class="bg-(--Base-White) rounded-xl p-5">
    <div class="flex items-center gap-3 mb-5">
      <div class="w-10 h-10 bg-(--Background) rounded-lg flex items-center justify-center">
        <img src="/image/cabinet/user-square.svg" alt="">
      </div>
      <h3 class="text-lg font-bold text-(--Text-950)">Контактные данные</h3>
    </div>

    <div class="flex flex-col gap-4">
      <div>
        <label class="text-sm text-(--Text-600) mb-2 block">{{ contactPersonLabel }}</label>
        <div class="relative">
          <input
          type="text"
          :value="contactData.contactPerson"
          readonly
          class="w-full px-4 py-2.5 border border-(--border) rounded-lg bg-(--Base-White) text-(--Text-950) text-sm"
        >
        <button
            @click=""
            class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center cursor-pointer"
          >
            <img src="/image/cabinet/edit.svg" alt="">
          </button>
        </div>
      </div>

      <div>
        <label class="text-sm text-(--Text-600) mb-2 block">Телефон</label>
        <div class="relative">
          <input
            type="tel"
            :value="contactData.phone"
            readonly
            class="w-full px-4 py-2.5 pr-12 border border-(--border) rounded-lg bg-(--Base-White) text-(--Text-950) text-sm"
          >
          <button
            @click="handleEditPhone"
            class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center cursor-pointer"
          >
            <img src="/image/cabinet/edit.svg" alt="">
          </button>
        </div>
      </div>

      <div>
        <label class="text-sm text-(--Text-600) mb-2 block">Email</label>
        <div class="relative">
          <input
            type="email"
            :value="contactData.email"
            readonly
            class="w-full px-4 py-2.5 pr-12 border border-(--border) rounded-lg bg-(--Base-White) text-(--Text-950) text-sm"
          >
          <button
            @click="handleEditEmail"
            class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center cursor-pointer"
          >
            <img src="/image/cabinet/edit.svg" alt="">
          </button>
        </div>
      </div>
    </div>

    <ModalEditContact
      :id="editContactModalId"
      ref="editContactModalRef"
      :type="editModalType"
      :current-value="editModalCurrentValue"
      @get-code="handleGetCode"
      @success="handleSuccess"
    />
  </div>
</template>

