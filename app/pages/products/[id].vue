<script setup lang="ts">
import { useProductsStore } from '@/stores/products'
import Compare from '~/components/product/icon/Compare.vue'
import Favorite from '~/components/product/icon/Favorite.vue'
import { useScroll } from '~/composables/useScroll'
import { useCartStore } from '@/stores/cart'

const cart = useCartStore().cart

const { scrollPosition } = useScroll()

const isMoreText = ref(false)
const isMoreSpec = ref(false)

const showModal = ref(false)

const buildingProducts = useProductsStore().building
const gardenProducts = useProductsStore().garden

const route = useRoute()
const productId = route.params.id as string

const allProducts = useProductsStore().allProducts

const product = allProducts.find(item => item.id == productId)

const counter = ref(0)

const specifications = [
  { label: 'Макс. крутящий момент', value: '6 Нм' },
  { label: 'Число скоростей', value: '1' },
  { label: 'Тип аккумулятора', value: 'Li-lon' },
  { label: 'Напряжение аккумулятора', value: '3.6 В' },
  { label: 'Устройство аккумулятора', value: 'встроенный' },
  { label: 'Вид упаковки', value: 'чемодан/кейс' },
  { label: 'Тип двигателя', value: 'щеточный' },
  { label: 'Масса', value: '0.9 кг' },
  { label: 'Режимы работы', value: 'сверление / завинчивание' },
  { label: 'Макс. диаметр сверления (металл)', value: '10 мм' },
  { label: 'Макс. диаметр сверления (древесина)', value: '20 мм' },
  { label: 'Время зарядки аккумулятора', value: '3–5 ч' }
];

const visiblespec = computed(() => {
  return isMoreSpec.value ? specifications : specifications.slice(0, 7)
})

function addToCart(itemId: string) {
  const existingItem = cart.find(item => item.id === itemId)

  if (existingItem) {
    existingItem.count = counter.value
  } else {
    cart.push({
      id: itemId,
      count: counter.value
    })
  }
}

</script>

