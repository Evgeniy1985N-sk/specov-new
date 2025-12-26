<script setup lang="ts">
import * as v from 'valibot'
import type { FormSubmitEvent } from '@nuxt/ui'

const emailOrPhone = v.pipe(
  v.string(),
  v.nonEmpty('Email или телефон обязателен'),
  v.custom((value) => {
    const s = value as string
    const trimmed = s.trim()

    // Email
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      return true
    }

    // Телефон: оставляем только цифры
    const digits = trimmed.replace(/\D/g, '')

    // Поддерживаем:
    // - 10 цифр: 9261234567
    // - 11 цифр, начинающихся с 7 или 8: 7926..., 8926...
    if (digits.length === 10) return true
    if (digits.length === 11 && (digits.startsWith('7') || digits.startsWith('8'))) return true

    return false
  }, 'Неверный формат: укажите email или телефон (например, +79261234567)')
)
const schema = v.object({
  emailphone: emailOrPhone,
})

type Schema = v.InferOutput<typeof schema>

const state = reactive({
  emailphone: '',
})

const toast = useToast()
const form = ref()

const isFormValid = computed(() => {
  if (!form.value) return false
  const errors = form.value.errors as Record<string, string> | null
  return !errors || Object.keys(errors).length === 0
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (!isFormValid.value) {
    toast.add({
      title: 'Ошибка',
      description: 'Пожалуйста, исправьте ошибки в форме',
      color: 'error',
    })
    return
  }

  toast.add({
    title: 'Успех',
    description: 'Форма успешно отправлена',
    color: 'success',
  })
  console.log('Данные:', event.data)
}
</script>

<template>
  <UModal title="Вход или регистрация">
    <UButton
      class="bg-gray-100 hover:bg-gray-200 active:bg-neutral-300 border-zinc-300 py-[9px] px-[15px] gap-2 hidden lg:flex items-center cursor-pointer border border-solid rounded-lg"
    >
      <WrapIcon class="h-5 w-5">
        <HeaderIconEnter />
      </WrapIcon>
      <span class="text-emerald-950 font-semibold">Войти</span>
    </UButton>

    <template #body>
      <UForm ref="form" :schema="schema" :state="state" @submit="onSubmit">
        <UFormField label="Email или телефон" name="emailphone">
          <UInput
            v-model="state.emailphone"
            color="neutral"
            size="xl"
            :ui="{ base: 'text-gray-900' }"
            :class="{ 'bg-gray-100': state.emailphone?.trim() }"
          />
        </UFormField>

        <UButton size="xl" type="submit" class="w-full mt-4">
          Заказать звонок
        </UButton>
      </UForm>
    </template>
  </UModal>
</template>

<style scoped>
:deep(.ring-error) {
  background: transparent;
}
.filled.bg-gray-100:deep(input) {
  background-color: #f5f5f5;
}
</style>