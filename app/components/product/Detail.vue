<script setup lang="ts">
// import { useProductsStore } from '@/stores/products'
import { useScroll } from '~/composables/useScroll'
import { useCartsStore } from '~/stores/carts'
import { useScrollTo } from '~/composables/useScrollTo'
import { useProductApi } from '~/composables/api/useProductApi';
import { useProduct } from '~/composables/useProduct';
import { useProductPicture } from '~/composables/useProductPicture';
import { stockDescr, stockDescrLocal } from '~/utils/stockDescr';
import type { ProductChar, ProductDetailPage } from '~/types/product';
import type { Picture } from '~/types/picture';

const { addToCart, setQuantityInFirst } = useCartsStore();

const { scrollPosition } = useScroll()
const { scrollToSection } = useScrollTo()

const showModal = ref(false)

interface Props {
	detailPage: ProductDetailPage;
	productSlug: string;
	charSlug?: string; //product char name
	productImg?: Picture;
}
const props = defineProps<Props>();

const { calcRating, declineReviewWord } = useProduct();

const { live: productLive } = useProductApi();

const product = computed(() => props.detailPage?.product);

const { pictureDetail } = useProductPicture();

const productStars = computed( () => {
	const rat = calcRating(props.detailPage.reviews.agg);
	return Math.ceil(rat);
});

//live data: client call
const { data: productLiveData, } = useAsyncData(
	`product-live-${props.detailPage.product.id}`,
  () => productLive(product.value.id, props.charSlug),
  { server: true, immediate: true }
);

const productChar = ref<ProductChar|undefined>(); //current selected characteristic
const productStock = computed(() => {
  return productLiveData.value?.stock?.find(st =>
    (!productChar.value && !st.char) ||
    (productChar.value?.id === st.char?.id)
  );
});

const productPriceOld = computed( () => {
	return undefined;
});

const getStockClass = (storeId: number) => {
  const stockStatus = stockDescr(storeId, productLiveData.value?.stock_total);
  return stockStatus === 'many' ? "text-(--Brand-700)": "text-red-700";
};

const counter = ref(0); //quantity
watch(counter, newCounter => {
	if(!props.detailPage?.product){
		return;
	}
	setQuantityInFirst(
		props.detailPage.product, 
		newCounter, 
		{char: productStock.value?.char, price: productStock.value?.price ?? 0}
	);
});

const addProductToCart = () => {
	if(!props.detailPage?.product){
		return;
	}
	addToCart(
		0, 
		{
			id: props.detailPage.product.id, 
			name: props.detailPage.product.name, 
			name_lat: props.detailPage.product.name_lat
		}, 
		{char: productStock.value?.char, price: productStock.value?.price ?? 0},
		props.productImg
	);
}

const productDescription = computed( () => {
	if(!props.detailPage?.product){
		return;
	}
	return (props.detailPage.product.description && props.detailPage.product?.description.length)
		? props.detailPage.product.description 
		: props.detailPage.product.name_full;
});

</script>

