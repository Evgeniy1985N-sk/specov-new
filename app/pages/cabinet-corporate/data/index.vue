<script setup lang="ts">
import ContactDataForm from '@/components/cabinet/ContactDataForm.vue'
import PasswordChangeForm from '@/components/cabinet/PasswordChangeForm.vue'
import Notification from '@/components/Notification/index.vue'
import type { PasswordData } from '~/types/cabinet'

const cabinetStore = useCabinetStore()

const passwordData = reactive<PasswordData>({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const showNotification = ref(false)
const notificationText = ref('')
const notificationIcon = ref('')

const handleEditPhone = () => {
  // Handled by ContactDataForm component
}

const handleEditEmail = () => {
  // Handled by ContactDataForm component
}

const handleGetCode = (value: string) => {
  console.log('Get code for:', value)
}

const handleEditSuccess = () => {
  notificationText.value = 'Контактные данные успешно изменены'
  notificationIcon.value = '/image/cabinet/phone-call.svg'
  showNotification.value = true
  setTimeout(() => {
    showNotification.value = false
  }, 3000)
}

const handlePasswordUpdate = (data: PasswordData) => {
  passwordData.currentPassword = data.currentPassword
  passwordData.newPassword = data.newPassword
  passwordData.confirmPassword = data.confirmPassword
}

const handleSavePassword = () => {
  console.log('Save password:', passwordData)
}
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
          <CabinetPageHeader title="Мои данные" back-to="/cabinet-corporate/navigation" />

          <div class="flex flex-col gap-4 min-[510px]:gap-6 w-full xl:max-w-[590px]">
            <ContactDataForm :contact-data="cabinetStore.contactData" @edit-phone="handleEditPhone"
              @edit-email="handleEditEmail" @get-code="handleGetCode" @success="handleEditSuccess" />

            <OrganizationCard :organization="cabinetStore.organizationData" />

            <PasswordChangeForm :password-data="passwordData" @update="handlePasswordUpdate"
              @save="handleSavePassword" />
          </div>
        </div>
      </div>
    </div>
  </main>

  <Notification :show="showNotification" :text="notificationText" :icon="notificationIcon"
    @close="showNotification = false" />

</template>
