c
<script setup lang="ts">
import type { Vacancy } from '~/types/vacancy'

const vacancies: Vacancy[] = [
  {
    id: 1,
    title: 'Продавец-консультант',
    description: 'Ищем энергичного продавца-консультанта. Работа в зале с клиентами: помощь в выборе электроинструмента, консультации по характеристикам, оформление продаж. Подходит для тех, кто любит технику и общение.',
    responsibilities: [
      'Консультирование покупателей по ассортименту электроинструмента',
      'Подбор товара под задачи клиента',
      'Демонстрация возможностей и преимуществ продукции',
      'Оформление продаж и работа с кассой',
      'Поддержание порядка в торговом зале',
    ]
  },
  {
    id: 2,
    title: 'Кладовщик',
    description: 'Нужен ответственный кладовщик для работы на складе. Приём и учёт товара, выдача заказов, поддержание порядка. Важна внимательность и аккуратность, опыт работы со складской техникой будет плюсом.',
    responsibilities: [
      'Приём и размещение товара на складе',
      'Учёт и инвентаризация продукции',
      'Выдача заказов в торговый зал и клиентам',
      'Контроль сохранности и сроков хранения товара',
      'Поддержание порядка и соблюдение техники безопасности',
    ]
  }
]
</script>

<template>

  <Header />

  <Breadcrumbs />

  <main>

    <Section>
      <SectionContainer>


        <TitleMain tag="h1" class="mb-6 hidden lg:block">
          Вакансии
        </TitleMain>

        <img class="rounded-xl" src="/image/vacancy-Image.jpg" alt="Worker">

      </SectionContainer>
    </Section>

    <Section class="mt-10">
      <SectionContainer>

        <VacancyCards />

      </SectionContainer>
    </Section>

    <Section>
      <SectionContainer>

        <Title2 class="mb-8">
          Помогаем в профессиональном развитии
        </Title2>

        <VacancyCards2 />

      </SectionContainer>
    </Section>

    <Section>
      <SectionContainer>
        <Title2 class="mb-8">
          Список вакансий
        </Title2>
        <VacancyList :vacancies="vacancies" />
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
