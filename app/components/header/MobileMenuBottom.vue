<script setup lang="ts">
import IconHome from '@/components/header/icon/Home.vue'
import IconBurger from '@/components/header/icon/Burger.vue'
import IconCart from '@/components/header/icon/Cart.vue'
import IconFavorite from '@/components/header/icon/Favorite.vue'
import IconCabinet from '@/components/header/icon/Cabinet.vue'

const emit = defineEmits(['toggle-catalog', 'toggle-profile'])

interface MenuItemButton {
  name: string;
  src?: string;
  isActive: boolean;
}

const buttons = ref([
  {
    name: 'Главная',
    src: '/',
    icon: markRaw(IconHome),
    isActive: true
  },
  {
    name: 'Каталог',
    icon: markRaw(IconBurger),
    isActive: false
  },
  {
    name: 'Корзина',
    src: '/cart',
    icon: markRaw(IconCart),
    isActive: false
  },
  {
    name: 'Избранное',
    src: '/favorites',
    icon: markRaw(IconFavorite),
    isActive: false
  },
  {
    name: 'Кабинет',
    icon: markRaw(IconCabinet),
    isActive: false
  },
]);

function handleClick(item: MenuItemButton, index: number) {
  buttons.value.forEach((btn, i) => {
    btn.isActive = i === index;
  });

  if (item.name === 'Каталог') {
    emit('toggle-catalog');
  }

  if (item.name === 'Кабинет') {
    emit('toggle-profile');
  }

  if (item.src) {
    navigateTo(item.src);
  }
}
</script>

<template>

  <div
    class="lg:hidden fixed bg-white z-100 bottom-0 left-0 py-3 sm:py-[18px] w-full border-t border-(--border) border-solid">
    <div class="max-w-(--container) m-auto px-2.5 sm:px-4">
      <div class="flex justify-between">

        <a v-for="(item, index) in buttons" :href="item?.src" @click.prevent="handleClick(item, index)"
          :class="[item.isActive ? 'text-(--Brand-700)' : 'text-gray-600']"
          class="flex flex-col items-center gap-2 text-xs sm:text-sm leading-[18px] sm:leading-5 transition font-bold sm:font-medium">
          <span class="h-5 w-5">
            <component :is="item.icon" />
          </span>
          {{ item.name }}
        </a>

      </div>
    </div>
  </div>

</template>

<style></style>