<script setup lang="ts">
import * as v from 'valibot'
import type { FormSubmitEvent } from '@nuxt/ui'

const value = ref(true)
const value2 = ref(false)
const showModal = ref(false)
const show = ref(false)
const isCode = ref(false)
const code = ref('')
const seconds = ref(60)
const success = ref(false)
const isButtonLoading = ref(false)

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

function startCountDown() {
  let intervalId = setInterval(() => {
    if (seconds.value > 0) seconds.value--
    else {
      if (intervalId) clearInterval(intervalId)
    }
  }, 1000)
}



interface Props {
  isShow: boolean
}
const props = defineProps<Props>()


</script>

<template>
  <UModal v-model:open="showModal" :close=false :ui="{ content: 'max-w-[480px]' }">

    <UButton class="px-5">
      Зарегистрироваться как юрлицо
    </UButton>

    <template #body>

      <ModalClose @click="showModal = false" class="hidden sm:flex" />

      <ModalHead @handle-click="showModal = false" class-wrap="mb-6" text="Регистрация" />

      <UForm ref="form" :schema="schema" :state="state" @submit="onSubmit">

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

      </UForm>

    </template>

  </UModal>
</template>