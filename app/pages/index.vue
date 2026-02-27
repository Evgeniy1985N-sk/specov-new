<script setup lang="ts">
import { useProductGroupApi } from '@/composables/api/useProductGroupApi';
import { useProductCatApi } from '@/composables/api/useProductCatApi';
import { type ProductGroupPublicList } from "@/types/productGroup";

const { publicList: prodGroupList } = useProductGroupApi()
const { mainCategories } = useProductCatApi()

// const { data, pending, error } = await useAsyncData(
//   'productGroups',
//   () => prodGroupList(),
// );
//
// const { data: mainCatsData } = await useAsyncData(
//   'mainCategories',
//   () => mainCategories(),
// );
const { data, pending, error } = await useAsyncData(
	'productGroupsAndCategories',
	async () => {
		const [groups, categories] = await Promise.all([
			prodGroupList(),
			mainCategories(),
		]);

		return {
			groups,
			categories,
		};
	}
);

const popularProducts = computed( () => (data.value?.groups as ProductGroupPublicList[])?.find((item) => item.id == 1) );
const buildingProducts = computed( () => (data.value?.groups as ProductGroupPublicList[])?.find((item) => item.id == 2) );
const gardenProducts = computed( () => (data.value?.groups as ProductGroupPublicList[])?.find((item) => item.id == 3) );

provide('mainCatsData', data.value?.categories );

</script>


<template>
  <div class="overflow-hidden bg-white">

    <Header />

    <main>
      <CategoryAdv />
      <CategoryCards />
      <Banner />

      <Section v-if="!pending && !error && popularProducts">
        <SectionContainer>
          <SectionHeader>
            <SectionTitle text="Популярные товары" />
            <SectionButton text="Смотреть всё" path="/" />
          </SectionHeader>

          <ProductSlider :items="popularProducts.products" />

        </SectionContainer>
      </Section>

      <Section v-if="!pending && !error && buildingProducts">
        <SectionContainer>
          <SectionHeader>
            <SectionTitle text="Для стройки" />
            <SectionButton text="Смотреть всё" path="/" />
          </SectionHeader>

          <ProductSlider :items="buildingProducts.products" />

        </SectionContainer>
      </Section>

      <Section>
        <SectionContainer>
          <SectionHeader>
            <SectionTitle text="Популярные бренды" />
            <SectionButton text="Смотреть всё" path="/" />
          </SectionHeader>

          <Brands />

        </SectionContainer>
      </Section>

      <Section v-if="!pending && !error && gardenProducts">
        <SectionContainer>
          <SectionHeader>
            <SectionTitle text="Для сада" />
            <SectionButton text="Смотреть всё" path="/" />
          </SectionHeader>

          <ProductSlider :items="gardenProducts.products" />

        </SectionContainer>
      </Section>

      <Feedback class-custom="mb-0" />

      <Section class="m-0 pt-(--section-indent)">
        <SectionContainer>
          <Stores />
        </SectionContainer>
      </Section>

    </main>

    <Footer />

  </div>
</template>
