// import type { Picture } from "./picture";
import type { ProductCard, ProductChar } from "./product";

export interface ProductForLike  {
	id: number;
	name: string;
	name_lat: string;
	code_1c: string;
	char?: ProductChar;
	// price: number;
	// picture: Picture;
}

export interface ProductUpdateLike {
	product_id: number;
	char_id?: number;
}

export interface ProductLikePage  {
	products: ProductCard[];
	categories: {
		id: number;
		name: string;
		name_lat: string;
		count: number;
	}[];
}

