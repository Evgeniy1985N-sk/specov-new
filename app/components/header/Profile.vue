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
    src: '/compare',
    icon: IconFavorite
  },
  {
    name: 'Сравнение',
    src: '/favorite',
    icon: IconCompare
  },
]
</script>


<template>
  <div v-if="props.isShow"
    class="fixed inset-0 top-[117px] sm:top-[73px] lg:top-32 z-99 py-6 bg-gray-100 lg:border-t border-(--border) overflow-auto lg:hidden">

    <SectionContainer>
      <div class="grid gap-6">

        <div class="grid gap-6 bg-white rounded-xl px-8 py-6">
          <WrapIcon class="w-16 h-16 bg-gray-100 rounded-full">
            <HeaderIconCabinet />
          </WrapIcon>
          <h3 class="text-[24px] leading-8 font-['Russo_One'] text-black">
            Войдите или зарегистрируйтесь
          </h3>
          <p class="text-sm leading-5 text-gray-700 font-medium">
            Чтобы управлять заказами
          </p>
          <UButton class="w-fit mt-2 px-4">
              Войти
          </UButton>
        </div>

        <div class="grid gap-6 bg-white rounded-xl px-8 py-6">

          <a v-for="item in buttons" :href="item.src" class="flex items-center gap-2 text-base leading-6 text-gray-600">
            <span class="h-5 w-5">
              <component :is="item.icon" />
            </span>
            {{ item.name }}
          </a>

        </div>
      </div>
    </SectionContainer>

  </div>
</template>


<style scoped></style>