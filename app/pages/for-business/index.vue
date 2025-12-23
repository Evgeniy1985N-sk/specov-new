<script setup lang="ts">


</script>

<template>

  <Header />

  <Breadcrumbs />

  <main>

    <Section>
      <SectionContainer>

        <div class="flex justify-between mb-10">
          <Title2 tag="h1">
            Покупайте как юрлицо
          </Title2>
          <BusinessRegist />
        </div>

        <Cards />

      </SectionContainer>
    </Section>

    <Section>
      <SectionContainer>

        <Title2 class="mb-6 sm:mb-10">
          Способы оплаты для юрлиц
        </Title2>

        <Cards2 />

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

</template>
