<script setup lang="ts">


</script>

<template>

  <Header />

  <Breadcrumbs />

  <main>

    <Section>
      <SectionContainer>

        <div class="grid lg:grid-cols-2 gap-8">
          <Title2 tag="h1">
            «Спецов» – лидер в Тюменском регионе по продаже спецодежды, профессионального инструмента и оборудования для
            самых разных направлений промышленности и производства.
          </Title2>
          <div class="grid gap-4 text-[18px] leading-7 font-medium">
            <p>
              Начав работу в 1992 году как маленькая фирма, состоящая всего из нескольких человек, сегодня мы являемся
              крупным, надежным и проверенным партнером для очень многих клиентов, компанией с миллиардным оборотом.
            </p>
            <p>
              Более четверти века мы непрерывно совершенствуем наш бизнес, расширяем ассортимент продукции и клиентскую
              базу, повышаем качество обслуживания и сервис.
            </p>
          </div>
        </div>

      </SectionContainer>
    </Section>

    <AboutSlider />

    <Section>
      <SectionContainer>

        <div class="relative flex justify-between flex-col lg:flex-row gap-6">
          <p class="grid gap-4 text-[18px] leading-7 font-medium">
            Работаем по всей России
          </p>
          <Title2 class="max-w-[800px] " tag="h1">
            География наших поставок охватывает не только Тюменскую область, но и включает в себя всю Россию – от
            Калининграда и Мурманска до Владивостока и Сахалина.
          </Title2>
        </div>

        <div class="-mt-[26px] sm:-mt-[60px] -mx-4 sm:-mx-[90px] lg:mx-0 -mb-[135px] sm:-mb-[193px] lg:-mb-[238px]">
          <img class="hidden sm:block" src="/image/about/Map.svg" alt="Map">
          <img class="sm:hidden w-full" src="/image/about/Map-mob.svg" alt="Map">
        </div>

        <AboutCards />

      </SectionContainer>
    </Section>

    <Section>
      <SectionContainer>

        <Title2 class="mb-10">
          Покупайте как юрлицо или как физлицо
        </Title2>

        <AboutTabs />

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
