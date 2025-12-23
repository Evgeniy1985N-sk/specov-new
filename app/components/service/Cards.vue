<script setup lang="ts">
import Icon1 from '~/components/service/icon/Docs.vue';
import Icon2 from '~/components/service/icon/Pen.vue';
import Icon3 from '~/components/service/icon/Device.vue';
import Icon4 from '~/components/service/icon/Check.vue';

const items = ref([
  {
    title: 'Подготовьте товар и документы',
    text: 'Проверьте, что все комплектующие неисправного товара на месте, а гарантийный талон — заполнен. Для обращения в сервисный центр также понадобится чек или другой документ, который подтверждает покупку товара',
    icon: markRaw(Icon1),
  },
  {
    title: 'Напишите заявление на гарантийное обслуживание',
    text: 'Если сдаете оборудование в сервисный центр «Спецов», <a class="text-(--Brand-700)" href="/">скачайте заявление</a>, заполните его и распечатайте. Если сдаете оборудование в другой сервисный центр, запросите там шаблон заявления.',
    icon: markRaw(Icon2),
  },
  {
    title: 'Сдайте неисправный товар в сервисный центр',
    text: 'Можете принести в сервисный центр товар вместе с заполненным заявлением, гарантийным талоном и чеком или отправить через транспортную компанию. Сервисный центр должен выдать вам акт приема товара — сохраните его',
    icon: markRaw(Icon3),
  },
  {
    title: 'Дождитесь решения сервисного центра',
    text: 'Сервисный центр проведет диагностику и сообщит, подлежит ли товар ремонту. Если да, его отремонтируют и вернут вам. Если нет — предложат такой же товар на замену или вернут деньги',
    icon: markRaw(Icon4),
  },
])
</script>

<template>

  <div class="grid lg:grid-cols-2 gap-6">

    <div v-for="(item, i) in items" class="item flex flex-col p-6 border border-gray-200 rounded-xl bg-white">
      <WrapIcon class="mb-6 w-11 h-11 bg-gray-100 rounded-xl">
        <component :is="item.icon" />
      </WrapIcon>
      <div class="cnt grid gap-2 mt-auto">
        <span class="bg-gray-50 py-1 px-2.5 rounded-3xl w-fit">
          Шаг {{ i + 1 }}
        </span>
        <div class="mb-2 font-['Russo_One'] text-[24px] leading-8 text-gray-950">
          {{ item.title }}
        </div>
        <p v-if="item.text" v-html="item.text" class="font-medium"></p>
      </div>
    </div>

  </div>

</template>

<style scoped>
  .item:last-child .cnt {
    margin-top: 0;
  }
</style>