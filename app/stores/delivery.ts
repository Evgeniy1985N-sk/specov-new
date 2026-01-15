import { defineStore } from "pinia";

interface Address {
  label: string;
  isActive: boolean;
}

export const useDeliveryStore = defineStore("address", () => {
  const address = ref<Address[]>([
    {
      label: "Московская область, Пушкино, Ярославское шоссе, 218",
      isActive: false,
    },
    {
      label: "Московская область, Пушкино, Ярославское шоссе, 216",
      isActive: false,
    },
    { label: "Москва, 2-я Мелитопольская улица, 12Ас1", isActive: false },
    {
      label: "Московская область, Жуковский, район Замоскворечье, 92",
      isActive: false,
    },
    { label: "Москва, проспект Мира, 119с23", isActive: false },
  ]);
  function toggleActiveAddress(items: Address[], index: number) {
    address.value = items.map((item, i) => ({
      ...item,
      isActive: i === index,
    }));
  }

  return {
    address,
    toggleActiveAddress,
  };
});
