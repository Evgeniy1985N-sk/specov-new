<script setup lang="ts">
import CartTabs from '@/components/cart/Tabs.vue'
import CartPayment from '@/components/cart/Payment.vue'

interface Props {
  isShow: boolean
}

const props = defineProps<Props>()
const levelMenu = ref(0)
const title = ref('В корзину')
const isActiveDelivery = ref(false)

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'openThanks'): void
}>()

const menu = ref([
  {
    name: 'Данные покупателя',
    text1: 'ООО «Название компании»',
    text2: '+7 (999) 999-99-99',
    isActive: false,
  },
  {
    name: 'Способ получения',
    text1: 'Самовывоз',
    isActive: false,
    isMethodGetting: true,
    sub: [

      {
        component: markRaw(CartTabs),
        isActive: false,
      },

    ]

  },
  {
    name: 'Пункт выдачи',
    text1: 'г. Тюмень, Горпищекомбинатовская улица, 1с1',
    text3: 'Забрать заказ можно: сегодня после 16:00',
    isActive: false,
    isDelivery: true,
    sub: [

      {
        component: false,
        isActive: false,
      },

    ]

  },

  {
    name: 'Способ оплаты',
    text1: 'Оплата счета',
    isActive: false,
    isPayment: true,
    sub: [

      {
        component: markRaw(CartPayment),
        isActive: false,
      },

    ]

  },

])


function toggleMenu(item: typeof menu.value[0], id: number) {
  if (!item.sub) return
  levelMenu.value++
  menu.value = menu.value.map((item, index) => {
    item.isActive = false
    if (index == id) {
      item.isActive = true
      title.value = item.name
    }
    return item
  })
}


const goBack = () => {
  if (levelMenu.value > 0) {
    levelMenu.value--;
    if (levelMenu.value == 0) title.value = 'В корзину'
  } else {
    title.value = 'В корзину'
    emit('close')
  }
};




</script>

<template>
  <div v-if="props.isShow" class="lg:hidden custom-scrollbar fixed inset-0 z-100 h-screen bg-white overflow-auto">

    <SectionContainer>
      <div class="py-6">
        <button @click="goBack" class="flex items-center gap-2">
          <WrapIcon class="w-9 h-9">
            <CartIconArrowBack />
          </WrapIcon>
          <p class="text-[24px] leading-8 font-['Russo_One'] text-black">
            {{ title }}
          </p>
        </button>
      </div>

      <!-- mobile menu -->
      <ul class="grid border-t border-(--border) pb-6">

        <li v-for="(item, index) in menu" :key="index">

          <!-- menu 1 -->
          <div v-if="levelMenu == 0" @click="toggleMenu(item, index)"
            class="flex gap-1.5 items-center py-6 border-b border-(--border)">
            <div class="grid gap-2">
              <p class="text-black font-bold">
                {{ item.name }}
              </p>
              <span class="text-gray-950">
                {{ item.text1 }}
              </span>
              <span v-if="item.text2" class="text-gray-950">
                {{ item.text2 }}
              </span>
              <span v-if="item.text3" class="text-gray-950 text-sm leading-5">
                {{ item.text3 }}
              </span>
            </div>

            <WrapIcon v-if="item.sub" class="ml-auto">
              <CartIconAng />
            </WrapIcon>

          </div>

          <ul v-if="item.isActive">

            <li v-for="(group, i) in item.sub" :key="i">

              <!-- menu 2 -->
              <div v-if="levelMenu == 1" class="grid py-6 border-b border-(--border)">

                <component v-if="item.isMethodGetting || item.isPayment" :is="group.component" />

                <template v-if="item.isDelivery">
                  <CartDelivery @toggle-active="isActiveDelivery = true" :is-active="isActiveDelivery"
                    class="pb-6 mb-6 border-b border-gray-300" text="г. Тюмень, Горпищекомбинатовская улица, 1с1" />
                  <CartDelivery @toggle-active="isActiveDelivery = false" :is-active="!isActiveDelivery"
                    text="г. Тюмень, улица 50 лет Октября, 118А" />
                </template>

              </div>

            </li>

          </ul>

        </li>

      </ul>

      <div v-if="!levelMenu" class="grid gap-6">

        <CartTotal />

        <UButton @click="$emit('openThanks')" size="xl" type="submit">
          Оформить заказ
        </UButton>

      </div>

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