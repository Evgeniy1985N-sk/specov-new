<script setup lang="ts">
const cabinetStore = useCabinetStore()
const route = useRoute()

const onlyUnread = ref(false)
const showForm = ref(false)
const statusOpen = ref(false)
const periodOpen = ref(false)
const statusDetails = ref<HTMLElement | null>(null)
const periodDetails = ref<HTMLElement | null>(null)

const handleNewAppeal = () => {
  showForm.value = true
}

const handleCancelForm = () => {
  showForm.value = false
}

const handleSubmitForm = (data: { topic: string; message: string; files: File[] }) => {
  console.log('Submit appeal:', data)
  showForm.value = false
}

const toggleStatus = () => {
  statusOpen.value = !statusOpen.value
  if (statusOpen.value) {
    periodOpen.value = false
  }
}

const togglePeriod = () => {
  periodOpen.value = !periodOpen.value
  if (periodOpen.value) {
    statusOpen.value = false
  }
}

const handleDocumentClick = (event: MouseEvent) => {
  const target = event.target as Node

  if (
    statusDetails.value?.contains(target) ||
    periodDetails.value?.contains(target)
  ) {
    return
  }

  statusOpen.value = false
  periodOpen.value = false
}

onMounted(() => {
  if (route.query.new === '1') {
    showForm.value = true
  }

  document.addEventListener('click', handleDocumentClick)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleDocumentClick)
})
</script>

<template>
  <Header />

  <main class="pt-8 pb-23">
    <div class="max-w-(--container) mx-auto px-4 min-[750px]:px-8 xl:px-0">
      <div class="flex gap-8 min-[1280px]:mx-4.5">
        <div class="hidden xl:block">
          <Sidebar />
        </div>

        <div class="flex-1 flex flex-col gap-4 min-[750px]:gap-6">
          <template v-if="showForm">
            <AppealForm @cancel="handleCancelForm" @submit="handleSubmitForm" />
          </template>
          <template v-else>
            <CabinetPageHeader title="Обращения" back-to="/cabinet-corporate/navigation"
              add-button-text="Новое обращение" add-button-icon="/image/sidebar/annotation-dots.svg"
              @add="handleNewAppeal" />

            <div class="bg-(--Base-White) rounded-xl p-5">
              <div
                class="flex flex-col min-[750px]:flex-row min-[750px]:items-center min-[750px]:justify-between gap-4 mb-6">
                <div class="flex items-center gap-4">
                  <span class="hidden min-[510px]:block text-sm text-(--Text-600) font-medium">Сортировка:</span>

                  <details ref="statusDetails" class="relative" :open="statusOpen">
                    <summary
                      class="flex items-center gap-1 text-sm font-medium text-(--Brand-700) px-3 py-2.5 rounded-lg cursor-pointer list-none"
                      @click.prevent="toggleStatus">
                      <span>Все статусы</span>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                        :class="['transition-transform', statusOpen ? 'rotate-180' : '']">
                        <path d="M4 6L8 10L12 6" stroke="var(--Brand-700)" stroke-width="1.5" stroke-linecap="round"
                          stroke-linejoin="round" />
                      </svg>
                    </summary>
                    <div class="absolute z-10 mt-1 w-48 bg-(--Base-White) rounded-lg shadow-md py-1">
                      <button class="w-full text-left px-3 py-2.5 text-sm text-[#535862] hover:bg-gray-100">Все
                        статусы</button>
                      <button class="w-full text-left px-3 py-2.5 text-sm text-[#535862] hover:bg-gray-100">В
                        работе</button>
                      <button
                        class="w-full text-left px-3 py-2.5 text-sm text-[#535862] hover:bg-gray-100">Закрытые</button>
                    </div>
                  </details>

                  <details ref="periodDetails" class="relative" :open="periodOpen">
                    <summary
                      class="flex items-center gap-1 text-sm font-medium text-(--Brand-700) px-3 py-2.5 rounded-lg cursor-pointer list-none"
                      @click.prevent="togglePeriod">
                      <span>Период</span>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                        :class="['transition-transform', periodOpen ? 'rotate-180' : '']">
                        <path d="M4 6L8 10L12 6" stroke="var(--Brand-700)" stroke-width="1.5" stroke-linecap="round"
                          stroke-linejoin="round" />
                      </svg>
                    </summary>
                    <div class="absolute z-10 mt-1 w-48 bg-(--Base-White) rounded-lg shadow-md py-1">
                      <button class="w-full text-left px-3 py-2.5 text-sm text-[#535862] hover:bg-gray-100">За
                        неделю</button>
                      <button class="w-full text-left px-3 py-2.5 text-sm text-[#535862] hover:bg-gray-100">За
                        месяц</button>
                    </div>
                  </details>
                </div>

                <div class="flex items-center gap-3">
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="onlyUnread" class="sr-only peer">
                    <div
                      class="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:start-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-(--Brand-600)">
                    </div>
                  </label>
                  <span class="text-sm font-semibold text-(--Text-950)">Только непрочитанные</span>
                </div>
              </div>

              <div class="flex flex-col gap-2 min-[750px]:gap-6">
                <AppealCard v-for="appeal in cabinetStore.appeals" :key="appeal.id" :appeal="appeal" />

                <div v-if="cabinetStore.appeals.length === 0" class="text-center py-4">
                  <p class="text-sm text-(--Text-600)">Нет обращений</p>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </main>
</template>
