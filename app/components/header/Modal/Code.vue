<script setup lang="ts">
import * as v from 'valibot'
import type { FormSubmitEvent } from '@nuxt/ui'

const showModal = ref(true)
const success = ref(false)
const code = ref('')
const seconds = ref(60)
const isButtonLoading = ref(false)

interface Props {
  isShow: boolean
}
const props = defineProps<Props>()

const schema = v.object({
  phone: v.pipe(
    v.string(),
    v.nonEmpty('Телефон обязателен'),
    v.regex(/^[78]\d{10}$/, 'Неверный формат телефона')
  ),
})

type Schema = v.InferOutput<typeof schema>

const state = reactive({
  phone: '89005001234',
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

onMounted(startCountDown)

</script>


<template>
  <UModal v-if="props.isShow" v-model:open="showModal" :close=false :ui="{body: 'overflow-visible'}">

    <template #body>

      <ModalClose @click="showModal = false" />

      <ModalHead @handle-click="showModal = false" class-wrap="mb-6" :is-icon="false" text="Вход или регистрация" />

      <UForm ref="form" :schema="schema" :state="state" @submit="onSubmit">

        <UFormField class="w-full" :ui="{ label: 'text-gray-700' }" label="Email или телефон" name="phone" :error="phoneError">
          <ModalPhoneInput v-model="state.phone" :has-error="Boolean(phoneError)"
            :class="{ 'filled bg-gray-100': state.phone?.trim() }" />
        </UFormField>

        <UFormField :ui="{ label: 'text-gray-700' }" class="w-full"
          label="Код из SMS" name="code">
          <UInput @focus="success = true" v-model="code" :class="{ 'filled bg-gray-100': code?.trim() }" :ui="{base: 'px-3!', leading: 'right-3 left-auto'}" leading :loading="code.length == 4" loading-icon="i-lucide-loader" color="neutral" size="xl" />
        </UFormField>

        <UButton v-if="!seconds" @click="seconds=60, startCountDown()" color="neutral" solid
          class="flex justify-center-safe min-h-10 gap-2 px-5 text-sm" size="xl">
          Получить новый код
        </UButton>

        <label class="flex gap-2">
          <span>
            <ModalIconMark />
          </span>
          <div>
            <p class="text-sm leading-5 text-gray-950">
              Мы отправили код на ваш номер телефона
            </p>
            <span class="text-[12px] leading-[18px]">
              Получить новый код можно через {{ seconds }} секунд
            </span>
          </div>
        </label>

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