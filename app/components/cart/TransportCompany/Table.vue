<script setup lang="ts">

</script>

<template>
  <table>
    <thead class="flex gap-6 p-4 text-left">
      <th class="max-w-[400px] w-full text-sm leading-5 font-medium">
        Способ доставки
      </th>
      <th>
        <CartTransportCompanyTooltip class="w-full" title="Стоимость доставки" message="В стоимость не включена доставка до транспортной компании" />
      </th>
      <th>
        <CartTransportCompanyTooltip class="w-full" title="Сроки доставки" message="В стоимость не включены сроки доставки" />
      </th>
    </thead>
  </table>
</template>