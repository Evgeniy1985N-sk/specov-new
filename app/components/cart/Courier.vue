<script setup lang="ts">
import Dropdown from './Dropdown.vue';
import DropdownWithIcon from './DropdownWithIcon.vue';

const sumDelivery = ref(290)
const state = reactive({
  address: '',
  entrance: '',
  floor: '',
  office: '',
  message: '',
  time: '',
  hours: '',
})
interface Item {
  label: string
  isActive: boolean
}

const address = ref<Item[]>([
  { label: 'Московская область, Пушкино, Ярославское шоссе, 218', isActive: true },
  { label: 'Московская область, Пушкино, Ярославское шоссе, 216', isActive: false },
  { label: 'Москва, 2-я Мелитопольская улица, 12Ас1', isActive: false },
  { label: 'Московская область, Жуковский, район Замоскворечье, 92', isActive: false },
  { label: 'Москва, проспект Мира, 119с23', isActive: false },
])
const time = ref<Item[]>([
  { label: 'Понедельник, 29 декабря', isActive: true },
  { label: 'Понедельник, 30 декабря', isActive: false },
  { label: 'Понедельник, 31 декабря', isActive: false },
])
const hours = ref<Item[]>([
  { label: '09:00 - 18:00', isActive: true },
  { label: '09:00 - 17:00', isActive: false },
  { label: '09:00 - 16:00', isActive: false },
])
function toggleActiveAddress(items: Item[], index: number) {
  const selectedItem = items[index]?.label
  if (selectedItem) {
    state.address = selectedItem
  }
  items = items.map((item, i) => ({
    ...item,
    isActive: i === index
  }))
  address.value = items
}
function toggleActiveTime(items: Item[], index: number) {
  const selectedItem = items[index]?.label
  if (selectedItem) {
    state.time = selectedItem
  }
  items = items.map((item, i) => ({
    ...item,
    isActive: i === index
  }))
  time.value = items
}
function toggleActiveHours(items: Item[], index: number) {
  const selectedItem = items[index]?.label
  if (selectedItem) {
    state.hours = selectedItem
  }
  items = items.map((item, i) => ({
    ...item,
    isActive: i === index
  }))
  hours.value = items
}

const visibleTime = computed(() => {
  return state.address && state.entrance && state.floor && state.office
})
</script>

<template>
  <div class="grid gap-6 w-full p-6 border border-gray-300 rounded-xl">

    <div class="grid gap-4">
      <div class="font-bold text-black">
        Укажите адрес доставки
      </div>
      <div class="grid gap-6">
        <div class="flex gap-2">

          <Dropdown label="Город, улица, дом, корпус" :items="address"
            @handle-click="(index) => toggleActiveAddress(address, index)"
            @handle-change="(value) => state.address = value" class="shrink-0 w-full max-w-[472px]" />

          <UFormField class="w-full" label="Подъезд" name="entrance" :ui="{ label: 'text-gray-700 font-medium' }">
            <UInput v-model="state.entrance" placeholder="" color="neutral" size="xl"
              :ui="{ base: 'text-gray-950 font-bold' }" :class="{ 'filled': state.entrance?.trim() }" />
          </UFormField>

          <UFormField class="w-full" label="Этаж" name="floor" :ui="{ label: 'text-gray-700 font-medium' }">
            <UInput v-model="state.floor" placeholder="" color="neutral" size="xl"
              :ui="{ base: 'text-gray-950 font-bold' }" :class="{ 'filled': state.floor?.trim() }" />
          </UFormField>

          <UFormField class="w-full" label="Кв/офис" name="floor" :ui="{ label: 'text-gray-700 font-medium' }">
            <UInput v-model="state.office" placeholder="" color="neutral" size="xl"
              :ui="{ base: 'text-gray-950 font-bold' }" :class="{ 'filled': state.office?.trim() }" />
          </UFormField>

        </div>

        <UFormField class="w-full" label="Комментарий" name="floor" :ui="{ label: 'text-gray-700 font-medium' }">
          <UTextarea v-model="state.message" placeholder="" color="neutral" size="xl"
            :ui="{ root: 'w-full', base: 'w-full min-h-[94px] text-gray-950 font-bold bg-white' }"
            :class="{ 'filled': state.message?.trim() }" />
        </UFormField>

      </div>
    </div>

    <div v-if="visibleTime" class="grid gap-4">
      <div class="font-bold text-black">
        Дата и время доставки
      </div>
      <div class="grid grid-cols-2 gap-2">
        <DropdownWithIcon label="Дата доставки" :items="time"
          @handle-click="(index) => toggleActiveTime(time, index)" />
        <DropdownWithIcon label="Время доставки" :items="hours"
          @handle-click="(index) => toggleActiveHours(hours, index)" />
      </div>
    </div>

    <div v-if="visibleTime" class="flex items-center gap-2 py-[18px] px-4 bg-gray-100">
      <span class="text-sm leading-5 text-gray-950">Стоимость доставки:</span>
      <p class="text-gray-950 font-semibold">{{ sumDelivery }} рублей</p>
    </div>

  </div>
</template>

<style scoped>
:deep(.ring-error) {
  background: transparent;
}

.filled {
  --color-white: #F5F5F5;
}
</style>