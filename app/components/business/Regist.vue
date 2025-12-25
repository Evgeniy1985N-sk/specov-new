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
const schema = v.object({
  name: v.pipe(
    v.string(),
    v.minLength(2, 'Имя обязательно')
  ),
  phone: v.pipe(
    v.string(),
    v.nonEmpty('Телефон обязателен'),
    v.regex(/^[78]\d{10}$/, 'Неверный формат телефона')
  ),
  email: v.pipe(
    v.string(),
    v.nonEmpty('Email обязателен'),
    v.email('Неверный формат email')
  ),
  password: v.pipe(
    v.string(),
    v.nonEmpty('Пароль обязателен'),
    v.minLength(6, 'Пароль должен содержать минимум 6 символов')
  )
})

type Schema = v.InferOutput<typeof schema>

const state = reactive({
  name: '',
  phone: '',
  email: '',
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
}

const phoneError = computed(() => {
  const errors = form.value?.errors
  if (!Array.isArray(errors)) return ''
  const err = errors.find(e => e.name === 'phone')
  return err?.message || ''
})

function startCountDown() {
  let intervalId = setInterval(() => {
    if(seconds.value > 0) seconds.value--
    else {
      if (intervalId) clearInterval(intervalId)
    }
  }, 1000)
}
</script>


<template>
  <UModal v-model:open="showModal" :close=false :ui="{ content: 'max-w-[480px]!' }">

    <UButton class="px-5">
      Зарегистрироваться как юрлицо
    </UButton>

    <template #body>

      <ModalClose @click="showModal = false" />

      <ModalHead @handle-click="showModal = false" class-wrap="mb-6" text="Регистрация" />

      <UForm ref="form" :schema="schema" :state="state" @submit="onSubmit">

        <UFormField label="Имя" name="name" :ui="{label: 'text-gray-700'}">
          <UInput v-model="state.name" color="neutral" size="xl" :ui="{ base: 'text-gray-900' }"
            :class="{ 'filled bg-gray-100': state.name?.trim() }" />
        </UFormField>

        <div :class="Boolean(phoneError) ? 'items-center' : 'items-end'" class="flex flex-wrap sm:flex-nowrap gap-2">

          <UFormField class="w-full" :ui="{label: 'text-gray-700'}" label="Телефон" name="phone" :error="phoneError">
            <ModalPhoneInput v-model="state.phone" :has-error="Boolean(phoneError)" :class="{ 'filled bg-gray-100': state.phone?.trim() }" />
          </UFormField>

          <UButton v-if="!isCode" @click="isCode = true, startCountDown()" color="neutral" solid
            class="shrink-0 max-w-[136px] min-h-10 gap-2 px-5 text-sm" size="xl">
            Получить код
          </UButton>

          <UFormField v-if="!success && isCode" :ui="{label: 'text-gray-700'}" class="w-full max-w-[136px]" label="Код из SMS" name="code">
            <UInput @focus="success = true" v-model="code" color="neutral" size="xl" />
          </UFormField>

          <div v-if="success" class="flex items-center gap-1.5 w-full min-h-11 max-w-[136px] text-sm leading-5 text-(--Brand-700)">
            <WrapIcon>
              <ModalIconCheck />
            </WrapIcon>
            <p>Подтвержден</p>
          </div>

        </div>

        <label v-if="!success && isCode" class="flex gap-2">
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

        <UFormField class="w-full" label="Email" name="email" :ui="{label: 'text-gray-700'}">
          <UInput v-model="state.email" placeholder="mail@mail.ru" color="neutral" size="xl"
            :ui="{ base: 'text-gray-900' }" :class="{ 'bg-gray-50': state.email?.trim() }" />
        </UFormField>

        <UFormField class="w-full" label="Пароль" name="password" :ui="{label: 'text-gray-700'}">
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

        <label class="flex gap-2 cursor-pointer">
          <UCheckbox size="xl" v-model="value" />
          <div>
            <p class="text-sm leading-5 text-gray-950">
              Я представитель юрлица или ИП
            </p>
            <span class="text-[12px] leading-[18px]">
              Возмещение НДС до 20%, ЭДО и другие преимущества
            </span>
          </div>
        </label>

        <label class="flex gap-2 cursor-pointer">
          <UCheckbox size="xl" v-model="value2" />
          <div>
            <p class="text-sm leading-5 text-gray-950 font-medium">
              Хочу получать информацию и скидках, специальных предложениях и акциях
            </p>
          </div>
        </label>

        <div class="grid gap-3">
          <UButton class="px-5" type="submit">
            Зарегистрироваться
          </UButton>
          <p class="text-[12px] leading-[18px]">
            При регистрации вы предоставляете <NuxtLink class="text-(--Brand-700)" to="/agreement">Согласие на обработку
              персональных данных</NuxtLink> в соответствии с <NuxtLink class="text-(--Brand-700)" to="/policy">
              Политикой в
              отношении
              обработки персональных данных</NuxtLink>, а также принимаете условия <NuxtLink class="text-(--Brand-700)"
              to="/terms"> Пользовательского соглашения</NuxtLink>
          </p>
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