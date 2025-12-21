<script setup lang="ts">
import { useProductsStore } from '@/stores/products'

const isShowPopup = ref(true)

const items = useProductsStore().allProducts
const activeTab = ref(0)


interface Item {
  isActive: boolean
  name: string
  counter: number
}

const itemsTabs = ref<Item[]>([
  {
    isActive: true,
    name: 'Все категории',
    counter: 3
  },
  {
    isActive: false,
    name: 'Газонокосилки',
    counter: 1
  },
  {
    isActive: false,
    name: 'Перфораторы',
    counter: 1
  },
  {
    isActive: false,
    name: 'Плиткорезы',
    counter: 1
  },
])

watch(activeTab, (newVal) => {
    itemsTabs.value = itemsTabs.value.map((item, i) => ({
    ...item,
    isActive: i === newVal
  }));
})



</script>

<template>

  <Header />

  <main>

    <Section class="mt-6! overflow-visible">
      <SectionContainer>

        <FavoritePopup v-if="isShowPopup" @close-popup="isShowPopup = false" class="mb-6" date="12.01.2026" />

        <div class="flex gap-8 flex-col lg:flex-row">

          <!-- ASIDE -->
          <aside
            class="w-full lg:max-w-[280px]">

            <TitleGoods class="mb-6" title="Избранное" />

            <div class="lg:p-4 lg:bg-gray-100 rounded-lg w-full">
              <FavoriteSliderTabs @handle-click="(index) => activeTab = index" :items="itemsTabs" />
            </div>

          </aside>
          <!-- ASIDE -->


          <div class="w-full">

            <!-- Cards -->
            <div
              class="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-8">
              <ProductCard v-for="item in items" :item="item" :key="item.id" />
            </div>
            <!-- Cards -->

          </div>

        </div>

      </SectionContainer>
    </Section>

  </main>

  <Footer />

</template>