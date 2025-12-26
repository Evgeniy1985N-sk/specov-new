<script setup lang="ts">
import * as v from 'valibot'
import type { FormSubmitEvent } from '@nuxt/ui'

const showModal = ref(false)
const value = ref(true)
const isButtonLoading = ref(false)

const schema = v.object({
  kpp: v.pipe(
    v.string(),
    v.regex(/^\d{9}$/, 'КПП должен содержать ровно 9 цифр'),
  ),
  name: v.pipe(
    v.string(),
    v.minLength(2, 'Наименование должно содержать минимум 2 символа'),
    v.maxLength(255, 'Наименование не должно превышать 255 символов'),
    v.regex(/[^0-9]/, 'Наименование не может состоять только из цифр')
  ),
  address: v.pipe(
    v.string(),
    v.minLength(20, 'Адрес обязателен')
  ),
  checkingAccount: v.pipe(
    v.string(),
    v.regex(/^\d{20}$/, 'Расчётный счёт должен содержать ровно 20 цифр')
  ),
  bic: v.pipe(
    v.string(),
    v.regex(/^\d{9}$/, 'БИК должен содержать ровно 9 цифр')
  ),
  bankName: v.pipe(
    v.string(),
    v.minLength(2, 'Укажите наименование банка'),
    v.maxLength(255, 'Наименование банка слишком длинное'),
    v.regex(/[^0-9\s]/, 'Наименование банка не может состоять только из цифр и пробелов')
  ),
  correspondentAccount: v.pipe(
    v.string(),
    v.regex(/^\d{20}$/, 'Корреспондентский счёт должен содержать ровно 20 цифр')
  )
})

type Schema = v.InferOutput<typeof schema>

const state = reactive({
  kpp: '',
  name: '',
  address: '',
  checkingAccount: '',
  bic: '',
  bankName: '',
  correspondentAccount: '',
})

const toast = useToast()
const form = ref()

const isFormValid = computed(() => {
  if (!form.value) return false
  const errors = form.value.errors
  return !errors || Object.keys(errors).length === 0
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (!isFormValid.value) {
    toast.add({
      title: 'Ошибка',
      description: 'Пожалуйста, исправьте ошибки в форме',
    })
    return
  }

  toast.add({
    title: 'Success',
    description: 'The form has been submitted.',
    color: 'success'
  })
  console.log(event.data)
  isButtonLoading.value = true
}

</script>


<template>
  <UModal v-model:open="showModal" :close=false :ui="{ content: 'max-w-[480px]', }">

    <UButton class="px-5">
      Регистрация полная
    </UButton>

    <template #body>

      <ModalClose @click="showModal = false" class="hidden sm:flex" />

      <div class="grid gap-6">

        <ModalHead @handle-click="showModal = false" text="Регистрация юрлица" class-wrap-icon="lg:hidden" />

        <UForm ref="form" :schema="schema" :state="state" @submit="onSubmit">

          <UFormField name="kpp" :ui="{ label: 'text-gray-700 font-medium' }">
            <template #label>
              КПП<span class="text-(--Brand-600)">*</span>
            </template>

            <UInput v-model="state.kpp" color="neutral" size="xl" :ui="{ base: 'text-gray-900 font-bold' }" />
          </UFormField>

          <UFormField name="name" :ui="{ label: 'text-gray-700 font-medium' }">
            <template #label>
              Наименование организации<span class="text-(--Brand-600)">*</span>
            </template>

            <UInput v-model="state.name" color="neutral" size="xl" :ui="{ base: 'text-gray-900 font-bold' }" />
          </UFormField>

          <UFormField name="address" :ui="{ label: 'text-gray-700 font-medium' }">
            <template #label>
              Юридический адрес<span class="text-(--Brand-600)">*</span>
            </template>

            <UInput v-model="state.address" color="neutral" size="xl" :ui="{ base: 'text-gray-900 font-bold' }" />
          </UFormField>

          <label class="flex gap-2 cursor-pointer">
            <UCheckbox size="xl" v-model="value" />
            <div>
              <p class="text-sm leading-5 text-gray-950 font-medium">
                Совпадает с фактическим
              </p>
            </div>
          </label>

          <UFormField name="checkingAccount" :ui="{ label: 'text-gray-700 font-medium' }">
            <template #label>
              Рассчетный счет<span class="text-(--Brand-600)">*</span>
            </template>

            <UInput v-model="state.checkingAccount" color="neutral" size="xl"
              :ui="{ base: 'text-gray-900 font-bold' }" />
          </UFormField>

          <UFormField name="bic" :ui="{ label: 'text-gray-700 font-medium' }">
            <template #label>
              БИК<span class="text-(--Brand-600)">*</span>
            </template>

            <UInput v-model="state.bic" color="neutral" size="xl" :ui="{ base: 'text-gray-900 font-bold' }" />
          </UFormField>

          <UFormField name="bankName" :ui="{ label: 'text-gray-700 font-medium' }">
            <template #label>
              Наименование банка<span class="text-(--Brand-600)">*</span>
            </template>

            <UInput v-model="state.bankName" color="neutral" size="xl" :ui="{ base: 'text-gray-900 font-bold' }" />
          </UFormField>

          <UFormField name="correspondentAccount" :ui="{ label: 'text-gray-700 font-medium' }">
            <template #label>
              Корреспондентский счёт<span class="text-(--Brand-600)">*</span>
            </template>

            <UInput v-model="state.correspondentAccount" color="neutral" size="xl"
              :ui="{ base: 'text-gray-900 font-bold' }" />
          </UFormField>

          <UButton v-if="!isButtonLoading" class="px-5" type="submit">
            Завершить регистрацию
          </UButton>
          <UButton v-else loading loading-icon="i-lucide-loader">Продолжить</UButton>

        </UForm>
      </div>

    </template>

  </UModal>
</template>

<style scoped>
:deep(.ring-error) {
  background: transparent;
}

.filled.bg-gray-100:deep(input) {
  background-color: #F5F5F5;
}
</style>