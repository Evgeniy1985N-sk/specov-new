import { defineStore } from "pinia";

interface Company {
  img: string;
  label: string;
  dsc?: string;
  message?: string;
  price?: number;
  delivery?: string;
  isActive: boolean;
}

export const useCompanyStore = defineStore("company", () => {
  const company = ref<Company[]>([
    {
      label: "Почта России",
      isActive: false,
      img: "/image/company/img-1.png",
      price: 432,
      delivery: "Уточнит менеджер при подтверждении заказа",
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

  return {
    company,
    toggleActiveCompany,
  };
});
