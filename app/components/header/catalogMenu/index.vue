<script setup lang="ts">
import Battery from '@/components/header/catalogMenu/icon/Battery.vue';
import Bonfire from '@/components/header/catalogMenu/icon/Bonfire.vue';
import Goods from '@/components/header/catalogMenu/icon/Goods.vue';
import Instrument from '@/components/header/catalogMenu/icon/Instrument.vue';
import Pot from '@/components/header/catalogMenu/icon/Pot.vue';
import Workwear from '@/components/header/catalogMenu/icon/Workwear.vue';

interface Props {
  isShow: boolean
}

const props = defineProps<Props>()
const emit = defineEmits(['hideCatalog'])
const levelMenu = ref(0)

const menu = ref([
  {
    name: 'Автотовары',
    icon: markRaw(Battery),
    isActive: false,
    sub: [

      {
        title: 'Автосервисное оборудование',
        isActive: false,
        items: [

          {
            name: 'Автомобильные аксессуары',
            quntity: '34 054',
            src: '/catalog'
          },
          {
            name: 'Автомобильные масла и смазки',
            quntity: '19 754'
          },
          {
            name: 'Автохимия',
            quntity: '45 043'
          },
          {
            name: 'Детейлинг',
            quntity: '14 954'
          },

          {
            name: 'Домкраты',
            quntity: '34 054'
          },
          {
            name: 'Заправочное и смазочное оборудование',
            quntity: '19 754'
          },
          {
            name: 'Инструмент и оборудование для покраски',
            quntity: '45 043'
          },
          {
            name: 'Лебедки',
            quntity: '14 954'
          },

          {
            name: 'Оборудование для мойки',
            quntity: '34 054'
          },
          {
            name: 'Пуско-зарядные и зарядные устройства',
            quntity: '19 754'
          },
          {
            name: 'Оборудование для мойки автомобилей',
            quntity: '45 043'
          },
          {
            name: 'Сервисно-гаражный инструмент',
            quntity: '14 954'
          },

        ]
      },

      {
        title: 'Автохимия',
        isActive: false,
        items: [

          {
            name: 'Автокосметика',
            quntity: '34 054'
          },
          {
            name: 'Автомобильные масла',
            quntity: '19 754'
          },
          {
            name: 'Бутылки для автохимии',
            quntity: '45 043'
          },
          {
            name: 'Защитные покрытия',
            quntity: '14 954'
          },

          {
            name: 'Локализация утечек',
            quntity: '34 054'
          },
          {
            name: 'Очистители',
            quntity: '19 754'
          },
          {
            name: 'Размораживатели',
            quntity: '45 043'
          },
          {
            name: 'Средства для ремонта',
            quntity: '14 954'
          },

          {
            name: 'Технические жидкости',
            quntity: '34 054'
          },

        ]
      },

      {
        title: 'Автомобильные аксессуары',
        isActive: false,
        items: [

          {
            name: 'Автомобильная электроника',
            quntity: '34 054'
          },
          {
            name: 'Автомобильные аккумуляторы',
            quntity: '19 754'
          },
          {
            name: 'Автомобильный крепеж',
            quntity: '45 043'
          },
          {
            name: 'Аксессуары в салон автомобиля',
            quntity: '14 954'
          },

          {
            name: 'Аксессуары для багажника',
            quntity: '34 054'
          },
          {
            name: 'Аксессуары для очистки стекол',
            quntity: '19 754'
          },
          {
            name: 'Аксессуары для капотного пространства',
            quntity: '45 043'
          },
          {
            name: 'Запчасти для авто',
            quntity: '14 954'
          },

          {
            name: 'Зеркала',
            quntity: '34 054'
          },
          {
            name: 'Компрессоры автомобильные',
            quntity: '19 754'
          },
          {
            name: 'Наборы для тонировки стекол',
            quntity: '45 043'
          },
          {
            name: 'Противоугонные устройства',
            quntity: '14 954'
          },

        ]
      },

    ]
  },
  {
    name: 'Инструменты и строительное оборудование',
    icon: markRaw(Instrument),
    isActive: false,
    sub: [

      {
        title: 'Бензопилы',
        isActive: false,
        items: [

          {
            name: 'Бензопила SC30L',
            quntity: '45 043'
          },
          {
            name: 'Детейлинг',
            quntity: '14 954'
          },

          {
            name: 'Домкраты',
            quntity: '34 054'
          },
          {
            name: 'Заправочное и смазочное оборудование',
            quntity: '19 754'
          },
          {
            name: 'Инструмент и оборудование для покраски',
            quntity: '45 043'
          },
          {
            name: 'Лебедки',
            quntity: '14 954'
          },

          {
            name: 'Оборудование для мойки',
            quntity: '34 054'
          },
          {
            name: 'Пуско-зарядные и зарядные устройства',
            quntity: '19 754'
          },
          {
            name: 'Оборудование для мойки автомобилей',
            quntity: '45 043'
          },
          {
            name: 'Сервисно-гаражный инструмент',
            quntity: '14 954'
          },

        ]
      },

      {
        title: 'Автохимия',
        isActive: false,
        items: [

          {
            name: 'Автокосметика',
            quntity: '34 054'
          },
          {
            name: 'Автомобильные масла',
            quntity: '19 754'
          },
          {
            name: 'Бутылки для автохимии',
            quntity: '45 043'
          },
          {
            name: 'Защитные покрытия',
            quntity: '14 954'
          },

          {
            name: 'Локализация утечек',
            quntity: '34 054'
          },
          {
            name: 'Очистители',
            quntity: '19 754'
          },
          {
            name: 'Размораживатели',
            quntity: '45 043'
          },
          {
            name: 'Средства для ремонта',
            quntity: '14 954'
          },

          {
            name: 'Технические жидкости',
            quntity: '34 054'
          },

        ]
      },

      {
        title: 'Автомобильные аксессуары',
        isActive: false,
        items: [

          {
            name: 'Автомобильная электроника',
            quntity: '34 054'
          },
          {
            name: 'Автомобильные аккумуляторы',
            quntity: '19 754'
          },
          {
            name: 'Автомобильный крепеж',
            quntity: '45 043'
          },
          {
            name: 'Аксессуары в салон автомобиля',
            quntity: '14 954'
          },

          {
            name: 'Аксессуары для багажника',
            quntity: '34 054'
          },
          {
            name: 'Аксессуары для очистки стекол',
            quntity: '19 754'
          },
          {
            name: 'Аксессуары для капотного пространства',
            quntity: '45 043'
          },
          {
            name: 'Запчасти для авто',
            quntity: '14 954'
          },

          {
            name: 'Наборы для тонировки стекол',
            quntity: '45 043'
          },
          {
            name: 'Противоугонные устройства',
            quntity: '14 954'
          },

        ]
      },

    ]
  },
  {
    name: 'Охота, рыбалка и активный отдых',
    icon: markRaw(Bonfire),
    isActive: false,
    sub: [

      {
        title: 'Удочки',
        isActive: false,
        items: [

          {
            name: 'Спининги',
            quntity: '19 754'
          },
          {
            name: 'Автохимия',
            quntity: '45 043'
          },
          {
            name: 'Детейлинг',
            quntity: '14 954'
          },

          {
            name: 'Домкраты',
            quntity: '34 054'
          },
          {
            name: 'Заправочное и смазочное оборудование',
            quntity: '19 754'
          },
          {
            name: 'Инструмент и оборудование для покраски',
            quntity: '45 043'
          },
          {
            name: 'Лебедки',
            quntity: '14 954'
          },

          {
            name: 'Оборудование для мойки',
            quntity: '34 054'
          },
          {
            name: 'Пуско-зарядные и зарядные устройства',
            quntity: '19 754'
          },
          {
            name: 'Оборудование для мойки автомобилей',
            quntity: '45 043'
          },
          {
            name: 'Сервисно-гаражный инструмент',
            quntity: '14 954'
          },

        ]
      },

      {
        title: 'Лодки',
        isActive: false,
        items: [

          {
            name: 'Надувные лодки',
            quntity: '34 054'
          },
          {
            name: 'Автомобильные масла',
            quntity: '19 754'
          },
          {
            name: 'Бутылки для автохимии',
            quntity: '45 043'
          },
          {
            name: 'Защитные покрытия',
            quntity: '14 954'
          },

          {
            name: 'Локализация утечек',
            quntity: '34 054'
          },
          {
            name: 'Очистители',
            quntity: '19 754'
          },
          {
            name: 'Размораживатели',
            quntity: '45 043'
          },
          {
            name: 'Средства для ремонта',
            quntity: '14 954'
          },

          {
            name: 'Технические жидкости',
            quntity: '34 054'
          },

        ]
      },

      {
        title: 'Палатки',
        isActive: false,
        items: [

          {
            name: 'Палатки 3-х местные',
            quntity: '34 054'
          },
          {
            name: 'Автомобильные аккумуляторы',
            quntity: '19 754'
          },
          {
            name: 'Автомобильный крепеж',
            quntity: '45 043'
          },
          {
            name: 'Аксессуары в салон автомобиля',
            quntity: '14 954'
          },

          {
            name: 'Аксессуары для багажника',
            quntity: '34 054'
          },
          {
            name: 'Аксессуары для очистки стекол',
            quntity: '19 754'
          },
          {
            name: 'Аксессуары для капотного пространства',
            quntity: '45 043'
          },
          {
            name: 'Запчасти для авто',
            quntity: '14 954'
          },

          {
            name: 'Зеркала',
            quntity: '34 054'
          },
          {
            name: 'Компрессоры автомобильные',
            quntity: '19 754'
          },
          {
            name: 'Наборы для тонировки стекол',
            quntity: '45 043'
          },
          {
            name: 'Противоугонные устройства',
            quntity: '14 954'
          },

        ]
      },
    ]
  },
  {
    name: 'Сад и огород',
    icon: markRaw(Pot),
    isActive: false
  },
  {
    name: 'Спецодежда, обувь, СИЗ',
    icon: markRaw(Workwear),
    isActive: false
  },
  {
    name: 'Товары для дома',
    icon: markRaw(Goods),
    isActive: false
  },
])

