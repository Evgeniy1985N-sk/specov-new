<script setup lang="ts">

const dropdown = ref<HTMLElement | null>(null)
const isShow = ref(false)
const value = ref('')

const handleClickOutside = (event: Event) => {
  if (dropdown.value && !dropdown.value.contains(event.target as Node)) {
    isShow.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

const emit = defineEmits<{
  (e: 'handleClick', value: string): void
}>()

const items = ref([
  { label: 'Понедельник, 29 декабря', isActive: true },
  { label: 'Московская область, Пушкино, Ярославское шоссе, 216', isActive: false },
  { label: 'Москва, 2-я Мелитопольская улица, 12Ас1', isActive: false },
  { label: 'Московская область, Жуковский, район Замоскворечье, 92', isActive: false },
  { label: 'Москва, проспект Мира, 119с23', isActive: false },
])

function toggleActive(index: number) {
  const selectedItem = items.value[index]

  if (selectedItem) {
    value.value = selectedItem.label
    emit('handleClick', selectedItem.label)
  }

  items.value = items.value.map((item, i) => ({
    ...item,
    isActive: i === index
  }))
}


</script>

<template>

  <div ref="dropdown" class="relative w-fulll min-w-[472px]">

    <UFormField class="w-full" label="Дата доставки" name="address"
      :ui="{ label: 'text-gray-700 font-medium' }">
      <UInput @focus="isShow = true" v-model="value" placeholder="" color="neutral" size="xl"
        :ui="{ base: 'text-gray-950 font-bold' }" :class="{ 'filled bg-gray-100': value?.trim() }" />
    </UFormField>

    <div v-if="isShow"
      class="absolute top-full left-0 w-full min-w-[290px] rounded-xl bg-white isolate z-100 shadow-md">
      <ul class="grid gap-4 px-3.5 py-2.5">
        <li v-for="(item, i) in items" :key="i" @click="toggleActive(i)" :class="item.isActive ? 'active' : ''"
          class="cursor-pointer">
          <p class="text-gray-900 text-sm leading-5 font-medium">
            {{ item.label }}
          </p>
        </li>
      </ul>
    </div>

  </div>

</template>

<style scope>
:deep(.ring-error) {
  background: transparent;
}

.filled.bg-gray-100:deep(input) {
  background-color: #F5F5F5;
}
</style>