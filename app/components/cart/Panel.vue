<script setup lang="ts">

const isChecked = ref(false);

const emit = defineEmits<{
  (e: 'setCheck', check: boolean): void
  (e: 'remove'): void
  (e: 'share'): void
  (e: 'print'): void
}>();

</script>

<template>

  <div class="flex gap-6 justify-between bg-gray-100 p-4 rounded-lg">

    <div class="flex flex-wrap gap-2.5 sm:gap-4 lg:gap-6">
      <label class="flex gap-2 items-center cursor-pointer">
        <UCheckbox size="xl"  
			v-model="isChecked"
			@change="() => emit('setCheck', isChecked)"
		/>
        <span class="text-sm leading-5 font-semibold">
          Выбрать все
        </span>
      </label>
      <CartButton text="Удалить выбранные" @click="emit('remove')">
        <WrapIcon>
          <CartIconTrash />
        </WrapIcon>
      </CartButton>
    </div>

    <div class="hidden md:flex gap-4 lg:gap-6">
      <CartButton text="Поделиться" @click="emit('share')">
        <WrapIcon>
          <CartIconShare />
        </WrapIcon>
      </CartButton>
      <CartButton text="Скачать">
        <WrapIcon>
          <CartIconDownload />
        </WrapIcon>
      </CartButton>
      <CartButton text="Распечатать" @click="emit('print')">
        <WrapIcon>
          <CartIconFax />
        </WrapIcon>
      </CartButton>
    </div>

  </div>
</template>
