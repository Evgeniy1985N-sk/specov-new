<script setup lang="ts">
import { useProductsStore } from '@/stores/products'

const popularProducts = useProductsStore().popular
const buildingProducts = useProductsStore().building
const gardenProducts = useProductsStore().garden

</script>


<template>
  <div class="overflow-hidden bg-white">

    <Header />

    <main>
      <CategoryAdv />
      <CategoryCards />
      <Banner />

      <Section>
        <SectionContainer>
          <SectionHeader>
            <SectionTitle text="Популярные товары" />
            <SectionButton text="Смотреть всё" path="/" />
          </SectionHeader>

          <ProductSlider :items="popularProducts" />

        </SectionContainer>
      </Section>

      <Section>
        <SectionContainer>
          <SectionHeader>
            <SectionTitle text="Для стройки" />
            <SectionButton text="Смотреть всё" path="/" />
          </SectionHeader>

          <ProductSlider :items="buildingProducts" />

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

      <Section>
        <SectionContainer>
          <SectionHeader>
            <SectionTitle text="Для сада" />
            <SectionButton text="Смотреть всё" path="/" />
          </SectionHeader>

          <ProductSlider :items="gardenProducts" />

        </SectionContainer>
      </Section>

      <Feedback />

      <Section>
        <SectionContainer>
          <Stores />
        </SectionContainer>
      </Section>

    </main>

    <Footer />

  </div>
</template>