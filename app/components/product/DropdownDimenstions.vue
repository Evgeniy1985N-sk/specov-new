<script setup lang="ts">
import type { LocationQuery } from 'vue-router'

import type { CategoryCatalogSortCol, CategoryCatalogSortDir } from "@/types/productCat";

const dropdown = ref<HTMLElement | null>(null)
const isShow = ref(false)
const value = ref<string>("52-54/170-176");

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
  (e: 'handleClick', value: { sort: CategoryCatalogSortCol, dir: CategoryCatalogSortDir }): void
}>()

const items = ref<{
  label: string;
  sort: CategoryCatalogSortCol;
  isActive: boolean;
  dir: CategoryCatalogSortDir;
}[]>([
  { label: '44-46/170-176', isActive: true, sort: "popularity", dir: "desc" },
  { label: '48-50/170-176', isActive: false, sort: "price", dir: "asc" },
  { label: '52-54/170-176', isActive: false, sort: "price", dir: "desc" },
  { label: '56-58/180-182', isActive: false, sort: "is_new", dir: "asc" },
  { label: '60-62/180-182', isActive: false, sort: "has_discount", dir: "asc" },
  { label: '64-66/194-200', isActive: false, sort: "review_count", dir: "desc" },
  { label: '64-66/194-200', isActive: false, sort: "review_count", dir: "desc" },
  { label: '64-66/194-200', isActive: false, sort: "review_count", dir: "desc" },
  { label: '64-66/194-200', isActive: false, sort: "review_count", dir: "desc" },
  { label: '64-66/194-200', isActive: false, sort: "review_count", dir: "desc" },
])

function toggleActive(index: number) {
  const selectedItem = items.value[index];

  if (selectedItem) {
    value.value = selectedItem.label;
    emit('handleClick', { sort: selectedItem.sort, dir: selectedItem.dir });
  }

  items.value = items.value.map((item, i) => ({
    ...item,
    isActive: i === index
  }));

  // isShow.value = false
}

function initFromQuery(query: LocationQuery) {
  const sort = query.sort as CategoryCatalogSortCol | undefined
  const dir = query.dir as CategoryCatalogSortDir | undefined

  if (!sort || !dir) return

  const item = items.value.find(
    i => i.sort === sort && i.dir === dir
  )

  if (!item) return

  items.value = items.value.map(i => ({
    ...i,
    isActive: i === item
  }))

  value.value = item.label;

  // isShow.value = false
}

const route = useRoute();
watch(
  () => route.query,
  () => {
    isShow.value = false
  }
);

defineExpose({
  initFromQuery,
});

</script>

<template>

  <div class="flex flex-col gap-4 w-full">
    <div class="font-sans font-bold text-base leading-6 text-black">
      Размеры
    </div>

    <div ref="dropdown" class="relative w-full">


      <button @click="isShow = !isShow" :class="isShow ? 'border-[#18B177]' : 'border-gray-200' " 
      class="flex items-center justify-between gap-1 w-full px-3 py-2 text-gray-500 border-2 rounded-lg cursor-pointer">
        <p class="text-gray-900 font-medium">
          {{ value }}
        </p>
        <WrapIcon :class="isShow ? 'rotate-180' : '' ">
          <ProductIconAngDown />
        </WrapIcon>
      </button>


      <div v-if="isShow"
        class="absolute top-full left-0 mt-1 p-1.5 pr-0 w-full rounded-lg bg-white border border-gray-200 isolate z-100 shadow-lg">

        <ul class="custom-scrollbar pr-0 h-64 overflow-auto">

          <li v-for="(item, i) in items" :key="i" @click="toggleActive(i)" :class="item.isActive ? 'active bg-gray-50' : ''"
            class="flex items-center justify-between p-2 hover:bg-gray-50 cursor-pointer rounded-md">
            <p class="text-gray-900 font-medium">
              {{ item.label }}
            </p>
            <WrapIcon v-if="item.isActive">
              <ProductIconCheck />
            </WrapIcon>
          </li>

        </ul>

      </div>

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
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #D9D9D9 #fff;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #fff;
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #D9D9D9;
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
