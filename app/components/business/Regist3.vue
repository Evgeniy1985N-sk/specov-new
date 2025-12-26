<script setup lang="ts">
import * as v from 'valibot'
import type { FormSubmitEvent } from '@nuxt/ui'

const showModal = ref(false)
const value = ref(true)

const schema = v.object({
  address: v.pipe(
    v.string(),
    v.minLength(20, 'Адрес обязателен')
  ),
})

type Schema = v.InferOutput<typeof schema>

const state = reactive({
  address: 'г. Москва, Ленинский проспект, д.105к2, помещ. 6/1А',
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

</script>


<template>
  <UModal v-model:open="showModal" :close=false
    :ui="{ content: 'max-w-[480px] overflow-visible', body: 'overflow-visible', }">

    <UButton class="px-5">
      Заполнено
    </UButton>

    <template #body>

      <ModalClose @click="showModal = false" class="hidden sm:flex" />

      <div class="grid gap-6">

        <ModalHead @handle-click="showModal = false" text="Регистрация юрлица" class-wrap-icon="lg:hidden" />

        <div class="grid gap-1">
          <span class="text-sm leading-5">
            Название организации
          </span>
          <p class="font-bold text-gray-900">
            ООО «ВАН»
          </p>
        </div>
        <div class="grid gap-1">
          <span class="text-sm leading-5">
            ИНН
          </span>
          <p class="font-bold text-gray-900">
            9729198725
          </p>
        </div>
        <div class="grid gap-1">
          <span class="text-sm leading-5">
            КПП
          </span>
          <p class="font-bold text-gray-900">
            772801001
          </p>
        </div>

        <UForm ref="form" :schema="schema" :state="state" @submit="onSubmit">

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

          <UButton class="px-5" type="submit">
            Завершить регистрацию
          </UButton>

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