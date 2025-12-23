<script setup lang="ts">
import type { Vacancy } from '~/types/vacancy'

defineProps<{
  vacancies: Vacancy[]
}>()
</script>

<template>
  <div class="grid gap-6 lg:gap-4">
    <VacancyItem v-for="vacancy in vacancies" :key="vacancy.id" :vacancy="vacancy" />
  </div>
</template>