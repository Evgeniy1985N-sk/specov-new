<script setup lang="ts">
import IconCompare from '@/components/header/icon/Compare.vue'
import IconFavorite from '@/components/header/icon/Favorite.vue'

interface Props {
  isShow: boolean
}

const props = defineProps<Props>()

const buttons = [
  {
    name: 'Избранное',
    src: '/favorite',
    icon: IconFavorite
  },
  {
    name: 'Сравнение',
    src: '/compare',
    icon: IconCompare
  },
]

const menu = [
  {
    name: "О компании",
    src: "/about"
  },
  {
    name: "Оплата и доставка",
    src: "/pay-delivery"
  },
  {
    name: "Сервис и гарантия",
    src: "/service-warranty"
  },
  {
    name: "Юрлицам",
    src: "/business"
  },
]


</script>

<template>

  <div v-if="props.isShow" class="lg:hidden fixed bg-gray-100 inset-0 z-100 top-[117px] sm:top-[73px]">
    <SectionContainer>
      <div class="grid gap-6 py-6">

        <div class="grid gap-6 bg-white rounded-xl px-8 py-6">

          <NuxtLink v-for="item in buttons" :href="item.src" class="flex items-center gap-2 text-base leading-6 text-gray-600">
            <span class="h-5 w-5">
              <component :is="item.icon" />
            </span>
            {{ item.name }}
          </NuxtLink>

        </div>

        <div class="bg-white rounded-xl px-8 py-6">

          <nav class="font-medium text-gray-600 grid gap-6">
            <a v-for="(item, index) in menu" :href="item.src" :key="index" class="hover:text-(--Brand-700)">
              {{ item.name }}
            </a>
          </nav>

        </div>

      </div>
    </SectionContainer>
  </div>

</template>

<style></style>