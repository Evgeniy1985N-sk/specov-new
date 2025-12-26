<script setup lang="ts">
import * as v from 'valibot'
import type { FormSubmitEvent } from '@nuxt/ui'

const showModal = ref(false)

const schema = v.object({
  inn: v.pipe(
    v.string(),
    v.regex(/^\d+$/, 'ИНН должен содержать только цифры'),
    v.minLength(10, 'ИНН должен содержать минимум 10 цифр'),
  )
})

type Schema = v.InferOutput<typeof schema>

const state = reactive({
  inn: '9729198725',
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
    :ui="{ content: 'max-w-[480px]! w-[calc(100%+2rem)] sm:w-full h-screen sm:h-auto overflow-visible', body: 'overflow-visible', }">

    <UButton class="px-5">
      Регистрация юрлица
    </UButton>

    <template #body>

      <ModalClose @click="showModal = false" class="hidden sm:flex" />

      <div class="grid gap-6">
        <ModalHead @handle-click="showModal = false" text="Регистрация юрлица" class-wrap-icon="lg:hidden" />

        <p class="text-medium">
          Укажите ИНН организации или ИП, остальные данные заполняются автоматически
        </p>

        <UForm ref="form" :schema="schema" :state="state" @submit="onSubmit">

          <div class="relative">

            <UFormField label="ИНН" name="inn" :ui="{ label: 'text-gray-700' }">
              <UInput v-model="state.inn" color="neutral" size="xl" :ui="{ base: 'text-gray-900 font-bold' }"
                :class="{ 'filled bg-gray-100': state.inn?.trim() }" />
            </UFormField>

            <ModalPopup>

              <div v-if="state.inn == '9729198725' " class="grid gap-4">
                <div class="grid gap-1 cursor-pointer">
                  <p class="text-sm leading-5 text-gray-900 font-bold">
                    ООО «ВАН»
                  </p>
                  <span class="text-[12px] leading-[18px]">
                    ИНН: 9729198725, КПП: 772801001
                  </span>
                  <span class="text-[12px] leading-[18px]">
                    г. Москва, Ленинский проспект, д.105к2, помещ. 6/1А
                  </span>
                </div>
                <div class="grid gap-1 cursor-pointer">
                  <p class="text-sm leading-5 text-gray-900 font-bold">
                    Другой филиал
                  </p>
                  <span class="text-[12px] leading-[18px]">
                    Выберите, если ИНН введен правильно, но вашего филиала нет в списке
                  </span>
                </div>
              </div>

              <div v-if="state.inn !== '9729198725' && isFormValid" class="grid gap-2">
                <p class="text-sm leading-5 font-medium text-gray-900">
                  Не удалось найти организацию
                </p>
                <button class="text-sm leading-5 font-medium text-(--Brand-700) cursor-pointer text-left">
                  Добавить вручную
                </button>
              </div>

            </ModalPopup>

          </div>

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