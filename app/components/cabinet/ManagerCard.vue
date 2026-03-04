<script setup lang="ts">
import type { Manager } from '~/types/cabinet'

interface Props {
  manager: Manager
}

defineProps<Props>()
</script>

<template>
  <div class="bg-(--Base-White) rounded-xl p-5">
    <div class="flex flex-col">
      <div class="w-12 h-12 bg-(--Background) rounded-lg flex items-center justify-center mb-3">
        <img src="/image/cabinet/user-square.svg" alt="">
      </div>
      <div class="text-sm text-(--Text-600) mb-1">Персональный менеджер</div>
      <div class="font-semibold text-(--Text-950) mb-3">{{ manager.name }}</div>
      <a :href="'tel:' + manager.phone" class="flex items-center gap-2 text-sm text-(--Text-600) hover:text-(--Text-950) mb-2">
        <img src="/image/cabinet/phone-call.svg" alt="">
        {{ manager.phone }}
      </a>
      <a :href="'mailto:' + manager.email" class="flex items-center gap-2 text-sm text-(--Text-600) hover:text-(--Text-950)">
        <img src="/image/cabinet/mail.svg" alt="">
        {{ manager.email }}
      </a>
    </div>
  </div>
</template>

