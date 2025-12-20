<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import { useProductsStore } from '@/stores/products'
import type { ProductCard } from '~/types/product'

const aside = ref<HTMLElement | null>(null)

const isShoWFilter = ref(false)
const isList = ref(false)

const items = useProductsStore().allProducts

const cart = useCartStore().cart
const allProducts = useProductsStore().allProducts
const products = ref<ProductCard[]>([])

const sort = ref('Сначала популярные')

cart.forEach((item) => {
  const product = allProducts.find(p => p.id === item.id)
  if (product) {
    products.value.push(product)
  }
})

// Click не по элементу
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
          <aside ref="aside" :class="isShoWFilter ? 'left-0' :  '' " class="fixed top-0 -left-full h-screen overflow-auto lg:overflow-visible overscroll-[contain] transition z-100 lg:static flex items-start w-full max-w-[280px]">
            <div class="grid gap-6 p-4 bg-gray-100 rounded-lg w-full">

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
          </aside>
          <!-- ASIDE -->


          <div class="w-full">

            <!-- Top -->
            <div class="flex justify-between items-center flex-wrap gap-x-2 gap-y-4 pb-6">
              <CatalogSort @handle-click="(value) => sort = value" />

                <button @click="isShoWFilter = !isShoWFilter" class="flex lg:hidden gap-1.5 items-center sm:mr-auto text-sm">
                  Фильтры
                  <CatalogIconFilter />
                </button>

              <CatalogSwitch @handle-click="isList = !isList" />

            </div>
            <!-- Top -->

            <!-- Cards -->
            <div :class="isList ? 'grid-cols-1 gap-8 pt-6 border-t border-gray-300' : 'grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-6' " class="grid lg:gap-8">
              <ProductCard :is-row="isList" :is-list="!isList" v-for="item in items" :item="item" :key="item.id" />
            </div>
            <!-- Cards -->

          </div>

        </div>

      </SectionContainer>
    </Section>


    <Feedback class="hidden lg:block" />

    <Section class="hidden lg:block">
      <SectionContainer>
        <Stores />
      </SectionContainer>
    </Section>

  </main>

  <Footer class="hidden lg:block" />

</template>