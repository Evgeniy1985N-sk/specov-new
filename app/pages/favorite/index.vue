<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import { useProductsStore } from '@/stores/products'
import type { ProductCard } from '~/types/product'

const isShowPopup = ref(true)

const isShoWFilter = ref(false)
const isList = ref(false)
const items = useProductsStore().allProducts
const cart = useCartStore().cart
const allProducts = useProductsStore().allProducts
const products = ref<ProductCard[]>([])

cart.forEach((item) => {
  const product = allProducts.find(p => p.id === item.id)
  if (product) {
    products.value.push(product)
  }
})


</script>

<template>

  <Header />

  <main>

    <Section class="mt-6! overflow-visible">
      <SectionContainer>

          <FavoritePopup v-if="isShowPopup" @close-popup="isShowPopup = false" class="mb-6" date="12.01.2026" />

        <div class="flex gap-8">


          <!-- ASIDE -->
          <aside ref="aside" :class="isShoWFilter ? 'left-0' : ''"
            class="fixed top-0 -left-full lg:left-0 h-screen overflow-auto lg:overflow-visible overscroll-[contain] transition z-100 lg:z-0 lg:relative flex items-start w-full max-w-[280px]">
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

            <!-- Cards -->
            <div
              :class="isList ? 'grid-cols-1 gap-8 pt-6 border-t border-gray-300' : 'grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-6'"
              class="grid lg:gap-8">
              <ProductCard :is-row="isList" :is-list="!isList" v-for="item in items" :item="item" :key="item.id" />
            </div>
            <!-- Cards -->

          </div>

        </div>

      </SectionContainer>
    </Section>

  </main>

  <Footer />

</template>