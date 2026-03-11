import { type Picture } from "./picture";
import type { ProductCatPublicList } from "./productCat";
import { type ProductDetailCertificate } from "./productCertificate";
import type { ProductReview, ProductReviewAgg } from "./productReview";
import type { StorePublicList } from "./store";

export interface ProductImage {
	src: string
	alt: string
}

export interface ProductCard {
	id: number;
	name: string;
	name_lat: string;
	code_1c: string;
	price: number
	old_price?: number
	discount?: number
	char?: ProductChar; //characteristic
	imgs?: Picture[];
	dsc?: string;
	quant?: number;
	quant_descr?: ProductQuantDescr;
	available: boolean;
	filters_display: ProductFilter[];
	categories: {
		id: number;
		name: string;
		name_lat: string;
	}[]
}

export interface ProductCatParent {
	id: number;
	name: string;
	name_lat: string;
}

export interface CharDetail {
	char?: ProductChar;
	quant: number;
	price: number;
}

export type ProductQuantDescr = "many" | "few" | "none";

export interface StockDetail  {
	store_id: number;
	char?: ProductChar;
	quant?: number
	quant_descr: ProductQuantDescr;
	price: number;
}

export interface StockTotal  {
	store_id: number;
	quant?: number
	quant_descr: ProductQuantDescr;
}

export interface ProductDetailDynamic {
	comment_count: number;
	rating: number;
	stock: StockDetail[];
	stock_total: StockTotal[];
}

type ProductFilterDataType = "t_text" | "t_bool" | "t_list" | "t_number";

export interface ProductFilter {
	id: number;
	label: string;
	value: string;
	data_type: ProductFilterDataType;
}

export interface ProductDetailStatic {
	id: number;
	name: string;
	name_lat: string;
	measure_unit: string;
	artikul: string;
	name_full: string;
	code_1c: string;
	brand?: string;
	producer?: string;
	description?: string;
	country?: string;
	product_cat_path: ProductCatParent[];
	pictures?: Picture[];
	certificates?: ProductDetailCertificate[];
	filters: ProductFilter[];
}

export interface ProductChar  {
	id: number;
	name: string;
	name_lat: string;
}

export interface ProductForCart  {
	id: number;
	name: string;
	name_lat: string;
	code_1c: string;
	char?: ProductChar;
	quant: number;
	price: number;
	amount: number;
	picture?: Picture;
}

export interface ProductDetailReview {
	data: ProductReview[];
	agg: ProductReviewAgg;
}

export interface ProductDetailPage {
	product: ProductDetailStatic;
	product_live?: ProductDetailDynamic;
	stores: StorePublicList[];
	related: ProductCard[];
	similar: ProductCard[];
	last_viewed: ProductCard[];
	reviews: ProductDetailReview;
}


export interface SearchResult {
	products: ProductCard[];
	categories: ProductCatPublicList[];
}

export interface PageAnonUserProducts {
	id: number;
	char_id: number;
}

export interface ProductDimension {
	label: string
	isActive: boolean
}