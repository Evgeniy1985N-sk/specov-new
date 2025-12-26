<script setup lang="ts">
import * as v from 'valibot'
import type { FormSubmitEvent } from '@nuxt/ui'

const showModal = ref(true)
const show = ref(false)
const isButtonLoading = ref(false)
const isModalRecovery = ref(false)

interface Props {
  isShow: boolean
}
const props = defineProps<Props>()

const schema = v.object({
  password: v.pipe(
    v.string(),
    v.nonEmpty('Пароль обязателен'),
    v.minLength(6, 'Пароль должен содержать минимум 6 символов')
  )
})

type Schema = v.InferOutput<typeof schema>

const state = reactive({
  password: '',
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

const phoneError = computed(() => {
  const errors = form.value?.errors
  if (!Array.isArray(errors)) return ''
  const err = errors.find(e => e.name === 'phone')
  return err?.message || ''
})

</script>

<template>
  <UModal v-model:open="showModal" :close=false>

    <template #body>

      <ModalClose @click="showModal = false" class="hidden sm:flex" />

      <ModalHead @handle-click="showModal = false" class-wrap="mb-6" text="Введите пароль" />

      <UForm ref="form" :schema="schema" :state="state" @submit="onSubmit">

        <div class="grid">
          <p class="text-sm leading-5 font-medium">
            Для входа на сайт введите пароль:
          </p>
          <span class="text-gray-900 font-bold">
            mail@mail.ru
          </span>
          <div class="text-[12px] leading-[18px] text-(--Brand-700) text-left cursor-pointer">
            Изменить
          </div>
        </div>

        <UFormField class="w-full" label="Пароль" name="password" :ui="{ label: 'text-gray-700' }">
          <UInput v-model="state.password" color="neutral" size="xl" :type="show ? 'text' : 'password'"
            :ui="{ trailing: 'pe-1', base: 'text-gray-900' }" :class="{ 'filled bg-gray-100': state.password?.trim() }">

            <template #trailing>
              <UButton class="text-black hover:text-gray-700" variant="link" size="sm"
                :icon="show ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                :aria-label="show ? 'Hide password' : 'Show password'" :aria-pressed="show" aria-controls="password"
                @click="show = !show" />
            </template>

          </UInput>

        </UFormField>

        <div class="grid gap-4">
          <UButton v-if="!isButtonLoading" class="w-full px-5" type="submit">
            Войти
          </UButton>
          <UButton v-else loading loading-icon="i-lucide-loader">Продолжить</UButton>

          <span @click="isModalRecovery = true" class="flex justify-center text-sm leading-5 cursor-pointer">
            Не помню пароль
          </span>
          <HeaderModalRecoveryPassword :is-show="isModalRecovery" />
        </div>

      </UForm>

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