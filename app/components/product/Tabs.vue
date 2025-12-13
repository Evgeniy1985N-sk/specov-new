<script setup lang="ts">
import { useScroll } from '~/composables/useScroll'
import { useScrollTo } from '~/composables/useScrollTo'

const { scrollPosition } = useScroll()
const { scrollToSection } = useScrollTo()

const activeTab = ref('about')
const offsetEl = ref(800)

const relatedProducts = useProductsStore().related

const isMoreText = ref(false)

const specifications = [
  { label: 'Артикул', value: 'HR2470' },
  { label: 'Модель', value: 'HR2470' },
  { label: 'Бренд', value: 'Makita' },
  { label: 'Тип товара', value: 'Перфоратор' },
  { label: 'Тип питания', value: 'Сетевой' },
  { label: 'Расположение двигателя', value: 'Горизонтальное' },
  { label: 'Тип двигателя', value: 'Щеточный' },
  { label: 'Тип патрона', value: 'SDS-plus' },
  { label: 'Мощность, Вт', value: '780' },
  { label: 'Напряжение, В', value: '230' },
  { label: 'Макс. обороты', value: '1100' },
  { label: 'Макс. диаметр сверления (дерево), мм', value: '32' },
  { label: 'Макс. диаметр сверления (металл), мм', value: '13' }
];

interface Tab {
  label: string
  to: string
  isActive: boolean
}

const tabs = ref<Tab[]>([
  {
    label: 'О товаре',
    to: 'about',
    isActive: true
  },
  {
    label: 'Характеристики',
    to: 'characteristics',
    isActive: false
  },
  {
    label: 'Отзывы',
    to: 'reviews',
    isActive: false
  },
  {
    label: 'Сопутствующие товары',
    to: 'goods',
    isActive: false
  },
  {
    label: 'Документы',
    to: 'docs',
    isActive: false
  }
])

function toggleActive(index: number) {
  tabs.value = tabs.value.map((item, i) => ({
    ...item,
    isActive: i === index
  }));
}

</script>

<template>

  <div :class="scrollPosition > offsetEl ? 'fixed top-20 left-0 w-full z-100' : ''" class="hidden sm:block">
    <SectionContainer :class="scrollPosition > offsetEl ? 'md:px-4! lg:px-0!' : ''" class="p-0!">
      <div class="flex lg:grid grid-cols-5 gap-1 bg-gray-100 p-1 rounded-lg">
        <button v-for="(tab, i) in tabs" :key="i" @click="scrollToSection(tab.to), toggleActive(i)"
          :class="tab.isActive ? 'bg-white' : ''"
          class="flex items-center justify-center grow text-sm leading-5 h-10 cursor-pointer transition rounded-lg">
          {{ tab.label }}
        </button>
      </div>
    </SectionContainer>
  </div>

  <div class="grid gap-6 sm:gap-20 sm:pt-6">

    <div id="about" class="grid gap-10 max-w-[700px]">
      <div>
        <h2 class="mb-4 font-['Russo_One'] text-gray-950 font-normal text-[24px] leading-8">О товаре</h2>
        <p :class="[!isMoreText ? 'line-clamp-4 overflow-hidden' : '']"
          class="text-sm leading-5 font-medium text-gray-600 sm:line-clamp-none sm:overflow-visible">
          Предназначен для сверления, сверления с ударом и долбления (три режима) в таких материалах как бетон,
          природный камень, дерево, металл. У перфоратора отсутствует удар на холостом ходу, он имеет
          электронную регулировку числа оборотов двигателя, предохранительную (расцепную) муфту, обрезиненный
          корпус редуктора и антивибрационную боковую рукоятку. Тип крепления хвостика – SDS-plus.
          Многофункциональный перфоратор Makita HR 2470 дополнен реверсом. Для данной модели характерен
          одинаковый вращающий момент, как при прямом, так и при обратном вращении. Переключение осуществляется
          путем поворота щеток.
        </p>
        <button @click="isMoreText = !isMoreText"
          class="flex sm:hidden gap-1.5 items-center text-sm leading-5 cursor-pointer text-gray-600 mt-4">
          {{ isMoreText ? 'Свернуть' : 'Показать еще' }}
          <i class="flex items-center justify-center w-5 h-5">
            <ProductIconsAng />
          </i>
        </button>
      </div>
      <div class="flex flex-col gap-4">
        <div class="font-sans font-bold text-base leading-6 text-black">Комплектация</div>
        <p class="line-clamp-4 overflow-hidden text-sm leading-5 font-medium text-gray-600">
          кейс, ограничитель глубины сверления, дополнительная рукоятка.
        </p>
      </div>
      <div class="flex flex-col gap-4">
        <div class="font-sans font-bold text-base leading-6 text-black">Гарантия</div>
        <p class="line-clamp-4 overflow-hidden text-sm leading-5 font-medium text-gray-600">
          12 месяцев
        </p>
      </div>
    </div>

    <div id="characteristics" class="max-w-[450px]">

      <h2 class="mb-4 font-['Russo_One'] text-gray-950 font-normal text-[24px] leading-8">Характеристики</h2>

      <div class="grid gap-4 w-full">
        <p v-for="(item, i) in specifications" :key="i" class="flex items-baseline text-sm leading-5">
          <span class="max-w-[500px] font-medium text-gray-600 whitespace-nowrap pr-2">
            {{ item.label }}
          </span>
          <span class="flex-1 border-b border-dotted border-gray-300 border-opacity-0 relative h-0 mx-2"></span>
          <b class="font-bold text-gray-950 whitespace-nowrap">
            {{ item.value }}
          </b>
        </p>
      </div>

    </div>

    <div id="reviews">
      <h2 class="sm:hidden mb-4 font-['Russo_One'] text-gray-950 font-normal text-[24px] leading-8">Отзывы</h2>
      <ProductReview />
    </div>

    <div id="goods">
      <SectionHeader>
        <SectionTitle text="Сопутствующие товары" />
        <SectionButton text="Смотреть всё" path="/" />
      </SectionHeader>
      <ProductSliderVar :items="relatedProducts" />
    </div>

    <div id="docs">
      <h2 class="text-2xl font-bold mb-4">Документы</h2>
      <div class="space-y-6">
        <p>Здесь будут документы...</p>
      </div>
    </div>

  </div>

</template>

<style scoped></style>