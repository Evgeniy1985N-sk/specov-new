import { useNuxtApp } from "nuxt/app";
import type { $Fetch } from "ofetch";

import { cartEndpoints } from '@/api/endpoints/cart';
import type { CartItem } from "~/types/cart";

export function useCartApi() {
	const api = useNuxtApp().$backendAPI as $Fetch;

	return {
		add(item: CartItem): Promise<void>{
			return api<void>(
				cartEndpoints.add(),
					{ method: 'POST', body: item },
			);
		},
		remove(item: CartItem): Promise<void>{
			return api<void>(
				cartEndpoints.remove(),
					{ method: 'POST', body: item },
			);
		},
		clear(cartName: string): Promise<void>{
			return api<void>(
				cartEndpoints.clear(),
					{ method: 'POST', body: {cart_name: cartName} },
			);
		},
	}
}
