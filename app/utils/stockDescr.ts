import { 
	type ProductQuantDescr, 
	type StockTotal 
} from "@/types/product";

export const quantDescrLocal = (quantDescr: ProductQuantDescr | undefined): string => {
  if (!quantDescr) {
    return "нет";
  }
  
  const translationMap: Record<ProductQuantDescr, string> = {
    "many": "много",
    "few": "мало",
    "none": "нет"
  };
  
  return translationMap[quantDescr] || "нет";
};

export const stockDescr = (
	storeId: number,
	stocks: StockTotal[] | null | undefined
): ProductQuantDescr => {
	const stockDetail = stocks?.find(
		(s: StockTotal) => s.store_id === storeId
	);
	return stockDetail?.quant_descr ?? "none";
}

export const stockDescrLocal = (
  storeId: number, 
  stocks: StockTotal[] | null | undefined
): string => {
	return quantDescrLocal(stockDescr(storeId, stocks));
};
