<script setup lang="ts">
import type { PasswordData } from '~/types/cabinet'

interface Props {
  passwordData: PasswordData
}

const props = defineProps<Props>()

const emit = defineEmits<{
  update: [data: PasswordData]
  save: []
}>()

const localPasswordData = reactive<PasswordData>({
  currentPassword: props.passwordData.currentPassword,
  newPassword: props.passwordData.newPassword,
  confirmPassword: props.passwordData.confirmPassword
})

watch(() => props.passwordData, (newData) => {
  localPasswordData.currentPassword = newData.currentPassword
  localPasswordData.newPassword = newData.newPassword
  localPasswordData.confirmPassword = newData.confirmPassword
}, { deep: true })

watch(localPasswordData, (newData) => {
  emit('update', { ...newData })
}, { deep: true })

const handleSave = () => {
  emit('save')
}
</script>

<template>
  <div class="bg-(--Base-White) rounded-xl p-5">
    <div class="flex items-center gap-3 mb-5">
      <div class="w-10 h-10 bg-(--Background) rounded-lg flex items-center justify-center">
        <img src="/image/cabinet/passcode.svg" alt="">
      </div>
      <h3 class="text-lg font-bold text-(--Text-950)">Изменить пароль</h3>
    </div>

    <div class="flex flex-col gap-4">
      <div>
        <label class="text-sm text-(--Text-600) mb-2 block">Текущий пароль</label>
        <input
          v-model="localPasswordData.currentPassword"
          type="password"
          class="w-full px-4 py-2.5 border border-(--border) rounded-lg bg-(--Base-White) text-(--Text-950) text-sm"
        >
      </div>

      <div>
        <label class="text-sm text-(--Text-600) mb-2 block">Новый пароль</label>
        <input
          v-model="localPasswordData.newPassword"
          type="password"
          class="w-full px-4 py-2.5 border border-(--border) rounded-lg bg-(--Base-White) text-(--Text-950) text-sm"
        >
      </div>

      <div>
        <label class="text-sm text-(--Text-600) mb-2 block">Подтвердите пароль</label>
        <input
          v-model="localPasswordData.confirmPassword"
          type="password"
          class="w-full px-4 py-2.5 border border-(--border) rounded-lg bg-(--Base-White) text-(--Text-950) text-sm"
        >
      </div>

      <button
        @click="handleSave"
        class="px-4 py-2.5 mt-2 bg-(--Background) text-(--Text-950) text-base font-semibold rounded-lg hover:bg-(--border) transition-colors cursor-pointer"
      >
        Сохранить
      </button>
    </div>
  </div>
</template>

