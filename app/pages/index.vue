<script setup lang="ts">
//import { useProductGroupApi } from '@/composables/api/useProductGroupApi';
//import { type ProductGroupPublicList } from "@/types/productGroup";

//const { publicList: prodGroupList } = useProductGroupApi()

/*
const { data, pending, error } = await useAsyncData(
	'productGroups',
	async () => prodGroupList()
);

const popularProducts = computed( () => (data.value as ProductGroupPublicList[])?.find((item) => item.id == 1) );
const buildingProducts = computed( () => (data.value as ProductGroupPublicList[])?.find((item) => item.id == 2) );
const gardenProducts = computed( () => (data.value as ProductGroupPublicList[])?.find((item) => item.id == 3) );
*/

</script>


<template>
  <div class="overflow-hidden bg-white">

    <Header />

    <main>
      <CategoryAdv />
      <CategoryCards />
      <Banner />

	  <!--
      <Section >
        <SectionContainer>
          <SectionHeader>
            <SectionTitle text="Популярные товары" />
            <SectionButton text="Смотреть всё" path="/" />
          </SectionHeader>

          <ProductSlider :items="popularProducts?.products" :loading="pending"/>

        </SectionContainer>
      </Section>
	  -->

	  <!--
      <Section >
        <SectionContainer>
          <SectionHeader>
            <SectionTitle text="Для стройки" />
            <SectionButton text="Смотреть всё" path="/" />
          </SectionHeader>

          <ProductSlider :items="buildingProducts?.products" :loading="pending"/>

        </SectionContainer>
      </Section>
	  -->

	  <!--
      <Section>
        <SectionContainer>
          <SectionHeader>
            <SectionTitle text="Популярные бренды" />
            <SectionButton text="Смотреть всё" path="/" />
          </SectionHeader>

          <Brands />

        </SectionContainer>
      </Section>
	  -->

	  <!--
      <Section>
        <SectionContainer>
          <SectionHeader>
            <SectionTitle text="Для сада" />
            <SectionButton text="Смотреть всё" path="/" />
          </SectionHeader>

          <ProductSlider :items="gardenProducts?.products" :loading="pending"/>

        </SectionContainer>
      </Section>
	  -->

	  <!--
      <Feedback class-custom="mb-0" />
	  -->

      <Section class="m-0 pt-(--section-indent)">
        <SectionContainer>
          <Stores />
        </SectionContainer>
      </Section>

    </main>

    <Footer />

  </div>
</template>
