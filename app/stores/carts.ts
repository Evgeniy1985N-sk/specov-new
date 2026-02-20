import { defineStore } from "pinia";
import { ref } from "vue";
import type { ProductForCart, ProductDetailStatic, StockDetail, ProductChar } from "@/types/product";
import type { Picture } from "~/types/picture";

export interface ShopCart {
	id: string;
	name: string;
	createdAt: Date;
	products: ProductForCart[];
}

//multiple carts
export const useCartsStore = defineStore('carts', () => {
		// JSON.parse(localStorage.getItem('carts') || '[]'),
	const carts = ref<Cart[]>([]);

	const saveCarts = () => {
		//sabe to db
		// localStorage.setItem('carts', JSON.stringify(carts.value));
	};

	const createCart = () => {
		const newIndex = carts.value.length + 1;
		const newCart: Cart = {
			id: crypto.randomUUID(),
			name: `Корзина ${newIndex}`,
			createdAt: new Date(),
			products: [],
		};
		carts.value.push(newCart);
		saveCarts();
	};

	const productInCart = (
		id: number,
		charId?: number,
	): ProductForCart | undefined => {
		return carts.value
			.flatMap((cart:ShopCart) => cart.products)
			.find(
				(product:ProductForCart) =>
					product.id === id &&
					(charId === undefined ||
						product.char?.id === charId),
			);
	};

	const isProductsInCart = computed(() =>
		carts.value.some((cart:ShopCart) => cart.products.length > 0),
	);

	const totalAmount = (cartIndex: number) => {
		return (
			carts.value[cartIndex]?.products.reduce(
				(amount:number, product: ProductForCart) =>
					amount + product.amount,
				0,
			) ?? 0
		);
	};

	//total quantity of producs in all carts
	const totalProductsAddedToCart = computed(() => {
		return carts.value.reduce((totalQuantity: number, cart: ShopCart) => {
			return (
				totalQuantity +
				cart.products.reduce(
					(cartTotal:number, product: ProductForCart) => cartTotal + product.quant,
					0,
				)
			);
		}, 0);
	});

	const addToCart = (
		cartIndex: number, 
		product: {
			id: number, 
			name: string,
			name_lat: string,
		}, 
		stock: {
			char?: ProductChar,
			price: number,
		},
		img?: Picture
	) => {
		const prodForCart = <ProductForCart>{
			id: product.id,
			name: product.name,
			name_lat: product.name_lat,
			char: stock?.char,
			quant: 1,
			price: stock?.price ?? 0,
			amount: (stock?.price ?? 0) * 1,
			picture: img,
		};
		carts.value[cartIndex]?.products.push(prodForCart);
		saveCarts();
	};

	const incrementQuantityInFirst = (
		productId: number,
		productCharId?: number,
	) => {
		const cart = carts.value.find((cart: ShopCart) =>
			cart.products.some(
				(p) =>
					p.id === productId &&
					(productCharId === undefined ||
						p.char?.id === productCharId),
			),
		);
		if (!cart) return;

		const product = cart.products.find(
			(p: ProductForCart) =>
				p.id === productId &&
				(productCharId === undefined ||
					p.char?.id === productCharId),
		);
		if (product) product.quant++;
		saveCarts();
	};

	const incrementQuantity = (
		cartIndex: number,
		productId: number,
		productCharId?: number,
	) => {
		const product = carts.value[cartIndex]?.products.find(
			(p: ProductForCart) =>
				p.id === productId &&
				(productCharId === undefined ||
					p.char?.id === productCharId),
		);
		if (product) product.quant++;
		saveCarts();
	};

	const decrementQuantityInFirst = (
		productId: number,
		productCharId?: number,
	) => {
		const cart = carts.value.find((cart: ShopCart) =>
			cart.products.some(
				(p: ProductForCart) =>
					p.id === productId &&
					(productCharId === undefined ||
						p.char?.id === productCharId),
			),
		);
		if (!cart) return;

		const productIndex = cart.products.findIndex(
			(p: ProductForCart) =>
				p.id === productId &&
				(productCharId === undefined ||
					p.char?.id === productCharId),
		);
		if (productIndex === -1) return;

		if (cart.products[productIndex].quant> 1) {
			cart.products[productIndex].quant--;
		} else {
			cart.products.splice(productIndex, 1);
		}
		saveCarts();
	};

	const decrementQuantity = (
		cartIndex: number,
		productId: number,
		productCharId?: number,
	) => {
		const cart = carts.value[cartIndex];
		if (!cart) return;

		const productIndex = cart.products.findIndex(
			(p: ProductForCart) =>
				p.id === productId &&
				(productCharId === undefined ||
					p.char?.id === productCharId),
		);
		if (productIndex === -1) return;

		if (cart.products[productIndex].quant> 1) {
			cart.products[productIndex].quant--;
		} else {
			cart.products.splice(productIndex, 1);
		}
		saveCarts();
	};

	const removeProductFromCart = (
		cartIndex: number,
		productId: number,
		productCharId?: number,
	) => {
		carts.value[cartIndex].products = carts.value[
			cartIndex
		].products.filter(
			(product: ProductForCart) =>
				product.id !== productId ||
				(productCharId !== undefined &&
					product.char?.id !== productCharId),
		);
		saveCarts();
	};

	const clearCart = (cartIndex: number) => {
		carts.value[cartIndex].products = [];
		saveCarts();
	};

	const productCartQuantity = (
		productId: number,
		productCharId?: number,
	): number => {
		return carts.value.reduce((total: number, cart: ShopCart) => {
			return (
				total +
				cart.products
					.filter(
						(p) =>
							p.id === productId &&
							(productCharId === undefined ||
								p.char?.id === productCharId),
					)
					.reduce((sum, p) => sum + p.quant, 0)
			);
		}, 0);
	};

	const setQuantityInFirst = (
		product: {
			id: number;
			name: string;
			name_lat: string;
		},
		quant: number,
		stock?: {
			char?: ProductChar;
			price: number;
		},
		img?: Picture,
	) => {
		let cart = carts.value.find((cart: ShopCart) =>
			cart.products.some(
				(p: ProductForCart) =>
					p.id === product.id &&
					(stock?.char?.id === undefined ||
						p.char?.id === stock.char.id),
			),
		);

		if (!cart) {
			if (quant<= 0) return;
			if (carts.value.length === 0) createCart();
			cart = carts.value[0];
		}

		const productIndex = cart.products.findIndex(
			(p: ProductForCart) =>
				p.id === product.id &&
				(stock?.char?.id === undefined ||
					p.char?.id === stock.char.id),
		);

		if (productIndex !== -1) {
			if (quant<= 0) {
				cart.products.splice(productIndex, 1);
			} else {
				const p = cart.products[productIndex];
				p.quant = quant;
				p.amount = p.price * quant;
			}
		} else if (quant> 0) {
			cart.products.push({
				id: product.id,
				name: product.name,
				name_lat: product.name_lat,
				char: stock?.char,
				quant: quant,
				price: stock?.price ?? 0,
				amount: (stock?.price ?? 0) * quant,
				picture: img,
			} as ProductForCart);
		}

		saveCarts();
	};

	watch(
		carts,
		() => {
			saveCarts();
		},
		{ deep: true },
	);

	return {
		carts,
		createCart,
		productInCart,
		isProductsInCart,
		totalAmount,
		totalProductsAddedToCart,
		addToCart,
		incrementQuantity,
		incrementQuantityInFirst,
		decrementQuantity,
		decrementQuantityInFirst,
		removeProductFromCart,
		clearCart,
		productCartQuantity,
		setQuantityInFirst,
	};
});
