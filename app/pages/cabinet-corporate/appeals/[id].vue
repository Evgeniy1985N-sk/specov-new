<script setup lang="ts">
const route = useRoute()
const cabinetStore = useCabinetStore()

const appealId = computed(() => route.params.id as string)

const appeal = computed(() => {
  return cabinetStore.appeals.find(a => a.id === appealId.value)
})

const messageText = ref('')
const rating = ref(0)
const hoveredRating = ref(0)
const ratingSubmitted = ref(false)
const showRatingNotification = ref(false)

const getStatusColor = (status: string) => {
  return status === 'В работе' ? 'text-(--Success-700)' : 'text-(--Text-600)'
}

const getDotColor = (status: string) => {
  return status === 'В работе' ? 'bg-(--Success-700)' : 'bg-(--Text-600)'
}

const handleSendMessage = () => {
  if (messageText.value.trim() && appeal.value) {
    cabinetStore.addAppealMessage(appeal.value.id, messageText.value.trim())
    messageText.value = ''
  }
}

const handleSubmitRating = () => {
  if (rating.value > 0) {
    console.log('Rating submitted:', rating.value)
    ratingSubmitted.value = true
    showRatingNotification.value = true
  }
}

const setRating = (value: number) => {
  rating.value = value
}

const isStarActive = (star: number) => {
  return star <= (hoveredRating.value || rating.value)
}
</script>

<template>
  <Header />

  <main class="pt-8 pb-23 bg-gray-100">
    <div class="max-w-(--container) mx-auto px-4 min-[750px]:px-8 xl:px-0">
      <div class="flex gap-8 min-[1280px]:mx-4.5">
        <div class="hidden xl:block">
          <Sidebar />
        </div>

        <div class="flex-1 flex flex-col gap-4 min-[750px]:gap-6">
          <div v-if="appeal">
            <NuxtLink to="/cabinet-corporate/appeals"
              class="flex items-center gap-1.5 text-sm text-(--Text-600) hover:text-(--Text-950) transition-colors mb-4">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 12L6 8L10 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                  stroke-linejoin="round" />
              </svg>
              Все обращения
            </NuxtLink>

            <h2 class="text-xl font-bold text-(--Text-950) mb-2">{{ appeal.title }}</h2>
            <span class="flex items-center gap-[5px] text-sm font-medium mb-6" :class="getStatusColor(appeal.status)">
              <span class="w-2 h-2 rounded-full" :class="getDotColor(appeal.status)"></span>
              {{ appeal.status }}
            </span>
            <div class=" bg-white rounded-lg p-4">
              <div class="flex flex-col gap-6">
                <div v-for="message in appeal.messages" :key="message.id"
                  class="flex flex-col gap-2 bg-gray-100 rounded-lg p-4">
                  <div v-if="message.sender === 'manager'"
                    class="flex flex-col min-[600px]:flex-row min-[600px]:items-start min-[600px]:justify-between gap-2">
                    <div
                      class="flex justify-between items-center min-[600px]:flex max-[600px]:items-start min-[600px]:gap-2">
                      <img src="/image/cabinet/specov-logo.svg" alt="Спецов"
                        class="w-10 h-10 p-2.5 bg-(--Brand-950) rounded-full shrink-0" />
                      <span class="text-xs text-(--Text-600) min-[600px]:hidden">{{ message.timestamp }}</span>

                      <div class="hidden min-[600px]:flex min-[600px]:flex-col min-[600px]:items-start">
                        <span class="text-base font-semibold text-(--Text-950)">{{ message.senderName }}</span>
                        <span v-if="message.senderRole" class="text-sm text-(--Text-600)">{{ message.senderRole
                          }}</span>
                      </div>
                    </div>

                    <div class="flex flex-col min-[600px]:hidden">
                      <span class="text-base font-semibold text-(--Text-950)">{{ message.senderName }}</span>
                      <span v-if="message.senderRole" class="text-sm text-(--Text-600)">{{ message.senderRole }}</span>
                    </div>

                    <span class="hidden min-[600px]:block text-xs text-(--Text-600)">{{ message.timestamp }}</span>
                  </div>

                  <div v-else class="flex items-center justify-between gap-3 max-[600px]:items-start">
                    <div class="flex gap-2 items-center">
                      <img src="/image/cabinet/user-circle.svg" alt="User"
                        class="w-10 h-10 p-2.5 bg-(--Brand-100) rounded-full shrink-0" />

                      <div class="flex flex-col">
                        <span class="text-base font-semibold text-(--Text-950)">{{ message.senderName }}</span>
                        <span v-if="message.senderRole" class="text-sm text-(--Text-600)">{{ message.senderRole
                          }}</span>
                      </div>
                    </div>

                    <span class="text-xs text-(--Text-600)">{{ message.timestamp }}</span>
                  </div>
                  <p class="text-sm text-(--Text-600) leading-relaxed">{{ message.text }}</p>
                </div>
              </div>

              <div v-if="appeal.status === 'В работе'" class="relative w-full mt-6">
                <input v-model="messageText" type="text" placeholder="Напишите сообщение"
                  class="w-full h-12 p-4 border border-(--border) rounded-lg text-sm text-(--Text-950) placeholder:text-(--Text-600) focus:outline-none focus:border-(--Brand-600) transition-colors" />
                <button
                  class="absolute right-1 top-1 h-10 px-3.5 bg-(--Brand-950) text-white text-sm font-semibold rounded-lg hover:bg-(--Brand-700) transition-colors">
                  Отправить
                </button>
              </div>

              <div v-else-if="!ratingSubmitted"
                class="flex flex-col min-[600px]:flex-row min-[600px]:items-center min-[600px]:justify-between items-center gap-4 p-1 border border-(--border) rounded-lg bg-white max-[600px]:p-3 mt-6">
                <span class="text-lg font-bold text-(--Text-950) pl-2 text-center min-[600px]:text-left">Оцените работу
                  поддержки</span>

                <div class="flex max-[600px]:flex-col items-center gap-4 w-full min-[600px]:w-auto">
                  <div class="flex items-center gap-1">
                    <button v-for="star in 5" :key="star" @click="setRating(star)" @mouseenter="hoveredRating = star"
                      @mouseleave="hoveredRating = 0" class="p-0.5 transition-transform hover:scale-110">
                      <img :src="isStarActive(star) ? '/image/star.svg' : '/image/cabinet/star.svg'" alt="Star"
                        class="w-6 h-6 shrink-0" :class="isStarActive(star) ? '' : 'opacity-30 grayscale'" />
                    </button>
                  </div>

                  <button @click="handleSubmitRating"
                    class="w-full min-[600px]:w-auto h-10 px-4 bg-(--Brand-950) text-white text-sm font-semibold rounded-lg hover:bg-(--Brand-700) transition-colors">
                    Отправить
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="bg-white rounded-xl p-5 text-center">
            <p class="text-sm text-(--Text-600)">Обращение не найдено</p>
            <NuxtLink to="/cabinet-corporate/appeals"
              class="inline-block mt-4 text-sm text-(--Brand-600) hover:text-(--Brand-700) transition-colors">
              Вернуться к списку обращений
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </main>

  <Notification :show="showRatingNotification" text="Спасибо за оценку" icon="/image/cabinet/heart-rounded.svg"
    @close="showRatingNotification = false" />
</template>