<template>
  <div class="overflow-hidden">

    <Header />

    <Breadcrumbs :categories="product.product_cat_path"/>

    <main>

      <Section v-if="product" class="mb-6!">

        <!-- card fixed -->
        <div :class="scrollPosition > 800 ? 'opacity-100' : 'pointer-events-none'"
          class="hidden sm:block opacity-0 fixed top-0 left-0 z-100 w-full py-4 border-b border-gray-300 bg-white transition">
          <SectionContainer>

            <div class="flex justify-between pb-15">

              <div class="flex gap-4">
                <img class="w-12 h-12 object-contain" :src="productImg? pictureDetail(productImg):undefined" 
					:alt="product?.name"/>
                <div>
                  <span class="text-sm leading-5 font-medium">
					Код товара: {{ product?.code_1c }}
                  </span>
                  <p class="text-gray-950 font-bold max-w-[308px] lg:max-w-full line-clamp-1 overflow-hidden">
                    {{ product?.name }}
                  </p>
                </div>
              </div>

              <div class="flex items-center gap-6 shrink-0">
                <div class="flex items-center gap-2">
                  <p class="text-[20px] leading-[30px] font-semibold text-gray-950">
                    {{ productStock?.price.toLocaleString('ru-RU') }} ₽
                  </p>
                  <span v-if="productPriceOld" class="text-sm leading-5 text-gray-400 font-medium line-through">
                    {{ productPriceOld }} ₽
                  </span>
                </div>
                <UButton @click="addProductToCart" class="shrink-0 gap-1 px-4 min-h-10">
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
            <UButton @click="addProductToCart" class="w-full">
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
				Код товара: {{ product?.code_1c }}
              </p>
              <div class="flex">

                <div class="flex">
				  <i v-for="star in productStars"
					class="flex items-center justify-center shrink-0 w-5 h-5 text-warning-500 p-0.5">
					<ProductIconStar />
				  </i>
				  <i v-for="star in (5 - productStars)"
					class="flex items-center justify-center shrink-0 w-5 h-5 text-gray-300 p-0.5">
					<ProductIconStar />
				  </i>
                </div>

                <a href="#reviews" class="text-sm leading-5 text-(--Brand-700) font-medium">
					{{ declineReviewWord(props.detailPage.reviews.agg.tot_count) }}
                </a>

              </div>
            </div>

            <div class="flex gap-6">
              <ProductButtonIcon text="Сравнить">
                <ProductIconCompare />
              </ProductButtonIcon>
              <ProductButtonIcon text="В избранное">
                <ProductIconFavorite />
              </ProductButtonIcon>
            </div>

          </div>

          <div class="flex flex-wrap sm:flex-nowrap gap-8">

            <!--col-1-->
            <div class="lg:max-w-[592px] min-w-0">
              <h1
                class="mb-6 font-['Russo_One'] text-lg leading-7 sm:text-3xl sm:leading-10 tracking-[0] text-gray-950">
                {{ product?.name }}
              </h1>
              <ProductSliderDetail :imgs="product?.pictures" />
            </div>

            <!--col-2-->
            <div class="hidden lg:flex flex-col gap-10 items-start max-w-[280px]">

              <div class="flex flex-col gap-4">
                <div class="font-sans font-bold text-base leading-6 text-black">
                  Характеристики
                </div>
                <div class="grid gap-4">
                  <p v-for="item in product.filters" :key="item.id" class="flex gap-1 text-sm leading-5">
                    <span class="font-medium text-gray-600">
                      {{ item.label }}
                    </span>
                    <b class="min-w-16 font-bold text-gray-950">
                      {{ item.value }}
                    </b>
                  </p>
                </div>
                <ProductButtonLink text="Все характеристики" @handle-click="scrollToSection('characteristics')" />
              </div>

              <div class="flex flex-col gap-4">
                <div class="font-sans font-bold text-base leading-6 text-black">
                  О товаре
                </div>
                <p class="text-sm leading-5 font-medium text-gray-600">
					{{ productDescription }}
                </p>
                <ProductButtonLink text="Читать далее" @handle-click="scrollToSection('about')" />
              </div>

              <button @click="scrollToSection('goods')"
                class="flex gap-2 items-center bg-gray-100 rounded-2xl p-2 text-base leading-6 text-black cursor-pointer hover:text-(--Brand-700) transition">
                <img class="w-10 h-9" src="/image/example.png" alt="Example"/>
                <span class="text-left font-bold">
                  Сопутствующие товары
                </span>
                <i class="flex items-center justify-center w-5 h-5">
                  <ProductIconAng />
                </i>
              </button>

            </div>

            <!--col-3-->
            <aside class="flex flex-col gap-2 sm:gap-6 sm:max-w-[280px] shrink-0 w-full">

              <div class="flex flex-col gap-6 bg-gray-100 rounded-lg p-6">

                <div>
                  <p class="text-[24px] leading-8 sm:text-[36px] sm:leading-11 text-gray-950 font-semibold">
                    {{ productStock?.price.toLocaleString('ru-RU') }} ₽
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


                  <UButton @click="addProductToCart" class="gap-1 px-4">
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
                      class="flex items-center justify-center h-12 cursor-pointer rounded-lg bg-white! text-(--Brand-950) text-base"
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
								<img class="w-12 h-12 object-contain" :src="productImg? pictureDetail(productImg):undefined" 
									:alt="product?.name"/>
                            <p class="max-w-[290px] font-semibold text-gray-950">
                              {{ product?.name }}
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
                              {{ productStock?.price.toLocaleString('ru-RU') }} ₽
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
                              {{ productStock?.price.toLocaleString('ru-RU') }} ₽
                            </p>
                          </div>
                          <div class="flex gap-2 flex-wrap">
                            <UButton @click="showModal = false" color="neutral" solid class="gap-2 px-5" size="xl">
                              Продолжить покупки
                            </UButton>
                            <UButton @click="addProductToCart" class="gap-2 px-5">
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

                <div class="grid gap-3">
                  <div v-for="st in props.detailPage?.stores" :key="st.id" class="text-sm leading-5 font-medium">
                    <p>
						{{ st.address }}
                    </p>
                    <span
						:class="[
						'font-bold relative pl-4 before:content-[\'\'] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:bg-current before:rounded-full',
						getStockClass(st.id)
						]"
					>
						{{ stockDescrLocal(st.id, productLiveData?.stock_total) }}
                    </span>
                  </div>
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

            </aside>

          </div>

        </SectionContainer>
      </Section>

      <Section class="mt-0">
        <SectionContainer>
          <ProductTabs 
			:product-description="productDescription ?? ''"
			:filters="props.detailPage.product.filters ?? []"
			:reviews="props.detailPage.reviews ?? []"
			:related-products="props.detailPage.related"
		  />
        </SectionContainer>
      </Section>

      <Section>
        <SectionContainer>
          <SectionHeader>
            <SectionTitle text="Вам может понравиться" />
            <SectionButton text="Смотреть всё" path="/" />
          </SectionHeader>

          <ProductSlider :items="props.detailPage.similar" />

        </SectionContainer>
      </Section>

      <Section>
        <SectionContainer>
          <SectionHeader>
            <SectionTitle text="Вы недавно смотрели" />
            <SectionButton text="Смотреть всё" path="/" />
          </SectionHeader>

          <ProductSlider :items="props.detailPage.last_viewed" />

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

