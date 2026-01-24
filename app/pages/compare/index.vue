<script setup lang="ts">
import type { ProductCard } from "~/types/product";

const compareStore = useCompareStore()
const deleteItemsStore = useCompareStore().deleteItems
const allProducts = useProductsStore().allProducts
const compareProducts = ref<ProductCard[]>([])
const activeIndex = ref<number | null>(0);
const activeProducts = ref<ProductCard[]>()
const isDifference = ref(false)

const compareIds = computed(() => {
  return compareStore.items
})

watch(compareIds, () => {
  compareProducts.value = []
  getCompareProducts()
}, { deep: true })

getCompareProducts()
function getCompareProducts() {
  compareIds.value.forEach((c) => {
    const foundProduct = allProducts.find((item) => item.id == c.id);
    if (foundProduct) {
      compareProducts.value.push(foundProduct)
    }
  })
}

const groupedItems = computed(() => {
  return compareProducts.value.reduce((acc, item) => {
    const category = item.category as string;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as { [key: string]: typeof compareProducts.value[number][] });
});

const categoryProducts = computed(() => {
  return Object.entries(groupedItems.value).map(([category, items], i) => ({
    category,
    count: items.length,
    isActive: i === activeIndex.value
  }));
});

function toggleActive(index: number) {
  activeIndex.value = index;
}

watch(categoryProducts, () => {
  getActiveProducts()
})

onMounted(() => {
  getActiveProducts()
})

function getActiveProducts() {
  const activeCategory = categoryProducts.value?.find(item => item.isActive)?.category
  activeProducts.value = compareProducts.value.filter(item => item.category == activeCategory)
}

function deleteProducts() {
  activeProducts.value?.forEach((item) => {
    deleteItemsStore(item.id)
  })
  activeIndex.value = 0
}

function deleteAllCompare() {
  compareProducts.value?.forEach((item) => {
    deleteItemsStore(item.id)
  })
}

</script>

<template>

  <Header />

  <Breadcrumbs />

  <main>

    <Section>
      <SectionContainer>

        <div class="flex items-center justify-between mb-6">

          <TitleGoods title="Сравнение товаров" />

          <div class="flex gap-4 sm:gap-0 sm:bg-gray-100 rounded-lg">
            <button @click="deleteAllCompare"
              class="flex gap-2.5 items-center p-2 sm:p-4 pr-0 hover:text-(--Brand-700) transition-colors cursor-pointer">
              <WrapIcon>
                <CompareIconTrash />
              </WrapIcon>
              <span class="hidden sm:block text-sm leading-5 font-semibold">
                Удалить все
              </span>
            </button>
            <button
              class="flex gap-2.5 items-center p-2 sm:p-4 pl-0 hover:text-(--Brand-700) transition-colors cursor-pointer">
              <WrapIcon>
                <CompareIconShare />
              </WrapIcon>
              <span class="hidden sm:block text-sm leading-5 font-semibold">
                Поделиться
              </span>
            </button>
          </div>

        </div>

        <CompareTabs @handle-click="(i) => toggleActive(i)" @click-on-cross="deleteProducts" :items="categoryProducts"
          class="mb-6" />

        <CompareSlider :items="allProducts" />

      </SectionContainer>
    </Section>

    <Section class="pt-10">
      <SectionContainer>

        <div class="flex flex-wrap gap-2.5 justify-between items-center mb-5 sm:mb-8">
          <h2 class="text-[20px] leading-8 sm:text-[24px] sm:leading-8 text-gray-950 font-['Russo_One']">
            Сравнение характеристик
          </h2>
          <USwitch v-model="isDifference" label="Показать различия" />
        </div>

        <CompareAccordion />
      </SectionContainer>
    </Section>

  </main>

  <Footer />

</template>