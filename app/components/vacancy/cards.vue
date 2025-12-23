vacancy-Image<script setup lang="ts">
import Icon1 from '~/components/vacancy/icon/User.vue';
import Icon2 from '~/components/vacancy/icon/Tools.vue';
import Icon3 from '~/components/vacancy/icon/Current.vue';
import Icon4 from '~/components/vacancy/icon/Shield.vue';


const items = ref([
  {
    title: 'Присоединяйтесь к команде «Спецов» — нас уже 100+ человек',
    icon: markRaw(Icon1),
    isTheme: true
  },
  {
    title: 'Работаем без бюрократии',
    text: 'Слышим каждого сотрудника — каждый человек может зайти к руководству, чтобы предложить идею, обсудить проблемы или решить срочный вопрос',
    icon: markRaw(Icon2),
  },
  {
    title: 'Поощряем сотрудников',
    text: '<ul class="list-disc pl-5"><li>Премии за успешную работу</li><li>Специальные цены на всю продукцию</li></ul>',
    icon: markRaw(Icon3),
  },
  {
    title: 'Соблюдаем ТК РФ',
    text: '<ul class="list-disc pl-5"><li>Белый доход — выплата зарплаты два раза в месяц</li><li>Ежегодная индексация зарплаты</li><li>Оплачиваемые больничные и отпуск 28 дней</li></ul>',
    icon: markRaw(Icon4),
  },
])
</script>

<template>

  <div class="grid lg:grid-cols-2 gap-6">

    <div v-for="(item, i) in items" :class="item.isTheme ? 'bg-(--Brand-950)' : 'bg-white' " class="item flex flex-col p-6 border border-gray-200 rounded-xl">
      <WrapIcon :class="item.isTheme ? 'bg-(--Brand-700)' : 'bg-gray-100' " class="mb-6 w-11 h-11 rounded-xl">
        <component :is="item.icon" />
      </WrapIcon>
      <div class="cnt grid gap-2 mt-auto">
        <div :class="item.isTheme ? 'text-white' : 'text-gray-950' " class="mb-2 font-['Russo_One'] text-[24px] leading-8">
          {{ item.title }}
        </div>
        <p v-if="item.text" v-html="item.text" class="font-medium"></p>
      </div>
    </div>

  </div>

</template>

<style scoped>
.item:nth-child(3) .cnt {
  margin-top: 0;
}
</style>