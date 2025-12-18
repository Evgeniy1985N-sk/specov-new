<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import { useProductsStore } from '@/stores/products'
import type { ProductCard } from '~/types/product'
import type filterVue from '../../components/catalog/filter.vue'

const items = useProductsStore().allProducts

const isShowThanks = ref(false)
const isShowMenu = ref(false)
const cart = useCartStore().cart
const allProducts = useProductsStore().allProducts
const products = ref<ProductCard[]>([])
const check = ref(true)
const counter = ref(0)

cart.forEach((item) => {
  const product = allProducts.find(p => p.id === item.id)
  if (product) {
    products.value.push(product)
  }
})



</script>

<template>

  <Header />

  <Breadcrumbs />


  <main>

    <Section class="mt-6! overflow-visible">
      <SectionContainer>

        <div class="flex gap-8">

          <!-- ASIDE -->
          <aside class="hidden lg:flex items-start w-full max-w-[280px]">
            <div class="sticky top-0 grid gap-6 p-4 bg-gray-100 rounded-lg w-full">

              <CatalogFilter />

            </div>
          </aside>
          <!-- ASIDE -->


          <div class="w-full">

            <div class="grid gap-8 grid-cols-3">
              <ProductCard v-for="item in items" :item="item" :key="item.id" />
            </div>

          </div>


        </div>

      </SectionContainer>

      <!-- Panel Mobile -->
      <div class="fixed bottom-[71px] sm:bottom-20 left-0 w-full py-6 bg-gray-100 lg:hidden">
        <SectionContainer>
          <div class="grid gap-4">
            <p class="flex items-baseline text-sm leading-5 text-gray-950 font-semibold">
              <span class="max-w-[500px] whitespace-nowrap pr-2">
                1 товар
              </span>
              <span class="flex-1 border-b border-dotted border-gray-300 border-opacity-0 relative h-0 mx-2"></span>
              <b class="font-bold text-gray-950 whitespace-nowrap">
                7 990 ₽
              </b>
            </p>
            <UButton @click="isShowThanks = true" class="min-h-9 sm:min-h-11">
              Оформить заказ
            </UButton>
          </div>
        </SectionContainer>
      </div>
      <!-- Panel Mobile -->

      <!-- Menu -->
      <CartMenu :is-show="isShowMenu" @close="isShowMenu = false" @open-thanks="isShowThanks = true" />
      <!-- Menu -->

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