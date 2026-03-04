<script setup lang="ts">
const cabinetStore = useCabinetStore()

const showAddForm = ref(false)
const showNotification = ref(false)
const notificationText = ref('')

const handleDelete = (addressId: string) => {
  cabinetStore.deleteAddress(addressId)
  notificationText.value = 'Адрес доставки был удален'
  showNotification.value = true
}

const handleEdit = () => {
  console.log('Edit address')
}

const handleApplyToAll = (type: 'sms' | 'email') => {
  console.log('Apply to all:', type)
}

const handleToggleSms = (value: boolean, addressId: string) => {
  const address = cabinetStore.addresses.find(addr => addr.id === addressId)
  if (address) {
    address.sms.enabled = value
    cabinetStore.saveAddresses(cabinetStore.addresses)
  }
}

const handleToggleEmail = (value: boolean, addressId: string) => {
  const address = cabinetStore.addresses.find(addr => addr.id === addressId)
  if (address) {
    address.email.enabled = value
    cabinetStore.saveAddresses(cabinetStore.addresses)
  }
}

const handleAddAddress = () => {
  showAddForm.value = true
}

const handleBackToList = () => {
  showAddForm.value = false
}

const handleFormSubmit = (data: { address: string; office: string; entrance: string; comment: string }) => {
  let fullAddress = data.address
  if (data.office) {
    fullAddress += `, офис ${data.office}`
  }
  if (data.entrance) {
    fullAddress += `, подъезд ${data.entrance}`
  }
  if (data.comment) {
    fullAddress += ` (${data.comment})`
  }

  cabinetStore.addAddress({
    title: 'Адрес',
    address: fullAddress,
    sms: {
      enabled: true,
      phone: '+7 (345) 258-18-63'
    },
    email: {
      enabled: true,
      address: 'info@spetsov.ru'
    }
  })

  showAddForm.value = false
  notificationText.value = 'Новый адрес добавлен'
  showNotification.value = true
}

const handleFormCancel = () => {
  showAddForm.value = false
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

        <div class="flex-1 flex flex-col gap-6">
          <template v-if="showAddForm">
            <button @click="handleBackToList"
              class="flex items-center gap-2  transition-colors cursor-pointer self-start">
              <img src="/image/cabinet/chevron-left.svg" alt="">
              <span class="text-sm font-semibold text-(--Text-600)">Все адреса</span>
            </button>
            <h1 class="text-2xl font-regular text-(--Text-950) font-['Russo_One']">Добавить новый адрес</h1>
          </template>
          <CabinetPageHeader v-else title="Адреса доставки" back-to="/cabinet-corporate/navigation"
            add-button-text="Добавить адрес" @add="handleAddAddress" />

          <div v-if="showAddForm" class="flex flex-col gap-6">
            <AddressAddForm @submit="handleFormSubmit" @cancel="handleFormCancel" />
          </div>

          <div v-else class="flex flex-col gap-6 max-[510px]:gap-4">
            <AddressCard v-for="(address, index) in cabinetStore.addresses" :key="address.id" :address="address"
              @delete="() => handleDelete(address.id)" @edit="handleEdit" @apply-to-all="handleApplyToAll"
              @toggle-sms="(value: boolean) => handleToggleSms(value, address.id)"
              @toggle-email="(value: boolean) => handleToggleEmail(value, address.id)" />
          </div>
        </div>
      </div>
    </div>
  </main>

  <!-- Уведомление о добавлении/удалении адреса -->
  <Notification :show="showNotification" :text="notificationText" icon="/image/sidebar/marker.svg"
    @close="showNotification = false" />
</template>
