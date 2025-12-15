<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import { useProductsStore } from '@/stores/products'
import type { ProductCard } from '~/types/product'


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
  <div class="hidden overflow-hidden [background:var(--Base-White)]">

    <Header />

    <main class="hidden">

      <Section class="mt-6!">
        <SectionContainer>

          <div class="grid gap-6">

            <div class="flex gap-2 items-baseline">
              <h1 class="text-[36px] leading-11 text-gray-950 font-['Russo_One']">
                Корзина
              </h1>
              <span class="text-sm leading-5">
                1 товар
              </span>
            </div>

            <CartPanel />

            <!-- card -->


          </div>

        </SectionContainer>
      </Section>

      <Feedback />

      <Section>
        <SectionContainer>
          <Stores />
        </SectionContainer>
      </Section>

    </main>

    <Footer class="hidden" />

  </div>
</template>