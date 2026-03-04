<script setup lang="ts">
import type { Appeal } from '~/types/cabinet'

interface Props {
  appeals: Appeal[]
}

const route = useRoute()

defineProps<Props>()

const emit = defineEmits<{
  newAppeal: []
}>()

const handleNewAppeal = () => {
  emit('newAppeal')
}
</script>

<template>
  <div class="bg-white rounded-xl p-5">
    <div class="flex items-start justify-between mb-5">
      <div class="flex items-start gap-3 flex-col">
        <div class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
          <img src="/image/sidebar/annotation-dots.svg" alt="">
        </div>
        <h3 class="font-bold text-(--Text-950) text-xl">Обращения</h3>
      </div>
      <NuxtLink :to="`${route.path.startsWith('/cabinet-corporate') ? '/cabinet-corporate' : '/cabinet-individual'}/appeals`" class="flex items-center gap-1 text-sm text-(--Text-950) font-semibold border border-(--border) py-2 px-4 bg-gray-100 rounded-lg">
        Все
        <img src="/image/cabinet/arrow-right.svg" alt="">
      </NuxtLink>
    </div>

    <div class="flex flex-col gap-2">
      <div v-for="(appeal, index) in appeals" :key="index" class="bg-gray-100 p-4 rounded-2xl">
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm text-(--Text-600)">{{ appeal.date }}</span>
          <span class="flex items-center gap-1.5 text-xs font-medium">
            <span class="w-1.5 h-1.5 rounded-full bg-(--Brand-700)"></span>
            <span class="text-(--Brand-700)">{{ appeal.status }}</span>
          </span>
        </div>
        <div class="font-semibold text-(--Text-950) text-sm mb-1">{{ appeal.title }}</div>
        <div class="text-sm text-(--Text-600) line-clamp-2">{{ appeal.text }}</div>
      </div>
    </div>

    <NuxtLink
      :to="`${route.path.startsWith('/cabinet-corporate') ? '/cabinet-corporate' : '/cabinet-individual'}/appeals?new=1`"
      class="w-full mt-4 px-4 py-2.5 bg-(--Brand-950) text-white text-sm font-medium rounded-lg hover:bg-(--Brand-700) transition-colors flex items-center justify-center gap-2 cursor-pointer"
    >
      <img src="/image/sidebar/annotation-dots.svg" alt="" class="brightness-0 invert" />
      Новое обращение
    </NuxtLink>
  </div>
</template>
