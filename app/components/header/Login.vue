<script setup lang="ts">
import * as v from 'valibot'
import type { FormSubmitEvent } from '@nuxt/ui'

const isButtonLoading = ref(false)
const isPhone = ref(false)
const isShowModalEmail = ref(false)
const isShowModalPhone = ref(false)
const inputRefEmail = useTemplateRef<HTMLInputElement | null>('inputRefEmail')
const inputRefPhone = useTemplateRef<HTMLInputElement | null>('inputRefPhone')

const schema = v.object({
  emailOrPhone: v.optional(
    v.union(
      [
        v.pipe(
          v.string(),
          v.email('Неверный формат email')
        ),
        v.pipe(
          v.string(),
          v.regex(/^[78]\d{10}$/, 'Неверный формат телефона')
        )
      ],
      'Введите корректный Email или телефон'
    )
  )
})

type Schema = v.InferOutput<typeof schema>

const state = reactive({
  emailOrPhone: '',
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

  if (isPhone.value) {
    isShowModalPhone.value = true
  } else {
    isShowModalEmail.value = true
  }
}

const phoneError = computed(() => {
  const errors = form.value?.errors
  if (!Array.isArray(errors)) return ''
  const err = errors.find(e => e.name === 'emailOrPhone')
  return err?.message || ''
})

watch(() => state.emailOrPhone, async (newVal) => {
  const isNumberFormat = /^\d+$/.test(newVal)

  if (isNumberFormat) {
    if (form.value) {
      form.value.clear('emailOrPhone')
    }
    isPhone.value = true;
    await nextTick();
    (inputRefPhone.value as any)?.$el?.focus?.()

  } else {
    console.log('Empty', newVal)
    isPhone.value = false
    await nextTick();
    const el = (inputRefEmail.value as any)?.input || (inputRefEmail.value as any)?.$el
    el?.focus()
  }
})

</script>

<template>
  <UModal title="Вход или регистрация">

    <slot>
      <UButton
        class="max-w-[110px] w-full min-h-11 bg-gray-100 hover:bg-gray-200 active:bg-neutral-300 border-zinc-300 py-[9px] px-[15px] gap-2 hidden lg:flex items-center cursor-pointer border border-solid rounded-lg">
        <WrapIcon class="h-5 w-5">
          <HeaderIconEnter />
        </WrapIcon>
        <span class="text-emerald-950 font-semibold">Войти</span>
      </UButton>
    </slot>

    <template #body>
      <UForm ref="form" :schema="schema" :state="state" @submit="onSubmit">

        <UFormField v-if="!isPhone" label="Email или телефон" name="emailOrPhone">
          <UInput ref="inputRefEmail" v-model="state.emailOrPhone" color="neutral" size="xl" name="email"
            :ui="{ base: 'text-gray-900' }" :class="{ 'filled bg-gray-100': state.emailOrPhone?.trim() }" />
        </UFormField>

        <UFormField v-else class="w-full" :ui="{ label: 'text-gray-700' }" label="Email или телефон" name="emailOrPhone"
          :error="phoneError">
          <ModalPhoneInput ref="inputRefPhone" v-model="state.emailOrPhone" :has-error="Boolean(phoneError)"
            :class="{ 'filled bg-gray-100': state.emailOrPhone?.trim() }" />
        </UFormField>

        <UButton v-if="!isButtonLoading" size="xl" type="submit" class="w-full mt-4">
          Продолжить
        </UButton>
        <UButton v-else loading loading-icon="i-lucide-loader">Продолжить</UButton>

      </UForm>
    </template>
  </UModal>

  <!-- MODAL -->
  <HeaderModalPassword :is-show="isShowModalEmail" />
  <HeaderModalCode :is-show="isShowModalPhone" />
  <!-- MODAL -->

</template>

<style scoped>
:deep(.ring-error) {
  background: transparent;
}

.filled.bg-gray-100:deep(input) {
  background-color: #f5f5f5;
}
</style>