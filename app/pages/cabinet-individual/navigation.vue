<script setup lang="ts">
const route = useRoute()

const isActive = (path: string) => {
  const currentPath = route.path.replace(/\/$/, '') || '/'
  const targetPath = path.replace(/\/$/, '') || '/'

  if (targetPath === '/cabinet-individual') {
    return currentPath === targetPath
  }

  return currentPath === targetPath || currentPath.startsWith(targetPath + '/')
}
</script>

<template>
  <Header />

  <main class="pt-8 pb-23 bg-gray-100">
    <div class="max-w-(--container) mx-auto px-4 min-[510px]:px-8 xl:px-0">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-2xl font-regular text-(--Text-950) font-['Russo_One']">Кирилл</h1>
          <span class="text-sm font-semibold text-(--Text-600)">+7 (999) 999-99-99</span>
        </div>
        <button
          class="rounded-lg transition-colors border border-(--border) p-3 max-[510px]:p-2 bg-white cursor-pointer">
          <img src="/image/cabinet/bell.svg" alt="">
        </button>
      </div>

      <nav class="bg-white rounded-xl p-4">
        <NuxtLink to="/cabinet-individual"
          class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
          :class="isActive('/cabinet-individual') && !route.path.includes('/navigation') ? 'bg-[#E6F4EF] text-(--Brand-700)' : 'text-[#535862] hover:bg-gray-100'">
          <img src="/image/sidebar/building.svg" alt="Кабинет" width="20" height="20"
            :class="isActive('/cabinet-individual') && !route.path.includes('/navigation') ? 'filter-brand' : ''" />
          <span>Кабинет</span>
        </NuxtLink>

        <div class="h-px bg-(--border) my-2 mx-3"></div>

        <NuxtLink to="/cabinet-individual/orders"
          class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
          :class="isActive('/cabinet-individual/orders') ? 'bg-[#E6F4EF] text-(--Brand-700)' : 'text-[#535862] hover:bg-gray-100'">
          <img src="/image/sidebar/shopping-bag.svg" alt="Заказы" width="20" height="20"
            :class="isActive('/cabinet-individual/orders') ? 'filter-brand' : ''" />
          <span>Заказы</span>
        </NuxtLink>

        <NuxtLink to="/cabinet-individual/promo"
          class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
          :class="isActive('/cabinet-individual/promo') ? 'bg-[#E6F4EF] text-(--Brand-700)' : 'text-[#535862] hover:bg-gray-100'">
          <img src="/image/sidebar/promo.svg" alt="Промокоды" width="20" height="20"
            :class="isActive('/cabinet-individual/promo') ? 'filter-brand' : ''" />
          <span>Промокоды</span>
        </NuxtLink>

        <NuxtLink to="/cabinet-individual/discounts"
          class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
          :class="isActive('/cabinet-individual/discounts') ? 'bg-[#E6F4EF] text-(--Brand-700)' : 'text-[#535862] hover:bg-gray-100'">
          <img src="/image/sidebar/sale.svg" alt="Скидки" width="20" height="20"
            :class="isActive('/cabinet-individual/discounts') ? 'filter-brand' : ''" />
          <span>Скидки</span>
        </NuxtLink>

        <div class="h-px bg-(--border) my-2 mx-3"></div>

        <NuxtLink to="/cabinet-individual/appeals"
          class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
          :class="isActive('/cabinet-individual/appeals') ? 'bg-[#E6F4EF] text-(--Brand-700)' : 'text-[#535862] hover:bg-gray-100'">
          <img src="/image/sidebar/annotation-dots.svg" alt="Обращения" width="20" height="20"
            :class="isActive('/cabinet-individual/appeals') ? 'filter-brand' : ''" />
          <span>Обращения</span>
        </NuxtLink>

        <div class="h-px bg-(--border) my-2 mx-3"></div>

        <NuxtLink to="/cabinet-individual/addresses"
          class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
          :class="isActive('/cabinet-individual/addresses') ? 'bg-[#E6F4EF] text-(--Brand-700)' : 'text-[#535862] hover:bg-gray-100'">
          <img src="/image/sidebar/marker.svg" alt="Адреса доставки" width="20" height="20"
            :class="isActive('/cabinet-individual/addresses') ? 'filter-brand' : ''" />
          <span>Адреса доставки</span>
        </NuxtLink>

        <NuxtLink to="/cabinet-individual/data"
          class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
          :class="isActive('/cabinet-individual/data') ? 'bg-[#E6F4EF] text-(--Brand-700)' : 'text-[#535862] hover:bg-gray-100'">
          <img src="/image/sidebar/clipboard.svg" alt="Данные юрлица" width="20" height="20"
            :class="isActive('/cabinet-individual/data') ? 'filter-brand' : ''" />
          <span>Данные юрлица</span>
        </NuxtLink>

        <NuxtLink to="/cabinet-individual/users"
          class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
          :class="isActive('/cabinet-individual/users') ? 'bg-[#E6F4EF] text-(--Brand-700)' : 'text-[#535862] hover:bg-gray-100'">
          <img src="/image/sidebar/users.svg" alt="Пользователи" width="20" height="20"
            :class="isActive('/cabinet-individual/users') ? 'filter-brand' : ''" />
          <span>Пользователи</span>
        </NuxtLink>

        <NuxtLink to="/cabinet-individual/notifications"
          class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
          :class="isActive('/cabinet-individual/notifications') ? 'bg-[#E6F4EF] text-(--Brand-700)' : 'text-[#535862] hover:bg-gray-100'">
          <img src="/image/sidebar/bell-ringing.svg" alt="Уведомления" width="20" height="20"
            :class="isActive('/cabinet-individual/notifications') ? 'filter-brand' : ''" />
          <span>Уведомления</span>
        </NuxtLink>
      </nav>
    </div>
  </main>
</template>

<style scoped>
.filter-brand {
  filter: brightness(0) saturate(100%) invert(36%) sepia(81%) saturate(465%) hue-rotate(113deg) brightness(95%) contrast(93%);
}
</style>
