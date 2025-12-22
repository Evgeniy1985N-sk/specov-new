<script setup lang="ts">
import Icon4 from '@/components/about/icon/Icon-4.vue';
import Icon5 from '@/components/about/icon/Icon-5.vue';
import Icon6 from '@/components/about/icon/Icon-6.vue';
import Icon7 from '@/components/about/icon/Icon-7.vue';

const items = ref([
  {
    text: 'Возврат НДС',
    icon: markRaw(Icon4),
  },
  {
    text: 'Гибкие условия отсрочки платежа',
    icon: markRaw(Icon5),
  },
  {
    text: 'Оптовая система скидок',
    icon: markRaw(Icon6),
  },
  {
    text: 'Нанесение логотипа вашей компании на спецодежду',
    icon: markRaw(Icon7),
  },
])
</script>

<template>

  <div class="grid sm:grid-cols-2 lg:flex lg:flex-row gap-2 sm:gap-6">

    <div v-for="item in items"
      class="flex flex-col gap-6 w-full p-6 border border-gray-200 rounded-xl bg-white">
      <WrapIcon class="w-11 h-11 bg-gray-100 rounded-xl">
        <component :is="item.icon" />
      </WrapIcon>
      <p class="font-semibold mt-auto">
        {{ item.text }}
      </p>
    </div>

  </div>

</template>