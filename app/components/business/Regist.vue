<template>
  <UModal title="Вход или регистрация">

    <UButton class="px-5">
      Зарегистрироваться как юрлицо
    </UButton>

    <template #body>

      <UForm ref="form">
        <UFormField label="Email или телефон" name="emailphone">
          <UInput color="neutral" size="xl" />
        </UFormField>
        <UButton class="px-5">
          Зарегистрироваться
        </UButton>
      </UForm>

    </template>

  </UModal>
</template>