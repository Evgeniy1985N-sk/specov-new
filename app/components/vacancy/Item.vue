<script setup lang="ts">
import type { Vacancy } from '~/types/vacancy'

defineProps<{
  vacancy: Vacancy
}>()
</script>

<template>
  <div class="p-6 border border-gray-200 rounded-lg">
    <div class="flex flex-col lg:flex-row items-start justify-between gap-8">

      <div class="max-w-[890px]">
        <h3 class="font-['Russo_One'] mb-4 text-[24px] leading-8 text-gray-950">{{ vacancy.title }}</h3>

        <p class="text-[18px] leading-7 font-medium">{{ vacancy.description }}</p>

        <div class="grid gap-4 mt-8">
          <h4 class="text-[18px] leading-7 font-bold text-gray-950">Обязанности:</h4>
          <ul class="list-disc pl-5 text-[18px] leading-7 font-medium">
            <li v-for="(resp, index) in vacancy.responsibilities" :key="index">
              {{ resp }}
            </li>
          </ul>
        </div>

      </div>

      <UButton class="w-full sm:w-fit" size="xl">
        Откликнуться
      </UButton>
    </div>

  </div>
</template>