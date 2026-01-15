<script setup lang="ts">

const sumDelivery = ref(290)
const state = reactive({
  address: '',
})

</script>

<template>
  <div class="grid gap-6 w-full p-6 border border-gray-300 rounded-xl">

    <div class="grid gap-4">
      <div class="font-bold text-black">
        Укажите куда нужно доставить
      </div>
      <div class="grid gap-6">
        <CartDropdown @handle-click="(value) => state.address = value" class="max-w-[472px]" />
      </div>
    </div>

  </div>
</template>

<style scoped>
:deep(.ring-error) {
  background: transparent;
}

.filled.bg-gray-100:deep(input) {
  background-color: #F5F5F5;
}
</style>