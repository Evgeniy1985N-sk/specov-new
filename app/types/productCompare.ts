import type { ProductCard, ProductChar, ProductQuantDescr } from "./product";

export interface ProductForCompare  {
	id: number;
	name: string;
	name_lat: string;
	code_1c: string;
	char?: ProductChar;
}

export interface ProductUpdateCompare {
	product_id: number;
	char_id?: number;
}

export interface ProductCompareAttrs  {
	country: string;
	brand?: string,
	rating: number;
	review_count: number;
	quant_descr: ProductQuantDescr;
	store_ids: number[];
	stores: {id: number, name: string}[];
}

export type ProductCompareSet = (ProductCard & ProductCompareAttrs);

export interface ProductComparePage  {
	products: ProductCompareSet[];
}

export type CompareGroup = {
	categoryId: number;
	category: string;
	items: ProductCompareSet[];
};

