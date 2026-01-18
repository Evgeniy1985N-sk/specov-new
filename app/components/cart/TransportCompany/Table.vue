<script setup lang="ts">
const companyStore = useCompanyStore()
const toggleActiveCompany = companyStore.toggleActiveCompany
const company = computed(() => {
  return companyStore.company
})

</script>

<template>
  <table class="overflow-hidden">

    <thead>
      <tr class="hidden lg:grid grid-cols-[400px_1fr_1fr] gap-6 p-4 pt-0 text-left">
        <th class="max-w-[400px] w-full text-sm leading-5 font-medium">
          Способ доставки
        </th>
        <th class="max-w-[172px] w-full">
          <CartTransportCompanyTooltip class="w-full" title="Стоимость доставки"
            message="В стоимость не включена доставка до транспортной компании" />
        </th>
        <th class="max-w-[190px] w-full">
          <CartTransportCompanyTooltip class="w-full" title="Сроки доставки"
            message="В стоимость не включены сроки доставки" />
        </th>
      </tr>
    </thead>

    <tbody class="grid gap-2">

      <tr v-for="(item, index) in company" @click="toggleActiveCompany(index)" :class="{ 'active': item.isActive }"
        class="item-custom relative grid grid-cols-[400px_1fr_1fr] gap-6 items-center p-4 text-left bg-gray-100 rounded-xl cursor-pointer">

        <td class="flex gap-4 items-center lg:pl-8">
          <img :src="item.img" :alt="item.label">

          <div class="flex flex-col items-center lg:grid">
            <p class="font-semibold text-gray-950">
              {{ item.label }}
            </p>
            <span v-if="item.dsc && item.message">
              <CartTransportCompanyTooltip class="font-medium text-xs leading-[18px]" :title="item.dsc"
                class-title="font-medium text-xs leading-[18px]" :message="item.message" />
            </span>
          </div>

        </td>

        <td>
          <p v-if="item.price" class="font-semibold text-gray-950">
            {{ item.price.toLocaleString('ru-RU') }} ₽
          </p>
          <p v-else class="text-sm leading-5 text-gray-700 text-center md:text-left">
            Уточнит менеджер при подтверждении заказа
          </p>
        </td>

        <td class="text-sm leading-5 text-gray-700">
          <p v-if="item.delivery">
            {{ item.delivery }}
          </p>
          <p v-else class="text-sm leading-5 text-gray-700 text-center md:text-left">
            Уточнит менеджер при подтверждении заказа
          </p>
        </td>

      </tr>

    </tbody>

    <tfooter>
      <tr>
        <td class="flex gap-2 pt-4">
          <WrapIcon>
            <CartIconMarkInCircle />
          </WrapIcon>
          <p class="text-sm leading-5 font-medium">
            Стоимость доставки может быть изменена в случае смены расценок транспортных компаний или при заказе
            дополнительных услуг (страховка, паллетирование и др.). У некоторых транспортных компаний доставка
            оплачивается частично при получении товара. Подробности вам сообщит менеджер. Сроки доставки указаны на
            основе данных транспортных компаний и в зависимости от даты оплаты они могут сдвигаться.
          </p>
        </td>
      </tr>
    </tfooter>

  </table>

</template>

<style scoped>
.item-custom:before {
  content: '';
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 16px;
  width: 20px;
  height: 20px;
  border: 1px solid #e5e7eb;
  border-radius: 50%;
  flex-shrink: 0;
  background: #fff;
}

.item-custom.active:before {
  border: 6px solid var(--Brand-600);
}
@media (max-width: 1023px) {
  .item-custom {
    grid-template-columns: 1fr;
    padding-top: 50px;
  }
  .item-custom:before {
    top: 16px;
    left: 50%;
    transform: translateX(-50%);
  }
  .item-custom td:before {
    font-size: 16px;
    line-height: 21px;
  }
  .item-custom td {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .item-custom td:nth-child(1):before {
    content: 'Способ доставки:';
  }
  .item-custom td:nth-child(2):before {
    content: 'Стоимость доставки:';
  }
  .item-custom td:nth-child(3):before {
    content: 'Сроки доставки:';
  }
}
</style>