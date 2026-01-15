<script setup lang="ts">
import Dropdown from './Dropdown.vue';

const deliveryStore = useDeliveryStore()
const toggleActiveAddress = useDeliveryStore().toggleActiveAddress
const state = reactive({
  address: '',
})
interface Item {
  label: string
  isActive: boolean
}
const address = computed(() => {
  return deliveryStore.address
})
watch(address, (newVal) => {
  newVal.filter((item) => {
    if (item.isActive) {
      state.address = item.label
    }
  })
})

const visibleTime = computed(() => {
  return state.address
})
</script>

<template>
  <div class="grid gap-10 w-full p-6 border border-gray-300 rounded-xl">

    <div class="grid gap-4">
      <div class="font-bold text-black">
        Укажите куда нужно доставить
      </div>

      <Dropdown label="Город, улица, дом, корпус" :items="address"
        @handle-click="(index) => toggleActiveAddress(address, index)" @handle-change="(value) => state.address = value"
        class="shrink-0 w-full max-w-[472px]" />

    </div>

    <div v-if="visibleTime" class="grid">
      <span class="font-bold text-gray-950">Выберите транспортную компанию</span>

      <CartTransportCompany />
    </div>

  </div>
</template>

<style scoped>
.filled {
  --color-white: #F5F5F5;
}
</style>