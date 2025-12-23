c
<script setup lang="ts">
const openStates = ref([true])

</script>

<template>

  <Header />

  <Breadcrumbs />

  <main>

    <Section>
      <SectionContainer>

        <div class="flex flex-col-reverse lg:flex-row gap-8">

          <div class="max-[590px] w-full">

            <TitleMain tag="h1" class="mb-6 hidden lg:block">
              Сервис и гарантия
            </TitleMain>

            <div class="grid gap-6 mb-12">
              <TextWork>
                На товары, купленные в магазинах «Спецов», предоставляем гарантию от производителя. Со многими из них мы
                заключили договор и являемся авторизованным сервисным центром этих брендов — то есть сами проводим
                сервисное и гарантийное обслуживание техники.
              </TextWork>
              <TextWork>
                У всех брендов, с которыми мы не заключали такой договор, есть собственные авторизованные центры, в
                которые можно обратиться по поводу сервисного и гарантийного обслуживания.
              </TextWork>
            </div>


            <ServiceCard />

          </div>

          <div class="lg:max-w-[590px] w-full">
            <TitleMain tag="div" class="mb-6 lg:hidden">
              Сервис и гарантия
            </TitleMain>
            <img class="hidden lg:block" src="/image/service-Image.jpg" alt="Service">
            <img class="hidden sm:block lg:hidden" src="/image/service-Image-medium.jpg" alt="Service">
            <img class="sm:hidden rounded-xl" src="/image/service-Image-small.jpg" alt="Service">
          </div>

        </div>

      </SectionContainer>
    </Section>

    <Section>
      <SectionContainer>

        <Title2 class="mb-8">
          Как сдать оборудование или инструмент по гарантии
        </Title2>

        <ServiceCards />

      </SectionContainer>
    </Section>

    <Section>
      <SectionContainer>
        <Title2 class="mb-8">
          Частые вопросы
        </Title2>
        <ServiceAccordion>
          <ServiceAccordionItem v-model="openStates[0]"
            title="Что мне понадобится для обращения по гарантийному обслуживанию?">
            <div class="grid gap-6">
              <p>
                Для обращения по гарантийному обслуживанию нужно принести в сервисный центр:
              </p>
              <ul class="list-disc pl-5">
                <li>
                  товар со всеми комплектующими;
                </li>
                <li>
                  заполненный гарантийный талон;
                </li>
                <li>
                  документ, который подтверждает покупку — это может быть чек или универсальный передаточный документ, УПД
                </li>
                <li>
                  заполненное заявление на гарантийное обслуживание.
                </li>
              </ul>
            </div>
          </ServiceAccordionItem>
          <ServiceAccordionItem v-model="openStates[1]" title="В каких случаях прекращается действие гарантии?">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, natus aspernatur modi, consequatur, alias porro ipsum dolor corrupti unde voluptatibus ratione soluta. Voluptatibus a doloremque libero optio maxime? Animi, beatae.
            </p>
          </ServiceAccordionItem>
          <ServiceAccordionItem v-model="openStates[2]" title="Что такое авторизованный сервисный центр?">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, natus aspernatur modi, consequatur, alias porro ipsum dolor corrupti unde voluptatibus ratione soluta. Voluptatibus a doloremque libero optio maxime? Animi, beatae.
            </p>
          </ServiceAccordionItem>
          <ServiceAccordionItem v-model="openStates[3]" title="Как вы обслуживаете инструменты брендов, для которых не являетесь авторизованным центром?">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, natus aspernatur modi, consequatur, alias porro ipsum dolor corrupti unde voluptatibus ratione soluta. Voluptatibus a doloremque libero optio maxime? Animi, beatae.
            </p>
          </ServiceAccordionItem>
          <ServiceAccordionItem v-model="openStates[4]" title="Если я отдам инструмент в ремонт, как долго мне ждать?">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, natus aspernatur modi, consequatur, alias porro ipsum dolor corrupti unde voluptatibus ratione soluta. Voluptatibus a doloremque libero optio maxime? Animi, beatae.
            </p>
          </ServiceAccordionItem>
          <ServiceAccordionItem v-model="openStates[5]" title="Как я могу продлить срок службы инструмента?">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, natus aspernatur modi, consequatur, alias porro ipsum dolor corrupti unde voluptatibus ratione soluta. Voluptatibus a doloremque libero optio maxime? Animi, beatae.
            </p>
          </ServiceAccordionItem>
          <ServiceAccordionItem v-model="openStates[6]" title="Что такое диагностика и когда ее проводят? ">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, natus aspernatur modi, consequatur, alias porro ipsum dolor corrupti unde voluptatibus ratione soluta. Voluptatibus a doloremque libero optio maxime? Animi, beatae.
            </p>
          </ServiceAccordionItem>
        </ServiceAccordion>
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
