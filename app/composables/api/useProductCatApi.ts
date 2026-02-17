import { useNuxtApp } from "nuxt/app";
import type { $Fetch } from "ofetch";
import { productCatEndpoints } from '@/api/endpoints/productCat';
import { type CategoryCatalog, type CategoryCatalogParams, type ProductCatPublicList } from "@/types/productCat";

export function useProductCatApi() {
	const api = useNuxtApp().$backendAPI as $Fetch;

	return {
		//all categories
		publicList(): Promise<ProductCatPublicList[]>{
			return api<ProductCatPublicList[]>(productCatEndpoints.publicList());
		},

		mainCategories(): Promise<ProductCatPublicList[]>{
			return api<ProductCatPublicList[]>(productCatEndpoints.mainCatetories());
		},

		catalog(id: number, params: CategoryCatalogParams): Promise<CategoryCatalog>{
			return api<CategoryCatalog>(productCatEndpoints.catalog(id, params));
		},

		catalogProductCount(id: number, params: CategoryCatalogParams): Promise<CategoryCatalog>{
			return api<CategoryCatalog>(productCatEndpoints.catalogProductCount(id, params));
		},
	}
}

