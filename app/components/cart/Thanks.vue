<script lang="ts" setup>

const emit = defineEmits(['closeThanks'])
function goBack() {
  emit('closeThanks')
}
</script>


<template>
  <div class="fixed inset-0 sm:top-[73px] lg:top-[178px] z-101 lg:flex items-center justify-center bg-white">
    <SectionContainer>
      <div class="grid gap-6">

        <div class="lg:hidden py-6 border-b border-gray-300">
          <button @click="goBack" class="flex items-center gap-2">
            <WrapIcon class="w-9 h-9">
              <CartIconArrowBack />
            </WrapIcon>
            <p class="text-[24px] leading-8 font-['Russo_One'] text-black">
              На главную
            </p>
          </button>
        </div>

        <div class="grid gap-6 lg:max-w-[600px] sm:p-6">
          <div class="grid gap-4">
            <img src="/image/check-in-round.svg" alt="Thanks">
            <h2 class="text-[24px] leading-8 text-gray-950 font-['Russo_One']">Спасибо за заказ </h2>
          </div>
          <b class="text-gray-950 font-bold">
            Заказ №1231231239123 на сумму 1 454 ₽ создан и принят в обработку.
          </b>
          <p class="text-gray-950">
            Оповещения о готовности заказа и важных изменениях вы будете получать в СМС или пуш-уведомлениях на номер
            <b>+7
              (999) 999-99-99</b> и по электронной почте <b>mail@mail.ru</b>. Статус оформление заказа, его детали и
            оплата
            доступны в
            личном кабинете.
          </p>

          <div class="grid gap-4 bg-gray-100 rounded-xl p-6">
            <p class="text-[20px] leading-[30px] font-bold text-gray-950">
              Уже оформляем счет
            </p>
            <p class="text-gray-950">
              Через 5 минут пришем его в личный кабинет и отправим на почту. Срок действия счета — 3 дня. Когда поступит
              оплата, начнем собирать заказ.
            </p>
            <p class="font-semibold text-gray-950">
              Если у вас договор постоплаты, не забудьте подтвердить заказ в личном кабинете.
            </p>

            <UButton @click="goBack" class="w-fit min-h-9" size="lg" type="submit">
              Перейти к заказу
            </UButton>
          </div>

        </div>

      </div>
    </SectionContainer>
  </div>
</template>