<script setup lang="ts">
import * as v from 'valibot'
import type { FormSubmitEvent } from '@nuxt/ui'

const showModal = ref(true)
const isShowModalInfo = ref(false)
const isButtonLoading = ref(false)

interface Props {
  isShow: boolean
}
const props = defineProps<Props>()

const schema = v.object({

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

  setTimeout(() => {
    isShowModalInfo.value = true
  }, 500)
}

</script>

<template>
  <UModal v-if="props.isShow" v-model:open="showModal" :close=false>

    <template #body>

      <ModalClose @click="showModal = false" class="hidden sm:flex" />

      <ModalHead @handle-click="showModal = false" :is-icon="false" class-wrap="mb-6" text="Восстановление пароля" />

      <UForm ref="form" :schema="schema" :state="state" @submit="onSubmit">

        <div class="grid">
          <p class="text-sm leading-5 font-medium">
            На ваш почтовый адрес <b class="font-bold text-gray-950">mail@mail.ru</b> будет отправлено письмо со ссылкой
            на восстановление пароля.
          </p>
        </div>

        <div class="grid gap-4">
          <UButton v-if="!isButtonLoading" @click="isShowModalInfo = true" class="w-full px-5" type="submit">
            Отправить ссылку
          </UButton>
          <UButton v-else loading loading-icon="i-lucide-loader">Продолжить</UButton>
        </div>

      </UForm>

    </template>

  </UModal>

  <!-- MODAL -->
  <HeaderModalInfo :is-show="isShowModalInfo" />
  <!-- MODAL -->

</template>

<style scoped>
:deep(.ring-error) {
  background: transparent;
}

.filled.bg-gray-100:deep(input) {
  background-color: #F5F5F5;
}
</style>