<script setup lang="ts">
import type { ProductCard } from "~/types/product";

const compareIds = useCompareStore().items
const allProducts = useProductsStore().allProducts
const compareProducts = ref<ProductCard[]>([])
const activeIndex = ref<number | null>(0);

compareIds.forEach((c) => {
  const foundProduct = allProducts.find((item) => item.id == c.id);
  if (foundProduct) {
    compareProducts.value.push(foundProduct)
  }
})

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


const categoryCounts = computed(() => {
  return Object.entries(groupedItems.value).map(([category, items], i) => ({
    category,
    count: items.length,
    isActive: i === activeIndex.value
  }));
});

function toggleActive(index: number) {
  activeIndex.value = index;
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

          <div class="flex gap-6 bg-gray-100 rounded-lg">
            <button
              class="flex gap-2.5 items-center p-4 pr-0 hover:text-(--Brand-700) transition-colors cursor-pointer">
              <WrapIcon>
                <CompareIconTrash />
              </WrapIcon>
              <span class="text-sm leading-5 font-semibold">
                Удалить все
              </span>
            </button>
            <button
              class="flex gap-2.5 items-center p-4 pl-0 hover:text-(--Brand-700) transition-colors cursor-pointer">
              <WrapIcon>
                <CompareIconShare />
              </WrapIcon>
              <span class="text-sm leading-5 font-semibold">
                Поделиться
              </span>
            </button>
          </div>

        </div>

        <CompareTabs @handle-click="(i) => toggleActive(i)" :items="categoryCounts" />

      </SectionContainer>
    </Section>

  </main>

  <Footer />

</template>