<script setup lang="ts">

const dropdown = ref<HTMLElement | null>(null)
const isShow = ref(false)
const value = ref('Сначала популярные')

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
  { label: 'Сначала популярные', isActive: true },
  { label: 'Сначала недорогие', isActive: false },
  { label: 'Сначала дорогие', isActive: false },
  { label: 'По новинкам', isActive: false },
  { label: 'По скидке', isActive: false },
  { label: 'По количеству отзывов', isActive: false },
  { label: 'Сначала с высокой оценкой', isActive: false }
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

  <div ref="dropdown" class="relative min-w-[270px]">

    <div class="flex gap-1 items-center">
      <span class="text-sm leading-5 font-semibold">
        Сортировка:
      </span>
      <button @click="isShow = !isShow" class="flex items-baseline gap-1 text-(--Brand-700) cursor-pointer">
        <p class="text-sm leading-5">
          {{ value }}
        </p>
        <WrapIcon>
          <CatalogIconAng />
        </WrapIcon>
      </button>
    </div>

    <div v-if="isShow" class="absolute top-full left-0 mt-3 w-full rounded-xl bg-white isolate z-100 border border-gray-200">
      <ul class="grid gap-4 p-4">
        <li v-for="(item, i) in items" :key="i" @click="toggleActive(i)" :class="item.isActive ? 'active' : ''"
          class="cursor-pointer item-custom">
          <p class="text-gray-700">
            {{ item.label }}
          </p>
        </li>
      </ul>
    </div>

  </div>

</template>

<style scope>
.item-custom {
  position: relative;
  display: flex;
  gap: 12px;
}

.item-custom:before {
  content: '';
  width: 20px;
  height: 20px;
  border: 1px solid #e5e7eb;
  border-radius: 50%;
  flex-shrink: 0;
}

.item-custom.active:before {
  border: 6px solid var(--Brand-700);
}
</style>