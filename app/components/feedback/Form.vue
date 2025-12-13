<script setup lang="ts">
import * as v from 'valibot'
import type { FormSubmitEvent } from '@nuxt/ui'

const schema = v.object({
  name: v.pipe(
    v.string(),
    v.minLength(2, 'Имя обязательно')
  ),
  phone: v.pipe(
    v.string(),
    v.nonEmpty('Телефон обязателен'),
    // Проверяем, что это российский номер (11 цифр, начинается с 7 или 8)
    v.regex(/^[78]\d{10}$/, 'Неверный формат телефона')
  )
})

type Schema = v.InferOutput<typeof schema>

const state = reactive({
  name: '',
  phone: ''
})

const toast = useToast()
const form = ref()

// Вычисляемое свойство для проверки валидности
const isFormValid = computed(() => {
  if (!form.value) return false
  const errors = form.value.errors
  return !errors || Object.keys(errors).length === 0
})

// Вычисляемое свойство для проверки, заполнены ли поля
const isFormDirty = computed(() => {
  return state.name.trim() !== '' || state.phone.trim() !== ''
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
</script>

<template>
  <UForm 
    ref="form" 
    :schema="schema" 
    :state="state"
    class="flex flex-col sm:flex-row lg:block lg:max-w-[478px] w-full gap-4" 
    @submit="onSubmit"
  >
    <UFormField 
      label="Имя" 
      name="name"
      :ui="{ label: 'w-full lg:pt-[26px] text-gray-700 leading-5 font-medium text-sm' }"
    >
      <UInput 
        v-model="state.name" 
        :ui="{
          base: 'shadow-none w-full h-11 !bg-white text-gray-500 placeholder-gray-400 border-transparent rounded-lg py-2.5 px-3.5 focus:outline-none ring-0 appearance-none',
          root: 'w-full'
        }" 
        placeholder="Ваше имя"  
      />
    </UFormField>

    <UFormField 
      label="Номер телефона" 
      name="phone"
      :ui="{ label: 'w-full lg:pt-[16px] text-gray-700 leading-5 font-medium text-sm' }"
    >
      <FeedbackPhoneInput 
        v-model="state.phone"
        :ui="{
          base: 'shadow-none w-full h-11 !bg-white text-gray-500 placeholder-gray-400 border-transparent rounded-lg py-2.5 px-3.5 focus:outline-none ring-0 appearance-none',
          root: 'w-full'
        }"
      />
    </UFormField>

    <UButton 
      type="submit" 
      :ui="{
        base: `hover:bg-(--Brand-700) sm:max-w-[170px] cursor-pointer flex items-center justify-center self-end w-full lg:w-auto lg:mt-4 px-[18px] text-center text-white leading-6 font-semibold py-2.5 rounded-lg transition-all ${!isFormValid && isFormDirty
            ? 'bg-gray-400 cursor-not-allowed self-center'
            : isFormValid
              ? 'bg-emerald-950'
              : 'bg-gray-400 cursor-not-allowed self-center pointer-events-none'
          }`
      }"
    >
      Заказать звонок
    </UButton>
  </UForm>
</template>