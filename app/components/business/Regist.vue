<script setup lang="ts">
const showModal = ref(true)
</script>


<template>
  <UModal v-model:open="showModal" :close=false>

    <UButton class="px-5">
      Зарегистрироваться как юрлицо
    </UButton>

    <template #body>

      <ModalClose />

      <ModalBack class-wrap="mb-6" text="Регистрация" />

      <UButton @click="showModal = false" class="px-5">
        Зарегистрироваться
      </UButton>

    </template>

  </UModal>
</template>