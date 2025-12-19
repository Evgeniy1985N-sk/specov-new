<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import { useProductsStore } from '@/stores/products'
import type { ProductCard } from '~/types/product'

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


          <div class="grid gap-6 w-full">

            <div class="flex justify-between items-center">
              <CatalogSort @handle-click="(value) => sort = value" />

              <CatalogSwitch @handle-click="isList = !isList" />
            </div>

            <div class="grid gap-8 grid-cols-3">
              <ProductCard v-for="item in items" :item="item" :key="item.id" />
            </div>

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