<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import { useProductsStore } from '@/stores/products'
import type { ProductCard } from '~/types/product'

const isShowPopover = ref(false)
const isShoWFilter = ref(false)
const isList = ref(false)
const items = useProductsStore().allProducts
const cart = useCartStore().cart
const products = ref<ProductCard[]>([])
const sort = ref('Сначала популярные')
const gardenProducts = useProductsStore().garden


const cards = ref([
  {
    name: 'Столярные',
    quantity: 698,
    image: '/image/example/img-1.jpg'
  },
  {
    name: 'Специальные',
    quantity: 418,
    image: '/image/example/img-2.jpg'
  },
  {
    name: 'Искробезопасные',
    quantity: 698,
    image: '/image/example/img-3.jpg'
  },
  {
    name: 'Безынерционные',
    quantity: 698,
    image: '/image/example/img-4.jpg'
  },
  {
    name: 'С медным бойком',
    quantity: 35,
    image: '/image/example/img-5.jpg'
  },
  {
    name: 'Молотки плиточника',
    quantity: 8,
    image: '/image/example/img-6.jpg'
  },
  {
    name: 'Кровельщика',
    quantity: 110,
    image: '/image/example/img-7.jpg'
  },
  {
    name: 'Молотки-топоры',
    quantity: 12,
    image: '/image/example/img-8.jpg'
  },
  {
    name: 'Рихтовочные',
    quantity: 261,
    image: '/image/example/img-9.jpg'
  },
  {
    name: 'Каменщика',
    quantity: 35,
    isActive: false,
    image: '/image/example/img-10.jpg'
  },
])

cart.forEach((item) => {
  const product = items.find(p => p.id === item.id)
  if (product) {
    products.value.push(product)
  }
})



</script>

<template>

  <Header />


  <Breadcrumbs />

  <main>

    <Section class="mt-6!">
      <SectionContainer>
        <TitleGoods class="mb-6" :goods="116" title="Фены строительные" />

        <CatalogCardSlider :items="cards" class="mb-8 hidden! md:block!" />

        <div class="flex gap-8">


          <!-- ASIDE -->
          <aside ref="aside" :class="isShoWFilter ? 'left-0' : ''"
            class="fixed top-0 -left-full lg:left-0 h-screen overflow-auto lg:overflow-visible overscroll-[contain] transition z-100 lg:relative flex items-start w-full lg:max-w-[280px]">

            <div class="grid gap-6 pb-36 sm:pb-40 lg:p-4 bg-white lg:bg-gray-100 rounded-lg w-full h-auto">

              <!-- HEADER -->
              <div class="flex lg:hidden justify-between items-center p-4 sm:p-6 border-b border-gray-200">

                <button @click="isShoWFilter = false" class="flex items-center gap-2">
                  <WrapIcon>
                    <CatalogIconBack />
                  </WrapIcon>
                  <p class="text-[24px] leading-8 font-['Russo_One'] text-black">
                    Фильтры
                  </p>
                </button>
                <button @click="isShoWFilter = false">
                  <WrapIcon class="w-9 h-9">
                    <CatalogIconCross />
                  </WrapIcon>
                </button>

              </div>
              <!-- HEADER -->

              <!-- FILTER -->
              <CatalogFilter class="px-4 sm:px-6 lg:px-0" @handle-click="isShowPopover = true" />
              <!-- FILTER -->

              <!-- BUTTONS -->
              <div
                class="fixed bottom-0 w-full bg-white lg:static grid gap-2 p-4 sm:p-6 lg:p-0 border-t border-gray-200">
                <UButton class="min-h-10" size="lg" type="submit">
                  Применить
                </UButton>

                <UButton
                  class="flex items-center justify-center h-10 cursor-pointer rounded-lg bg-white! border border-(--border) text-(--Brand-950) text-sm"
                  color="neutral">Сбросить
                </UButton>
              </div>
              <!-- BUTTONS -->

            </div>

            <!-- POPOVER -->
            <CatalogPopover v-if="isShowPopover" :goods="10" class="hidden! lg:inline-block!" />
            <!-- POPOVER -->


          </aside>
          <!-- ASIDE -->


          <div class="w-full">

            <!-- Top -->
            <div class="flex justify-between items-center flex-wrap gap-x-2 gap-y-4 pb-6">
              <CatalogSort @handle-click="(value) => sort = value" />

              <button @click="isShoWFilter = !isShoWFilter"
                class="flex lg:hidden gap-1.5 items-center sm:mr-auto text-sm">
                Фильтры
                <CatalogIconFilter />
              </button>

              <CatalogSwitch @handle-click="isList = !isList" />

            </div>
            <!-- Top -->


            <CatalogCardSlider :items="cards" class="mb-6! md:hidden!" />


            <!-- Cards -->
            <div
              :class="isList ? 'grid-cols-1 gap-8 pt-6 border-t border-gray-300' : 'grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-6'"
              class="grid lg:gap-8">
              <ProductCard :is-row="isList" :is-list="!isList" v-for="item in items" :item="item" :key="item.id" />
            </div>
            <!-- Cards -->

            <!-- More Cards -->
            <UButton
              class="w-full min-h-10 mt-6 bg-gray-100 text-(--Brand-950) text-sm font-semibold hover:bg-gray-200 active:bg-gray-300 cursor-pointer px-4 py-2.5">
              Показать еще
            </UButton>
            <!-- More Cards -->

          </div>

        </div>

      </SectionContainer>
    </Section>

    <Section>
      <SectionContainer>
        <SectionHeader>
          <SectionTitle text="Вы недавно смотрели" />
          <SectionButton text="Смотреть всё" path="/" />
        </SectionHeader>

        <ProductSlider :items="gardenProducts" />

      </SectionContainer>
    </Section>

    <Feedback />

    <Section>
      <SectionContainer>
        <Stores />
      </SectionContainer>
    </Section>

  </main>

  <Footer />

</template>