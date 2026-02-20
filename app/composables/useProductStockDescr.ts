import type { ProductQuantDescr } from '@/types/product';

export const useProductStockDescr = () => {

  const stockDescr = (quant: ProductQuantDescr): string => {
	let res = "";
	switch (quant) {
		case "few":
			res = "Мало";
			break;
		case "many":
			res = "Много";
			break;

		default:
			res = "Нет";
			break;
	}
    return res;
  }

  return { stockDescr };
}


