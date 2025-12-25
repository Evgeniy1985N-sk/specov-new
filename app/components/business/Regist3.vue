<script setup lang="ts">
import * as v from 'valibot'
import type { FormSubmitEvent } from '@nuxt/ui'

const showModal = ref(false)

const items = ref(['Backlog', 'Todo', 'In Progress', 'Done'])
const value = ref('Backlog')

const schema = v.object({
  inn: v.pipe(
    v.string(),
    v.regex(/^\d+$/, 'ИНН должен содержать только цифры'),
    v.minLength(10, 'ИНН должен содержать минимум 10 цифр'),
  )
})

type Schema = v.InferOutput<typeof schema>

const state = reactive({
  inn: '',
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
  <UModal v-model:open="showModal" :close=false :ui="{ content: 'max-w-[480px]!' }">

    <UButton class="px-5">
      Регистрация выпадашка
    </UButton>

    <template #body>

      <ModalClose @click="showModal = false" />

      <div class="grid gap-6">
        <ModalHead @handle-click="showModal = false" text="Регистрация юрлица" class-wrap-icon="lg:hidden" />

        <p class="text-medium">
          Укажите ИНН организации или ИП, остальные данные заполняются автоматически
        </p>

        <UForm ref="form" :schema="schema" :state="state" @submit="onSubmit">

          <UFormField label="ИНН" name="inn" :ui="{ label: 'text-gray-700' }">
            <UInputMenu v-model="value" :items="items" />
          </UFormField>

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