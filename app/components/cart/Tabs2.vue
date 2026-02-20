<script setup lang="ts">
const itemsOnline = ref([
  {
    label: 'Онлайн',
    src: '/image/payment/img-1.png',
    isActive: true,
  },
  {
    label: 'По карте',
    src: '/image/payment/img-2.png',
    isActive: false,
  },
  {
    label: 'SberPay',
    src: '/image/payment/img-3.png',
    isActive: false,
  },
  {
    label: 'Оплата TPay',
    src: '/image/payment/img-4.png',
    isActive: false,
  },
  {
    label: 'Mir Pay',
    src: '/image/payment/img-5.png',
    isActive: false,
  },
  {
    label: 'Долями',
    src: '/image/payment/img-6.png',
    isActive: false,
  },
])
const itemsCredit = ref([
  {
    label: 'Кредит от Т-банк',
    src: '/image/payment/img-7.png',
    isActive: true,
  },
  {
    label: 'Рассрочка от Т-банк ',
    src: '/image/payment/img-7.png',
    isActive: false,
  },
  {
    label: 'Кредит от СберБанка',
    src: '/image/payment/img-8.png',
    isActive: false,
    isSoon: true
  },
  {
    label: 'Рассрочка от СберБанка',
    src: '/image/payment/img-8.png',
    isActive: false,
    isSoon: true
  },
  {
    label: 'Долями',
    src: '/image/payment/img-6.png',
    isActive: false,
  },
])
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

function toggleActiveOnline(index: number) {
  itemsOnline.value = itemsOnline.value.map((item, i) => ({
    ...item,
    isActive: i === index
  }));
}

function toggleActiveCredit(index: number) {
  itemsCredit.value = itemsCredit.value.map((item, i) => ({
    ...item,
    isActive: i === index
  }));
}

</script>

<template>
  <div class="grid gap-6">

    <div class="flex flex-col sm:flex-row gap-1 bg-gray-100 p-1 rounded-lg w-full sm:w-fit">
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
        <CartPayment :items="itemsOnline" @handle-click="(i) => toggleActiveOnline(i)" />
      </div>
      <div v-if="tabs[1]?.isActive">
        2
      </div>
      <div v-if="tabs[2]?.isActive">
        <CartPayment :items="itemsCredit" @handle-click="(i) => toggleActiveCredit(i)" />
      </div>
    </div>

  </div>
</template>