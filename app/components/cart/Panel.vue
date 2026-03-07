<script setup lang="ts">

const isChecked = ref(false);

const props = defineProps<{
	isDownload: boolean;
	isShareLoading: boolean;
}>();

const emit = defineEmits<{
  (e: 'setCheck', check: boolean): void
  (e: 'remove'): void
  (e: 'share'): void
  (e: 'print'): void
  (e: 'download'): void
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
      <CartButton text="Поделиться" @click="emit('share')" :disabled="props.isShareLoading">
        <WrapIcon>
          <CartIconShare :loading="props.isShareLoading"/>
        </WrapIcon>
      </CartButton>
      <CartButton text="Скачать" @click="emit('download')" :disabled="props.isDownload">
        <WrapIcon>
          <CartIconDownload :loading="props.isDownload"/>
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
