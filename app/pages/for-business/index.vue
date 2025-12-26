<script setup lang="ts">


</script>

<template>

  <Header />

  <Breadcrumbs />

  <main>

    <Section>
      <SectionContainer>

        <div class="flex justify-between flex-wrap md:flex-nowrap gap-6 mb-10 items-start">
          <Title2 tag="h1">
            Покупайте как юрлицо
          </Title2>
          <BusinessRegist class="shrink-0" />
        </div>



        <!-- !!!!! REMOVE FOR EXAMPLE !!!!! -->
        <div class="flex flex-col items-end gap-6">
          <!-- <BusinessRegist2 />
          <BusinessRegist3 />
          <BusinessRegist4 /> -->
        </div>
        <!-- !!!!! REMOVE FOR EXAMPLE !!!!! -->

        

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
