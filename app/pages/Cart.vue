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
  <div class="[background:var(--Base-White)]">

    <Header />

    <main>

      <Section class="mt-6! overflow-visible">
        <SectionContainer>

          <div class="flex gap-8">

            <div class="grid gap-6 w-full">

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
              <div v-for="(product, i) in products" class="w-full sm:p-4 bg-white transition" :key="i">

                <div class="flex justify-between items-center gap-6 flex-wrap">

                  <div class="flex sm:items-center gap-4 lg:max-w-[520px] w-full">
                    <UCheckbox size="xl" v-model="check" />
                    <img class="w-20 h-20 sm:w-12 sm:h-12 object-contain" :src="product?.image" :alt="product?.title">
                    <div class="lg:max-w-[392px] w-full">
                      <div>
                        <div class="flex flex-col-reverse gap-2 sm:gap-6">
                          <span class="text-sm leading-5">
                            Код товара: 15561175
                          </span>
                          <CartMark />
                        </div>
                        <p
                          class="text-gray-950 font-bold max-w-[308px] lg:max-w-full sm:line-clamp-2 sm:overflow-hidden">
                          {{ product?.title }}
                        </p>
                      </div>

                      <div class="flex justify-between flex-wrap lg:hidden mt-4">
                        <div class="max-w-[116px]">
                          <UInputNumber v-model="counter" :min="0" size="md" color="neutral" :ui="{ root: 'h-[36px]' }"
                            :increment="{
                              class: 'bg-transparen',
                              color: 'neutral',
                              variant: 'solid',
                              size: 'md',
                            }" :decrement="{
                              color: 'neutral',
                              variant: 'solid',
                              size: 'md'
                            }" />
                        </div>

                        <div class="flex items-center justify-between sm:max-w-[150px] w-full">
                          <p class="text-5 leading-[30px] font-semibold text-gray-950">
                            {{ product?.price.toLocaleString('ru-RU') }} ₽
                          </p>
                          <CartButton class="ml-auto sm:ml-0">
                            <WrapIcon class="w-9 h-9">
                              <CartIconFavorite />
                            </WrapIcon>
                          </CartButton>
                          <CartButton>
                            <WrapIcon class="w-9 h-9">
                              <CartIconTrash />
                            </WrapIcon>
                          </CartButton>
                        </div>

                      </div>

                    </div>
                  </div>

                  <div class="hidden lg:block max-w-[116px]">
                    <UInputNumber v-model="counter" :min="0" size="md" color="neutral" :ui="{ root: 'h-[36px]' }"
                      :increment="{
                        color: 'neutral',
                        variant: 'solid',
                        size: 'md',
                      }" :decrement="{
                        color: 'neutral',
                        variant: 'solid',
                        size: 'md'
                      }" />
                  </div>

                  <div class="hidden lg:flex items-center max-w-[150px] w-full">
                    <p class="text-5 leading-[30px] font-semibold text-gray-950">
                      {{ product?.price.toLocaleString('ru-RU') }} ₽
                    </p>
                    <CartButton>
                      <WrapIcon class="w-9 h-9">
                        <CartIconFavorite />
                      </WrapIcon>
                    </CartButton>
                    <CartButton>
                      <WrapIcon class="w-9 h-9">
                        <CartIconTrash />
                      </WrapIcon>
                    </CartButton>
                  </div>

                </div>

              </div>

            </div>

            <aside class="hidden lg:flex items-start w-full max-w-[280px]">
              <div class="sticky top-0 grid gap-4 p-6 bg-gray-100 rounded-lg w-full">

                <div class="font-bold text-black">
                  Детали заказа
                </div>

                <div class="grid gap-3">

                  <div class="grid gap-1">
                    <p class="flex text-gray-950 font-semibold gap-1.5 items-center">
                      <WrapIcon>
                        <CartIconShop />
                      </WrapIcon>
                      <span class="text-sm font-medium leading-5">
                        Самовывоз
                      </span>
                    </p>
                    <span class="text-sm font-medium leading-5">
                      ул. 50 лет Октября, 118А
                    </span>
                    <button class="text-(--Brand-700) cursor-pointer text-sm leading-5 text-left">
                      Изменить
                    </button>
                  </div>

                  <div class="grid gap-1">
                    <p class="flex text-gray-950 font-semibold gap-1.5 items-center">
                      <WrapIcon>
                        <CartIconUser />
                      </WrapIcon>
                      <span class="text-sm font-medium leading-5">
                        Покупатель
                      </span>
                    </p>
                    <button class="text-(--Brand-700) cursor-pointer text-sm leading-5 text-left">
                      Указать данные
                    </button>
                  </div>

                  <div class="grid gap-1">
                    <p class="flex text-gray-950 font-semibold gap-1.5 items-center">
                      <WrapIcon>
                        <CartIconCurrency />
                      </WrapIcon>
                      <span class="text-sm font-medium leading-5">
                        Способ оплаты
                      </span>
                    </p>
                    <span class="text-sm font-medium leading-5">
                      СБП
                    </span>
                    <button class="text-(--Brand-700) cursor-pointer text-sm leading-5 text-left">
                      Изменить
                    </button>
                  </div>

                </div>

                <div class="grid gap-4">
                  <UFormField name="emailphone">
                    <UInput color="neutral" size="xl" placeholder="Введите промокод" />
                  </UFormField>
                  <div class="grid gap-2">
                    <p class="flex items-baseline text-sm leading-5 text-gray-950 font-semibold">
                      <span class="max-w-[500px] whitespace-nowrap pr-2">
                        1 товар
                      </span>
                      <span
                        class="flex-1 border-b border-dotted border-gray-300 border-opacity-0 relative h-0 mx-2"></span>
                      <b class="font-bold text-gray-950 whitespace-nowrap">
                        7 990 ₽
                      </b>
                    </p>
                    <p class="flex items-baseline text-[20px] leading-[30px] text-gray-950 font-semibold">
                      <span class="max-w-[500px] whitespace-nowrap pr-2">
                        Итого
                      </span>
                      <span
                        class="flex-1 border-b border-dotted border-gray-300 border-opacity-0 relative h-0 mx-2"></span>
                      <b class="whitespace-nowrap">
                        7 990 ₽
                      </b>
                    </p>
                  </div>

                  <UButton size="xl" type="submit">
                    Оформить заказ
                  </UButton>
                </div>

              </div>
            </aside>

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

    <Footer />

  </div>
</template>