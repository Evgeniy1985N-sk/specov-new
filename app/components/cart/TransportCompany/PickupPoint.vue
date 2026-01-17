<script setup lang="ts">
interface Address {
  label: string
  coords: number[]
  isActive: boolean
}
const address = ref<Address[]>()
const companyStore = useCompanyStore()
const toggleActiveCompanyAddress = useCompanyStore().toggleActiveAddress
const company = computed(() => {
  return companyStore.company
})
watch(company, (newVal) => {
  newVal.filter((item) => {
    if (item.isActive) {
      address.value = item.address
    }
  })
}, { immediate: true })


</script>

<template>
  <div class="grid gap-2 pb-6">
    <div v-for="(item, index) in address" @click="toggleActiveCompanyAddress(index)"
      :class="{ 'active': item.isActive }"
      class="item-custom relative flex items-center gap-4 py-6 px-4 text-left bg-gray-100 rounded-2xl cursor-pointer">
      <p class="text-sm leading-5 font-semibold text-gray-950">
        {{ item.label }}
      </p>
    </div>
  </div>

</template>

<style scoped>
.item-custom:before {
  content: '';
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  border: 1px solid #e5e7eb;
  border-radius: 50%;
  flex-shrink: 0;
  background: #fff;
}

.item-custom.active:before {
  border: 6px solid var(--Brand-600);
}
</style>