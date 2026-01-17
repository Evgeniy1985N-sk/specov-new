import { defineStore } from "pinia";
interface address {
  label: string;
  coords: number[];
  isActive: boolean;
}
interface Company {
  img: string;
  label: string;
  dsc?: string;
  message?: string;
  price?: number;
  delivery?: string;
  isActive: boolean;
  address?: address[];
}

export const useCompanyStore = defineStore("company", () => {
  const company = ref<Company[]>([
    {
      label: "Почта России",
      isActive: false,
      img: "/image/company/img-1.png",
      price: 432,
      delivery: "Уточнит менеджер при подтверждении заказа",
      address: [
        {
          label: "Нагорный б-р, 5, корп. 2, пом. 4",
          coords: [55.6705, 37.6095],
          isActive: false,
        },
        {
          label: "Нагорный б-р, 7",
          coords: [55.6708, 37.61], // ~50 м на северо-восток
          isActive: false,
        },
        {
          label: "Нагорный б-р, 3",
          coords: [55.6702, 37.609], // ~50 м на юго-запад
          isActive: false,
        },
        {
          label: "ул. Нагорная, 12",
          coords: [55.6712, 37.6085], // ~100 м на северо-запад
          isActive: false,
        },
        {
          label: "Нагорный пр-д, 1",
          coords: [55.6698, 37.6105], // ~100 м на юго-восток
          isActive: false,
        },
        {
          label: "Нагорный б-р, 5, пом. 4",
          coords: [55.6705, 37.6095], // дубль — можно оставить или убрать
          isActive: false,
        },
      ],
    },
    {
      label: "СДЭК ПВЗ",
      isActive: false,
      img: "/image/company/img-2.png",
      dsc: "Магистральный экспресс склад-склад ",
      message:
        "способ доставки, при котором отправитель сам приносит посылку в пункт приёма транспортной компании",
      price: 1074,
      delivery: "2 дня",
       address: [
        {
          label: "Нагорный б-р, 5, корп. 2, пом. 4",
          coords: [55.6701, 37.6095],
          isActive: false,
        },
        {
          label: "Нагорный б-р, 3",
          coords: [55.6702, 37.609],
          isActive: false,
        },
        {
          label: "ул. Нагорная, 12",
          coords: [55.6719, 37.6085],
          isActive: false,
        },
        {
          label: "Нагорный пр-д, 1",
          coords: [55.6690, 37.6105],
          isActive: false,
        },
      ],
    },
    {
      label: "СДЭК Курьерская доставка",
      isActive: false,
      img: "/image/company/img-2.png",
      dsc: "Посылка склад-дверь ",
      message:
        "способ доставки, при котором отправитель сам приносит посылку в пункт приёма транспортной компании",
      price: 510,
      delivery: "2 дня",
    },
    {
      label: "Другая транспортная компания",
      isActive: false,
      img: "/image/company/img-3.png",
      delivery: "Уточнит менеджер при подтверждении заказа",
    },
  ]);
  function toggleActiveCompany(index: number) {
    company.value = company.value.map((item, i) => ({
      ...item,
      isActive: i === index,
    }));
  }

  function toggleActiveAddress(index: number) {
    const activeCompany = company.value.find((item) => item.isActive);

    if (!activeCompany || !activeCompany.address) return;

    company.value = company.value.map((item) => {
      if (item === activeCompany) {
        return {
          ...item,
          address: item.address!.map((addr, i) => ({
            ...addr,
            isActive: i === index,
          })),
        };
      }
      return item;
    });
  }
  return {
    company,
    toggleActiveCompany,
    toggleActiveAddress,
  };
});
