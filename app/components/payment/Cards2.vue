<script setup lang="ts">
import Icon1 from '~/components/payment/icon/Icon-4.vue';
import Icon2 from '@/components/payment/icon/Icon-5.vue';
import Icon3 from '@/components/payment/icon/Icon-7.vue';
import Icon4 from '@/components/payment/icon/Icon-9.vue';
import Icon5 from '@/components/payment/icon/Icon-11.vue';
import Icon6 from '@/components/payment/icon/Icon-8.vue';
import Icon7 from '@/components/payment/icon/Icon-10.vue';

const items = ref([
  {
    title: 'В рассрочку или кредит',
    text: 'Оформить рассрочку или кредит можно в магазине у менеджеров или самостоятельно при оформлении заказа на сайте. Решение по заявке — в течение нескольких минут',
    icon: markRaw(Icon1),
  },
  {
    title: 'Частями',
    text: 'С помощью сервиса «Долями» от Т-Банка делите оплату на четыре части — первый платеж спишется в момент получения товара, остальные будут списываться каждые две недели. Оформить можно в магазине или на сайте',
    icon: markRaw(Icon5),
  },
  {
    title: 'Картой',
    icon: markRaw(Icon2),
  },
  {
    title: 'Через мобильное приложение банка',
    icon: markRaw(Icon3),
  },
  {
    title: 'Платите в магазине, курьеру или на сайте.',
    icon: markRaw(Icon6),
  },
  {
    title: 'По QR коду через Систему быстрых платежей',
    icon: markRaw(Icon7),
  },
  {
    title: 'Наличными',
    text: 'Оплачивайте наличными при получении товара в любом из наших магазинов',
    icon: markRaw(Icon4),
  },
  {
    title: 'Бесконтактная оплата смартфоном на базе Android и IOS',
    text: 'Для оплаты достаточно поднести смартфон к терминалу',
    icon: markRaw(Icon3),
  },
])
</script>

<template>

  <div class="items grid gap-2 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">

    <div v-for="(item, i) in items"
      class="item flex flex-col gap-6 w-full p-6 border border-gray-200 rounded-xl bg-white">
      <component :is="item.icon" />
      <div class="grid gap-2 lg:mt-auto">
        <div class="text-sm leading-5 text-gray-950 font-semibold">
          {{ item.title }}
        </div>
        <p v-if="item.text" class="text-sm leading-5 text-gray-700">
          {{ item.text }}
        </p>
      </div>
    </div>

  </div>

</template>

<style scoped>
@media (min-width: 1024px) {
  .item:nth-child(1),
  .item:nth-child(2),
  .item:nth-child(7),
  .item:nth-child(8) {
    grid-column: span 2;
  }
}
</style>