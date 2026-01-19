<script setup lang="ts">


const tabs = ref([
  {
    label: 'Самовывоз',
    isActive: true,
  },
  {
    label: 'Доставка курьером',
    isActive: false,
  },
  {
    label: 'Транспортная компания',
    isActive: false,
  }
])
function toggleActive(index: number) {
  tabs.value = tabs.value.map((item, i) => ({
    ...item,
    isActive: i === index
  }));
}
</script>

<template>
  <!-- TABS -->
  <div class="grid gap-6">

    <div class="flex flex-wrap lg:grid grid-cols-3 gap-1 bg-gray-100 p-1 rounded-lg">
      <button v-for="(tab, i) in tabs" :key="i" @click="toggleActive(i)" :class="tab.isActive ? 'bg-white' : ''"
        class="flex items-center grow gap-4 text-sm leading-5 w-full h-[60px] px-4 py-2.5 cursor-pointer transition rounded-lg">
        <div class="grid">
          <p class="text-left text-gray-950 font-semibold">
            {{ tab.label }}
          </p>
        </div>
      </button>
    </div>

    <div class="grid">
      <div v-if="tabs[0]?.isActive" class="flex">
        <CartStore />
      </div>
      <div v-if="tabs[1]?.isActive" class="flex">
        <DeliveryCourier />
      </div>
      <div v-if="tabs[2]?.isActive" class="flex">
        <DeliveryCompany />
      </div>
    </div>

  </div>
  <!-- TABS -->
</template>