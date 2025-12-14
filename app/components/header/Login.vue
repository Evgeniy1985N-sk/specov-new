<script setup lang="ts">


</script>

<template>

  <UModal title="Вход или регистрация">

    <UButton
      class="bg-gray-100 hover:bg-gray-200 active:bg-neutral-300 border-zinc-300 py-[9px] px-[15px] gap-2 hidden lg:flex items-center cursor-pointer border border-solid rounded-lg">

      <span class="h-5 w-5">
        <HeaderIconEnter />
      </span>

      <span class="text-emerald-950 font-semibold">Войти</span>
    </UButton>

    <template #body>

      <UForm ref="form">
        <UFormField label="Email или телефон" name="emailphone">
          <UInput color="neutral" size="xl" />
        </UFormField>
        <UButton size="xl" type="submit">
          Заказать звонок
        </UButton>
      </UForm>

    </template>

  </UModal>

</template>