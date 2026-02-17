import { useNuxtApp } from "nuxt/app";
import type { $Fetch } from "ofetch";
import { productGroupEndpoints } from '@/api/endpoints/productGroup';
import { type ProductGroupPublicList } from "@/types/productGroup";

export function useProductGroupApi() {
	const api = useNuxtApp().$backendAPI as $Fetch;

	return {
		publicList(): Promise<ProductGroupPublicList[]>{
			return api<ProductGroupPublicList[]>(productGroupEndpoints.publicList());
		}
	}
}
