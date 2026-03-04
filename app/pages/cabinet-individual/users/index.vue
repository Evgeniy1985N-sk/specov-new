<script setup lang="ts">
import Tabs from '@/components/cabinet/Tabs.vue'
import UserAddForm from '@/components/user/AddForm.vue'

const cabinetStore = useCabinetStore()

const activeTab = ref<'active' | 'blocked'>('active')
const showAddForm = ref(false)

const showNotification = ref(false)
const notificationText = ref('')
const notificationIcon = ref('')

const tabs = [
  { id: 'active', label: 'Активные' },
  { id: 'blocked', label: 'Заблокированные' }
]

const filteredUsers = computed(() => {
  return cabinetStore.users.filter(user =>
    activeTab.value === 'active' ? !user.blocked : user.blocked
  )
})

watch(activeTab, (newTab) => {
})

const handleAddUser = () => {
  showAddForm.value = true
}

const handleCancelAdd = () => {
  showAddForm.value = false
}

const handleSubmitAdd = (data: { fullName: string; phone: string; email: string; seesOnlyOwnOrders: boolean }) => {
  cabinetStore.addUser(data)
  showAddForm.value = false
  activeTab.value = 'active'

  notificationText.value = 'Пользователь добавлен'
  notificationIcon.value = '/image/cabinet/user.svg'
  showNotification.value = true
}

const handleEdit = (userId: string) => {
  console.log('Edit user:', userId)
}

const handleBlock = (userId: string) => {
  const user = cabinetStore.users.find(u => u.id === userId)
  if (!user) return

  const wasBlocked = user.blocked
  cabinetStore.toggleUserBlock(userId)

  if (wasBlocked) {
    activeTab.value = 'active'
    notificationText.value = 'Пользователь восстановлен'
    notificationIcon.value = '/image/cabinet/reverse-left.svg'
  } else {
    activeTab.value = 'blocked'
    notificationText.value = 'Пользователь заблокирован'
    notificationIcon.value = '/image/cabinet/lock.svg'
  }
  showNotification.value = true
}

const handleCloseNotification = () => {
  showNotification.value = false
}
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
          <template v-if="showAddForm">
            <UserAddForm @cancel="handleCancelAdd" @submit="handleSubmitAdd" />
          </template>
          <template v-else>
            <CabinetPageHeader title="Пользователи" back-to="/cabinet-individual/navigation"
              :add-button-text="'Добавить пользователя'" @add="handleAddUser" />

            <Tabs v-model="activeTab" :tabs="tabs" />

            <div>
              <div class="hidden min-[750px]:flex gap-6 px-4 py-3 mb-4 bg-gray-100 rounded-2xl">
                <div
                  class="min-[750px]:w-[181px] min-[1280px]:w-[248px] text-left text-sm font-medium text-(--Text-600)">
                  ФИО</div>
                <div
                  class="min-[750px]:w-[181px] min-[1280px]:w-[248px] text-left text-sm font-medium text-(--Text-600)">
                  Email</div>
                <div
                  class="min-[750px]:w-[181px] min-[1280px]:w-[248px] text-left text-sm font-medium text-(--Text-600)">
                  Телефон</div>
                <div class="min-[750px]:w-14 min-[1280px]:w-14"></div>
              </div>

              <div class="flex flex-col gap-4 min-[750px]:gap-2">
                <UserCard v-for="user in filteredUsers" :key="user.id" :user="user" @edit="handleEdit"
                  @block="handleBlock" />
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </main>

  <Notification :show="showNotification" :text="notificationText" :icon="notificationIcon"
    @close="handleCloseNotification" />
</template>
