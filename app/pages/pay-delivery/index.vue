c
<script setup lang="ts">


</script>

<template>

  <Header />

  <main class="pt-8">

    <Section>
      <SectionContainer>

        <div class="flex flex-col-reverse lg:flex-row gap-8">

          <div class="max-[590px] w-full">

            <TitleMain tag="h1" class="mb-6 hidden lg:block">
              Оплата и доставка
            </TitleMain>

            <TextWork class="mb-10">
              Не ограничивайтесь географией –– мы осуществляем доставку оборудования своим автотранспортом или курьерами
              по Тюмени и Тюменской области, а также по регионам России через удобные для Вас транспортные компании.
            </TextWork>

            <div class="grid gap-1 mb-6">
              <p class="font-medium">
                Доставка по Тюмени и до транспортной
              </p>
              <TextWork class="text-gray-950 font-bold!" tag="b">
                1 день для товаров в наличии
              </TextWork>
            </div>

            <div class="grid gap-1">
              <p class="font-medium">
                Доставка по всей России
              </p>
              <TextWork class="text-gray-950 font-bold!" tag="b">
                Проверенными транспортными компаниями
              </TextWork>
            </div>

          </div>

          <div class="lg:max-w-[590px] w-full">
            <TitleMain tag="h1" class="mb-6 lg:hidden">
              Оплата и доставка
            </TitleMain>
            <img class="w-full lg: max-hfull" src="/image/payment-Image.jpg" alt="Car">
          </div>

        </div>

      </SectionContainer>
    </Section>

    <Section>
      <SectionContainer>

        <Title2 class="mb-10">
          Способы оплаты
        </Title2>

        <PaymentTabs />

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
