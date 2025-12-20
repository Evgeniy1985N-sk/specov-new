<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import { useProductsStore } from '@/stores/products'
import type { ProductCard } from '~/types/product'

const isShowPopover = ref(false)
const isShoWFilter = ref(false)
const isList = ref(false)
const items = useProductsStore().allProducts
const cart = useCartStore().cart
const allProducts = useProductsStore().allProducts
const products = ref<ProductCard[]>([])
const sort = ref('Сначала популярные')
const gardenProducts = useProductsStore().garden

cart.forEach((item) => {
  const product = allProducts.find(p => p.id === item.id)
  if (product) {
    products.value.push(product)
  }
})

// Click не по элементу
// const aside = ref<HTMLElement | null>(null)
// const handleClickOutside = (event: Event) => {
//   if (aside.value && !aside.value.contains(event.target as Node)) {
//     isShoWFilter.value = false
//   }
// }

// onMounted(() => {
//   document.addEventListener('click', handleClickOutside)
// })

// onBeforeUnmount(() => {
//   document.removeEventListener('click', handleClickOutside)
// })

// const emit = defineEmits<{
//   (e: 'handleClick', value: string): void
// }>()
// Click не по элементу

</script>

<template>

  <Header />

  <Breadcrumbs />


  <main>

    <Section class="mt-6! overflow-visible">
      <SectionContainer>

        <div class="flex gap-8">


          <!-- ASIDE -->
          <aside ref="aside" :class="isShoWFilter ? 'left-0' : ''"
            class="fixed top-0 -left-full lg:left-0 h-screen overflow-auto lg:overflow-visible overscroll-[contain] transition z-100 lg:relative flex items-start w-full max-w-[280px]">
            <div @click="isShowPopover = !isShowPopover" class="grid gap-6 p-4 bg-gray-100 rounded-lg w-full">

              <CatalogFilter />

              <div class="grid gap-2">
                <UButton class="min-h-10" size="lg" type="submit">
                  Применить
                </UButton>

                <UButton
                  class="flex items-center justify-center h-10 cursor-pointer rounded-lg bg-white! border border-(--border) text-(--Brand-950) text-sm"
                  color="neutral">Сбросить
                </UButton>
              </div>

            </div>
            <CatalogPopover v-if="isShowPopover" :goods="10" />
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