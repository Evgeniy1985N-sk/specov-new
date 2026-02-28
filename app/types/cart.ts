import type { ProductForCart } from "./product";

//CartItem is for queries
export interface CartItem {
	cart_name: string;
	product_id: number;
	char_id?: number;
	quantity: number;
	price: number;
}

export interface Cart {
	name: string;
	created_at: Date;
	products: ProductForCart[];
}
