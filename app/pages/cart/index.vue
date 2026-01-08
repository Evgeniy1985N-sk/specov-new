<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import { useProductsStore } from '@/stores/products'
import type { ProductCard } from '~/types/product'

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

  <main v-if="!isShowThanks">

    <Section class="mt-6! overflow-visible">
      <SectionContainer>

        <div class="flex gap-8">

          <div class="w-full">

            <div class="grid gap-6 border-b border-gray-300 lg:border-0 pb-6 lg:pb-0">

              <TitleGoods title="Корзина" :goods="1" />

              <CartPanel />

              <!-- card -->
              <div v-for="(product, i) in products" class="w-full sm:p-4 bg-white transition" :key="i">

                <div class="flex justify-between items-center gap-6 flex-wrap">

                  <div class="flex sm:items-center gap-4 lg:max-w-[520px] w-full">

                    <UCheckbox size="xl" v-model="check" />

                    <img class="w-20 h-20 object-contain" :src="product?.image" :alt="product?.title">

                    <div class="lg:max-w-[392px] w-full">
                      <div>
                        <div class="flex flex-col-reverse sm:flex-row gap-2 sm:gap-6">
                          <span class="text-sm leading-5 font-medium">
                            Код товара: 15561175
                          </span>
                          <CartMark />
                        </div>
                        <NuxtLink :to="{ name: 'products-id', params: { id: product.id } }"
                          class="text-gray-950 font-semibold transition-colors hover:text-(--Brand-700) lg:max-w-[308px] sm:line-clamp-2 sm:overflow-hidden">
                          {{ product?.title }}
                        </NuxtLink>
                      </div>

                      <div class="flex justify-between flex-wrap lg:hidden mt-4">
                        <div class="max-w-[116px]">
                          <UInputNumber v-model="counter" :min="0" size="md" color="neutral" :ui="{ root: 'h-[36px]' }"
                            :increment="{
                              class: 'bg-transparen',
                              color: 'neutral',
                              variant: 'ghost',
                              size: 'md',
                            }" :decrement="{
                              color: 'neutral',
                              variant: 'ghost',
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
                    <UInputNumber v-model="counter" :min="0" size="md" color="neutral"
                      :ui="{ root: 'h-[36px]', base: 'focus:ring-1!' }" :increment="{
                        color: 'neutral',
                        variant: 'ghost',
                        size: 'md',
                      }" :decrement="{
                        color: 'neutral',
                        variant: 'ghost',
                        size: 'md'
                      }" />
                  </div>

                  <div class="hidden lg:flex items-center justify-end max-w-[180px] w-full">
                    <p class="mr-1 text-[20px] leading-[30px] font-semibold text-gray-950">
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

            <!-- Mobile -->
            <div class="grid gap-4 pt-6 pb-8 sm:pb-[278px] lg:hidden">

              <p class="text-black font-bold">
                Промокод
              </p>

              <div class="flex items-center gap-4">

                <UInput color="neutral" size="xl" placeholder="Введите промокод" />

                <UButton @click="isShowMenu = true"
                  class="flex w-fit items-center justify-center h-10 cursor-pointer rounded-lg bg-white! text-(--Brand-950) px-4"
                  color="neutral">Применить
                </UButton>
              </div>

            </div>
            <!-- Mobile -->

            <div id="tabs" class="hidden lg:grid gap-6 pt-20">
              <h2 class="text-[24px] leading-8 text-gray-950 font-['Russo_One']">
                Выберите способ получения
              </h2>
              <CartTabs />
            </div>

            <div id="pay" class="hidden lg:grid gap-6 pt-20">
              <h2 class="text-[24px] leading-8 text-gray-950 font-['Russo_One']">
                Выберите способ оплаты
              </h2>
              <CartTabs2 />
            </div>

          </div>

          <!-- ASIDE -->
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
                  <a href="#tabs" class="text-(--Brand-700) cursor-pointer text-sm leading-5 text-left">
                    Изменить
                  </a>
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
                  <HeaderLogin>
                    <button class="text-(--Brand-700) cursor-pointer text-sm leading-5 text-left">
                      Указать данные
                    </button>
                  </HeaderLogin>
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
                  <a href="#pay" class="text-(--Brand-700) cursor-pointer text-sm leading-5 text-left">
                    Изменить
                  </a>
                </div>

              </div>


              <div class="grid gap-4">

                <CartTotal />

                <UButton @click="isShowThanks = true" size="xl" type="submit">
                  Оформить заказ
                </UButton>

              </div>

            </div>
          </aside>
          <!-- ASIDE -->

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

  <!-- Window Thanks -->
  <CartThanks v-if="isShowThanks" @close-thanks="isShowThanks = false" />
  <!-- Window Thanks -->

  <Footer class="hidden lg:block" />

</template>