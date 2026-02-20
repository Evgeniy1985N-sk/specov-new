import { useNuxtApp } from "nuxt/app";
import type { $Fetch } from "ofetch";
import { userEndpoints } from '@/api/endpoints/user';
import { type ProductCard } from "@/types/product";

export function useUserApi() {
	const api = useNuxtApp().$backendAPI as $Fetch;

	return {
		lastViewedProducts(): Promise<ProductCard[]>{
			return api<ProductCard[]>(userEndpoints.lastViewedProducts());
		}
	}
}



