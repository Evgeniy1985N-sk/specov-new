<script setup lang="ts">

interface Props {
  isShow: boolean
}

const props = defineProps<Props>()
const levelMenu = ref(0)
const isShowSelf = ref(true)

const menu = ref([
  {
    name: 'Способ получения',
    isActive: false,
    sub: [

      {
        title: 'Автосервисное оборудование',
        isActive: false,
        items: [

          {
            name: 'Автомобильные аксессуары',
            quntity: '34 054'
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

])

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
  } else {
    isShowSelf.value = false
  }
};


</script>

<template>
  <div v-if="props.isShow"
    class="lg:hidden custom-scrollbar fixed inset-0 z-100 h-screen bg-white overflow-auto">

    <SectionContainer>
      <div class="py-6">
        <button @click="goBack" class="flex items-center gap-2">
          <WrapIcon class="w-9 h-9">
            <CartIconArrowBack />
          </WrapIcon>
          <p class="text-[24px] leading-8 font-['Russo_One'] text-black">
            В корзину
          </p>
        </button>
      </div>

      <!-- mobile menu -->
      <ul class="grid gap-1 lg:hidden border-t border-(--border) text-sm leading-5 font-bold text-gray-600 pb-[100px]">

        <li v-for="(item, index) in menu" :key="index">

          <!-- menu 1 -->
          <div v-if="levelMenu == 0" @click="toggleMenu(index)"
            class="flex gap-1.5 items-center py-2.5 px-3.5 border-b border-(--border)">
            {{ item.name }}
            <WrapIcon class="ml-auto">
              <CartIconAng />
            </WrapIcon>
          </div>

          <ul v-if="item.isActive" class="grid gap-1">

            <li v-for="(group, groupIndex) in item.sub">

              <!-- menu 2 -->
              <div v-if="levelMenu == 1" @click="toggleSubMenu(index, groupIndex)"
                class="flex gap-1.5 items-center py-2.5 px-3.5 border-b border-(--border)">
                {{ group.title }}
                <i class="ml-auto flex items-center justify-center w-5 h-5">
                  <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.833496 10.8333L5.8335 5.83331L0.833496 0.833313" stroke="currentColor"
                      stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </i>
              </div>

              <ul v-if="levelMenu == 2 && group.isActive" class="grid gap-1">

                <li v-for="category in group.items">

                  <!-- menu 3 -->
                  <a v-if="group.isActive" class="flex gap-1.5 items-center py-2.5 px-3.5 border-b border-(--border)"
                    href="/">
                    {{ category.name }}

                    <i class="ml-auto flex items-center justify-center w-5 h-5">
                      <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.833496 10.8333L5.8335 5.83331L0.833496 0.833313" stroke="currentColor"
                          stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </i>
                  </a>

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
</style>