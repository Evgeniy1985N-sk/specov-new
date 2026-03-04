<script setup lang="ts">
const notifications = ref([
  { id: 'all', label: 'Все', enabled: true },
  { id: 'delivery', label: 'В доставке', enabled: true },
  { id: 'created', label: 'Создан', enabled: true },
  { id: 'processed', label: 'Оформлен', enabled: true },
  { id: 'cancelled', label: 'Отменен', enabled: true },
  { id: 'received', label: 'Получен', enabled: true }
])

const toggleNotification = (id: string) => {
  const notification = notifications.value.find(n => n.id === id)
  if (notification) {
    notification.enabled = !notification.enabled
    
    // If "All" is toggled, toggle all others
    if (id === 'all') {
      notifications.value.forEach(n => {
        n.enabled = notification.enabled
      })
    }
  }
}
</script>

<template>
  <div class="w-full min-[1280px]:max-w-[590px]">    
    <div class="bg-(--Base-White) rounded-xl p-5">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div
          v-for="notification in notifications"
          :key="notification.id"
          class="flex items-center gap-3"
        >
          <label class="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              :checked="notification.enabled"
              @change="toggleNotification(notification.id)"
              class="sr-only peer"
            >
            <div class="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-(--Brand-600)"></div>
          </label>
          <span class="text-base font-medium text-(--Text-950)">{{ notification.label }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

