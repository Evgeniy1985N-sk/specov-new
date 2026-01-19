<script setup lang="ts">


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
            <button class="flex gap-2.5 items-center p-4 pr-0 hover:text-(--Brand-700) transition-colors cursor-pointer">
              <WrapIcon>
                <CompareIconTrash />
              </WrapIcon>
              <span class="text-sm leading-5 font-semibold">
                Удалить все
              </span>
            </button>
            <button class="flex gap-2.5 items-center p-4 pl-0 hover:text-(--Brand-700) transition-colors cursor-pointer">
              <WrapIcon>
                <CompareIconShare />
              </WrapIcon>
              <span class="text-sm leading-5 font-semibold">
                Поделиться
              </span>
            </button>
          </div>

        </div>

        <CompareTabs />

      </SectionContainer>
    </Section>

  </main>

  <Footer />

</template>