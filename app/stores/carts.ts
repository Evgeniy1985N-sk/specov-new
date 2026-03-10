import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type { ProductChar } from "@/types/product";
import type { Picture } from "~/types/picture";
import type { Cart, CartItem } from "~/types/cart";
import type { ProductForCart } from "~/types/product";
import { useCartApi } from "~/composables/api/useCartApi";

type AddProductInput = {
	id: number;
	name: string;
	name_lat: string;
	code_1c: string;
};

type AddStockInput = {
	char?: ProductChar;
	price: number;
};

export const useCartsStore = defineStore("carts", () => {
	const carts = ref<Cart[]>([]);
	const isFetched = ref(false);
	const isFetching = ref(false);

	const api = useCartApi();

	const createCart = (): number => {
		const newIndex = carts.value.length + 1;
		const newCart: Cart = {
			name: `Корзина ${newIndex}`,
			created_at: new Date(),
			products: [],
		};
		carts.value.push(newCart);
		return carts.value.length - 1;
	};

	const ensureCartIndex = (cartIndex: number): number => {
		if (carts.value[cartIndex]) {
			return cartIndex;
		}
		return createCart();
	};

	const findCartWithProduct = (
		productId: number,
		productCharId?: number,
	): {
		cart: Cart;
		cartIndex: number;
		product: ProductForCart;
		productIndex: number;
	} | null => {
		for (let ci = 0; ci < carts.value.length; ci++) {
			const cart = carts.value[ci];
			if (!cart) continue;

			const pi = cart.products.findIndex((p) => {
				if (p.id !== productId) return false;
				if (productCharId === undefined) return true;
				return p.char?.id === productCharId;
			});

			if (pi !== -1) {
				return { cart, cartIndex: ci, product: cart.products[pi]!, productIndex: pi };
			}
		}
		return null;
	};

	//does not use charId for now.
	const productInCart = (id: number, charId?: number): ProductForCart | undefined => {
		// return carts.value
		// 	.flatMap((cart) => cart.products)
		// 	.find((product) => product.id === id && (charId === undefined || product.char?.id === charId));
		return carts.value
			.flatMap((cart) => cart.products)
			.find((product) => product.id === id);
	};

	const hasProducts = computed(() => carts.value.some((cart) => cart.products?.length > 0));

	const totalAmount = (cartIndex: number): number => {
		const cart = carts.value[cartIndex];
		if (!cart) return 0;
		return cart.products.reduce((amount, product) => amount + product.amount, 0);
	};

	const totalProductsAddedToCart = computed((): number => {
		return carts.value.reduce((totalQuantity, cart) => {
			return totalQuantity + cart.products.reduce((cartTotal, product) => cartTotal + product.quant, 0);
		}, 0);
	});

	const toCartItem = (cartName: string, p: ProductForCart): CartItem => {
		return {
			cart_name: cartName,
			product_id: p.id,
			char_id: p.char?.id,
			quantity: p.quant,
			price: p.price,
		};
	};

	const fetchAll = async (): Promise<void> => {
		if (isFetching.value) return;

		isFetching.value = true;
		try {
			const data = await api.fetchAll();
			carts.value = Array.isArray(data) ? data : [];
			isFetched.value = true;
		} finally {
			isFetching.value = false;
		}
	};

	const ensureInitialized = async (): Promise<void> => {
		if (isFetched.value) return;
		await fetchAll();
	};

	const addToCart = async (
		cartIndex: number,
		product: AddProductInput,
		stock: AddStockInput,
		img?: Picture,
	): Promise<void> => {
		const ci = ensureCartIndex(cartIndex);
		const cart = carts.value[ci]!;
		const charId = stock.char?.id;

		const existingIndex = cart.products.findIndex((p) => {
			if (p.id !== product.id) return false;
			if (charId === undefined) return true;
			return p.char?.id === charId;
		});

		if (existingIndex !== -1) {
			const p = cart.products[existingIndex]!;
			p.quant += 1;
			p.amount = p.price * p.quant;

			await api.setQuantity(toCartItem(cart.name, p));
			return;
		}

		const prodForCart: ProductForCart = {
			id: product.id,
			name: product.name,
			name_lat: product.name_lat,
			code_1c: product.code_1c,
			char: stock.char,
			quant: 1,
			price: stock.price ?? 0,
			amount: (stock.price ?? 0) * 1,
			picture: img,
		};

		cart.products.push(prodForCart);
		await api.setQuantity(toCartItem(cart.name, prodForCart));
	};

	const incrementQuantityInFirst = async (productId: number, productCharId?: number): Promise<void> => {
		const found = findCartWithProduct(productId, productCharId);
		if (!found) return;

		found.product.quant += 1;
		found.product.amount = found.product.price * found.product.quant;

		await api.setQuantity(toCartItem(found.cart.name, found.product));
	};

	const incrementQuantity = async (
		cartIndex: number,
		productId: number,
		productCharId?: number,
	): Promise<void> => {
		const cart = carts.value[cartIndex];
		if (!cart) return;

		const product = cart.products.find((p) => {
			if (p.id !== productId) return false;
			if (productCharId === undefined) return true;
			return p.char?.id === productCharId;
		});
		if (!product) return;

		product.quant += 1;
		product.amount = product.price * product.quant;

		await api.setQuantity(toCartItem(cart.name, product));
	};

	const decrementQuantityInFirst = async (productId: number, productCharId?: number): Promise<void> => {
		const found = findCartWithProduct(productId, productCharId);
		if (!found) return;

		if (found.product.quant > 1) {
			found.product.quant -= 1;
			found.product.amount = found.product.price * found.product.quant;

			// FIX: this must be remove (or a dedicated decrement endpoint). You currently have remove().
			await api.remove({
				cart_name: found.cart.name,
				product_id: found.product.id,
				char_id: found.product.char?.id,
				quantity: 1,
				price: found.product.price,
			});
			return;
		}

		const removed = found.product;
		found.cart.products.splice(found.productIndex, 1);

		await api.setQuantity({
			cart_name: found.cart.name,
			product_id: removed.id,
			char_id: removed.char?.id,
			quantity: 0,
			price: removed.price,
		});
	};

	const decrementQuantity = async (
		cartIndex: number,
		productId: number,
		productCharId?: number,
	): Promise<void> => {
		const cart = carts.value[cartIndex];
		if (!cart) return;

		const productIndex = cart.products.findIndex((p) => {
			if (p.id !== productId) return false;
			if (productCharId === undefined) return true;
			return p.char?.id === productCharId;
		});
		if (productIndex === -1) return;

		const p = cart.products[productIndex]!;
		if (p.quant > 1) {
			p.quant -= 1;
			p.amount = p.price * p.quant;

			await api.remove({
				cart_name: cart.name,
				product_id: p.id,
				char_id: p.char?.id,
				quantity: 1,
				price: p.price,
			});
			return;
		}

		cart.products.splice(productIndex, 1);

		await api.setQuantity({
			cart_name: cart.name,
			product_id: p.id,
			char_id: p.char?.id,
			quantity: 0,
			price: p.price,
		});
	};

	const removeProductFromCart = async (
		cartIndex: number,
		productId: number,
		productCharId?: number,
	): Promise<void> => {
		const cart = carts.value[cartIndex];
		if (!cart) return;

		const idx = cart.products.findIndex((p) => {
			if (p.id !== productId) return false;
			if (productCharId === undefined) return true;
			return p.char?.id === productCharId;
		});
		if (idx === -1) return;

		const removed = cart.products[idx]!;
		cart.products.splice(idx, 1);

		await api.setQuantity({
			cart_name: cart.name,
			product_id: removed.id,
			char_id: removed.char?.id,
			quantity: 0,
			price: removed.price,
		});
	};

	const clearCart = async (cartIndex: number): Promise<void> => {
		const cart = carts.value[cartIndex];
		if (!cart) return;

		cart.products = [];
		await api.clear(cart.name);
	};

	const productCartQuantity = (productId: number, productCharId?: number): number => {
		// && (productCharId === undefined || p.char?.id === productCharId)
		return carts.value.reduce((total, cart) => {
			return (
				total +
				cart.products
					.filter((p) => p.id === productId)
					.reduce((sum, p) => sum + p.quant, 0)
			);
		}, 0);
	};

	const setQuantityInFirst = async (
		product: AddProductInput,
		quant: number,
		stock?: AddStockInput,
		img?: Picture,
	): Promise<void> => {
		const charId = stock?.char?.id;
		let cart = carts.value[0];

		if (!cart) {
			if (quant <= 0) return;
			createCart();
			cart = carts.value[0]!;
		}

		const idx = cart.products.findIndex((p) => {
			if (p.id !== product.id) return false;
			if (charId === undefined) return true;
			return p.char?.id === charId;
		});

		if (idx !== -1) {
			const p = cart.products[idx]!;
			if (quant <= 0) {
				cart.products.splice(idx, 1);

				await api.setQuantity({
					cart_name: cart.name,
					product_id: p.id,
					char_id: p.char?.id,
					quantity: 0,
					price: p.price,
				});
				return;
			}

			if (quant > p.quant) {
				p.quant = quant;
				p.amount = p.price * p.quant;
				await api.setQuantity(toCartItem(cart.name, p));
				return;
			}

			if (quant < p.quant) {
				// const delta = p.quant - quant;
				p.quant = quant;
				p.amount = p.price * p.quant;

				await api.setQuantity({
					cart_name: cart.name,
					product_id: p.id,
					char_id: p.char?.id,
					quantity: p.quant,
					price: p.price,
				});
				return;
			}

			return;
		}

		if (quant <= 0) return;

		const price = stock?.price ?? 0;
		const p: ProductForCart = {
			id: product.id,
			name: product.name,
			name_lat: product.name_lat,
			code_1c: product.code_1c,
			char: stock?.char,
			quant,
			price,
			amount: price * quant,
			picture: img,
		};

		cart.products.push(p);
		await api.setQuantity(toCartItem(cart.name, p));
	};

	return {
		carts,
		isFetched,
		isFetching,

		fetchAll,
		ensureInitialized,

		createCart,
		productInCart,
		hasProducts,
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
