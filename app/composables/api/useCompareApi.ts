import { useNuxtApp } from "nuxt/app";
import type { $Fetch } from "ofetch";
import { compareEndpoints } from "~/api/endpoints/compare";
import type { ProductComparePage, ProductForCompare, ProductUpdateCompare } from "~/types/productCompare";
import type { PageAnonUserProducts } from "~/types/product";

export function useCompareApi() {
	const api = useNuxtApp().$backendAPI as $Fetch;

	return {
		add(item: ProductUpdateCompare): Promise<void>{
			return api<void>(
				compareEndpoints.add(),
					{ method: 'POST', body: item },
			);
		},
		remove(item: ProductUpdateCompare): Promise<void>{
			return api<void>(
				compareEndpoints.remove(),
					{ method: 'POST', body: item },
			);
		},
		clear(items: ProductUpdateCompare[]): Promise<void>{
			return api<void>(
				compareEndpoints.clear(),
					{ method: 'POST', body: items },
			);
		},
		fetch(): Promise<ProductForCompare[]>{
			return api<ProductForCompare[]>(
				compareEndpoints.fetch(),
					{ method: 'GET' },
			);
		},
		page(products: PageAnonUserProducts[]): Promise<ProductComparePage>{
			return api<ProductComparePage>(
				compareEndpoints.page(products),
					{ method: 'GET' },
			);
		},
	}
}

