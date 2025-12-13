<script setup lang="ts">
import Pyramid from '@/components/product/icon/Pyramid.vue';


const isActive = ref(false)

interface Review {
  name: string
  date: string
  stars: number
  pros?: string
  cons?: string
  comments: string
  isPurchasedFromUs: boolean
}

const reviews = ref<Review[]>([
  {
    name: 'Александр',
    date: '23 июля 2025',
    stars: 5,
    pros: 'Крутит, вертит, стучит, сверлит, долбит, светит :)',
    cons: 'Слабые аккумуляторы',
    comments: 'Шуруповерт отличный, а аккумуляторы не соответствуют заявленным характеристикам — слабые, быстро разряжаются.',
    isPurchasedFromUs: true,
  },
  {
    name: 'Виталий',
    date: '19 июля 2025',
    stars: 5,
    pros: 'Работает. 2 АКБ, кейс удобный, заряд батареи менее часа.',
    cons: 'Не обнаружил.',
    comments: 'Первый шуруповёрт в использовании. Батареи хватает на 3 часа работы без перекуров. Кровельные саморезы 40 мм по дереву 20 мм + металл 2 мм — в общем, забор. В режиме сверла.',
    isPurchasedFromUs: false,
  },
  {
    name: 'Андрей',
    date: '1 июля 2025',
    stars: 4,
    cons: '',
    comments: 'Супер! Отличный патрон, подсветка, две батареи в комплекте. Крутит хорошо.',
    isPurchasedFromUs: false,
  },
  {
    name: 'Елена',
    date: '10 июля 2025',
    stars: 4,
    pros: 'Лёгкий, удобно лежит в руке, быстро заряжается, кейс компактный.',
    cons: 'Нет ударного режима, как ожидала.',
    comments: 'Покупала для сборки мебели и мелкого ремонта. Справляется отлично! Жаль, что нет удара — тогда бы и плитку можно было бы сверлить.',
    isPurchasedFromUs: true,
  },
  {
    name: 'Дмитрий',
    date: '28 июня 2025',
    stars: 5,
    pros: 'Мощный, надёжный, долго держит заряд, подсветка очень помогает в тёмных углах.',
    comments: 'Использую уже месяц на стройке — ни разу не подвёл. Даже при -5°C работает нормально. Рекомендую профессионалам.',
    isPurchasedFromUs: true,
  },
  {
    name: 'Ирина',
    date: '5 июля 2025',
    stars: 3,
    pros: 'Компактный, лёгкий, подходит для бытовых задач.',
    cons: 'Аккумулятор садится за 20 минут активной работы.',
    comments: 'Для вкручивания полки — самое то. Но если что-то серьёзное — не хватает мощности и автономности.',
    isPurchasedFromUs: false,
  }
])

const visibleCount = ref(3)

</script>