function toggleActive(id: number) {
  menu.value = menu.value.map((item, index) => {
    item.isActive = false
    if (index == id) {
      item.isActive = true
    }
    return item
  })
}

function toggleMenu(id: number) {
  levelMenu.value++
  menu.value = menu.value.map((item, index) => {
    item.isActive = false
    if (index == id) {
      item.isActive = true
    }
    return item
  })
}

function toggleSubMenu(id: number, idSub: number) {
  levelMenu.value++
  const submenu = menu.value[id]?.sub;
  if (!submenu) return;

  submenu.forEach((item) => {
    item.isActive = false;
  });

  if (submenu[idSub] !== undefined) {
    submenu[idSub].isActive = true;
  }
}

const goBack = () => {
  if (levelMenu.value > 0) {

    levelMenu.value--;
    if (levelMenu.value == 0) {
      navigateTo('/catalog');
    }
  } else {
    navigateTo('/catalog');
  }
};

// interface Search {
//   showSearch: () => void
// }
// const { showSearch } = inject<Search>('search')!

</script>

<template>
  <div v-if="props.isShow"
    class="custom-scrollbar absolute h-[calc(100vh-128px)] inset-0 lg:top-32 z-100 lg:py-6 bg-white lg:border-t border-(--border) overflow-auto">

    <!-- BUTTON BACK -->
    <div class="lg:hidden border-b border-(--border) py-2.5 sm:py-6">
      <SectionContainer class="max-w-full px-6">

        <div class="flex justify-between items-center">

          <button @click="goBack" class="flex items-center gap-2">
            <WrapIcon>
              <HeaderCatalogMenuIconBack />
            </WrapIcon>
            <p class="text-[24px] leading-8 font-['Russo_One'] text-black">
              Каталог
            </p>
          </button>
          <button @click="$emit('hideCatalog')">
            <WrapIcon class="w-9 h-9">
              <HeaderCatalogMenuIconCross />
            </WrapIcon>
          </button>

        </div>

      </SectionContainer>
    </div>
    <!-- BUTTON BACK -->

    <SectionContainer class="max-w-full lg:max-w-(--container) relative px-6 lg:px-4">

      <HeaderSearch class="mt-6 mb-6 lg:hidden" />

      <!-- desk menu -->
      <ul class="hidden lg:grid gap-1 lg:max-w-[280px]">

        <li v-for="(item, index) in menu" :key="index" @click="toggleActive(index)"
          :class="[item.isActive ? 'lg:bg-gray-100' : 'lg:relative z-1']" class="py-2.5 px-3.5 rounded-lg">

          <div :class="[item.isActive ? 'lg:text-(--Brand-700)' : 'text-gray-600']" href=""
            class="flex gap-1.5 items-center cursor-pointer text-sm leading-5 font-bold hover:text-(--Brand-700)">
            <span class="flex items-center justify-center h-6 w-6">
              <component :is="item.icon" />
            </span>
            {{ item.name }}
          </div>

          <div v-if="item.isActive" class="lg:absolute top-0 left-0 px-4 pb-4 grid gap-8 grid-cols-[280px_1fr]">
            <ul class="grid gap-10 col-2">
              <li v-for="group in item.sub">

                <p class="mb-4 text-[20px] leading-[30px] text-gray-950 font-bold">
                  {{ group.title }}
                </p>

                <ul class="columns-3 gap-x-8 gap-y-3">

                  <li v-for="category in group.items" class="mb-3">
                    <NuxtLink class="custom-item flex items-center justify-between gap-2 hover:text-(--Brand-700) text-gray-950 transition" :to="category?.src">
                      <p class="w-full max-w-[190px] text-sm leading-5 font-medium">
                        {{ category.name }}
                      </p>
                      <span class="shrink-0 text-sm leading-5 font-medium text-gray-600">
                        {{ category.quntity }}
                      </span>
                      <WrapIcon class="w-9 h-9">
                        <HeaderCatalogMenuIconAng />
                      </WrapIcon>
                    </NuxtLink>
                  </li>

                </ul>

              </li>
            </ul>
          </div>

        </li>

      </ul>

      <!-- mobile menu -->
      <ul class="grid gap-1 lg:hidden border-t border-(--border) text-sm leading-5 font-bold text-gray-600 pb-[100px]">

        <li v-for="(item, index) in menu" :key="index">

          <!-- menu 1 -->
          <div v-if="levelMenu == 0" @click="toggleMenu(index)"
            class="flex gap-1.5 items-center py-2.5 px-3.5 border-b border-(--border)">
            <span class="flex items-center justify-center h-6 w-6">
              <component :is="item.icon" />
            </span>
            {{ item.name }}
            <WrapIcon class="ml-auto">
              <HeaderCatalogMenuIconAng />
            </WrapIcon>
          </div>

          <ul v-if="item.isActive" class="grid gap-1">

            <li v-for="(group, groupIndex) in item.sub">

              <!-- menu 2 -->
              <div v-if="levelMenu == 1" @click="toggleSubMenu(index, groupIndex)"
                class="flex gap-1.5 items-center py-2.5 px-3.5 border-b border-(--border)">
                {{ group.title }}
                <WrapIcon class="ml-auto">
                  <HeaderCatalogMenuIconAng />
                </WrapIcon>
              </div>

              <ul v-if="levelMenu == 2 && group.isActive" class="grid gap-1">

                <li v-for="category in group.items">

                  <!-- menu 3 -->
                  <NuxtLink v-if="group.isActive"
                    class="flex gap-1.5 items-center py-2.5 px-3.5 border-b border-(--border)" to="/catalog">
                    {{ category.name }}

                    <WrapIcon class="ml-auto">
                      <HeaderCatalogMenuIconAng />
                    </WrapIcon>
                  </NuxtLink>

                </li>

              </ul>

            </li>

          </ul>

        </li>

      </ul>

    </SectionContainer>

  </div>
</template>


<style scoped>
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #c1c1c1 #f1f1f1;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
.custom-item:hover span {
  color: var(--Brand-700);
  transition: .1s;
}
</style>