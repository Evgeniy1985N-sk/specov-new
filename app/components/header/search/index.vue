<script setup lang="ts">
import { type ProductCard } from "@/types/product";
import { type ProductCatPublicList } from "@/types/productCat";
import { useProductApi } from '@/composables/api/useProductApi';

interface Props {
  class?: string;
}

const props = defineProps<Props>()
const input = ref('');
const dropdown = ref<HTMLElement | null>(null)
const isShow = ref(false)

// Add these reactive states for search results
const searchResults = ref<ProductCard[]>([])
const searchCategories = ref<ProductCatPublicList[]>([])
const isLoading = ref(false)
const searchTimeout = ref<ReturnType<typeof setTimeout> | null>(null)

const { search: searchAPICall } = useProductApi();

const { picturePreview: productPicturePreview, link: productLink } = useProduct();
const prodImageSrc = (item: ProductCard) => {
  const img = item.imgs.find(p => p.main) ?? undefined;
	if(!img){
		return undefined;
	}
	return productPicturePreview(img);
}

const { link: catLink, imgSrc: catImgSrc } = useCategory();

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
  // Clear timeout on unmount to prevent memory leaks
  if (searchTimeout.value) {
    clearTimeout(searchTimeout.value)
  }
})

const emit = defineEmits<{
  (e: 'handleClick', value?: string): void
}>()

interface Search {
  showSearch: () => void
}

const { showSearch } = inject<Search>('search')!

watch(isShow, showSearch)

// Watch the input for changes and debounce the search
watch(input, (newValue) => {
  if (searchTimeout.value) {
    clearTimeout(searchTimeout.value)
  }

  if (!newValue.trim()) {
    // Clear results if input is empty
    searchResults.value = []
    searchCategories.value = []
    return
  }

  // Set loading state
  isLoading.value = true

  // Debounce the search - 300ms delay
  searchTimeout.value = setTimeout(async () => {
    try {
      // Call the search API
      await performSearch(newValue)
    } catch (error) {
      console.error('Search failed:', error)
		//show to user??
    } finally {
      isLoading.value = false
    }
  }, 300)
})

// Debounced search function
const performSearch = async (searchTerm: string) => {
  if (!searchTerm.trim()) {
    searchResults.value = []
    searchCategories.value = []
    return
  }
  try {
    const response = await searchAPICall(searchTerm);
    
    // Update the search results
    searchResults.value = response.products || [];
    searchCategories.value = response.categories || [];
    
  } catch (error) {
    console.error('Search API error:', error)
    // Handle error appropriately - maybe show a message to user
    searchResults.value = []
    searchCategories.value = []
  }
}

// Optional: Clear search function
const clearSearch = () => {
  input.value = ''
  searchResults.value = []
  searchCategories.value = []
  if (searchTimeout.value) {
    clearTimeout(searchTimeout.value)
    searchTimeout.value = null
  }
}

// Optional: Handle form submit
const handleSubmit = (e: Event) => {
  e.preventDefault()
  if (input.value.trim()) {
    // If you want to trigger search immediately on submit
    if (searchTimeout.value) {
      clearTimeout(searchTimeout.value)
    }
    performSearch(input.value)
  }
}
</script>

<template>

  <div :class="[props.class, {'z-100': isShow}]" @click="isShow = true" class="relative w-full flex items-center gap-2">

    <button v-if="isShow" @click="clearSearch" class="sm:hidden">
      <WrapIcon>
        <HeaderIconArrowLeft />
      </WrapIcon>
    </button>

    <div ref="dropdown" class="w-full border-zinc-300 border border-solid rounded-lg bg-white">

      <form @submit.prevent="handleSubmit" class="relative w-full py-[7px] sm:py-[9px] px-[11px] gap-2 flex justify-center items-center">

        <input v-model="input"
          class="line-clamp-1 w-full font-medium text-gray-500 overflow-ellipsis focus:outline-none"
          placeholder="Найти спецодежду или инструменты">

          <div class="flex items-center gap-2">
            <WrapIcon v-if="input" @click="clearSearch" class="cursor-pointer">
              <HeaderIconCross />
            </WrapIcon>
            <span v-if="input" class="text-gray-200">|</span>
            <button type="submit" class="h-5 w-5 cursor-pointer">
              <HeaderIconSearch />
            </button>
          </div>

      </form>

      <!-- HINTS WITH MODAL WINDOW -->
      <div v-if="isShow && input" class="absolute top-full left-0 mt-1.5 w-full p-4 rounded-xl bg-white z-100 sm:shadow">
        
        <!-- Show loading indicator -->
        <div v-if="isLoading" class="p-4 text-center text-gray-500">
          Поиск...
        </div>

        <!-- Show categories from search results -->
        <template v-else>
          <NuxtLink v-for="item in searchCategories" 
            :key="item.id"
            :to="catLink(item)"
            class="flex items-center gap-3 p-2 transition bg-white hover:bg-gray-100 rounded-lg cursor-pointer">
            <span class="flex items-cnter justify-center w-10 h-10 bg-white rounded-lg">
              <img class="object-contain" :src="catImgSrc(item)" :alt="'img-'+item.id">
            </span>
            <div class="grid gap-1">
              <p class="text-sm leading-5 font-semibold text-gray-950">
                {{ item.name }}
              </p>
            </div>
          </NuxtLink>

          <div v-if="searchResults.length > 0" 
            class="flex items-center justify-between mt-4 py-4 border-t border-gray-200 text-sm leading-5 font-medium">
            <p>
              Найденные товары
            </p>
            <NuxtLink class="text-(--Brand-700) cursor-pointer" to="/catalog">
              Показать всё
            </NuxtLink>
          </div>

          <div v-if="searchResults.length > 0" class="grid">
            <NuxtLink v-for="item in searchResults" 
              :key="item.id"
              :to="productLink(item)"
              class="flex items-center gap-3 p-2 transition bg-white hover:bg-gray-100 rounded-lg cursor-pointer">
              <span class="flex items-cnter justify-center w-10 h-10 bg-white rounded-lg">
                <img class="object-contain" :src="prodImageSrc(item)" :alt="`img-${item.id}`">
              </span>
              <div class="grid gap-1">
                <p class="text-sm leading-5 font-semibold text-gray-950">
                  {{ item.name }}
                </p>
                <div class="flex gap-2 items-center">
                  <div v-if="item.price" class="text-sm leading-5 text-gray-950 font-bold">
                    {{ item.price?.toLocaleString('ru-RU') }} ₽
                  </div>
                  <div v-if="item.old_price" class="text-zinc-400 line-through shrink-0">
                    {{ item.old_price?.toLocaleString('ru-RU') }} ₽
                  </div>
                  <div v-if="item.discount"
                    class="bg-[seagreen] leading-[22px] text-center text-white text-xs px-1.5 rounded-md">
                    -{{ item.discount }}%
                  </div>
                </div>
              </div>
            </NuxtLink>
          </div>

          <!-- Show message when no results found -->
          <div v-if="input && !isLoading && searchResults.length === 0 && searchCategories.length === 0" 
            class="p-4 text-center text-gray-500">
            Ничего не найдено
          </div>
        </template>

        <NuxtLink
          class="sm:hidden flex items-center justify-center mt-4 p-2.5 text-sm leading-5 text-(--Brand-950) border border-gray-200 rounded-lg cursor-pointer"
          to="/catalog">
          Показать все товары
        </NuxtLink>

      </div>
      <!-- HINTS WITH MODAL WINDOW -->

    </div>

  </div>


</template>