<template>

  <div class="flex flex-col-reverse sm:flex-row justify-between gap-4">

    <div class="w-full max-w-[700px]">
      <h2 class="hidden sm:block mb-4 font-['Russo_One'] text-gray-950 font-normal text-[24px] leading-8">Отзывы</h2>

      <div class="flex items-center gap-4 font-semibold text-sm leading-5 mb-4 sm:mb-6 mt-2 sm:mt-0">
        <span>
          Сортировать по:
        </span>
        <p class="flex gap-4">
          <button @click="isActive = !isActive" :class="[isActive ? ' text-gray-950' : '']"
            class="min-w-[83px] cursor-pointer flex gap-1.5">
            Оценке
            <Pyramid v-if="isActive" />
          </button>
          <button @click="isActive = !isActive" :class="[!isActive ? ' text-gray-950' : '']"
            class="cursor-pointer flex gap-1.5">
            Дате
            <Pyramid v-if="!isActive" />
          </button>
        </p>
      </div>

      <ul class="border-t border-gray-300">

        <li v-for="(review, i) in reviews.slice(0, visibleCount)" :key="i"
          class="grid gap-4 py-6 border-b border-gray-300">

          <div class="grid gap-2">
            <div class="flex gap-2 flex-wrap ">
              <span class="font-bold text-base leading-6 text-gray-950">
                {{ review.name }}
              </span>
              <span class="text-sm leading-6 font-medium">
                {{ review.date }}
              </span>
              <UBadge v-if="review.isPurchasedFromUs"
                class="sm:ml-auto px-3 rounded-full text-(--Brand-800) bg-(--Brand-100)">
                <i class="flex items-center justify-center w-4 h-4">
                  <ProductIconMark />
                </i>
                Товар куплен у нас
              </UBadge>
            </div>
            <div v-if="review.stars" class="flex items-center text-warning-500 text-sm leading-5 font-bold">
              <i v-for="star in review.stars"
                class="flex items-center justify-center shrink-0 w-5 h-5 text-warning-500 p-0.5">
                <ProductIconStar />
              </i>

              <i v-for="star in (5 - review.stars)"
                class="flex items-center justify-center shrink-0 w-5 h-5 text-gray-300 p-0.5">
                <ProductIconStar />
              </i>
              {{ review.stars }}.0
            </div>
          </div>

          <div v-if="review.pros" class="grid gap-1">
            <p class="text-sm font-bold leading-5 text-gray-950">
              Плюсы:
            </p>
            <span class="text-sm font-medium leading-5 text-gray-600">
              {{ review.pros }}
            </span>
          </div>

          <div v-if="review.cons" class="grid gap-1">
            <p class="text-sm font-bold leading-5 text-gray-950">
              Минусы:
            </p>
            <span class="text-sm font-medium leading-5 text-gray-600">
              {{ review.cons }}
            </span>
          </div>

          <div class="grid gap-1">
            <p class="text-sm font-bold leading-5 text-gray-950">
              Комментарий:
            </p>
            <span class="text-sm font-medium leading-5 text-gray-600">
              {{ review.comments }}
            </span>
          </div>

        </li>

      </ul>

      <UButton @click="visibleCount += 3" v-if="visibleCount <= reviews.length"
        class="w-full sm:w-auto table m-auto mt-6 bg-gray-100 text-(--Brand-950) text-sm font-semibold hover:bg-gray-200 active:bg-gray-300 cursor-pointer px-4 py-2.5">
        Показать еще
      </UButton>
    </div>

    <div class="flex flex-col gap-6 sm:max-w-[280px] w-full">

      <div class="">

        <p class="text-5 text-gray-950 font-bold">
          4.8
        </p>

        <div class="flex justify-between">
          <span class="flex">
            <i v-for="star in 5" class="w-6 h-6 flex items-center justify-center text-warning-500 p-0.5">
              <ProductIconStar />
            </i>
          </span>
          <p class="text-sm leading-5 font-medium">
            10 отзывов
          </p>
        </div>
      </div>

      <UButton
        class="w-full flex items-center justify-center bg-gray-100 text-(--Brand-950) text-sm font-semibold hover:bg-gray-200 active:bg-gray-300 cursor-pointer px-4 py-2.5">
        Оставить отзыв
      </UButton>

      <div class="flex items-center justify-between">
        <span class="flex">
          <i v-for="star in 5" class="flex items-center justify-center shrink-0 w-5 h-5 text-warning-500 p-0.5">
            <ProductIconStar />
          </i>

          <i v-for="star in (5 - 5)" class="flex items-center justify-center shrink-0 w-5 h-5 text-gray-300 p-0.5">
            <ProductIconStar />
          </i>
        </span>

        <p class="text-sm leading-5 font-medium">
          5 отзывов
        </p>
      </div>

      <div class="flex items-center justify-between">
        <span class="flex">
          <i v-for="star in 3" class="flex items-center justify-center shrink-0 w-5 h-5 text-warning-500 p-0.5">
            <ProductIconStar />
          </i>

          <i v-for="star in (5 - 3)" class="flex items-center justify-center shrink-0 w-5 h-5 text-gray-300 p-0.5">
            <ProductIconStar />
          </i>
        </span>

        <p class="text-sm leading-5 font-medium">
          3 отзыва
        </p>
      </div>

      <div class="flex items-center justify-between">
        <span class="flex">
          <i v-for="star in 4" class="flex items-center justify-center shrink-0 w-5 h-5 text-warning-500 p-0.5">
            <ProductIconStar />
          </i>

          <i v-for="star in (5 - 4)" class="flex items-center justify-center shrink-0 w-5 h-5 text-gray-300 p-0.5">
            <ProductIconStar />
          </i>
        </span>

        <p class="text-sm leading-5 font-medium">
          4 отзывов
        </p>
      </div>

    </div>

  </div>

</template>