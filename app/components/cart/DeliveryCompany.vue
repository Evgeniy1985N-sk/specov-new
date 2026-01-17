<script setup lang="ts">
import Dropdown from './Dropdown.vue';

const deliveryStore = useDeliveryStore()
const toggleActiveAddress = useDeliveryStore().toggleActiveAddress
const companyStore = useCompanyStore()
const state = reactive({
  address: '',
  company: ''
})
const address = computed(() => {
  return deliveryStore.address
})
const company = computed(() => {
  return companyStore.company
})

const visibleTransportCompany = computed(() => {
  return state.address
})
const visiblePickupPoint = computed(() => {
  return state.company
})

watch(address, (newVal) => {
  newVal.filter((item) => {
    if (item.isActive) {
      state.address = item.label
    }
  })
})
watch(company, (newVal) => {
  newVal.filter((item) => {
    if (item.isActive) {
      state.company = item.label
    }
  })
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

    <div v-if="visibleTransportCompany" class="grid">
      <span class="font-bold text-gray-950">Выберите транспортную компанию</span>

      <CartTransportCompanyTable />
    </div>

    <div v-if="visiblePickupPoint" class="grid gap-4">
      <span class="font-bold text-gray-950">Выберите пункт выдачи</span>

      <div class="flex gap-6 border border-gray-300 rounded-xl">
        <div class="max-w-[350px] w-full max-h-[364px] overflow-auto pt-6 pl-6 hide-scrollbar">
          <CartTransportCompanyPickupPoint />
        </div>

      </div>

    </div>

  </div>
</template>

<style scoped>
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.hide-scrollbar :deep(::-webkit-scrollbar) {
  display: none;
}
</style>