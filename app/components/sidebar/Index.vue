<script setup lang="ts">
const route = useRoute()

const basePath = computed(() => {
  const currentPath = route.path.replace(/\/$/, '') || '/'

  if (currentPath.startsWith('/cabinet-individual')) {
    return '/cabinet-individual'
  }

  if (currentPath.startsWith('/cabinet-corporate')) {
    return '/cabinet-corporate'
  }

  return '/cabinet-individual'
})

const makePath = (suffix: string) => {
  return suffix ? `${basePath.value}/${suffix}` : basePath.value
}

const isActive = (path: string) => {
  const currentPath = route.path.replace(/\/$/, '') || '/'
  const targetPath = path.replace(/\/$/, '') || '/'

  return currentPath === targetPath || currentPath.startsWith(targetPath + '/')
}

const isRootActive = computed(() => {
  const currentPath = route.path.replace(/\/$/, '') || '/'
  const targetPath = basePath.value
  return currentPath === targetPath
})

const dataLabel = computed(() => {
  return basePath.value === '/cabinet-individual' ? 'Мои данные' : 'Данные юрлица'
})
</script>

<template>
  <aside class="bg-(--Base-White) rounded-xl p-4 w-[280px] shrink-0 h-fit sticky top-[190px]">
    <nav class="flex flex-col">
      <NuxtLink
        :to="makePath('')"
        class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
        :class="isRootActive ? 'bg-gray-100 text-(--Brand-700)' : 'text-[#535862] hover:bg-gray-100'"
      >
        <img src="/image/sidebar/building.svg" alt="Кабинет" width="20" height="20" :class="isRootActive ? 'filter-brand' : ''" />
        <span>Кабинет</span>
      </NuxtLink>

      <div class="h-px bg-(--border) my-2"></div>

      <NuxtLink
        :to="makePath('orders')"
        class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
        :class="isActive(makePath('orders')) ? 'bg-gray-100 text-(--Brand-700)' : 'text-[#535862] hover:bg-gray-100'"
      >
        <img src="/image/sidebar/shopping-bag.svg" alt="Заказы" width="20" height="20" :class="isActive(makePath('orders')) ? 'filter-brand' : ''" />
        <span>Заказы</span>
      </NuxtLink>

      <NuxtLink
        :to="makePath('promo')"
        class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
        :class="isActive(makePath('promo')) ? 'bg-gray-100 text-(--Brand-700)' : 'text-[#535862] hover:bg-gray-100'"
      >
        <img src="/image/sidebar/promo.svg" alt="Промокоды" width="20" height="20" :class="isActive(makePath('promo')) ? 'filter-brand' : ''" />
        <span>Промокоды</span>
      </NuxtLink>

      <NuxtLink
        :to="makePath('discounts')"
        class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
        :class="isActive(makePath('discounts')) ? 'bg-gray-100 text-(--Brand-700)' : 'text-[#535862] hover:bg-gray-100'"
      >
        <img src="/image/sidebar/sale.svg" alt="Скидки" width="20" height="20" :class="isActive(makePath('discounts')) ? 'filter-brand' : ''" />
        <span>Скидки</span>
      </NuxtLink>

      <div class="h-px bg-(--border) my-2"></div>

      <NuxtLink
        :to="makePath('appeals')"
        class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
        :class="isActive(makePath('appeals')) ? 'bg-gray-100 text-(--Brand-700)' : 'text-[#535862] hover:bg-gray-100'"
      >
        <img src="/image/sidebar/annotation-dots.svg" alt="Обращения" width="20" height="20" :class="isActive(makePath('appeals')) ? 'filter-brand' : ''" />
        <span>Обращения</span>
      </NuxtLink>

      <div class="h-px bg-(--border) my-2"></div>

      <NuxtLink
        :to="makePath('addresses')"
        class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
        :class="isActive(makePath('addresses')) ? 'bg-gray-100 text-(--Brand-700)' : 'text-[#535862] hover:bg-gray-100'"
      >
        <img src="/image/sidebar/marker.svg" alt="Адреса доставки" width="20" height="20" :class="isActive(makePath('addresses')) ? 'filter-brand' : ''" />
        <span>Адреса доставки</span>
      </NuxtLink>

      <NuxtLink
        :to="makePath('data')"
        class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
        :class="isActive(makePath('data')) ? 'bg-gray-100 text-(--Brand-700)' : 'text-[#535862] hover:bg-gray-100'"
      >
        <img src="/image/sidebar/clipboard.svg" :alt="dataLabel" width="20" height="20" :class="isActive(makePath('data')) ? 'filter-brand' : ''" />
        <span>{{ dataLabel }}</span>
      </NuxtLink>

      <NuxtLink
        v-if="basePath === '/cabinet-corporate'"
        :to="makePath('users')"
        class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
        :class="isActive(makePath('users')) ? 'bg-gray-100 text-(--Brand-700)' : 'text-[#535862] hover:bg-gray-100'"
      >
        <img src="/image/sidebar/users.svg" alt="Пользователи" width="20" height="20" :class="isActive(makePath('users')) ? 'filter-brand' : ''" />
        <span>Пользователи</span>
      </NuxtLink>

      <NuxtLink
        :to="makePath('notifications')"
        class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
        :class="isActive(makePath('notifications')) ? 'bg-gray-100 text-(--Brand-700)' : 'text-[#535862] hover:bg-gray-100'"
      >
        <img src="/image/sidebar/bell-ringing.svg" alt="Уведомления" width="20" height="20" :class="isActive(makePath('notifications')) ? 'filter-brand' : ''" />
        <span>Уведомления</span>
      </NuxtLink>
    </nav>
  </aside>
</template>

<style scoped>
.filter-brand {
  filter: brightness(0) saturate(100%) invert(36%) sepia(81%) saturate(465%) hue-rotate(113deg) brightness(95%) contrast(93%);
}
</style>