<template>
  <div class="overflow-hidden">

    <Header />

    <Breadcrumbs />

    <main>

      <Section v-if="product" class="mb-6!">

        <!-- card fixed -->
        <div :class="scrollPosition > 800 ? 'opacity-100' : 'pointer-events-none'"
          class="hidden sm:block opacity-0 fixed top-0 left-0 z-100 w-full py-4 border-b border-gray-300 bg-white transition">
          <SectionContainer>

            <div class="flex justify-between pb-15">

              <div class="flex gap-4">
                <img class="w-12 h-12 object-contain" :src="product?.image" :alt="product?.title">
                <div>
                  <span class="text-sm leading-5">
                    Код товара: 15561175
                  </span>
                  <p class="text-gray-950 font-bold max-w-[308px] lg:max-w-full line-clamp-1 overflow-hidden">
                    {{ product?.title }}
                  </p>
                </div>
              </div>

              <div class="flex items-center gap-6 shrink-0">
                <div class="flex items-center gap-2">
                  <p class="text-5 leading-[30px] font-semibold ">
                    {{ product?.price.toLocaleString('ru-RU') }} ₽
                  </p>
                  <span v-if="product?.oldPrice" class="text-sm leading-5 text-gray-400 font-medium line-through">
                    {{ product?.oldPrice.toLocaleString('ru-RU') }} ₽
                  </span>
                </div>
                <UButton @click="addToCart(product.id)" class="shrink-0 gap-1 px-4 min-h-10">
                  <i class="flex items-center justify-center h-5 w-5">
                    <ProductIconCart />
                  </i>
                  <span class="text-sm leading-5">
                    В корзину
                  </span>
                </UButton>
              </div>

            </div>

          </SectionContainer>
        </div>

        <!-- button basket fixet -->
        <div class="sm:hidden fixed bottom-20 z-100 w-full">
          <SectionContainer>
            <UButton @click="addToCart(product.id)" class="w-full">
              <i class="flex items-center justify-center h-5 w-5">
                <ProductIconCart />
              </i>
              <span class="text-sm leading-5">
                В корзину
              </span>
            </UButton>
          </SectionContainer>
        </div>


        <SectionContainer>

          <div class="flex gap-4 mb-4 justify-between">

            <div class="flex gap-2 sm:gap-4 flex-wrap">
              <p class="text-xs sm:text-sm leading-5 text-gray-600 font-medium">
                Код товара: 15561175
              </p>
              <div class="flex">

                <div class="flex">
                  <i v-for="(__, i) in 5" class="flex items-center justify-center w-5 h-5" :key="i">
                    <img src="/image/star.svg" alt="Star">
                  </i>
                </div>

                <p class="text-sm leading-5 text-(--Brand-700) font-medium">
                  15 отзывов
                </p>

              </div>
            </div>

            <div class="flex gap-6">
              <button class="flex items-center gap-1.5 text-gray-600 text-base leading-6 cursor-pointer">
                <i class="w-5 h-5 flex items-center justify-center">
                  <Compare />
                </i>
                <span class="hidden sm:block">
                  Сравнить
                </span>
              </button>
              <button class="flex items-center gap-1.5 text-gray-600 text-base leading-6 cursor-pointer">
                <i class="w-5 h-5 flex items-center justify-center">
                  <Favorite />
                </i>
                <span class="hidden sm:block">
                  В избранное
                </span>
              </button>
            </div>

          </div>

          <div class="flex flex-wrap sm:flex-nowrap gap-8">

            <!--col-1-->
            <div class="lg:max-w-[592px] min-w-0">
              <h1
                class="mb-6 font-['Russo_One'] text-lg leading-7 sm:text-3xl sm:leading-10 tracking-[0] text-gray-950">
                {{ product?.title }}
              </h1>
              <ProductSliderDetail :imgs="product?.imgs" />
            </div>

            <!--col-2-->
            <div class="hidden lg:flex flex-col gap-10 items-start max-w-[280px]">

              <div class="flex flex-col gap-4">
                <div class="font-sans font-bold text-base leading-6 text-black">
                  Характеристики
                </div>
                <div class="grid gap-4">
                  <p v-for="(item, i) in visiblespec" :key="i" class="flex gap-1 text-sm leading-5">
                    <span class="font-medium text-gray-600">
                      {{ item.label }}
                    </span>
                    <b class="min-w-16 font-bold text-gray-950">
                      {{ item.value }}
                    </b>
                  </p>
                </div>
                <button @click="isMoreSpec = !isMoreSpec"
                  class="flex gap-1.5 items-center text-sm leading-5 cursor-pointer text-gray-600">
                  {{ isMoreSpec ? 'Свернуть' : 'Все характеристики' }}
                  <i class="flex items-center justify-center w-5 h-5">
                    <ProductIconAng />
                  </i>
                </button>
              </div>

              <div class="flex flex-col gap-4">
                <div class="font-sans font-bold text-base leading-6 text-black">
                  О товаре
                </div>
                <p :class="[!isMoreText ? 'line-clamp-4 overflow-hidden' : '']"
                  class="text-sm leading-5 font-medium text-gray-600">
                  Предназначен для сверления, сверления с ударом и долбления (три режима) в таких материалах как бетон,
                  природный камень, дерево, металл. У перфоратора отсутствует удар на холостом ходу, он имеет
                  электронную регулировку числа оборотов двигателя, предохранительную (расцепную) муфту, обрезиненный
                  корпус редуктора и антивибрационную боковую рукоятку. Тип крепления хвостика – SDS-plus.
                  Многофункциональный перфоратор Makita HR 2470 дополнен реверсом. Для данной модели характерен
                  одинаковый вращающий момент, как при прямом, так и при обратном вращении. Переключение осуществляется
                  путем поворота щеток.
                </p>
                <button @click="isMoreText = !isMoreText"
                  class="flex gap-1.5 items-center text-sm leading-5 cursor-pointer text-gray-600">
                  {{ isMoreText ? 'Свернуть' : 'Читать далее' }}
                  <i class="flex items-center justify-center w-5 h-5">
                    <ProductIconAng />
                  </i>
                </button>
              </div>

              <button
                class="flex gap-2 items-center bg-gray-100 rounded-2xl p-2 text-base leading-6 text-black cursor-pointer">
                <img class="w-10 h-9" src="/image/example.png" alt="Example">
                <span class="text-left font-bold">
                  Сопутствующие товары
                </span>
                <i class="flex items-center justify-center w-5 h-5">
                  <ProductIconAng />
                </i>
              </button>

            </div>

            <!--col-3-->
            <div class="flex flex-col gap-2 sm:gap-6 sm:max-w-[280px] shrink-0 w-full">

              <div class="flex flex-col gap-6 bg-gray-100 rounded-lg p-6">

                <div>
                  <p class="text-[24px] leading-8 sm:text-[36px] sm:leading-11 text-gray-950 font-semibold">
                    {{ product?.price.toLocaleString('ru-RU') }} ₽
                  </p>
                  <span class="text-gray-600 text-sm leading-5 font-medium">
                    Цена за шт.
                  </span>
                </div>

                <div class="flex flex-col gap-2">
                  <UInputNumber v-model="counter" :min="0" size="xl" color="neutral" :ui="{ root: 'h-11' }" :increment="{
                    color: 'neutral',
                    variant: 'ghost',
                    size: 'xl',
                  }" :decrement="{
                    color: 'neutral',
                    variant: 'ghost',
                    size: 'xl'
                  }" />


                  <UButton @click="addToCart(product.id)" class="gap-1 px-4">
                    <i class="flex items-center justify-center h-5 w-5">
                      <ProductIconCart />
                    </i>
                    <span>
                      В корзину
                    </span>
                  </UButton>

                  <UModal v-model:open="showModal" :close=false
                    :ui="{ content: 'xl:translate-x-[-15%] lg:top-[260px] max-w-[720px]!' }">

                    <UButton
                      class="flex items-center justify-center h-12 cursor-pointer rounded-lg bg-white! border border-(--border) text-(--Brand-950) text-base"
                      color="neutral">Быстрый заказ
                    </UButton>

                    <template #body>

                      <div class="grid gap-6">

                        <div class="flex justify-between">
                          <p class="font-bold text-black">
                            Товары
                          </p>
                          <button class="flex gap-2 items-center text-gray-600 cursor-pointer">
                            <span class="text-sm leading-5 font-semibold">
                              Очистить список
                            </span>
                            <ProductIconTrash />
                          </button>
                        </div>

                        <div class="flex gap-6 justify-between items-center flex-wrap pb-6 border-b border-gray-300">
                          <div class="flex gap-5">
                            <img class="w-12 h-12 object-contain" :src="product?.image" :alt="product?.title">
                            <p class="max-w-[290px] font-semibold text-gray-950">
                              {{ product?.title }}
                            </p>
                          </div>
                          <UInputNumber v-model="counter" :min="0" size="lg" color="neutral"
                            :ui="{ root: 'max-w-[116px] h-[36px]' }" :increment="{
                              color: 'neutral',
                              size: 'lg',
                              variant: 'ghost',
                            }" :decrement="{
                              color: 'neutral',
                              size: 'lg',
                              variant: 'ghost',
                            }" />
                          <div class="flex gap-2 items-center">
                            <p class="text-[20px] leading-[30px] text-gray-950 font-semibold">
                              {{ product?.price.toLocaleString('ru-RU') }} ₽
                            </p>
                            <button class="flex justify-center items-center w-9 h-9 cursor-pointer">
                              <ProductIconTrash />
                            </button>
                          </div>
                        </div>

                        <div class="flex justify-between gap-4 items-center flex-wrap">
                          <div class="grid">
                            <span class="text-sm leading-5 font-medium">
                              Итого:
                            </span>
                            <p class="text-[30px] leading-[38px] text-gray-950 font-semibold">
                              {{ product?.price.toLocaleString('ru-RU') }} ₽
                            </p>
                          </div>
                          <div class="flex gap-2 flex-wrap">
                            <UButton @click="showModal = false" color="neutral" solid class="gap-2 px-5" size="xl">
                              Продолжить покупки
                            </UButton>
                            <UButton @click="addToCart(product.id)" class="gap-2 px-5">
                              В корзину
                              <i class="flex items-center justify-center h-5 w-5">
                                <ProductIconArrowRight />
                              </i>
                            </UButton>
                          </div>
                        </div>

                      </div>

                    </template>

                  </UModal>

                </div>

              </div>

              <div class="flex flex-col gap-6 bg-gray-100 rounded-lg p-6">

                <div class="font-sans font-bold text-base leading-6 text-black">
                  Способы получения заказа
                </div>

                <div class="flex items-center gap-2 text-(--Brand-700)">
                  <span class="flex items-center justify-center w-5 h-5">
                    <ProductIconShop />
                  </span>
                  <p class="text-sm leading-5 font-bold">
                    Самовывоз из магазина
                  </p>
                </div>

                <div class="text-sm leading-5 font-medium">
                  <p>
                    ул. 50 лет Октября, 118А
                  </p>
                  <span
                    class="text-(--Brand-700) font-bold relative pl-4 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:bg-current before:rounded-full">
                    Много
                  </span>
                </div>

                <div class="text-sm leading-5 font-medium">
                  <p>
                    ул. Горпищекомбинатовская, 1с1
                  </p>
                  <span
                    class="text-red-700 font-bold relative pl-4 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:bg-current before:rounded-full">
                    Мало
                  </span>
                </div>

                <div>
                  <div class="flex items-center gap-2 text-(--Brand-700)">
                    <span class="flex items-center justify-center w-5 h-5">
                      <ProductIconCar />
                    </span>
                    <p class="text-sm leading-5 font-bold">
                      Доставка курьером
                    </p>
                  </div>
                  <p class="text-sm leading-5 font-medium">Завтра от 290 рублей</p>
                </div>

                <div>
                  <div class="flex items-center gap-2 text-(--Brand-700)">
                    <span class="flex items-center justify-center w-5 h-5">
                      <ProductIconCube />
                    </span>
                    <p class="text-sm leading-5 font-bold">
                      Транспортная компания
                    </p>
                  </div>
                  <p class="text-sm leading-5 font-medium">СДЭК, DPD, Деловые линии</p>
                </div>


              </div>

            </div>

          </div>

        </SectionContainer>
      </Section>

      <Section class="mt-0">
        <SectionContainer>
          <ProductTabs />
        </SectionContainer>
      </Section>

      <Section>
        <SectionContainer>
          <SectionHeader>
            <SectionTitle text="Вам может понравиться" />
            <SectionButton text="Смотреть всё" path="/" />
          </SectionHeader>

          <ProductSlider :items="buildingProducts" />

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

  </div>
</template>
