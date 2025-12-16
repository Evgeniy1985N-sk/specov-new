<script setup lang="ts">

const tabs = ref([
  {
    label: 'Онлайн',
    isActive: true,
  },
  {
    label: 'При получении',
    isActive: false,
  },
  {
    label: 'В кредит',
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
  <div class="grid gap-6">

    <div class="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit">
      <button v-for="(tab, i) in tabs" :key="i" @click="toggleActive(i)" :class="tab.isActive ? 'bg-white' : ''"
        class="flex items-center justify-center gap-4 h-11 px-[18px] py-2.5 cursor-pointer transition rounded-lg">
        <div class="grid">
          <p class="text-left text-gray-950 font-semibold">
            {{ tab.label }}
          </p>
        </div>
      </button>
    </div>

    <div class="grid">
      <div v-if="tabs[0]?.isActive">
        <CartPayment />
      </div>
      <div v-if="tabs[1]?.isActive">
        2
      </div>
      <div v-if="tabs[2]?.isActive">
        3
      </div>
    </div>

  </div>
</template>