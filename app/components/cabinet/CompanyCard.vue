<script setup lang="ts">
import type { Company } from '~/types/cabinet'

interface Props {
  company: Company
}

defineProps<Props>()
</script>

<template>
  <div class="bg-(--Base-White) rounded-xl p-5">
    <div class="flex items-center gap-3">
      <div class="w-10 h-10 bg-(--Background) rounded-lg flex items-center justify-center">
        <img src="/image/cabinet/building.svg" alt="">
      </div>
      <div>
        <div class="font-semibold text-(--Text-950)">{{ company.name }}</div>
        <div class="text-sm text-(--Text-600)">ИНН {{ company.inn }} КПП {{ company.kpp }}</div>
      </div>
    </div>
  </div>
</template>

