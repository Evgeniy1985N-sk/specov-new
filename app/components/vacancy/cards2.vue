vacancy-Image<script setup lang="ts">
import Icon1 from '~/components/vacancy/icon/Book.vue';
import Icon2 from '~/components/vacancy/icon/Hat.vue';
import Icon3 from '~/components/vacancy/icon/Paper.vue';
import Icon4 from '~/components/vacancy/icon/Growing.vue';


const items = ref([
  {
    title: 'Обучение для новичков',
    text: 'Сопровождаем каждого сотрудника при трудоустройстве — знакомим с коллективом, плавно погружаем в процессы, отвечаем на вопросы, помогаем закрепить знания и применять их в работе',
    icon: markRaw(Icon1),
  },
  {
    title: 'Собственная Академия знаний',
    text: 'Собрали и регулярно пополняем большую базу знаний, в которой можно найти ответ на любой вопрос: например, как правильно оформить документы, как работать с торговой программой или как помочь клиенту выбрать оборудование',
    icon: markRaw(Icon2),
  },
  {
    title: 'Внешнее обучение',
    text: 'Приглашаем представителей крупных брендов, которые рассказывают о новинках. Отправляем своих сотрудников на профильные конференции и обучение за счет компании',
    icon: markRaw(Icon3),
  },
  {
    title: 'Карьерный рост',
    text: 'Приветствуем инициативность в работе и помогаем таким сотрудникам расти по карьерной лестнице',
    icon: markRaw(Icon4),
  },
])
</script>

<template>

  <div class="grid lg:grid-cols-2 gap-6">

    <div v-for="(item, i) in items" class="item flex flex-col p-6 bg-white border border-gray-200 rounded-xl">
      <WrapIcon class="mb-6 w-11 h-11 rounded-xl bg-gray-100">
        <component :is="item.icon" />
      </WrapIcon>
      <div class="cnt grid gap-2">
        <div class="mb-2 font-['Russo_One'] text-[24px] leading-8 text-gray-950">
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