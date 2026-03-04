<script setup lang="ts">
const cabinetStore = useCabinetStore()

const ordersSortOpen = ref(false)
const ordersSortDetails = ref<HTMLElement | null>(null)

const toggleOrdersSort = () => {
  ordersSortOpen.value = !ordersSortOpen.value
}

const handleDocumentClick = (event: MouseEvent) => {
  const target = event.target as Node

  if (ordersSortDetails.value?.contains(target)) {
    return
  }

  ordersSortOpen.value = false
}

onMounted(() => {
  document.addEventListener('click', handleDocumentClick)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleDocumentClick)
})
</script>

<template>
  <Header />

  <main class="pt-8 pb-23 bg-gray-100">
    <div class="max-w-(--container) mx-auto px-4 min-[510px]:px-8 xl:px-0">
      <div class="flex gap-8 min-[1280px]:mx-4.5">
        <div class="hidden xl:block">
          <Sidebar />
        </div>

        <div class="flex-1 flex flex-col gap-4 min-[510px]:gap-6">
          <CabinetPageHeader title="Заказы" back-to="/cabinet-individual/navigation" add-button-text="Новый заказ"
            add-button-breakpoint="min-[870px]:inline" add-button-class="p-3 min-[870px]:px-4 min-[870px]:py-3" />

          <div class="bg-white rounded-xl p-4 min-[870px]:p-5 overflow-hidden">
            <div class="flex items-center gap-2 mb-4">
              <span class="text-sm text-(--Text-600)">Сортировка:</span>
              <details ref="ordersSortDetails" class="relative" :open="ordersSortOpen">
                <summary
                  class="flex items-center gap-1 text-sm font-medium text-(--Brand-700) px-3 py-2.5 rounded-lg cursor-pointer list-none"
                  @click.prevent="toggleOrdersSort">
                  <span>Все заказы</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                    :class="['transition-transform', ordersSortOpen ? 'rotate-180' : '']">
                    <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                      stroke-linejoin="round" />
                  </svg>
                </summary>
                <div class="absolute z-10 mt-1 w-48 bg-white rounded-lg shadow-md py-1">
                  <button class="w-full text-left px-3 py-2.5 text-sm text-[#535862] hover:bg-gray-100">Все
                    заказы</button>
                  <button class="w-full text-left px-3 py-2.5 text-sm text-[#535862] hover:bg-gray-100">В
                    обработке</button>
                  <button
                    class="w-full text-left px-3 py-2.5 text-sm text-[#535862] hover:bg-gray-100">Завершённые</button>
                </div>
              </details>
            </div>

            <div class="relative mb-6">
              <input type="text" placeholder="Введите артикул или наименование товара"
                class="w-full px-4 py-3 border border-(--border) rounded-lg text-sm text-(--Text-600) placeholder:text-(--Text-600) focus:outline-none focus:border-(--Brand-600)">
              <svg class="absolute right-4 top-1/2 -translate-y-1/2 text-(--Text-600)" width="20" height="20"
                viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M17.5 17.5L13.875 13.875M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z"
                  stroke="currentColor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>

            <div
              class="hidden md:grid grid-cols-[120px_1fr_180px_40px] xl:grid-cols-[160px_1fr_180px_40px] gap-4 px-4 py-3 text-sm text-(--Text-600) mb-2">
              <div>Заказ</div>
              <div>Кол-во товаров</div>
              <div class="text-right">Сумма и статус</div>
              <div></div>
            </div>

            <div class="flex flex-col gap-2">
              <OrdersCards v-for="(order, index) in cabinetStore.ordersWithProducts" :key="index" :order="order"
                :index="index" :show-user-column="false" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
