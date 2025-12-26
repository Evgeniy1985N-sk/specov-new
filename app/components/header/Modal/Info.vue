<script setup lang="ts">
import * as v from 'valibot'
import type { FormSubmitEvent } from '@nuxt/ui'

const showModal = ref(true)

interface Props {
  isShow: boolean
}
const props = defineProps<Props>()

</script>

<template>
  <UModal v-model:open="showModal" :close=false :ui="{content: 'h-auto! max-w-[330px]'}">

    <template #body>

      <ModalClose @click="showModal = false" />

      <ModalHead @handle-click="showModal = false" :is-icon="false" class-wrap="grid gap-4 mb-6" text="Письмо отправлено">
        <WrapIcon class="w-[34px] h-[34px]">
          <HeaderIconCheck />
        </WrapIcon>
      </ModalHead>

      <p>
        Отправили письмо на почту <b class="font-bold text-gray-950">mail@mail.ru</b>. Перейдите по ссылке из письма, чтобы сменить пароль. Если его нет во
        входящих, проверьте папку <b class="font-bold text-gray-950">«Спам»</b>. 
      </p>


    </template>

  </UModal>
</template>

<style scoped></style>